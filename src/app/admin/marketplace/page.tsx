import Link from "next/link";
import {
  MarketplaceBoard,
  type MarketplaceBikeCard,
} from "@/components/joeos/marketplace-board";
import { EmptyState, JosBody, JosSectionHeader } from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { publicBikeOrderBy, publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Marketplace",
  description: "Facebook Marketplace posting workstation",
  path: "/admin/marketplace",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminMarketplacePage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="jos-stack-section">
        <JosSectionHeader section="Marketplace" title="Facebook Marketplace" />
        <EmptyState label="Database offline" warn>
          Connect Supabase before loading Marketplace inventory.
        </EmptyState>
      </div>
    );
  }

  const rows = await prisma.bike.findMany({
    where: publicBikeWhere,
    orderBy: publicBikeOrderBy,
    select: {
      id: true,
      year: true,
      make: true,
      model: true,
      price: true,
      mileage: true,
      color: true,
      description: true,
      transmission: true,
      category: true,
      stockNumber: true,
      certified: true,
      photos: true,
      firstSeenAt: true,
      status: true,
      marketplacePostedAt: true,
    },
  });

  const bikes: MarketplaceBikeCard[] = rows.map((b) => ({
    id: b.id,
    year: b.year,
    make: b.make,
    model: b.model,
    price: b.price,
    mileage: b.mileage,
    color: b.color,
    description: b.description,
    transmission: b.transmission,
    category: b.category,
    stockNumber: b.stockNumber,
    certified: b.certified,
    photos: b.photos,
    firstSeenAt: b.firstSeenAt.toISOString(),
    status: b.status,
    marketplacePosted: b.marketplacePostedAt != null,
  }));

  if (bikes.length === 0) {
    return (
      <div className="jos-stack-section">
        <JosSectionHeader section="Marketplace" title="Facebook Marketplace" />
        <JosBody className="max-w-xl text-sm -mt-2">
          Used Harley-Davidson inventory ready for manual Marketplace posting.
        </JosBody>
        <EmptyState
          label="No eligible bikes"
          action={
            <Link href="/admin/sync" className="jos-btn jos-btn-primary">
              Open feed
            </Link>
          }
        >
          Sync used Harley inventory from the dealership feed, then return here.
        </EmptyState>
      </div>
    );
  }

  return <MarketplaceBoard bikes={bikes} />;
}
