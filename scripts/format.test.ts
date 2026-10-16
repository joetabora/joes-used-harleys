import assert from "node:assert/strict";
import {
  advertisedTotalPrice,
  DEALERSHIP_ADVERTISED_FEES_USD,
  formatAdvertisedPrice,
  formatPrice,
} from "../src/lib/format";
import { productJsonLd } from "../src/lib/seo/schema";

assert.equal(DEALERSHIP_ADVERTISED_FEES_USD, 1198);
assert.equal(advertisedTotalPrice(16999), 18197);
assert.equal(advertisedTotalPrice(18499), 19697);
assert.equal(advertisedTotalPrice(null), null);
assert.equal(advertisedTotalPrice(undefined), null);
assert.equal(advertisedTotalPrice(0), null);
assert.equal(advertisedTotalPrice(-1), null);
assert.equal(formatAdvertisedPrice(16999), formatPrice(18197));
assert.equal(formatAdvertisedPrice(null), "Ask for price");
assert.equal(formatAdvertisedPrice(0), "Ask for price");
assert.equal(formatAdvertisedPrice(-50), "Ask for price");

function offerOf(price: number | null, status: string) {
  const data = productJsonLd({
    name: "2023 Harley-Davidson Street Glide",
    description: "Used Harley",
    path: "/inventory/example",
    price,
    status,
  });
  return data.offers as { price?: number; availability?: string } | undefined;
}

assert.equal(offerOf(null, "AVAILABLE"), undefined);
assert.equal(offerOf(0, "AVAILABLE"), undefined);
assert.equal(offerOf(-5, "PENDING"), undefined);
const inStock = offerOf(18197, "AVAILABLE");
assert.equal(inStock?.price, 18197);
assert.equal(inStock?.availability, "https://schema.org/InStock");
const pending = offerOf(18197, "PENDING");
assert.equal(pending?.availability, "https://schema.org/LimitedAvailability");
assert.equal(JSON.stringify(pending).includes("PreOrder"), false);

console.log("format.test.ts: ok");
