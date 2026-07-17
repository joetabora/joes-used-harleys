import Link from "next/link";
import { BikeCard } from "@/components/bike-card";
import { LeadForm } from "@/components/lead-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Inventory",
  description: "Used Harleys Joe can help you buy — only real listings, never invented stock.",
  path: "/inventory",
});

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <PlaceholderNotice title="Database not connected">
          Connect Supabase (DATABASE_URL) to show live bikes. We will not invent inventory.
        </PlaceholderNotice>
        <Card>
          <CardHeader>
            <CardTitle>Looking for something?</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadForm source="/inventory" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const bikes = await prisma.bike.findMany({
    where: { status: { in: ["AVAILABLE", "PENDING"] } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <p className="text-muted-foreground">
          Listings Joe maintains. Don&apos;t see it? Tell him what you want.
        </p>
      </div>

      {bikes.length === 0 ? (
        <PlaceholderNotice title="No bikes listed yet">
          Inventory is empty. Joe can add bikes from the admin area. No sample bikes are shown.
        </PlaceholderNotice>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard
              key={bike.id}
              bike={{
                id: bike.id,
                year: bike.year,
                make: bike.make,
                model: bike.model,
                mileage: bike.mileage,
                price: bike.price,
                status: bike.status,
                photoUrl: bike.photos[0] ?? null,
              }}
            />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tell Joe what you&apos;re looking for</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm source="/inventory" />
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Or <Link className="underline" href="/contact">contact Joe</Link> directly.
      </p>
    </div>
  );
}
