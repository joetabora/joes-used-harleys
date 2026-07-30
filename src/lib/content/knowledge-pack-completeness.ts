import type {
  HubSectionKey,
  KnowledgePack,
  SuitabilityFact,
} from "@/lib/content/knowledge-pack-types";

function nonEmpty(items: string[] | undefined, min = 1): boolean {
  return Boolean(items && items.filter((s) => s.trim().length > 0).length >= min);
}

function suitabilityOk(s: SuitabilityFact | undefined): boolean {
  return Boolean(s?.level && s.notes?.trim());
}

/**
 * Whether a hub section has enough pack facts to render.
 * Competitors is decided by taxonomy relations at compose time — always "available" here if pack exists.
 */
export function sectionAvailable(
  pack: KnowledgePack,
  key: HubSectionKey,
  opts?: { hasCompetitors?: boolean },
): boolean {
  switch (key) {
    case "description":
      return nonEmpty(pack.overview, 2) && nonEmpty(pack.rideCharacteristics, 1);
    case "buying":
      return nonEmpty(pack.buyingChecks, 3);
    case "ownership":
      return nonEmpty(pack.ownership, 2);
    case "maintenance":
      return nonEmpty(pack.maintenance, 2);
    case "pros":
      return nonEmpty(pack.strengths, 2);
    case "cons":
      return nonEmpty(pack.tradeOffs, 2);
    case "idealRider":
      return nonEmpty(pack.idealRider, 1);
    case "competitors":
      return opts?.hasCompetitors === true;
    case "financing":
      return nonEmpty(pack.financingNotes, 1);
    case "insurance":
      return nonEmpty(pack.insuranceNotes, 1);
    case "accessories":
      return nonEmpty(pack.accessories, 2);
    case "upgrades":
      return nonEmpty(pack.upgrades, 2);
    case "stage1":
      return nonEmpty(pack.stage1, 2);
    case "roadTrip":
      return suitabilityOk(pack.roadTrip);
    case "passenger":
      return suitabilityOk(pack.passenger);
    case "beginner":
      return suitabilityOk(pack.beginner);
    default:
      return false;
  }
}

export function packHasMinimumFaqs(pack: KnowledgePack): boolean {
  return pack.faqs.filter((f) => f.question.trim() && f.answer.trim()).length >= 2;
}

/** Pack is rich enough to aim for an indexable model hub. */
export function packMeetsHubFloor(pack: KnowledgePack): boolean {
  return (
    packHasMinimumFaqs(pack) &&
    sectionAvailable(pack, "description") &&
    sectionAvailable(pack, "buying") &&
    sectionAvailable(pack, "pros") &&
    sectionAvailable(pack, "cons") &&
    sectionAvailable(pack, "idealRider")
  );
}

export function availableSectionKeys(
  pack: KnowledgePack,
  opts?: { hasCompetitors?: boolean },
): HubSectionKey[] {
  const keys: HubSectionKey[] = [
    "description",
    "buying",
    "ownership",
    "maintenance",
    "pros",
    "cons",
    "idealRider",
    "competitors",
    "financing",
    "insurance",
    "accessories",
    "upgrades",
    "stage1",
    "roadTrip",
    "passenger",
    "beginner",
  ];
  return keys.filter((k) => sectionAvailable(pack, k, opts));
}
