import type { ScanVisibilityValue } from "./visibility";
import { isScanBikeIndexable, isScanBikeRenderable } from "./visibility";
import { scanBikeCanonicalUrl, scanBikeVinPath, scanBikeStockPath } from "./urls";
import { normalizeStockSlug, normalizeVinSlug } from "./slugs";

/** Feed-owned fields only — never Joe enrichment. */
export type ScanBikeRecord = {
  id: string;
  vin: string | null;
  stockNumber: string | null;
  year: number;
  make: string;
  model: string;
  title: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  description: string | null;
  condition: string | null;
  category: string | null;
  transmission: string | null;
  certified: string | null;
  photos: string[];
  status: "AVAILABLE" | "PENDING" | "SOLD";
  scanVisibility: ScanVisibilityValue;
  scanSlugVin: string | null;
  scanSlugStock: string | null;
  archivedAt: Date | null;
  dealerPhone: string | null;
  city: string | null;
  state: string | null;
};

export type VehiclePageViewModel = {
  bikeId: string;
  visibility: ScanVisibilityValue;
  indexable: boolean;
  soldBanner: boolean;
  title: string;
  year: number;
  make: string;
  model: string;
  price: number | null;
  mileage: number | null;
  color: string | null;
  stockNumber: string | null;
  vin: string | null;
  vinDisplay: string | null;
  description: string | null;
  heroImage: string | null;
  gallery: string[];
  specs: { label: string; value: string }[];
  canonicalUrl: string | null;
  canonicalPath: string | null;
  condition: string | null;
  category: string | null;
  dealerPhone: string | null;
  locationLine: string | null;
};

function formatMiles(n: number | null): string | null {
  if (n == null) return null;
  return `${n.toLocaleString("en-US")} mi`;
}

function formatPrice(n: number | null): string | null {
  if (n == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Dealership-neutral view model for ScanBike pages.
 * Explicitly omits Joe fields (perfectFor, joeRating, personalPhotos, etc.).
 */
export function composeVehiclePage(bike: ScanBikeRecord): VehiclePageViewModel | null {
  if (!isScanBikeRenderable(bike.scanVisibility)) return null;

  const vinSlug = bike.scanSlugVin ?? normalizeVinSlug(bike.vin);
  const stockSlug = bike.scanSlugStock ?? normalizeStockSlug(bike.stockNumber);
  const gallery = Array.isArray(bike.photos) ? bike.photos.filter(Boolean) : [];
  const title =
    bike.title?.trim() ||
    `${bike.year} ${bike.make} ${bike.model}`.replace(/\s+/g, " ").trim();

  const specs: { label: string; value: string }[] = [];
  if (bike.year) specs.push({ label: "Year", value: String(bike.year) });
  if (bike.make) specs.push({ label: "Make", value: bike.make });
  if (bike.model) specs.push({ label: "Model", value: bike.model });
  if (bike.condition) specs.push({ label: "Condition", value: bike.condition });
  if (bike.color) specs.push({ label: "Color", value: bike.color });
  const miles = formatMiles(bike.mileage);
  if (miles) specs.push({ label: "Mileage", value: miles });
  if (bike.transmission) specs.push({ label: "Transmission", value: bike.transmission });
  if (bike.category) specs.push({ label: "Category", value: bike.category });
  if (bike.certified) specs.push({ label: "Certified", value: bike.certified });
  if (bike.stockNumber) specs.push({ label: "Stock #", value: bike.stockNumber });
  if (bike.vin) specs.push({ label: "VIN", value: bike.vin });

  const locationParts = [bike.city, bike.state].filter(Boolean);
  const locationLine = locationParts.length ? locationParts.join(", ") : null;

  let canonicalPath: string | null = null;
  if (vinSlug) canonicalPath = scanBikeVinPath(vinSlug);
  else if (stockSlug) canonicalPath = scanBikeStockPath(stockSlug);

  return {
    bikeId: bike.id,
    visibility: bike.scanVisibility,
    indexable: isScanBikeIndexable(bike.scanVisibility),
    soldBanner: bike.scanVisibility === "ARCHIVED" || bike.status === "SOLD",
    title,
    year: bike.year,
    make: bike.make,
    model: bike.model,
    price: bike.price,
    mileage: bike.mileage,
    color: bike.color,
    stockNumber: bike.stockNumber,
    vin: bike.vin,
    vinDisplay: bike.vin,
    description: bike.description,
    heroImage: gallery[0] ?? null,
    gallery,
    specs,
    canonicalUrl: scanBikeCanonicalUrl({
      vin: bike.vin,
      stockNumber: bike.stockNumber,
    }),
    canonicalPath,
    condition: bike.condition,
    category: bike.category,
    dealerPhone: bike.dealerPhone,
    locationLine,
  };
}

export function formatVehiclePrice(n: number | null): string | null {
  return formatPrice(n);
}
