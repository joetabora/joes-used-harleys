import type { Prisma } from "@/generated/prisma/client";

/** Public inventory visibility — never show hidden bikes. */
export const publicBikeWhere: Prisma.BikeWhereInput = {
  hidden: false,
  status: { in: ["AVAILABLE", "PENDING"] },
};

export const publicBikeOrderBy: Prisma.BikeOrderByWithRelationInput[] = [
  { featuredRank: "desc" },
  { firstSeenAt: "desc" },
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function isNewArrival(firstSeenAt: Date, withinDays = 14): boolean {
  return Date.now() - firstSeenAt.getTime() <= withinDays * DAY_MS;
}

export function isRecentlySold(soldAt: Date | null | undefined, withinDays = 30): boolean {
  if (!soldAt) return false;
  return Date.now() - soldAt.getTime() <= withinDays * DAY_MS;
}

export function hasRecentPriceDrop(
  history: { previousPrice: number | null; newPrice: number | null; changedAt: Date }[],
  withinDays = 30,
): boolean {
  const cutoff = Date.now() - withinDays * DAY_MS;
  return history.some(
    (h) =>
      h.changedAt.getTime() >= cutoff &&
      h.previousPrice != null &&
      h.newPrice != null &&
      h.newPrice < h.previousPrice,
  );
}
