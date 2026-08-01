"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { ImpressionTracker } from "@/components/analytics/impression-tracker";
import { BikeCard, type BikeCardData } from "@/components/bike-card";
import { track } from "@/lib/analytics/client";
import {
  defaultFilters,
  filterBikes,
  filtersAreActive,
  filtersToSearchParams,
  inventoryBounds,
  parseFiltersFromSearchParams,
  sortBikes,
  type FilterableBike,
  type InventoryFilters,
  type InventorySort,
} from "@/lib/inventory-filters";

const FAMILY_OPTIONS = [
  "Touring",
  "Softail",
  "Sportster",
  "Trike",
  "Other",
] as const;

export type InventoryBrowserBike = BikeCardData &
  Pick<FilterableBike, "category" | "title" | "featuredRank" | "firstSeenAt">;

const fieldClass =
  "w-full border border-chrome/25 bg-asphalt px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-steel/60 focus:border-lamp";

const labelClass = "font-label mb-1.5 block text-steel";

function emptyNum(raw: string): number | null {
  if (raw.trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

export function InventoryBrowser({ bikes }: { bikes: InventoryBrowserBike[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<InventoryFilters>(() =>
    parseFiltersFromSearchParams(searchParams),
  );
  /** Collapsed by default on small screens so sticky filters don't cover the list. */
  const [filtersOpen, setFiltersOpen] = useState(false);
  const analyticsReady = useRef(false);

  useEffect(() => {
    setFilters(parseFiltersFromSearchParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!analyticsReady.current) {
      analyticsReady.current = true;
      return;
    }
    const t = window.setTimeout(() => {
      const q = filters.q.trim();
      if (q.length >= 2) {
        track({
          type: "SEARCH_QUERY",
          query: q,
          path: pathname,
          filters: { ...filters },
        });
      }
      if (filtersAreActive(filters)) {
        track({
          type: "FILTER_USAGE",
          path: pathname,
          query: q || null,
          filters: { ...filters },
        });
      }
    }, 600);
    return () => window.clearTimeout(t);
  }, [filters, pathname]);

  const bounds = useMemo(() => inventoryBounds(bikes), [bikes]);

  const syncUrl = useCallback(
    (next: InventoryFilters) => {
      const qs = filtersToSearchParams(next).toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const update = useCallback(
    (patch: Partial<InventoryFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl],
  );

  const clear = useCallback(() => {
    setFilters(defaultFilters);
    syncUrl(defaultFilters);
  }, [syncUrl]);

  const visible = useMemo(
    () => sortBikes(filterBikes(bikes, filters), filters.sort),
    [bikes, filters],
  );

  const active = filtersAreActive(filters);

  return (
    <div className="space-y-5">
      <div className="joe-panel sticky top-0 z-20 space-y-4 border-chrome/30 bg-void/95 p-4 backdrop-blur-md md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-label text-lamp">Filter floor</p>
            <p className="mt-1 text-sm text-steel">
              {visible.length} of {bikes.length} bike{bikes.length === 1 ? "" : "s"}
              {active ? " · filters on" : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {active ? (
              <button
                type="button"
                onClick={clear}
                className="font-label text-lamp underline-offset-4 hover:underline"
              >
                Clear
              </button>
            ) : null}
            <button
              type="button"
              className="joe-btn-secondary inline-flex items-center gap-2 md:hidden"
              aria-expanded={filtersOpen}
              aria-controls="inventory-filter-fields"
              onClick={() => setFiltersOpen((o) => !o)}
            >
              {filtersOpen ? "Hide filters" : "Filters"}
              <ChevronDown
                className={`size-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          </div>
        </div>

        <div
          id="inventory-filter-fields"
          className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 ${
            filtersOpen ? "grid" : "hidden md:grid"
          }`}
        >
          <div className="sm:col-span-2 xl:col-span-2">
            <label htmlFor="inv-q" className={labelClass}>
              Search
            </label>
            <input
              id="inv-q"
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Year, make, model, stock…"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="inv-year-min" className={labelClass}>
              Year min
            </label>
            <input
              id="inv-year-min"
              type="number"
              inputMode="numeric"
              min={bounds.yearMin}
              max={bounds.yearMax}
              placeholder={String(bounds.yearMin)}
              value={filters.yearMin ?? ""}
              onChange={(e) => update({ yearMin: emptyNum(e.target.value) })}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="inv-year-max" className={labelClass}>
              Year max
            </label>
            <input
              id="inv-year-max"
              type="number"
              inputMode="numeric"
              min={bounds.yearMin}
              max={bounds.yearMax}
              placeholder={String(bounds.yearMax)}
              value={filters.yearMax ?? ""}
              onChange={(e) => update({ yearMax: emptyNum(e.target.value) })}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="inv-price-min" className={labelClass}>
              Price min
            </label>
            <input
              id="inv-price-min"
              type="number"
              inputMode="numeric"
              min={0}
              step={500}
              placeholder={String(bounds.priceMin)}
              value={filters.priceMin ?? ""}
              onChange={(e) => update({ priceMin: emptyNum(e.target.value) })}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="inv-price-max" className={labelClass}>
              Price max
            </label>
            <input
              id="inv-price-max"
              type="number"
              inputMode="numeric"
              min={0}
              step={500}
              placeholder={String(bounds.priceMax)}
              value={filters.priceMax ?? ""}
              onChange={(e) => update({ priceMax: emptyNum(e.target.value) })}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="inv-family" className={labelClass}>
              Model family
            </label>
            <select
              id="inv-family"
              value={filters.family}
              onChange={(e) =>
                update({
                  family: e.target.value as InventoryFilters["family"],
                })
              }
              className={fieldClass}
            >
              <option value="all">All</option>
              {FAMILY_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inv-miles" className={labelClass}>
              Max mileage
            </label>
            <input
              id="inv-miles"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="Any"
              value={filters.milesMax ?? ""}
              onChange={(e) => update({ milesMax: emptyNum(e.target.value) })}
              className={fieldClass}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <label htmlFor="inv-sort" className={labelClass}>
              Sort
            </label>
            <select
              id="inv-sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as InventorySort })}
              className={fieldClass}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low–high</option>
              <option value="price-desc">Price: high–low</option>
              <option value="year-desc">Year: newest</option>
              <option value="miles-asc">Mileage: low</option>
            </select>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="joe-panel space-y-3 p-6 text-center">
          <p className="font-display text-xl tracking-[0.04em]">No bikes match</p>
          <p className="text-sm text-steel">
            Clear filters or tell Joe what you want.
          </p>
          {active ? (
            <button type="button" onClick={clear} className="joe-btn-primary">
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((bike) => (
            <ImpressionTracker key={bike.id} bikeId={bike.id}>
              <BikeCard
                bike={{
                  id: bike.id,
                  year: bike.year,
                  make: bike.make,
                  model: bike.model,
                  mileage: bike.mileage,
                  price: bike.price,
                  status: bike.status,
                  photoUrl: bike.photoUrl,
                  stockNumber: bike.stockNumber,
                }}
              />
            </ImpressionTracker>
          ))}
        </div>
      )}
    </div>
  );
}
