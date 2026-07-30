/**
 * JoeOS design system v3 — motorcycle sales command center.
 * Runtime CSS under .jos is source of truth; this mirrors tokens for TS.
 */

export const colors = {
  void: "#080808",
  voidDeep: "#0D0D0D",
  panel: "#151515",
  panelRaised: "#202020",
  orange: "#F4511E",
  orangeHot: "#FF6A00",
  orangeDim: "#B33A14",
  steel: "#8A8F98",
  silver: "#C5C9CE",
  bone: "#F5F5F3",
  danger: "#E53935",
  success: "#4F7A5A",
  warn: "#E6A23C",
} as const;

export type JoeOsColor = keyof typeof colors;

/** Map JS keys to CSS custom property names (camelCase → kebab where needed). */
const cssName: Record<JoeOsColor, string> = {
  void: "void",
  voidDeep: "void-deep",
  panel: "panel",
  panelRaised: "panel-raised",
  orange: "orange",
  orangeHot: "orange-hot",
  orangeDim: "orange-dim",
  steel: "steel",
  silver: "silver",
  bone: "bone",
  danger: "danger",
  success: "success",
  warn: "warn",
};

export function cssVar(token: JoeOsColor): string {
  return `var(--jos-${cssName[token]})`;
}
