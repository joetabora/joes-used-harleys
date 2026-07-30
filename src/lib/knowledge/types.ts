import type { KnowledgeEntityType, KnowledgeStatus } from "@/generated/prisma/client";

export type KnowledgeFacts = Record<string, unknown>;

export type KnowledgeSnapshot = {
  title: string;
  summary: string;
  facts: KnowledgeFacts;
  seoTitle: string | null;
  seoDescription: string | null;
  status: KnowledgeStatus;
};

export function publicPathForEntity(
  type: KnowledgeEntityType,
  slug: string,
  facts?: KnowledgeFacts,
): string | null {
  switch (type) {
    case "MODEL":
      return `/harleys/${slug}`;
    case "FAMILY":
      return `/harleys/family/${slug}`;
    case "GENERATION":
      return `/harleys/generations/${slug}`;
    case "TRIM":
      return `/harleys/trims/${slug}`;
    case "ENGINE":
      return `/harleys/engines/${slug}`;
    case "COLOR":
      return `/harleys/colors/${slug}`;
    case "COMPARISON":
      return `/compare/${slug}`;
    case "CITY":
      return `/used-harleys/${slug}`;
    case "ROUTE":
      return `/routes/${slug}`;
    case "EVENT":
      return `/events/${slug}`;
    case "BUYING_TOPIC":
    case "OWNERSHIP_TOPIC":
    case "MAINTENANCE_TOPIC":
    case "UPGRADE_TOPIC":
    case "FINANCING_TOPIC":
    case "INSURANCE_TOPIC": {
      const topic =
        (typeof facts?.guideTopic === "string" && facts.guideTopic) ||
        typeToGuideTopic(type);
      if (slug.endsWith("-hub")) return `/guides/${topic}`;
      return `/guides/${topic}/${slug}`;
    }
    case "RIDING_STYLE":
    case "BUYER_PERSONA":
      return `/guides/models/${slug}`;
    default:
      return null;
  }
}

function typeToGuideTopic(type: KnowledgeEntityType): string {
  switch (type) {
    case "BUYING_TOPIC":
      return "buying";
    case "OWNERSHIP_TOPIC":
      return "ownership";
    case "MAINTENANCE_TOPIC":
      return "maintenance";
    case "UPGRADE_TOPIC":
      return "upgrade";
    case "FINANCING_TOPIC":
      return "financing";
    case "INSURANCE_TOPIC":
      return "insurance";
    default:
      return "models";
  }
}

/** Minimum structured facts by type before publish is allowed. */
export function factsMeetFloor(
  type: KnowledgeEntityType,
  facts: KnowledgeFacts,
): { ok: boolean; reason?: string } {
  const arr = (key: string, min: number) => {
    const v = facts[key];
    return Array.isArray(v) && v.filter((x) => String(x).trim()).length >= min;
  };
  const str = (key: string) =>
    typeof facts[key] === "string" && String(facts[key]).trim().length >= 40;

  switch (type) {
    case "MODEL":
      if (!arr("overview", 2)) return { ok: false, reason: "overview needs ≥2 facts" };
      if (!arr("strengths", 2)) return { ok: false, reason: "strengths needs ≥2" };
      if (!arr("faqs", 2) && !arr("buyingChecks", 3))
        return { ok: false, reason: "faqs or buyingChecks required" };
      return { ok: true };
    case "FAMILY":
    case "GENERATION":
    case "ENGINE":
    case "TRIM":
    case "COLOR":
      if (!str("body") && !arr("bullets", 2) && !str("summary"))
        return { ok: false, reason: "need body, bullets, or long summary in facts" };
      return { ok: true };
    case "CITY":
      if (!arr("localContext", 2)) return { ok: false, reason: "localContext ≥2" };
      return { ok: true };
    case "COMPARISON":
      if (!arr("sections", 2)) return { ok: false, reason: "sections ≥2" };
      return { ok: true };
    case "BUYING_TOPIC":
    case "OWNERSHIP_TOPIC":
    case "MAINTENANCE_TOPIC":
    case "UPGRADE_TOPIC":
    case "FINANCING_TOPIC":
    case "INSURANCE_TOPIC":
    case "ROUTE":
    case "EVENT":
      if (!arr("sections", 2) && !arr("bullets", 3))
        return { ok: false, reason: "sections or bullets required" };
      return { ok: true };
    default:
      if (!str("body") && !arr("bullets", 2))
        return { ok: false, reason: "insufficient facts" };
      return { ok: true };
  }
}
