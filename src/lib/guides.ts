/**
 * Back-compat guides API — content moved to src/content/guides + lib/content/guides.
 */
import {
  getAssistantKnowledgeBase,
  getGuideBySlug,
  getGuidesByTopic,
  getPublishedGuides,
  type GuideDocument,
} from "@/lib/content/guides";

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: "models" | "buying" | "comparisons" | string;
  keywords: string[];
  sections: { heading: string; body: string }[];
};

function toLegacy(g: GuideDocument): Guide {
  return {
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    category: g.topic,
    keywords: g.keywords,
    sections: g.sections,
  };
}

export const guides: Guide[] = getPublishedGuides().map(toLegacy);

export function getGuide(slug: string): Guide | undefined {
  const g = getGuideBySlug(slug);
  return g ? toLegacy(g) : undefined;
}

export function getGuidesByCategory(category: string): Guide[] {
  return getGuidesByTopic(category).map(toLegacy);
}

export { getAssistantKnowledgeBase };
