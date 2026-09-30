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

/** Feature tokens we may echo only when present in feed text (never invent). */
const UNIT_FEATURE_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\blow\s*miles?\b/i, label: "Low miles" },
  { re: /\bbars?\b/i, label: "bars" },
  { re: /\bexhaust\b/i, label: "exhaust" },
  { re: /\bpipes?\b/i, label: "pipes" },
  { re: /\baudio\b/i, label: "audio" },
  { re: /\bstereo\b/i, label: "stereo" },
  { re: /\bluggage\b/i, label: "luggage" },
  { re: /\bsaddlebags?\b/i, label: "saddlebags" },
  { re: /\bwheels?\b/i, label: "wheels" },
  { re: /\bcustom\b/i, label: "custom work" },
  { re: /\bupgrad(?:e|es|ed)\b/i, label: "upgrades" },
  { re: /\bstage\s*\d+\b/i, label: "stage work" },
  { re: /\bwindshield\b/i, label: "windshield" },
  { re: /\bfairing\b/i, label: "fairing" },
  { re: /\btrunk\b/i, label: "trunk" },
  { re: /\btour\s*pack\b/i, label: "tour pack" },
  { re: /\band more\b/i, label: "and more" },
];

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

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function stableHash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickVariant(key: string, options: string[]): string {
  if (options.length === 0) return "";
  return options[stableHash(key) % options.length]!;
}

function formatMilesPlain(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage);
}

function bikeAgeYears(year: number, now = new Date()): number {
  return Math.max(0, now.getFullYear() - year);
}

function isStronglyLowMiles(mileage: number): boolean {
  return mileage < 5000;
}

function isRelativelyLowMiles(year: number, mileage: number): boolean {
  const age = bikeAgeYears(year);
  if (age < 8) return false;
  return mileage <= Math.max(12_000, age * 2000);
}

function isApproachablePrice(price: number, character: ModelCharacter): boolean {
  if (
    character === "electra_ultra" ||
    character === "trike" ||
    character === "road_glide" ||
    character === "street_glide"
  ) {
    return price <= 10_000;
  }
  return price <= 9000;
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

  rest = rest
    .replace(/^harley[- ]?davidson\b\s*[-–—]?\s*/i, "")
    .replace(/^harley\b\s*[-–—]?\s*/i, "")
    .trim();

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

function classifyModelCharacter(cleanModel: string): ModelCharacter {
  const m = cleanModel.toLowerCase();
  if (/tri\s?glide|trike|freewheeler/.test(m)) return "trike";
  if (/nightster/.test(m)) return "nightster";
  if (/fat\s?bob/.test(m)) return "fat_bob";
  if (/fat\s?boy/.test(m)) return "fat_boy";
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

function assembleFeatureHits(compact: string): string | null {
  const hits: string[] = [];
  for (const { re, label } of UNIT_FEATURE_PATTERNS) {
    if (re.test(compact) && !hits.includes(label)) hits.push(label);
  }
  if (hits.length === 0) return null;

  const low = hits.includes("Low miles");
  const andMore = hits.includes("and more");
  const features = hits.filter((h) => h !== "Low miles" && h !== "and more");
  const parts: string[] = [];
  if (low) parts.push("Low miles");
  if (features.length) parts.push(features.join(", "));
  if (andMore) parts.push("and more");
  return parts
    .join(", ")
    .replace(/, and more$/, " and more")
    .replace(/^, /, "");
}

/**
 * Keep short unit-specific notes; reject manufacturer brochure copy.
 * If brochure cues appear in a long feed blurb, still harvest feature tokens
 * that literally appear in the text — never invent.
 */
export function extractUnitSpecificNotes(
  rawDescription: string | null | undefined,
): string | null {
  const text = normalizeDealerDescription(rawDescription);
  if (!text) return null;

  const compact = text.replace(/\s+/g, " ").trim();
  if (!compact) return null;

  const hasBrochure = BROCHURE_CUES.some((re) => re.test(compact));
  const sentenceCount = compact
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 20).length;
  const tooLong = compact.length > UNIT_NOTE_MAX || sentenceCount >= 4;

  if (!hasBrochure && !tooLong) {
    return compact;
  }

  return assembleFeatureHits(compact);
}

function characterHooks(character: ModelCharacter, model: string): string[] {
  switch (character) {
    case "nightster":
      return [
        `🔥 A great option if you want a smaller, modern Harley with plenty of personality.`,
        `🔥 This ${model} brings modern Harley character in a compact package.`,
        `🔥 Compact Harley energy — this ${model} is ready for someone who wants to ride.`,
      ];
    case "fat_bob":
      return [
        `🔥 Aggressive styling and plenty of attitude — this Fat Bob deserves a look.`,
        `🔥 This ${model} has the attitude to match the name.`,
        `🔥 Softail muscle with presence — don't overlook this ${model}.`,
      ];
    case "fat_boy":
      return [
        `🔥 Classic Harley presence — this ${model} has serious road presence.`,
        `🔥 Iconic cruiser character — this Fat Boy is hard to ignore.`,
        `🔥 This ${model} brings that classic Fat Boy look riders know.`,
      ];
    case "dyna":
      return [
        `🔥 Old-school Harley character — this ${model} is worth checking out.`,
        `🔥 Dyna appeal with personality — this ${model} deserves a look.`,
        `🔥 If a Dyna is on your list, this ${model} should be on it too.`,
      ];
    case "electra_ultra":
      return [
        `🔥 Built for riders who want to put some serious miles behind them.`,
        `🔥 Classic Harley touring character — this ${model} is ready for the road.`,
        `🔥 A touring Harley for someone who wants to stack miles.`,
      ];
    case "road_glide":
      return [
        `🔥 Distinctive Road Glide style for riders who live on the highway.`,
        `🔥 This ${model} is for riders who want touring miles with sharknose style.`,
        `🔥 Highway-ready Road Glide character — this one deserves a look.`,
      ];
    case "street_glide":
      return [
        `🔥 Street Glide touring character for riders who want bagger miles.`,
        `🔥 This ${model} is ready for someone who wants a classic bagger.`,
        `🔥 Touring bagger vibe — this ${model} deserves a look.`,
      ];
    case "sportster":
      return [
        `🔥 Classic Sportster character with approachable Harley energy.`,
        `🔥 This ${model} is a fun, approachable Harley for the next rider.`,
        `🔥 Sportster personality — this one is ready to ride.`,
      ];
    case "trike":
      return [
        `🔥 Looking for a three-wheel Harley? Take a look at this ${model}.`,
        `🔥 Three-wheel Harley miles — this ${model} deserves a look.`,
        `🔥 A Trike for riders who want comfort and road-trip space.`,
      ];
    default:
      return [
        `🔥 This ${model} would make a killer next bike.`,
        `🔥 Ready for its next rider — this ${model} deserves a look.`,
        `🔥 If this ${model} is on your radar, stop scrolling.`,
      ];
  }
}

function styleFallbackBias(
  style: MarketplaceListingStyle,
  model: string,
  character: ModelCharacter,
): string[] {
  const personality = characterHooks(character, model);
  switch (style) {
    case "value":
      return [
        `🔥 Looking for Harley miles without new-bike money? This ${model} deserves a look.`,
        `🔥 Solid used Harley opportunity on this ${model}.`,
        `🔥 This ${model} is an approachable way into a used Harley.`,
      ];
    case "attention":
      return [
        `🔥 Don't scroll past this ${model}.`,
        `🔥 Eyes up — this ${model} should stop the scroll.`,
        `🔥 This ${model} is the one to tap into.`,
      ];
    case "premium":
      return [
        `🔥 Ready for the next chapter? This ${model} is waiting.`,
        `🔥 This ${model} is ready for someone who wants the next ride up.`,
        `🔥 Step into this ${model} when you're ready for something special.`,
      ];
    case "enthusiast":
      return [
        `🏍️ This ${model} deserves a closer look from anyone shopping Harleys.`,
        `🏍️ Riders will know why this ${model} stands out.`,
        `🏍️ This ${model} is for someone who already gets Harley culture.`,
      ];
    case "standard":
    default:
      return personality;
  }
}

function unitNoteLeads(notes: string, model: string, key: string): string {
  const flowed = notes
    .replace(/\.$/, "")
    .replace(/\s+/g, " ")
    .replace(/\.\s+/g, ", ")
    .replace(/,\s*,/g, ",")
    .replace(/^low miles/i, "Low miles")
    .trim();

  return pickVariant(key, [
    `🔥 ${flowed} — this ${model} has some personality.`,
    `🔥 ${flowed}. This ${model} deserves a look.`,
    `🔥 ${flowed} on this ${model}.`,
  ]);
}

function mileageLead(
  bike: MarketplaceBikeInput,
  cleanModel: string,
  character: ModelCharacter,
  unitNotes: string | null,
  key: string,
): string | null {
  if (bike.mileage == null) return null;
  const miles = bike.mileage;
  const formatted = formatMilesPlain(miles);

  if (isStronglyLowMiles(miles)) {
    const lead = `🔥 Only ${formatted} miles on this ${cleanModel}.`;
    const closers = [
      `If you've been looking for a newer Harley without paying new-bike money, this one deserves a look.`,
      `Hard to ignore those miles on a ${cleanModel}.`,
      `Low odometer, ready for the next rider.`,
    ];
    return `${lead} ${pickVariant(`${key}|strong`, closers)}`;
  }

  if (isRelativelyLowMiles(bike.year, miles)) {
    let extra = "";
    if (unitNotes) {
      const rest = unitNotes
        .replace(/\.$/, "")
        .replace(/^low miles\.?\s*/i, "")
        .replace(/\.\s+/g, ", ")
        .trim();
      if (rest) extra = `, plus ${rest}`;
    }
    const lead = `🔥 Low miles for a ${bike.year}${extra}.`;
    const closers = [
      `This ${cleanModel} deserves a look.`,
      `This ${cleanModel} has some personality.`,
      character === "dyna"
        ? `This ${cleanModel} deserves a look.`
        : `Ready for plenty more road.`,
    ];
    return `${lead} ${pickVariant(`${key}|rel`, closers)}`.replace(/\s+/g, " ").trim();
  }

  return null;
}

function priceLead(
  bike: MarketplaceBikeInput,
  cleanModel: string,
  character: ModelCharacter,
  key: string,
): string | null {
  if (bike.price == null) return null;
  if (!isApproachablePrice(bike.price, character)) return null;

  const priced = formatPrice(bike.price);
  const leads = [
    `🔥 A lot of motorcycle for ${priced}.`,
    `🔥 Hard to overlook a bike like this at ${priced}.`,
    `🔥 ${priced} for this ${cleanModel} — worth a closer look.`,
  ];
  const lead = pickVariant(`${key}|price`, leads);

  const closers =
    character === "electra_ultra" || character === "trike"
      ? [
          `If you're looking for a classic Harley touring bike without breaking the bank, this ${cleanModel} deserves a look.`,
          `Touring Harley character at an approachable used price.`,
        ]
      : [
          `This ${cleanModel} deserves a look.`,
          `Ready for someone who wants Harley miles without new-bike money.`,
        ];

  return `${lead} ${pickVariant(`${key}|priceClose`, closers)}`;
}

function milesRoadContext(
  bike: MarketplaceBikeInput,
  cleanModel: string,
  character: ModelCharacter,
  key: string,
): string | null {
  if (bike.mileage == null) return null;
  if (isStronglyLowMiles(bike.mileage) || isRelativelyLowMiles(bike.year, bike.mileage)) {
    return null;
  }
  if (bike.mileage < 15_000 || bike.mileage > 45_000) return null;
  if (
    character !== "trike" &&
    character !== "electra_ultra" &&
    character !== "road_glide"
  ) {
    return null;
  }

  const formatted = formatMilesPlain(bike.mileage);
  if (character === "trike") {
    return pickVariant(key, [
      `🔥 ${formatted} miles and ready for plenty more road. If you've been looking for a three-wheel Harley, this ${cleanModel} deserves a look.`,
      `🔥 ${formatted} miles on this ${cleanModel} — ready for plenty more road.`,
    ]);
  }

  return pickVariant(key, [
    `🔥 ${formatted} miles and ready for plenty more road. If you've been looking for a touring Harley, this ${cleanModel} deserves a look.`,
    `🔥 ${formatted} miles on this ${cleanModel} — ready for plenty more road.`,
  ]);
}

function composeSalesPitch(
  bike: MarketplaceBikeInput,
  style: MarketplaceListingStyle,
  cleanModel: string,
  unitNotes: string | null,
): string {
  const character = classifyModelCharacter(cleanModel);
  const key = `${style}|${bike.year}|${cleanModel}|${bike.mileage ?? "x"}|${bike.price ?? "p"}|${unitNotes ?? ""}`;

  // 1) Unit-specific notes first
  if (unitNotes) {
    if (
      bike.mileage != null &&
      isRelativelyLowMiles(bike.year, bike.mileage) &&
      !/^low miles/i.test(unitNotes)
    ) {
      const milesPitch = mileageLead(bike, cleanModel, character, unitNotes, key);
      if (milesPitch) return milesPitch;
    }
    return unitNoteLeads(unitNotes, cleanModel, key);
  }

  // 2) Mileage-based selling point
  const milesPitch = mileageLead(bike, cleanModel, character, null, key);
  if (milesPitch) return milesPitch;

  // 3) Price/value context
  const priced = priceLead(bike, cleanModel, character, key);
  if (priced) return priced;

  // Mid-mileage road context for touring/trike
  const road = milesRoadContext(bike, cleanModel, character, key);
  if (road) return road.trim();

  // 4) Model personality fallback
  const fallbacks = styleFallbackBias(style, cleanModel, character);
  return pickVariant(`${key}|fb`, fallbacks);
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
