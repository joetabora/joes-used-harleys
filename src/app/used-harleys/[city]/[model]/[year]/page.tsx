import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listGeo, listModels } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCityModelYearPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ city: string; model: string; year: string }> };

export function generateStaticParams() {
  const out: { city: string; model: string; year: string }[] = [];
  for (const c of listGeo().filter((g) => g.tier === "primary").slice(0, 3)) {
    for (const m of listModels().slice(0, 4)) {
      for (const y of m.yearsInProduction.slice(-3)) {
        out.push({ city: c.slug, model: m.slug, year: String(y) });
      }
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props) {
  const { city, model, year } = await params;
  const y = Number(year);
  const doc = buildCityModelYearPage(city, model, y);
  if (!doc) {
    return buildPageMetadata({
      title: "Local year",
      description: "",
      path: "/used-harleys",
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

export default async function CityModelYearPage({ params }: Props) {
  const { city, model, year } = await params;
  const y = Number(year);
  if (!Number.isFinite(y)) notFound();
  const doc = buildCityModelYearPage(city, model, y);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
