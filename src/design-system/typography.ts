/**
 * JoeOS typography v3 — one job per role.
 */

export const typography = {
  brand: { className: "jos-brand", face: "Oswald", transform: "uppercase" as const },
  section: { className: "jos-section", face: "Oswald", transform: "uppercase" as const },
  title: { className: "jos-title", face: "Oswald", transform: "uppercase" as const },
  item: { className: "jos-item", face: "Oswald" },
  label: { className: "jos-label", face: "Oswald", transform: "uppercase" as const },
  kpi: { className: "jos-kpi", face: "Oswald" },
  body: { className: "jos-body", face: "Source Serif 4" },
  data: { className: "jos-data", face: "ui-monospace" },
} as const;
