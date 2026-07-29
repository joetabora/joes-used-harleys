import Link from "next/link";
import type { HotAction, MorningBriefing, Severity } from "@/lib/joeos/briefing";
import { severityLabel } from "@/lib/joeos/briefing";

function pillClass(severity: Severity) {
  if (severity === "hot") return "jos-pill jos-pill-hot";
  if (severity === "watch") return "jos-pill jos-pill-watch";
  return "jos-pill jos-pill-ok";
}

function glyph(action: HotAction) {
  if (action.kind === "bike") return "⚙";
  if (action.kind === "lead") return "◉";
  return "⚡";
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CommandCenter({
  briefing,
  dbReady,
}: {
  briefing: MorningBriefing;
  dbReady: boolean;
}) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="jos-brand text-sm">Joe OS Command Center</p>
        <p className="jos-data">{briefing.dateLabel}</p>
        <h1 className="jos-heading text-3xl md:text-4xl">
          {briefing.greeting} {briefing.displayName}
        </h1>
        <p className="jos-body max-w-2xl">
          What should you do today to sell more motorcycles — from live floor stock and pipeline
          only.
        </p>
      </header>

      {!dbReady ? (
        <div className="jos-panel p-4">
          <p className="jos-label text-[var(--jos-warn)]">Database offline</p>
          <p className="jos-body mt-2">Connect DATABASE_URL to arm the command center.</p>
        </div>
      ) : null}

      <section className="space-y-3">
        <h2 className="jos-section">Today&apos;s Mission</h2>
        {briefing.missions.length === 0 ? (
          <div className="jos-panel-raised p-4">
            <p className="jos-heading text-lg">Mission clear</p>
            <p className="jos-body mt-2">
              No aging inventory or stale leads. {briefing.liveBikeCount} live machine
              {briefing.liveBikeCount === 1 ? "" : "s"} on the floor.
            </p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-3">
            {briefing.missions.map((m) => (
              <div key={m.label} className="jos-kpi-gauge">
                <p className="jos-label">{m.label}</p>
                <p className="jos-kpi text-3xl md:text-4xl">
                  {m.label.toLowerCase().includes("potential") ||
                  m.label.toLowerCase().includes("pipeline")
                    ? formatMoney(m.count)
                    : m.count}
                </p>
                <p className="jos-data">{m.detail}</p>
              </div>
            ))}
          </div>
        )}
        {briefing.syncStatus === "failed" ? (
          <p className="jos-pill jos-pill-aging">Feed sync failed — check FEED</p>
        ) : null}
      </section>

      <hr className="jos-rule" />

      <section className="space-y-3">
        <h2 className="jos-section">Hot Queue</h2>
        {briefing.hotActions.length === 0 ? (
          <div className="jos-panel p-4">
            <p className="jos-body">Queue clear — no hot actions.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {briefing.hotActions.map((action) => (
              <li key={`${action.kind}-${action.id}`}>
                <Link href={action.href} className="jos-queue-row">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                      <p className="jos-heading text-base">
                        <span className="mr-2 text-[var(--jos-orange)]" aria-hidden>
                          {glyph(action)}
                        </span>
                        {action.title}
                      </p>
                      <p className="jos-body text-sm">{action.detail}</p>
                    </div>
                    <span className={pillClass(action.severity)}>
                      {severityLabel(action.severity)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="jos-rule" />

      <section className="space-y-3">
        <h2 className="jos-section">Inventory Radar</h2>
        {briefing.radar.length === 0 ? (
          <div className="jos-panel p-4">
            <p className="jos-body">No live inventory to chart.</p>
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {briefing.radar.map((bucket) => (
              <li key={bucket.family} className="jos-panel p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="jos-heading text-sm">{bucket.family}</span>
                  <span className={pillClass(bucket.severity)}>
                    {severityLabel(bucket.severity)}
                  </span>
                </div>
                <div className="jos-gauge-track">
                  <div
                    className="jos-gauge-fill"
                    data-severity={bucket.severity}
                    style={{
                      width: `${Math.max(bucket.fillPercent, bucket.total ? 4 : 0)}%`,
                    }}
                  />
                </div>
                <p className="jos-data mt-2">
                  {bucket.aging}/{bucket.total} aging · {bucket.fillPercent}%
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="jos-rule" />

      <section className="space-y-3">
        <h2 className="jos-section">Sales Intelligence</h2>
        <div className="jos-panel-raised p-5 space-y-3">
          <p className="jos-heading text-xl">{briefing.salesIntelligence.headline}</p>
          <ul className="space-y-2">
            {briefing.salesIntelligence.reasons.map((reason) => (
              <li key={reason} className="jos-body text-sm">
                — {reason}
              </li>
            ))}
          </ul>
          {briefing.salesIntelligence.href ? (
            <Link href={briefing.salesIntelligence.href} className="jos-btn jos-btn-primary">
              Open target
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
