import type { KnowledgeEntity, KnowledgeEntityType } from "@/generated/prisma/client";
import { composeLocationHub } from "@/lib/content/compose-location";
import { composeModelHub } from "@/lib/content/compose-model-hub";
import { FAMILIES, getModel } from "@/lib/content/taxonomy";
import {
  getPublishedEntity,
  isKnowledgeDbReady,
  neighbors,
  suggestLinksFromNeighbors,
} from "@/lib/knowledge/graph";
import { publicPathForEntity, type KnowledgeFacts } from "@/lib/knowledge/types";
import { composeSeoDocument, defaultFaqs, section } from "@/lib/seo/compose-page";
import { ensureMinLinks } from "@/lib/seo/linking";
import type { SeoLink, SeoPageDocument, SeoSection } from "@/lib/seo/types";

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x).trim()).filter(Boolean);
}

function asFaqs(v: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const q = (item as { question?: unknown }).question;
      const a = (item as { answer?: unknown }).answer;
      if (typeof q !== "string" || typeof a !== "string") return null;
      return { question: q, answer: a };
    })
    .filter(Boolean) as { question: string; answer: string }[];
}

function asSections(v: unknown): SeoSection[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const heading = (item as { heading?: unknown }).heading;
      const body = (item as { body?: unknown }).body;
      if (typeof heading !== "string" || typeof body !== "string") return null;
      return { heading, body };
    })
    .filter(Boolean) as SeoSection[];
}

function inventoryHintFor(entity: KnowledgeEntity, facts: KnowledgeFacts) {
  if (entity.type === "MODEL") {
    const model = getModel(entity.slug);
    return {
      model: model?.displayName ?? entity.title,
      family: model?.family,
      modelSlug: entity.slug,
    };
  }
  if (entity.type === "FAMILY") {
    const family = FAMILIES.find((f) => f.toLowerCase() === entity.slug);
    return { family: family ?? entity.slug };
  }
  if (entity.type === "TRIM") {
    const parent =
      typeof facts.parentModelSlug === "string" ? facts.parentModelSlug : undefined;
    const model = parent ? getModel(parent) : null;
    return {
      model: model?.displayName ?? entity.title,
      modelSlug: parent,
    };
  }
  if (entity.type === "COLOR") {
    return { color: entity.title };
  }
  return {};
}

function sectionsFromFacts(entity: KnowledgeEntity, facts: KnowledgeFacts): SeoSection[] {
  const built: SeoSection[] = [];
  const overview = asStringArray(facts.overview);
  if (overview.length) {
    built.push(section("Overview", overview.map((l) => `• ${l}`).join("\n")));
  }
  const strengths = asStringArray(facts.strengths);
  if (strengths.length) {
    built.push(section("Strengths", strengths.map((l) => `• ${l}`).join("\n")));
  }
  const tradeOffs = asStringArray(facts.tradeOffs);
  if (tradeOffs.length) {
    built.push(section("Trade-offs", tradeOffs.map((l) => `• ${l}`).join("\n")));
  }
  const buying = asStringArray(facts.buyingChecks);
  if (buying.length) {
    built.push(section("Buying checks", buying.map((l) => `• ${l}`).join("\n")));
  }
  const local = asStringArray(facts.localContext);
  if (local.length) {
    built.push(section("Local context", local.map((l) => `• ${l}`).join("\n")));
  }

  const explicit = asSections(facts.sections);
  if (explicit.length) built.push(...explicit);

  const body = typeof facts.body === "string" ? facts.body.trim() : "";
  const bullets = asStringArray(facts.bullets);
  if (!built.length && body) built.push(section("Overview", body));
  else if (body && !explicit.length && !overview.length) built.unshift(section("Overview", body));
  if (bullets.length && !explicit.length) {
    built.push(section("Key points", bullets.map((l) => `• ${l}`).join("\n")));
  }
  if (!built.length) {
    built.push(
      section(
        "Overview",
        entity.summary ||
          `${entity.title} — educational Harley guidance from Joe. Confirm details on the actual bike.`,
      ),
    );
  }
  built.push(
    section(
      "Inventory honesty",
      "Related inventory is mirrored from the live dealership feed when connected — never invented for SEO. Empty results mean nothing matching is available right now. Ask Joe before you buy. Education stays on this page; live units stay on inventory.",
    ),
  );
  return built;
}

function pageTypeFor(type: KnowledgeEntityType): SeoPageDocument["type"] {
  switch (type) {
    case "MODEL":
    case "FAMILY":
    case "GENERATION":
    case "TRIM":
    case "ENGINE":
    case "COLOR":
      return "model";
    case "COMPARISON":
      return "compare";
    case "CITY":
      return "local";
    case "EVENT":
      return "event";
    case "BUYING_TOPIC":
    case "OWNERSHIP_TOPIC":
    case "MAINTENANCE_TOPIC":
    case "UPGRADE_TOPIC":
    case "FINANCING_TOPIC":
    case "INSURANCE_TOPIC":
      return "guide";
    default:
      return "article";
  }
}

async function withGraphLinks(
  entity: KnowledgeEntity,
  doc: SeoPageDocument,
): Promise<SeoPageDocument> {
  const neigh = await neighbors(entity.id, { limit: 16 });
  const graphLinks: SeoLink[] = suggestLinksFromNeighbors(neigh);
  return ensureMinLinks(
    { ...doc, relatedLinks: [...graphLinks, ...doc.relatedLinks] },
    [
      { href: "/inventory", title: "Live inventory" },
      { href: "/guides", title: "Guides" },
      { href: "/harleys", title: "Harley models" },
    ],
  );
}

/** Compose a public SeoPageDocument from a knowledge entity (+ graph neighbors). */
export async function composeFromEntity(
  entity: KnowledgeEntity,
): Promise<(SeoPageDocument & { score: number; status: "DRAFT" | "NOINDEX" | "INDEX" }) | null> {
  if (entity.status !== "PUBLISHED") return null;

  const facts = (entity.facts ?? {}) as KnowledgeFacts;

  if (entity.type === "MODEL") {
    const hub = composeModelHub(entity.slug);
    if (hub) {
      const enriched = await withGraphLinks(entity, {
        ...hub,
        title: entity.seoTitle || hub.title,
        description: entity.seoDescription || hub.description,
      });
      return composeSeoDocument(enriched);
    }
  }

  if (entity.type === "CITY") {
    const hub = composeLocationHub(entity.slug);
    if (hub) {
      const enriched = await withGraphLinks(entity, {
        ...hub,
        title: entity.seoTitle || hub.title,
        description: entity.seoDescription || hub.description,
      });
      return composeSeoDocument(enriched);
    }
  }

  const path =
    publicPathForEntity(entity.type, entity.slug, facts) ??
    `/knowledge/${entity.type.toLowerCase()}/${entity.slug}`;
  const sections = sectionsFromFacts(entity, facts);
  let faqs = asFaqs(facts.faqs);
  if (faqs.length < 2) {
    faqs = [...faqs, ...defaultFaqs(entity.type.toLowerCase(), entity.title)].slice(0, 4);
  }

  const base = await withGraphLinks(entity, {
    path,
    title: entity.seoTitle || entity.title,
    description: (entity.seoDescription || entity.summary || entity.title).slice(0, 160),
    h1: entity.title,
    type: pageTypeFor(entity.type),
    sections,
    faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: entity.title, path },
    ],
    relatedLinks: [],
    indexable: true,
    relatedInventoryHint: inventoryHintFor(entity, facts),
    modelSlug: entity.type === "MODEL" ? entity.slug : undefined,
  });

  return composeSeoDocument({
    ...base,
    ogType: base.type === "guide" || base.type === "article" ? "article" : undefined,
  });
}

/** Published graph entity first; null if missing/unpublished (caller falls back to files). */
export async function resolvePublishedDocument(
  type: KnowledgeEntityType,
  slug: string,
): Promise<(SeoPageDocument & { score: number; status: "DRAFT" | "NOINDEX" | "INDEX" }) | null> {
  if (!isKnowledgeDbReady()) return null;
  const entity = await getPublishedEntity(type, slug);
  if (!entity) return null;
  return composeFromEntity(entity);
}

const GUIDE_TYPES: KnowledgeEntityType[] = [
  "BUYING_TOPIC",
  "OWNERSHIP_TOPIC",
  "MAINTENANCE_TOPIC",
  "UPGRADE_TOPIC",
  "FINANCING_TOPIC",
  "INSURANCE_TOPIC",
];

export async function resolvePublishedGuide(
  topic: string,
  slug: string,
): Promise<(SeoPageDocument & { score: number; status: "DRAFT" | "NOINDEX" | "INDEX" }) | null> {
  if (!isKnowledgeDbReady()) return null;
  for (const type of GUIDE_TYPES) {
    const entity = await getPublishedEntity(type, slug);
    if (!entity) continue;
    const facts = (entity.facts ?? {}) as KnowledgeFacts;
    const guideTopic =
      (typeof facts.guideTopic === "string" && facts.guideTopic) || null;
    if (guideTopic && guideTopic !== topic) continue;
    return composeFromEntity(entity);
  }
  return null;
}

export async function listPublishedGuideLinks(
  topic: string,
): Promise<{ href: string; title: string; excerpt: string }[]> {
  if (!isKnowledgeDbReady()) return [];
  const { listEntities } = await import("@/lib/knowledge/graph");
  const rows = await listEntities({ status: "PUBLISHED", take: 300 });
  const out: { href: string; title: string; excerpt: string }[] = [];
  for (const e of rows) {
    if (!GUIDE_TYPES.includes(e.type)) continue;
    if (e.slug.endsWith("-hub")) continue;
    const facts = (e.facts ?? {}) as KnowledgeFacts;
    if (facts.guideTopic !== topic) continue;
    const href = publicPathForEntity(e.type, e.slug, facts);
    if (!href) continue;
    out.push({ href, title: e.title, excerpt: e.summary });
  }
  return out;
}
