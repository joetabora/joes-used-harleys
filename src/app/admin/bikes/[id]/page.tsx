import { notFound } from "next/navigation";
import { AssetScorecardView } from "@/components/assets/asset-scorecard";
import { BikeEditorForm } from "@/components/bike-editor-form";
import { ContextBar } from "@/components/joeos/context-bar";
import {
  Gauge,
  JosData,
  JosKpi,
  JosLabel,
  JosPanel,
} from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadScorecardForBike } from "@/lib/assets/load-scorecard";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";
import {
  bikeSeverity,
  daysBetween,
  severityLabel,
  urgencyScore,
} from "@/lib/joeos/briefing";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Asset detail",
  description: "Machine telemetry and Joe content",
  path: "/admin/bikes",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditBikePage({ params }: Props) {
  await requireAdminOrRedirect();
  const { id } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const bike = await prisma.bike.findUnique({
    where: { id },
    include: {
      priceHistory: {
        orderBy: { changedAt: "desc" },
        take: 8,
      },
    },
  });
  if (!bike) notFound();

  const now = new Date();
  const days = daysBetween(bike.firstSeenAt, now);
  const severity = bikeSeverity(days);
  const lastDrop = bike.priceHistory.find(
    (h) =>
      h.previousPrice != null &&
      h.newPrice != null &&
      h.newPrice < h.previousPrice,
  );
  const urgency = urgencyScore({
    daysOnLot: days,
    hasRecentPriceDrop: Boolean(lastDrop),
    status: bike.status,
  });
  const hero =
    bike.personalHeroImageUrl || bike.personalPhotos[0] || bike.photos[0] || null;
  const scorecard = await loadScorecardForBike(bike.id);

  return (
    <div className="jos-stack-screen">
      <ContextBar
        parentHref="/admin/bikes"
        parentLabel="Floor"
        entityLabel={`${bike.year} ${bike.model}`}
        status={severityLabel(severity)}
        statusSeverity={severity}
      />

      {/* Secondary: telemetry header band */}
      <div className="jos-asset-tile overflow-hidden jos-secondary">
        <div className="aspect-[16/9] max-h-[18rem] bg-[var(--jos-void-deep)] md:aspect-[21/9]">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero} alt={bikeLabel(bike)} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center jos-label">No hero image</div>
          )}
        </div>
        <div className="jos-pad-hero jos-stack-dense">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <JosLabel>
                {bike.year} {bike.make}
              </JosLabel>
              <h1 className="jos-title mt-1 text-3xl">{bike.model}</h1>
              <JosData className="mt-2">
                {formatMiles(bike.mileage)} · {bike.status} · {bike.source}
              </JosData>
            </div>
            <JosKpi className="text-3xl text-[var(--jos-orange)]">
              {formatPrice(bike.price)}
            </JosKpi>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="jos-kpi-gauge">
              <JosLabel>Days on lot</JosLabel>
              <JosKpi className="text-3xl">{days}</JosKpi>
            </div>
            <div className="jos-kpi-gauge">
              <JosLabel>Urgency</JosLabel>
              <JosKpi className="text-3xl">{urgency}</JosKpi>
              <div className="mt-2">
                <Gauge percent={urgency} severity={severity} />
              </div>
            </div>
            <div className="jos-kpi-gauge">
              <JosLabel>First seen</JosLabel>
              <JosData className="mt-2">
                {bike.firstSeenAt.toLocaleDateString("en-US")}
              </JosData>
            </div>
          </div>

          {bike.priceHistory.length > 0 ? (
            <div>
              <p className="jos-section mb-2">Price history</p>
              <ul className="space-y-1">
                {bike.priceHistory.map((h) => (
                  <li key={h.id} className="jos-data">
                    {h.changedAt.toLocaleDateString("en-US")}:{" "}
                    {h.previousPrice != null ? `$${h.previousPrice}` : "—"} →{" "}
                    {h.newPrice != null ? `$${h.newPrice}` : "—"}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <JosData>No price changes recorded yet.</JosData>
          )}
        </div>
      </div>

      {scorecard ? (
        <JosPanel>
          <AssetScorecardView scorecard={scorecard} variant="jos" honestyBlurb />
        </JosPanel>
      ) : null}

      {/* FocusZone: enrichment editor */}
      <JosPanel hero>
        <p className="jos-section mb-4">Joe enrichment</p>
        <BikeEditorForm bike={bike} />
      </JosPanel>
    </div>
  );
}
