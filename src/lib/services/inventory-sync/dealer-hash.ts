import { createHash } from "node:crypto";

/** Canonical dealer fields used for dealerHash (never Joe fields). */
export type DealerHashInput = {
  feedId: string | null;
  vin: string | null;
  stockNumber: string | null;
  year: number;
  make: string;
  model: string;
  title: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  description: string | null;
  condition: string | null;
  category: string | null;
  transmission: string | null;
  certified: string | null;
  vrm: string | null;
  listPriceRaw: string | null;
  inventoryUrl: string | null;
  locationId: string | null;
  locationName: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  dealerPhone: string | null;
  dealerEmail: string | null;
  photos: string[];
};

function normalize(value: string | number | null | undefined): string | number | null {
  if (value === undefined) return null;
  if (typeof value === "string") return value.trim();
  return value;
}

/** Stable SHA-256 of dealership-owned payload only. */
export function computeDealerHash(input: DealerHashInput): string {
  const canonical = {
    feedId: normalize(input.feedId),
    vin: normalize(input.vin),
    stockNumber: normalize(input.stockNumber),
    year: input.year,
    make: normalize(input.make),
    model: normalize(input.model),
    title: normalize(input.title),
    price: input.price,
    mileage: input.mileage,
    color: normalize(input.color),
    description: normalize(input.description),
    condition: normalize(input.condition),
    category: normalize(input.category),
    transmission: normalize(input.transmission),
    certified: normalize(input.certified),
    vrm: normalize(input.vrm),
    listPriceRaw: normalize(input.listPriceRaw),
    inventoryUrl: normalize(input.inventoryUrl),
    locationId: normalize(input.locationId),
    locationName: normalize(input.locationName),
    city: normalize(input.city),
    state: normalize(input.state),
    zipcode: normalize(input.zipcode),
    dealerPhone: normalize(input.dealerPhone),
    dealerEmail: normalize(input.dealerEmail),
    photos: input.photos.map((p) => p.trim()).filter(Boolean),
  };

  const json = JSON.stringify(canonical);
  return createHash("sha256").update(json, "utf8").digest("hex");
}
