import type { LocationKnowledgePack } from "@/lib/content/location-pack-types";

export function defineLocationPack(pack: LocationKnowledgePack): LocationKnowledgePack {
  return pack;
}

/** Process-only — never rates or approvals. */
export function financingNotesFor(city: string): string[] {
  return [
    `Know your monthly comfort zone before you drive in from ${city} to look at a specific unit.`,
    "Talk payments using the bike's actual asking price — not a guess from another listing.",
    "Pre-approval conversations help you shop with confidence; lenders decide approvals and rates, not this site.",
  ];
}

/** Buyer education only — never service menus/hours. */
export function serviceEducationFor(city: string): string[] {
  return [
    `After you buy, ask where routine maintenance will be done and how warranty or as-is condition is documented — Joe helps you ask clear questions, not run a service counter from ${city}.`,
    "Bring service records when comparing used bikes; deferred maintenance matters more than chrome.",
    "Ask about break-in, first oil change timing, and tire age before you commit to a longer first ride home.",
  ];
}

export function tradeInNotesFor(city: string): string[] {
  return [
    `If you're trading from ${city}, bring clear photos, mileage, and title status so the conversation stays concrete.`,
    "Trade value depends on condition and demand for that unit — get a clear number in writing.",
    "Don't assume online estimators match what a live appraisal finds.",
  ];
}
