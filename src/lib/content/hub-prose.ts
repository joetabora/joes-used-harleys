import { createHash } from "node:crypto";
import type { KnowledgePack } from "@/lib/content/knowledge-pack-types";
import type { HubSectionKey } from "@/lib/content/knowledge-pack-types";

export type GeneratedHubProse = {
  slug: string;
  packHash: string;
  generatedAt: string;
  sections: Partial<Record<HubSectionKey, string>>;
};

export function hashKnowledgePack(pack: KnowledgePack): string {
  const payload = JSON.stringify(pack);
  return createHash("sha256").update(payload).digest("hex").slice(0, 16);
}

/** Deterministic prose from structured bullets — no new facts. */
export function deterministicSectionBody(
  pack: KnowledgePack,
  key: HubSectionKey,
  extras?: { competitorLines?: string[] },
): string | null {
  const join = (items: string[]) => items.map((s) => `• ${s}`).join("\n");

  switch (key) {
    case "description":
      return [
        ...pack.overview,
        "",
        "How it rides:",
        join(pack.rideCharacteristics),
        "",
        "Engines you may see used:",
        join(pack.engines),
        "",
        "Comfort notes:",
        join(pack.comfort),
      ].join("\n");
    case "buying":
      return [
        `When shopping a used example, work through these checks — then verify on the actual unit:`,
        join(pack.buyingChecks),
      ].join("\n");
    case "ownership":
      return ["Ownership realities:", join(pack.ownership)].join("\n");
    case "maintenance":
      return [
        "Maintenance focus areas (confirm intervals for the specific year/VIN):",
        join(pack.maintenance),
      ].join("\n");
    case "pros":
      return ["Strengths:", join(pack.strengths)].join("\n");
    case "cons":
      return ["Trade-offs:", join(pack.tradeOffs)].join("\n");
    case "idealRider":
      return join(pack.idealRider);
    case "competitors":
      if (!extras?.competitorLines?.length) return null;
      return [
        "Related models and comparisons on this site (editorial — not competitor dealer scrapes):",
        join(extras.competitorLines),
      ].join("\n");
    case "financing":
      if (!pack.financingNotes?.length) return null;
      return [
        "Financing discussion (process — not rates or approvals):",
        join(pack.financingNotes),
      ].join("\n");
    case "insurance":
      if (!pack.insuranceNotes?.length) return null;
      return [
        "Insurance discussion (get a real quote — we do not invent premiums):",
        join(pack.insuranceNotes),
      ].join("\n");
    case "accessories":
      return ["Common accessories owners add:", join(pack.accessories)].join("\n");
    case "upgrades":
      return ["Popular upgrades:", join(pack.upgrades)].join("\n");
    case "stage1":
      return [
        "Stage 1–style suggestions (no invented horsepower numbers):",
        join(pack.stage1),
      ].join("\n");
    case "roadTrip":
      return `Road-trip suitability: ${pack.roadTrip.level}. ${pack.roadTrip.notes}`;
    case "passenger":
      return `Passenger suitability: ${pack.passenger.level}. ${pack.passenger.notes}`;
    case "beginner":
      return `Beginner suitability: ${pack.beginner.level}. ${pack.beginner.notes}`;
    default:
      return null;
  }
}
