import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { FAMILIES } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildFamilyPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;

type Props = { params: Promise<{ family: string }> };

export function generateStaticParams() {
  return FAMILIES.map((f) => ({ family: f.toLowerCase() }));
}

export async function generateMetadata({ params }: Props) {
  const { family } = await params;
  const doc = buildFamilyPage(family);
  if (!doc) return buildPageMetadata({ title: "Family", description: "", path: "/harleys", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function FamilyPage({ params }: Props) {
  const { family } = await params;
  const doc = buildFamilyPage(family);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
