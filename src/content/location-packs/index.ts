import { southeastWiLocationPacks } from "@/content/location-packs/southeast-wi";
import type { LocationKnowledgePack } from "@/lib/content/location-pack-types";
import { listGeo } from "@/lib/content/taxonomy";

const bySlug = new Map(
  southeastWiLocationPacks.map((p) => [p.slug, p] as const),
);

export function listLocationPacks(): LocationKnowledgePack[] {
  return southeastWiLocationPacks;
}

export function getLocationPack(slug: string): LocationKnowledgePack | null {
  return bySlug.get(slug) ?? null;
}

/** Primary SE WI cities missing a rich location pack. */
export function missingSoutheastWiPackSlugs(): string[] {
  return listGeo()
    .filter((c) => c.region === "southeast-wi" && c.tier === "primary")
    .map((c) => c.slug)
    .filter((slug) => !bySlug.has(slug));
}
