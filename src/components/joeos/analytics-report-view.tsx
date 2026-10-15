import type { AnalyticsReport, DataStatus } from "@/lib/admin/analytics-report";
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
        <EmptyState label="Google Analytics">
          {report.ga4.detail}
        </EmptyState>
        <EmptyState label="Search Console">
          {report.searchConsole.detail}
        </EmptyState>
      </div>
    </div>
  );
}
