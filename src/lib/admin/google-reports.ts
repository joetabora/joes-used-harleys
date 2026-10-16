/**
 * Read-only GA4 Data API and Search Console reports.
 * Call only from the authenticated admin analytics loader.
 */

import { JWT } from "google-auth-library";
import {
  type Ga4Section,
  type Ga4Totals,
  type Ga4TrendPoint,
  type SearchConsolePage,
  type SearchConsoleQuery,
  type SearchConsoleSection,
  type SearchConsoleTotals,
} from "@/lib/admin/analytics-report";
import {
  readGoogleReportingConfig,
  type ServiceAccountCredentials,
} from "@/lib/admin/google-config";

const VIN_LIKE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

type FetchLike = typeof fetch;

export type GoogleReportDeps = {
  env: NodeJS.ProcessEnv;
  now: Date;
  fetchImpl?: FetchLike;
  getAccessToken?: (credentials: ServiceAccountCredentials) => Promise<string>;
};

export async function loadGoogleReporting(deps: GoogleReportDeps): Promise<{
  ga4: Ga4Section;
  searchConsole: SearchConsoleSection;
}> {
  const config = readGoogleReportingConfig(deps.env);
  const fetchImpl = deps.fetchImpl ?? fetch;
  const ranges = searchConsoleRanges(deps.now);

  const ga4Ready = config.propertyId !== null;
  const gscReady = config.siteUrl !== null;
  if (!ga4Ready && !gscReady) {
    return {
      ga4: { status: "not_configured", detail: config.propertyProblem ?? "Not configured." },
      searchConsole: { status: "not_configured", detail: config.siteProblem ?? "Not configured." },
    };
  }
  if (!config.credentials) {
    return {
      ga4: ga4Ready
        ? { status: config.credentialProblem?.startsWith("Not configured") ? "not_configured" : "failed", detail: config.credentialProblem ?? "Not configured." }
        : { status: "not_configured", detail: config.propertyProblem ?? "Not configured." },
      searchConsole: gscReady
        ? { status: config.credentialProblem?.startsWith("Not configured") ? "not_configured" : "failed", detail: config.credentialProblem ?? "Not configured." }
        : { status: "not_configured", detail: config.siteProblem ?? "Not configured." },
    };
  }

  let token: string;
  try {
    token = deps.getAccessToken
      ? await deps.getAccessToken(config.credentials)
      : await googleAccessToken(config.credentials);
  } catch {
    const failed = (): { status: "failed"; detail: string } => ({
      status: "failed",
      detail: "Google authentication failed.",
    });
    return {
      ga4: ga4Ready ? failed() : { status: "not_configured", detail: config.propertyProblem ?? "Not configured." },
      searchConsole: gscReady ? failed() : { status: "not_configured", detail: config.siteProblem ?? "Not configured." },
    };
  }

  const [ga4, searchConsole] = await Promise.all([
    ga4Ready ? loadGa4(config.propertyId!, token, fetchImpl) : Promise.resolve({ status: "not_configured" as const, detail: config.propertyProblem ?? "Not configured." }),
    gscReady
      ? loadSearchConsole(config.siteUrl!, token, fetchImpl, ranges)
      : Promise.resolve({ status: "not_configured" as const, detail: config.siteProblem ?? "Not configured." }),
  ]);
  return { ga4, searchConsole };
}

export async function googleAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
  const jwt = new JWT({
    email: credentials.clientEmail,
    key: credentials.privateKey,
    scopes: [GA_SCOPE, GSC_SCOPE],
  });
  const token = await jwt.getAccessToken();
  if (!token.token) throw new Error("missing token");
  return token.token;
}

export function searchConsoleRanges(now: Date): { start7: string; start28: string; end: string; period7: string; period28: string } {
  const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 3));
  const start7 = new Date(endDate);
  start7.setUTCDate(start7.getUTCDate() - 6);
  const start28 = new Date(endDate);
  start28.setUTCDate(start28.getUTCDate() - 27);
  const end = isoDate(endDate);
  const seven = isoDate(start7);
  const month = isoDate(start28);
  return {
    start7: seven,
    start28: month,
    end,
    period7: `${seven} to ${end}`,
    period28: `${month} to ${end}`,
  };
}

export function safeSearchQuery(raw: string): string | null {
  const query = raw.trim();
  if (!query || query.includes("@") || query.length > 120) return null;
  if (VIN_LIKE.test(query.replace(/\s/g, ""))) return null;
  return query;
}

export function safeLandingPage(raw: string): string | null {
  try {
    const url = new URL(raw);
    const path = url.pathname || "/";
    if (path.split("/").some((part) => VIN_LIKE.test(part))) return null;
    return path;
  } catch {
    return null;
  }
}

type GaMetricRow = { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] };
type GaReport = {
  metricHeaders?: { name?: string }[];
  rows?: GaMetricRow[];
  error?: unknown;
};

async function loadGa4(propertyId: string, token: string, fetchImpl: FetchLike): Promise<Ga4Section> {
  const response = await postJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
    token,
    {
      requests: [
        gaRequest("7daysAgo", "today", false),
        gaRequest("28daysAgo", "today", false),
        gaRequest("28daysAgo", "today", true),
      ],
    },
    fetchImpl,
  );
  if (!response.ok) return { status: "failed", detail: httpFailure(response.status) };
  const reports = Array.isArray(response.json.reports) ? response.json.reports : null;
  if (!reports || reports.length < 3) return { status: "failed", detail: "Google Analytics returned an unexpected report." };
  const last7 = totalsFrom(reports[0]);
  const last28 = totalsFrom(reports[1]);
  const trend = trendFrom(reports[2]);
  if (!last7 || !last28 || !trend) return { status: "failed", detail: "Google Analytics returned an unexpected report." };
  return {
    status: "ready",
    detail: "Sessions, users, and page views for the last 7 and 28 days, including today. Today can still be incomplete.",
    period7: "7daysAgo through today",
    period28: "28daysAgo through today",
    last7,
    last28,
    trend,
  };
}

function gaRequest(startDate: string, endDate: string, byDate: boolean) {
  return {
    dateRanges: [{ startDate, endDate }],
    metrics: byDate
      ? [{ name: "sessions" }, { name: "screenPageViews" }]
      : [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
    ...(byDate
      ? {
          dimensions: [{ name: "date" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
          limit: 31,
        }
      : {}),
  };
}

function totalsFrom(report: GaReport | undefined): Ga4Totals | null {
  if (!report || report.error) return null;
  const headers = headerNames(report).filter(Boolean);
  if (headers.length === 0) {
    return (report.rows ?? []).length === 0 ? { sessions: 0, users: 0, pageViews: 0 } : null;
  }
  if (!headers.includes("sessions") || !headers.includes("totalUsers") || !headers.includes("screenPageViews")) {
    return null;
  }
  const row = report.rows?.[0];
  return {
    sessions: metricValue(row, headers, "sessions"),
    users: metricValue(row, headers, "totalUsers"),
    pageViews: metricValue(row, headers, "screenPageViews"),
  };
}

function trendFrom(report: GaReport | undefined): Ga4TrendPoint[] | null {
  if (!report || report.error) return null;
  const headers = headerNames(report).filter(Boolean);
  if (headers.length === 0) return (report.rows ?? []).length === 0 ? [] : null;
  if (!headers.includes("sessions") || !headers.includes("screenPageViews")) return null;
  return (report.rows ?? []).map((row) => ({
    date: formatGaDate(row.dimensionValues?.[0]?.value ?? ""),
    sessions: metricValue(row, headers, "sessions"),
    pageViews: metricValue(row, headers, "screenPageViews"),
  }));
}

function headerNames(report: GaReport): string[] {
  return (report.metricHeaders ?? []).map((header) => header.name ?? "");
}

function metricValue(row: GaMetricRow | undefined, headers: string[], name: string): number {
  const index = headers.indexOf(name);
  const raw = row?.metricValues?.[index]?.value;
  const value = Number(raw ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function formatGaDate(value: string): string {
  if (/^\d{8}$/.test(value)) return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  return value;
}

type GscRow = { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number };
type GscRanges = ReturnType<typeof searchConsoleRanges>;

async function loadSearchConsole(
  siteUrl: string,
  token: string,
  fetchImpl: FetchLike,
  ranges: GscRanges,
): Promise<SearchConsoleSection> {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const [week, month, queries, pages] = await Promise.all([
    postJson(endpoint, token, { startDate: ranges.start7, endDate: ranges.end }, fetchImpl),
    postJson(endpoint, token, { startDate: ranges.start28, endDate: ranges.end }, fetchImpl),
    postJson(endpoint, token, { startDate: ranges.start28, endDate: ranges.end, dimensions: ["query"], rowLimit: 10 }, fetchImpl),
    postJson(endpoint, token, { startDate: ranges.start28, endDate: ranges.end, dimensions: ["page"], rowLimit: 10 }, fetchImpl),
  ]);
  const firstFailure = [week, month, queries, pages].find((item) => !item.ok);
  if (firstFailure && !firstFailure.ok) return { status: "failed", detail: httpFailure(firstFailure.status) };
  if (!week.ok || !month.ok || !queries.ok || !pages.ok) {
    return { status: "failed", detail: "Search Console returned an unexpected report." };
  }
  const last7 = gscTotals(week.json.rows);
  const last28 = gscTotals(month.json.rows);
  if (!last7 || !last28) return { status: "failed", detail: "Search Console returned an unexpected report." };
  return {
    status: "ready",
    detail: `Clicks, impressions, CTR, and average position. Search Console usually lags 2–3 days, so this period ends on ${ranges.end}.`,
    period7: ranges.period7,
    period28: ranges.period28,
    last7,
    last28,
    queries: gscQueries(queries.json.rows),
    pages: gscPages(pages.json.rows),
  };
}

function gscTotals(rows: unknown): SearchConsoleTotals | null {
  if (rows === undefined) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  if (!Array.isArray(rows)) return null;
  const row = rows[0] as GscRow | undefined;
  if (!row) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return totalsOf(row);
}

function gscQueries(rows: unknown): SearchConsoleQuery[] {
  if (!Array.isArray(rows)) return [];
  const queries: SearchConsoleQuery[] = [];
  for (const row of rows as GscRow[]) {
    const term = safeSearchQuery(row.keys?.[0] ?? "");
    const totals = totalsOf(row);
    if (!term || !totals) continue;
    queries.push({ term, ...totals });
  }
  return queries;
}

function gscPages(rows: unknown): SearchConsolePage[] {
  if (!Array.isArray(rows)) return [];
  const pages: SearchConsolePage[] = [];
  for (const row of rows as GscRow[]) {
    const page = safeLandingPage(row.keys?.[0] ?? "");
    const totals = totalsOf(row);
    if (!page || !totals) continue;
    pages.push({ page, ...totals });
  }
  return pages;
}

function totalsOf(row: GscRow): SearchConsoleTotals | null {
  const clicks = finite(row.clicks);
  const impressions = finite(row.impressions);
  const ctr = finite(row.ctr);
  const position = finite(row.position);
  if (clicks === null || impressions === null || ctr === null || position === null) return null;
  return { clicks, impressions, ctr, position };
}

function finite(value: unknown): number | null {
  if (value === undefined) return 0;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

type PostResult =
  | { ok: true; json: { reports?: GaReport[]; rows?: unknown } }
  | { ok: false; status: number };

async function postJson(url: string, token: string, body: unknown, fetchImpl: FetchLike): Promise<PostResult> {
  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, status: response.status };
    const json = (await response.json()) as { reports?: GaReport[]; rows?: unknown };
    return { ok: true, json };
  } catch {
    return { ok: false, status: 0 };
  }
}

function httpFailure(status: number): string {
  if (status === 401 || status === 403) return "Google denied access for this account.";
  if (status === 404) return "Google could not find this property.";
  if (status === 429) return "Google quota was exceeded.";
  return "Google request failed.";
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
