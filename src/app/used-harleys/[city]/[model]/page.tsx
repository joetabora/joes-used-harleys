import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listGeo, listModels } from "@/lib/content/taxonomy";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCityModelPage } from "@/lib/seo/page-builders";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ city: string; model: string }> };

export function generateStaticParams() {
  const out: { city: string; model: string }[] = [];
  for (const c of listGeo().filter((g) => g.tier === "primary").slice(0, 8)) {
    for (const m of listModels().slice(0, 8)) {
      out.push({ city: c.slug, model: m.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props) {
  const { city, model } = await params;
  const doc = buildCityModelPage(city, model);
  if (!doc) {
    return buildPageMetadata({
      title: "Local model",
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

export default async function CityModelPage({ params }: Props) {
  const { city, model } = await params;
  const doc = buildCityModelPage(city, model);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
