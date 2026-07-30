import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listComparisons } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildComparePage } from "@/lib/seo/page-builders";

export const revalidate = 3600;

type Props = { params: Promise<{ pair: string }> };

export function generateStaticParams() {
  return listComparisons().map((c) => ({ pair: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { pair } = await params;
  const doc = await buildComparePage(pair);
  if (!doc) return buildPageMetadata({ title: "Compare", description: "", path: "/compare", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const doc = await buildComparePage(pair);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
