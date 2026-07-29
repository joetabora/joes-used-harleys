import Link from "next/link";
import { LeadStatusButtons } from "@/components/lead-status-buttons";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { requireAdminOrRedirect } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Leads",
  description: "Review inbound leads",
  path: "/admin/leads",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="joeos-panel p-4">
        <PlaceholderNotice title="Database not connected">
          Connect Supabase before viewing leads.
        </PlaceholderNotice>
      </div>
    );
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { interactions: true } } },
    take: 100,
  });

  return (
    <div className="joeos-fade-in space-y-6">
      <div>
        <p className="joeos-label text-[var(--joeos-orange)]">Leads</p>
        <h1 className="joeos-heading mt-1 text-3xl">Contact queue</h1>
        <p className="joeos-body mt-2 text-sm">Follow up fast — every inquiry is a shot at a sale.</p>
      </div>

      {leads.length === 0 ? (
        <div className="joeos-panel p-4">
          <PlaceholderNotice title="No leads yet">
            Contact form submissions will appear here.
          </PlaceholderNotice>
        </div>
      ) : (
        <ul className="space-y-2">
          {leads.map((lead) => (
            <li key={lead.id} className="joeos-panel p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="joeos-heading text-base hover:text-[var(--joeos-orange)]"
                  >
                    {lead.name}
                  </Link>
                  <p className="joeos-data mt-1">
                    {lead.email || "—"} · {lead.phone || "—"} · {lead.source || "—"}
                  </p>
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
              <p className="joeos-data mt-2">
                {lead._count.interactions} interaction(s) ·{" "}
                {lead.createdAt.toLocaleDateString("en-US")}
              </p>
              {lead.notes ? (
                <p className="joeos-body mt-2 text-sm whitespace-pre-wrap">{lead.notes}</p>
              ) : null}
              <div className="mt-3">
                <LeadStatusButtons id={lead.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
