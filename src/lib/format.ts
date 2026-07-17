export function bikeLabel(bike: {
  year: number;
  make: string;
  model: string;
}): string {
  return `${bike.year} ${bike.make} ${bike.model}`;
}

export function formatPrice(dollars: number | null | undefined): string {
  if (dollars == null) return "Ask for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

export function formatMiles(miles: number | null | undefined): string {
  if (miles == null) return "Mileage on request";
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}

export function interactionTypeLabel(type: string): string {
  switch (type) {
    case "PHONE_CALL":
      return "Phone call";
    case "TEXT":
      return "Text";
    case "VISIT":
      return "Visit";
    case "EMAIL":
      return "Email";
    case "TEST_RIDE":
      return "Test ride";
    default:
      return type;
  }
}
