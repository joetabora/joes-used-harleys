import type { SeoLink, SeoPageDocument } from "@/lib/seo/types";
import { getPublishedGuides } from "@/lib/content/guides";
import { getModel, listModels } from "@/lib/content/taxonomy";

export function relatedGuidesFor(opts: {
  modelSlugs?: string[];
  topics?: string[];
  limit?: number;
}): SeoLink[] {
  const limit = opts.limit ?? 6;
  const guides = getPublishedGuides();
  const scored = guides.map((g) => {
    let score = 0;
    if (opts.modelSlugs?.some((m) => g.models?.includes(m))) score += 3;
    if (opts.topics?.includes(g.topic)) score += 2;
    return { g, score };
  });
  scored.sort((a, b) => b.score - a.score || a.g.title.localeCompare(b.g.title));
  return scored.slice(0, limit).map(({ g }) => ({
    href: `/guides/${g.topic}/${g.slug}`,
    title: g.title,
    excerpt: g.excerpt,
  }));
}

export function relatedModelsFor(slug: string, limit = 4): SeoLink[] {
  const model = getModel(slug);
  const related = model?.relatedModels?.length
    ? model.relatedModels
    : listModels()
        .filter((m) => m.family === model?.family && m.slug !== slug)
        .map((m) => m.slug);
  return related
    .slice(0, limit)
    .map((s) => getModel(s))
    .filter(Boolean)
    .map((m) => ({
      href: `/harleys/${m!.slug}`,
      title: m!.displayName,
      excerpt: `${m!.family} family`,
    }));
}

export function ensureMinLinks(doc: SeoPageDocument, extras: SeoLink[]): SeoPageDocument {
  const seen = new Set(doc.relatedLinks.map((l) => l.href));
  const merged = [...doc.relatedLinks];
  for (const link of extras) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    merged.push(link);
    if (merged.length >= 8) break;
  }
  const hubs: SeoLink[] = [
    { href: "/guides", title: "Harley buying guides" },
    { href: "/inventory", title: "Live inventory" },
    { href: "/used-harleys", title: "Southeast Wisconsin & nearby" },
    { href: "/harleys", title: "Harley models" },
  ];
  for (const h of hubs) {
    if (merged.length >= 3) break;
    if (seen.has(h.href)) continue;
    merged.push(h);
    seen.add(h.href);
  }
  return { ...doc, relatedLinks: merged };
}
