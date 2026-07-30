import fs from "node:fs";
import path from "node:path";
import { getKnowledgePack } from "@/content/knowledge-packs";
import {
  availableSectionKeys,
  packHasMinimumFaqs,
  sectionAvailable,
} from "@/lib/content/knowledge-pack-completeness";
import {
  HUB_SECTION_ANCHORS,
  type HubSectionKey,
  type KnowledgePack,
} from "@/lib/content/knowledge-pack-types";
import {
  deterministicSectionBody,
  hashKnowledgePack,
  type GeneratedHubProse,
} from "@/lib/content/hub-prose";
import {
  getComparison,
  getModel,
  type HarleyModel,
} from "@/lib/content/taxonomy";
import { composeSeoDocument } from "@/lib/seo/compose-page";
import {
  comparisonLinksFor,
  hubTopicalLinks,
  relatedGuidesFor,
  relatedModelsFor,
} from "@/lib/seo/linking";
import type { SeoPageDocument, SeoSection } from "@/lib/seo/types";

const SECTION_HEADINGS: Record<HubSectionKey, string> = {
  description: "Professional description",
  buying: "Buying guide",
  ownership: "Ownership guide",
  maintenance: "Maintenance guide",
  pros: "Pros",
  cons: "Cons",
  idealRider: "Ideal rider",
  competitors: "Competitors & alternatives",
  financing: "Financing discussion",
  insurance: "Insurance discussion",
  accessories: "Accessories",
  upgrades: "Popular upgrades",
  stage1: "Stage 1 suggestions",
  roadTrip: "Road-trip suitability",
  passenger: "Passenger suitability",
  beginner: "Beginner suitability",
};

function competitorLines(model: HarleyModel): string[] {
  const lines: string[] = [];
  for (const slug of model.relatedModels) {
    const m = getModel(slug);
    if (m) lines.push(`${m.displayName} (/harleys/${m.slug}) — ${m.family} family`);
  }
  for (const id of model.comparisonIds) {
    const c = getComparison(id);
    if (c) lines.push(`${c.title} (/compare/${c.slug}) — ${c.excerpt}`);
  }
  return lines;
}

function loadGeneratedProse(slug: string, packHash: string): GeneratedHubProse | null {
  try {
    const file = path.join(
      process.cwd(),
      "src/content/generated/model-hubs",
      `${slug}.json`,
    );
    if (!fs.existsSync(file)) return null;
    const mod = JSON.parse(fs.readFileSync(file, "utf8")) as GeneratedHubProse;
    if (mod?.packHash === packHash && mod.slug === slug) return mod;
  } catch {
    /* ignore */
  }
  return null;
}

function buildSections(
  pack: KnowledgePack,
  model: HarleyModel,
  generated: GeneratedHubProse | null,
): SeoSection[] {
  const comps = competitorLines(model);
  const keys = availableSectionKeys(pack, { hasCompetitors: comps.length > 0 });
  const sections: SeoSection[] = [];

  for (const key of keys) {
    if (!sectionAvailable(pack, key, { hasCompetitors: comps.length > 0 })) continue;
    const body =
      generated?.sections[key]?.trim() ||
      deterministicSectionBody(pack, key, { competitorLines: comps });
    if (!body?.trim()) continue;
    sections.push({
      id: HUB_SECTION_ANCHORS[key],
      heading: SECTION_HEADINGS[key],
      body,
    });
  }
  return sections;
}

export function composeModelHub(slug: string): (SeoPageDocument & {
  score: number;
  status: "DRAFT" | "NOINDEX" | "INDEX";
}) | null {
  const model = getModel(slug);
  const pack = getKnowledgePack(slug);
  if (!model || !pack) return null;

  const packHash = hashKnowledgePack(pack);
  const generated = loadGeneratedProse(slug, packHash);
  const sections = buildSections(pack, model, generated);

  const faqs = packHasMinimumFaqs(pack)
    ? pack.faqs.map((f) => ({ question: f.question, answer: f.answer }))
    : [];

  const relatedLinks = [
    ...relatedModelsFor(slug, 4),
    ...comparisonLinksFor(model.comparisonIds),
    ...relatedGuidesFor({
      modelSlugs: [slug],
      topics: pack.relatedGuideTopics,
      limit: 6,
    }),
    ...hubTopicalLinks(pack.relatedGuideTopics),
    {
      href: "/used-harleys",
      title: "Used Harleys in Southeast Wisconsin",
      excerpt: "Local inventory and city guides near Milwaukee.",
    },
  ];

  for (const y of model.yearsInProduction.slice(-5)) {
    relatedLinks.push({
      href: `/harleys/${model.slug}/${y}`,
      title: `${y} ${model.displayName}`,
    });
  }

  const description = (pack.overview[0] ?? model.summary).slice(0, 160);

  return composeSeoDocument({
    path: `/harleys/${model.slug}`,
    title: `Used ${model.displayName} Harley buying guide`,
    description,
    h1: `Used ${model.displayName}`,
    type: "article",
    ogType: "article",
    sections,
    faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: model.displayName, path: `/harleys/${model.slug}` },
    ],
    relatedLinks,
    relatedInventoryHint: {
      model: model.displayName,
      family: model.family,
      modelSlug: slug,
    },
    modelSlug: slug,
  });
}
