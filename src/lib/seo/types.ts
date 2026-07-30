export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = { name: string; path: string };

export type SeoLink = { href: string; title: string; excerpt?: string };

export type SeoSection = { heading: string; body: string };

export type SeoPageDocument = {
  path: string;
  title: string;
  description: string;
  h1: string;
  type:
    | "website"
    | "article"
    | "product"
    | "event"
    | "guide"
    | "model"
    | "local"
    | "compare";
  sections: SeoSection[];
  faqs: FaqItem[];
  breadcrumbs: BreadcrumbItem[];
  relatedLinks: SeoLink[];
  /** When false, page is noindex but may still render. */
  indexable: boolean;
  ogType?: "website" | "article";
  /** Word-count body source for scoring */
  bodyText?: string;
  schemaExtra?: Record<string, unknown>[];
  relatedInventoryHint?: {
    model?: string;
    year?: number;
    family?: string;
    color?: string;
  };
};

export type SeoScoreCheck = {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail?: string;
};

export type SeoScoreResult = {
  score: number;
  checks: SeoScoreCheck[];
};
