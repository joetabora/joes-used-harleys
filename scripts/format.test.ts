import assert from "node:assert/strict";
import {
  advertisedTotalPrice,
  DEALERSHIP_ADVERTISED_FEES_USD,
  formatAdvertisedPrice,
  formatPrice,
} from "../src/lib/format";

assert.equal(DEALERSHIP_ADVERTISED_FEES_USD, 1198);
assert.equal(advertisedTotalPrice(16999), 18197);
assert.equal(advertisedTotalPrice(18499), 19697);
assert.equal(advertisedTotalPrice(null), null);
assert.equal(advertisedTotalPrice(0), 0);
assert.equal(formatAdvertisedPrice(16999), formatPrice(18197));
assert.equal(formatAdvertisedPrice(null), "Ask for price");

console.log("format.test.ts: ok");
