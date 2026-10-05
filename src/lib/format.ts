export function bikeLabel(bike: {
  year: number;
  make: string;
  model: string;
}): string {
  return `${bike.year} ${bike.make} ${bike.model}`;
}

/**
 * Milwaukee Harley-Davidson adds these to the vehicle price in their public
 * "Total price" (dealer prep $699 + document fee $499). The XML feed only
 * carries the vehicle price; we add these at display time so Joe's site
 * matches what shoppers see on the dealership site.
 */
export const DEALERSHIP_ADVERTISED_FEES_USD = 699 + 499;

/** Vehicle feed price → dealership advertised total. Leaves null/≤0 unchanged. */
export function advertisedTotalPrice(
  vehiclePrice: number | null | undefined,
): number | null {
  if (vehiclePrice == null) return null;
  if (!Number.isFinite(vehiclePrice) || vehiclePrice <= 0) return vehiclePrice;
  return vehiclePrice + DEALERSHIP_ADVERTISED_FEES_USD;
}

export function formatPrice(dollars: number | null | undefined): string {
  if (dollars == null) return "Ask for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

/** Public customer-facing price (matches Milwaukee Harley "Total price"). */
export function formatAdvertisedPrice(
  vehiclePrice: number | null | undefined,
): string {
  return formatPrice(advertisedTotalPrice(vehiclePrice));
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
