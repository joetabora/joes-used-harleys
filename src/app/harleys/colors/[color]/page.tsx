import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listColors } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildColorPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;

type Props = { params: Promise<{ color: string }> };

export function generateStaticParams() {
  return listColors().map((c) => ({ color: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { color } = await params;
  const doc = await buildColorPage(color);
  if (!doc) return buildPageMetadata({ title: "Color", description: "", path: "/harleys/colors", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function ColorPage({ params }: Props) {
  const { color } = await params;
  const doc = await buildColorPage(color);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
