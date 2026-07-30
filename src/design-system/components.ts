/**
 * JoeOS navigation IA (v3).
 * Visual recipes live in joeos.css + React primitives — not here.
 */

export const navItems = [
  { href: "/admin", label: "Command", short: "CMD", icon: "command" },
  { href: "/admin/bikes", label: "Floor", short: "FLOOR", icon: "floor" },
  { href: "/admin/leads", label: "Pipeline", short: "PIPE", icon: "pipeline" },
  { href: "/admin/sync", label: "Feed", short: "FEED", icon: "feed" },
] as const;

export type NavItem = (typeof navItems)[number];
