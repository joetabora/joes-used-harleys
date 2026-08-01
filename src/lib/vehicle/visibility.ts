export type ScanVisibilityValue = "PUBLIC_INDEX" | "QR_ONLY" | "ARCHIVED" | "HIDDEN";

export type ScanVisibilityInput = {
  make: string;
  condition: string | null;
  status: "AVAILABLE" | "PENDING" | "SOLD";
  /** When true, sold bikes become ARCHIVED; otherwise HIDDEN. */
  archiveSold?: boolean;
};

/**
 * Deterministic ScanBike visibility from inventory class.
 * Used Harley available/pending → PUBLIC_INDEX.
 * New Harley / Non-Harley → QR_ONLY.
 * Sold → ARCHIVED or HIDDEN.
 */
export function deriveScanVisibility(input: ScanVisibilityInput): ScanVisibilityValue {
  if (input.status === "SOLD") {
    return input.archiveSold === false ? "HIDDEN" : "ARCHIVED";
  }

  const make = input.make.trim().toLowerCase();
  const condition = (input.condition ?? "").trim().toLowerCase();
  const isHarley = make === "harley-davidson";
  const isUsed = condition === "used";

  if (isHarley && isUsed) return "PUBLIC_INDEX";
  return "QR_ONLY";
}

/** Whether ScanBike may render a page for this visibility. */
export function isScanBikeRenderable(visibility: ScanVisibilityValue): boolean {
  return visibility === "PUBLIC_INDEX" || visibility === "QR_ONLY" || visibility === "ARCHIVED";
}

/** Whether search engines may index the page. */
export function isScanBikeIndexable(visibility: ScanVisibilityValue): boolean {
  return visibility === "PUBLIC_INDEX";
}
