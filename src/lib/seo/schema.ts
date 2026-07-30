import { absoluteUrl } from "@/lib/seo/canonical";
import type { BreadcrumbItem, FaqItem } from "@/lib/seo/types";
import { siteConfig } from "@/lib/site";

export function personJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joe",
    url: siteConfig.url,
    description: siteConfig.description,
    jobTitle: "Harley-Davidson salesperson",
  };
  if (!siteConfig.phone.includes("PLACEHOLDER")) data.telephone = siteConfig.phone;
  if (!siteConfig.email.includes("PLACEHOLDER")) data.email = siteConfig.email;
  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: { "@type": "Person", name: "Joe" },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function webPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string | null;
  price: number | null;
  status: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
  };
  if (input.image) data.image = input.image;
  if (input.price != null) {
    data.offers = {
      "@type": "Offer",
      price: input.price,
      priceCurrency: "USD",
      availability:
        input.status === "AVAILABLE"
          ? "https://schema.org/InStock"
          : input.status === "PENDING"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/SoldOut",
      url: absoluteUrl(input.path),
    };
  }
  return data;
}

export function buildJsonLdGraph(
  nodes: Array<Record<string, unknown> | null | undefined>,
): Record<string, unknown>[] {
  return nodes.filter(Boolean) as Record<string, unknown>[];
}

/** @deprecated use personJsonLd — kept for layout import compat */
export function localBusinessJsonLd() {
  return personJsonLd();
}
