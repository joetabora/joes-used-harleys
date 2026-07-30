import {
  agingThresholds,
  leadStaleDays,
} from "@/design-system/spacing";
import {
  classifyFamily,
  type InventoryFamily,
} from "@/lib/bike-family";

export type { InventoryFamily };
export { classifyFamily };

export type Severity = "hot" | "watch" | "ok";

export type BriefingBike = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number | null;
  firstSeenAt: Date;
  category: string | null;
  mileage?: number | null;
  status?: string;
  photoUrl?: string | null;
  hasRecentPriceDrop?: boolean;
  previousPrice?: number | null;
  priceChangedAt?: Date | null;
};

export type FloorBike = BriefingBike & {
  mileage: number | null;
  status: string;
  photoUrl: string | null;
  daysOnLot: number;
  severity: Severity;
  urgency: number;
};

export type SalesIntelligence = {
  headline: string;
  reasons: string[];
  href: string | null;
  bikeLabel: string | null;
};

export type BriefingLead = {
  id: string;
  name: string;
  notes: string | null;
  status: string;
  createdAt: Date;
  lastInteractionAt: Date | null;
};

export type HotAction =
  | {
      kind: "bike";
      id: string;
      href: string;
      title: string;
      detail: string;
      severity: Severity;
      daysOnLot: number;
      price: number | null;
    }
  | {
      kind: "lead";
      id: string;
      href: string;
      title: string;
      detail: string;
      severity: Severity;
      daysSinceContact: number;
    }
  | {
      kind: "sync";
      id: string;
      href: string;
      title: string;
      detail: string;
      severity: "hot";
    };

export type RadarBucket = {
  family: InventoryFamily;
  total: number;
  aging: number;
  fillPercent: number;
  severity: Severity;
};

export type MorningBriefing = {
  generatedAt: Date;
  greeting: string;
  displayName: string;
  dateLabel: string;
  missions: { label: string; count: number; detail: string }[];
  potentialRevenue: number;
  hotActions: HotAction[];
  radar: RadarBucket[];
  priorityBike: {
    id: string;
    label: string;
    daysOnLot: number;
    reason: string;
    href: string;
  } | null;
  commandBrief: string;
  syncStatus: "ok" | "failed" | "unknown";
  liveBikeCount: number;
  staleLeadCount: number;
  agingBikeCount: number;
  salesIntelligence: SalesIntelligence;
};

export function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export function bikeSeverity(daysOnLot: number): Severity {
  if (daysOnLot >= agingThresholds.hotDays) return "hot";
  if (daysOnLot >= agingThresholds.watchDays) return "watch";
  return "ok";
}

/** Honest 0–100 score from days on lot + real signals only. */
export function urgencyScore(input: {
  daysOnLot: number;
  hasRecentPriceDrop?: boolean;
  status?: string;
}): number {
  let score = input.daysOnLot;
  if (input.hasRecentPriceDrop) score += 10;
  if (input.status === "PENDING") score += 5;
  return Math.min(100, Math.max(0, score));
}

export function severityLabel(severity: Severity): string {
  if (severity === "hot") return "HOT";
  if (severity === "watch") return "WATCH";
  return "CLEAR";
}

export function toFloorBike(bike: BriefingBike, now: Date): FloorBike {
  const daysOnLot = daysBetween(bike.firstSeenAt, now);
  const severity = bikeSeverity(daysOnLot);
  return {
    ...bike,
    mileage: bike.mileage ?? null,
    status: bike.status ?? "AVAILABLE",
    photoUrl: bike.photoUrl ?? null,
    daysOnLot,
    severity,
    urgency: urgencyScore({
      daysOnLot,
      hasRecentPriceDrop: bike.hasRecentPriceDrop,
      status: bike.status,
    }),
  };
}

export function buildSalesIntelligence(input: {
  priorityBike: MorningBriefing["priorityBike"];
  staleLeadCount: number;
  agingBikeCount: number;
  priceDropNote?: string | null;
}): SalesIntelligence {
  const reasons: string[] = [];
  if (input.priorityBike) {
    reasons.push(
      `${input.priorityBike.daysOnLot} days on lot — review pricing and placement.`,
    );
  }
  if (input.priceDropNote) {
    reasons.push(input.priceDropNote);
  }
  if (input.staleLeadCount > 0) {
    reasons.push(
      `${input.staleLeadCount} customer${input.staleLeadCount === 1 ? "" : "s"} waiting ≥${leadStaleDays} days without contact.`,
    );
  }
  if (input.agingBikeCount > 1 && input.priorityBike) {
    reasons.push(
      `${input.agingBikeCount} bikes total past watch threshold on the floor.`,
    );
  }

  if (!input.priorityBike && input.staleLeadCount === 0) {
    return {
      headline: "No urgent queue — engine clear",
      reasons: [
        "No aging inventory or stale leads right now. Keep the feed healthy and stay ready for the next inquiry.",
      ],
      href: "/admin/bikes",
      bikeLabel: null,
    };
  }

  if (input.priorityBike) {
    return {
      headline: `Highest attention: ${input.priorityBike.label}`,
      reasons:
        reasons.length > 0
          ? reasons
          : [`${input.priorityBike.reason} — review pricing.`],
      href: input.priorityBike.href,
      bikeLabel: input.priorityBike.label,
    };
  }

  return {
    headline: "Follow-up queue needs attention",
    reasons,
    href: "/admin/leads",
    bikeLabel: null,
  };
}

export function timeOfDayGreeting(now: Date): string {
  const hour = now.getHours();
  if (hour < 12) return "GOOD MORNING";
  if (hour < 17) return "GOOD AFTERNOON";
  return "GOOD EVENING";
}

export function displayNameFromEmail(email: string | null | undefined): string {
  if (process.env.ADMIN_DISPLAY_NAME?.trim()) {
    return process.env.ADMIN_DISPLAY_NAME.trim().toUpperCase();
  }
  if (!email) return "JOE";
  const local = email.split("@")[0] ?? "joe";
  const first = local.split(/[._-]/)[0] ?? local;
  return first.toUpperCase() || "JOE";
}

export function buildRadar(bikes: BriefingBike[], now: Date): RadarBucket[] {
  const families: InventoryFamily[] = [
    "Sportster",
    "Softail",
    "Touring",
    "Trike",
    "Other",
  ];
  const map = new Map<InventoryFamily, { total: number; aging: number }>();
  for (const f of families) map.set(f, { total: 0, aging: 0 });

  for (const bike of bikes) {
    const family = classifyFamily(bike);
    const entry = map.get(family)!;
    entry.total += 1;
    const days = daysBetween(bike.firstSeenAt, now);
    if (bikeSeverity(days) !== "ok") entry.aging += 1;
  }

  return families
    .map((family) => {
      const { total, aging } = map.get(family)!;
      const fillPercent = total === 0 ? 0 : Math.round((aging / total) * 100);
      let severity: Severity = "ok";
      if (fillPercent >= 50 || (aging > 0 && aging / total >= 0.4)) severity = "hot";
      else if (aging > 0) severity = "watch";
      return { family, total, aging, fillPercent, severity };
    })
    .filter((b) => b.total > 0);
}

export function buildHotActions(input: {
  bikes: BriefingBike[];
  leads: BriefingLead[];
  syncFailed: boolean;
  now: Date;
  limit?: number;
}): HotAction[] {
  const limit = input.limit ?? 8;
  const actions: HotAction[] = [];

  if (input.syncFailed) {
    actions.push({
      kind: "sync",
      id: "sync-failed",
      href: "/admin/sync",
      title: "Inventory sync failed",
      detail: "Last run did not succeed — check Sync",
      severity: "hot",
    });
  }

  const agingBikes = input.bikes
    .map((bike) => {
      const daysOnLot = daysBetween(bike.firstSeenAt, input.now);
      return { bike, daysOnLot, severity: bikeSeverity(daysOnLot) };
    })
    .filter((x) => x.severity !== "ok")
    .sort((a, b) => b.daysOnLot - a.daysOnLot);

  for (const { bike, daysOnLot, severity } of agingBikes) {
    actions.push({
      kind: "bike",
      id: bike.id,
      href: `/admin/bikes/${bike.id}`,
      title: `${bike.year} ${bike.model}`,
      detail: `${daysOnLot} days on lot · Price review recommended`,
      severity,
      daysOnLot,
      price: bike.price,
    });
  }

  const staleLeads = input.leads
    .map((lead) => {
      const anchor = lead.lastInteractionAt ?? lead.createdAt;
      const daysSinceContact = daysBetween(anchor, input.now);
      return { lead, daysSinceContact };
    })
    .filter((x) => {
      if (x.lead.status === "CLOSED") return false;
      if (!x.lead.lastInteractionAt && x.lead.status === "NEW") return true;
      return x.daysSinceContact >= leadStaleDays;
    })
    .sort((a, b) => b.daysSinceContact - a.daysSinceContact);

  for (const { lead, daysSinceContact } of staleLeads) {
    const note = lead.notes?.trim();
    const detail = note
      ? `${note.slice(0, 80)}${note.length > 80 ? "…" : ""} · No contact in ${daysSinceContact} day${daysSinceContact === 1 ? "" : "s"}`
      : `No contact in ${daysSinceContact} day${daysSinceContact === 1 ? "" : "s"}`;
    actions.push({
      kind: "lead",
      id: lead.id,
      href: `/admin/leads/${lead.id}`,
      title: lead.name,
      detail,
      severity: daysSinceContact >= 7 ? "hot" : "watch",
      daysSinceContact,
    });
  }

  const severityRank = { hot: 0, watch: 1, ok: 2 };
  return actions
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity])
    .slice(0, limit);
}

export function buildCommandBrief(input: {
  agingBikeCount: number;
  staleLeadCount: number;
  priorityBike: MorningBriefing["priorityBike"];
}): string {
  const parts: string[] = [];
  if (input.staleLeadCount > 0) {
    parts.push(
      `follow up with ${input.staleLeadCount} waiting lead${input.staleLeadCount === 1 ? "" : "s"}`,
    );
  }
  if (input.priorityBike) {
    parts.push(
      `review pricing on ${input.priorityBike.label} (${input.priorityBike.daysOnLot} days on lot)`,
    );
  } else if (input.agingBikeCount > 0) {
    parts.push(
      `move ${input.agingBikeCount} aging bike${input.agingBikeCount === 1 ? "" : "s"}`,
    );
  }

  if (parts.length === 0) {
    return "Engine is clear — no aging inventory or stale leads right now. Keep sync healthy and stay ready for the next inquiry.";
  }

  if (parts.length === 1) {
    return `Your best move today: ${parts[0]}.`;
  }
  return `Your best move today: ${parts[0]}, then ${parts[1]}.`;
}

export function assembleBriefing(input: {
  bikes: BriefingBike[];
  leads: BriefingLead[];
  syncFailed: boolean;
  now?: Date;
  email?: string | null;
}): MorningBriefing {
  const now = input.now ?? new Date();
  const displayName = displayNameFromEmail(input.email);
  const greeting = timeOfDayGreeting(now);

  const aging = input.bikes
    .map((bike) => ({
      bike,
      daysOnLot: daysBetween(bike.firstSeenAt, now),
      severity: bikeSeverity(daysBetween(bike.firstSeenAt, now)),
    }))
    .filter((x) => x.severity !== "ok");

  const agingBikeCount = aging.length;
  const potentialRevenue = aging.reduce((sum, x) => sum + (x.bike.price ?? 0), 0);

  const staleLeadCount = input.leads.filter((lead) => {
    if (lead.status === "CLOSED") return false;
    const anchor = lead.lastInteractionAt ?? lead.createdAt;
    const days = daysBetween(anchor, now);
    if (!lead.lastInteractionAt && lead.status === "NEW") return true;
    return days >= leadStaleDays;
  }).length;

  const priority =
    [...aging].sort((a, b) => {
      if (b.daysOnLot !== a.daysOnLot) return b.daysOnLot - a.daysOnLot;
      return (b.bike.price ?? 0) - (a.bike.price ?? 0);
    })[0] ?? null;

  const priorityBike = priority
    ? {
        id: priority.bike.id,
        label: `${priority.bike.year} ${priority.bike.model}`,
        daysOnLot: priority.daysOnLot,
        reason: `${priority.daysOnLot} days on lot`,
        href: `/admin/bikes/${priority.bike.id}`,
      }
    : null;

  const hotActions = buildHotActions({
    bikes: input.bikes,
    leads: input.leads,
    syncFailed: input.syncFailed,
    now,
  });

  // Today's Mission — 3 chips max (bikes / leads / $). No appointments.
  const missions: MorningBriefing["missions"] = [];
  if (agingBikeCount > 0) {
    missions.push({
      label: "Bikes need attention",
      count: agingBikeCount,
      detail: `${agingBikeCount} motorcycle${agingBikeCount === 1 ? "" : "s"} past watch`,
    });
  }
  if (staleLeadCount > 0) {
    missions.push({
      label: "Customers require follow up",
      count: staleLeadCount,
      detail: `${staleLeadCount} waiting in pipeline`,
    });
  }
  if (potentialRevenue > 0) {
    missions.push({
      label: "Potential pipeline",
      count: potentialRevenue,
      detail: "Aging inventory dollar value",
    });
  }

  let priceDropNote: string | null = null;
  if (priority?.bike.hasRecentPriceDrop && priority.bike.previousPrice != null) {
    const when = priority.bike.priceChangedAt
      ? priority.bike.priceChangedAt.toLocaleDateString("en-US")
      : "recently";
    priceDropNote = `Price reduced ${when} from $${priority.bike.previousPrice.toLocaleString("en-US")} to $${(priority.bike.price ?? 0).toLocaleString("en-US")}.`;
  }

  const salesIntelligence = buildSalesIntelligence({
    priorityBike,
    staleLeadCount,
    agingBikeCount,
    priceDropNote,
  });

  return {
    generatedAt: now,
    greeting,
    displayName,
    dateLabel: now.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    missions,
    potentialRevenue,
    hotActions,
    radar: buildRadar(input.bikes, now),
    priorityBike,
    commandBrief: buildCommandBrief({
      agingBikeCount,
      staleLeadCount,
      priorityBike,
    }),
    syncStatus: input.syncFailed ? "failed" : "ok",
    liveBikeCount: input.bikes.length,
    staleLeadCount,
    agingBikeCount,
    salesIntelligence,
  };
}
