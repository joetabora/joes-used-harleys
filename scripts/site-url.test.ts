import assert from "node:assert/strict";
import {
  assertSafeSiteUrl,
  isLocalhostSiteUrl,
} from "../src/lib/site";

assert.equal(isLocalhostSiteUrl("http://localhost:3000"), true);
assert.equal(isLocalhostSiteUrl("https://127.0.0.1"), true);
assert.equal(isLocalhostSiteUrl("https://www.joesusedharleys.com"), false);
assert.equal(isLocalhostSiteUrl(""), true);

assert.equal(
  assertSafeSiteUrl("https://www.joesusedharleys.com/", { requirePublic: true }),
  "https://www.joesusedharleys.com",
);

assert.throws(
  () => assertSafeSiteUrl("http://localhost:3000", { requirePublic: true }),
  /localhost/,
);
assert.throws(
  () => assertSafeSiteUrl("http://www.joesusedharleys.com", { requirePublic: true }),
  /https/,
);
assert.throws(() => assertSafeSiteUrl("", { requirePublic: true }), /required/);

// Dev may keep localhost
assert.equal(
  assertSafeSiteUrl("http://localhost:3000", { requirePublic: false }),
  "http://localhost:3000",
);

console.log("site-url.test.ts: ok");
