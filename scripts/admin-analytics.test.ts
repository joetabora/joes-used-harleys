import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { navItems } from "../src/design-system/components";
import {
  buildAnalyticsReport,
  safeReportPath,
  type AnalyticsReport,
  type AnalyticsReportInput,
} from "../src/lib/admin/analytics-report";

const NOW = "2026-10-15T18:00:00.000Z";
const VIN = "1HD1KEF15PB123456";

function baseInput(overrides: Partial<AnalyticsReportInput> = {}): AnalyticsReportInput {
  return {
    now: NOW,
    leads: { ok: true, value: [] },
    contactClicks: { ok: true, value: 0 },
    events: { ok: true, value: [] },
    bikes: { ok: true, value: [] },
    ...overrides,
  };
}

function forbidden(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) forbidden(item, found);
    return found;
  }
  if (!value || typeof value !== "object") return found;
  for (const [key, child] of Object.entries(value)) {
    if (["name", "email", "phone", "notes", "vin", "sessionId", "query"].includes(key)) {
      found.push(key);
    }
    forbidden(child, found);
  }
  return found;
}

assert.equal(navItems[2]?.href, "/admin/marketplace");
assert.equal(navItems[2]?.label, "Marketplace");
assert.equal(navItems.at(-1)?.href, "/admin/analytics");
assert.equal(
  navItems.filter((item) => item.href !== "/admin/analytics")[2]?.href,
  "/admin/marketplace",
);

assert.equal(safeReportPath("/inventory/ck_bike123"), "/inventory/ck_bike123");
assert.equal(safeReportPath("/contact?email=buyer@example.com"), "/contact");
assert.equal(safeReportPath("buyer@example.com"), "Unspecified");
assert.equal(safeReportPath(`/v/${VIN}`), "Unspecified");
assert.equal(safeReportPath(`/inventory/${VIN}?q=secret`), "Unspecified");

const empty = buildAnalyticsReport(baseInput());
assert.equal(empty.leads.status, "empty");
assert.equal(empty.leads.total, 0);
assert.equal(empty.contactInteractions.status, "empty");
assert.equal(empty.contactInteractions.total, 0);
assert.equal(empty.contactInteractions.label, "Contact interactions");
assert.equal(empty.events.status, "empty");
assert.equal(empty.bikes.status, "empty");
assert.equal(empty.ga4.status, "not_configured");
assert.equal(empty.searchConsole.status, "not_configured");
assert.equal("last7" in empty.ga4, false);
assert.equal("last7" in empty.searchConsole, false);
assert.match(empty.ga4.detail, /Not configured/);
assert.match(empty.searchConsole.detail, /Not configured/);

const unavailable = buildAnalyticsReport(
  baseInput({
    leads: { ok: false, reason: "unavailable" },
    contactClicks: { ok: false, reason: "unavailable" },
    events: { ok: false, reason: "unavailable" },
    bikes: { ok: false, reason: "unavailable" },
  }),
);
assert.equal(unavailable.leads.status, "unavailable");
assert.equal(unavailable.leads.total, 0);
assert.notEqual(unavailable.leads.status, "empty");

const failed = buildAnalyticsReport(
  baseInput({
    leads: { ok: false, reason: "failed" },
    contactClicks: { ok: true, value: 4 },
  }),
);
assert.equal(failed.leads.status, "failed");
assert.equal(failed.contactInteractions.status, "ready");
assert.equal(failed.contactInteractions.total, 4);

const report = buildAnalyticsReport(
  baseInput({
    leads: {
      ok: true,
      value: [
        { createdAt: "2026-10-15T12:00:00.000Z", source: "/inventory/ck_bike123" },
        { createdAt: "2026-10-01T12:00:00.000Z", source: `/inventory/${VIN}?email=a@b.com` },
        { createdAt: "2026-09-01T12:00:00.000Z", source: "/contact" },
        { createdAt: "2026-10-14T12:00:00.000Z", source: "Jane Doe jane@example.com 555-0100" },
      ],
    },
    contactClicks: { ok: true, value: 9 },
    events: {
      ok: true,
      value: [
        { type: "CONTACT_CLICK", count: 9 },
        { type: "PAGE_VIEW", count: 3 },
        { type: "BIKE_DETAIL_VIEW", count: 2 },
      ],
    },
    bikes: {
      ok: true,
      value: [
        {
          id: "ck_bike123",
          year: 2021,
          make: "Harley-Davidson",
          model: "Road Glide",
          stockNumber: "H123",
          views: 5,
          contactClicks: 2,
        },
      ],
    },
  }),
);

assert.equal(report.leads.status, "ready");
assert.equal(report.leads.total, 3);
assert.equal(report.leads.recentTotal, 2);
assert.equal(report.leads.bySource.some((row) => row.path.includes(VIN)), false);
assert.equal(report.leads.bySource.some((row) => row.path.includes("@")), false);
assert.equal(report.leads.bySource.some((row) => row.path === "Unspecified"), true);
assert.equal(report.events.rows.some((row) => row.type === "CONTACT_CLICK"), false);
assert.equal(report.contactInteractions.total, 9);
assert.equal(report.bikes.rows[0]?.contactInteractions, 2);
assert.equal(report.bikes.rows[0]?.label.includes("Road Glide"), true);
assert.deepEqual(forbidden(report as AnalyticsReport), []);

const loader = readFileSync(
  new URL("../src/lib/admin/load-analytics-report.ts", import.meta.url),
  "utf8",
);
for (const needle of [
  "setMarketplacePosted",
  "composeMarketplaceListing",
  "marketplacePostedAt",
  ".update(",
  ".create(",
  ".delete(",
  "sessionId",
  "vin:",
  "notes:",
  "email:",
  "phone:",
]) {
  assert.equal(loader.includes(needle), false, needle);
}
assert.equal(loader.includes("createdAt: true"), true);
assert.equal(loader.includes("source: true"), true);

console.log("admin-analytics.test.ts: ok");
