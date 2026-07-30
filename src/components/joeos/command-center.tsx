import Link from "next/link";
import {
  Bike,
  Radio,
  Zap,
} from "lucide-react";
import type { HotAction, MorningBriefing, Severity } from "@/lib/joeos/briefing";
import { severityLabel } from "@/lib/joeos/briefing";
import {
  EmptyState,
  Gauge,
  JosBody,
  JosData,
  JosIcon,
  JosItem,
  JosKpi,
  JosPanel,
  SeverityPill,
} from "@/components/joeos/ui";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function actionIcon(action: HotAction) {
  if (action.kind === "bike") return Bike;
  if (action.kind === "lead") return Radio;
  return Zap;
}

function toPill(severity: Severity) {
  return severity;
}

export function CommandCenter({
  briefing,
  dbReady,
}: {
  briefing: MorningBriefing;
  dbReady: boolean;
}) {
  return (
    <div className="jos-stack-screen">
      <header className="jos-stack-dense">
        <p className="jos-data">{briefing.dateLabel}</p>
        <h1 className="jos-title text-3xl md:text-4xl">
          {briefing.greeting} {briefing.displayName}
        </h1>
        <JosBody className="max-w-2xl">
          What should you do today to sell more motorcycles — from live floor stock and pipeline
          only.
        </JosBody>
      </header>

      {!dbReady ? (
        <EmptyState label="Database offline" warn>
          Connect DATABASE_URL to arm the command center.
        </EmptyState>
      ) : null}

      {/* Secondary: compact mission strip */}
      <section className="jos-stack-dense jos-secondary">
        <h2 className="jos-section">Today&apos;s Mission</h2>
        {briefing.missions.length === 0 ? (
          <JosPanel raised>
            <JosItem className="text-lg">Mission clear</JosItem>
            <JosBody className="mt-2">
              No aging inventory or stale leads. {briefing.liveBikeCount} live machine
              {briefing.liveBikeCount === 1 ? "" : "s"} on the floor.
            </JosBody>
          </JosPanel>
        ) : (
          <div className="jos-mission-strip">
            {briefing.missions.map((m) => (
              <div key={m.label} className="jos-kpi-gauge">
                <p className="jos-label">{m.label}</p>
                <JosKpi className="text-3xl md:text-4xl">
                  {m.label.toLowerCase().includes("potential") ||
                  m.label.toLowerCase().includes("pipeline")
                    ? formatMoney(m.count)
                    : m.count}
                </JosKpi>
                <JosData>{m.detail}</JosData>
              </div>
            ))}
          </div>
        )}
        {briefing.syncStatus === "failed" ? (
          <SeverityPill severity="aging">Feed sync failed — check FEED</SeverityPill>
        ) : null}
      </section>

      {/* FocusZone: Hot Queue */}
      <section className="jos-stack-dense">
        <h2 className="jos-section">Hot Queue</h2>
        {briefing.hotActions.length === 0 ? (
          <EmptyState label="Queue clear">No hot actions.</EmptyState>
        ) : (
          <ul className="space-y-2">
            {briefing.hotActions.map((action) => {
              const Icon = actionIcon(action);
              return (
                <li key={`${action.kind}-${action.id}`}>
                  <Link href={action.href} className="jos-queue-row">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0 space-y-1">
                        <JosItem className="flex items-center gap-2 text-base">
                          <JosIcon icon={Icon} size={16} className="text-[var(--jos-orange)]" />
                          {action.title}
                        </JosItem>
                        <JosBody className="text-sm">{action.detail}</JosBody>
                      </div>
                      <SeverityPill severity={toPill(action.severity)}>
                        {severityLabel(action.severity)}
                      </SeverityPill>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Secondary: Radar + Intel */}
      <div className="jos-stack-section jos-secondary">
        <section className="jos-stack-dense">
          <h2 className="jos-section">Inventory Radar</h2>
          {briefing.radar.length === 0 ? (
            <EmptyState label="No chart">No live inventory to chart.</EmptyState>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {briefing.radar.map((bucket) => (
                <li key={bucket.family} className="jos-panel jos-pad">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <JosItem className="text-sm">{bucket.family}</JosItem>
                    <SeverityPill severity={toPill(bucket.severity)}>
                      {severityLabel(bucket.severity)}
                    </SeverityPill>
                  </div>
                  <Gauge
                    percent={Math.max(bucket.fillPercent, bucket.total ? 4 : 0)}
                    severity={bucket.severity}
                  />
                  <JosData className="mt-2">
                    {bucket.aging}/{bucket.total} aging · {bucket.fillPercent}%
                  </JosData>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="jos-stack-dense">
          <h2 className="jos-section">Sales Intelligence</h2>
          <JosPanel raised hero>
            <JosItem className="text-xl">{briefing.salesIntelligence.headline}</JosItem>
            <ul className="mt-3 space-y-2">
              {briefing.salesIntelligence.reasons.map((reason) => (
                <li key={reason} className="jos-body text-sm">
                  — {reason}
                </li>
              ))}
            </ul>
            {briefing.salesIntelligence.href ? (
              <Link
                href={briefing.salesIntelligence.href}
                className="jos-btn jos-btn-primary mt-4 inline-flex"
              >
                Open target
              </Link>
            ) : null}
          </JosPanel>
        </section>
      </div>
    </div>
  );
}
