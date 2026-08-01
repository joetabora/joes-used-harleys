import { CONDITION_FILTER, MAKE_FILTER } from "./config";
import type { ParsedFeedItem } from "./types";

/** Keep only used Harley-Davidson motorcycles (Joe marketing surface). */
export function filterUsedHarley(items: ParsedFeedItem[]): ParsedFeedItem[] {
  return items.filter((item) => {
    const condition = (item.condition ?? "").trim().toLowerCase();
    const make = (item.make ?? "").trim().toLowerCase();
    return condition === CONDITION_FILTER && make === MAKE_FILTER;
  });
}

/**
 * ScanBike ingest: all feed items with year/make/model (already required by parse).
 * Product surfaces stay narrow via scanVisibility + publicBikeWhere.
 */
export function filterMotorcycles(items: ParsedFeedItem[]): ParsedFeedItem[] {
  return items.filter((item) => {
    if (!item.year || !item.make?.trim() || !item.model?.trim()) return false;
    const cat = (item.category ?? "").trim().toLowerCase();
    if (!cat) return true;
    // Drop obvious non-powersports if category is present and unrelated
    if (
      cat.includes("car") ||
      cat.includes("truck") ||
      cat.includes("suv") ||
      cat.includes("van") ||
      cat.includes("auto")
    ) {
      return false;
    }
    return true;
  });
}
