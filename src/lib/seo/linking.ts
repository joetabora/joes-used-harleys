import type { SeoLink, SeoPageDocument } from "@/lib/seo/types";
import { getPublishedGuides } from "@/lib/content/guides";
import { getComparison, getGeo, getModel, listModels } from "@/lib/content/taxonomy";
import { LOCATION_TOPICS, TOPIC_PATH } from "@/lib/content/location-pack-types";

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

export function comparisonLinksFor(comparisonIds: string[]): SeoLink[] {
  return comparisonIds
    .map((id) => getComparison(id))
    .filter(Boolean)
    .map((c) => ({
      href: `/compare/${c!.slug}`,
      title: c!.title,
      excerpt: c!.excerpt,
    }));
}

export function hubTopicalLinks(topics: string[]): SeoLink[] {
  const topicHubs: SeoLink[] = topics.slice(0, 4).map((t) => ({
    href: `/guides/${t}`,
    title: `${t.replace(/-/g, " ")} guides`,
  }));
  const evergreen: SeoLink[] = [
    { href: "/guides/buying", title: "Buying guides" },
    { href: "/guides/maintenance", title: "Maintenance guides" },
    { href: "/guides/financing", title: "Financing resources" },
    { href: "/guides/insurance", title: "Insurance guides" },
    { href: "/compare", title: "Harley comparisons" },
    { href: "/routes", title: "Southeast Wisconsin routes" },
  ];
  const seen = new Set<string>();
  const out: SeoLink[] = [];
  for (const link of [...topicHubs, ...evergreen]) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    out.push(link);
    if (out.length >= 6) break;
  }
  return out;
}

const TOPIC_LABELS: Record<(typeof LOCATION_TOPICS)[number], string> = {
  inventory: "Inventory notes",
  buying: "Buying guide",
  "trade-in": "Trade-in guidance",
  financing: "Financing",
  events: "Events",
  service: "Service information",
  routes: "Riding routes",
  faq: "FAQ",
};

export function cityTopicLinks(citySlug: string): SeoLink[] {
  const city = getGeo(citySlug);
  const name = city?.name ?? citySlug;
  return LOCATION_TOPICS.map((topic) => ({
    href: `/used-harleys/${citySlug}/${TOPIC_PATH[topic]}`,
    title: `${name}: ${TOPIC_LABELS[topic]}`,
  }));
}

export function cityNeighborLinks(slugs: string[]): SeoLink[] {
  return slugs
    .map((s) => getGeo(s))
    .filter(Boolean)
    .slice(0, 4)
    .map((c) => ({
      href: `/used-harleys/${c!.slug}`,
      title: `${c!.name} Harley buyers`,
      excerpt: c!.intro.slice(0, 100),
    }));
}

export function ensureMinLinks(doc: SeoPageDocument, extras: SeoLink[]): SeoPageDocument {
  const seen = new Set(doc.relatedLinks.map((l) => l.href));
  const merged = [...doc.relatedLinks];
  for (const link of extras) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    merged.push(link);
    if (merged.length >= 12) break;
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
