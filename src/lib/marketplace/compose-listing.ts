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
const FINANCING_LINE = "💳 FINANCING AVAILABLE";
const CONTACT_LINE =
  "📩 Message me for more information or to set up a time to check it out.";

const BROCHURE_CUES = [
  /ultimate\b/i,
  /premium features/i,
  /one of the world/i,
  /classic\b.{0,40}form and modern/i,
  /get all the/i,
  /horsepower/i,
  /\bhp\b/i,
  /ft-?lbs?/i,
  /torque/i,
  /\bcc\b/i,
  /displacement/i,
  /fuel capacity/i,
  /wheelbase/i,
  /suspension/i,
  /audio system/i,
  /infotainment/i,
  /milwaukee-eight/i,
  /revolution max/i,
  /distinctive motorcycle/i,
  /from harley-davidson/i,
  /touring model from/i,
];

const UNIT_NOTE_MAX = 180;

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

/**
 * Strip leading year/make already embedded in the feed model string.
 * Presentation only — does not mutate DB values.
 */
export function cleanModelName(
  year: number,
  make: string,
  model: string,
): string {
  let rest = model.trim().replace(/\s+/g, " ");
  if (!rest) return rest;

  const yearStr = String(year);
  const yearRe = new RegExp(`^${yearStr}\\b\\s*`, "i");
  rest = rest.replace(yearRe, "").trim();

  const makeTrim = make.trim();
  if (makeTrim) {
    const makeEsc = makeTrim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const makeRe = new RegExp(`^${makeEsc}\\b\\s*[-–—]?\\s*`, "i");
    rest = rest.replace(makeRe, "").trim();
  }

  // Common Harley feed variants even if make field differs slightly
  rest = rest
    .replace(/^harley[- ]?davidson\b\s*[-–—]?\s*/i, "")
    .replace(/^harley\b\s*[-–—]?\s*/i, "")
    .trim();

  // If year appeared again after make strip
  rest = rest.replace(yearRe, "").trim();

  return rest.replace(/\s+/g, " ") || model.trim().replace(/\s+/g, " ");
}

export function displayYearMakeModel(bike: MarketplaceBikeInput): string {
  const model = cleanModelName(bike.year, bike.make, bike.model);
  return `${bike.year} ${bike.make} ${model}`;
}

export function composeMarketplaceTitle(bike: MarketplaceBikeInput): string {
  const base = displayYearMakeModel(bike);
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
  return `🛣️ ${new Intl.NumberFormat("en-US").format(mileage)} miles`;
}

function formatColorLine(color: string): string {
  const lower = color.toLowerCase();
  if (lower.includes("black")) return `🖤 ${color}`;
  return color;
}

function stableHash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type ModelCharacter =
  | "nightster"
  | "fat_bob"
  | "fat_boy"
  | "dyna"
  | "electra_ultra"
  | "road_glide"
  | "street_glide"
  | "sportster"
  | "trike"
  | "generic";

function classifyModelCharacter(cleanModel: string): ModelCharacter {
  const m = cleanModel.toLowerCase();
  if (/tri\s?glide|trike|freewheeler/.test(m)) return "trike";
  if (/nightster/.test(m)) return "nightster";
  if (/fat\s?bob/.test(m)) return "fat_bob";
  if (/fat\s?boy/.test(m)) return "fat_boy";
  if (/dyna|super\s?glide|low\s?rider\s?s\b|street\s?bob/.test(m) && /dyna|super\s?glide/.test(m)) {
    return "dyna";
  }
  if (/super\s?glide|dyna/.test(m)) return "dyna";
  if (/electra|ultra/.test(m) && !/road\s?glide|street\s?glide/.test(m)) {
    return "electra_ultra";
  }
  if (/road\s?glide/.test(m)) return "road_glide";
  if (/street\s?glide/.test(m)) return "street_glide";
  if (/sportster|iron\s?883|forty[- ]?eight|xl1200|xl883/.test(m)) {
    return "sportster";
  }
  return "generic";
}

/**
 * Keep short unit-specific notes; reject manufacturer brochure copy.
 */
export function extractUnitSpecificNotes(
  rawDescription: string | null | undefined,
): string | null {
  const text = normalizeDealerDescription(rawDescription);
  if (!text) return null;

  const compact = text.replace(/\s+/g, " ").trim();
  if (!compact) return null;

  if (BROCHURE_CUES.some((re) => re.test(compact))) return null;
  if (compact.length > UNIT_NOTE_MAX) return null;

  // Still reject if it looks like a multi-sentence brochure even under the limit
  const sentenceCount = compact.split(/[.!?]+/).filter((s) => s.trim().length > 20).length;
  if (sentenceCount >= 4) return null;

  return compact;
}

function characterHooks(character: ModelCharacter, model: string): string[] {
  switch (character) {
    case "nightster":
      return [
        `If you've been looking for a Harley that's easy to get out and ride, this ${model} is worth a look.`,
        `Looking for something approachable with modern Harley character? Check out this ${model}.`,
        `This ${model} is built for riders who want to hop on and go.`,
      ];
    case "fat_bob":
      return [
        `This ${model} has the attitude to match the name.`,
        `If aggressive Softail style is your thing, don't overlook this ${model}.`,
        `Looking for a Softail with presence? This ${model} deserves a look.`,
      ];
    case "fat_boy":
      return [
        `Classic Harley presence — this ${model} has serious road presence.`,
        `If you've been waiting on a Fat Boy, this one is worth a look.`,
        `This ${model} brings that iconic cruiser look Harley is known for.`,
      ];
    case "dyna":
      return [
        `If a Dyna is on your list, don't overlook this ${model}.`,
        `Looking for a Dyna with some personality? This ${model} deserves a look.`,
        `Old-school Harley character — this ${model} is worth checking out.`,
      ];
    case "electra_ultra":
      return [
        `Looking for a classic Harley touring bike? This ${model} is ready for someone who wants to put some miles on it.`,
        `If long-distance Harley touring is the plan, take a look at this ${model}.`,
        `This ${model} is built for the road-trip crowd.`,
      ];
    case "road_glide":
      return [
        `If you've been looking for a Road Glide, this one is worth a look.`,
        `Looking to rack up some miles? This ${model} is ready for the highway.`,
        `Distinctive fairing, touring chops — this ${model} deserves a look.`,
      ];
    case "street_glide":
      return [
        `If you've been looking for a Street Glide, this one is worth a look.`,
        `Touring-ready and easy to spot — take a look at this ${model}.`,
        `Looking for a bagger for the open road? This ${model} is worth a look.`,
      ];
    case "sportster":
      return [
        `Classic Sportster character — this ${model} is ready for its next rider.`,
        `If you've been looking for a Sportster, this one is worth a look.`,
        `Fun, approachable Harley energy — check out this ${model}.`,
      ];
    case "trike":
      return [
        `Three-wheel touring comfort — this ${model} is worth a look.`,
        `If a Trike is on your list, don't overlook this ${model}.`,
        `Looking for three-wheel Harley miles? Take a look at this ${model}.`,
      ];
    default:
      return [
        `This one is ready for its next rider.`,
        `If you've been looking for a ${model}, this one is worth a look.`,
        `This ${model} would make a killer next bike.`,
        `If you've been waiting for the right one to pop up, here it is.`,
      ];
  }
}

function styleOpeners(
  style: MarketplaceListingStyle,
  model: string,
  character: ModelCharacter,
): string[] {
  switch (style) {
    case "enthusiast":
      return [
        `Looking for your next Harley? This ${model} deserves a look.`,
        `🏍️ Riders shopping Harleys should put eyes on this ${model}.`,
        ...characterHooks(character, model).slice(0, 2),
      ];
    case "value":
      return [
        `Looking for a Harley without stepping into a brand-new bike? Take a look at this ${model}.`,
        `Solid used Harley opportunity — this ${model} is worth a look.`,
        `If you want Harley miles without new-bike money, check out this ${model}.`,
      ];
    case "attention":
      return [
        `👀 This ${model} is worth a look.`,
        `Don't scroll past this ${model}.`,
        `If a ${model} is on your radar, stop here.`,
      ];
    case "premium":
      return [
        `🔥 Ready to step into something special? This ${model} is ready for its next rider.`,
        `If you've been waiting for the right ${model}, here it is.`,
        `This ${model} is ready for someone who wants the next chapter.`,
      ];
    case "standard":
    default:
      return characterHooks(character, model);
  }
}

function composeSalesPitch(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle,
  cleanModel: string,
  unitNotes: string | null,
): string {
  const character = classifyModelCharacter(cleanModel);
  const openers = styleOpeners(style, cleanModel, character);
  const key = `${style}|${bike.year}|${cleanModel}|${bike.mileage ?? "x"}|${unitNotes ? "n" : "0"}`;
  const opener = openers[stableHash(key) % openers.length] ?? openers[0]!;

  if (unitNotes) {
    const noteLead = unitNotes.replace(/\.$/, "");
    return `🔥 ${noteLead}. ${opener}`.replace(/\s+/g, " ").trim();
  }

  return opener;
}

export function composeMarketplaceDescription(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle = "standard",
): string {
  const ymm = displayYearMakeModel(bike);
  const ymmUpper = ymm.toUpperCase();
  const cleanModel = cleanModelName(bike.year, bike.make, bike.model);
  const priceLine = composeMarketplacePriceLine(bike);
  const unitNotes = extractUnitSpecificNotes(bike.description);

  const blocks: string[] = [`🔥 PRE-OWNED ${ymmUpper} 🔥`];

  const facts: string[] = [];
  if (priceLine) facts.push(`💰 ${priceLine}`);
  if (bike.mileage != null) facts.push(formatMileageLine(bike.mileage));
  const color = nonEmpty(bike.color);
  if (color) facts.push(formatColorLine(color));
  if (facts.length > 0) {
    blocks.push(facts.join("\n"));
  }

  blocks.push(composeSalesPitch(bike, style, cleanModel, unitNotes));

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
