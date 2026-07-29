import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractionForm } from "@/components/interaction-form";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { requireAdminOrRedirect } from "@/lib/auth";
import { interactionTypeLabel } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Customer file",
  description: "Lead and interaction timeline",
  path: "/admin/leads",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminLeadDetailPage({ params }: Props) {
  await requireAdminOrRedirect();
  const { id } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      interactions: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!lead) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/leads" className="jos-label hover:text-[var(--jos-orange)]">
        ← Pipeline
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="jos-section">Customer file</p>
          <h1 className="jos-heading mt-1 text-3xl">{lead.name}</h1>
          <p className="jos-data mt-2">
            {lead.email || "—"} · {lead.phone || "—"}
          </p>
          <p className="jos-data">Source: {lead.source || "—"}</p>
        </div>
        <span
          className={
            lead.status === "NEW"
              ? "jos-pill jos-pill-hot"
              : lead.status === "CONTACTED"
                ? "jos-pill jos-pill-watch"
                : "jos-pill jos-pill-muted"
          }
        >
          {lead.status}
        </span>
      </div>

      {lead.notes ? (
        <div className="jos-panel p-4">
          <p className="jos-label mb-2">Notes</p>
          <p className="jos-body whitespace-pre-wrap text-sm">{lead.notes}</p>
        </div>
      ) : null}

      <LeadStatusButtons id={lead.id} />

      <div className="jos-panel p-4">
        <p className="jos-section mb-3">Log interaction</p>
        <InteractionForm leadId={lead.id} />
      </div>

      <div className="space-y-3">
        <h2 className="jos-heading text-xl">Timeline</h2>
        {lead.interactions.length === 0 ? (
          <p className="jos-body text-sm">No interactions yet.</p>
        ) : (
          lead.interactions.map((item) => (
            <div key={item.id} className="jos-panel p-4">
              <p className="jos-heading text-sm">
                {interactionTypeLabel(item.type)}{" "}
                <span className="jos-data font-normal">
                  · {item.createdAt.toISOString()}
                </span>
              </p>
              {item.note ? (
                <p className="jos-body mt-2 whitespace-pre-wrap text-sm">{item.note}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
