/**
 * JoeOS spacing — dense sales cockpit, sharp edges.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
} as const;

export const radius = {
  none: "0px",
  hair: "1px",
  tight: "2px",
} as const;

export const layout = {
  sidebarWidth: "13.5rem",
  contentMax: "87.5rem",
  mobileNavHeight: "3.75rem",
  pagePadX: "1rem",
  pagePadY: "1.25rem",
} as const;

/** Days-on-lot thresholds for inventory severity. */
export const agingThresholds = {
  watchDays: 45,
  hotDays: 70,
} as const;

/** Lead follow-up stale after this many days without an interaction. */
export const leadStaleDays = 3;
