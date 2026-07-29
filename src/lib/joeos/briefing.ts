import {
  agingThresholds,
  leadStaleDays,
} from "@/design-system/spacing";

export type Severity = "hot" | "watch" | "ok";

export type InventoryFamily =
  | "Sportster"
  | "Softail"
  | "Touring"
  | "Trike"
  | "Other";

export type BriefingBike = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number | null;
  firstSeenAt: Date;
  category: string | null;
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

export function classifyFamily(bike: {
  model: string;
  category: string | null;
}): InventoryFamily {
  const hay = `${bike.category ?? ""} ${bike.model}`.toLowerCase();
  if (/tri\s?glide|trike|freewheeler/.test(hay)) return "Trike";
  if (
    /sportster|iron\s?883|forty[- ]?eight|nightster|xl1200|xl883/.test(hay) &&
    !/softail/.test(hay)
  ) {
    return "Sportster";
  }
  if (
    /road\s?glide|street\s?glide|ultra|electra|touring|cvo.*glide/.test(hay)
  ) {
    return "Touring";
  }
  if (
    /softail|fat\s?boy|low\s?rider|heritage|breakout|street\s?bob|deluxe|fat\s?bob/.test(
      hay,
    )
  ) {
    return "Softail";
  }
  return "Other";
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
    aging.sort((a, b) => {
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

  const missions: MorningBriefing["missions"] = [];
  if (agingBikeCount > 0) {
    missions.push({
      label: "Move aging inventory",
      count: agingBikeCount,
      detail: `${agingBikeCount} bike${agingBikeCount === 1 ? "" : "s"} need attention`,
    });
  }
  if (potentialRevenue > 0) {
    missions.push({
      label: "Revenue at risk",
      count: potentialRevenue,
      detail: "Aging inventory dollar value",
    });
  }
  if (staleLeadCount > 0) {
    missions.push({
      label: "Follow up",
      count: staleLeadCount,
      detail: `${staleLeadCount} customer${staleLeadCount === 1 ? "" : "s"} waiting`,
    });
  }
  if (priorityBike) {
    missions.push({
      label: "Priority bike",
      count: 1,
      detail: `${priorityBike.label} — ${priorityBike.reason}`,
    });
  }

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
  };
}
