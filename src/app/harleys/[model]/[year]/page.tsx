import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listModels } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildModelYearPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ model: string; year: string }> };

export async function generateStaticParams() {
  const out: { model: string; year: string }[] = [];
  for (const m of listModels()) {
    for (const y of m.yearsInProduction.slice(-5)) {
      out.push({ model: m.slug, year: String(y) });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props) {
  const { model, year } = await params;
  const y = Number(year);
  const doc = buildModelYearPage(model, y);
  if (!doc) return buildPageMetadata({ title: "Year", description: "", path: "/harleys", noIndex: true });
  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.path,
    noIndex: !doc.indexable,
  });
}

export default async function HarleyModelYearPage({ params }: Props) {
  const { model, year } = await params;
  const y = Number(year);
  if (!Number.isFinite(y)) notFound();
  const doc = buildModelYearPage(model, y);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
