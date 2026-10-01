export type MarketplacePostStatus = "NOT_POSTED" | "POSTED";

export function initialPostedIds(
  bikes: { id: string; marketplacePosted: boolean }[],
): Record<string, MarketplacePostStatus> {
  const map: Record<string, MarketplacePostStatus> = {};
  for (const bike of bikes) {
    if (bike.marketplacePosted) map[bike.id] = "POSTED";
  }
  return map;
}

/** Next bike: prefer next NOT_POSTED after current; wrap; else next in order. */
export function resolveNextBikeId(
  list: { id: string }[],
  currentId: string,
  postedIds: Record<string, MarketplacePostStatus>,
): string | null {
  if (list.length === 0) return null;
  const idx = list.findIndex((b) => b.id === currentId);
  if (idx < 0) return list[0]?.id ?? null;

  for (let step = 1; step <= list.length; step++) {
    const candidate = list[(idx + step) % list.length];
    if (!candidate) continue;
    if (candidate.id === currentId) continue;
    const status = postedIds[candidate.id] ?? "NOT_POSTED";
    if (status === "NOT_POSTED") return candidate.id;
  }

  const next = list[(idx + 1) % list.length];
  return next && next.id !== currentId ? next.id : null;
}
