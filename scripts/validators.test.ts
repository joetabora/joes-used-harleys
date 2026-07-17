import assert from "node:assert/strict";
import { contactLeadSchema, alertSchema } from "../src/lib/validators";

const validLead = contactLeadSchema.safeParse({
  name: "Test Buyer",
  email: "buyer@example.com",
  phone: "",
  message: "Looking for a Street Glide",
  sourcePage: "/contact",
});
assert.equal(validLead.success, true);

const invalidLead = contactLeadSchema.safeParse({
  name: "",
  email: "not-an-email",
});
assert.equal(invalidLead.success, false);

const validAlert = alertSchema.safeParse({
  email: "buyer@example.com",
  model: "Street Glide",
  maxPrice: "18000",
});
assert.equal(validAlert.success, true);
if (validAlert.success) {
  assert.equal(validAlert.data.maxPrice, 18000);
}

console.log("validators.test.ts: ok");
