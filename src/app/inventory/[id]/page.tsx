import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";
import { hasRecentPriceDrop, isNewArrival } from "@/lib/inventory-public";
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
  if (!bike || bike.hidden) {
    return createMetadata({
      title: "Bike not found",
      description: "This listing is unavailable.",
      path: `/inventory/${id}`,
      noIndex: true,
    });
  }

  const label = bike.seoHeadline || bikeLabel(bike);
  return createMetadata({
    title: label,
    description:
      bike.seoDescription || bike.description?.slice(0, 155) || label,
    path: `/inventory/${bike.id}`,
  });
}

export default async function BikeDetailPage({ params }: Props) {
  const { id } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const bike = await prisma.bike.findUnique({
    where: { id },
    include: {
      priceHistory: {
        orderBy: { changedAt: "desc" },
        take: 10,
      },
    },
  });
  if (!bike || bike.hidden || !["AVAILABLE", "PENDING"].includes(bike.status)) {
    notFound();
  }

  const label = bikeLabel(bike);
  const displayTitle = bike.seoHeadline || label;
  const photos =
    bike.personalPhotos.length > 0
      ? bike.personalPhotos
      : bike.personalHeroImageUrl
        ? [bike.personalHeroImageUrl, ...bike.photos]
        : bike.photos;

  const newArrival = isNewArrival(bike.firstSeenAt);
  const priceDrop = hasRecentPriceDrop(bike.priceHistory);

  const insights = [
    { label: "Perfect for", value: bike.perfectFor },
    { label: "Favorite feature", value: bike.favoriteFeature },
    { label: "Ideal rider", value: bike.idealRider },
    { label: "Things to mention", value: bike.thingsToMention },
    { label: "Things to check", value: bike.thingsToCheck },
    { label: "Why I'd like it", value: bike.whyIDLikeIt },
    { label: "Who should skip it", value: bike.whoShouldSkipIt },
    { label: "Conversation starter", value: bike.conversationStarter },
    { label: "Buying tips", value: bike.buyingTips },
  ].filter((row) => row.value);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <Link href="/inventory" className="text-sm text-muted-foreground underline">
          ← Back to inventory
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{displayTitle}</h1>
          <Badge variant="secondary">{bike.status.toLowerCase()}</Badge>
          {newArrival ? <Badge>Just arrived</Badge> : null}
          {priceDrop ? <Badge>Price reduced</Badge> : null}
        </div>
        <p className="text-muted-foreground">
          {formatMiles(bike.mileage)} · {formatPrice(bike.price)}
          {bike.color ? ` · ${bike.color}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {photos.length === 0 ? (
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            No photos yet
          </div>
        ) : (
          photos.map((url) => (
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

      {insights.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>From Joe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {insights.map((row) => (
              <div key={row.label}>
                <p className="font-medium">{row.label}</p>
                <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{row.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {bike.walkaroundVideoUrl ? (
        <p className="text-sm">
          <a className="underline" href={bike.walkaroundVideoUrl} target="_blank" rel="noreferrer">
            Watch Joe&apos;s walkaround
          </a>
        </p>
      ) : null}

      {bike.inventoryUrl ? (
        <p className="text-sm text-muted-foreground">
          <a className="underline" href={bike.inventoryUrl} target="_blank" rel="noreferrer">
            View on dealership site
          </a>
        </p>
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
