/**
 * Read-only admin analytics view model.
 * Callers must not pass names, emails, phones, notes, VINs, search text, or session ids.
 */

const VIN_LIKE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const DAY_MS = 24 * 60 * 60 * 1000;

export const ANALYTICS_WINDOW_DAYS = 28;
export const ANALYTICS_RECENT_DAYS = 7;

export type DataStatus = "ready" | "empty" | "unavailable" | "failed";

export type QueryResult<T> = { ok: true; value: T } | { ok: false; reason: "unavailable" | "failed" };

export type LeadRow = { createdAt: string; source: string | null };

export type EventCount = { type: string; count: number };

export type BikeActivityRow = {
  id: string;
  year: number;
  make: string;
  model: string;
  stockNumber: string | null;
  views: number;
  contactClicks: number;
};

export type AnalyticsReportInput = {
  now: string;
  leads: QueryResult<LeadRow[]>;
  contactClicks: QueryResult<number>;
  events: QueryResult<EventCount[]>;
  bikes: QueryResult<BikeActivityRow[]>;
};

export type CountSection<T> = {
  status: DataStatus;
  total: number;
  rows: T;
};

export type AnalyticsReport = {
  windowDays: number;
  recentDays: number;
  leads: CountSection<{ day: string; count: number }[]> & {
    recentTotal: number;
    bySource: { path: string; count: number }[];
  };
  contactInteractions: {
    status: DataStatus;
    total: number;
    label: "Contact interactions";
    description: string;
  };
  events: CountSection<{ type: string; label: string; count: number }[]>;
  bikes: CountSection<
    {
      id: string;
      label: string;
      stockNumber: string | null;
      views: number;
      contactInteractions: number;
    }[]
  >;
  ga4: { status: "not_integrated"; detail: string };
  searchConsole: { status: "not_integrated"; detail: string };
};

const CONTACT_DESCRIPTION =
  "JoeOS records a contact interaction when someone focuses the inquiry form or submits it. That includes failed submits. Saved inquiries are counted separately from Lead records.";

const EVENT_LABELS: Record<string, string> = {
  PAGE_VIEW: "Page views",
  BIKE_DETAIL_VIEW: "Motorcycle page views",
  INVENTORY_IMPRESSION: "Inventory impressions",
  SEARCH_QUERY: "Searches",
  FILTER_USAGE: "Filter uses",
  TIME_ON_PAGE: "Time on page samples",
  FINANCING_OPEN: "Financing opens",
  FAVORITE: "Favorites",
  SHARE_CLICK: "Shares",
  APPOINTMENT_REQUEST: "Appointment requests",
};

function sectionStatus<T>(result: QueryResult<T>, empty: boolean): DataStatus {
  if (!result.ok) return result.reason;
  return empty ? "empty" : "ready";
}

/** Keep path-like lead sources. Drop query strings, addresses, and VIN segments. */
export function safeReportPath(source: string | null | undefined): string {
  const raw = (source ?? "").trim();
  if (!raw.startsWith("/")) return "Unspecified";
  const path = raw.split("?")[0]?.split("#")[0] ?? "";
  if (!path.startsWith("/") || path.includes("@") || path.length > 160) return "Unspecified";
  if (path.split("/").some((part) => VIN_LIKE.test(part))) return "Unspecified";
  return path;
}

function dayKey(iso: string): string | null {
  const day = iso.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null;
}

function withinDays(iso: string, nowIso: string, days: number): boolean {
  const at = Date.parse(iso);
  const now = Date.parse(nowIso);
  if (!Number.isFinite(at) || !Number.isFinite(now)) return false;
  return now - at <= days * DAY_MS && now - at >= 0;
}

export function buildAnalyticsReport(input: AnalyticsReportInput): AnalyticsReport {
  const leadRows = input.leads.ok ? input.leads.value : [];
  const dayCounts = new Map<string, number>();
  const sourceCounts = new Map<string, number>();
  let recentTotal = 0;

  if (input.leads.ok) {
    for (const row of leadRows) {
      if (!withinDays(row.createdAt, input.now, ANALYTICS_WINDOW_DAYS)) continue;
      const day = dayKey(row.createdAt);
      if (day) dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
      const path = safeReportPath(row.source);
      sourceCounts.set(path, (sourceCounts.get(path) ?? 0) + 1);
      if (withinDays(row.createdAt, input.now, ANALYTICS_RECENT_DAYS)) recentTotal += 1;
    }
  }

  const byDay = [...dayCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({ day, count }));
  const bySource = [...sourceCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([path, count]) => ({ path, count }));
  const leadTotal = byDay.reduce((sum, row) => sum + row.count, 0);

  const eventRows = (input.events.ok ? input.events.value : [])
    .filter((row) => row.type !== "CONTACT_CLICK" && row.count > 0)
    .map((row) => ({
      type: row.type,
      label: EVENT_LABELS[row.type] ?? row.type,
      count: row.count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const bikeRows = (input.bikes.ok ? input.bikes.value : [])
    .filter((row) => row.views > 0 || row.contactClicks > 0)
    .slice(0, 8)
    .map((row) => ({
      id: row.id,
      label: `${row.year} ${row.make} ${row.model}`.replace(/\s+/g, " ").trim(),
      stockNumber: row.stockNumber,
      views: row.views,
      contactInteractions: row.contactClicks,
    }));

  const contactTotal = input.contactClicks.ok ? input.contactClicks.value : 0;

  return {
    windowDays: ANALYTICS_WINDOW_DAYS,
    recentDays: ANALYTICS_RECENT_DAYS,
    leads: {
      status: sectionStatus(input.leads, leadTotal === 0),
      total: input.leads.ok ? leadTotal : 0,
      recentTotal: input.leads.ok ? recentTotal : 0,
      rows: byDay,
      bySource,
    },
    contactInteractions: {
      status: sectionStatus(input.contactClicks, contactTotal === 0),
      total: input.contactClicks.ok ? contactTotal : 0,
      label: "Contact interactions",
      description: CONTACT_DESCRIPTION,
    },
    events: {
      status: sectionStatus(input.events, eventRows.length === 0),
      total: eventRows.reduce((sum, row) => sum + row.count, 0),
      rows: eventRows,
    },
    bikes: {
      status: sectionStatus(input.bikes, bikeRows.length === 0),
      total: bikeRows.length,
      rows: bikeRows,
    },
    ga4: {
      status: "not_integrated",
      detail: "Google Analytics is not read by this dashboard. No GA4 traffic is shown here.",
    },
    searchConsole: {
      status: "not_integrated",
      detail: "Search Console is not read by this dashboard. No search performance is shown here.",
    },
  };
}
