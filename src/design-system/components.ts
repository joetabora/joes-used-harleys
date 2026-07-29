/**
 * JoeOS component recipes + navigation IA (v2 Command Center).
 */

export const components = {
  shell: "jos",
  rail: "jos-rail",
  bottomNav: "jos-bottom-nav",
  stage: "jos-stage",
  panel: "jos-panel",
  panelRaised: "jos-panel-raised",
  btnPrimary: "jos-btn jos-btn-primary",
  btnGhost: "jos-btn jos-btn-ghost",
  pillHot: "jos-pill jos-pill-hot",
  pillWatch: "jos-pill jos-pill-watch",
  pillAging: "jos-pill jos-pill-aging",
  pillOk: "jos-pill jos-pill-ok",
  gaugeTrack: "jos-gauge-track",
  gaugeFill: "jos-gauge-fill",
  assetTile: "jos-asset-tile",
  queueRow: "jos-queue-row",
} as const;

export const navItems = [
  { href: "/admin", label: "Command", short: "CMD", icon: "command" },
  { href: "/admin/bikes", label: "Floor", short: "FLOOR", icon: "floor" },
  { href: "/admin/leads", label: "Pipeline", short: "PIPE", icon: "pipeline" },
  { href: "/admin/sync", label: "Feed", short: "FEED", icon: "feed" },
] as const;
