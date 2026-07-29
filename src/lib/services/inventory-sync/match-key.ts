import type { ParsedFeedItem } from "./types";

export type MatchKey = { kind: "vin" | "stock"; value: string };

/** VIN primary; stock number fallback. */
export function getMatchKey(item: ParsedFeedItem): MatchKey | null {
  const vin = item.vin?.trim();
  if (vin) return { kind: "vin", value: vin };

  const stock = item.stockNumber?.trim();
  if (stock) return { kind: "stock", value: stock };

  return null;
}
