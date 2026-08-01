import assert from "node:assert/strict";
import {
  deriveScanVisibility,
  isScanBikeIndexable,
  isScanBikeRenderable,
} from "../src/lib/vehicle/visibility";
import { normalizeStockSlug, normalizeVinSlug } from "../src/lib/vehicle/slugs";
import { buildScanBikeFields } from "../src/lib/vehicle/scan-fields";
import { composeVehiclePage } from "../src/lib/vehicle/compose-vehicle-page";
import { normalizeDealerDescription } from "../src/lib/vehicle/normalize-description";
import { filterMotorcycles, filterUsedHarley } from "../src/lib/services/inventory-sync/filter-items";
import type { ParsedFeedItem } from "../src/lib/services/inventory-sync/types";

function item(partial: Partial<ParsedFeedItem> & Pick<ParsedFeedItem, "feedId" | "year" | "make" | "model">): ParsedFeedItem {
  return {
    title: null,
    price: null,
    mileage: null,
    color: null,
    description: null,
    condition: null,
    category: null,
    transmission: null,
    certified: null,
    vrm: null,
    listPriceRaw: null,
    inventoryUrl: null,
    locationId: null,
    locationName: null,
    city: null,
    state: null,
    zipcode: null,
    dealerPhone: null,
    dealerEmail: null,
    stockNumber: null,
    vin: null,
    photos: [],
    ...partial,
  };
}

assert.equal(normalizeVinSlug(" 1hd1abc "), "1HD1ABC");
assert.equal(normalizeStockSlug("  U123  "), "U123");
assert.equal(normalizeVinSlug(""), null);

assert.equal(
  deriveScanVisibility({
    make: "Harley-Davidson",
    condition: "Used",
    status: "AVAILABLE",
  }),
  "PUBLIC_INDEX",
);
assert.equal(
  deriveScanVisibility({
    make: "Harley-Davidson",
    condition: "New",
    status: "AVAILABLE",
  }),
  "QR_ONLY",
);
assert.equal(
  deriveScanVisibility({
    make: "Honda",
    condition: "Used",
    status: "AVAILABLE",
  }),
  "QR_ONLY",
);
assert.equal(
  deriveScanVisibility({
    make: "Harley-Davidson",
    condition: "Used",
    status: "SOLD",
  }),
  "ARCHIVED",
);
assert.equal(
  deriveScanVisibility({
    make: "Harley-Davidson",
    condition: "Used",
    status: "SOLD",
    archiveSold: false,
  }),
  "HIDDEN",
);

assert.equal(isScanBikeIndexable("PUBLIC_INDEX"), true);
assert.equal(isScanBikeIndexable("QR_ONLY"), false);
assert.equal(isScanBikeRenderable("HIDDEN"), false);

const fields = buildScanBikeFields({
  vin: "1hd1xyz",
  stockNumber: " S1 ",
  make: "Harley-Davidson",
  condition: "Used",
  status: "AVAILABLE",
});
assert.equal(fields.scanSlugVin, "1HD1XYZ");
assert.equal(fields.scanSlugStock, "S1");
assert.equal(fields.scanVisibility, "PUBLIC_INDEX");

const view = composeVehiclePage({
  id: "b1",
  vin: "1HD1XYZ",
  stockNumber: "S1",
  year: 2020,
  make: "Harley-Davidson",
  model: "Street Glide",
  title: null,
  price: 15000,
  mileage: 12000,
  color: "Black",
  description: "Clean",
  condition: "Used",
  category: "Motorcycle",
  transmission: null,
  certified: null,
  photos: ["https://example.com/a.jpg"],
  status: "AVAILABLE",
  scanVisibility: "PUBLIC_INDEX",
  scanSlugVin: "1HD1XYZ",
  scanSlugStock: "S1",
  archivedAt: null,
  dealerPhone: null,
  city: "Milwaukee",
  state: "WI",
});
assert.ok(view);
assert.equal(view!.indexable, true);
assert.match(view!.title, /Street Glide/);
assert.equal(view!.description, "Clean");
assert.ok(!JSON.stringify(view).includes("perfectFor"));

assert.equal(
  normalizeDealerDescription("<p>Nice bike<br/>Low miles</p>"),
  "Nice bike\nLow miles",
);
assert.equal(normalizeDealerDescription("   "), null);

const feed = [
  item({ feedId: "1", year: 2020, make: "Harley-Davidson", model: "Road King", condition: "Used" }),
  item({ feedId: "2", year: 2024, make: "Harley-Davidson", model: "Fat Boy", condition: "New" }),
  item({ feedId: "3", year: 2019, make: "Honda", model: "Rebel", condition: "Used", category: "Motorcycle" }),
  item({ feedId: "4", year: 2018, make: "Ford", model: "F-150", condition: "Used", category: "Truck" }),
];
assert.equal(filterUsedHarley(feed).length, 1);
assert.equal(filterMotorcycles(feed).length, 3);

console.log("scanbike.test.ts: ok");
