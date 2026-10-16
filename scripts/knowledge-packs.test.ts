import assert from "node:assert/strict";
import {
  availableSectionKeys,
  packMeetsHubFloor,
  sectionAvailable,
} from "../src/lib/content/knowledge-pack-completeness";
import { composeModelHub } from "../src/lib/content/compose-model-hub";
import { buildGuidePage, buildModelPage } from "../src/lib/seo/page-builders";
import { matchBikeToPackSlug } from "../src/lib/content/match-bike-to-pack";
import {
  getKnowledgePack,
  listKnowledgePacks,
  missingPackSlugs,
} from "../src/content/knowledge-packs";
import type { KnowledgePack } from "../src/lib/content/knowledge-pack-types";

assert.deepEqual(missingPackSlugs(), [], "every taxonomy model needs a pack");
assert.equal(listKnowledgePacks().length, 18);

for (const pack of listKnowledgePacks()) {
  assert.ok(packMeetsHubFloor(pack), `${pack.slug} should meet hub floor`);
  assert.ok(sectionAvailable(pack, "description"), `${pack.slug} description`);
  assert.ok(sectionAvailable(pack, "buying"), `${pack.slug} buying`);
  assert.ok(sectionAvailable(pack, "pros"), `${pack.slug} pros`);
  assert.ok(sectionAvailable(pack, "cons"), `${pack.slug} cons`);
}

const thin: KnowledgePack = {
  ...getKnowledgePack("iron-883")!,
  financingNotes: undefined,
  insuranceNotes: undefined,
  stage1: [],
  accessories: ["one"],
};
assert.equal(sectionAvailable(thin, "financing"), false);
assert.equal(sectionAvailable(thin, "insurance"), false);
assert.equal(sectionAvailable(thin, "stage1"), false);
assert.equal(sectionAvailable(thin, "accessories"), false);

assert.ok(availableSectionKeys(getKnowledgePack("street-glide")!).includes("roadTrip"));

const hub = composeModelHub("street-glide");
assert.ok(hub);
assert.equal(hub.type, "article");
assert.ok(hub.sections.length >= 10, `expected rich hub, got ${hub.sections.length}`);
assert.ok(hub.faqs.length >= 2);
assert.ok(hub.relatedLinks.length >= 3);
assert.ok(hub.score >= 70, `hub should be indexable-quality, score=${hub.score}`);
assert.equal(hub.status, "INDEX");
assert.ok(!hub.sections.some((s) => /guaranteed approval|#\s*1 dealer/i.test(s.body)));

assert.equal(composeModelHub("street-glide")?.path, "/harleys/street-glide");
assert.equal(
  composeModelHub("street-glide")?.title,
  "Used Street Glide Harley buying guide",
);

const panAmerica = composeModelHub("pan-america");
assert.ok(panAmerica);
assert.equal(panAmerica.title, "Used Harley-Davidson Pan America motorcycles");
assert.equal(panAmerica.h1, "Used Pan America");
assert.ok(panAmerica.description.length >= 70 && panAmerica.description.length <= 170);
assert.match(panAmerica.description, /Pan America/);
assert.match(panAmerica.description, /Milwaukee/);
assert.match(panAmerica.description, /when one is available/);
assert.ok(
  panAmerica.relatedLinks.some((link) => link.href === "/inventory"),
  "Pan America inventory link stays",
);
assert.ok(
  panAmerica.relatedLinks.some((link) => link.href === "/used-harleys/milwaukee"),
  "Pan America Milwaukee link stays",
);

const keysWithoutFinance = availableSectionKeys({
  ...getKnowledgePack("street-glide")!,
  financingNotes: undefined,
});
assert.ok(!keysWithoutFinance.includes("financing"));

assert.equal(matchBikeToPackSlug({ model: "Street Glide Special" }), "street-glide-special");
assert.equal(matchBikeToPackSlug({ model: "FLHX Street Glide" }), "street-glide");
assert.equal(matchBikeToPackSlug({ model: "Iron 883" }), "iron-883");
assert.equal(matchBikeToPackSlug({ model: "Totally Unknown Custom" }), null);

void (async () => {
  const guide = await buildGuidePage("buying", "first-time-harley-buyer-guide");
  assert.ok(guide);
  assert.equal(guide.title, "First-time used Harley buyer guide");
  assert.equal(guide.relatedLinks[0]?.href, "/inventory");
  assert.equal(guide.relatedLinks[0]?.title, "Browse used Harley-Davidson motorcycles");
  assert.equal(guide.relatedLinks[1]?.href, "/used-harleys/milwaukee");
  assert.equal(guide.relatedLinks[1]?.title, "Find used Harleys near Milwaukee");

  const otherGuide = await buildGuidePage("buying", "buying-a-harley-out-of-state");
  assert.ok(otherGuide);
  assert.equal(
    otherGuide.relatedLinks.some((link) => link.title === "Browse used Harley-Davidson motorcycles"),
    false,
  );

  const pan = await buildModelPage("pan-america");
  assert.equal(pan?.title, panAmerica.title);
  assert.equal(pan?.description, panAmerica.description);
  assert.equal(pan?.h1, "Used Pan America");

  const glide = await buildModelPage("street-glide");
  assert.equal(glide?.title, "Used Street Glide Harley buying guide");

  console.log("knowledge-packs.test.ts: ok", { hubScore: hub.score, sections: hub.sections.length });
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
