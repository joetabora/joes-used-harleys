import {
  ANALYTICS_WINDOW_DAYS,
  buildAnalyticsReport,
  type BikeActivityRow,
  type EventCount,
  type LeadRow,
  type QueryResult,
} from "@/lib/admin/analytics-report";
import { loadGoogleReporting } from "@/lib/admin/google-reports";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

const JOE_EVENT_TYPES = [
  "PAGE_VIEW",
  "BIKE_DETAIL_VIEW",
  "INVENTORY_IMPRESSION",
  "SEARCH_QUERY",
  "FILTER_USAGE",
  "TIME_ON_PAGE",
  "CONTACT_CLICK",
  "FINANCING_OPEN",
  "FAVORITE",
  "SHARE_CLICK",
  "APPOINTMENT_REQUEST",
] as const;

async function unavailableReport() {
  const missing = { ok: false, reason: "unavailable" } as const;
  const google = await loadGoogleReporting({ env: process.env, now: new Date() });
  return buildAnalyticsReport({
    now: new Date().toISOString(),
    leads: missing,
    contactClicks: missing,
    events: missing,
    bikes: missing,
    ga4: google.ga4,
    searchConsole: google.searchConsole,
  });
}

async function readLeads(since: Date): Promise<QueryResult<LeadRow[]>> {
  try {
    const rows = await prisma!.lead.findMany({
      where: { createdAt: { gte: since }, product: "JOE_SITE" },
      select: { createdAt: true, source: true },
    });
    return {
      ok: true,
      value: rows.map((row) => ({
        createdAt: row.createdAt.toISOString(),
        source: row.source,
      })),
    };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

async function readContactClicks(since: Date): Promise<QueryResult<number>> {
  try {
    const total = await prisma!.analyticsEvent.count({
      where: {
        createdAt: { gte: since },
        type: "CONTACT_CLICK",
        NOT: { path: { startsWith: "/admin" } },
      },
    });
    return { ok: true, value: total };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

async function readEvents(since: Date): Promise<QueryResult<EventCount[]>> {
  try {
    const rows = await prisma!.analyticsEvent.groupBy({
      by: ["type"],
      where: {
        createdAt: { gte: since },
        type: { in: [...JOE_EVENT_TYPES] },
        NOT: { path: { startsWith: "/admin" } },
      },
      _count: { _all: true },
    });
    return {
      ok: true,
      value: rows.map((row) => ({ type: row.type, count: row._count._all })),
    };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

async function readBikes(): Promise<QueryResult<BikeActivityRow[]>> {
  try {
    const rows = await prisma!.bikeAnalytics.findMany({
      where: { OR: [{ views: { gt: 0 } }, { contactClicks: { gt: 0 } }] },
      orderBy: [{ views: "desc" }, { contactClicks: "desc" }],
      take: 8,
      select: {
        views: true,
        contactClicks: true,
        bike: {
          select: {
            id: true,
            year: true,
            make: true,
            model: true,
            stockNumber: true,
          },
        },
      },
    });
    return {
      ok: true,
      value: rows.map((row) => ({
        id: row.bike.id,
        year: row.bike.year,
        make: row.bike.make,
        model: row.bike.model,
        stockNumber: row.bike.stockNumber,
        views: row.views,
        contactClicks: row.contactClicks,
      })),
    };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** Read-only public-site activity. Does not write inventory or Marketplace state. */
export async function loadAnalyticsReport() {
  if (!isDatabaseConfigured() || !prisma) return unavailableReport();

  const since = new Date(Date.now() - ANALYTICS_WINDOW_DAYS * DAY_MS);
  const [leads, contactClicks, events, bikes, google] = await Promise.all([
    readLeads(since),
    readContactClicks(since),
    readEvents(since),
    readBikes(),
    loadGoogleReporting({ env: process.env, now: new Date() }),
  ]);

  return buildAnalyticsReport({
    now: new Date().toISOString(),
    leads,
    contactClicks,
    events,
    bikes,
    ga4: google.ga4,
    searchConsole: google.searchConsole,
  });
}
