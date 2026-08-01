import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import type { ScanBikeRecord } from "@/lib/vehicle/compose-vehicle-page";
import { normalizeStockSlug, normalizeVinSlug } from "@/lib/vehicle/slugs";
import { isScanBikeRenderable } from "@/lib/vehicle/visibility";

const scanSelect = {
  id: true,
  vin: true,
  stockNumber: true,
  year: true,
  make: true,
  model: true,
  title: true,
  price: true,
  mileage: true,
  color: true,
  description: true,
  condition: true,
  category: true,
  transmission: true,
  certified: true,
  photos: true,
  status: true,
  scanVisibility: true,
  scanSlugVin: true,
  scanSlugStock: true,
  archivedAt: true,
  dealerPhone: true,
  city: true,
  state: true,
} as const;

function toRecord(bike: {
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
  photos: unknown;
  status: "AVAILABLE" | "PENDING" | "SOLD";
  scanVisibility: ScanBikeRecord["scanVisibility"];
  scanSlugVin: string | null;
  scanSlugStock: string | null;
  archivedAt: Date | null;
  dealerPhone: string | null;
  city: string | null;
  state: string | null;
}): ScanBikeRecord {
  return {
    ...bike,
    photos: Array.isArray(bike.photos) ? (bike.photos as string[]) : [],
  };
}

export async function loadScanBikeByVin(vinParam: string): Promise<ScanBikeRecord | null> {
  if (!isDatabaseConfigured() || !prisma) return null;
  const slug = normalizeVinSlug(decodeURIComponent(vinParam));
  if (!slug) return null;

  const bike = await prisma.bike.findFirst({
    where: {
      OR: [{ scanSlugVin: slug }, { vin: slug }],
    },
    select: scanSelect,
  });
  if (!bike || !isScanBikeRenderable(bike.scanVisibility)) return null;
  return toRecord(bike);
}

export async function loadScanBikeByStock(
  stockParam: string,
): Promise<ScanBikeRecord | null> {
  if (!isDatabaseConfigured() || !prisma) return null;
  const slug = normalizeStockSlug(decodeURIComponent(stockParam));
  if (!slug) return null;

  const bike = await prisma.bike.findFirst({
    where: {
      OR: [{ scanSlugStock: slug }, { stockNumber: slug }],
    },
    select: scanSelect,
  });
  if (!bike || !isScanBikeRenderable(bike.scanVisibility)) return null;
  return toRecord(bike);
}
