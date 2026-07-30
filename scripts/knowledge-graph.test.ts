import assert from "node:assert/strict";
import type { KnowledgeEntity } from "../src/generated/prisma/client";
import { composeModelHub } from "../src/lib/content/compose-model-hub";
import { canPublish, composeDraftDocument } from "../src/lib/knowledge/graph";
import {
  factsMeetFloor,
  publicPathForEntity,
} from "../src/lib/knowledge/types";
import { FAMILIES } from "../src/lib/content/taxonomy";

assert.ok(FAMILIES.includes("Dyna"));
assert.ok(FAMILIES.includes("CVO"));

assert.equal(publicPathForEntity("GENERATION", "milwaukee-eight-touring"), "/harleys/generations/milwaukee-eight-touring");
assert.equal(publicPathForEntity("TRIM", "street-glide-special"), "/harleys/trims/street-glide-special");
assert.equal(
  publicPathForEntity("UPGRADE_TOPIC", "stage-1-questions", { guideTopic: "upgrade" }),
  "/guides/upgrade/stage-1-questions",
);
assert.equal(
  publicPathForEntity("UPGRADE_TOPIC", "upgrade-hub", { guideTopic: "upgrade" }),
  "/guides/upgrade",
);
assert.equal(publicPathForEntity("FAMILY", "dyna"), "/harleys/family/dyna");
assert.equal(publicPathForEntity("FAMILY", "cvo"), "/harleys/family/cvo");

assert.equal(
  factsMeetFloor("MODEL", { overview: ["a"], strengths: ["b"] }).ok,
  false,
);
assert.equal(
  factsMeetFloor("MODEL", {
    overview: ["a", "b"],
    strengths: ["c", "d"],
    buyingChecks: ["1", "2", "3"],
  }).ok,
  true,
);
assert.equal(
  factsMeetFloor("GENERATION", { body: "x".repeat(50), bullets: ["a", "b"] }).ok,
  true,
);
assert.equal(factsMeetFloor("TRIM", { bullets: ["only-one"] }).ok, false);

function fakeEntity(
  partial: Partial<KnowledgeEntity> & Pick<KnowledgeEntity, "type" | "slug" | "title">,
): KnowledgeEntity {
  return {
    id: "test",
    status: "DRAFT",
    summary: "",
    facts: {},
    seoTitle: null,
    seoDescription: null,
    publishedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...partial,
  };
}

const thin = fakeEntity({
  type: "GENERATION",
  slug: "thin-gen",
  title: "Thin",
  summary: "short",
  facts: {},
});
assert.equal(canPublish(thin).ok, false, "thin entity cannot publish");

const rich = fakeEntity({
  type: "GENERATION",
  slug: "milwaukee-eight-touring",
  title: "Milwaukee-Eight Touring generation buying notes",
  summary:
    "Later Touring platforms powered by Milwaukee-Eight engines — confirm displacement by VIN and sit before you buy.",
  facts: {
    body: "Later Touring platforms powered by Milwaukee-Eight engines. Confirm displacement, options, and calibration on the VIN. Specs vary by year. Related inventory is mirrored from the live dealership feed when connected and never invented for SEO. Empty related inventory means nothing matching is available right now. Ask Joe clear questions about fit, paperwork, and next steps before you buy a used Harley in Southeast Wisconsin.",
    bullets: [
      "Confirm year and calibration on the VIN",
      "Do not assume one displacement across the generation",
      "Sit on the bike before you decide",
      "Inventory is mirrored, never invented",
    ],
    faqs: [
      {
        question: "What is this generation?",
        answer: "An educational grouping for later Touring Milwaukee-Eight bikes — verify the VIN.",
      },
      {
        question: "Do you invent stock?",
        answer: "No. Related inventory comes from the live feed when connected.",
      },
    ],
  },
});
const gate = canPublish(rich);
assert.ok(gate.ok, `rich generation should publish: ${gate.reasons.join("; ")} score=${gate.score}`);

const draft = composeDraftDocument(rich);
assert.ok(draft.relatedLinks.length >= 3);
assert.ok(draft.faqs.length >= 2);

// File fallback still works without DB
const hub = composeModelHub("street-glide");
assert.ok(hub);
assert.equal(hub.path, "/harleys/street-glide");

console.log("knowledge-graph.test.ts: ok", { publishScore: gate.score });
