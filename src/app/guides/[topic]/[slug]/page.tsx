import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { getPublishedGuides } from "@/lib/content/guides";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildGuidePage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ topic: string; slug: string }> };

export function generateStaticParams() {
  return getPublishedGuides().map((g) => ({ topic: g.topic, slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { topic, slug } = await params;
  const doc = buildGuidePage(topic, slug);
  if (!doc) {
    return buildPageMetadata({ title: "Guide", description: "", path: "/guides", noIndex: true });
  }
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
    type: "article",
  });
}

export default async function GuideDetailPage({ params }: Props) {
  const { topic, slug } = await params;
  const doc = buildGuidePage(topic, slug);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
