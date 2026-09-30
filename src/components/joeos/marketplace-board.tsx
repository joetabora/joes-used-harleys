"use client";

import { useMemo, useState } from "react";
import { formatMiles, formatPrice } from "@/lib/format";
import {
  JosBody,
  JosData,
  JosField,
  JosInput,
  JosItem,
  JosSectionHeader,
  JosSelect,
} from "@/components/joeos/ui";
import {
  MarketplaceWorkspace,
  validMarketplacePhotos,
  type MarketplaceBikeCard,
} from "@/components/joeos/marketplace-workspace";

export type { MarketplaceBikeCard };

type PostStatus = "NOT_POSTED" | "POSTED";
type StatusFilter = "all" | "not_posted" | "posted";
type SortMode = "newest" | "price_asc" | "price_desc" | "miles_asc";

function GridCard({
  bike,
  posted,
  onOpen,
}: {
  bike: MarketplaceBikeCard;
  posted: boolean;
  onOpen: () => void;
}) {
  const photos = validMarketplacePhotos(bike.photos);
  const hero = photos[0] ?? null;
  const label = `${bike.year} ${bike.make} ${bike.model}`;
  const missingPrice = bike.price == null;
  const missingMileage = bike.mileage == null;
  const missingPhotos = photos.length === 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="jos-asset-tile text-left"
    >
      <div className="aspect-[4/3] bg-[var(--jos-void-deep)]">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero} alt={label} />
        ) : (
          <div className="flex h-full items-center justify-center jos-label">
            No photo
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="jos-chip" data-active={posted ? "true" : "false"}>
            {posted ? "POSTED" : "NOT POSTED"}
          </span>
        </div>
        {(missingPrice || missingMileage || missingPhotos) && (
          <div className="flex flex-wrap gap-1 text-[10px] text-[var(--jos-warn)]">
            {missingPrice ? <span>⚠ PRICE</span> : null}
            {missingMileage ? <span>⚠ MILES</span> : null}
            {missingPhotos ? <span>⚠ PHOTOS</span> : null}
          </div>
        )}
        <JosData>{bike.year}</JosData>
        <JosItem className="text-sm leading-tight">
          {bike.make} {bike.model}
        </JosItem>
        {bike.stockNumber ? <JosData>Stock {bike.stockNumber}</JosData> : null}
        <JosData>{formatMiles(bike.mileage)}</JosData>
        <JosData className="mt-auto pt-1 text-[var(--jos-orange)]">
          {formatPrice(bike.price)}
        </JosData>
      </div>
    </button>
  );
}

/** Next bike: prefer next NOT_POSTED after current; wrap; else next in list. */
export function resolveNextBikeId(
  list: { id: string }[],
  currentId: string,
  postedIds: Record<string, PostStatus>,
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

  // All others posted (or single bike) — advance to next in order
  const next = list[(idx + 1) % list.length];
  return next && next.id !== currentId ? next.id : null;
}

export function MarketplaceBoard({ bikes }: { bikes: MarketplaceBikeCard[] }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortMode>("newest");
  const [postedIds, setPostedIds] = useState<Record<string, PostStatus>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = bikes.filter((b) => {
      const status: PostStatus = postedIds[b.id] ?? "NOT_POSTED";
      if (statusFilter === "posted" && status !== "POSTED") return false;
      if (statusFilter === "not_posted" && status !== "NOT_POSTED") return false;
      if (!needle) return true;
      const hay = [String(b.year), b.make, b.model, b.stockNumber ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });

    list = [...list].sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(b.firstSeenAt).getTime() - new Date(a.firstSeenAt).getTime()
        );
      }
      if (sort === "price_asc" || sort === "price_desc") {
        const ap = a.price;
        const bp = b.price;
        if (ap == null && bp == null) return 0;
        if (ap == null) return 1;
        if (bp == null) return -1;
        return sort === "price_asc" ? ap - bp : bp - ap;
      }
      const am = a.mileage;
      const bm = b.mileage;
      if (am == null && bm == null) return 0;
      if (am == null) return 1;
      if (bm == null) return -1;
      return am - bm;
    });

    return list;
  }, [bikes, q, statusFilter, sort, postedIds]);

  const activeBike = activeId
    ? (bikes.find((b) => b.id === activeId) ?? null)
    : null;

  function openBike(id: string) {
    setActiveId(id);
  }

  function goNext() {
    if (!activeId) return;
    const nextId = resolveNextBikeId(filtered, activeId, postedIds);
    if (nextId) setActiveId(nextId);
  }

  return (
    <div className="jos-stack-section">
      <JosSectionHeader
        section="Marketplace"
        title="Facebook Marketplace"
        action={
          <JosData>
            {filtered.length} of {bikes.length} bikes
          </JosData>
        }
      />
      <JosBody className="max-w-xl text-sm -mt-2">
        Used Harley-Davidson inventory ready for manual Marketplace posting.
        Click a bike to open the posting workspace.
      </JosBody>

      <div className="jos-panel jos-pad flex flex-wrap gap-3">
        <JosField label="Search" htmlFor="mkt-q" className="min-w-[12rem] flex-1">
          <JosInput
            id="mkt-q"
            placeholder="Year, make, model, stock…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </JosField>
        <JosField label="Status" htmlFor="mkt-status">
          <JosSelect
            id="mkt-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="not_posted">Not Posted</option>
            <option value="posted">Posted</option>
          </JosSelect>
        </JosField>
        <JosField label="Sort" htmlFor="mkt-sort">
          <JosSelect
            id="mkt-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price low → high</option>
            <option value="price_desc">Price high → low</option>
            <option value="miles_asc">Mileage low → high</option>
          </JosSelect>
        </JosField>
      </div>

      {filtered.length === 0 ? (
        <JosBody className="text-sm">No bikes match these filters.</JosBody>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((bike) => (
            <GridCard
              key={bike.id}
              bike={bike}
              posted={(postedIds[bike.id] ?? "NOT_POSTED") === "POSTED"}
              onOpen={() => openBike(bike.id)}
            />
          ))}
        </div>
      )}

      <MarketplaceWorkspace
        bike={activeBike}
        open={Boolean(activeId && activeBike)}
        posted={
          activeId
            ? (postedIds[activeId] ?? "NOT_POSTED") === "POSTED"
            : false
        }
        onOpenChange={(open) => {
          if (!open) setActiveId(null);
        }}
        onMarkPosted={() => {
          if (!activeId) return;
          setPostedIds((prev) => ({ ...prev, [activeId]: "POSTED" }));
        }}
        onMarkNotPosted={() => {
          if (!activeId) return;
          setPostedIds((prev) => ({ ...prev, [activeId]: "NOT_POSTED" }));
        }}
        onNextBike={goNext}
      />
    </div>
  );
}
