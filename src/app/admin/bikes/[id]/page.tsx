import Link from "next/link";
import { notFound } from "next/navigation";
import { BikeEditorForm } from "@/components/bike-editor-form";
import { requireAdminOrRedirect } from "@/lib/auth";
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

  return (
    <div className="space-y-6">
      <Link href="/admin/bikes" className="jos-label hover:text-[var(--jos-orange)]">
        ← Floor
      </Link>

      <div className="jos-asset-tile overflow-hidden">
        <div className="aspect-[16/9] max-h-[22rem] bg-[var(--jos-void-deep)] md:aspect-[21/9]">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero} alt={bikeLabel(bike)} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center jos-label">No hero image</div>
          )}
        </div>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="jos-label">{bike.year} {bike.make}</p>
              <h1 className="jos-heading mt-1 text-3xl">{bike.model}</h1>
              <p className="jos-data mt-2">
                {formatMiles(bike.mileage)} · {bike.status} · {bike.source}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={
                  severity === "hot"
                    ? "jos-pill jos-pill-hot"
                    : severity === "watch"
                      ? "jos-pill jos-pill-watch"
                      : "jos-pill jos-pill-ok"
                }
              >
                {severityLabel(severity)}
              </span>
              <p className="jos-kpi text-3xl text-[var(--jos-orange)]">
                {formatPrice(bike.price)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="jos-kpi-gauge">
              <p className="jos-label">Days on lot</p>
              <p className="jos-kpi text-3xl">{days}</p>
            </div>
            <div className="jos-kpi-gauge">
              <p className="jos-label">Urgency</p>
              <p className="jos-kpi text-3xl">{urgency}</p>
              <div className="jos-gauge-track mt-2">
                <div
                  className="jos-gauge-fill"
                  data-severity={severity}
                  style={{ width: `${urgency}%` }}
                />
              </div>
            </div>
            <div className="jos-kpi-gauge">
              <p className="jos-label">First seen</p>
              <p className="jos-data mt-2">
                {bike.firstSeenAt.toLocaleDateString("en-US")}
              </p>
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
            <p className="jos-data">No price changes recorded yet.</p>
          )}
        </div>
      </div>

      <div className="jos-panel p-5">
        <p className="jos-section mb-4">Joe enrichment</p>
        <BikeEditorForm bike={bike} />
      </div>
    </div>
  );
}
