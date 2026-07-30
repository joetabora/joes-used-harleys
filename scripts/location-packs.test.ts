import assert from "node:assert/strict";
import {
  locationTopicAvailable,
  packMeetsLocationHubFloor,
  serviceEducationIsHonest,
} from "../src/lib/content/location-pack-completeness";
import {
  composeLocationHub,
  composeLocationTopic,
} from "../src/lib/content/compose-location";
import {
  getLocationPack,
  listLocationPacks,
  missingSoutheastWiPackSlugs,
} from "../src/content/location-packs";
import { getGeo, listGeo } from "../src/lib/content/taxonomy";
import { localBusinessJsonLd } from "../src/lib/seo/schema";
import { hasBusinessNap } from "../src/lib/site";

assert.deepEqual(
  missingSoutheastWiPackSlugs(),
  [],
  "every primary SE WI city needs a location pack",
);

assert.ok(getGeo("muskego"), "muskego in geo union");
assert.ok(getGeo("delafield"));
assert.ok(getGeo("oconomowoc"));
assert.ok(getGeo("germantown"));
assert.ok(getGeo("hartford"));

const sePrimary = listGeo().filter(
  (c) => c.region === "southeast-wi" && c.tier === "primary",
);
assert.ok(sePrimary.length >= 18, `expected >=18 SE primary, got ${sePrimary.length}`);
assert.equal(listLocationPacks().length, sePrimary.length);

for (const pack of listLocationPacks()) {
  assert.ok(packMeetsLocationHubFloor(pack), `${pack.slug} hub floor`);
  assert.ok(locationTopicAvailable(pack, "buying"), `${pack.slug} buying`);
  assert.ok(locationTopicAvailable(pack, "service"), `${pack.slug} service`);
  for (const line of pack.serviceEducation) {
    assert.ok(serviceEducationIsHonest(line), `${pack.slug} service honesty: ${line}`);
  }
}

const hub = composeLocationHub("milwaukee");
assert.ok(hub);
assert.equal(hub.type, "article");
assert.ok(hub.sections.length >= 6, `rich hub sections: ${hub.sections.length}`);
assert.ok(hub.faqs.length >= 3);
assert.ok(hub.relatedLinks.length >= 3);
assert.ok(hub.score >= 70, `milwaukee hub score ${hub.score}`);
assert.equal(hub.status, "INDEX");
assert.ok(!/only the city name/i.test(hub.sections.map((s) => s.body).join(" ")));

const muskego = composeLocationHub("muskego");
assert.ok(muskego);
assert.ok(muskego.sections.some((s) => /Muskego|Hwy 36|lake-country/i.test(s.body)));

const financing = composeLocationTopic("milwaukee", "financing");
assert.ok(financing);
assert.ok(financing.path.endsWith("/financing"));

const service = composeLocationTopic("milwaukee", "service");
assert.ok(service);
assert.ok(
  service.sections.some((s) => /buyer education|not/i.test(s.heading + s.body)),
);
assert.ok(
  service.sections.some((s) =>
    /do not publish a service menu|buyer education only/i.test(s.body),
  ),
);
assert.ok(
  !service.sections.some((s) =>
    /our service department hours are|see our service menu/i.test(s.body),
  ),
);

// Omit financing topic when notes empty
const thin = {
  ...getLocationPack("milwaukee")!,
  financingNotes: [],
};
assert.equal(locationTopicAvailable(thin, "financing"), false);

// NAP schema: null without env address
assert.equal(hasBusinessNap(), false);
assert.equal(localBusinessJsonLd(), null);

console.log("location-packs.test.ts: ok", {
  packs: listLocationPacks().length,
  hubScore: hub.score,
  sections: hub.sections.length,
});
