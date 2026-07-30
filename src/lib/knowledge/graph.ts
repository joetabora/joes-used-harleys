import type {
  KnowledgeEntity,
  KnowledgeEntityType,
  KnowledgeRelationKind,
  KnowledgeStatus,
  Prisma,
} from "@/generated/prisma/client";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { scoreSeoPage, statusFromScore } from "@/lib/seo/scoring";
import type { SeoPageDocument } from "@/lib/seo/types";
import {
  factsMeetFloor,
  publicPathForEntity,
  type KnowledgeFacts,
  type KnowledgeSnapshot,
} from "@/lib/knowledge/types";

export function isKnowledgeDbReady(): boolean {
  return isDatabaseConfigured() && Boolean(prisma);
}

export async function getPublishedEntity(
  type: KnowledgeEntityType,
  slug: string,
): Promise<KnowledgeEntity | null> {
  if (!prisma) return null;
  return prisma.knowledgeEntity.findFirst({
    where: { type, slug, status: "PUBLISHED" },
  });
}

export async function getEntityById(id: string): Promise<KnowledgeEntity | null> {
  if (!prisma) return null;
  return prisma.knowledgeEntity.findUnique({ where: { id } });
}

export async function listEntities(opts?: {
  type?: KnowledgeEntityType;
  status?: KnowledgeStatus;
  q?: string;
  take?: number;
}): Promise<KnowledgeEntity[]> {
  if (!prisma) return [];
  const q = opts?.q?.trim();
  return prisma.knowledgeEntity.findMany({
    where: {
      ...(opts?.type ? { type: opts.type } : {}),
      ...(opts?.status ? { status: opts.status } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ type: "asc" }, { title: "asc" }],
    take: opts?.take ?? 200,
  });
}

export async function neighbors(
  entityId: string,
  opts?: { kinds?: KnowledgeRelationKind[]; limit?: number },
): Promise<
  Array<{
    id: string;
    kind: KnowledgeRelationKind;
    label: string | null;
    entity: KnowledgeEntity;
    direction: "out" | "in";
  }>
> {
  if (!prisma) return [];
  const kindFilter = opts?.kinds?.length ? { kind: { in: opts.kinds } } : {};
  const [out, inn] = await Promise.all([
    prisma.knowledgeRelation.findMany({
      where: { fromId: entityId, ...kindFilter },
      include: { to: true },
      take: opts?.limit ?? 24,
    }),
    prisma.knowledgeRelation.findMany({
      where: { toId: entityId, ...kindFilter },
      include: { from: true },
      take: opts?.limit ?? 24,
    }),
  ]);
  const rows = [
    ...out.map((r) => ({
      id: r.id,
      kind: r.kind,
      label: r.label,
      entity: r.to,
      direction: "out" as const,
    })),
    ...inn.map((r) => ({
      id: r.id,
      kind: r.kind,
      label: r.label,
      entity: r.from,
      direction: "in" as const,
    })),
  ];
  return rows.slice(0, opts?.limit ?? 24);
}

export function suggestLinksFromNeighbors(
  rows: Awaited<ReturnType<typeof neighbors>>,
): { href: string; title: string; excerpt?: string }[] {
  const out: { href: string; title: string; excerpt?: string }[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    if (row.entity.status !== "PUBLISHED") continue;
    const facts = (row.entity.facts ?? {}) as KnowledgeFacts;
    const href = publicPathForEntity(row.entity.type, row.entity.slug, facts);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    out.push({
      href,
      title: row.entity.title,
      excerpt: row.entity.summary || undefined,
    });
  }
  return out;
}

export function snapshotFromEntity(entity: KnowledgeEntity): KnowledgeSnapshot {
  return {
    title: entity.title,
    summary: entity.summary,
    facts: (entity.facts ?? {}) as KnowledgeFacts,
    seoTitle: entity.seoTitle,
    seoDescription: entity.seoDescription,
    status: entity.status,
  };
}

export async function createRevision(
  entityId: string,
  snapshot: KnowledgeSnapshot,
  note?: string,
  actorId?: string,
) {
  if (!prisma) return;
  await prisma.knowledgeRevision.create({
    data: {
      entityId,
      snapshot: snapshot as unknown as Prisma.InputJsonValue,
      note: note ?? null,
      actorId: actorId ?? null,
    },
  });
}

/** Compose a minimal SeoPageDocument for scoring publish readiness. */
export function composeDraftDocument(entity: KnowledgeEntity): SeoPageDocument {
  const facts = (entity.facts ?? {}) as KnowledgeFacts;
  const path =
    publicPathForEntity(entity.type, entity.slug, facts) ??
    `/knowledge/${entity.type.toLowerCase()}/${entity.slug}`;
  const bullets = Array.isArray(facts.bullets)
    ? (facts.bullets as string[])
    : Array.isArray(facts.overview)
      ? (facts.overview as string[])
      : Array.isArray(facts.localContext)
        ? (facts.localContext as string[])
        : Array.isArray(facts.strengths)
          ? (facts.strengths as string[])
          : [];
  const sections =
    Array.isArray(facts.sections) && facts.sections.length
      ? (facts.sections as { heading: string; body: string }[])
      : [
          {
            heading: "Overview",
            body:
              (typeof facts.body === "string" && facts.body) ||
              entity.summary ||
              entity.title,
          },
          {
            heading: "Key points",
            body:
              bullets.map((b) => `• ${b}`).join("\n") ||
              "Confirm fit and paperwork on the actual bike. Related inventory is mirrored from the live feed when connected — never invented.",
          },
          {
            heading: "Honesty",
            body: "Joe helps with clear questions about used Harleys in Southeast Wisconsin. Empty related inventory means nothing matching is available right now. Never invent prices, comps, dealer rankings, or service menus. Educational pages stay educational; live units stay on inventory. Confirm fit, title status, and service records on the actual motorcycle before you buy. Specs and options vary by year and prior owner setup — use the VIN, not a brochure photo. When related inventory is empty, ask Joe what he is watching for rather than assuming stock exists.",
          },
          {
            heading: "Next step",
            body: "Open live inventory, sit on the bike, and bring paperwork questions to Joe. Move at a human pace. This knowledge node is for education and cross-linking — it is not a doorway matrix of every year, color, and trim combination.",
          },
        ];
  const faqs = Array.isArray(facts.faqs)
    ? (facts.faqs as { question: string; answer: string }[])
    : [
        {
          question: `What is ${entity.title}?`,
          answer:
            entity.summary ||
            "Educational Harley guidance from Joe — confirm details on the actual bike.",
        },
        {
          question: "Is inventory invented for this page?",
          answer:
            "No. Related inventory is mirrored from the live dealership feed when connected.",
        },
      ];

  return {
    path,
    title: entity.seoTitle || `${entity.title} — used Harley guide`,
    description: (entity.seoDescription || entity.summary || entity.title)
      .padEnd(70, " ")
      .slice(0, 160)
      .trim(),
    h1: entity.title,
    type: "article",
    sections,
    faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: entity.title, path },
    ],
    relatedLinks: [
      { href: "/inventory", title: "Live inventory" },
      { href: "/guides", title: "Guides" },
      { href: "/harleys", title: "Harley models" },
    ],
    indexable: true,
    relatedInventoryHint: {},
  };
}

export function canPublish(entity: KnowledgeEntity): {
  ok: boolean;
  reasons: string[];
  score: number;
} {
  const reasons: string[] = [];
  const facts = (entity.facts ?? {}) as KnowledgeFacts;
  const floor = factsMeetFloor(entity.type, facts);
  if (!floor.ok) reasons.push(floor.reason ?? "facts incomplete");
  if (!entity.title.trim()) reasons.push("title required");
  if (!entity.summary.trim() || entity.summary.trim().length < 40)
    reasons.push("summary ≥40 chars");

  const doc = composeDraftDocument(entity);
  const { score } = scoreSeoPage(doc);
  const status = statusFromScore(score);
  if (status !== "INDEX") reasons.push(`SEO score ${score} below INDEX threshold`);

  return { ok: reasons.length === 0, reasons, score };
}

export async function upsertRelation(input: {
  fromId: string;
  toId: string;
  kind: KnowledgeRelationKind;
  label?: string;
  weight?: number;
}) {
  if (!prisma) throw new Error("Database not configured");
  return prisma.knowledgeRelation.upsert({
    where: {
      fromId_toId_kind: {
        fromId: input.fromId,
        toId: input.toId,
        kind: input.kind,
      },
    },
    create: {
      fromId: input.fromId,
      toId: input.toId,
      kind: input.kind,
      label: input.label ?? null,
      weight: input.weight ?? 0,
    },
    update: {
      label: input.label ?? null,
      weight: input.weight ?? 0,
    },
  });
}

export async function deleteRelation(id: string) {
  if (!prisma) throw new Error("Database not configured");
  await prisma.knowledgeRelation.delete({ where: { id } });
}
