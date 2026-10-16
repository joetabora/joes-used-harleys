import type {
  AnalyticsReport,
  DataStatus,
  Ga4Section,
  SearchConsoleSection,
  SearchConsoleTotals,
} from "@/lib/admin/analytics-report";
import { EmptyState, JosData, JosKpi, JosLabel, JosPanel, JosSectionHeader } from "@/components/joeos/ui";

function statusCopy(status: DataStatus, empty: string, failed: string): string | null {
  if (status === "empty") return empty;
  if (status === "unavailable") return "Database is not connected, so this count is unavailable.";
  if (status === "failed") return failed;
  return null;
}

function StatusNote({ status, empty, failed }: { status: DataStatus; empty: string; failed: string }) {
  const copy = statusCopy(status, empty, failed);
  if (!copy) return null;
  return <JosData className="mt-2">{copy}</JosData>;
}

export function AnalyticsReportView({ report }: { report: AnalyticsReport }) {
  return (
    <div className="jos-stack-section">
      <JosSectionHeader section="Analytics" title="Site activity" />
      <JosData className="-mt-2 max-w-2xl">
        Saved inquiries and on-site activity for the last {report.windowDays} days. This page only
        reads existing records.
      </JosData>

      <div className="grid gap-4 lg:grid-cols-2">
        <JosPanel>
          <JosLabel>Saved inquiries</JosLabel>
          <JosKpi className="text-3xl">
            {report.leads.status === "ready" || report.leads.status === "empty" ? report.leads.total : "—"}
          </JosKpi>
          {report.leads.status === "ready" || report.leads.status === "empty" ? (
            <JosData className="mt-1">
              {report.leads.recentTotal} in the last {report.recentDays} days
            </JosData>
          ) : null}
          <StatusNote
            status={report.leads.status}
            empty="No saved inquiries in this window."
            failed="Saved inquiries could not be loaded."
          />
          {report.leads.status === "ready" ? (
            <ul className="mt-3 space-y-1">
              {report.leads.bySource.map((row) => (
                <li key={row.path} className="jos-data">
                  {row.path}: {row.count}
                </li>
              ))}
            </ul>
          ) : null}
        </JosPanel>

        <JosPanel>
          <JosLabel>{report.contactInteractions.label}</JosLabel>
          <JosKpi className="text-3xl">
            {report.contactInteractions.status === "ready" || report.contactInteractions.status === "empty"
              ? report.contactInteractions.total
              : "—"}
          </JosKpi>
          <JosData className="mt-2">{report.contactInteractions.description}</JosData>
          <StatusNote
            status={report.contactInteractions.status}
            empty="No contact interactions in this window."
            failed="Contact interactions could not be loaded."
          />
        </JosPanel>
      </div>

      <JosPanel>
        <p className="jos-section mb-2">On-site events</p>
        <StatusNote
          status={report.events.status}
          empty="No on-site events in this window."
          failed="On-site events could not be loaded."
        />
        {report.events.status === "ready" ? (
          <ul className="space-y-1">
            {report.events.rows.map((row) => (
              <li key={row.type} className="jos-data">
                {row.label}: {row.count}
              </li>
            ))}
          </ul>
        ) : null}
      </JosPanel>

      <JosPanel>
        <p className="jos-section mb-2">Bikes with recorded activity</p>
        <JosData className="mb-2">All-time view and contact-interaction rollups. Not confirmed leads.</JosData>
        <StatusNote
          status={report.bikes.status}
          empty="No bikes have recorded views or contact interactions yet."
          failed="Bike activity could not be loaded."
        />
        {report.bikes.status === "ready" ? (
          <ul className="space-y-2">
            {report.bikes.rows.map((row) => (
              <li key={row.id} className="jos-data">
                {row.label}
                {row.stockNumber ? ` · Stock ${row.stockNumber}` : ""} · {row.views} views ·{" "}
                {row.contactInteractions} contact interactions
              </li>
            ))}
          </ul>
        ) : null}
      </JosPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Ga4Panel section={report.ga4} />
        <SearchConsolePanel section={report.searchConsole} />
      </div>
    </div>
  );
}

function Ga4Panel({ section }: { section: Ga4Section }) {
  if (section.status !== "ready") {
    return (
      <EmptyState label="Google Analytics" warn={section.status === "failed"}>
        {section.detail}
      </EmptyState>
    );
  }
  return (
    <JosPanel>
      <JosLabel>Google Analytics</JosLabel>
      <JosData className="mt-1">{section.detail}</JosData>
      <PeriodHeading title="Last 7 days" period={section.period7} />
      <StatGrid
        stats={[
          { label: "Sessions", value: String(section.last7.sessions) },
          { label: "Users", value: String(section.last7.users) },
          { label: "Page views", value: String(section.last7.pageViews) },
        ]}
      />
      <PeriodHeading title="Last 28 days" period={section.period28} />
      <StatGrid
        stats={[
          { label: "Sessions", value: String(section.last28.sessions) },
          { label: "Users", value: String(section.last28.users) },
          { label: "Page views", value: String(section.last28.pageViews) },
        ]}
      />
      {section.trend.length > 0 ? (
        <div className="mt-4">
          <p className="jos-section mb-2">Daily</p>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4">
            <JosLabel>Day</JosLabel>
            <JosLabel className="text-right">Sessions</JosLabel>
            <JosLabel className="text-right">Page views</JosLabel>
            {section.trend.map((point) => (
              <TrendRow key={point.date} date={point.date} sessions={point.sessions} pageViews={point.pageViews} />
            ))}
          </div>
        </div>
      ) : (
        <JosData className="mt-3">No daily rows in this period.</JosData>
      )}
    </JosPanel>
  );
}

function TrendRow({ date, sessions, pageViews }: { date: string; sessions: number; pageViews: number }) {
  return (
    <>
      <JosData className="mt-1">{date}</JosData>
      <JosData className="mt-1 text-right">{sessions}</JosData>
      <JosData className="mt-1 text-right">{pageViews}</JosData>
    </>
  );
}

function SearchConsolePanel({ section }: { section: SearchConsoleSection }) {
  if (section.status !== "ready") {
    return (
      <EmptyState label="Search Console" warn={section.status === "failed"}>
        {section.detail}
      </EmptyState>
    );
  }
  return (
    <JosPanel>
      <JosLabel>Search Console</JosLabel>
      <JosData className="mt-1">{section.detail}</JosData>
      <PeriodHeading title="Last 7 days" period={section.period7} />
      <SearchStats totals={section.last7} />
      <PeriodHeading title="Last 28 days" period={section.period28} />
      <SearchStats totals={section.last28} />
      <p className="jos-section mb-2 mt-4">Top queries</p>
      <JosData className="mb-2">{section.period28}</JosData>
      {section.queries.length === 0 ? (
        <JosData>No queries in this period.</JosData>
      ) : (
        <ul className="space-y-3">
          {section.queries.map((row) => (
            <li key={row.term}>
              <p className="jos-item">{row.term}</p>
              <SearchStats totals={row} compact />
            </li>
          ))}
        </ul>
      )}
      <p className="jos-section mb-2 mt-4">Landing pages</p>
      <JosData className="mb-2">{section.period28}</JosData>
      {section.pages.length === 0 ? (
        <JosData>No landing pages in this period.</JosData>
      ) : (
        <ul className="space-y-3">
          {section.pages.map((row) => (
            <li key={row.page}>
              <p className="jos-item">{row.page}</p>
              <SearchStats totals={row} compact />
            </li>
          ))}
        </ul>
      )}
    </JosPanel>
  );
}

function PeriodHeading({ title, period }: { title: string; period: string }) {
  return (
    <div className="mt-4">
      <p className="jos-section">{title}</p>
      <JosData className="mt-1">{period}</JosData>
    </div>
  );
}

function StatGrid({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className={`mt-2 grid gap-3 ${stats.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <JosLabel>{stat.label}</JosLabel>
          <JosKpi className="mt-1 text-2xl">{stat.value}</JosKpi>
        </div>
      ))}
    </div>
  );
}

function SearchStats({ totals, compact = false }: { totals: SearchConsoleTotals; compact?: boolean }) {
  const stats = [
    { label: "Clicks", value: String(totals.clicks) },
    { label: "Impressions", value: String(totals.impressions) },
    { label: "CTR", value: formatCtr(totals.ctr) },
    { label: "Position", value: formatPosition(totals.position) },
  ];
  if (compact) {
    return (
      <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <JosLabel>{stat.label}</JosLabel>
            <JosData className="mt-0.5 text-[var(--jos-bone)]">{stat.value}</JosData>
          </div>
        ))}
      </div>
    );
  }
  return <StatGrid stats={stats} />;
}

function formatCtr(ctr: number): string {
  return `${(ctr * 100).toFixed(1)}%`;
}

function formatPosition(position: number): string {
  return position.toFixed(1);
}
