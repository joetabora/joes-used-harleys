import { publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import {
  computePeerStats,
  scoreBikeAsset,
  type AnalyticsRollup,
  type AssetScorecard,
  type ScoreBikeInput,
} from "@/lib/assets/score-bike";

function toScoreBike(bike: {
  id: string;
  year: number;
  make: string;
  model: string;
  category: string | null;
  price: number | null;
  status: string;
  firstSeenAt: Date;
  featuredRank: number;
  joeRating: number | null;
  perfectFor: string | null;
  favoriteFeature: string | null;
  idealRider: string | null;
  thingsToMention: string | null;
  thingsToCheck: string | null;
  whyIDLikeIt: string | null;
  whoShouldSkipIt: string | null;
  conversationStarter: string | null;
  buyingTips: string | null;
  walkaroundVideoUrl: string | null;
  seoHeadline: string | null;
  seoDescription: string | null;
  personalHeroImageUrl: string | null;
}): ScoreBikeInput {
  return {
    id: bike.id,
    year: bike.year,
    make: bike.make,
    model: bike.model,
    category: bike.category,
    price: bike.price,
    status: bike.status,
    firstSeenAt: bike.firstSeenAt,
    featuredRank: bike.featuredRank,
    joeRating: bike.joeRating,
    perfectFor: bike.perfectFor,
    favoriteFeature: bike.favoriteFeature,
    idealRider: bike.idealRider,
    thingsToMention: bike.thingsToMention,
    thingsToCheck: bike.thingsToCheck,
    whyIDLikeIt: bike.whyIDLikeIt,
    whoShouldSkipIt: bike.whoShouldSkipIt,
    conversationStarter: bike.conversationStarter,
    buyingTips: bike.buyingTips,
    walkaroundVideoUrl: bike.walkaroundVideoUrl,
    seoHeadline: bike.seoHeadline,
    seoDescription: bike.seoDescription,
    personalHeroImageUrl: bike.personalHeroImageUrl,
  };
}

function toRollup(
  row: {
    views: number;
    uniqueVisitors: number;
    impressions: number;
    contactClicks: number;
    financingOpens: number;
    searchHits: number;
    shares: number;
    favorites: number;
    avgTimeOnPageMs: number;
    lastDetailViewAt: Date | null;
  } | null,
): AnalyticsRollup | null {
  if (!row) return null;
  return {
    views: row.views,
    uniqueVisitors: row.uniqueVisitors,
    impressions: row.impressions,
    contactClicks: row.contactClicks,
    financingOpens: row.financingOpens,
    searchHits: row.searchHits,
    shares: row.shares,
    favorites: row.favorites,
    avgTimeOnPageMs: row.avgTimeOnPageMs,
    lastDetailViewAt: row.lastDetailViewAt,
  };
}

function leadCountsFromSources(sources: (string | null)[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const source of sources) {
    if (!source) continue;
    const match = source.match(/\/inventory\/([a-zA-Z0-9_-]+)/);
    if (!match?.[1]) continue;
    const id = match[1];
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}

const bikeSelect = {
  id: true,
  year: true,
  make: true,
  model: true,
  category: true,
  price: true,
  status: true,
  firstSeenAt: true,
  featuredRank: true,
  joeRating: true,
  perfectFor: true,
  favoriteFeature: true,
  idealRider: true,
  thingsToMention: true,
  thingsToCheck: true,
  whyIDLikeIt: true,
  whoShouldSkipIt: true,
  conversationStarter: true,
  buyingTips: true,
  walkaroundVideoUrl: true,
  seoHeadline: true,
  seoDescription: true,
  personalHeroImageUrl: true,
  priceHistory: {
    orderBy: { changedAt: "desc" as const },
    take: 20,
    select: {
      previousPrice: true,
      newPrice: true,
      changedAt: true,
    },
  },
  analytics: true,
} as const;

/** Load scorecards for all live-floor bikes (peers computed in memory). */
export async function loadFloorScorecards(): Promise<Map<string, AssetScorecard>> {
  const map = new Map<string, AssetScorecard>();
  if (!isDatabaseConfigured() || !prisma) return map;

  const [bikes, leadRows] = await Promise.all([
    prisma.bike.findMany({
      where: publicBikeWhere,
      select: bikeSelect,
    }),
    prisma.lead.findMany({
      where: { source: { contains: "/inventory/" } },
      select: { source: true },
    }),
  ]);

  const leadCounts = leadCountsFromSources(leadRows.map((r) => r.source));
  const peerRows = bikes.map((b) => ({
    id: b.id,
    model: b.model,
    category: b.category,
    price: b.price,
  }));
  const now = new Date();

  for (const bike of bikes) {
    const peers = computePeerStats(bike, peerRows);
    const card = scoreBikeAsset({
      bike: toScoreBike(bike),
      priceHistory: bike.priceHistory,
      analytics: toRollup(bike.analytics),
      leadCountForBike: leadCounts.get(bike.id) ?? 0,
      peers,
      now,
    });
    map.set(bike.id, card);
  }

  return map;
}

export async function loadScorecardForBike(
  bikeId: string,
): Promise<AssetScorecard | null> {
  if (!isDatabaseConfigured() || !prisma) return null;

  const [bike, livePeers, leadRows] = await Promise.all([
    prisma.bike.findUnique({
      where: { id: bikeId },
      select: bikeSelect,
    }),
    prisma.bike.findMany({
      where: publicBikeWhere,
      select: { id: true, model: true, category: true, price: true },
    }),
    prisma.lead.findMany({
      where: { source: { contains: `/inventory/${bikeId}` } },
      select: { source: true },
    }),
  ]);
  if (!bike) return null;

  const leadCounts = leadCountsFromSources(leadRows.map((r) => r.source));
  const peers = computePeerStats(bike, livePeers);

  return scoreBikeAsset({
    bike: toScoreBike(bike),
    priceHistory: bike.priceHistory,
    analytics: toRollup(bike.analytics),
    leadCountForBike: leadCounts.get(bikeId) ?? 0,
    peers,
    now: new Date(),
  });
}

/** Compact pill values for floor tiles. */
export type FloorScorePills = {
  opportunity: number;
  demand: number;
  aging: number;
};

export function pillsFromScorecard(card: AssetScorecard): FloorScorePills {
  return {
    opportunity: card.scores.find((s) => s.key === "opportunity")?.value ?? 0,
    demand: card.scores.find((s) => s.key === "demand")?.value ?? 50,
    aging: card.scores.find((s) => s.key === "aging")?.value ?? 0,
  };
}
