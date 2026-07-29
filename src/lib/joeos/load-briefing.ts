import { assembleBriefing, type BriefingBike, type BriefingLead } from "@/lib/joeos/briefing";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

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
    prisma.bike.findMany({
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
      },
    }),
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

  const briefingBikes: BriefingBike[] = bikes;
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
      bikes: briefingBikes,
      leads: briefingLeads,
      syncFailed: latestSync?.status === "FAILED",
      email,
    }),
  };
}
