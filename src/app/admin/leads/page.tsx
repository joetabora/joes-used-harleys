import Link from "next/link";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import {
  EmptyState,
  JosBody,
  JosData,
  JosItem,
  JosSectionHeader,
  SeverityPill,
} from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { daysBetween } from "@/lib/joeos/briefing";
import { leadStaleDays } from "@/design-system/spacing";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Pipeline",
  description: "Lead follow-up queue",
  path: "/admin/leads",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <EmptyState label="Database offline" warn>
        Connect Supabase before viewing the pipeline.
      </EmptyState>
    );
  }

  const now = new Date();
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      interactions: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { interactions: true } },
    },
    take: 100,
  });

  const ranked = [...leads].sort((a, b) => {
    const aAnchor = a.interactions[0]?.createdAt ?? a.createdAt;
    const bAnchor = b.interactions[0]?.createdAt ?? b.createdAt;
    return daysBetween(bAnchor, now) - daysBetween(aAnchor, now);
  });

  const staleCount = ranked.filter((lead) => {
    const anchor = lead.interactions[0]?.createdAt ?? lead.createdAt;
    const days = daysBetween(anchor, now);
    return (
      lead.status !== "CLOSED" &&
      ((!lead.interactions[0] && lead.status === "NEW") || days >= leadStaleDays)
    );
  }).length;

  return (
    <div className="jos-stack-section">
      <header className="jos-stack-dense">
        <JosSectionHeader section="Pipeline" title="Customer queue" />
        <JosBody className="text-sm">
          Follow up fast — every inquiry is a shot at a sale.
        </JosBody>
        {staleCount > 0 ? (
          <SeverityPill severity="watch">{staleCount} stale</SeverityPill>
        ) : null}
      </header>

      {ranked.length === 0 ? (
        <EmptyState label="No leads">Contact form submissions land here.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {ranked.map((lead) => {
            const anchor = lead.interactions[0]?.createdAt ?? lead.createdAt;
            const days = daysBetween(anchor, now);
            const stale =
              lead.status !== "CLOSED" &&
              ((!lead.interactions[0] && lead.status === "NEW") || days >= leadStaleDays);
            const hot = stale && days >= 7;
            const severity = hot
              ? "hot"
              : stale
                ? "watch"
                : lead.status === "CLOSED"
                  ? "muted"
                  : "ok";
            return (
              <li key={lead.id} className="jos-queue-row !block">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/admin/leads/${lead.id}`}>
                      <JosItem className="text-base hover:text-[var(--jos-orange)]">
                        {lead.name}
                      </JosItem>
                    </Link>
                    <JosData className="mt-1">
                      {lead.email || "—"} · {lead.phone || "—"} · {lead.source || "—"}
                    </JosData>
                  </div>
                  <SeverityPill severity={severity}>
                    {lead.status}
                    {stale ? ` · ${days}d` : ""}
                  </SeverityPill>
                </div>
                <JosData className="mt-2">
                  {lead._count.interactions} interaction(s) ·{" "}
                  {lead.createdAt.toLocaleDateString("en-US")}
                </JosData>
                {lead.notes ? (
                  <JosBody className="mt-2 text-sm whitespace-pre-wrap">{lead.notes}</JosBody>
                ) : null}
                <div className="mt-3">
                  <LeadStatusButtons id={lead.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
