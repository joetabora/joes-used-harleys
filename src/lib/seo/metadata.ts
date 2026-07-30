import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, normalizePath } from "@/lib/seo/canonical";

export type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  imagePath?: string;
  imageAlt?: string;
};

/**
 * Build page metadata with absolute title (avoids layout template double-suffix),
 * canonical, Open Graph, and Twitter cards including image.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  imagePath = "/opengraph-image",
  imageAlt,
}: BuildMetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const url = absoluteUrl(canonicalPath);
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const ogImage = absoluteUrl(imagePath);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImage, alt: imageAlt ?? fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

/** Back-compat wrapper used by existing pages. */
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
  return buildPageMetadata({ title, description, path, noIndex });
}
