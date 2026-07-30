import type { KnowledgePack } from "@/lib/content/knowledge-pack-types";

/** Shared SE WI honesty notes — no rates or invented quotes. */
export const sharedFinancingNotes = [
  "Know your monthly comfort zone before you fall in love with a specific unit.",
  "Talk through payments with Joe using the bike’s actual asking price — not a guess from another listing.",
  "Pre-approval conversations help you shop with confidence; approvals and rates depend on lenders, not this site.",
];

export const sharedInsuranceNotes = [
  "Insurance cost depends on your driving record, garage location, coverage choices, and the bike’s year and value.",
  "Get quotes from insurers who understand motorcycles before you commit — especially for Touring and higher-value Softails.",
  "Ask Joe for the VIN and exact trim details so your quote matches the unit you are buying.",
];

export function definePack(
  pack: KnowledgePack,
): KnowledgePack {
  return pack;
}
