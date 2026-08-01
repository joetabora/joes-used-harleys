import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { VehiclePage } from "@/components/vehicle/vehicle-page";
import { composeVehiclePage } from "@/lib/vehicle/compose-vehicle-page";
import { loadScanBikeByStock } from "@/lib/vehicle/load-bike";
import { normalizeVinSlug } from "@/lib/vehicle/slugs";
import { scanBikeVinPath } from "@/lib/vehicle/urls";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ stock: string }>;
  searchParams: Promise<{ assoc?: string; src?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stock } = await params;
  const bike = await loadScanBikeByStock(stock);
  if (!bike) return { title: "Vehicle", robots: { index: false, follow: false } };
  const view = composeVehiclePage(bike);
  if (!view) return { title: "Vehicle", robots: { index: false, follow: false } };
  return {
    title: view.title,
    description: view.description?.slice(0, 160) || `${view.title} vehicle details`,
    robots: { index: false, follow: false },
  };
}

export default async function ScanBikeStockPage({ params, searchParams }: Props) {
  const { stock } = await params;
  const sp = await searchParams;
  const bike = await loadScanBikeByStock(stock);
  if (!bike) notFound();

  const vinSlug = bike.scanSlugVin ?? normalizeVinSlug(bike.vin);
  if (vinSlug) {
    const q = new URLSearchParams();
    if (sp.assoc) q.set("assoc", sp.assoc);
    if (sp.src) q.set("src", sp.src);
    const qs = q.toString();
    permanentRedirect(`${scanBikeVinPath(vinSlug)}${qs ? `?${qs}` : ""}`);
  }

  const view = composeVehiclePage(bike);
  if (!view) notFound();

  return <VehiclePage view={view} assoc={sp.assoc ?? null} />;
}
