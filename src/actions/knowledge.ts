"use server";

import { revalidatePath } from "next/cache";
import type {
  KnowledgeEntityType,
  KnowledgeRelationKind,
  KnowledgeStatus,
  Prisma,
} from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import {
  canPublish,
  createRevision,
  deleteRelation,
  snapshotFromEntity,
  upsertRelation,
} from "@/lib/knowledge/graph";
import type { KnowledgeFacts, KnowledgeSnapshot } from "@/lib/knowledge/types";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export type KnowledgeActionResult = {
  ok: boolean;
  message: string;
  entityId?: string;
};

async function requireKnowledgeDb() {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    throw new Error("Database not configured");
  }
  return prisma;
}

export async function saveKnowledgeEntity(
  id: string,
  raw: {
    title?: string;
    summary?: string;
    factsJson?: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    note?: string;
  },
): Promise<KnowledgeActionResult> {
  const db = await requireKnowledgeDb();
  const existing = await db.knowledgeEntity.findUnique({ where: { id } });
  if (!existing) return { ok: false, message: "Entity not found." };

  let facts: KnowledgeFacts = (existing.facts ?? {}) as KnowledgeFacts;
  if (raw.factsJson != null) {
    try {
      facts = JSON.parse(raw.factsJson) as KnowledgeFacts;
    } catch {
      return { ok: false, message: "Facts must be valid JSON." };
    }
  }

  const updated = await db.knowledgeEntity.update({
    where: { id },
    data: {
      title: raw.title?.trim() || existing.title,
      summary: raw.summary ?? existing.summary,
      facts: facts as Prisma.InputJsonValue,
      seoTitle: raw.seoTitle === undefined ? existing.seoTitle : raw.seoTitle || null,
      seoDescription:
        raw.seoDescription === undefined
          ? existing.seoDescription
          : raw.seoDescription || null,
    },
  });

  await createRevision(
    id,
    snapshotFromEntity(updated),
    raw.note?.trim() || "Save draft",
  );
  revalidatePath("/admin/knowledge");
  revalidatePath(`/admin/knowledge/${id}`);
  return { ok: true, message: "Saved.", entityId: id };
}

export async function setKnowledgeStatus(
  id: string,
  status: KnowledgeStatus,
  note?: string,
): Promise<KnowledgeActionResult> {
  const db = await requireKnowledgeDb();
  const existing = await db.knowledgeEntity.findUnique({ where: { id } });
  if (!existing) return { ok: false, message: "Entity not found." };

  if (status === "PUBLISHED") {
    const gate = canPublish(existing);
    if (!gate.ok) {
      return {
        ok: false,
        message: `Publish blocked (score ${gate.score}): ${gate.reasons.join("; ")}`,
      };
    }
  }

  const updated = await db.knowledgeEntity.update({
    where: { id },
    data: {
      status,
      publishedAt:
        status === "PUBLISHED"
          ? existing.publishedAt ?? new Date()
          : status === "ARCHIVED" || status === "DRAFT"
            ? null
            : existing.publishedAt,
    },
  });

  await createRevision(
    id,
    snapshotFromEntity(updated),
    note?.trim() || `Status → ${status}`,
  );

  const facts = (updated.facts ?? {}) as KnowledgeFacts;
  const { publicPathForEntity } = await import("@/lib/knowledge/types");
  const pub = publicPathForEntity(updated.type, updated.slug, facts);
  if (pub) revalidatePath(pub);
  revalidatePath("/admin/knowledge");
  revalidatePath(`/admin/knowledge/${id}`);
  return { ok: true, message: `Status set to ${status}.`, entityId: id };
}

export async function addKnowledgeRelation(input: {
  fromId: string;
  toType: KnowledgeEntityType;
  toSlug: string;
  kind: KnowledgeRelationKind;
  label?: string;
}): Promise<KnowledgeActionResult> {
  const db = await requireKnowledgeDb();
  const to = await db.knowledgeEntity.findUnique({
    where: { type_slug: { type: input.toType, slug: input.toSlug } },
  });
  if (!to) return { ok: false, message: `Target ${input.toType}/${input.toSlug} not found.` };
  await upsertRelation({
    fromId: input.fromId,
    toId: to.id,
    kind: input.kind,
    label: input.label,
  });
  revalidatePath(`/admin/knowledge/${input.fromId}`);
  return { ok: true, message: "Relation saved." };
}

export async function removeKnowledgeRelation(
  relationId: string,
  entityId: string,
): Promise<KnowledgeActionResult> {
  await requireKnowledgeDb();
  await deleteRelation(relationId);
  revalidatePath(`/admin/knowledge/${entityId}`);
  return { ok: true, message: "Relation removed." };
}

/**
 * Prose-only rewrite of a selected facts path (e.g. "sections.0.body").
 * Never invents facts — rewrites existing text only. Human must approve before publish.
 */
export async function assistKnowledgeSection(
  id: string,
  factsPath: string,
): Promise<KnowledgeActionResult & { rewrite?: string }> {
  await requireKnowledgeDb();
  const existing = await prisma!.knowledgeEntity.findUnique({ where: { id } });
  if (!existing) return { ok: false, message: "Entity not found." };

  const facts = (existing.facts ?? {}) as KnowledgeFacts;
  const current = getAtPath(facts, factsPath);
  if (current == null || (typeof current !== "string" && !Array.isArray(current))) {
    return { ok: false, message: "factsPath must point to a string or string array." };
  }

  const fallback =
    typeof current === "string"
      ? current
      : (current as string[]).map((l) => `• ${l}`).join("\n");

  const key = process.env.OPENAI_API_KEY;
  if (!key || key.includes("PLACEHOLDER")) {
    return {
      ok: true,
      message: "AI not configured — returned current text unchanged.",
      rewrite: fallback,
    };
  }

  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Rewrite the provided Harley knowledge facts into clear prose. Do not add facts, numbers, prices, horsepower claims, approvals, dealer rankings, or links not present in the input. Do not invent market or inventory data. Return plain text only.",
        },
        { role: "user", content: JSON.stringify(current) },
      ],
    }),
  });

  if (!response.ok) {
    return { ok: false, message: `AI request failed (${response.status}).`, rewrite: fallback };
  }
  const json = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const rewrite = json.choices?.[0]?.message?.content?.trim() || fallback;
  return {
    ok: true,
    message: "Rewrite ready — review and paste into facts before saving.",
    rewrite,
  };
}

function getAtPath(obj: KnowledgeFacts, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    const idx = /^\d+$/.test(p) ? Number(p) : p;
    cur = (cur as Record<string | number, unknown>)[idx as string];
  }
  return cur;
}

export async function createKnowledgeEntity(input: {
  type: KnowledgeEntityType;
  slug: string;
  title: string;
  summary?: string;
}): Promise<KnowledgeActionResult> {
  const db = await requireKnowledgeDb();
  const slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  if (!slug) return { ok: false, message: "Slug required." };
  try {
    const created = await db.knowledgeEntity.create({
      data: {
        type: input.type,
        slug,
        title: input.title.trim() || slug,
        summary: input.summary?.trim() || "",
        facts: {},
        status: "DRAFT",
      },
    });
    const snap: KnowledgeSnapshot = snapshotFromEntity(created);
    await createRevision(created.id, snap, "Create draft");
    revalidatePath("/admin/knowledge");
    return { ok: true, message: "Created.", entityId: created.id };
  } catch {
    return { ok: false, message: "Could not create — type+slug may already exist." };
  }
}
