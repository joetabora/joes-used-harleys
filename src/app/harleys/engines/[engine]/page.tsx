import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listEngines } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildEnginePage } from "@/lib/seo/page-builders";

export const revalidate = 3600;

type Props = { params: Promise<{ engine: string }> };

export function generateStaticParams() {
  return listEngines().map((e) => ({ engine: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { engine } = await params;
  const doc = await buildEnginePage(engine);
  if (!doc) return buildPageMetadata({ title: "Engine", description: "", path: "/harleys/engines", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function EnginePage({ params }: Props) {
  const { engine } = await params;
  const doc = await buildEnginePage(engine);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
