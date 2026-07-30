import { touringPacks } from "@/content/knowledge-packs/touring";
import { softailPacks } from "@/content/knowledge-packs/softail";
import { sportsterPacks, trikeOtherPacks } from "@/content/knowledge-packs/sportster-trike-other";
import type { KnowledgePack } from "@/lib/content/knowledge-pack-types";
import { listModels } from "@/lib/content/taxonomy";

const allPacks: KnowledgePack[] = [
  ...touringPacks,
  ...softailPacks,
  ...sportsterPacks,
  ...trikeOtherPacks,
];

const bySlug = new Map(allPacks.map((p) => [p.slug, p]));

export function listKnowledgePacks(): KnowledgePack[] {
  return allPacks;
}

export function getKnowledgePack(slug: string): KnowledgePack | null {
  return bySlug.get(slug) ?? null;
}

/** Every taxonomy model must have a pack (dev/test invariant). */
export function missingPackSlugs(): string[] {
  return listModels()
    .map((m) => m.slug)
    .filter((slug) => !bySlug.has(slug));
}
