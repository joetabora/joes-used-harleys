/** Normalize VIN for ScanBike URL paths (uppercase, no spaces). */
export function normalizeVinSlug(vin: string | null | undefined): string | null {
  if (!vin) return null;
  const slug = vin.replace(/\s+/g, "").toUpperCase();
  return slug.length > 0 ? slug : null;
}

/** Normalize stock for ScanBike URL paths (trim only; preserve dealer formatting). */
export function normalizeStockSlug(stock: string | null | undefined): string | null {
  if (!stock) return null;
  const slug = stock.trim();
  return slug.length > 0 ? slug : null;
}
