import { ensureMinLinks, relatedGuidesFor, relatedModelsFor } from "@/lib/seo/linking";
import { scoreSeoPage, statusFromScore } from "@/lib/seo/scoring";
import type { FaqItem, SeoPageDocument, SeoSection } from "@/lib/seo/types";

export function composeSeoDocument(
  partial: Omit<SeoPageDocument, "indexable"> & { indexable?: boolean },
): SeoPageDocument & { score: number; status: "DRAFT" | "NOINDEX" | "INDEX" } {
  let doc: SeoPageDocument = {
    ...partial,
    indexable: partial.indexable ?? true,
    faqs: partial.faqs ?? [],
    sections: partial.sections ?? [],
    relatedLinks: partial.relatedLinks ?? [],
    breadcrumbs: partial.breadcrumbs ?? [],
  };

  doc = ensureMinLinks(doc, [
    ...relatedGuidesFor({
      modelSlugs: partial.relatedInventoryHint?.model
        ? [partial.relatedInventoryHint.model]
        : undefined,
      limit: 4,
    }),
    ...(partial.relatedInventoryHint?.model
      ? relatedModelsFor(partial.relatedInventoryHint.model)
      : []),
  ]);

  const { score } = scoreSeoPage(doc);
  const status = statusFromScore(score);
  const indexable = partial.indexable === false ? false : status === "INDEX";

  return {
    ...doc,
    indexable,
    score,
    status,
  };
}

export function defaultFaqs(topic: string, subject: string): FaqItem[] {
  return [
    {
      question: `How do I buy a used ${subject} with Joe?`,
      answer: `Tell Joe what you want, look at live inventory together, and move at a human pace. He helps with questions about fit, payments, and next steps — without inventing stock that isn't there.`,
    },
    {
      question: `Does this page list every ${topic} for sale right now?`,
      answer: `No. Inventory below is mirrored from real dealership feed stock when connected. If the list is empty, ask Joe what's available or what he's watching for.`,
    },
  ];
}

export function section(heading: string, body: string): SeoSection {
  return { heading, body };
}
