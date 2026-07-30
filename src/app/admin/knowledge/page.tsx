import Link from "next/link";
import { createKnowledgeEntity } from "@/actions/knowledge";
import { ContextBar } from "@/components/joeos/context-bar";
import { JosButton, JosPanel, JosSectionHeader } from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { listEntities } from "@/lib/knowledge/graph";
import { publicPathForEntity, type KnowledgeFacts } from "@/lib/knowledge/types";
import { isDatabaseConfigured } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import type { KnowledgeEntityType, KnowledgeStatus } from "@/generated/prisma/client";

export const metadata = createMetadata({
  title: "Knowledge",
  description: "Harley knowledge graph console",
  path: "/admin/knowledge",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ type?: string; status?: string; q?: string }>;
};

const TYPES: KnowledgeEntityType[] = [
  "MODEL",
  "FAMILY",
  "GENERATION",
  "TRIM",
  "ENGINE",
  "COLOR",
  "CITY",
  "COMPARISON",
  "UPGRADE_TOPIC",
  "OWNERSHIP_TOPIC",
  "BUYING_TOPIC",
  "MAINTENANCE_TOPIC",
  "ROUTE",
  "EVENT",
];

export default async function KnowledgeListPage({ searchParams }: Props) {
  await requireAdminOrRedirect();
  const sp = await searchParams;

  if (!isDatabaseConfigured()) {
    return (
      <div className="jos-stack-screen">
        <ContextBar parentHref="/admin" parentLabel="Command" entityLabel="Knowledge" />
        <JosPanel>
          <p className="jos-data">Database not configured — set DATABASE_URL to use the Knowledge Console.</p>
        </JosPanel>
      </div>
    );
  }

  const entities = await listEntities({
    type: (sp.type as KnowledgeEntityType) || undefined,
    status: (sp.status as KnowledgeStatus) || undefined,
    q: sp.q,
    take: 300,
  });

  return (
    <div className="jos-stack-screen">
      <ContextBar parentHref="/admin" parentLabel="Command" entityLabel="Knowledge" />
      <JosSectionHeader
        section="Knowledge"
        title="Draft → review → publish. Public site only shows PUBLISHED."
      />

      <JosPanel>
        <form className="flex flex-wrap gap-2" method="get">
          <select name="type" defaultValue={sp.type ?? ""} className="jos-field">
            <option value="">All types</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={sp.status ?? ""} className="jos-field">
            <option value="">All statuses</option>
            {(["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"] as KnowledgeStatus[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="Search title/slug"
            className="jos-field min-w-[12rem] flex-1"
          />
          <JosButton type="submit">Filter</JosButton>
        </form>
      </JosPanel>

      <JosPanel>
        <form
          action={async (fd) => {
            "use server";
            const type = String(fd.get("type") || "MODEL") as KnowledgeEntityType;
            const slug = String(fd.get("slug") || "");
            const title = String(fd.get("title") || slug);
            const res = await createKnowledgeEntity({ type, slug, title });
            if (res.ok && res.entityId) {
              const { redirect } = await import("next/navigation");
              redirect(`/admin/knowledge/${res.entityId}`);
            }
          }}
          className="flex flex-wrap items-end gap-2"
        >
          <label className="jos-stack-dense">
            <span className="jos-label">New type</span>
            <select name="type" className="jos-field" defaultValue="MODEL">
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="jos-stack-dense">
            <span className="jos-label">Slug</span>
            <input name="slug" required className="jos-field" placeholder="my-entity" />
          </label>
          <label className="jos-stack-dense">
            <span className="jos-label">Title</span>
            <input name="title" className="jos-field" placeholder="Display title" />
          </label>
          <JosButton type="submit">Create draft</JosButton>
        </form>
      </JosPanel>

      <JosPanel>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="jos-label border-b border-[var(--jos-line)]">
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Public</th>
              </tr>
            </thead>
            <tbody>
              {entities.map((e) => {
                const facts = (e.facts ?? {}) as KnowledgeFacts;
                const path = publicPathForEntity(e.type, e.slug, facts);
                return (
                  <tr key={e.id} className="border-b border-[var(--jos-line)]/40">
                    <td className="py-2 pr-3 jos-data">{e.type}</td>
                    <td className="py-2 pr-3">
                      <Link href={`/admin/knowledge/${e.id}`} className="text-lamp hover:underline">
                        {e.title}
                      </Link>
                      <div className="jos-label opacity-70">{e.slug}</div>
                    </td>
                    <td className="py-2 pr-3 jos-data">{e.status}</td>
                    <td className="py-2 pr-3 jos-data">
                      {e.status === "PUBLISHED" && path ? (
                        <Link href={path} target="_blank" className="hover:underline">
                          {path}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {entities.length === 0 ? (
            <p className="jos-data mt-3">No entities. Run npm run knowledge:seed.</p>
          ) : null}
        </div>
      </JosPanel>
    </div>
  );
}
