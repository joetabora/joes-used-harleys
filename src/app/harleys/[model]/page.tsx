import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listModels } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildModelPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ model: string }> };

export async function generateStaticParams() {
  return listModels().map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { model } = await params;
  const doc = buildModelPage(model);
  if (!doc) return buildPageMetadata({ title: "Model", description: "", path: "/harleys", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function HarleyModelPage({ params }: Props) {
  const { model } = await params;
  const doc = buildModelPage(model);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
