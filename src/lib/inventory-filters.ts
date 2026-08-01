import { classifyFamily, type InventoryFamily } from "@/lib/bike-family";

export type InventorySort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "miles-asc";

export type InventoryFilters = {
  q: string;
  yearMin: number | null;
  yearMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  family: InventoryFamily | "all";
  milesMax: number | null;
  sort: InventorySort;
};

export type FilterableBike = {
  id: string;
  year: number;
  make: string;
  model: string;
  title?: string | null;
  category: string | null;
  price: number | null;
  mileage: number | null;
  status: string;
  photoUrl?: string | null;
  featuredRank?: number;
  firstSeenAt?: Date | string;
  stockNumber?: string | null;
};

export const defaultFilters: InventoryFilters = {
  q: "",
  yearMin: null,
  yearMax: null,
  priceMin: null,
  priceMax: null,
  family: "all",
  milesMax: null,
  sort: "featured",
};

function parseOptionalInt(raw: string | null): number | null {
  if (raw == null || raw.trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

const SORTS: InventorySort[] = [
  "featured",
  "price-asc",
  "price-desc",
  "year-desc",
  "miles-asc",
];

const FAMILIES: Array<InventoryFamily | "all"> = [
  "all",
  "Touring",
  "Softail",
  "Sportster",
  "Trike",
  "Other",
];

export function parseFiltersFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): InventoryFilters {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) return params.get(key);
    const v = params[key];
    if (Array.isArray(v)) return v[0] ?? null;
    return v ?? null;
  };

  const familyRaw = get("family") ?? "all";
  const family = FAMILIES.includes(familyRaw as InventoryFamily | "all")
    ? (familyRaw as InventoryFamily | "all")
    : "all";

  const sortRaw = get("sort") ?? "featured";
  const sort = SORTS.includes(sortRaw as InventorySort)
    ? (sortRaw as InventorySort)
    : "featured";

  return {
    q: (get("q") ?? "").trim(),
    yearMin: parseOptionalInt(get("yearMin")),
    yearMax: parseOptionalInt(get("yearMax")),
    priceMin: parseOptionalInt(get("priceMin")),
    priceMax: parseOptionalInt(get("priceMax")),
    family,
    milesMax: parseOptionalInt(get("milesMax")),
    sort,
  };
}

export function filtersToSearchParams(filters: InventoryFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.q) p.set("q", filters.q);
  if (filters.yearMin != null) p.set("yearMin", String(filters.yearMin));
  if (filters.yearMax != null) p.set("yearMax", String(filters.yearMax));
  if (filters.priceMin != null) p.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) p.set("priceMax", String(filters.priceMax));
  if (filters.family !== "all") p.set("family", filters.family);
  if (filters.milesMax != null) p.set("milesMax", String(filters.milesMax));
  if (filters.sort !== "featured") p.set("sort", filters.sort);
  return p;
}

export function filtersAreActive(filters: InventoryFilters): boolean {
  return (
    Boolean(filters.q) ||
    filters.yearMin != null ||
    filters.yearMax != null ||
    filters.priceMin != null ||
    filters.priceMax != null ||
    filters.family !== "all" ||
    filters.milesMax != null ||
    filters.sort !== "featured"
  );
}

export function filterBikes<T extends FilterableBike>(
  bikes: T[],
  filters: InventoryFilters,
): T[] {
  const q = filters.q.toLowerCase();

  return bikes.filter((bike) => {
    if (q) {
      const hay =
        `${bike.year} ${bike.make} ${bike.model} ${bike.title ?? ""} ${bike.stockNumber ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (filters.yearMin != null && bike.year < filters.yearMin) return false;
    if (filters.yearMax != null && bike.year > filters.yearMax) return false;

    const priceFilterOn = filters.priceMin != null || filters.priceMax != null;
    if (priceFilterOn) {
      if (bike.price == null) return false;
      if (filters.priceMin != null && bike.price < filters.priceMin) return false;
      if (filters.priceMax != null && bike.price > filters.priceMax) return false;
    }

    if (filters.family !== "all") {
      if (classifyFamily(bike) !== filters.family) return false;
    }

    if (filters.milesMax != null) {
      if (bike.mileage == null) return false;
      if (bike.mileage > filters.milesMax) return false;
    }

    return true;
  });
}

export function sortBikes<T extends FilterableBike>(
  bikes: T[],
  sort: InventorySort,
): T[] {
  const copy = [...bikes];
  const firstSeen = (b: T) => {
    if (!b.firstSeenAt) return 0;
    return typeof b.firstSeenAt === "string"
      ? new Date(b.firstSeenAt).getTime()
      : b.firstSeenAt.getTime();
  };

  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
    case "price-desc":
      return copy.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year);
    case "miles-asc":
      return copy.sort(
        (a, b) => (a.mileage ?? Number.POSITIVE_INFINITY) - (b.mileage ?? Number.POSITIVE_INFINITY),
      );
    case "featured":
    default:
      return copy.sort((a, b) => {
        const rank = (b.featuredRank ?? 0) - (a.featuredRank ?? 0);
        if (rank !== 0) return rank;
        return firstSeen(b) - firstSeen(a);
      });
  }
}

export function inventoryBounds(bikes: FilterableBike[]) {
  if (bikes.length === 0) {
    return {
      yearMin: 2000,
      yearMax: new Date().getFullYear(),
      priceMin: 0,
      priceMax: 50000,
    };
  }
  const years = bikes.map((b) => b.year);
  const prices = bikes.map((b) => b.price).filter((p): p is number => p != null);
  return {
    yearMin: Math.min(...years),
    yearMax: Math.max(...years),
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 50000,
  };
}
