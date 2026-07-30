import assert from "node:assert/strict";
import {
  computePeerStats,
  getScore,
  scoreBikeAsset,
  type ScoreBikeInput,
} from "../src/lib/assets/score-bike";

const now = new Date("2026-07-29T15:00:00Z");

function baseBike(over: Partial<ScoreBikeInput> = {}): ScoreBikeInput {
  return {
    id: "bike-1",
    year: 2019,
    make: "Harley-Davidson",
    model: "Street Glide Special",
    category: "Touring",
    price: 18000,
    status: "AVAILABLE",
    firstSeenAt: new Date("2026-05-01T00:00:00Z"),
    featuredRank: 0,
    joeRating: null,
    perfectFor: null,
    favoriteFeature: null,
    idealRider: null,
    thingsToMention: null,
    thingsToCheck: null,
    whyIDLikeIt: null,
    whoShouldSkipIt: null,
    conversationStarter: null,
    buyingTips: null,
    walkaroundVideoUrl: null,
    seoHeadline: null,
    seoDescription: null,
    personalHeroImageUrl: null,
    ...over,
  };
}

const emptyPeers = { sameModel: 0, sameFamily: 0, familyMedianPrice: null };

// Peer stats
{
  const peers = computePeerStats(
    { id: "a", model: "Street Glide", category: null, price: 18000 },
    [
      { id: "a", model: "Street Glide", category: null, price: 18000 },
      { id: "b", model: "Street Glide", category: null, price: 17000 },
      { id: "c", model: "Road Glide", category: null, price: 20000 },
      { id: "d", model: "Iron 883", category: null, price: 8000 },
    ],
  );
  assert.equal(peers.sameModel, 1);
  assert.equal(peers.sameFamily, 2); // b + c touring
  assert.equal(peers.familyMedianPrice, 18500); // median of 17000, 20000
}

// Aging reasons cite days
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  const aging = getScore(card, "aging")!;
  assert.ok(aging.reasons.some((r) => r.evidence.includes("days")));
  assert.ok(aging.value >= 70); // ~89 days / 70 * 100
}

// No analytics → demand does not fabricate interest reasons
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  const demand = getScore(card, "demand")!;
  assert.equal(demand.value, 50);
  assert.ok(demand.reasons.some((r) => r.code === "demand_no_data"));
  assert.ok(!demand.reasons.some((r) => r.code === "demand_views"));
}

// Demand uses real counters only
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: {
      views: 10,
      uniqueVisitors: 4,
      impressions: 20,
      contactClicks: 0,
      financingOpens: 0,
      searchHits: 2,
      shares: 1,
      favorites: 0,
      avgTimeOnPageMs: 5000,
      lastDetailViewAt: now,
    },
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  const demand = getScore(card, "demand")!;
  assert.ok(demand.value > 50);
  assert.ok(demand.reasons.some((r) => r.code === "demand_views"));
  assert.ok(demand.reasons.every((r) => !/market|auction|MSRP|competitor/i.test(r.label)));
}

// Opportunity extends urgency (days + drop + pending)
{
  const card = scoreBikeAsset({
    bike: baseBike({
      status: "PENDING",
      firstSeenAt: new Date("2026-05-18T00:00:00Z"),
    }),
    priceHistory: [
      {
        previousPrice: 20000,
        newPrice: 18000,
        changedAt: new Date("2026-07-20T00:00:00Z"),
      },
    ],
    analytics: null,
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  const opp = getScore(card, "opportunity")!;
  assert.equal(opp.value, 87); // 72 days + 10 drop + 5 pending
  assert.ok(opp.reasons.some((r) => r.code === "opp_price_drop"));
  assert.ok(opp.reasons.some((r) => r.code === "opp_pending"));
}

// Price uses in-lot median only
{
  const card = scoreBikeAsset({
    bike: baseBike({ price: 15000 }),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: { sameModel: 1, sameFamily: 3, familyMedianPrice: 18000 },
    now,
  });
  const price = getScore(card, "price")!;
  assert.ok(price.reasons.some((r) => r.code === "price_below_lot_median"));
  assert.ok(price.reasons.every((r) => !/auction|MSRP|external/i.test(r.evidence)));
}

// Market / competition are lot-position only
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: { sameModel: 0, sameFamily: 1, familyMedianPrice: 18000 },
    now,
  });
  const market = getScore(card, "market")!;
  const competition = getScore(card, "competition")!;
  assert.equal(market.subtitle, "Lot position");
  assert.equal(competition.subtitle, "On-lot peers");
  assert.ok(market.reasons.every((r) => /live floor|same (model|family)/i.test(r.label + r.evidence)));
}

// Joe score from rating + enrichment + featured
{
  const card = scoreBikeAsset({
    bike: baseBike({
      joeRating: 8,
      featuredRank: 2,
      perfectFor: "Touring",
      favoriteFeature: "Bags",
      idealRider: "Tall",
    }),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  const joe = getScore(card, "joe")!;
  assert.ok(joe.reasons.some((r) => r.code === "joe_rating"));
  assert.ok(joe.reasons.some((r) => r.code === "joe_enrichment"));
  assert.ok(joe.reasons.some((r) => r.code === "joe_featured"));
  assert.ok(joe.value > 40);
}

// Lead score from soft leads + clicks
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: {
      views: 0,
      uniqueVisitors: 0,
      impressions: 0,
      contactClicks: 3,
      financingOpens: 1,
      searchHits: 0,
      shares: 0,
      favorites: 0,
      avgTimeOnPageMs: 0,
      lastDetailViewAt: null,
    },
    leadCountForBike: 2,
    peers: emptyPeers,
    now,
  });
  const lead = getScore(card, "lead")!;
  assert.ok(lead.reasons.some((r) => r.code === "lead_form_count"));
  assert.ok(lead.reasons.some((r) => r.code === "lead_contact_clicks"));
  assert.ok(lead.value >= 50);
}

// Eight scores always present with reasons
{
  const card = scoreBikeAsset({
    bike: baseBike(),
    priceHistory: [],
    analytics: null,
    leadCountForBike: 0,
    peers: emptyPeers,
    now,
  });
  assert.equal(card.scores.length, 8);
  for (const s of card.scores) {
    assert.ok(s.reasons.length >= 1, `${s.key} needs reasons`);
    assert.ok(s.value >= 0 && s.value <= 100);
  }
}

console.log("asset-scores.test.ts: ok");
