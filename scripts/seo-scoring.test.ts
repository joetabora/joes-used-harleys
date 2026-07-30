import assert from "node:assert/strict";
import { composeSeoDocument, defaultFaqs, section } from "../src/lib/seo/compose-page";
import { scoreSeoPage, statusFromScore } from "../src/lib/seo/scoring";
import { buildTaxonomySitemapEntries } from "../src/lib/seo/sitemap-data";
import { listModels, listGeo } from "../src/lib/content/taxonomy";
import { getPublishedGuides } from "../src/lib/content/guides";

const thin = scoreSeoPage({
  path: "/x",
  title: "Short",
  description: "Too short",
  h1: "Short",
  type: "website",
  sections: [{ heading: "A", body: "Hi" }],
  faqs: [],
  breadcrumbs: [{ name: "Home", path: "/" }],
  relatedLinks: [],
  indexable: true,
});
assert.ok(thin.score < 70);
assert.equal(statusFromScore(thin.score) !== "INDEX", true);

const rich = composeSeoDocument({
  path: "/harleys/street-glide",
  title: "Used Street Glide Harley buying guide for Wisconsin riders",
  description:
    "Educational Street Glide buying notes for used Harley shoppers — live inventory when available, never invented.",
  h1: "Used Street Glide",
  type: "model",
  sections: [
    section(
      "Overview",
      "Street Glide is a fork-mounted batwing fairing bagger used for highway miles and two-up comfort. ".repeat(8),
    ),
    section(
      "Who it's for",
      "Riders who want a traditional bagger look with storage and wind protection. ".repeat(6),
    ),
  ],
  faqs: defaultFaqs("model", "Street Glide"),
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Harleys", path: "/harleys" },
    { name: "Street Glide", path: "/harleys/street-glide" },
  ],
  relatedLinks: [
    { href: "/guides", title: "Guides" },
    { href: "/inventory", title: "Inventory" },
    { href: "/used-harleys", title: "Local" },
  ],
  relatedInventoryHint: { model: "Street Glide" },
});
assert.ok(rich.score >= 70, `expected rich score >= 70, got ${rich.score}`);
assert.equal(rich.status, "INDEX");

assert.ok(listModels().length >= 10);
assert.ok(listGeo().length >= 20);
assert.ok(getPublishedGuides().length >= 10);

const sitemap = buildTaxonomySitemapEntries();
assert.ok(sitemap.length > 5000, `expected large sitemap capacity, got ${sitemap.length}`);

console.log("seo-scoring tests passed", {
  thin: thin.score,
  rich: rich.score,
  sitemapUrls: sitemap.length,
  guides: getPublishedGuides().length,
  cities: listGeo().length,
  models: listModels().length,
});
