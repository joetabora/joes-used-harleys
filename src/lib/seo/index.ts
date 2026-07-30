export { buildPageMetadata, createMetadata } from "@/lib/seo/metadata";
export {
  absoluteUrl,
  normalizePath,
  stripQuery,
} from "@/lib/seo/canonical";
export {
  personJsonLd,
  websiteJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
  webPageJsonLd,
  productJsonLd,
  buildJsonLdGraph,
  localBusinessJsonLd,
} from "@/lib/seo/schema";
export { scoreSeoPage, statusFromScore } from "@/lib/seo/scoring";
export { pingIndexNow } from "@/lib/seo/indexnow";
export { composeSeoDocument, defaultFaqs, section } from "@/lib/seo/compose-page";
export type {
  SeoPageDocument,
  FaqItem,
  BreadcrumbItem,
  SeoLink,
  SeoScoreResult,
} from "@/lib/seo/types";
