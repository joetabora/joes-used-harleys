import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { computeDealerHash } from "../src/lib/services/inventory-sync/dealer-hash";
import { filterUsedHarley } from "../src/lib/services/inventory-sync/filter-items";
import { getMatchKey } from "../src/lib/services/inventory-sync/match-key";
import { mapItemToDealerPayload } from "../src/lib/services/inventory-sync/map-item";
import { parseFeed } from "../src/lib/services/inventory-sync/parse-feed";
import {
  contactLeadSchema,
  bikeFormSchema,
  interactionFormSchema,
  joeBikeFieldsSchema,
} from "../src/lib/validators";

const validLead = contactLeadSchema.safeParse({
  name: "Test Buyer",
  email: "buyer@example.com",
  phone: "",
  notes: "Looking for a Street Glide",
  source: "/contact",
});
assert.equal(validLead.success, true);

const invalidLead = contactLeadSchema.safeParse({
  name: "",
  email: "not-an-email",
});
assert.equal(invalidLead.success, false);

const validBike = bikeFormSchema.safeParse({
  year: "2021",
  make: "Harley-Davidson",
  model: "Street Glide",
  price: "18000",
  mileage: "12000",
  status: "AVAILABLE",
  photos: "https://example.com/a.jpg\nhttps://example.com/b.jpg",
});
assert.equal(validBike.success, true);

const validJoe = joeBikeFieldsSchema.safeParse({
  featuredRank: "2",
  status: "PENDING",
  hidden: "false",
  joeRating: "8",
  perfectFor: "Touring couples",
  favoriteFeature: "Batwing fairing",
});
assert.equal(validJoe.success, true);

const validInteraction = interactionFormSchema.safeParse({
  leadId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
  type: "PHONE_CALL",
  note: "Left voicemail",
});
assert.equal(validInteraction.success, true);

const xml = readFileSync(
  join(process.cwd(), "scripts/fixtures/inventory-sample.xml"),
  "utf8",
);
const parsed = parseFeed(xml);
assert.equal(parsed.ok, true);
assert.ok(parsed.ok);
const feedItems = parsed.ok ? parsed.items : [];
const feedParsedCount = parsed.ok ? parsed.parsedCount : 0;
assert.equal(feedParsedCount, 4);
assert.equal(feedItems.length, 4);

const usedHarley = filterUsedHarley(feedItems);
assert.equal(usedHarley.length, 2);
assert.equal(usedHarley[0]?.model, "Street Glide");
assert.equal(usedHarley[0]?.photos.length, 2);
assert.equal(usedHarley[0]?.stockNumber, "UG1001MKE");

const key = getMatchKey(usedHarley[0]!);
assert.equal(key?.kind, "vin");
assert.equal(key?.value, "1HD1KBC11MB600001");

const stockOnly = usedHarley.find((i) => i.feedId === "1004");
assert.ok(stockOnly);
assert.equal(stockOnly!.stockNumber, "00RK19MKE");
assert.equal(stockOnly!.vin, null);
const stockKey = getMatchKey(stockOnly!);
assert.equal(stockKey?.kind, "stock");
assert.equal(stockKey?.value, "00RK19MKE");

const payload = mapItemToDealerPayload(usedHarley[0]!);
assert.equal(payload.source, "FEED");
assert.equal(payload.price, 18999);
assert.equal(payload.dealerHash.length, 64);

const hash2 = computeDealerHash({
  feedId: payload.feedId,
  vin: payload.vin,
  stockNumber: payload.stockNumber,
  year: payload.year,
  make: payload.make,
  model: payload.model,
  title: payload.title,
  price: payload.price,
  mileage: payload.mileage,
  color: payload.color,
  description: payload.description,
  condition: payload.condition,
  category: payload.category,
  transmission: payload.transmission,
  certified: payload.certified,
  vrm: payload.vrm,
  listPriceRaw: payload.listPriceRaw,
  inventoryUrl: payload.inventoryUrl,
  locationId: payload.locationId,
  locationName: payload.locationName,
  city: payload.city,
  state: payload.state,
  zipcode: payload.zipcode,
  dealerPhone: payload.dealerPhone,
  dealerEmail: payload.dealerEmail,
  photos: payload.photos,
});
assert.equal(hash2, payload.dealerHash);

const malformed = parseFeed("<not-inventory></not-inventory>");
assert.equal(malformed.ok, false);

console.log("validators.test.ts + inventory-sync: ok");
