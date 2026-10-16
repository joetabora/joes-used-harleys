import type {
  AnalyticsReport,
  DataStatus,
  Ga4Section,
  Ga4Totals,
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
      <MetricBlock label={`Last 7 days · ${section.period7}`} totals={section.last7} />
      <MetricBlock label={`Last 28 days · ${section.period28}`} totals={section.last28} />
      {section.trend.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {section.trend.map((point) => (
            <li key={point.date}>
              <JosData>
                {point.date} · {point.sessions} sessions · {point.pageViews} page views
              </JosData>
            </li>
          ))}
        </ul>
      ) : (
        <JosData className="mt-3">No daily rows in this period.</JosData>
      )}
    </JosPanel>
  );
}

function MetricBlock({ label, totals }: { label: string; totals: Ga4Totals }) {
  return (
    <div className="mt-3">
      <JosData>{label}</JosData>
      <JosData className="mt-1">
        {totals.sessions} sessions · {totals.users} users · {totals.pageViews} page views
      </JosData>
    </div>
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
      <SearchBlock label={`Last 7 days · ${section.period7}`} totals={section.last7} />
      <SearchBlock label={`Last 28 days · ${section.period28}`} totals={section.last28} />
      <JosData className="mt-3">Top queries · {section.period28}</JosData>
      {section.queries.length === 0 ? (
        <JosData>No queries in this period.</JosData>
      ) : (
        <ul className="mt-1 space-y-1">
          {section.queries.map((row) => (
            <li key={row.term}>
              <JosData>
                {row.term} · {row.clicks} clicks · {row.impressions} impressions · {formatCtr(row.ctr)} · pos{" "}
                {formatPosition(row.position)}
              </JosData>
            </li>
          ))}
        </ul>
      )}
      <JosData className="mt-3">Landing pages · {section.period28}</JosData>
      {section.pages.length === 0 ? (
        <JosData>No landing pages in this period.</JosData>
      ) : (
        <ul className="mt-1 space-y-1">
          {section.pages.map((row) => (
            <li key={row.page}>
              <JosData>
                {row.page} · {row.clicks} clicks · {row.impressions} impressions · {formatCtr(row.ctr)} · pos{" "}
                {formatPosition(row.position)}
              </JosData>
            </li>
          ))}
        </ul>
      )}
    </JosPanel>
  );
}

function SearchBlock({ label, totals }: { label: string; totals: SearchConsoleTotals }) {
  return (
    <div className="mt-3">
      <JosData>{label}</JosData>
      <JosData className="mt-1">
        {totals.clicks} clicks · {totals.impressions} impressions · {formatCtr(totals.ctr)} · position{" "}
        {formatPosition(totals.position)}
      </JosData>
    </div>
  );
}

function formatCtr(ctr: number): string {
  return `${(ctr * 100).toFixed(1)}% CTR`;
}

function formatPosition(position: number): string {
  return position.toFixed(1);
}
