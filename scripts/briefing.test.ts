import assert from "node:assert/strict";
import {
  assembleBriefing,
  bikeSeverity,
  buildCommandBrief,
  buildRadar,
  buildSalesIntelligence,
  classifyFamily,
  daysBetween,
  urgencyScore,
} from "../src/lib/joeos/briefing";

const now = new Date("2026-07-29T15:00:00Z");

assert.equal(daysBetween(new Date("2026-07-01T00:00:00Z"), now), 28);
assert.equal(bikeSeverity(20), "ok");
assert.equal(bikeSeverity(45), "watch");
assert.equal(bikeSeverity(70), "hot");
assert.equal(urgencyScore({ daysOnLot: 72 }), 72);
assert.equal(urgencyScore({ daysOnLot: 72, hasRecentPriceDrop: true }), 82);
assert.equal(urgencyScore({ daysOnLot: 95, hasRecentPriceDrop: true, status: "PENDING" }), 100);

assert.equal(classifyFamily({ model: "Street Glide Special", category: null }), "Touring");
assert.equal(classifyFamily({ model: "Low Rider S", category: "Softail" }), "Softail");
assert.equal(classifyFamily({ model: "Iron 883", category: null }), "Sportster");
assert.equal(classifyFamily({ model: "Tri Glide Ultra", category: null }), "Trike");
assert.equal(classifyFamily({ model: "Pan America", category: null }), "Other");

const bikes = [
  {
    id: "1",
    year: 2018,
    make: "Harley-Davidson",
    model: "Street Glide",
    price: 18000,
    firstSeenAt: new Date("2026-05-01T00:00:00Z"),
    category: null,
    hasRecentPriceDrop: true,
    previousPrice: 19500,
    priceChangedAt: new Date("2026-07-20T00:00:00Z"),
  },
  {
    id: "2",
    year: 2021,
    make: "Harley-Davidson",
    model: "Iron 883",
    price: 9000,
    firstSeenAt: new Date("2026-07-20T00:00:00Z"),
    category: null,
  },
  {
    id: "3",
    year: 2019,
    make: "Harley-Davidson",
    model: "Tri Glide Ultra",
    price: 25000,
    firstSeenAt: new Date("2026-04-01T00:00:00Z"),
    category: null,
  },
];

const radar = buildRadar(bikes, now);
assert.ok(radar.some((b) => b.family === "Touring" && b.aging === 1));
assert.ok(radar.some((b) => b.family === "Sportster" && b.aging === 0));
assert.ok(radar.some((b) => b.family === "Trike" && b.aging === 1));

const briefing = assembleBriefing({
  bikes,
  leads: [
    {
      id: "l1",
      name: "Mike Johnson",
      notes: "Asked about Road King",
      status: "NEW",
      createdAt: new Date("2026-07-20T00:00:00Z"),
      lastInteractionAt: null,
    },
  ],
  syncFailed: false,
  now,
  email: "joe@example.com",
});

assert.equal(briefing.displayName, "JOE");
assert.match(briefing.greeting, /^GOOD (MORNING|AFTERNOON|EVENING)$/);
assert.ok(briefing.agingBikeCount >= 2);
assert.ok(briefing.potentialRevenue >= 18000 + 25000);
assert.ok(briefing.hotActions.some((a) => a.kind === "bike"));
assert.ok(briefing.hotActions.some((a) => a.kind === "lead" && a.title === "Mike Johnson"));
assert.match(briefing.commandBrief, /follow up/i);
assert.ok(briefing.missions.length <= 3);
assert.match(briefing.salesIntelligence.headline, /Street Glide|attention/i);
assert.ok(briefing.salesIntelligence.reasons.some((r) => /Price reduced|days on lot/i.test(r)));

const intel = buildSalesIntelligence({
  priorityBike: null,
  staleLeadCount: 0,
  agingBikeCount: 0,
});
assert.match(intel.headline, /clear/i);

const clear = buildCommandBrief({
  agingBikeCount: 0,
  staleLeadCount: 0,
  priorityBike: null,
});
assert.match(clear, /Engine is clear/);

console.log("briefing tests passed");
