/** JoeOS inventory sync — feed config. */

export const DEFAULT_FEED_URL =
  "https://milwaukeeharley.com/inventory/xml?location=1595";

export const FEED_FETCH_TIMEOUT_MS = 60_000;

export const MAKE_FILTER = "harley-davidson";
export const CONDITION_FILTER = "used";

export function getFeedUrl(): string {
  const fromEnv = process.env.INVENTORY_FEED_URL?.trim();
  if (fromEnv && !fromEnv.includes("PLACEHOLDER")) return fromEnv;
  return DEFAULT_FEED_URL;
}
