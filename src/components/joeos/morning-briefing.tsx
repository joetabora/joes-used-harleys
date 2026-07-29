import Link from "next/link";
import type { HotAction, MorningBriefing, Severity } from "@/lib/joeos/briefing";

function severityPill(severity: Severity) {
  if (severity === "hot") return "joeos-pill joeos-pill-hot";
  if (severity === "watch") return "joeos-pill joeos-pill-watch";
  return "joeos-pill joeos-pill-ok";
}

function severityLabel(severity: Severity) {
  if (severity === "hot") return "HOT";
  if (severity === "watch") return "WATCH";
  return "OK";
}

function actionGlyph(action: HotAction) {
  if (action.kind === "bike") return "⚠";
  if (action.kind === "lead") return "●";
  return "⚡";
}

export function MorningBriefingView({
  briefing,
  dbReady,
}: {
  briefing: MorningBriefing;
  dbReady: boolean;
}) {
  return (
    <div className="joeos-fade-in space-y-8">
      <header className="space-y-3">
        <p className="joeos-label">Joe OS · Morning Briefing</p>
        <p className="joeos-data">{briefing.dateLabel}</p>
        <h1 className="joeos-heading text-3xl md:text-4xl">
          {briefing.greeting} {briefing.displayName}
        </h1>
        <p className="joeos-body max-w-2xl">
          Your mission checklist for selling more motorcycles today — grounded in live
          inventory and leads only.
        </p>
      </header>

      {!dbReady ? (
        <div className="joeos-panel p-4">
          <p className="joeos-label text-[var(--joeos-warn)]">Database offline</p>
          <p className="joeos-body mt-2">
            Connect DATABASE_URL to load briefing data from Supabase.
          </p>
        </div>
      ) : null}

      <section className="space-y-3">
        <h2 className="joeos-label text-[var(--joeos-orange)]">Your mission today</h2>
        {briefing.missions.length === 0 ? (
          <div className="joeos-panel p-4">
            <p className="joeos-heading text-lg">Engine clear</p>
            <p className="joeos-body mt-2">
              No aging inventory or stale leads. {briefing.liveBikeCount} live bike
              {briefing.liveBikeCount === 1 ? "" : "s"} on the floor.
            </p>
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {briefing.missions.map((mission) => (
              <li key={mission.label} className="joeos-panel-raised p-4">
                <p className="joeos-label">{mission.label}</p>
                <p className="joeos-body mt-2 text-sm">{mission.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="joeos-rule" />

      <section className="space-y-3">
        <h2 className="joeos-label text-[var(--joeos-orange)]">Sales engine status</h2>
        <div className="joeos-kpi-block">
          <p className="joeos-label">Potential revenue · aging inventory</p>
          <p className="joeos-kpi mt-3 text-4xl md:text-5xl text-[var(--joeos-bone)]">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(briefing.potentialRevenue)}
          </p>
          <p className="joeos-data mt-3">
            {briefing.agingBikeCount} bike{briefing.agingBikeCount === 1 ? "" : "s"} past
            watch threshold · {briefing.liveBikeCount} live total
            {briefing.syncStatus === "failed" ? " · SYNC FAILED" : ""}
          </p>
        </div>
      </section>

      <hr className="joeos-rule" />

      <section className="space-y-3">
        <h2 className="joeos-label text-[var(--joeos-orange)]">Hot actions</h2>
        {briefing.hotActions.length === 0 ? (
          <div className="joeos-panel p-4">
            <p className="joeos-body">No hot actions — queue is clear.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {briefing.hotActions.map((action) => (
              <li key={`${action.kind}-${action.id}`}>
                <Link href={action.href} className="joeos-action-row">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                      <p className="joeos-heading text-base">
                        <span className="mr-2 text-[var(--joeos-orange)]" aria-hidden>
                          {actionGlyph(action)}
                        </span>
                        {action.title}
                      </p>
                      <p className="joeos-body text-sm">{action.detail}</p>
                    </div>
                    <span className={severityPill(action.severity)}>
                      {severityLabel(action.severity)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="joeos-rule" />

      <section className="space-y-3">
        <h2 className="joeos-label text-[var(--joeos-orange)]">Inventory radar</h2>
        {briefing.radar.length === 0 ? (
          <div className="joeos-panel p-4">
            <p className="joeos-body">No live inventory to chart.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {briefing.radar.map((bucket) => (
              <li key={bucket.family} className="joeos-panel p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="joeos-heading text-sm">[{bucket.family}]</span>
                  <span className={severityPill(bucket.severity)}>
                    {bucket.severity === "ok"
                      ? "CLEAR"
                      : bucket.severity === "watch"
                        ? "WATCH"
                        : "HOT"}
                  </span>
                </div>
                <div className="joeos-gauge-track">
                  <div
                    className="joeos-gauge-fill"
                    data-severity={bucket.severity}
                    style={{ width: `${Math.max(bucket.fillPercent, bucket.total ? 4 : 0)}%` }}
                  />
                </div>
                <p className="joeos-data mt-2">
                  {bucket.aging}/{bucket.total} aging · {bucket.fillPercent}%
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="joeos-rule" />

      <section className="space-y-3">
        <h2 className="joeos-label text-[var(--joeos-orange)]">Command brief</h2>
        <div className="joeos-panel-raised p-5">
          <p className="joeos-body text-lg text-[var(--joeos-bone)]">
            “{briefing.commandBrief}”
          </p>
          {briefing.priorityBike ? (
            <p className="mt-4">
              <Link href={briefing.priorityBike.href} className="joeos-btn joeos-btn-primary">
                Open priority bike
              </Link>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
