import { scanBikeCanonicalUrl } from "./urls";

/**
 * URL string encoded in QR stickers. No branding — pure absolute URL.
 * Deterministic from VIN (or stock fallback).
 */
export function qrPayloadForBike(bike: {
  vin: string | null;
  stockNumber: string | null;
}): string | null {
  return scanBikeCanonicalUrl(bike);
}
