import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractionForm } from "@/components/interaction-form";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { requireAdminOrRedirect } from "@/lib/auth";
import { interactionTypeLabel } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lead detail",
  description: "Lead and interaction history",
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
    <div className="joeos-fade-in mx-auto max-w-3xl space-y-6">
      <Link href="/admin/leads" className="joeos-label hover:text-[var(--joeos-orange)]">
        ← All leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="joeos-heading text-3xl">{lead.name}</h1>
          <p className="joeos-data mt-2">
            {lead.email || "—"} · {lead.phone || "—"}
          </p>
          <p className="joeos-data">Source: {lead.source || "—"}</p>
        </div>
        <span
          className={
            lead.status === "NEW"
              ? "joeos-pill joeos-pill-hot"
              : lead.status === "CONTACTED"
                ? "joeos-pill joeos-pill-watch"
                : "joeos-pill joeos-pill-muted"
          }
        >
          {lead.status}
        </span>
      </div>

      {lead.notes ? (
        <div className="joeos-panel p-4">
          <p className="joeos-label mb-2">Notes</p>
          <p className="joeos-body whitespace-pre-wrap text-sm">{lead.notes}</p>
        </div>
      ) : null}

      <LeadStatusButtons id={lead.id} />

      <div className="joeos-panel p-4">
        <p className="joeos-label mb-3">Log interaction</p>
        <InteractionForm leadId={lead.id} />
      </div>

      <div className="space-y-3">
        <h2 className="joeos-heading text-xl">History</h2>
        {lead.interactions.length === 0 ? (
          <p className="joeos-body text-sm">No interactions yet.</p>
        ) : (
          lead.interactions.map((item) => (
            <div key={item.id} className="joeos-panel p-4">
              <p className="joeos-heading text-sm">
                {interactionTypeLabel(item.type)}{" "}
                <span className="joeos-data font-normal">
                  · {item.createdAt.toISOString()}
                </span>
              </p>
              {item.note ? (
                <p className="joeos-body mt-2 whitespace-pre-wrap text-sm">{item.note}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
