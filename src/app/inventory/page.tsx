import { Suspense } from "react";
import Link from "next/link";
import { InventoryBrowser } from "@/components/inventory-browser";
import { LeadForm } from "@/components/lead-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { JsonLd } from "@/components/seo/json-ld";
import { bikeLabel } from "@/lib/format";
import { publicBikeOrderBy, publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Used Harley-Davidson Motorcycles for Sale | Milwaukee Area",
  description:
    "Browse real used Harley-Davidson motorcycles for sale. Joe helps Milwaukee and Southeastern Wisconsin buyers compare bikes, ask questions, and buy at a human pace — mirrored dealership stock, never invented inventory.",
  path: "/inventory",
});

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <p className="font-label text-lamp">Floor stock</p>
        <h1 className="font-display text-3xl tracking-[0.06em]">
          Used Harley-Davidson motorcycles for sale
        </h1>
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

  const itemList = itemListJsonLd(
    bikes.map((bike) => ({
      name: bikeLabel(bike),
      path: `/inventory/${bike.id}`,
    })),
  );

  return (
    <>
      {itemList ? <JsonLd data={itemList} /> : null}
      <section className="joe-asphalt-bay relative overflow-hidden border-b border-chrome/10">
        <div className="joe-hero-grain absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="joe-kicker">
            On the floor{bikes.length > 0 ? ` · ${bikes.length} bikes` : ""}
          </p>
          <h1 className="joe-display mt-5 max-w-4xl text-ink">
            Used Harley-Davidson motorcycles <span className="text-lamp">for sale</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-ink/75">
            These are real, currently available used Harley-Davidson motorcycles mirrored from
            Milwaukee Harley-Davidson stock. Joe helps Milwaukee and Southeastern Wisconsin buyers
            compare units and ask questions about a specific bike — without inventing inventory or
            pretending this site is a separate dealership storefront.
          </p>
          <p className="mt-6 text-sm text-steel">
            Shopping locally?{" "}
            <Link
              className="text-lamp underline-offset-4 hover:underline"
              href="/used-harleys/milwaukee"
            >
              Used Harley motorcycles near Milwaukee
            </Link>
            {" · "}
            <Link className="text-lamp underline-offset-4 hover:underline" href="/contact">
              Contact Joe
            </Link>
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-8">
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
    </>
  );
}
