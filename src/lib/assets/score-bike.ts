import { agingThresholds } from "@/design-system/spacing";
import { classifyFamily } from "@/lib/bike-family";
import { urgencyScore } from "@/lib/joeos/briefing";

export type ScoreReason = {
  code: string;
  label: string;
  weight: number;
  evidence: string;
};

export type AssetScore = {
  key: string;
  label: string;
  subtitle?: string;
  value: number;
  reasons: ScoreReason[];
};

export type AssetScorecard = {
  bikeId: string;
  computedAt: Date;
  scores: AssetScore[];
  composite: number;
};

export type PeerStats = {
  /** Live bikes with same model string (excluding self). */
  sameModel: number;
  /** Live bikes in same family (excluding self). */
  sameFamily: number;
  /** Median price of live same-family bikes with a price (excluding self). Null if none. */
  familyMedianPrice: number | null;
};

export type PriceHistoryRow = {
  previousPrice: number | null;
  newPrice: number | null;
  changedAt: Date;
};

export type AnalyticsRollup = {
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
};

export type ScoreBikeInput = {
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
};

const DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_DROP_DAYS = 30;

function clamp(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n)));
}

function daysBetween(from: Date, to: Date): number {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / DAY_MS));
}

function sortReasons(reasons: ScoreReason[]): ScoreReason[] {
  return [...reasons].sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
}

function median(nums: number[]): number | null {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1]! + sorted[mid]!) / 2);
  }
  return sorted[mid]!;
}

export function computePeerStats(
  bike: { id: string; model: string; category: string | null; price: number | null },
  livePeers: { id: string; model: string; category: string | null; price: number | null }[],
): PeerStats {
  const family = classifyFamily(bike);
  const others = livePeers.filter((p) => p.id !== bike.id);
  const sameModel = others.filter(
    (p) => p.model.toLowerCase() === bike.model.toLowerCase(),
  ).length;
  const sameFamilyPeers = others.filter((p) => classifyFamily(p) === family);
  const familyPrices = sameFamilyPeers
    .map((p) => p.price)
    .filter((p): p is number => p != null && Number.isFinite(p));
  return {
    sameModel,
    sameFamily: sameFamilyPeers.length,
    familyMedianPrice: median(familyPrices),
  };
}

function scoreAging(daysOnLot: number): AssetScore {
  const reasons: ScoreReason[] = [];
  let value = clamp((daysOnLot / agingThresholds.hotDays) * 100);

  if (daysOnLot >= agingThresholds.hotDays) {
    reasons.push({
      code: "aging_hot",
      label: "Past hot aging threshold",
      weight: 40,
      evidence: `${daysOnLot} days on lot (≥ ${agingThresholds.hotDays})`,
    });
  } else if (daysOnLot >= agingThresholds.watchDays) {
    reasons.push({
      code: "aging_watch",
      label: "Past watch aging threshold",
      weight: 25,
      evidence: `${daysOnLot} days on lot (≥ ${agingThresholds.watchDays})`,
    });
  } else {
    reasons.push({
      code: "aging_clear",
      label: "Under watch threshold",
      weight: 10,
      evidence: `${daysOnLot} days on lot (< ${agingThresholds.watchDays})`,
    });
  }

  reasons.push({
    code: "aging_days",
    label: "Days on lot",
    weight: Math.min(40, daysOnLot),
    evidence: `firstSeen → ${daysOnLot} days`,
  });

  return {
    key: "aging",
    label: "Aging Score",
    value,
    reasons: sortReasons(reasons),
  };
}

function scorePrice(
  bike: ScoreBikeInput,
  priceHistory: PriceHistoryRow[],
  peers: PeerStats,
  now: Date,
): AssetScore {
  const reasons: ScoreReason[] = [];
  let value = 50;

  const drops = priceHistory.filter(
    (h) =>
      h.previousPrice != null &&
      h.newPrice != null &&
      h.newPrice < h.previousPrice,
  );
  const recentDrops = drops.filter(
    (h) => now.getTime() - h.changedAt.getTime() <= RECENT_DROP_DAYS * DAY_MS,
  );

  if (drops.length === 0) {
    reasons.push({
      code: "price_no_history",
      label: "No recorded price drops",
      weight: 0,
      evidence: "BikePriceHistory has no decreases",
    });
  } else {
    reasons.push({
      code: "price_drop_count",
      label: "Recorded price drops",
      weight: Math.min(25, drops.length * 8),
      evidence: `${drops.length} drop(s) in price history`,
    });
    value += Math.min(25, drops.length * 8);
  }

  if (recentDrops.length > 0) {
    const latest = recentDrops[0]!;
    const pct =
      latest.previousPrice && latest.previousPrice > 0 && latest.newPrice != null
        ? Math.round(
            ((latest.previousPrice - latest.newPrice) / latest.previousPrice) * 100,
          )
        : 0;
    const daysSince = daysBetween(latest.changedAt, now);
    reasons.push({
      code: "price_recent_drop",
      label: "Recent price drop",
      weight: Math.min(30, 10 + pct),
      evidence: `${pct}% drop ${daysSince}d ago (${latest.previousPrice} → ${latest.newPrice})`,
    });
    value += Math.min(30, 10 + pct);
  }

  if (bike.price != null && peers.familyMedianPrice != null) {
    const median = peers.familyMedianPrice;
    const deltaPct = Math.round(((bike.price - median) / median) * 100);
    if (bike.price < median) {
      const boost = Math.min(20, Math.abs(deltaPct));
      reasons.push({
        code: "price_below_lot_median",
        label: "Below in-lot family median",
        weight: boost,
        evidence: `Price $${bike.price} vs family median $${median} (${deltaPct}%)`,
      });
      value += boost;
    } else if (bike.price > median) {
      const pen = Math.min(15, deltaPct);
      reasons.push({
        code: "price_above_lot_median",
        label: "Above in-lot family median",
        weight: -pen,
        evidence: `Price $${bike.price} vs family median $${median} (+${deltaPct}%)`,
      });
      value -= pen;
    } else {
      reasons.push({
        code: "price_at_lot_median",
        label: "At in-lot family median",
        weight: 5,
        evidence: `Price $${bike.price} equals family median`,
      });
    }
  } else if (peers.familyMedianPrice == null) {
    reasons.push({
      code: "price_no_peers",
      label: "No priced family peers on lot",
      weight: 0,
      evidence: "Cannot compare to in-lot median",
    });
  }

  return {
    key: "price",
    label: "Price Score",
    value: clamp(value),
    reasons: sortReasons(reasons),
  };
}

function scoreOpportunity(
  daysOnLot: number,
  hasRecentPriceDrop: boolean,
  status: string,
): AssetScore {
  const value = urgencyScore({ daysOnLot, hasRecentPriceDrop, status });
  const reasons: ScoreReason[] = [
    {
      code: "opp_days",
      label: "Days on lot",
      weight: Math.min(100, daysOnLot),
      evidence: `${daysOnLot} days`,
    },
  ];
  if (hasRecentPriceDrop) {
    reasons.push({
      code: "opp_price_drop",
      label: "Recent price drop",
      weight: 10,
      evidence: "Price decrease within lookback window",
    });
  }
  if (status === "PENDING") {
    reasons.push({
      code: "opp_pending",
      label: "Pending status",
      weight: 5,
      evidence: "status = PENDING",
    });
  }
  if (!hasRecentPriceDrop && status !== "PENDING" && daysOnLot < agingThresholds.watchDays) {
    reasons.push({
      code: "opp_baseline",
      label: "Baseline opportunity from age only",
      weight: daysOnLot,
      evidence: "No pending flag or recent drop",
    });
  }
  return {
    key: "opportunity",
    label: "Opportunity Score",
    value,
    reasons: sortReasons(reasons),
  };
}

const ENRICHMENT_FIELDS: { key: keyof ScoreBikeInput; label: string }[] = [
  { key: "perfectFor", label: "perfectFor" },
  { key: "favoriteFeature", label: "favoriteFeature" },
  { key: "idealRider", label: "idealRider" },
  { key: "thingsToMention", label: "thingsToMention" },
  { key: "thingsToCheck", label: "thingsToCheck" },
  { key: "whyIDLikeIt", label: "whyIDLikeIt" },
  { key: "whoShouldSkipIt", label: "whoShouldSkipIt" },
  { key: "conversationStarter", label: "conversationStarter" },
  { key: "buyingTips", label: "buyingTips" },
  { key: "walkaroundVideoUrl", label: "walkaroundVideoUrl" },
  { key: "seoHeadline", label: "seoHeadline" },
  { key: "seoDescription", label: "seoDescription" },
  { key: "personalHeroImageUrl", label: "personalHeroImageUrl" },
];

function scoreJoe(bike: ScoreBikeInput): AssetScore {
  const reasons: ScoreReason[] = [];
  let value = 0;

  if (bike.joeRating != null) {
    const scaled = Math.round((bike.joeRating / 10) * 45);
    reasons.push({
      code: "joe_rating",
      label: "Joe rating",
      weight: scaled,
      evidence: `joeRating = ${bike.joeRating}/10`,
    });
    value += scaled;
  } else {
    reasons.push({
      code: "joe_rating_missing",
      label: "No Joe rating set",
      weight: 0,
      evidence: "joeRating is null",
    });
  }

  const filled = ENRICHMENT_FIELDS.filter((f) => {
    const v = bike[f.key];
    return typeof v === "string" && v.trim().length > 0;
  });
  const completeness = Math.round((filled.length / ENRICHMENT_FIELDS.length) * 40);
  reasons.push({
    code: "joe_enrichment",
    label: "Enrichment completeness",
    weight: completeness,
    evidence: `${filled.length}/${ENRICHMENT_FIELDS.length} Joe fields filled`,
  });
  value += completeness;

  if (bike.featuredRank > 0) {
    const feat = Math.min(15, bike.featuredRank * 3);
    reasons.push({
      code: "joe_featured",
      label: "Featured rank",
      weight: feat,
      evidence: `featuredRank = ${bike.featuredRank}`,
    });
    value += feat;
  } else {
    reasons.push({
      code: "joe_not_featured",
      label: "Not featured",
      weight: 0,
      evidence: "featuredRank = 0",
    });
  }

  return {
    key: "joe",
    label: "Joe Score",
    value: clamp(value),
    reasons: sortReasons(reasons),
  };
}

function scoreLead(
  leadCount: number,
  analytics: AnalyticsRollup | null,
): AssetScore {
  const reasons: ScoreReason[] = [];
  let value = 0;

  if (leadCount > 0) {
    const w = Math.min(50, leadCount * 15);
    reasons.push({
      code: "lead_form_count",
      label: "Soft leads for this listing",
      weight: w,
      evidence: `${leadCount} lead(s) with source containing /inventory/{id}`,
    });
    value += w;
  } else {
    reasons.push({
      code: "lead_none",
      label: "No listing-linked leads yet",
      weight: 0,
      evidence: "Lead.source match count = 0",
    });
  }

  const contacts = analytics?.contactClicks ?? 0;
  const financing = analytics?.financingOpens ?? 0;

  if (!analytics) {
    reasons.push({
      code: "lead_no_analytics",
      label: "No contact click data yet",
      weight: 0,
      evidence: "BikeAnalytics missing",
    });
  } else {
    if (contacts > 0) {
      const w = Math.min(30, contacts * 8);
      reasons.push({
        code: "lead_contact_clicks",
        label: "Contact clicks",
        weight: w,
        evidence: `contactClicks = ${contacts}`,
      });
      value += w;
    }
    if (financing > 0) {
      const w = Math.min(20, financing * 10);
      reasons.push({
        code: "lead_financing",
        label: "Financing opens",
        weight: w,
        evidence: `financingOpens = ${financing}`,
      });
      value += w;
    }
    if (contacts === 0 && financing === 0 && leadCount === 0) {
      reasons.push({
        code: "lead_insufficient",
        label: "Insufficient lead signals",
        weight: 0,
        evidence: "No leads, contact clicks, or financing opens",
      });
    }
  }

  return {
    key: "lead",
    label: "Lead Score",
    value: clamp(value),
    reasons: sortReasons(reasons),
  };
}

function scoreDemand(analytics: AnalyticsRollup | null): AssetScore {
  const reasons: ScoreReason[] = [];
  if (!analytics) {
    return {
      key: "demand",
      label: "Demand Score",
      value: 50,
      reasons: [
        {
          code: "demand_no_data",
          label: "No view data yet",
          weight: 0,
          evidence: "BikeAnalytics missing — neutral score",
        },
      ],
    };
  }

  let value = 0;
  const add = (code: string, label: string, amount: number, evidence: string) => {
    if (amount <= 0) return;
    reasons.push({ code, label, weight: amount, evidence });
    value += amount;
  };

  add("demand_views", "Detail views", Math.min(30, analytics.views * 2), `views = ${analytics.views}`);
  add(
    "demand_uniques",
    "Unique visitors",
    Math.min(25, analytics.uniqueVisitors * 4),
    `uniqueVisitors = ${analytics.uniqueVisitors}`,
  );
  add(
    "demand_impressions",
    "Inventory impressions",
    Math.min(15, analytics.impressions),
    `impressions = ${analytics.impressions}`,
  );
  add(
    "demand_search",
    "Search hits",
    Math.min(15, analytics.searchHits * 3),
    `searchHits = ${analytics.searchHits}`,
  );
  add("demand_shares", "Shares", Math.min(10, analytics.shares * 5), `shares = ${analytics.shares}`);
  add(
    "demand_favorites",
    "Favorites",
    Math.min(10, analytics.favorites * 5),
    `favorites = ${analytics.favorites}`,
  );

  if (reasons.length === 0) {
    reasons.push({
      code: "demand_zero",
      label: "No on-site interest recorded yet",
      weight: 0,
      evidence: "All demand counters are 0",
    });
    value = 0;
  }

  return {
    key: "demand",
    label: "Demand Score",
    value: clamp(value),
    reasons: sortReasons(reasons),
  };
}

function scoreMarket(peers: PeerStats): AssetScore {
  // Scarcity: fewer same-model / same-family peers → higher score
  const modelScore = peers.sameModel === 0 ? 70 : Math.max(10, 70 - peers.sameModel * 15);
  const familyScore =
    peers.sameFamily === 0 ? 30 : Math.max(5, 30 - Math.min(25, peers.sameFamily * 3));
  const value = clamp(modelScore + familyScore);
  const reasons: ScoreReason[] = [
    {
      code: "market_same_model",
      label: "Same model on live floor",
      weight: modelScore,
      evidence: `${peers.sameModel} other bike(s) with same model`,
    },
    {
      code: "market_same_family",
      label: "Same family on live floor",
      weight: familyScore,
      evidence: `${peers.sameFamily} other bike(s) in same family`,
    },
  ];
  return {
    key: "market",
    label: "Market Score",
    subtitle: "Lot position",
    value,
    reasons: sortReasons(reasons),
  };
}

function scoreCompetition(peers: PeerStats): AssetScore {
  // Lower peers → higher score
  const peerCount = peers.sameFamily;
  let value: number;
  if (peerCount === 0) value = 95;
  else if (peerCount <= 2) value = 75;
  else if (peerCount <= 5) value = 55;
  else if (peerCount <= 10) value = 35;
  else value = 20;

  const reasons: ScoreReason[] = [
    {
      code: "comp_family_peers",
      label: "On-lot family peers",
      weight: value,
      evidence: `${peerCount} other live bike(s) in same family`,
    },
    {
      code: "comp_model_peers",
      label: "On-lot same-model peers",
      weight: Math.max(5, 40 - peers.sameModel * 10),
      evidence: `${peers.sameModel} other bike(s) with same model`,
    },
  ];

  return {
    key: "competition",
    label: "Competition Score",
    subtitle: "On-lot peers",
    value: clamp(value),
    reasons: sortReasons(reasons),
  };
}

/**
 * Pure rule-based scorecard. Reasons cite only real inputs — never external market data.
 */
export function scoreBikeAsset(input: {
  bike: ScoreBikeInput;
  priceHistory: PriceHistoryRow[];
  analytics: AnalyticsRollup | null;
  leadCountForBike: number;
  peers: PeerStats;
  now?: Date;
}): AssetScorecard {
  const now = input.now ?? new Date();
  const daysOnLot = daysBetween(input.bike.firstSeenAt, now);
  const recentDrop = input.priceHistory.some(
    (h) =>
      now.getTime() - h.changedAt.getTime() <= RECENT_DROP_DAYS * DAY_MS &&
      h.previousPrice != null &&
      h.newPrice != null &&
      h.newPrice < h.previousPrice,
  );

  const scores: AssetScore[] = [
    scoreAging(daysOnLot),
    scorePrice(input.bike, input.priceHistory, input.peers, now),
    scoreOpportunity(daysOnLot, recentDrop, input.bike.status),
    scoreJoe(input.bike),
    scoreLead(input.leadCountForBike, input.analytics),
    scoreDemand(input.analytics),
    scoreMarket(input.peers),
    scoreCompetition(input.peers),
  ];

  const composite = clamp(
    scores.reduce((sum, s) => sum + s.value, 0) / scores.length,
  );

  return {
    bikeId: input.bike.id,
    computedAt: now,
    scores,
    composite,
  };
}

export function getScore(
  card: AssetScorecard,
  key: string,
): AssetScore | undefined {
  return card.scores.find((s) => s.key === key);
}
