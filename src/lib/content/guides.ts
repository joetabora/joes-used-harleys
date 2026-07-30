import type { GuideDocument } from "@/lib/content/guide-types";
export type { GuideDocument } from "@/lib/content/guide-types";

import { buyingGuides } from "@/content/guides/buying";
import { comparisonGuides } from "@/content/guides/comparisons";
import { modelGuides } from "@/content/guides/models";
import { beginnerGuides } from "@/content/guides/beginner";
import { financingGuides } from "@/content/guides/financing";
import { tradeInGuides } from "@/content/guides/trade-in";
import { insuranceGuides } from "@/content/guides/insurance";
import { maintenanceGuides } from "@/content/guides/maintenance";
import { passengerGuides } from "@/content/guides/passenger";
import { womensGuides } from "@/content/guides/womens";
import { tallGuides } from "@/content/guides/tall";
import { shortGuides } from "@/content/guides/short";
import { storageGuides } from "@/content/guides/storage";
import { winterGuides } from "@/content/guides/winter";
import { dealerGuides } from "@/content/guides/dealer";
import { colorGuides } from "@/content/guides/color";
import { engineGuides } from "@/content/guides/engine";
import { routeGuides } from "@/content/guides/routes";
import { eventGuides } from "@/content/guides/events";

const allGuides: GuideDocument[] = [
  ...buyingGuides,
  ...comparisonGuides,
  ...modelGuides,
  ...beginnerGuides,
  ...financingGuides,
  ...tradeInGuides,
  ...insuranceGuides,
  ...maintenanceGuides,
  ...passengerGuides,
  ...womensGuides,
  ...tallGuides,
  ...shortGuides,
  ...storageGuides,
  ...winterGuides,
  ...dealerGuides,
  ...colorGuides,
  ...engineGuides,
];

export function getPublishedGuides(): GuideDocument[] {
  return allGuides.filter((g) => g.status === "published");
}

export function getGuidesByTopic(topic: string): GuideDocument[] {
  return getPublishedGuides().filter((g) => g.topic === topic);
}

export function getGuide(topic: string, slug: string): GuideDocument | undefined {
  return getPublishedGuides().find((g) => g.topic === topic && g.slug === slug);
}

export function getGuideBySlug(slug: string): GuideDocument | undefined {
  return getPublishedGuides().find((g) => g.slug === slug);
}

/** Legacy shape for assistant KB + old /guides/[slug] redirects. */
export function getAssistantKnowledgeBase(): string {
  return getPublishedGuides()
    .map(
      (g) =>
        `# ${g.title}\n${g.sections.map((s) => `## ${s.heading}\n${s.body}`).join("\n")}`,
    )
    .join("\n\n");
}

export function listRouteGuides() {
  return routeGuides.filter((g) => g.status === "published");
}

export function getRouteGuide(slug: string) {
  return listRouteGuides().find((g) => g.slug === slug);
}

export function listEventGuides() {
  return eventGuides.filter((g) => g.status === "published");
}

export function getEventGuide(slug: string) {
  return listEventGuides().find((g) => g.slug === slug);
}
