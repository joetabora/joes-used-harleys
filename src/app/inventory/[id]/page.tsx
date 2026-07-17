import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  if (!isDatabaseConfigured() || !prisma) {
    return createMetadata({
      title: "Bike",
      description: "Bike detail",
      path: `/inventory/${id}`,
      noIndex: true,
    });
  }

  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike) {
    return createMetadata({
      title: "Bike not found",
      description: "This listing is unavailable.",
      path: `/inventory/${id}`,
      noIndex: true,
    });
  }

  const label = bikeLabel(bike);
  return createMetadata({
    title: label,
    description: bike.description?.slice(0, 155) || label,
    path: `/inventory/${bike.id}`,
  });
}

export default async function BikeDetailPage({ params }: Props) {
  const { id } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike) notFound();

  const label = bikeLabel(bike);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <Link href="/inventory" className="text-sm text-muted-foreground underline">
          ← Back to inventory
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{label}</h1>
          <Badge variant="secondary">{bike.status.toLowerCase()}</Badge>
        </div>
        <p className="text-muted-foreground">
          {formatMiles(bike.mileage)} · {formatPrice(bike.price)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {bike.photos.length === 0 ? (
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            No photos uploaded yet
          </div>
        ) : (
          bike.photos.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={label}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          ))
        )}
      </div>

      {bike.description ? (
        <p className="whitespace-pre-wrap text-muted-foreground">{bike.description}</p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Ask about this bike</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm source={`/inventory/${bike.id}`} />
        </CardContent>
      </Card>
    </div>
  );
}
