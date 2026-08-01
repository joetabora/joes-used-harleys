import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VehiclePage } from "@/components/vehicle/vehicle-page";
import { composeVehiclePage } from "@/lib/vehicle/compose-vehicle-page";
import { loadScanBikeByVin } from "@/lib/vehicle/load-bike";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ vin: string }>;
  searchParams: Promise<{ assoc?: string; src?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vin } = await params;
  const bike = await loadScanBikeByVin(vin);
  if (!bike) return { title: "Vehicle", robots: { index: false, follow: false } };
  const view = composeVehiclePage(bike);
  if (!view) return { title: "Vehicle", robots: { index: false, follow: false } };

  return {
    title: view.title,
    description: view.description?.slice(0, 160) || `${view.title} vehicle details`,
    robots: view.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: view.canonicalPath
      ? { canonical: `${siteConfig.url}${view.canonicalPath}` }
      : undefined,
    openGraph: {
      title: view.title,
      images: view.heroImage ? [{ url: view.heroImage }] : undefined,
    },
  };
}

export default async function ScanBikeVinPage({ params, searchParams }: Props) {
  const { vin } = await params;
  const sp = await searchParams;
  const bike = await loadScanBikeByVin(vin);
  if (!bike) notFound();

  const view = composeVehiclePage(bike);
  if (!view) notFound();

  return <VehiclePage view={view} assoc={sp.assoc ?? null} />;
}
