import type { Bike, PrismaClient } from "@/generated/prisma/client";
import { buildScanBikeFields } from "@/lib/vehicle/scan-fields";
import { fetchFeed } from "./fetch-feed";
import { filterMotorcycles, filterUsedHarley } from "./filter-items";
import { getMatchKey } from "./match-key";
import { mapItemToDealerPayload } from "./map-item";
import { parseFeed } from "./parse-feed";
import type { DealerBikePayload, SyncErrorEntry, SyncOptions, SyncResult } from "./types";

type ExistingFeedBike = Pick<
  Bike,
  | "id"
  | "vin"
  | "stockNumber"
  | "price"
  | "dealerHash"
  | "status"
  | "hidden"
  | "soldAt"
  | "scanVisibility"
  | "archivedAt"
  | "make"
  | "condition"
>;

function archiveSoldEnabled(): boolean {
  const v = process.env.SCANBIKE_ARCHIVE_SOLD?.trim().toLowerCase();
  if (v === "0" || v === "false" || v === "no") return false;
  return true;
}

function buildResult(
  partial: Omit<SyncResult, "message"> & { message?: string },
): SyncResult {
  const message =
    partial.message ??
    (partial.ok
      ? `Sync ${partial.dryRun ? "dry-run " : ""}complete: +${partial.createdCount} ~${partial.updatedCount} =${partial.unchangedCount} sold ${partial.soldCount}`
      : "Sync failed");
  return { ...partial, message };
}

async function writeFailedLog(
  prisma: PrismaClient,
  opts: {
    trigger: SyncOptions["trigger"];
    dryRun: boolean;
    feedUrl: string;
    startedAt: Date;
    message: string;
    feedVersion?: string | null;
    fetchedBytes?: number | null;
  },
): Promise<string> {
  const finishedAt = new Date();
  const log = await prisma.syncLog.create({
    data: {
      startedAt: opts.startedAt,
      finishedAt,
      durationMs: finishedAt.getTime() - opts.startedAt.getTime(),
      trigger: opts.trigger,
      status: "FAILED",
      feedUrl: opts.feedUrl,
      feedVersion: opts.feedVersion ?? null,
      fetchedBytes: opts.fetchedBytes ?? null,
      dryRun: opts.dryRun,
      errorCount: 1,
      errors: [{ message: opts.message }],
    },
  });
  return log.id;
}

/**
 * JoeOS inventory synchronization service.
 * Manual sync and cron call this with identical behavior.
 */
export async function syncInventory(
  prisma: PrismaClient,
  options: SyncOptions,
): Promise<SyncResult> {
  const dryRun = Boolean(options.dryRun) || options.trigger === "DRY_RUN";
  const startedAt = new Date();
  const logTrigger = dryRun ? "DRY_RUN" : options.trigger === "CRON" ? "CRON" : "MANUAL";

  const fetched = await fetchFeed(options.xmlBody);
  if (!fetched.ok) {
    const syncLogId = await writeFailedLog(prisma, {
      trigger: dryRun ? "DRY_RUN" : options.trigger === "CRON" ? "CRON" : "MANUAL",
      dryRun,
      feedUrl: fetched.feedUrl,
      startedAt,
      message: fetched.message,
    });
    return buildResult({
      ok: false,
      syncLogId,
      status: "FAILED",
      dryRun,
      feedUrl: fetched.feedUrl,
      feedVersion: null,
      fetchedBytes: null,
      parsedCount: 0,
      usedHarleyCount: 0,
      createdCount: 0,
      updatedCount: 0,
      soldCount: 0,
      unchangedCount: 0,
      priceChangeCount: 0,
      errorCount: 1,
      errors: [{ message: fetched.message }],
      durationMs: Date.now() - startedAt.getTime(),
      message: fetched.message,
    });
  }

  const parsed = parseFeed(fetched.body);
  if (!parsed.ok) {
    const syncLogId = await writeFailedLog(prisma, {
      trigger: dryRun ? "DRY_RUN" : options.trigger === "CRON" ? "CRON" : "MANUAL",
      dryRun,
      feedUrl: fetched.feedUrl,
      startedAt,
      message: parsed.message,
      feedVersion: fetched.feedVersion,
      fetchedBytes: fetched.bytes,
    });
    return buildResult({
      ok: false,
      syncLogId,
      status: "FAILED",
      dryRun,
      feedUrl: fetched.feedUrl,
      feedVersion: fetched.feedVersion,
      fetchedBytes: fetched.bytes,
      parsedCount: 0,
      usedHarleyCount: 0,
      createdCount: 0,
      updatedCount: 0,
      soldCount: 0,
      unchangedCount: 0,
      priceChangeCount: 0,
      errorCount: 1,
      errors: [{ message: parsed.message }],
      durationMs: Date.now() - startedAt.getTime(),
      message: parsed.message,
    });
  }

  const ingestItems = filterMotorcycles(parsed.items);
  const usedHarley = filterUsedHarley(ingestItems);
  const errors: SyncErrorEntry[] = [];
  const now = new Date();
  const archiveSold = archiveSoldEnabled();

  const existing = await prisma.bike.findMany({
    where: { source: "FEED" },
    select: {
      id: true,
      vin: true,
      stockNumber: true,
      price: true,
      dealerHash: true,
      status: true,
      hidden: true,
      soldAt: true,
      scanVisibility: true,
      archivedAt: true,
      make: true,
      condition: true,
    },
  });

  const byVin = new Map<string, ExistingFeedBike>();
  const byStock = new Map<string, ExistingFeedBike>();
  for (const bike of existing) {
    if (bike.vin) byVin.set(bike.vin, bike);
    if (bike.stockNumber) byStock.set(bike.stockNumber, bike);
  }

  type PlannedCreate = { payload: DealerBikePayload };
  type PlannedUpdate = {
    id: string;
    payload: DealerBikePayload;
    previousPrice: number | null;
    priceChanged: boolean;
    hashSkip: boolean;
    match: ExistingFeedBike;
    statusUpdate: {
      status?: "AVAILABLE" | "PENDING" | "SOLD";
      hidden?: boolean;
      soldAt?: Date | null;
    };
  };

  const toCreate: PlannedCreate[] = [];
  const toUpdate: PlannedUpdate[] = [];
  const seenIds = new Set<string>();

  for (const item of ingestItems) {
    const key = getMatchKey(item);
    if (!key) {
      errors.push({
        message: "Missing VIN and stock number",
        feedId: item.feedId,
      });
      continue;
    }

    const payload = mapItemToDealerPayload(item);
    const match = key.kind === "vin" ? byVin.get(key.value) : byStock.get(key.value);

    if (!match) {
      toCreate.push({ payload });
      continue;
    }

    seenIds.add(match.id);

    if (match.dealerHash && match.dealerHash === payload.dealerHash) {
      toUpdate.push({
        id: match.id,
        payload,
        previousPrice: match.price,
        priceChanged: false,
        hashSkip: true,
        match,
        statusUpdate: {},
      });
      continue;
    }

    const priceChanged = match.price !== null && match.price !== payload.price;

    const statusUpdate: PlannedUpdate["statusUpdate"] = {};
    if (match.status === "SOLD") {
      statusUpdate.status = "AVAILABLE";
      statusUpdate.hidden = false;
      statusUpdate.soldAt = null;
    } else if (match.status !== "PENDING" && match.hidden) {
      statusUpdate.hidden = false;
    }

    toUpdate.push({
      id: match.id,
      payload,
      previousPrice: match.price,
      priceChanged,
      hashSkip: false,
      match,
      statusUpdate,
    });
  }

  const missing = existing.filter((b) => !seenIds.has(b.id) && b.status !== "SOLD");
  const createdCount = toCreate.length;
  let updatedCount = 0;
  let unchangedCount = 0;
  const soldCount = missing.length;
  let priceChangeCount = 0;

  for (const u of toUpdate) {
    if (u.hashSkip) unchangedCount += 1;
    else {
      updatedCount += 1;
      if (u.priceChanged) priceChangeCount += 1;
    }
  }

  if (dryRun) {
    const finishedAt = new Date();
    const log = await prisma.syncLog.create({
      data: {
        startedAt,
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        trigger: "DRY_RUN",
        status: errors.length ? "PARTIAL" : "SUCCESS",
        feedUrl: fetched.feedUrl,
        feedVersion: fetched.feedVersion,
        fetchedBytes: fetched.bytes,
        parsedCount: parsed.parsedCount,
        usedHarleyCount: usedHarley.length,
        createdCount,
        updatedCount,
        soldCount,
        unchangedCount,
        priceChangeCount,
        errorCount: errors.length,
        errors: errors.length ? errors : undefined,
        dryRun: true,
      },
    });

    return buildResult({
      ok: true,
      syncLogId: log.id,
      status: errors.length ? "PARTIAL" : "SUCCESS",
      dryRun: true,
      feedUrl: fetched.feedUrl,
      feedVersion: fetched.feedVersion,
      fetchedBytes: fetched.bytes,
      parsedCount: parsed.parsedCount,
      usedHarleyCount: usedHarley.length,
      createdCount,
      updatedCount,
      soldCount,
      unchangedCount,
      priceChangeCount,
      errorCount: errors.length,
      errors,
      durationMs: finishedAt.getTime() - startedAt.getTime(),
    });
  }

  const syncLogId = await prisma.$transaction(async (tx) => {
    const log = await tx.syncLog.create({
      data: {
        startedAt,
        trigger: logTrigger,
        status: "SUCCESS",
        feedUrl: fetched.feedUrl,
        feedVersion: fetched.feedVersion,
        fetchedBytes: fetched.bytes,
        parsedCount: parsed.parsedCount,
        usedHarleyCount: usedHarley.length,
        dryRun: false,
      },
    });

    for (const row of toCreate) {
      const scan = buildScanBikeFields({
        vin: row.payload.vin,
        stockNumber: row.payload.stockNumber,
        make: row.payload.make,
        condition: row.payload.condition,
        status: "AVAILABLE",
        archiveSold,
      });
      await tx.bike.create({
        data: {
          ...row.payload,
          status: "AVAILABLE",
          hidden: false,
          firstSeenAt: now,
          lastSeenAt: now,
          syncedAt: now,
          featuredRank: 0,
          ...scan,
        },
      });
    }

    for (const row of toUpdate) {
      const effectiveStatus: "AVAILABLE" | "PENDING" | "SOLD" =
        row.statusUpdate.status ??
        (row.match.status === "SOLD" ? "AVAILABLE" : row.match.status);

      const scan = buildScanBikeFields({
        vin: row.payload.vin,
        stockNumber: row.payload.stockNumber,
        make: row.payload.make,
        condition: row.payload.condition,
        status: effectiveStatus,
        archiveSold,
        previousVisibility: row.match.scanVisibility,
        previousArchivedAt: row.match.archivedAt,
      });

      if (row.hashSkip) {
        await tx.bike.update({
          where: { id: row.id },
          data: { lastSeenAt: now, ...scan },
        });
        continue;
      }

      if (row.priceChanged) {
        await tx.bikePriceHistory.create({
          data: {
            bikeId: row.id,
            vin: row.payload.vin,
            previousPrice: row.previousPrice,
            newPrice: row.payload.price,
            changedAt: now,
            syncLogId: log.id,
          },
        });
      }

      await tx.bike.update({
        where: { id: row.id },
        data: {
          ...row.payload,
          lastSeenAt: now,
          syncedAt: now,
          ...row.statusUpdate,
          ...scan,
        },
      });
    }

    for (const bike of missing) {
      const scan = buildScanBikeFields({
        vin: bike.vin,
        stockNumber: bike.stockNumber,
        make: bike.make,
        condition: bike.condition,
        status: "SOLD",
        archiveSold,
        previousVisibility: bike.scanVisibility,
        previousArchivedAt: bike.archivedAt,
      });
      await tx.bike.update({
        where: { id: bike.id },
        data: {
          status: "SOLD",
          hidden: true,
          soldAt: bike.soldAt ?? now,
          ...scan,
        },
      });
    }

    // Backfill ScanBike fields on already-sold FEED bikes (not in missing set)
    const alreadySold = existing.filter((b) => b.status === "SOLD" && !seenIds.has(b.id));
    for (const bike of alreadySold) {
      const scan = buildScanBikeFields({
        vin: bike.vin,
        stockNumber: bike.stockNumber,
        make: bike.make,
        condition: bike.condition,
        status: "SOLD",
        archiveSold,
        previousVisibility: bike.scanVisibility,
        previousArchivedAt: bike.archivedAt,
      });
      await tx.bike.update({
        where: { id: bike.id },
        data: scan,
      });
    }

    const finishedAt = new Date();
    await tx.syncLog.update({
      where: { id: log.id },
      data: {
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        status: errors.length ? "PARTIAL" : "SUCCESS",
        createdCount,
        updatedCount,
        soldCount,
        unchangedCount,
        priceChangeCount,
        errorCount: errors.length,
        errors: errors.length ? errors : undefined,
      },
    });

    return log.id;
  });

  return buildResult({
    ok: true,
    syncLogId,
    status: errors.length ? "PARTIAL" : "SUCCESS",
    dryRun: false,
    feedUrl: fetched.feedUrl,
    feedVersion: fetched.feedVersion,
    fetchedBytes: fetched.bytes,
    parsedCount: parsed.parsedCount,
    usedHarleyCount: usedHarley.length,
    createdCount,
    updatedCount,
    soldCount,
    unchangedCount,
    priceChangeCount,
    errorCount: errors.length,
    errors,
    durationMs: Date.now() - startedAt.getTime(),
  });
}
