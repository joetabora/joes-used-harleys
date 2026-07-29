import { SyncControls } from "@/components/admin/sync-controls";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { requireAdminOrRedirect } from "@/lib/auth";
import { bikeLabel, formatPrice } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Sync",
  description: "Inventory sync dashboard",
  path: "/admin/sync",
  noIndex: true,
});

export const dynamic = "force-dynamic";

function formatWhen(d: Date | null | undefined) {
  if (!d) return "—";
  return d.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

export default async function AdminSyncPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="joeos-panel p-4">
        <PlaceholderNotice title="Database not connected">
          Connect Supabase before running JoeOS inventory sync.
        </PlaceholderNotice>
      </div>
    );
  }

  const [lastLog, lastSuccessCron, usedCount, newest] = await Promise.all([
    prisma.syncLog.findFirst({ orderBy: { startedAt: "desc" } }),
    prisma.syncLog.findFirst({
      where: { trigger: "CRON", status: { in: ["SUCCESS", "PARTIAL"] }, dryRun: false },
      orderBy: { startedAt: "desc" },
    }),
    prisma.bike.count({
      where: {
        source: "FEED",
        hidden: false,
        status: { in: ["AVAILABLE", "PENDING"] },
      },
    }),
    prisma.bike.findFirst({
      where: { source: "FEED", hidden: false, status: { in: ["AVAILABLE", "PENDING"] } },
      orderBy: { firstSeenAt: "desc" },
    }),
  ]);

  const nextScheduled = lastSuccessCron
    ? new Date(lastSuccessCron.startedAt.getTime() + 24 * 60 * 60 * 1000)
    : null;

  const errors =
    lastLog?.errors && Array.isArray(lastLog.errors)
      ? (lastLog.errors as { message?: string }[])
      : [];

  const telemetry = [
    {
      label: "Last sync",
      value: formatWhen(lastLog?.startedAt),
      detail: lastLog
        ? `${lastLog.trigger} · ${lastLog.status}${lastLog.dryRun ? " · dry-run" : ""}`
        : "No runs yet",
    },
    {
      label: "Next scheduled",
      value: formatWhen(nextScheduled),
      detail: "Daily cron · 14:00 UTC · best effort",
    },
    {
      label: "Live used bikes",
      value: String(usedCount),
      detail: "FEED · AVAILABLE/PENDING",
    },
    {
      label: "Feed bytes",
      value:
        lastLog?.fetchedBytes != null ? String(lastLog.fetchedBytes) : "—",
      detail: lastLog?.feedVersion ? lastLog.feedVersion.slice(0, 16) : "—",
    },
    {
      label: "Duration",
      value: lastLog?.durationMs != null ? `${lastLog.durationMs} ms` : "—",
      detail: "Last run",
    },
    {
      label: "Newest bike",
      value: newest ? bikeLabel(newest) : "—",
      detail: newest
        ? `${formatPrice(newest.price)} · ${formatWhen(newest.firstSeenAt)}`
        : "—",
    },
  ];

  return (
    <div className="joeos-fade-in space-y-8">
      <div>
        <p className="joeos-label text-[var(--joeos-orange)]">Sync</p>
        <h1 className="joeos-heading mt-1 text-3xl">Inventory feed</h1>
        <p className="joeos-body mt-2 max-w-xl text-sm">
          Mirrors Milwaukee Harley-Davidson used Harley inventory. Never invents bikes.
        </p>
      </div>

      <SyncControls />

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {telemetry.map((item) => (
          <div key={item.label} className="joeos-kpi-block">
            <p className="joeos-label">{item.label}</p>
            <p className="joeos-heading mt-2 text-lg break-words">{item.value}</p>
            <p className="joeos-data mt-2 break-all">{item.detail}</p>
          </div>
        ))}
      </div>

      {lastLog ? (
        <div className="joeos-panel p-4">
          <p className="joeos-label mb-3">Last run counts</p>
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <p>Created: {lastLog.createdCount}</p>
            <p>Updated: {lastLog.updatedCount}</p>
            <p>Unchanged: {lastLog.unchangedCount}</p>
            <p>Sold (off feed): {lastLog.soldCount}</p>
            <p>Price changes: {lastLog.priceChangeCount}</p>
            <p>Errors: {lastLog.errorCount}</p>
          </div>
        </div>
      ) : null}

      {errors.length > 0 ? (
        <div className="joeos-panel p-4">
          <p className="joeos-label text-[var(--joeos-danger)]">Errors</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errors.map((e, i) => (
              <li key={i}>{e.message ?? JSON.stringify(e)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
