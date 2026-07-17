import assert from "node:assert/strict";
import { contactLeadSchema, bikeFormSchema, interactionFormSchema } from "../src/lib/validators";

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

const validInteraction = interactionFormSchema.safeParse({
  leadId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
  type: "PHONE_CALL",
  note: "Left voicemail",
});
assert.equal(validInteraction.success, true);

console.log("validators.test.ts: ok");
