import { formatPrice } from "@/lib/format";
import { normalizeDealerDescription } from "@/lib/vehicle/normalize-description";

/** Bike fields used for Marketplace copy. Pure input — no DB access. */
export type MarketplaceBikeInput = {
  year: number;
  make: string;
  model: string;
  price: number | null;
  mileage: number | null;
  color: string | null;
  description: string | null;
  transmission: string | null;
  category: string | null;
  stockNumber: string | null;
  certified: string | null;
  /** Accepted so callers/tests can prove VIN never appears in output. Never written. */
  vin?: string | null;
};

export type MarketplaceListingStyle =
  | "standard"
  | "enthusiast"
  | "value"
  | "attention"
  | "premium";

export const MARKETPLACE_LISTING_STYLES: MarketplaceListingStyle[] = [
  "standard",
  "enthusiast",
  "value",
  "attention",
  "premium",
];

export type MarketplaceListing = {
  title: string;
  priceLine: string;
  description: string;
  combined: string;
  style: MarketplaceListingStyle;
};

const TRADE_LINE =
  "🔄 TRADES WELCOME — WE TAKE ANYTHING WITH A TITLE IN TRADE!";
const DEALER_LINE = "📍 Milwaukee Harley-Davidson";
const FINANCING_LINE = "💳 FINANCING AVAILABLE FOR ANY TYPE OF CREDIT";
const CONTACT_LINE =
  "📩 Message me for more information or to set up a time to check it out.";

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function yearMakeModel(bike: MarketplaceBikeInput): string {
  return `${bike.year} ${bike.make} ${bike.model}`;
}

function yearMakeModelUpper(bike: MarketplaceBikeInput): string {
  return `${bike.year} ${bike.make} ${bike.model}`.toUpperCase();
}

export function composeMarketplaceTitle(bike: MarketplaceBikeInput): string {
  const base = yearMakeModel(bike);
  const color = nonEmpty(bike.color);
  return color ? `${base} - ${color}` : base;
}

/**
 * Marketplace price line. Missing price → empty string (never invent; never "Ask for price").
 */
export function composeMarketplacePriceLine(bike: MarketplaceBikeInput): string {
  if (bike.price == null) return "";
  return `${formatPrice(bike.price)} + tax, title & fees`;
}

function formatMileageLine(mileage: number): string {
  return `${new Intl.NumberFormat("en-US").format(mileage)} miles`;
}

function formatColorLine(color: string): string {
  const lower = color.toLowerCase();
  if (lower.includes("black")) return `🖤 ${color}`;
  return color;
}

type StyleBlocks = {
  header: string;
  intro: string;
};

/**
 * Style headers/intros — personality only. Never claim accessories, condition,
 * warranty, finance terms, or other unsupported vehicle facts.
 */
function styleBlocks(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle,
): StyleBlocks {
  const ymm = yearMakeModel(bike);
  const ymmUpper = yearMakeModelUpper(bike);
  const model = bike.model;

  switch (style) {
    case "standard":
      return {
        header: `🔥 PRE-OWNED ${ymmUpper} 🔥`,
        intro: `This one is ready for its next rider. If you've been looking for a ${model}, this one is worth a look.`,
      };
    case "enthusiast":
      return {
        header: `🏍️ PRE-OWNED ${ymm}`,
        intro: `Looking for your next Harley? This ${model} deserves a look.`,
      };
    case "value":
      return {
        header: `💰 PRE-OWNED ${ymm}`,
        intro: `Looking for a Harley without stepping into a brand-new bike? Take a look at this ${model}.`,
      };
    case "attention":
      return {
        header: `👀 THIS ONE IS WORTH A LOOK.\n\nPRE-OWNED ${ymm}`,
        intro: `If you've been shopping Harleys, put eyes on this ${model}.`,
      };
    case "premium":
      return {
        header: `🔥 Ready to step into something special?\n\nPRE-OWNED ${ymm}`,
        intro: `This ${model} is ready for its next rider.`,
      };
  }
}

export function composeMarketplaceDescription(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle = "standard",
): string {
  const priceLine = composeMarketplacePriceLine(bike);
  const { header, intro } = styleBlocks(bike, style);

  const blocks: string[] = [header];

  // Compact shopper facts — never transmission / category / stock / VIN
  const facts: string[] = [];
  if (priceLine) facts.push(`💰 ${priceLine}`);
  if (bike.mileage != null) facts.push(formatMileageLine(bike.mileage));
  const color = nonEmpty(bike.color);
  if (color) facts.push(formatColorLine(color));
  if (facts.length > 0) {
    blocks.push(facts.join("\n"));
  }

  blocks.push(intro);

  // Dealer feed description only when present (normalized). No invented features.
  const dealerBody = normalizeDealerDescription(bike.description);
  if (dealerBody) {
    blocks.push(dealerBody);
  }

  blocks.push(FINANCING_LINE);
  blocks.push(TRADE_LINE);
  blocks.push(DEALER_LINE);
  blocks.push(CONTACT_LINE);

  return blocks.join("\n\n");
}

export function composeMarketplaceCombined(
  title: string,
  priceLine: string,
  description: string,
): string {
  const parts = [title];
  if (priceLine) {
    parts.push("", priceLine);
  }
  parts.push("", description);
  return parts.join("\n");
}

export function composeMarketplaceListing(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle = "standard",
): MarketplaceListing {
  const title = composeMarketplaceTitle(bike);
  const priceLine = composeMarketplacePriceLine(bike);
  const description = composeMarketplaceDescription(bike, style);
  return {
    title,
    priceLine,
    description,
    combined: composeMarketplaceCombined(title, priceLine, description),
    style,
  };
}
