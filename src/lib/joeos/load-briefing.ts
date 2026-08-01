import {
  assembleBriefing,
  toFloorBike,
  type BriefingBike,
  type BriefingLead,
  type FloorBike,
} from "@/lib/joeos/briefing";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

const RECENT_DROP_DAYS = 30;

function mapBikeRow(bike: {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number | null;
  firstSeenAt: Date;
  category: string | null;
  mileage: number | null;
  status: string;
  photos: string[];
  personalHeroImageUrl: string | null;
  stockNumber: string | null;
  priceHistory: { previousPrice: number | null; newPrice: number | null; changedAt: Date }[];
}): BriefingBike {
  const last = bike.priceHistory[0] ?? null;
  const hasRecentPriceDrop = Boolean(
    last &&
      last.previousPrice != null &&
      last.newPrice != null &&
      last.newPrice < last.previousPrice &&
      last.changedAt.getTime() >= Date.now() - RECENT_DROP_DAYS * 86400000,
  );

  return {
    id: bike.id,
    year: bike.year,
    make: bike.make,
    model: bike.model,
    price: bike.price,
    firstSeenAt: bike.firstSeenAt,
    category: bike.category,
    mileage: bike.mileage,
    status: bike.status,
    photoUrl: bike.personalHeroImageUrl || bike.photos[0] || null,
    stockNumber: bike.stockNumber,
    hasRecentPriceDrop,
    previousPrice: hasRecentPriceDrop ? last?.previousPrice ?? null : null,
    priceChangedAt: hasRecentPriceDrop ? last?.changedAt ?? null : null,
  };
}

async function loadLiveBikes(): Promise<BriefingBike[]> {
  if (!prisma) return [];
  const since = new Date(Date.now() - RECENT_DROP_DAYS * 86400000);
  const bikes = await prisma.bike.findMany({
    where: {
      hidden: false,
      status: { in: ["AVAILABLE", "PENDING"] },
    },
    select: {
      id: true,
      year: true,
      make: true,
      model: true,
      price: true,
      firstSeenAt: true,
      category: true,
      mileage: true,
      status: true,
      photos: true,
      personalHeroImageUrl: true,
      stockNumber: true,
      priceHistory: {
        where: { changedAt: { gte: since } },
        orderBy: { changedAt: "desc" },
        take: 1,
        select: { previousPrice: true, newPrice: true, changedAt: true },
      },
    },
    orderBy: [{ featuredRank: "desc" }, { lastSeenAt: "desc" }],
  });
  return bikes.map(mapBikeRow);
}

export async function loadMorningBriefing(email?: string | null) {
  if (!isDatabaseConfigured() || !prisma) {
    return {
      ready: false as const,
      briefing: assembleBriefing({
        bikes: [],
        leads: [],
        syncFailed: false,
        email,
      }),
    };
  }

  const [bikes, leads, latestSync] = await Promise.all([
    loadLiveBikes(),
    prisma.lead.findMany({
      where: { status: { in: ["NEW", "CONTACTED"] } },
      select: {
        id: true,
        name: true,
        notes: true,
        status: true,
        createdAt: true,
        interactions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { createdAt: true },
        },
      },
      take: 200,
    }),
    prisma.syncLog.findFirst({
      where: { dryRun: false },
      orderBy: { startedAt: "desc" },
      select: { status: true },
    }),
  ]);

  const briefingLeads: BriefingLead[] = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    notes: lead.notes,
    status: lead.status,
    createdAt: lead.createdAt,
    lastInteractionAt: lead.interactions[0]?.createdAt ?? null,
  }));

  return {
    ready: true as const,
    briefing: assembleBriefing({
      bikes,
      leads: briefingLeads,
      syncFailed: latestSync?.status === "FAILED",
      email,
    }),
  };
}

export async function loadFloorInventory(): Promise<{
  ready: boolean;
  bikes: FloorBike[];
}> {
  if (!isDatabaseConfigured() || !prisma) {
    return { ready: false, bikes: [] };
  }
  const now = new Date();
  const bikes = await loadLiveBikes();
  return {
    ready: true,
    bikes: bikes.map((b) => toFloorBike(b, now)),
  };
}
