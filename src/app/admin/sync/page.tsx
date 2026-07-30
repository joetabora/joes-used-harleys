import { SyncControls } from "@/components/admin/sync-controls";
import {
  EmptyState,
  JosBody,
  JosData,
  JosLabel,
  JosPanel,
  JosSectionHeader,
} from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { bikeLabel, formatPrice } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Feed",
  description: "Inventory feed bay",
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
      <EmptyState label="Database offline" warn>
        Connect Supabase before arming inventory sync.
      </EmptyState>
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
      detail: "Daily cron · 14:00 UTC",
    },
    {
      label: "Live used bikes",
      value: String(usedCount),
      detail: "FEED · AVAILABLE/PENDING",
    },
    {
      label: "Duration",
      value: lastLog?.durationMs != null ? `${lastLog.durationMs} ms` : "—",
      detail: "Last run",
    },
    {
      label: "Feed bytes",
      value: lastLog?.fetchedBytes != null ? String(lastLog.fetchedBytes) : "—",
      detail: lastLog?.feedVersion?.slice(0, 16) ?? "—",
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
    <div className="jos-stack-screen">
      <header className="jos-stack-dense">
        <JosSectionHeader section="Feed bay" title="Inventory feed" />
        <JosBody className="max-w-xl text-sm">
          Mirrors Milwaukee Harley-Davidson used Harley inventory. Never invents bikes.
        </JosBody>
      </header>

      {/* FocusZone: sync actions */}
      <div className="jos-feed-actions">
        <JosPanel>
          <JosLabel className="mb-3">Arming switches</JosLabel>
          <SyncControls />
        </JosPanel>
      </div>

      {lastLog ? (
        <JosPanel>
          <p className="jos-section mb-3">Last run counts</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <JosData>Created: {lastLog.createdCount}</JosData>
            <JosData>Updated: {lastLog.updatedCount}</JosData>
            <JosData>Unchanged: {lastLog.unchangedCount}</JosData>
            <JosData>Sold (off feed): {lastLog.soldCount}</JosData>
            <JosData>Price changes: {lastLog.priceChangeCount}</JosData>
            <JosData>Errors: {lastLog.errorCount}</JosData>
          </div>
        </JosPanel>
      ) : null}

      {/* Secondary: telemetry as data list */}
      <section className="jos-stack-dense jos-secondary">
        <h2 className="jos-section">Telemetry</h2>
        <ul className="divide-y divide-[var(--jos-border)] border border-[var(--jos-border)]">
          {telemetry.map((item) => (
            <li key={item.label} className="jos-pad flex flex-col gap-1 sm:flex-row sm:justify-between">
              <JosLabel>{item.label}</JosLabel>
              <div className="sm:text-right">
                <p className="jos-data break-words text-[var(--jos-bone)]">{item.value}</p>
                <JosData className="break-all">{item.detail}</JosData>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {errors.length > 0 ? (
        <JosPanel>
          <p className="jos-label text-[var(--jos-danger)]">Errors</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.map((e, i) => (
              <li key={i} className="jos-body text-sm">
                {e.message ?? JSON.stringify(e)}
              </li>
            ))}
          </ul>
        </JosPanel>
      ) : null}
    </div>
  );
}
