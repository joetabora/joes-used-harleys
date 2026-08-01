import assert from "node:assert/strict";
import {
  buildQrCellLabel,
  buildQrSheetPayload,
  chunkForQrSheet,
  parseQrSheetRows,
  sortBikesForQrSheet,
  QR_SHEET_COLS,
} from "../src/lib/joeos/qr-sheet";

assert.equal(parseQrSheetRows(undefined), 5);
assert.equal(parseQrSheetRows("6"), 6);
assert.equal(parseQrSheetRows("5"), 5);

const pages = chunkForQrSheet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], QR_SHEET_COLS, 2);
assert.equal(pages.length, 2);
assert.deepEqual(pages[0], [1, 2, 3, 4, 5, 6, 7, 8]);
assert.deepEqual(pages[1], [9, 10, 11]);

const label = buildQrCellLabel({
  id: "1",
  year: 2024,
  make: "Harley-Davidson",
  model: "Softail",
  vin: "1HD1BVJ12RB039417",
  stockNumber: "B039417-MKE",
});
assert.equal(label.primary, "B039417-MKE");
assert.match(label.secondary, /Softail/);

const noStock = buildQrCellLabel({
  id: "2",
  year: 2020,
  make: "Harley-Davidson",
  model: "Road King",
  vin: "1HD1FGH20YB123456",
  stockNumber: null,
});
assert.equal(noStock.primary, "VIN …123456");

process.env.NEXT_PUBLIC_SITE_URL = "https://www.joesusedharleys.com";
const payload = buildQrSheetPayload({
  vin: "1HD1BVJ12RB039417",
  stockNumber: "B039417-MKE",
});
assert.ok(payload);
assert.match(payload!, /\/v\/1HD1BVJ12RB039417/);
assert.match(payload!, /src=qr/);

const sorted = sortBikesForQrSheet([
  {
    id: "b",
    year: 2020,
    make: "A",
    model: "Z",
    vin: "V2",
    stockNumber: "B200",
  },
  {
    id: "a",
    year: 2021,
    make: "A",
    model: "Y",
    vin: "V1",
    stockNumber: "A100",
  },
]);
assert.equal(sorted[0]!.stockNumber, "A100");

console.log("qr-sheet.test.ts: ok");
