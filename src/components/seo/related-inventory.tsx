import { BikeCard } from "@/components/bike-card";
import type { RelatedBikeCard } from "@/lib/seo/inventory-related";
import Link from "next/link";

export function RelatedInventory({
  bikes,
  emptyHint = "No matching bikes on the floor right now. Ask Joe what he's watching for.",
}: {
  bikes: RelatedBikeCard[];
  emptyHint?: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-2xl tracking-[0.04em]">Related inventory</h2>
        <Link href="/inventory" className="font-label text-lamp underline-offset-4 hover:underline">
          Full floor
        </Link>
      </div>
      {bikes.length === 0 ? (
        <p className="joe-panel p-4 text-sm text-steel">{emptyHint}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </section>
  );
}
