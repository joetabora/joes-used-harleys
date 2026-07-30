import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listRouteGuides } from "@/lib/content/guides";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildRoutePage } from "@/lib/seo/page-builders";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listRouteGuides().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = buildRoutePage(slug);
  if (!doc) return buildPageMetadata({ title: "Route", description: "", path: "/routes", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
    type: "article",
  });
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const doc = buildRoutePage(slug);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
