import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { listPackagedSoutheastCities } from "@/lib/content/compose-location";
import type { LocationTopic } from "@/lib/content/location-pack-types";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCityTopicPage } from "@/lib/seo/page-builders";

type Topic = Exclude<LocationTopic, "hub">;

export function cityTopicStaticParams() {
  return listPackagedSoutheastCities().map((c) => ({ city: c.slug }));
}

export async function cityTopicMetadata(city: string, topic: Topic) {
  const doc = buildCityTopicPage(city, topic);
  if (!doc) {
    return buildPageMetadata({
      title: "Local",
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

export async function CityTopicPageView({
  city,
  topic,
}: {
  city: string;
  topic: Topic;
}) {
  const doc = buildCityTopicPage(city, topic);
  if (!doc) notFound();
  const bikes = await fetchRelatedInventory(doc.relatedInventoryHint);
  return <SeoPageShell doc={doc} bikes={bikes} />;
}
