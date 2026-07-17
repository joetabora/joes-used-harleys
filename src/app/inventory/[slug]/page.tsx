import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMiles, formatPrice } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isDatabaseConfigured() || !prisma) {
    return createMetadata({
      title: "Bike",
      description: "Bike detail",
      path: `/inventory/${slug}`,
      noIndex: true,
    });
  }

  const bike = await prisma.bike.findUnique({ where: { slug } });
  if (!bike) {
    return createMetadata({
      title: "Bike not found",
      description: "This listing is unavailable.",
      path: `/inventory/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: bike.title,
    description: bike.description?.slice(0, 155) || `${bike.year} ${bike.model}`,
    path: `/inventory/${bike.slug}`,
  });
}

export default async function BikeDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const bike = await prisma.bike.findUnique({
    where: { slug },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });

  if (!bike) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <Link href="/inventory" className="text-sm text-muted-foreground underline">
          ← Back to inventory
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{bike.title}</h1>
          <Badge variant="secondary">{bike.status.toLowerCase()}</Badge>
        </div>
        <p className="text-muted-foreground">
          {bike.year} {bike.model} · {formatMiles(bike.mileage)} · {formatPrice(bike.price)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {bike.photos.length === 0 ? (
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            No photos uploaded yet
          </div>
        ) : (
          bike.photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo.id}
              src={photo.url}
              alt={photo.alt || bike.title}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          ))
        )}
      </div>

      {bike.description ? (
        <div className="prose prose-neutral max-w-none">
          <p className="whitespace-pre-wrap text-muted-foreground">{bike.description}</p>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ask about this bike</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadForm sourcePage={`/inventory/${bike.slug}`} bikeId={bike.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pre-approval help</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadForm
              mode="preapproval"
              sourcePage={`/inventory/${bike.slug}`}
              bikeId={bike.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
