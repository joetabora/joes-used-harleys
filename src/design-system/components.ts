/**
 * JoeOS component recipes — class names and intent for the cockpit UI.
 */

export const components = {
  shell: {
    root: "joeos",
    sidebar: "joeos-sidebar",
    mobileNav: "joeos-mobile-nav",
    main: "joeos-main",
    statusStrip: "joeos-status-strip",
  },
  panel: {
    base: "joeos-panel",
    raised: "joeos-panel-raised",
  },
  button: {
    primary: "joeos-btn joeos-btn-primary",
    ghost: "joeos-btn joeos-btn-ghost",
    danger: "joeos-btn joeos-btn-danger",
  },
  pill: {
    hot: "joeos-pill joeos-pill-hot",
    watch: "joeos-pill joeos-pill-watch",
    aging: "joeos-pill joeos-pill-aging",
    ok: "joeos-pill joeos-pill-ok",
    muted: "joeos-pill joeos-pill-muted",
  },
  gauge: {
    track: "joeos-gauge-track",
    fill: "joeos-gauge-fill",
  },
  table: {
    root: "joeos-table",
  },
  actionRow: {
    root: "joeos-action-row",
  },
  kpi: {
    root: "joeos-kpi-block",
  },
} as const;

export const navItems = [
  { href: "/admin", label: "Briefing", icon: "briefing" },
  { href: "/admin/bikes", label: "Inventory", icon: "inventory" },
  { href: "/admin/leads", label: "Leads", icon: "leads" },
  { href: "/admin/sync", label: "Sync", icon: "sync" },
] as const;
