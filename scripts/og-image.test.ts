import assert from "node:assert/strict";
import { isShareableImageUrl, pickShareImage } from "../src/lib/og-image";

const jpg = "https://cdn.room58.com/2025/08/14/abc_123.jpg";

assert.equal(isShareableImageUrl(jpg), true);
assert.equal(isShareableImageUrl("https://cdn.room58.com/a.JPEG?w=800"), true);
assert.equal(isShareableImageUrl("https://cdn.room58.com/a.png"), true);
assert.equal(isShareableImageUrl("https://cdn.room58.com/a.webp"), false);
assert.equal(isShareableImageUrl("http://cdn.room58.com/a.jpg"), false);
assert.equal(isShareableImageUrl("not a url"), false);
assert.equal(isShareableImageUrl(null), false);

assert.equal(
  pickShareImage({ personalHeroImageUrl: "https://x.test/joe.jpg", photos: [jpg] }),
  "https://x.test/joe.jpg",
);
assert.equal(
  pickShareImage({ personalHeroImageUrl: "https://x.test/joe.webp", photos: [jpg] }),
  jpg,
);
assert.equal(
  pickShareImage({ personalHeroImageUrl: null, photos: ["https://x.test/a.webp", jpg] }),
  jpg,
);
assert.equal(pickShareImage({ personalHeroImageUrl: null, photos: [] }), null);

console.log("og-image.test.ts: ok");
