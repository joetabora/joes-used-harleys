import { Suspense } from "react";
import Link from "next/link";
import { InventoryBrowser } from "@/components/inventory-browser";
import { LeadForm } from "@/components/lead-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { publicBikeOrderBy, publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Inventory",
  description: "Used Harleys Joe can help you buy — mirrored from real dealership stock.",
  path: "/inventory",
});

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <p className="font-label text-lamp">Floor stock</p>
        <h1 className="font-display text-3xl tracking-[0.06em]">Inventory</h1>
        <PlaceholderNotice title="Database not connected">
          Connect Supabase (DATABASE_URL) to show live bikes. We will not invent inventory.
        </PlaceholderNotice>
        <div className="joe-panel p-5">
          <p className="font-label mb-4 text-steel">Looking for something?</p>
          <LeadForm source="/inventory" />
        </div>
      </div>
    );
  }

  const bikes = await prisma.bike.findMany({
    where: publicBikeWhere,
    orderBy: publicBikeOrderBy,
  });

  const browserBikes = bikes.map((bike) => ({
    id: bike.id,
    year: bike.year,
    make: bike.make,
    model: bike.model,
    title: bike.title,
    category: bike.category,
    mileage: bike.mileage,
    price: bike.price,
    status: bike.status,
    photoUrl: bike.personalHeroImageUrl || bike.photos[0] || null,
    featuredRank: bike.featuredRank,
    firstSeenAt: bike.firstSeenAt.toISOString(),
    stockNumber: bike.stockNumber,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <p className="font-label text-lamp">Floor stock</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Inventory</h1>
        <p className="max-w-2xl text-steel">
          Used Harleys from Milwaukee Harley-Davidson, curated by Joe. Don&apos;t see it? Tell
          him what you want.
        </p>
      </div>

      {bikes.length === 0 ? (
        <PlaceholderNotice title="Nothing on the floor right now">
          Ask Joe what&apos;s available or what he&apos;s watching for. We never invent inventory.
        </PlaceholderNotice>
      ) : (
        <Suspense
          fallback={
            <p className="font-label text-steel">Loading filters…</p>
          }
        >
          <InventoryBrowser bikes={browserBikes} />
        </Suspense>
      )}

      <div className="joe-panel p-5">
        <p className="font-label mb-1 text-lamp">Request</p>
        <h2 className="font-display mb-4 text-xl tracking-[0.04em]">
          Tell Joe what you&apos;re looking for
        </h2>
        <LeadForm source="/inventory" />
      </div>
      <p className="text-sm text-steel">
        Or{" "}
        <Link className="text-lamp underline-offset-4 hover:underline" href="/contact">
          contact Joe
        </Link>{" "}
        directly.
      </p>
    </div>
  );
}
