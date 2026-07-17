import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function createMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function localBusinessJsonLd() {
  // Only include fields we know. Do not invent address, geo, or dealership affiliation.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joe",
    url: siteConfig.url,
    description: siteConfig.description,
    jobTitle: "Harley-Davidson salesperson",
  };

  if (!siteConfig.phone.includes("PLACEHOLDER")) {
    data.telephone = siteConfig.phone;
  }
  if (!siteConfig.email.includes("PLACEHOLDER")) {
    data.email = siteConfig.email;
  }

  return data;
}
