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
  return `${formatPrice(bike.price)} + tax & title`;
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

/** Prefer these when capping to 4 selling points (order = priority). */
const FEATURE_PRIORITY = [
  "bars",
  "exhaust",
  "wheels",
  "audio",
  "luggage",
  "saddlebags",
  "custom work",
  "windshield",
  "fairing",
  "trunk",
  "tour pack",
  "pipes",
  "upgrades",
  "stereo",
  "stage work",
];

function joinEnglish(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function capitalizeFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function shortDisplayModel(cleanModel: string, character: ModelCharacter): string {
  if (character === "electra_ultra") {
    const trimmed = cleanModel.replace(/^electra\s+glide\s+/i, "").trim();
    return trimmed || cleanModel;
  }
  return cleanModel;
}

function prioritizeFeatures(features: string[]): string[] {
  const ranked = [...features].sort((a, b) => {
    const ai = FEATURE_PRIORITY.indexOf(a.toLowerCase());
    const bi = FEATURE_PRIORITY.indexOf(b.toLowerCase());
    const av = ai === -1 ? 99 : ai;
    const bv = bi === -1 ? 99 : bi;
    return av - bv;
  });
  return ranked.slice(0, 4);
}

type ParsedUnitNotes = {
  lowMiles: boolean;
  features: string[];
  andMore: boolean;
  /** Already a readable sentence — use carefully, not as a raw dump. */
  freeform: string | null;
};

function parseUnitNotes(notes: string): ParsedUnitNotes {
  const compact = notes.replace(/\s+/g, " ").trim();
  const lowMiles = /\blow\s*miles?\b/i.test(compact);
  const andMore = /\band more\b/i.test(compact);

  const found: string[] = [];
  for (const { re, label } of UNIT_FEATURE_PATTERNS) {
    if (label === "Low miles" || label === "and more") continue;
    if (re.test(compact) && !found.includes(label)) found.push(label);
  }

  const features = prioritizeFeatures(found);
  const looksLikeDump =
    features.length > 0 ||
    /^[\w\s,.]+$/i.test(compact) && compact.split(/[,.]/).length >= 2;

  // Freeform only when it reads like a sentence and isn't just a feature list
  let freeform: string | null = null;
  if (
    !looksLikeDump &&
    features.length === 0 &&
    compact.length >= 25 &&
    /\b(is|are|has|have|with|makes?|gives?|ready|built)\b/i.test(compact)
  ) {
    freeform = compact.replace(/\.$/, "");
  }

  return { lowMiles, features, andMore, freeform };
}

function featurePhrase(features: string[]): string {
  return joinEnglish(features.map((f) => f.toLowerCase()));
}

/**
 * Turn unit facts into a short salesperson thought — never a raw comma dump.
 */
function unitNoteLeads(
  notes: string,
  model: string,
  character: ModelCharacter,
  key: string,
): string {
  const parsed = parseUnitNotes(notes);
  const short = shortDisplayModel(model, character);
  const feats = featurePhrase(parsed.features);

  if (parsed.freeform && parsed.features.length === 0 && !parsed.lowMiles) {
    return `🔥 ${capitalizeFirst(parsed.freeform)}.`;
  }

  if (parsed.features.length > 0) {
    const list = capitalizeFirst(feats);
    if (character === "electra_ultra" || character === "road_glide" || character === "street_glide") {
      return pickVariant(key, [
        `🔥 ${list} make this ${short} a solid option for someone looking to put some miles on a classic touring Harley.`,
        `🔥 This ${short} has the ${feats} you want for getting out and putting some miles on a touring Harley.`,
        `🔥 ${list} make this ${short} ready for someone who wants to put some miles behind them.`,
      ]);
    }
    if (character === "dyna") {
      return pickVariant(key, [
        `🔥 ${list} give this ${short} some serious personality.`,
        `🔥 ${list} give this ${short} some personality.`,
        parsed.lowMiles
          ? `🔥 Low miles with ${feats} — this ${short} has some personality.`
          : `🔥 ${list} on this ${short} add up to a bike with personality.`,
      ]);
    }
    if (character === "trike") {
      return pickVariant(key, [
        `🔥 ${list} make this ${short} a solid three-wheel option for putting on miles.`,
        `🔥 This ${short} brings ${feats} for riders who want a Trike ready for the road.`,
      ]);
    }
    if (parsed.lowMiles) {
      return pickVariant(key, [
        `🔥 Low miles with ${feats} — this ${short} has some personality.`,
        `🔥 Low miles, plus ${feats}, give this ${short} some serious personality.`,
      ]);
    }
    return pickVariant(key, [
      `🔥 ${list} give this ${short} some personality.`,
      `🔥 ${list} make this ${short} worth a closer look.`,
      `🔥 This ${short} has ${feats} that give it some personality.`,
    ]);
  }

  if (parsed.lowMiles) {
    return pickVariant(key, [
      `🔥 Low miles on this ${short} — definitely one to put on your list.`,
      `🔥 Low miles and ready for its next rider — this ${short} deserves a look.`,
    ]);
  }

  // Fallback if notes existed but parsed empty
  return pickVariant(key, characterHooks(character, model));
}

function mileageLead(
  bike: MarketplaceBikeInput,
  cleanModel: string,
  character: ModelCharacter,
  unitNotes: string | null,
  key: string,
): string | null {
  if (bike.mileage == null) return null;
  const short = shortDisplayModel(cleanModel, character);

  if (isStronglyLowMiles(bike.mileage)) {
    // Do not echo the exact odometer — already shown in the facts block
    return pickVariant(`${key}|strong`, [
      `🔥 Extremely low miles on this ${short} — definitely one to put on your list.`,
      `🔥 Barely ridden compared with most used bikes you'll find — this ${short} deserves a look.`,
      `🔥 Low miles and a great opportunity to get into a ${short} without buying new.`,
    ]);
  }

  if (isRelativelyLowMiles(bike.year, bike.mileage)) {
    const parsed = unitNotes ? parseUnitNotes(unitNotes) : null;
    const feats =
      parsed && parsed.features.length > 0 ? featurePhrase(parsed.features) : null;
    if (feats) {
      return pickVariant(`${key}|rel`, [
        `🔥 Low miles for a ${bike.year}, plus ${feats} — this ${short} deserves a look.`,
        `🔥 Low miles for a ${bike.year} with ${feats} give this ${short} some personality.`,
      ]);
    }
    return pickVariant(`${key}|rel`, [
      `🔥 Low miles for a ${bike.year} — this ${short} deserves a look.`,
      `🔥 Low miles for a ${bike.year} on this ${short}. Ready for plenty more road.`,
    ]);
  }

  return null;
}

/**
 * Price is already in the facts block — do not echo dollar amounts in the pitch.
 * Fall through to personality instead.
 */
function priceLead(
  _bike: MarketplaceBikeInput,
  _cleanModel: string,
  _character: ModelCharacter,
  _key: string,
): string | null {
  return null;
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

  const short = shortDisplayModel(cleanModel, character);
  // Personality-first — do not repeat the exact mileage from the facts line
  if (character === "trike") {
    return pickVariant(key, [
      `🔥 Looking for a three-wheel Harley? This ${short} is ready for its next adventure.`,
      `🔥 Three-wheel Harley miles ahead — this ${short} deserves a look.`,
    ]);
  }

  return pickVariant(key, [
    `🔥 Looking for a touring Harley ready for more road? This ${short} deserves a look.`,
    `🔥 A classic touring Harley that's ready for its next rider.`,
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
      !/^low miles/i.test(unitNotes) &&
      parseUnitNotes(unitNotes).features.length > 0
    ) {
      const milesPitch = mileageLead(bike, cleanModel, character, unitNotes, key);
      if (milesPitch) return milesPitch;
    }
    return unitNoteLeads(unitNotes, cleanModel, character, key);
  }

  // 2) Mileage-based selling point (no exact number echo)
  const milesPitch = mileageLead(bike, cleanModel, character, null, key);
  if (milesPitch) return milesPitch;

  // 3) Price intentionally skipped in pitch (already shown above)
  void priceLead;

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
