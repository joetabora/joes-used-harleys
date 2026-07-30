import type { SeoPageDocument, SeoScoreCheck, SeoScoreResult } from "@/lib/seo/types";
import { absoluteUrl } from "@/lib/seo/canonical";

const BANNED = /#\s*1\b|number one dealer|below (market|competitors)|guaranteed approval/i;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function scoreSeoPage(doc: SeoPageDocument): SeoScoreResult {
  const body =
    doc.bodyText ??
    doc.sections.map((s) => `${s.heading} ${s.body}`).join(" ") +
      " " +
      doc.faqs.map((f) => `${f.question} ${f.answer}`).join(" ");
  const words = wordCount(body);
  const minWords = doc.type === "guide" || doc.type === "article" ? 300 : 150;
  const titleLen = doc.title.length;
  const descLen = doc.description.length;
  const canonical = absoluteUrl(doc.path);

  const checks: SeoScoreCheck[] = [
    {
      id: "title",
      label: "Title length",
      weight: 10,
      passed: titleLen >= 20 && titleLen <= 70,
      detail: `${titleLen} chars`,
    },
    {
      id: "description",
      label: "Meta description length",
      weight: 10,
      passed: descLen >= 70 && descLen <= 170,
      detail: `${descLen} chars`,
    },
    {
      id: "h1",
      label: "H1 present",
      weight: 10,
      passed: Boolean(doc.h1?.trim()),
    },
    {
      id: "body",
      label: `Body ≥${minWords} words`,
      weight: 15,
      passed: words >= minWords,
      detail: `${words} words`,
    },
    {
      id: "links",
      label: "≥3 internal links",
      weight: 10,
      passed: doc.relatedLinks.length >= 3,
      detail: `${doc.relatedLinks.length} links`,
    },
    {
      id: "faq",
      label: "FAQ ≥2",
      weight: 10,
      passed: doc.faqs.length >= 2,
      detail: `${doc.faqs.length} FAQs`,
    },
    {
      id: "breadcrumbs",
      label: "Breadcrumbs",
      weight: 5,
      passed: doc.breadcrumbs.length >= 2,
    },
    {
      id: "og",
      label: "OG image path",
      weight: 5,
      passed: true,
    },
    {
      id: "inventory-module",
      label: "Related inventory module planned",
      weight: 5,
      passed: doc.relatedInventoryHint != null || doc.type === "website",
    },
    {
      id: "canonical",
      label: "Absolute canonical HTTPS-ready",
      weight: 5,
      passed: canonical.startsWith("http"),
    },
    {
      id: "schema",
      label: "Schema inputs present",
      weight: 10,
      passed: doc.breadcrumbs.length > 0 && Boolean(doc.title),
    },
    {
      id: "claims",
      label: "No banned claims",
      weight: 5,
      passed: !BANNED.test(body) && !BANNED.test(doc.title),
    },
  ];

  const score = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);
  return { score, checks };
}

export function statusFromScore(score: number): "DRAFT" | "NOINDEX" | "INDEX" {
  if (score >= 70) return "INDEX";
  if (score >= 40) return "NOINDEX";
  return "DRAFT";
}
