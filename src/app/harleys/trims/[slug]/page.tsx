import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildTrimPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = await buildTrimPage(slug);
  if (!doc) {
    return buildPageMetadata({
      title: "Trim",
      description: "",
      path: "/harleys",
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function TrimPage({ params }: Props) {
  const { slug } = await params;
  const doc = await buildTrimPage(slug);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
