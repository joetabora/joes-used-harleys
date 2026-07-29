/**
 * JoeOS typography — instrument panel + racing data sheet.
 */

export const typography = {
  brand: {
    family: "Oswald",
    className: "joeos-brand",
    weight: 700,
    transform: "uppercase" as const,
    tracking: "0.08em",
  },
  label: {
    family: "Oswald",
    className: "joeos-label",
    weight: 600,
    transform: "uppercase" as const,
    tracking: "0.14em",
    size: "0.7rem",
  },
  heading: {
    family: "Oswald",
    className: "joeos-heading",
    weight: 700,
    transform: "uppercase" as const,
    tracking: "0.04em",
  },
  kpi: {
    family: "Oswald",
    className: "joeos-kpi",
    weight: 700,
    tracking: "-0.02em",
  },
  body: {
    family: "Source Serif 4",
    className: "joeos-body",
    weight: 400,
    size: "0.95rem",
    leading: 1.55,
  },
  data: {
    family: "ui-monospace",
    className: "joeos-data",
    size: "0.8rem",
  },
} as const;
