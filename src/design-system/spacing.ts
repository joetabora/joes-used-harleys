/**
 * JoeOS spacing + operational thresholds (v3).
 * CSS vars --jos-space-1 … --jos-space-8 are the runtime scale.
 */

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 48,
} as const;

export const radius = {
  none: "0px",
  hair: "1px",
  tight: "2px",
} as const;

export const layout = {
  railWidth: "4.5rem",
  contentMax: "90rem",
  mobileNavHeight: "4rem",
  touchMin: "2.75rem",
} as const;

/** Days-on-lot thresholds for inventory severity. */
export const agingThresholds = {
  watchDays: 45,
  hotDays: 70,
} as const;

/** Lead follow-up stale after this many days without an interaction. */
export const leadStaleDays = 3;
