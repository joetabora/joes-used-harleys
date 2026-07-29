/**
 * JoeOS design system v2 — motorcycle sales command center.
 * No blue primary. Harley orange + void / gunmetal.
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

export function cssVar(token: JoeOsColor): string {
  return `var(--jos-${token})`;
}
