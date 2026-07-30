/**
 * Guide content documents (MDX-compatible frontmatter shape).
 * Bodies live as structured sections — reviewed copy only, no invented inventory.
 */

export type GuideDocument = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  audience?: string;
  models?: string[];
  cities?: string[];
  keywords: string[];
  faqs: { question: string; answer: string }[];
  updated: string;
  status: "draft" | "published";
  relatedGuideSlugs?: string[];
  relatedModelSlugs?: string[];
  sections: { heading: string; body: string }[];
};
