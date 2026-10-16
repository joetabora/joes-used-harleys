import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SEARCH_CONSOLE_IMPRESSION_ROW_LIMIT,
  loadGoogleReporting,
  reportLandingPage,
  safeLandingPage,
  safeSearchQuery,
  searchConsoleRanges,
} from "../src/lib/admin/google-reports";

const VIN = "1HD1BWV1XRB123456";
const credentials = JSON.stringify({
  type: "service_account",
  client_email: "reports@test-project.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----\n",
});

function env(overrides: Record<string, string> = {}): NodeJS.ProcessEnv {
  return {
    GA4_PROPERTY_ID: "123456789",
    SEARCH_CONSOLE_SITE_URL: "sc-domain:joesusedharleys.com",
    GOOGLE_SERVICE_ACCOUNT_JSON: credentials,
    ...overrides,
  } as unknown as NodeJS.ProcessEnv;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const gaReport = {
  reports: [
    {
      metricHeaders: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
      rows: [{ metricValues: [{ value: "4" }, { value: "3" }, { value: "9" }] }],
    },
    {
      metricHeaders: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
      rows: [{ metricValues: [{ value: "0" }, { value: "0" }, { value: "0" }] }],
    },
    {
      metricHeaders: [{ name: "sessions" }, { name: "screenPageViews" }],
      rows: [{ dimensionValues: [{ value: "20261012" }], metricValues: [{ value: "4" }, { value: "9" }] }],
    },
  ],
};

const gscTotals = { rows: [{ clicks: 6, impressions: 60, ctr: 0.1, position: 4.5 }] };
const gscQueries = {
  rows: [
    { keys: ["used harley milwaukee"], clicks: 2, impressions: 20, ctr: 0.1, position: 3 },
    { keys: ["buyer@example.com"], clicks: 1, impressions: 1, ctr: 1, position: 1 },
    { keys: [VIN], clicks: 1, impressions: 1, ctr: 1, position: 1 },
  ],
};
const gscPages = {
  rows: [
    { keys: ["https://joesusedharleys.com/"], clicks: 0, impressions: 208, ctr: 0, position: 23.3 },
    { keys: ["https://www.joesusedharleys.com/"], clicks: 0, impressions: 20, ctr: 0, position: 4.8 },
    {
      keys: ["https://joesusedharleys.com/inventory/street-glide?email=buyer@example.com"],
      clicks: 2,
      impressions: 10,
      ctr: 0.2,
      position: 2.5,
    },
    { keys: [`https://joesusedharleys.com/v/${VIN}`], clicks: 1, impressions: 1, ctr: 1, position: 1 },
  ],
};

const now = new Date("2026-10-15T18:00:00.000Z");

async function main() {
const missing = await loadGoogleReporting({
  env: {} as unknown as NodeJS.ProcessEnv,
  now,
  fetchImpl: async () => {
    throw new Error("should not call Google");
  },
});
assert.equal(missing.ga4.status, "not_configured");
assert.equal(missing.searchConsole.status, "not_configured");
assert.match(missing.ga4.detail, /Not configured/);
assert.equal("last7" in missing.ga4, false);

const bareSite = await loadGoogleReporting({
  env: env({ SEARCH_CONSOLE_SITE_URL: "joesusedharleys.com" }),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async (input) => {
    assert.equal(String(input).includes("searchAnalytics"), false);
    return jsonResponse(gaReport);
  },
});
assert.equal(bareSite.searchConsole.status, "not_configured");
assert.match(bareSite.searchConsole.detail, /exact property/);
assert.equal(bareSite.ga4.status, "ready");

const badJson = await loadGoogleReporting({
  env: env({ GOOGLE_SERVICE_ACCOUNT_JSON: "{not json" }),
  now,
  fetchImpl: async () => {
    throw new Error("should not call Google");
  },
});
assert.equal(badJson.ga4.status, "failed");
assert.equal(badJson.searchConsole.status, "failed");
assert.equal(badJson.ga4.detail.includes("PRIVATE"), false);
assert.equal("last7" in badJson.ga4, false);

function channelReport(dimension: string, rows: string[][]) {
  return {
    dimensionHeaders: [{ name: dimension }],
    metricHeaders: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
    rows: rows.map((row) => ({
      dimensionValues: [{ value: row[0] }],
      metricValues: [{ value: row[1] }, { value: row[2] }, { value: row[3] }],
    })),
  };
}

const successFetchSplit: typeof fetch = async (input, init) => {
  const url = String(input);
  const body = JSON.parse(String(init?.body ?? "{}")) as {
    dimensions?: string[];
    rowLimit?: number;
    requests?: { dimensions?: { name?: string }[] }[];
  };
  if (url.includes("batchRunReports")) {
    if (body.requests?.[0]?.dimensions?.[0]?.name === "sessionDefaultChannelGroup") {
      return jsonResponse({
        reports: [
          channelReport("sessionDefaultChannelGroup", [
            ["Organic Search", "5", "4", "8"],
            ["buyer@example.com", "1", "1", "1"],
          ]),
          channelReport("sessionDefaultChannelGroup", [["Direct", "2", "2", "3"]]),
          channelReport("sessionSourceMedium", [
            ["google / organic", "5", "4", "8"],
            [VIN, "1", "1", "1"],
          ]),
        ],
      });
    }
    return jsonResponse(gaReport);
  }
  if (body.dimensions?.[0] === "query" && body.rowLimit === SEARCH_CONSOLE_IMPRESSION_ROW_LIMIT) {
    return jsonResponse({
      rows: [
        { keys: ["harley for sale"], clicks: 1, impressions: 80, ctr: 0.0125, position: 11 },
        { keys: ["used harley milwaukee"], clicks: 2, impressions: 20, ctr: 0.1, position: 3 },
        { keys: ["buyer@example.com"], clicks: 0, impressions: 5, ctr: 0, position: 9 },
      ],
    });
  }
  if (body.dimensions?.[0] === "query") return jsonResponse(gscQueries);
  if (body.dimensions?.[0] === "page") return jsonResponse(gscPages);
  return jsonResponse(gscTotals);
};
const success = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => "token",
  fetchImpl: successFetchSplit,
});
assert.equal(success.ga4.status, "ready");
if (success.ga4.status === "ready") {
  assert.equal(success.ga4.last7.sessions, 4);
  assert.equal(success.ga4.last7.users, 3);
  assert.equal(success.ga4.last28.sessions, 0);
  assert.equal(success.ga4.trend[0]?.date, "2026-10-12");
  assert.match(success.ga4.period7, /today/);
  assert.equal(success.ga4.channels.status, "ready");
  if (success.ga4.channels.status === "ready") {
    assert.deepEqual(
      success.ga4.channels.last7.map((row) => row.channel),
      ["Organic Search"],
    );
    assert.equal(success.ga4.channels.last7[0]?.sessions, 5);
    assert.equal(success.ga4.channels.last7[0]?.users, 4);
    assert.equal(success.ga4.channels.last7[0]?.pageViews, 8);
    assert.deepEqual(
      success.ga4.channels.last28.map((row) => row.channel),
      ["Direct"],
    );
    assert.deepEqual(
      success.ga4.channels.sources28.map((row) => row.sourceMedium),
      ["google / organic"],
    );
  }
}
assert.equal(success.searchConsole.status, "ready");
if (success.searchConsole.status === "ready") {
  assert.equal(success.searchConsole.last7.clicks, 6);
  assert.equal(success.searchConsole.last28.impressions, 60);
  assert.deepEqual(
    success.searchConsole.queries.map((row) => row.term),
    ["used harley milwaukee"],
  );
  assert.deepEqual(
    success.searchConsole.pages.map((row) => row.page),
    ["/", "/", "/inventory/street-glide"],
  );
  assert.deepEqual(
    success.searchConsole.pages.map((row) => row.url),
    [
      "https://joesusedharleys.com/",
      "https://www.joesusedharleys.com/",
      "https://joesusedharleys.com/inventory/street-glide?email=[redacted]",
    ],
  );
  assert.equal(success.searchConsole.pages[0]?.impressions, 208);
  assert.equal(success.searchConsole.pages[1]?.impressions, 20);
  assert.equal(JSON.stringify(success.searchConsole.pages).includes(VIN), false);
  assert.equal(JSON.stringify(success.searchConsole.pages).includes("buyer@example.com"), false);
  assert.match(success.searchConsole.detail, /lags 2–3 days/);
  assert.match(success.searchConsole.period28, / to /);
  assert.equal(success.searchConsole.queriesByImpressions.status, "ready");
  if (success.searchConsole.queriesByImpressions.status === "ready") {
    assert.equal(success.searchConsole.queriesByImpressions.limit, 25);
    assert.deepEqual(
      success.searchConsole.queriesByImpressions.rows.map((row) => row.term),
      ["harley for sale", "used harley milwaukee"],
    );
    assert.equal(success.searchConsole.queriesByImpressions.rows[0]?.impressions, 80);
    assert.equal(success.searchConsole.queriesByImpressions.rows[0]?.position, 11);
  }
}

const channelDenied = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async (input, init) => {
    const url = String(input);
    const body = JSON.parse(String(init?.body ?? "{}")) as { requests?: { dimensions?: unknown[] }[] };
    if (url.includes("batchRunReports") && body.requests?.[0]?.dimensions) {
      return new Response("BEGIN PRIVATE KEY", { status: 403 });
    }
    if (url.includes("batchRunReports")) return jsonResponse(gaReport);
    return jsonResponse(gscTotals);
  },
});
assert.equal(channelDenied.ga4.status, "ready");
if (channelDenied.ga4.status === "ready") {
  assert.equal(channelDenied.ga4.last7.sessions, 4);
  assert.equal(channelDenied.ga4.channels.status, "failed");
  assert.equal("last7" in channelDenied.ga4.channels, false);
  assert.equal(channelDenied.ga4.channels.detail.includes("PRIVATE"), false);
}

const impressionDenied = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async (input, init) => {
    const url = String(input);
    const body = JSON.parse(String(init?.body ?? "{}")) as { dimensions?: string[]; rowLimit?: number };
    if (url.includes("batchRunReports")) return jsonResponse(gaReport);
    if (body.rowLimit === SEARCH_CONSOLE_IMPRESSION_ROW_LIMIT) return new Response("secret-body", { status: 500 });
    if (body.dimensions?.[0] === "query") return jsonResponse(gscQueries);
    if (body.dimensions?.[0] === "page") return jsonResponse(gscPages);
    return jsonResponse(gscTotals);
  },
});
assert.equal(impressionDenied.searchConsole.status, "ready");
if (impressionDenied.searchConsole.status === "ready") {
  assert.equal(impressionDenied.searchConsole.queries.length, 1);
  assert.equal(impressionDenied.searchConsole.queriesByImpressions.status, "failed");
  assert.equal("rows" in impressionDenied.searchConsole.queriesByImpressions, false);
  assert.equal(impressionDenied.searchConsole.queriesByImpressions.detail.includes("secret-body"), false);
}

const emptyGa = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async (input) => {
    const url = String(input);
    if (url.includes("batchRunReports")) {
      return jsonResponse({
        reports: [
          { metadata: { currencyCode: "USD" }, kind: "analyticsData#runReport" },
          { metadata: { currencyCode: "USD" }, kind: "analyticsData#runReport" },
          {
            metricHeaders: [{ name: "sessions" }, { name: "screenPageViews" }],
            kind: "analyticsData#runReport",
          },
        ],
      });
    }
    return jsonResponse(gscTotals);
  },
});
assert.equal(emptyGa.ga4.status, "ready");
if (emptyGa.ga4.status === "ready") {
  assert.equal(emptyGa.ga4.last7.sessions, 0);
  assert.equal(emptyGa.ga4.last28.users, 0);
  assert.equal(emptyGa.ga4.trend.length, 0);
}

const denied = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async (input) => {
    const url = String(input);
    if (url.includes("batchRunReports")) return new Response("BEGIN PRIVATE KEY", { status: 403 });
    return jsonResponse(gscTotals);
  },
});
assert.equal(denied.ga4.status, "failed");
assert.equal("last7" in denied.ga4, false);
assert.equal(denied.ga4.detail.includes("PRIVATE"), false);
assert.match(denied.ga4.detail, /denied access/);
assert.equal(denied.searchConsole.status, "ready");

const quota = await loadGoogleReporting({
  env: env({ GA4_PROPERTY_ID: "" }),
  now,
  getAccessToken: async () => "token",
  fetchImpl: async () => jsonResponse({}, 429),
});
assert.equal(quota.ga4.status, "not_configured");
assert.equal(quota.searchConsole.status, "failed");
assert.match(quota.searchConsole.detail, /quota/);
assert.equal("last7" in quota.searchConsole, false);

const authFailed = await loadGoogleReporting({
  env: env(),
  now,
  getAccessToken: async () => {
    throw new Error("private_key rejected");
  },
  fetchImpl: async () => {
    throw new Error("should not call Google");
  },
});
assert.equal(authFailed.ga4.status, "failed");
assert.equal(authFailed.searchConsole.status, "failed");
assert.equal(authFailed.ga4.detail, "Google authentication failed.");
assert.equal(authFailed.ga4.detail.includes("private_key"), false);

assert.equal(safeSearchQuery("buyer@example.com"), null);
assert.equal(safeSearchQuery(VIN), null);
assert.equal(safeLandingPage(`https://joesusedharleys.com/inventory/a?q=${VIN}`), "/inventory/a");
assert.equal(safeLandingPage(`https://joesusedharleys.com/v/${VIN}`), null);
const apexHome = reportLandingPage("https://joesusedharleys.com/");
const wwwHome = reportLandingPage("https://www.joesusedharleys.com/");
assert.equal(apexHome?.page, "/");
assert.equal(wwwHome?.page, "/");
assert.notEqual(apexHome?.url, wwwHome?.url);
assert.equal(reportLandingPage(`https://joesusedharleys.com/v/${VIN}`), null);
const redacted = reportLandingPage(
  "https://joesusedharleys.com/inventory/street-glide?email=buyer@example.com",
);
assert.equal(redacted?.page, "/inventory/street-glide");
assert.equal(redacted?.url.includes("buyer@example.com"), false);
assert.equal(redacted?.url.includes("[redacted]"), true);

const ranges = searchConsoleRanges(now);
assert.equal(ranges.end, "2026-10-12");
assert.equal(ranges.period7, "2026-10-06 to 2026-10-12");
assert.equal(ranges.period28, "2026-09-15 to 2026-10-12");

const page = readFileSync(new URL("../src/app/admin/analytics/page.tsx", import.meta.url), "utf8");
assert.ok(page.indexOf("requireAdminOrRedirect") >= 0);
assert.ok(page.indexOf("requireAdminOrRedirect") < page.indexOf("loadAnalyticsReport"));

const source = readFileSync(new URL("../src/lib/admin/google-reports.ts", import.meta.url), "utf8");
const configSource = readFileSync(new URL("../src/lib/admin/google-config.ts", import.meta.url), "utf8");
for (const file of [source, configSource]) {
  assert.equal(file.includes("NEXT_PUBLIC_"), false);
  assert.equal(file.includes("console."), false);
  assert.equal(file.includes("marketplace"), false);
}

const serialized = JSON.stringify(success);
for (const key of ["name", "email", "phone", "notes", "vin", "sessionId", "query", "private_key", "client_email"]) {
  assert.equal(serialized.includes(`"${key}"`), false, key);
}

console.log("google-reports.test.ts: ok");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
