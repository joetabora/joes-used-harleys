import assert from "node:assert/strict";
import {
  cleanModelName,
  composeMarketplaceListing,
  displayYearMakeModel,
  extractUnitSpecificNotes,
  MARKETPLACE_LISTING_STYLES,
  type MarketplaceBikeInput,
} from "../src/lib/marketplace/compose-listing";

const VIN = "1HD1XXXXXXXXXXXXX";

const TRADE =
  "🔄 TRADES WELCOME — WE TAKE ANYTHING WITH A TITLE IN TRADE!";
const DEALER = "📍 Milwaukee Harley-Davidson";
const FINANCING = "💳 FINANCING AVAILABLE";
const CONTACT =
  "📩 Message me for more information or to set up a time to check it out.";

function bike(overrides: Partial<MarketplaceBikeInput> = {}): MarketplaceBikeInput {
  return {
    year: 2021,
    make: "Harley-Davidson",
    model: "Road Glide Special",
    price: 21995,
    mileage: 18442,
    color: "Black",
    description: null,
    transmission: "6-Speed",
    category: "Motorcycle",
    stockNumber: "U21234",
    certified: null,
    vin: VIN,
    ...overrides,
  };
}

function assertNoVin(listing: ReturnType<typeof composeMarketplaceListing>) {
  assert.equal(listing.title.includes(VIN), false);
  assert.equal(listing.priceLine.includes(VIN), false);
  assert.equal(listing.description.includes(VIN), false);
  assert.equal(listing.combined.includes(VIN), false);
}

function assertNoInternalInventoryFields(text: string) {
  assert.equal(text.includes("Transmission:"), false);
  assert.equal(text.includes("Category:"), false);
  assert.equal(text.includes("Stock #:"), false);
  assert.equal(text.includes("Stock Number"), false);
  assert.equal(text.includes("6-Speed"), false);
  assert.equal(text.includes("U21234"), false);
}

function assertNoInventedClaims(text: string) {
  const lower = text.toLowerCase();
  for (const banned of [
    "warranty",
    "apr",
    "monthly payment",
    "down payment",
    "approved",
    "any type of credit",
    "bad credit",
    "guaranteed",
    "zero down",
    "test ride",
    "stage 1",
    "new tires",
    "fresh service",
    "one owner",
    "mint condition",
    "immaculate",
    "rare",
    "exceptional",
  ]) {
    assert.equal(lower.includes(banned), false, `invented claim: ${banned}`);
  }
  assertNoInternalInventoryFields(text);
}

function assertRequiredContent(description: string) {
  assert.ok(description.includes("PRE-OWNED"));
  assert.equal(description.includes(FINANCING), true);
  assert.ok(description.includes(TRADE));
  assert.ok(description.includes(DEALER));
  assert.ok(description.includes(CONTACT));
  // Financing must be exact — not the old longer line
  assert.equal(description.includes("FOR ANY TYPE OF CREDIT"), false);
}

function countOccurrences(hay: string, needle: string): number {
  let count = 0;
  let idx = 0;
  const upper = hay.toUpperCase();
  const n = needle.toUpperCase();
  while (true) {
    const found = upper.indexOf(n, idx);
    if (found < 0) break;
    count += 1;
    idx = found + n.length;
  }
  return count;
}

// cleanModelName / displayYearMakeModel — duplicate year/make regression
{
  const cleaned = cleanModelName(
    2022,
    "Harley-Davidson",
    "2022 Harley-Davidson Tri Glide Ultra",
  );
  assert.equal(cleaned, "Tri Glide Ultra");

  const ymm = displayYearMakeModel(
    bike({
      year: 2022,
      model: "2022 Harley-Davidson Tri Glide Ultra",
    }),
  );
  assert.equal(ymm, "2022 Harley-Davidson Tri Glide Ultra");
  assert.equal(countOccurrences(ymm, "2022"), 1);
  assert.equal(countOccurrences(ymm, "Harley-Davidson"), 1);

  const listing = composeMarketplaceListing(
    bike({
      year: 2022,
      model: "2022 Harley-Davidson Tri Glide Ultra",
      color: null,
      description: null,
    }),
  );
  assert.equal(listing.title, "2022 Harley-Davidson Tri Glide Ultra");
  assert.ok(
    listing.description.includes(
      "🔥 PRE-OWNED 2022 HARLEY-DAVIDSON TRI GLIDE ULTRA 🔥",
    ),
  );
  assert.equal(
    countOccurrences(listing.description, "2022 HARLEY-DAVIDSON"),
    1,
  );
  // Body should use conversational model name, not full YMM
  assert.equal(
    listing.description.includes(
      "looking for a 2022 Harley-Davidson Tri Glide Ultra",
    ),
    false,
  );
}

// Title with color; normal model unchanged
{
  const listing = composeMarketplaceListing(bike());
  assert.equal(listing.title, "2021 Harley-Davidson Road Glide Special - Black");
  assert.equal(listing.priceLine, "$21,995 + tax, title & fees");
  assert.ok(listing.description.includes("💰 $21,995 + tax, title & fees"));
  assert.ok(listing.description.includes("🛣️ 18,442 miles"));
  assert.ok(listing.description.includes("🖤 Black"));
  assertRequiredContent(listing.description);
  assertNoVin(listing);
  assertNoInventedClaims(listing.description);
}

// Financing exact wording
{
  const listing = composeMarketplaceListing(bike());
  assert.ok(listing.description.includes(FINANCING));
  assert.equal(
    listing.description.includes("Financing available for any type of credit"),
    false,
  );
}

// All five styles — distinct pitches when falling back to personality
{
  const pitches = new Set<string>();
  for (const style of MARKETPLACE_LISTING_STYLES) {
    const listing = composeMarketplaceListing(
      bike({
        year: 2018,
        model: "Fat Boy",
        price: 14_500,
        mileage: 52_000,
        description: null,
        color: null,
      }),
      style,
    );
    assert.equal(listing.style, style);
    assertRequiredContent(listing.description);
    assertNoVin(listing);
    assertNoInventedClaims(listing.description);
    pitches.add(listing.description);
  }
  assert.equal(pitches.size, 5, "styles must produce distinct descriptions");
}

// Missing price / mileage — omit, never invent
{
  const noPrice = composeMarketplaceListing(bike({ price: null }));
  assert.equal(noPrice.priceLine, "");
  assert.equal(noPrice.description.includes("Ask for price"), false);
  assert.equal(noPrice.description.includes("$"), false);
  assertRequiredContent(noPrice.description);

  const noMiles = composeMarketplaceListing(bike({ mileage: null }));
  assert.equal(noMiles.description.includes("miles"), false);
  assert.equal(noMiles.description.includes("Mileage on request"), false);
  assertRequiredContent(noMiles.description);
}

// Internal fields never appear
{
  const listing = composeMarketplaceListing(
    bike({
      description: null,
      transmission: "6-Speed",
      category: "Motorcycle",
      stockNumber: "U21234",
      vin: VIN,
    }),
  );
  assertNoInternalInventoryFields(listing.description);
  assertNoVin(listing);
}

// Brochure manufacturer copy is NOT reproduced
{
  const brochure =
    "The ultimate Touring model from Harley-Davidson. Get all the premium features with classic Sportster form and modern function. One of the world's most distinctive motorcycles with 90 horsepower and advanced suspension.";
  assert.equal(extractUnitSpecificNotes(brochure), null);

  const listing = composeMarketplaceListing(bike({ description: brochure }));
  assert.equal(listing.description.includes("ultimate Touring"), false);
  assert.equal(listing.description.includes("premium features"), false);
  assert.equal(listing.description.includes("horsepower"), false);
  assert.equal(listing.description.includes("distinctive motorcycles"), false);
  assertRequiredContent(listing.description);
}

// Short unit-specific notes ARE used and lead the pitch
{
  const note = "Low Miles. Bars, Exhaust and more.";
  assert.ok(extractUnitSpecificNotes(note));

  const listing = composeMarketplaceListing(
    bike({
      year: 2013,
      model: "Super Glide Custom",
      price: 8499,
      mileage: 16669,
      color: "Black",
      description: note,
    }),
  );
  assert.ok(/bars/i.test(listing.description));
  assert.ok(/exhaust/i.test(listing.description));
  // Unit facts should appear before generic model-only fallback language
  const pitchStart = listing.description.indexOf("🔥 Low");
  assert.ok(pitchStart > 0, "pitch should lead with low miles / unit notes");
  assert.equal(listing.description.includes("Stage 1"), false);
  assert.equal(listing.description.includes("new tires"), false);
  assertRequiredContent(listing.description);
}

// Strongly low mileage drives the pitch
{
  const listing = composeMarketplaceListing(
    bike({
      year: 2025,
      model: "Nightster",
      price: 9499,
      mileage: 2144,
      color: "Billiard Gray",
      description: null,
    }),
  );
  assert.ok(listing.description.includes("Only 2,144 miles"));
  assert.ok(
    listing.description.includes("🔥 PRE-OWNED 2025 HARLEY-DAVIDSON NIGHTSTER 🔥"),
  );
  assert.ok(listing.description.includes("💰 $9,499 + tax, title & fees"));
  assert.ok(listing.description.includes("🛣️ 2,144 miles"));
  assert.ok(listing.description.includes("Billiard Gray"));
  assertRequiredContent(listing.description);
  assertNoInventedClaims(listing.description);
}

// Approachable price can frame older touring bikes (no invented accessories)
{
  const listing = composeMarketplaceListing(
    bike({
      year: 2009,
      model: "Electra Glide Ultra Classic",
      price: 8999,
      mileage: 47_424,
      color: "WHT GOLD/PEWTER",
      description: null,
    }),
  );
  assert.ok(
    /\$8,999|lot of motorcycle|Hard to overlook|worth a closer look/i.test(
      listing.description,
    ),
  );
  assert.equal(listing.description.toLowerCase().includes("saddlebags"), false);
  assert.equal(listing.description.toLowerCase().includes("new tires"), false);
  assertRequiredContent(listing.description);
}

// Tri Glide mid miles — road context, not blanket "low miles"
{
  const listing = composeMarketplaceListing(
    bike({
      year: 2021,
      model: "Tri Glide Ultra",
      price: 22_995,
      mileage: 26_403,
      color: null,
      description: null,
    }),
  );
  assert.ok(listing.description.includes("26,403"));
  assert.equal(listing.description.includes("Low miles for a"), false);
  assert.equal(listing.description.includes("Only 26,403"), false);
  assertRequiredContent(listing.description);
}

// HTML unit notes normalize; brochure HTML rejected
{
  const shortHtml = extractUnitSpecificNotes(
    "<p>Low miles.</p><br/>Bars and exhaust",
  );
  assert.ok(shortHtml);
  assert.equal(shortHtml!.includes("<p>"), false);

  const longBrochure = extractUnitSpecificNotes(
    "<p>The ultimate Touring model from Harley-Davidson with premium features and classic form and modern function for riders who want it all.</p>",
  );
  assert.equal(longBrochure, null);
}

console.log("marketplace tests passed");
