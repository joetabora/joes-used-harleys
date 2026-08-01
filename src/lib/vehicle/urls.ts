import { siteConfig } from "@/lib/site";
import { normalizeStockSlug, normalizeVinSlug } from "./slugs";

function originBase(origin?: string): string {
  const fromTheme = process.env.NEXT_PUBLIC_SCANBIKE_URL?.trim();
  const raw = origin ?? (fromTheme || siteConfig.url);
  return raw.replace(/\/$/, "");
}

/** Absolute canonical ScanBike URL for a VIN (QR payload). */
export function scanBikeVinUrl(vin: string, origin?: string): string {
  const slug = normalizeVinSlug(vin);
  if (!slug) {
    throw new Error("Cannot build ScanBike VIN URL without a VIN");
  }
  return `${originBase(origin)}/v/${encodeURIComponent(slug)}`;
}

/** Absolute temporary ScanBike URL when only stock is known. */
export function scanBikeStockUrl(stock: string, origin?: string): string {
  const slug = normalizeStockSlug(stock);
  if (!slug) {
    throw new Error("Cannot build ScanBike stock URL without a stock number");
  }
  return `${originBase(origin)}/v/s/${encodeURIComponent(slug)}`;
}

/**
 * Prefer VIN canonical URL; fall back to stock. Returns null if neither exists.
 * QR codes encode this string — permanence depends on VIN when present.
 */
export function scanBikeCanonicalUrl(input: {
  vin: string | null;
  stockNumber: string | null;
  origin?: string;
}): string | null {
  const vin = normalizeVinSlug(input.vin);
  if (vin) return scanBikeVinUrl(vin, input.origin);
  const stock = normalizeStockSlug(input.stockNumber);
  if (stock) return scanBikeStockUrl(stock, input.origin);
  return null;
}

/** Path-only helpers for Next.js routing. */
export function scanBikeVinPath(vin: string): string {
  const slug = normalizeVinSlug(vin);
  if (!slug) throw new Error("Missing VIN");
  return `/v/${encodeURIComponent(slug)}`;
}

export function scanBikeStockPath(stock: string): string {
  const slug = normalizeStockSlug(stock);
  if (!slug) throw new Error("Missing stock");
  return `/v/s/${encodeURIComponent(slug)}`;
}
