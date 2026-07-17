import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractionForm } from "@/components/interaction-form";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/leads" className="text-sm text-muted-foreground underline">
        ← All leads
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{lead.name}</h1>
          <p className="text-sm text-muted-foreground">
            {lead.email || "—"} · {lead.phone || "—"}
          </p>
          <p className="text-sm text-muted-foreground">Source: {lead.source || "—"}</p>
        </div>
        <Badge>{lead.status}</Badge>
      </div>

      {lead.notes ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent className="whitespace-pre-wrap text-sm">{lead.notes}</CardContent>
        </Card>
      ) : null}

      <LeadStatusButtons id={lead.id} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Log interaction</CardTitle>
        </CardHeader>
        <CardContent>
          <InteractionForm leadId={lead.id} />
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">History</h2>
        {lead.interactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No interactions yet.</p>
        ) : (
          lead.interactions.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {interactionTypeLabel(item.type)}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {item.createdAt.toISOString()}
                  </span>
                </CardTitle>
              </CardHeader>
              {item.note ? (
                <CardContent className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {item.note}
                </CardContent>
              ) : null}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
