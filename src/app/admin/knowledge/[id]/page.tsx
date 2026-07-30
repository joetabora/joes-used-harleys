import { notFound } from "next/navigation";
import { KnowledgeEditor } from "@/components/joeos/knowledge-editor";
import { ContextBar } from "@/components/joeos/context-bar";
import { requireAdminOrRedirect } from "@/lib/auth";
import {
  canPublish,
  composeDraftDocument,
  getEntityById,
  neighbors,
  suggestLinksFromNeighbors,
} from "@/lib/knowledge/graph";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { scoreSeoPage } from "@/lib/seo/scoring";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Knowledge entity",
  description: "Edit knowledge graph entity",
  path: "/admin/knowledge",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function KnowledgeDetailPage({ params }: Props) {
  await requireAdminOrRedirect();
  const { id } = await params;
  if (!isDatabaseConfigured() || !prisma) notFound();

  const entity = await getEntityById(id);
  if (!entity) notFound();

  const neigh = await neighbors(entity.id, { limit: 40 });
  const revisions = await prisma.knowledgeRevision.findMany({
    where: { entityId: id },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
  const gate = canPublish(entity);
  const draft = composeDraftDocument(entity);
  const { score } = scoreSeoPage(draft);
  const suggested = suggestLinksFromNeighbors(neigh);

  return (
    <div className="jos-stack-screen">
      <ContextBar
        parentHref="/admin/knowledge"
        parentLabel="Knowledge"
        entityLabel={entity.title}
        status={entity.status}
      />
      <KnowledgeEditor
        entity={{
          id: entity.id,
          type: entity.type,
          slug: entity.slug,
          title: entity.title,
          summary: entity.summary,
          status: entity.status,
          seoTitle: entity.seoTitle,
          seoDescription: entity.seoDescription,
          factsJson: JSON.stringify(entity.facts ?? {}, null, 2),
        }}
        neighbors={neigh.map((n) => ({
          id: n.id,
          kind: n.kind,
          label: n.label,
          direction: n.direction,
          title: n.entity.title,
          type: n.entity.type,
          slug: n.entity.slug,
          status: n.entity.status,
        }))}
        revisions={revisions.map((r) => ({
          id: r.id,
          createdAt: r.createdAt.toISOString(),
          note: r.note,
          snapshot: r.snapshot,
        }))}
        publishGate={gate}
        suggestedLinks={suggested}
        seoScore={score}
      />
    </div>
  );
}
