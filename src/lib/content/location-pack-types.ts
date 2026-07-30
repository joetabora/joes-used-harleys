export type LocationTopic =
  | "hub"
  | "inventory"
  | "buying"
  | "trade-in"
  | "financing"
  | "events"
  | "service"
  | "routes"
  | "faq";

export const LOCATION_TOPICS: Exclude<LocationTopic, "hub">[] = [
  "inventory",
  "buying",
  "trade-in",
  "financing",
  "events",
  "service",
  "routes",
  "faq",
];

export type LocationFaq = { question: string; answer: string };

/** Structured unique facts for one SE WI city. Never invent NAP branches. */
export type LocationKnowledgePack = {
  slug: string;
  /** Optional city-center coords for rough distance when business geo is set. */
  lat?: number;
  lng?: number;
  localContext: string[];
  travelNotes: string[];
  ridingCulture: string[];
  nearbyRouteSlugs: string[];
  nearbyEventThemes: string[];
  eventNotes: string[];
  buyingAngles: string[];
  tradeInNotes: string[];
  financingNotes: string[];
  /** Buyer education only — never service menus/hours. */
  serviceEducation: string[];
  inventoryFraming: string[];
  faqs: LocationFaq[];
  relatedGuideTopics: string[];
  relatedModelSlugs: string[];
  neighborCitySlugs: string[];
};

export const TOPIC_PATH: Record<Exclude<LocationTopic, "hub">, string> = {
  inventory: "inventory",
  buying: "buying",
  "trade-in": "trade-in",
  financing: "financing",
  events: "events",
  service: "service",
  routes: "routes",
  faq: "faq",
};
