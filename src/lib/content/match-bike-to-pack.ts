import { listKnowledgePacks } from "@/content/knowledge-packs";
import { getModel, listModels } from "@/lib/content/taxonomy";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/harley-davidson/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Conservative bike → knowledge pack match.
 * Prefer exact displayName hits over shared aliases (e.g. Street Glide Special).
 */
export function matchBikeToPackSlug(bike: {
  model: string;
  title?: string | null;
  category?: string | null;
}): string | null {
  const hay = normalize(`${bike.model} ${bike.title ?? ""}`);
  if (!hay) return null;

  let best: { slug: string; score: number } | null = null;

  for (const model of listModels()) {
    const display = normalize(model.displayName);
    if (display && (hay === display || hay.includes(display))) {
      // Exact / contained displayName — strong preference (longer = more specific)
      const score = 10_000 + display.length;
      if (!best || score > best.score) best = { slug: model.slug, score };
      continue;
    }

    const candidates = [...model.aliases, model.slug.replace(/-/g, " ")];
    for (const c of candidates) {
      const needle = normalize(c);
      if (!needle || needle.length < 4) continue;
      if (hay === needle || hay.includes(needle)) {
        // Aliases are weaker than another model's displayName
        const score = needle.length;
        if (!best || score > best.score) best = { slug: model.slug, score };
      }
    }
  }

  if (!best) return null;
  if (!listKnowledgePacks().some((p) => p.slug === best!.slug)) return null;
  return best.slug;
}

export function hubPathForPack(slug: string, anchor?: string): string {
  const base = `/harleys/${slug}`;
  return anchor ? `${base}#${anchor}` : base;
}

export function packDisplayName(slug: string): string {
  return getModel(slug)?.displayName ?? slug;
}
