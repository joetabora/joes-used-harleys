import { notFound } from "next/navigation";
import { InteractionForm } from "@/components/interaction-form";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { ContextBar } from "@/components/joeos/context-bar";
import {
  EmptyState,
  JosBody,
  JosData,
  JosItem,
  JosPanel,
  type JosSeverity,
} from "@/components/joeos/ui";
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

function leadSeverity(status: string): JosSeverity {
  if (status === "NEW") return "hot";
  if (status === "CONTACTED") return "watch";
  return "muted";
}

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
    <div className="mx-auto max-w-3xl jos-stack-screen">
      <ContextBar
        parentHref="/admin/leads"
        parentLabel="Pipeline"
        entityLabel={lead.name}
        status={lead.status}
        statusSeverity={leadSeverity(lead.status)}
      />

      {/* Secondary: customer meta */}
      <div className="jos-stack-dense jos-secondary">
        <p className="jos-section">Customer file</p>
        <h1 className="jos-title text-3xl">{lead.name}</h1>
        <JosData>
          {lead.email || "—"} · {lead.phone || "—"}
        </JosData>
        <JosData>Source: {lead.source || "—"}</JosData>
        {lead.notes ? (
          <JosPanel>
            <p className="jos-label mb-2">Notes</p>
            <JosBody className="whitespace-pre-wrap text-sm">{lead.notes}</JosBody>
          </JosPanel>
        ) : null}
        <LeadStatusButtons id={lead.id} />
      </div>

      {/* FocusZone: composer + timeline */}
      <div className="jos-stack-section">
        <JosPanel>
          <p className="jos-section mb-3">Log interaction</p>
          <InteractionForm leadId={lead.id} />
        </JosPanel>

        <div className="jos-stack-dense">
          <h2 className="jos-section">Timeline</h2>
          {lead.interactions.length === 0 ? (
            <EmptyState label="Empty">No interactions yet.</EmptyState>
          ) : (
            lead.interactions.map((item) => (
              <JosPanel key={item.id}>
                <JosItem className="text-sm">
                  {interactionTypeLabel(item.type)}{" "}
                  <span className="jos-data font-normal">
                    · {item.createdAt.toISOString()}
                  </span>
                </JosItem>
                {item.note ? (
                  <JosBody className="mt-2 whitespace-pre-wrap text-sm">{item.note}</JosBody>
                ) : null}
              </JosPanel>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
