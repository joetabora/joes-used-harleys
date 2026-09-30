import assert from "node:assert/strict";
import {
  composeMarketplaceListing,
  MARKETPLACE_LISTING_STYLES,
  type MarketplaceBikeInput,
} from "../src/lib/marketplace/compose-listing";

const VIN = "1HD1XXXXXXXXXXXXX";

const TRADE =
  "🔄 TRADES WELCOME — we take anything with a title in trade!";
const DEALER = "📍 Milwaukee Harley-Davidson";
const FINANCING = "Financing available for any type of credit";
const CONTACT = "📩 Message me for more information about this bike.";

function bike(overrides: Partial<MarketplaceBikeInput> = {}): MarketplaceBikeInput {
  return {
    year: 2021,
    make: "Harley-Davidson",
    model: "Road Glide Special",
    price: 21995,
    mileage: 18442,
    color: "Black",
    description: "Clean bagger with bags.",
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

function assertNoInventedClaims(text: string) {
  const lower = text.toLowerCase();
  for (const banned of [
    "warranty",
    "apr",
    "monthly payment",
    "test ride",
    "abs",
    "stage 1",
    "upgraded",
    "mint condition",
    "immaculate",
    "rare",
    "exceptional",
  ]) {
    assert.equal(lower.includes(banned), false, `invented claim: ${banned}`);
  }
  assert.equal(text.includes("Transmission:"), false);
  assert.equal(text.includes("Category:"), false);
  assert.equal(text.includes("Stock #:"), false);
}

function assertRequiredFooter(description: string) {
  assert.ok(description.includes("PRE-OWNED") || description.includes("pre-owned"));
  assert.ok(description.includes(TRADE));
  assert.ok(description.includes(DEALER));
  assert.ok(description.includes(FINANCING));
  assert.ok(description.includes(CONTACT));
}

function assertPreferredEmojisUsed(description: string) {
  const preferred = ["🔥", "🏍️", "💰", "🔄", "📍", "📩", "👀", "🛣️"];
  assert.ok(
    preferred.some((e) => description.includes(e)),
    "expected at least one preferred emoji",
  );
}

// Title rules
{
  const withColor = composeMarketplaceListing(bike());
  assert.equal(withColor.title, "2021 Harley-Davidson Road Glide Special - Black");
  const noColor = composeMarketplaceListing(bike({ color: null }));
  assert.equal(noColor.title, "2021 Harley-Davidson Road Glide Special");
}

// Price format
{
  const listing = composeMarketplaceListing(bike({ price: 21995 }));
  assert.equal(listing.priceLine, "$21,995 + tax, title & fees");
  assert.ok(listing.description.includes("💰 $21,995 + tax, title & fees"));
}

// All five styles — distinct, required language, emojis, no VIN, no invented specs
{
  const descriptions = new Set<string>();
  for (const style of MARKETPLACE_LISTING_STYLES) {
    const listing = composeMarketplaceListing(bike(), style);
    assert.equal(listing.style, style);
    assert.ok(listing.description.includes("18,442 miles"));
    assertRequiredFooter(listing.description);
    assertPreferredEmojisUsed(listing.description);
    assertNoVin(listing);
    assertNoInventedClaims(listing.description);
    descriptions.add(listing.description);
  }
  assert.equal(descriptions.size, 5, "styles must produce distinct descriptions");
}

// Style spot-checks
{
  const standard = composeMarketplaceListing(bike(), "standard");
  assert.ok(standard.description.includes("🔥 PRE-OWNED 2021 HARLEY-DAVIDSON ROAD GLIDE SPECIAL 🔥"));
  assert.ok(standard.description.includes("This one is ready for its next rider."));

  const enthusiast = composeMarketplaceListing(bike(), "enthusiast");
  assert.ok(enthusiast.description.includes("🏍️"));
  assert.ok(enthusiast.description.toLowerCase().includes("pre-owned"));

  const value = composeMarketplaceListing(bike(), "value");
  assert.ok(value.description.includes("💰 Looking for a Harley"));

  const attention = composeMarketplaceListing(bike(), "attention");
  assert.ok(attention.description.includes("👀 THIS ONE IS WORTH A LOOK."));

  const premium = composeMarketplaceListing(bike(), "premium");
  assert.ok(premium.description.includes("🔥 Ready to step into something special?"));
}

// Missing price
{
  const listing = composeMarketplaceListing(bike({ price: null }));
  assert.equal(listing.priceLine, "");
  assert.equal(listing.description.includes("Ask for price"), false);
  assert.equal(listing.description.includes("$"), false);
  assertRequiredFooter(listing.description);
  assertNoVin(listing);
}

// Missing mileage
{
  const listing = composeMarketplaceListing(bike({ mileage: null }));
  assert.equal(listing.description.includes("miles"), false);
  assert.equal(listing.description.includes("Mileage on request"), false);
  assertRequiredFooter(listing.description);
}

// Missing color
{
  const listing = composeMarketplaceListing(bike({ color: null }));
  assert.equal(listing.title.includes(" - "), false);
  assert.equal(listing.description.includes("Black"), false);
}

// Missing description
{
  const listing = composeMarketplaceListing(bike({ description: null }));
  assertRequiredFooter(listing.description);
  assert.equal(listing.description.includes("Clean bagger"), false);
}

// HTML dealer description normalized
{
  const listing = composeMarketplaceListing(
    bike({ description: "<p>Low miles.</p><br/><li>Ready to ride</li>" }),
  );
  assert.equal(listing.description.includes("<p>"), false);
  assert.equal(listing.description.includes("<br"), false);
  assert.ok(listing.description.includes("Low miles."));
  assert.ok(listing.description.includes("Ready to ride"));
}

// Certified negative omitted; positive echoed without warranty claim
{
  assert.equal(
    composeMarketplaceListing(bike({ certified: "no" })).description.includes(
      "Certified:",
    ),
    false,
  );
  const yes = composeMarketplaceListing(bike({ certified: "Yes" }));
  assert.ok(yes.description.includes("Certified: Yes"));
  assert.equal(yes.description.toLowerCase().includes("warranty"), false);
}

// Missing photos is a UI concern — composer still produces copy without photos field
{
  const listing = composeMarketplaceListing(bike());
  assert.ok(listing.description.length > 0);
}

// Default style is standard
{
  const listing = composeMarketplaceListing(bike());
  assert.equal(listing.style, "standard");
}

console.log("marketplace tests passed");
