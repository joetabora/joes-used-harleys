export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

export function formatPrice(centsOrDollars: number | null | undefined): string {
  if (centsOrDollars == null) return "Ask for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(centsOrDollars);
}

export function formatMiles(miles: number | null | undefined): string {
  if (miles == null) return "Mileage on request";
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}
