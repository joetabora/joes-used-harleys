import assert from "node:assert/strict";
import { composeSeoDocument, defaultFaqs, section } from "../src/lib/seo/compose-page";
import { scoreSeoPage, statusFromScore } from "../src/lib/seo/scoring";
import { buildTaxonomySitemapEntries } from "../src/lib/seo/sitemap-data";
import {
  buildCityModelPage,
  buildCityModelYearPage,
} from "../src/lib/seo/page-builders";
import { stripHtmlForMeta, inventoryMetaDescription } from "../src/lib/seo/plain-text";
import { listModels, listGeo } from "../src/lib/content/taxonomy";
import { getPublishedGuides } from "../src/lib/content/guides";
import { composeLocationHub } from "../src/lib/content/compose-location";

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
assert.ok(
  sitemap.length > 200 && sitemap.length < 2000,
  `expected concentrated sitemap (~200–2000), got ${sitemap.length}`,
);
assert.ok(
  !sitemap.some((e) => /\/used-harleys\/[^/]+\/[^/]+\/\d+$/.test(e.url)),
  "sitemap must not include city×model×year URLs",
);
assert.ok(
  !sitemap.some((e) => {
    const m = e.url.match(/\/used-harleys\/([^/]+)\/([^/]+)$/);
    if (!m) return false;
    const topic = m[2];
    return ![
      "inventory",
      "buying",
      "trade-in",
      "financing",
      "events",
      "service",
      "routes",
      "faq",
    ].includes(topic);
  }),
  "sitemap must not include city×model URLs",
);

const cityModel = buildCityModelPage("milwaukee", "road-glide");
assert.ok(cityModel);
assert.equal(cityModel.indexable, false);
assert.equal(cityModel.status, "NOINDEX");

const cityYear = buildCityModelYearPage("milwaukee", "road-glide", 2021);
assert.ok(cityYear);
assert.equal(cityYear.indexable, false);
assert.equal(cityYear.status, "NOINDEX");

const chicago = composeLocationHub("chicago");
assert.ok(chicago);
assert.equal(chicago.indexable, false);
assert.equal(chicago.status, "NOINDEX");

assert.equal(
  stripHtmlForMeta("<p>Clean <b>bike</b> &amp; ready</p>"),
  "Clean bike & ready",
);
assert.match(
  inventoryMetaDescription({
    year: 2019,
    make: "Harley-Davidson",
    model: "Road Glide",
    mileage: 12000,
    price: 18999,
    description: "<div>Dealer <script>x</script> HTML</div>",
  }),
  /Road Glide|Dealer HTML|Milwaukee/i,
);

console.log("seo-scoring tests passed", {
  thin: thin.score,
  rich: rich.score,
  sitemapUrls: sitemap.length,
  guides: getPublishedGuides().length,
  cities: listGeo().length,
  models: listModels().length,
});
