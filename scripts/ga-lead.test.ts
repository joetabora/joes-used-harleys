import assert from "node:assert/strict";
import { gaConversionParams, inventoryBikeId } from "../src/lib/analytics/ga";

const vin = "1HD1KEF15PB123456";
const bike = "/inventory/ck_bike123";

assert.equal(inventoryBikeId("/inventory"), null);
assert.equal(inventoryBikeId(bike), "ck_bike123");
assert.equal(inventoryBikeId(`/inventory/${vin}`), null);
assert.equal(inventoryBikeId(`/inventory/ck_bike123?email=a@b.com`), "ck_bike123");

const call = gaConversionParams("/", { event: "click_to_call", linkLocation: "home" });
assert.deepEqual(call, { page_path: "/", link_location: "home" });
assert.equal(JSON.stringify(call).includes("tel:"), false);

const text = gaConversionParams(bike, { event: "click_to_text", linkLocation: "header" });
assert.deepEqual(text, { page_path: bike, bike_id: "ck_bike123", link_location: "header" });

const email = gaConversionParams("/contact?email=buyer@example.com", {
  event: "click_to_email",
  linkLocation: "contact",
});
assert.deepEqual(email, { page_path: "/contact", link_location: "contact" });
assert.equal(JSON.stringify(email).includes("buyer@"), false);

assert.equal(gaConversionParams("/admin", { event: "click_to_text", linkLocation: "header" }), null);
assert.equal(gaConversionParams(`/v/${vin}`, { event: "click_to_email", linkLocation: "footer" }), null);
assert.equal(gaConversionParams(`/inventory/${vin}`, { event: "form_start" }), null);

const start = gaConversionParams(`${bike}?q=${vin}`, { event: "form_start" });
assert.deepEqual(start, { page_path: bike, bike_id: "ck_bike123" });
assert.equal(JSON.stringify(start).includes(vin), false);
assert.equal(JSON.stringify(start).includes("?"), false);

const lead = gaConversionParams("/about", { event: "generate_lead" });
assert.deepEqual(lead, { page_path: "/about" });
assert.equal("name" in (lead ?? {}), false);
assert.equal("email" in (lead ?? {}), false);
assert.equal("phone" in (lead ?? {}), false);
assert.equal("notes" in (lead ?? {}), false);

assert.deepEqual(gaConversionParams("/inventory", { event: "generate_lead" }), {
  page_path: "/inventory",
});

console.log("ga-lead.test.ts: ok");
