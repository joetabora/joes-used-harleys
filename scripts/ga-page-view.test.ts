import assert from "node:assert/strict";
import vm from "node:vm";
import {
  claimPageView,
  gaDataLayerGuardScript,
  isGaTrackedPath,
  normalizeGaMeasurementId,
  pageViewPath,
} from "../src/lib/analytics/ga";

assert.equal(normalizeGaMeasurementId(undefined), null);
assert.equal(normalizeGaMeasurementId(""), null);
assert.equal(normalizeGaMeasurementId("  "), null);
assert.equal(normalizeGaMeasurementId("UA-123"), null);
assert.equal(normalizeGaMeasurementId("G-TEST1234';alert(1)//"), null);
assert.equal(normalizeGaMeasurementId("G-TEST1234"), "G-TEST1234");

assert.equal(isGaTrackedPath("/"), true);
assert.equal(isGaTrackedPath("/inventory"), true);
assert.equal(isGaTrackedPath("/inventory/ck123"), true);
assert.equal(isGaTrackedPath("/v/s/12345"), true);
assert.equal(isGaTrackedPath("/admin"), false);
assert.equal(isGaTrackedPath("/admin/leads"), false);
assert.equal(isGaTrackedPath("/v"), false);
assert.equal(isGaTrackedPath("/v/1HD1KEF15PB123456"), false);

assert.equal(pageViewPath("/admin", ""), null);
assert.equal(pageViewPath("/admin/bikes", "tab=1"), null);
assert.equal(pageViewPath("/v/1HD1KEF15PB123456", "assoc=abc"), null);
assert.equal(pageViewPath("/inventory", ""), "/inventory");
assert.equal(pageViewPath("/inventory", "?family=Touring"), "/inventory");
assert.equal(pageViewPath("/", "q=road+glide"), "/");
assert.equal(pageViewPath("/inventory", "email=buyer@example.com"), "/inventory");
assert.equal(pageViewPath("/inventory/1HD1KEF15PB123456", ""), null);

assert.equal(claimPageView(null, "/admin", ""), null);
assert.equal(claimPageView(null, "/inventory", ""), "/inventory");
assert.equal(claimPageView("/inventory", "/inventory", ""), null);
assert.equal(claimPageView("/inventory", "/inventory", "q=street"), null);
assert.equal(claimPageView("/about", "/", ""), "/");

const guard = gaDataLayerGuardScript();
assert.equal(guard.includes("send_page_view:false"), true);
assert.equal(guard.includes("__juhGaConfigured"), true);
assert.equal(guard.includes("G-"), false);

const windowObj: {
  dataLayer?: unknown[];
  __juhGaConfigured?: boolean;
} = {};
const sandbox = { window: windowObj };
vm.createContext(sandbox);
vm.runInContext(guard, sandbox);

const originalConfig = { debug_mode: true };
windowObj.dataLayer?.push(["config", "G-TEST1234", originalConfig]);
const queuedConfig = windowObj.dataLayer?.[0] as [
  string,
  string,
  { send_page_view?: boolean; debug_mode?: boolean },
];
assert.equal(windowObj.__juhGaConfigured, true);
assert.equal(queuedConfig[2].send_page_view, false);
assert.equal(queuedConfig[2].debug_mode, true);

windowObj.dataLayer?.push(["event", "page_view", { page_path: "/inventory" }]);
const queuedEvent = windowObj.dataLayer?.[1] as [string, string, { page_path?: string; send_page_view?: boolean }];
assert.equal(queuedEvent[0], "event");
assert.equal(queuedEvent[2].page_path, "/inventory");
assert.equal(queuedEvent[2].send_page_view, undefined);

console.log("ga-page-view.test.ts: ok");
