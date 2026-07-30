export type SuitabilityLevel = "poor" | "fair" | "good" | "excellent";

export type SuitabilityFact = {
  level: SuitabilityLevel;
  notes: string;
};

export type KnowledgePackFaq = {
  question: string;
  answer: string;
};

/** Structured factual SSOT for one taxonomy model. Never invent prices/comps here. */
export type KnowledgePack = {
  slug: string;
  /** Short overview facts (2–4 sentences worth of claims). */
  overview: string[];
  /** Engine story bullets; may reference taxonomy engine names. */
  engines: string[];
  rideCharacteristics: string[];
  comfort: string[];
  passenger: SuitabilityFact;
  roadTrip: SuitabilityFact;
  beginner: SuitabilityFact;
  maintenance: string[];
  ownership: string[];
  buyingChecks: string[];
  strengths: string[];
  tradeOffs: string[];
  idealRider: string[];
  accessories: string[];
  upgrades: string[];
  /** Named Stage 1–style upgrade suggestions (no invented HP numbers). */
  stage1: string[];
  financingNotes?: string[];
  insuranceNotes?: string[];
  faqs: KnowledgePackFaq[];
  /** Guide topics to prefer in link graph. */
  relatedGuideTopics: string[];
};

export type HubSectionKey =
  | "description"
  | "buying"
  | "ownership"
  | "maintenance"
  | "pros"
  | "cons"
  | "idealRider"
  | "competitors"
  | "financing"
  | "insurance"
  | "accessories"
  | "upgrades"
  | "stage1"
  | "roadTrip"
  | "passenger"
  | "beginner";

export const HUB_SECTION_ANCHORS: Record<HubSectionKey, string> = {
  description: "description",
  buying: "buying",
  ownership: "ownership",
  maintenance: "maintenance",
  pros: "pros",
  cons: "cons",
  idealRider: "ideal-rider",
  competitors: "competitors",
  financing: "financing",
  insurance: "insurance",
  accessories: "accessories",
  upgrades: "upgrades",
  stage1: "stage-1",
  roadTrip: "road-trip",
  passenger: "passenger",
  beginner: "beginner",
};
