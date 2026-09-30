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

export type MarketplaceListing = {
  title: string;
  priceLine: string;
  description: string;
  combined: string;
};

const NEGATIVE_CERTIFIED = new Set(["no", "false", "0", "n", "none"]);

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function yearMakeModel(bike: MarketplaceBikeInput): string {
  return `${bike.year} ${bike.make} ${bike.model}`;
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

export function composeMarketplaceDescription(bike: MarketplaceBikeInput): string {
  const priceLine = composeMarketplacePriceLine(bike);
  const blocks: string[] = ["PRE-OWNED", yearMakeModel(bike)];

  if (bike.mileage != null) {
    blocks.push(formatMileageLine(bike.mileage));
  }

  if (priceLine) {
    blocks.push(priceLine);
  }

  const detailLines: string[] = [];
  const color = nonEmpty(bike.color);
  if (color) detailLines.push(`Color: ${color}`);

  const transmission = nonEmpty(bike.transmission);
  if (transmission) detailLines.push(`Transmission: ${transmission}`);

  const category = nonEmpty(bike.category);
  if (category) detailLines.push(`Category: ${category}`);

  const stock = nonEmpty(bike.stockNumber);
  if (stock) detailLines.push(`Stock #: ${stock}`);

  const certified = usefulCertified(bike.certified);
  if (certified) detailLines.push(`Certified: ${certified}`);

  if (detailLines.length > 0) {
    blocks.push(detailLines.join("\n"));
  }

  const dealerBody = normalizeDealerDescription(bike.description);
  if (dealerBody) {
    blocks.push(dealerBody);
  }

  blocks.push("Trade-ins welcome — we take anything with a title in trade!");
  blocks.push("Milwaukee Harley-Davidson");

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

export function composeMarketplaceListing(bike: MarketplaceBikeInput): MarketplaceListing {
  const title = composeMarketplaceTitle(bike);
  const priceLine = composeMarketplacePriceLine(bike);
  const description = composeMarketplaceDescription(bike);
  return {
    title,
    priceLine,
    description,
    combined: composeMarketplaceCombined(title, priceLine, description),
  };
}
