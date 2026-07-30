import { absoluteUrl } from "@/lib/seo/canonical";
import type { BreadcrumbItem, FaqItem } from "@/lib/seo/types";
import { listGeo } from "@/lib/content/taxonomy";
import {
  businessSameAs,
  hasBusinessGeo,
  hasBusinessNap,
  hasContactEmail,
  hasContactPhone,
  siteConfig,
} from "@/lib/site";

export function personJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joe",
    url: siteConfig.url,
    description: siteConfig.description,
    jobTitle: "Harley-Davidson salesperson",
  };
  if (hasContactPhone()) data.telephone = siteConfig.phone;
  if (hasContactEmail()) data.email = siteConfig.email;
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

/**
 * Single real NAP LocalBusiness + areaServed SE WI cities.
 * Returns null when NAP is not configured — never invent an address.
 */
export function localBusinessJsonLd(): Record<string, unknown> | null {
  if (!hasBusinessNap()) return null;

  const b = siteConfig.business;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.addressLocality,
      addressRegion: b.addressRegion,
      postalCode: b.postalCode,
      addressCountry: b.addressCountry,
    },
    areaServed: listGeo()
      .filter((c) => c.region === "southeast-wi" && c.tier === "primary")
      .map((c) => ({
        "@type": "City",
        name: c.name,
        url: absoluteUrl(`/used-harleys/${c.slug}`),
      })),
  };

  if (hasContactPhone()) data.telephone = siteConfig.phone;
  if (hasContactEmail()) data.email = siteConfig.email;

  if (hasBusinessGeo()) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: Number(b.latitude),
      longitude: Number(b.longitude),
    };
  }

  const sameAs = businessSameAs();
  if (sameAs.length) data.sameAs = sameAs;

  return data;
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
