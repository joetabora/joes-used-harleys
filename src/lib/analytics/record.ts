import type { Prisma } from "@/generated/prisma/client";
import type { CollectAnalyticsInput } from "@/lib/analytics/types";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

function asJson(
  value: Record<string, unknown> | null | undefined,
): Prisma.InputJsonValue | undefined {
  if (value == null) return undefined;
  return value as Prisma.InputJsonValue;
}

const recentUnique = new Map<string, number>();
const RATE_MS = 800;

function rateLimitKey(sessionId: string, type: string, bikeId?: string | null) {
  return `${sessionId}:${type}:${bikeId ?? ""}`;
}

function allowRate(sessionId: string, type: string, bikeId?: string | null): boolean {
  const key = rateLimitKey(sessionId, type, bikeId);
  const now = Date.now();
  const last = recentUnique.get(key) ?? 0;
  if (now - last < RATE_MS) return false;
  recentUnique.set(key, now);
  if (recentUnique.size > 5000) {
    for (const [k, t] of recentUnique) {
      if (now - t > 60_000) recentUnique.delete(k);
    }
  }
  return true;
}

async function ensureAnalytics(bikeId: string) {
  return prisma!.bikeAnalytics.upsert({
    where: { bikeId },
    create: { bikeId },
    update: {},
  });
}

async function bikeExists(bikeId: string): Promise<boolean> {
  const row = await prisma!.bike.findUnique({
    where: { id: bikeId },
    select: { id: true },
  });
  return Boolean(row);
}

/**
 * Persist event + update BikeAnalytics rollups for bike-scoped types.
 * Never invents bikeIds. Admin/noTrack callers should skip before calling.
 */
export async function recordAnalyticsEvent(
  input: CollectAnalyticsInput,
): Promise<{ ok: boolean; message?: string }> {
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured" };
  }

  if (input.noTrack) return { ok: true, message: "skipped" };
  if (input.path?.startsWith("/admin")) return { ok: true, message: "skipped-admin" };

  if (!allowRate(input.sessionId, input.type, input.bikeId)) {
    return { ok: true, message: "rate-limited" };
  }

  const bikeId = input.bikeId ?? null;
  if (bikeId && !(await bikeExists(bikeId))) {
    return { ok: false, message: "Unknown bikeId" };
  }

  await prisma.analyticsEvent.create({
    data: {
      type: input.type,
      bikeId,
      sessionId: input.sessionId,
      path: input.path ?? null,
      query: input.query ?? null,
      filters: asJson(input.filters),
      meta: asJson(input.meta),
      product: input.product ?? null,
    },
  });

  if (!bikeId) return { ok: true };

  await ensureAnalytics(bikeId);
  const now = new Date();

  switch (input.type) {
    case "BIKE_DETAIL_VIEW": {
      const prior = await prisma.analyticsEvent.count({
        where: {
          bikeId,
          sessionId: input.sessionId,
          type: "BIKE_DETAIL_VIEW",
        },
      });
      await prisma.bikeAnalytics.update({
        where: { bikeId },
        data: {
          views: { increment: 1 },
          lastViewedAt: now,
          lastDetailViewAt: now,
          ...(prior <= 1 ? { uniqueVisitors: { increment: 1 } } : {}),
        },
      });
      break;
    }
    case "PAGE_VIEW":
      // Event logged for path analytics; detail rollups use BIKE_DETAIL_VIEW.
      break;
    case "INVENTORY_IMPRESSION": {
      const prior = await prisma.analyticsEvent.count({
        where: {
          bikeId,
          sessionId: input.sessionId,
          type: "INVENTORY_IMPRESSION",
        },
      });
      if (prior <= 1) {
        await prisma.bikeAnalytics.update({
          where: { bikeId },
          data: { impressions: { increment: 1 } },
        });
      }
      break;
    }
    case "TIME_ON_PAGE": {
      const durationMs = Number(
        input.meta && typeof input.meta === "object" && "durationMs" in input.meta
          ? input.meta.durationMs
          : 0,
      );
      if (Number.isFinite(durationMs) && durationMs > 0 && durationMs < 30 * 60 * 1000) {
        const row = await prisma.bikeAnalytics.findUnique({ where: { bikeId } });
        if (row) {
          const samples = row.timeOnPageSamples + 1;
          const avg = Math.round(
            (row.avgTimeOnPageMs * row.timeOnPageSamples + durationMs) / samples,
          );
          await prisma.bikeAnalytics.update({
            where: { bikeId },
            data: { avgTimeOnPageMs: avg, timeOnPageSamples: samples },
          });
        }
      }
      break;
    }
    case "CONTACT_CLICK":
      await prisma.bikeAnalytics.update({
        where: { bikeId },
        data: { contactClicks: { increment: 1 } },
      });
      break;
    case "FINANCING_OPEN":
      await prisma.bikeAnalytics.update({
        where: { bikeId },
        data: { financingOpens: { increment: 1 } },
      });
      break;
    case "SHARE_CLICK":
      await prisma.bikeAnalytics.update({
        where: { bikeId },
        data: { shares: { increment: 1 } },
      });
      break;
    case "FAVORITE":
      await prisma.bikeAnalytics.update({
        where: { bikeId },
        data: { favorites: { increment: 1 } },
      });
      break;
    case "SEARCH_QUERY":
    case "FILTER_USAGE":
      // Attribution only when bikeId explicitly provided by client for a matched result
      if (bikeId) {
        await prisma.bikeAnalytics.update({
          where: { bikeId },
          data: { searchHits: { increment: 1 } },
        });
      }
      break;
    default:
      break;
  }

  return { ok: true };
}
