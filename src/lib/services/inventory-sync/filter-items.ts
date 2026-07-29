import { CONDITION_FILTER, MAKE_FILTER } from "./config";
import type { ParsedFeedItem } from "./types";

/** Keep only used Harley-Davidson motorcycles. */
export function filterUsedHarley(items: ParsedFeedItem[]): ParsedFeedItem[] {
  return items.filter((item) => {
    const condition = (item.condition ?? "").trim().toLowerCase();
    const make = (item.make ?? "").trim().toLowerCase();
    return condition === CONDITION_FILTER && make === MAKE_FILTER;
  });
}
