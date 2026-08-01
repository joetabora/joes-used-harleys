import type { ScanVisibilityValue } from "./visibility";
import { deriveScanVisibility } from "./visibility";
import { normalizeStockSlug, normalizeVinSlug } from "./slugs";

/** Sync-owned ScanBike columns derived on every upsert. */
export function buildScanBikeFields(input: {
  vin: string | null;
  stockNumber: string | null;
  make: string;
  condition: string | null;
  status: "AVAILABLE" | "PENDING" | "SOLD";
  archiveSold?: boolean;
  previousVisibility?: ScanVisibilityValue | null;
  previousArchivedAt?: Date | null;
}): {
  scanVisibility: ScanVisibilityValue;
  scanSlugVin: string | null;
  scanSlugStock: string | null;
  archivedAt: Date | null;
} {
  const scanVisibility = deriveScanVisibility({
    make: input.make,
    condition: input.condition,
    status: input.status,
    archiveSold: input.archiveSold,
  });

  let archivedAt: Date | null = null;
  if (scanVisibility === "ARCHIVED") {
    archivedAt = input.previousArchivedAt ?? new Date();
  }

  return {
    scanVisibility,
    scanSlugVin: normalizeVinSlug(input.vin),
    scanSlugStock: normalizeStockSlug(input.stockNumber),
    archivedAt,
  };
}
