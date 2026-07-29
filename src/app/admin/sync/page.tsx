import { SyncControls } from "@/components/admin/sync-controls";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <PlaceholderNotice title="Database not connected">
        Connect Supabase before running JoeOS inventory sync.
      </PlaceholderNotice>
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
    ? new Date(lastSuccessCron.startedAt.getTime() + 60 * 60 * 1000)
    : null;

  const errors =
    lastLog?.errors && Array.isArray(lastLog.errors)
      ? (lastLog.errors as { message?: string }[])
      : [];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">JoeOS</p>
        <h1 className="text-2xl font-semibold">Inventory Sync</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mirrors Milwaukee Harley-Davidson used Harley inventory. Never invents bikes.
        </p>
      </div>

      <SyncControls />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Sync</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>{formatWhen(lastLog?.startedAt)}</p>
            <p className="text-muted-foreground">
              {lastLog
                ? `${lastLog.trigger} · ${lastLog.status}${lastLog.dryRun ? " · dry-run" : ""}`
                : "No runs yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Scheduled (est.)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>{formatWhen(nextScheduled)}</p>
            <p className="text-muted-foreground">Hourly Vercel Cron — best effort</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Used Bikes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{usedCount}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Feed Download
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>{formatWhen(lastLog?.startedAt)}</p>
            <p className="break-all text-muted-foreground">
              {lastLog?.fetchedBytes != null ? `${lastLog.fetchedBytes} bytes` : "—"}
              {lastLog?.feedVersion ? ` · ${lastLog.feedVersion.slice(0, 12)}…` : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sync Duration</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {lastLog?.durationMs != null ? `${lastLog.durationMs} ms` : "—"}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Newest Bike</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {newest ? (
              <>
                <p className="font-medium">{bikeLabel(newest)}</p>
                <p className="text-muted-foreground">
                  {formatPrice(newest.price)} · first seen {formatWhen(newest.firstSeenAt)}
                </p>
              </>
            ) : (
              "—"
            )}
          </CardContent>
        </Card>
      </div>

      {lastLog ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Last run counts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-3">
            <p>Created: {lastLog.createdCount}</p>
            <p>Updated: {lastLog.updatedCount}</p>
            <p>Unchanged: {lastLog.unchangedCount}</p>
            <p>Sold (off feed): {lastLog.soldCount}</p>
            <p>Price changes: {lastLog.priceChangeCount}</p>
            <p>Errors: {lastLog.errorCount}</p>
          </CardContent>
        </Card>
      ) : null}

      {errors.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-destructive">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {errors.map((e, i) => (
                <li key={i}>{e.message ?? JSON.stringify(e)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
