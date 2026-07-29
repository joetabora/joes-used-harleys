import Link from "next/link";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
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
      <div className="jos-panel p-4">
        <p className="jos-label text-[var(--jos-warn)]">Database offline</p>
        <p className="jos-body mt-2">Connect Supabase before viewing the pipeline.</p>
      </div>
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

  return (
    <div className="space-y-6">
      <header>
        <p className="jos-section">Pipeline</p>
        <h1 className="jos-heading mt-1 text-3xl">Customer queue</h1>
        <p className="jos-body mt-2 text-sm">
          Follow up fast — every inquiry is a shot at a sale.
        </p>
      </header>

      {ranked.length === 0 ? (
        <div className="jos-panel p-4">
          <p className="jos-body">No leads yet. Contact form submissions land here.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {ranked.map((lead) => {
            const anchor = lead.interactions[0]?.createdAt ?? lead.createdAt;
            const days = daysBetween(anchor, now);
            const stale =
              lead.status !== "CLOSED" &&
              ((!lead.interactions[0] && lead.status === "NEW") || days >= leadStaleDays);
            const hot = stale && days >= 7;
            return (
              <li key={lead.id} className="jos-panel p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="jos-heading text-base hover:text-[var(--jos-orange)]"
                    >
                      {lead.name}
                    </Link>
                    <p className="jos-data mt-1">
                      {lead.email || "—"} · {lead.phone || "—"} · {lead.source || "—"}
                    </p>
                  </div>
                  <span
                    className={
                      hot
                        ? "jos-pill jos-pill-hot"
                        : stale
                          ? "jos-pill jos-pill-watch"
                          : lead.status === "CLOSED"
                            ? "jos-pill jos-pill-muted"
                            : "jos-pill jos-pill-ok"
                    }
                  >
                    {lead.status}
                    {stale ? ` · ${days}d` : ""}
                  </span>
                </div>
                <p className="jos-data mt-2">
                  {lead._count.interactions} interaction(s) ·{" "}
                  {lead.createdAt.toLocaleDateString("en-US")}
                </p>
                {lead.notes ? (
                  <p className="jos-body mt-2 text-sm whitespace-pre-wrap">{lead.notes}</p>
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
