import Link from "next/link";
import { notFound } from "next/navigation";
import { BikeDetailAnalytics } from "@/components/analytics/bike-detail-analytics";
import { AssetScorecardView } from "@/components/assets/asset-scorecard";
import { LeadForm } from "@/components/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedInventory } from "@/components/seo/related-inventory";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SeoFaq } from "@/components/seo/seo-faq";
import { loadScorecardForBike } from "@/lib/assets/load-scorecard";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";
import { hasRecentPriceDrop, isNewArrival } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { fetchRelatedInventory } from "@/lib/seo/inventory-related";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbJsonLd,
  buildJsonLdGraph,
  faqJsonLd,
  productJsonLd,
} from "@/lib/seo/schema";
import type { FaqItem } from "@/lib/seo/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function bikeFaqs(bike: {
  year: number;
  model: string;
  faq: unknown;
}): FaqItem[] {
  if (Array.isArray(bike.faq)) {
    return bike.faq
      .map((row) => {
        const r = row as { question?: string; q?: string; answer?: string; a?: string };
        const question = r.question ?? r.q;
        const answer = r.answer ?? r.a;
        if (!question || !answer) return null;
        return { question, answer };
      })
      .filter(Boolean) as FaqItem[];
  }
  return [
    {
      question: `Is this ${bike.year} ${bike.model} still available?`,
      answer:
        "Status on this page reflects the mirrored feed when the database is connected. Contact Joe to confirm before you travel.",
    },
    {
      question: "Can Joe help with payments or trade-ins?",
      answer:
        "Yes — ask about your monthly comfort zone and trade questions. He won't invent approvals or values.",
    },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  if (!isDatabaseConfigured() || !prisma) {
    return buildPageMetadata({
      title: "Bike",
      description: "Bike detail",
      path: `/inventory/${id}`,
      noIndex: true,
    });
  }

  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike || bike.hidden) {
    return buildPageMetadata({
      title: "Bike not found",
      description: "This listing is unavailable.",
      path: `/inventory/${id}`,
      noIndex: true,
    });
  }

  const label = bike.seoHeadline || bikeLabel(bike);
  return buildPageMetadata({
    title: label,
    description: bike.seoDescription || bike.description?.slice(0, 155) || label,
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
  const faqs = bikeFaqs(bike);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Inventory", path: "/inventory" },
    { name: label, path: `/inventory/${bike.id}` },
  ];
  const hero = bike.personalHeroImageUrl || photos[0] || null;
  const related = await fetchRelatedInventory({
    model: bike.model,
    excludeId: bike.id,
    take: 6,
  });
  const scorecard = await loadScorecardForBike(bike.id);

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

  const graph = buildJsonLdGraph([
    productJsonLd({
      name: label,
      description: bike.seoDescription || bike.description || label,
      path: `/inventory/${bike.id}`,
      image: hero,
      price: bike.price,
      status: bike.status,
    }),
    breadcrumbJsonLd(breadcrumbs),
    faqJsonLd(faqs),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <BikeDetailAnalytics bikeId={bike.id} />
      <JsonLd data={graph} />
      <SeoBreadcrumbs items={breadcrumbs} />

      <div className="space-y-3">
        <Link
          href="/inventory"
          className="font-label text-steel transition-colors hover:text-lamp"
        >
          ← Back to inventory
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl tracking-[0.04em] md:text-4xl">{displayTitle}</h1>
          <span className="joe-badge">{bike.status.toLowerCase()}</span>
          {newArrival ? <span className="joe-badge">Just arrived</span> : null}
          {priceDrop ? <span className="joe-badge">Price reduced</span> : null}
        </div>
        <p className="font-display text-xl tracking-wide text-lamp">
          {formatPrice(bike.price)}
        </p>
        <p className="text-steel">
          {formatMiles(bike.mileage)}
          {bike.color ? ` · ${bike.color}` : ""}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {photos.length === 0 ? (
          <div className="joe-panel flex aspect-[4/3] items-center justify-center font-label text-steel">
            No photos yet
          </div>
        ) : (
          photos.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={label}
              className="aspect-[4/3] w-full border border-chrome/20 object-cover"
            />
          ))
        )}
      </div>

      {bike.description ? (
        <p className="whitespace-pre-wrap text-ink/75">{bike.description}</p>
      ) : null}

      {insights.length > 0 ? (
        <div className="joe-panel p-5">
          <p className="font-label mb-4 text-lamp">From Joe</p>
          <div className="space-y-4 text-sm">
            {insights.map((row) => (
              <div key={row.label}>
                <p className="font-label text-steel">{row.label}</p>
                <p className="mt-1 whitespace-pre-wrap text-ink/75">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {bike.walkaroundVideoUrl ? (
        <p className="text-sm">
          <a
            className="font-label text-lamp underline-offset-4 hover:underline"
            href={bike.walkaroundVideoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Watch Joe&apos;s walkaround
          </a>
        </p>
      ) : null}

      {bike.inventoryUrl ? (
        <p className="text-sm text-steel">
          <a
            className="underline-offset-4 hover:text-lamp hover:underline"
            href={bike.inventoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            View on dealership site
          </a>
        </p>
      ) : null}

      <SeoFaq faqs={faqs} />
      <RelatedInventory bikes={related} />

      {scorecard ? (
        <div className="joe-panel p-5">
          <AssetScorecardView scorecard={scorecard} variant="joe" honestyBlurb />
        </div>
      ) : null}

      <div className="joe-panel p-5">
        <p className="font-label mb-1 text-lamp">Inquire</p>
        <h2 className="font-display mb-4 text-xl tracking-[0.04em]">Ask about this bike</h2>
        <LeadForm source={`/inventory/${bike.id}`} />
      </div>
    </div>
  );
}
