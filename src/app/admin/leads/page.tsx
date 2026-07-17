import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminOrRedirect } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin leads",
  description: "Review inbound leads",
  path: "/admin/leads",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <PlaceholderNotice title="Database not connected">
        Connect Supabase before viewing leads.
      </PlaceholderNotice>
    );
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { bike: { select: { title: true, slug: true } } },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Leads</h1>
      {leads.length === 0 ? (
        <PlaceholderNotice title="No leads yet">
          Contact form, pre-approval, and alert submissions will appear here.
        </PlaceholderNotice>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
                <CardTitle className="text-base">
                  {lead.name}{" "}
                  <Badge variant="secondary" className="ml-2">
                    {lead.type}
                  </Badge>
                </CardTitle>
                <Badge>{lead.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  {lead.email || "—"} · {lead.phone || "—"}
                </p>
                <p>Source: {lead.sourcePage || "—"}</p>
                {lead.bike ? <p>Bike: {lead.bike.title}</p> : null}
                {lead.message ? (
                  <p className="whitespace-pre-wrap text-foreground">{lead.message}</p>
                ) : null}
                <p className="text-xs">{lead.createdAt.toISOString()}</p>
                <LeadStatusButtons id={lead.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
