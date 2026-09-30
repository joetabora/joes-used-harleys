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

const NEGATIVE_CERTIFIED = new Set(["no", "false", "0", "n", "none"]);

const TRADE_LINE =
  "🔄 TRADES WELCOME — we take anything with a title in trade!";
const DEALER_LINE = "📍 Milwaukee Harley-Davidson";
const FINANCING_LINE = "Financing available for any type of credit";
const CONTACT_LINE = "📩 Message me for more information about this bike.";

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

function usefulCertified(raw: string | null | undefined): string | null {
  const v = nonEmpty(raw);
  if (!v) return null;
  if (NEGATIVE_CERTIFIED.has(v.toLowerCase())) return null;
  return v;
}

type StyleBlocks = {
  header: string;
  intro: string;
};

function styleBlocks(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle,
): StyleBlocks {
  const ymm = yearMakeModel(bike);
  const ymmUpper = yearMakeModelUpper(bike);

  switch (style) {
    case "standard":
      return {
        header: `🔥 PRE-OWNED ${ymmUpper} 🔥`,
        intro: "This one is ready for its next rider.",
      };
    case "enthusiast":
      return {
        header: `🏍️ Looking for your next Harley? This pre-owned ${bike.model} deserves a look.`,
        intro: `PRE-OWNED ${ymm}`,
      };
    case "value":
      return {
        header: `💰 Looking for a Harley without stepping into a brand-new bike? Take a look at this pre-owned ${ymm}.`,
        intro: `PRE-OWNED ${ymm}`,
      };
    case "attention":
      return {
        header: "👀 THIS ONE IS WORTH A LOOK.",
        intro: `PRE-OWNED ${ymm}`,
      };
    case "premium":
      return {
        header: "🔥 Ready to step into something special?",
        intro: `PRE-OWNED ${ymm}`,
      };
  }
}

export function composeMarketplaceDescription(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle = "standard",
): string {
  const priceLine = composeMarketplacePriceLine(bike);
  const { header, intro } = styleBlocks(bike, style);
  const blocks: string[] = [header, intro];

  if (bike.mileage != null) {
    blocks.push(formatMileageLine(bike.mileage));
  }

  const color = nonEmpty(bike.color);
  if (color) {
    blocks.push(color);
  }

  if (priceLine) {
    blocks.push(`💰 ${priceLine}`);
  }

  const certified = usefulCertified(bike.certified);
  if (certified) {
    blocks.push(`Certified: ${certified}`);
  }

  const dealerBody = normalizeDealerDescription(bike.description);
  if (dealerBody) {
    blocks.push(dealerBody);
  }

  blocks.push(TRADE_LINE);
  blocks.push(DEALER_LINE);
  blocks.push(FINANCING_LINE);
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
