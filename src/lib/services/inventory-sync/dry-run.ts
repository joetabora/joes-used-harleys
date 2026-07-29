import type { PrismaClient } from "@/generated/prisma/client";
import { syncInventory } from "./sync-engine";
import type { SyncResult } from "./types";

/** Dry-run wrapper — same engine, zero bike mutations. */
export function dryRunInventorySync(prisma: PrismaClient): Promise<SyncResult> {
  return syncInventory(prisma, { trigger: "DRY_RUN", dryRun: true });
}
