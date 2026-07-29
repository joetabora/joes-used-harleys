import { createHash } from "node:crypto";
import type { DealerBikePayload, ParsedFeedItem } from "./types";
import { computeDealerHash } from "./dealer-hash";

/** Map XML item → dealership columns + hash (no Joe fields). */
export function mapItemToDealerPayload(item: ParsedFeedItem): DealerBikePayload {
  const base = {
    source: "FEED" as const,
    feedId: item.feedId,
    vin: item.vin,
    stockNumber: item.stockNumber,
    year: item.year,
    make: item.make,
    model: item.model,
    title: item.title,
    price: item.price,
    mileage: item.mileage,
    color: item.color,
    description: item.description,
    condition: item.condition,
    category: item.category,
    transmission: item.transmission,
    certified: item.certified,
    vrm: item.vrm,
    listPriceRaw: item.listPriceRaw,
    inventoryUrl: item.inventoryUrl,
    locationId: item.locationId,
    locationName: item.locationName,
    city: item.city,
    state: item.state,
    zipcode: item.zipcode,
    dealerPhone: item.dealerPhone,
    dealerEmail: item.dealerEmail,
    photos: item.photos,
  };

  return {
    ...base,
    dealerHash: computeDealerHash(base),
  };
}

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}
