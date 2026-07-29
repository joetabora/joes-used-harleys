/**
 * JoeOS cockpit color system — dark garage / Harley factory.
 * Scoped at runtime under `.joeos` CSS variables. No blue/purple.
 */

export const colors = {
  void: "#090909",
  pit: "#111111",
  panel: "#181818",
  panelRaised: "#222222",
  steel: "#8A8F98",
  aluminum: "#C5C9CE",
  bone: "#F2F2F0",
  orange: "#F4511E",
  orangeDim: "#B33A14",
  danger: "#E53935",
  success: "#4F7A5A",
  warn: "#E6A23C",
} as const;

export type JoeOsColor = keyof typeof colors;

export const colorRoles = {
  background: "void",
  shell: "pit",
  surface: "panel",
  surfaceRaised: "panelRaised",
  text: "bone",
  textMuted: "steel",
  border: "aluminum",
  accent: "orange",
  accentPressed: "orangeDim",
  hot: "orange",
  watch: "warn",
  aging: "danger",
  ok: "success",
} as const satisfies Record<string, JoeOsColor>;

export function cssVar(token: JoeOsColor): string {
  return `var(--joeos-${token})`;
}
