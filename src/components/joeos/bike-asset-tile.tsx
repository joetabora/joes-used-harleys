import Link from "next/link";
import type { FloorBike } from "@/lib/joeos/briefing";
import { severityLabel } from "@/lib/joeos/briefing";
import { formatMiles, formatPrice } from "@/lib/format";
import { Gauge, JosData, JosItem, JosKpi, SeverityPill } from "@/components/joeos/ui";

export function BikeAssetTile({ bike }: { bike: FloorBike }) {
  const label = `${bike.year} ${bike.make} ${bike.model}`;
  return (
    <Link href={`/admin/bikes/${bike.id}`} className="jos-asset-tile">
      <div className="aspect-[4/3] bg-[var(--jos-void-deep)]">
        {bike.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bike.photoUrl} alt={label} />
        ) : (
          <div className="flex h-full items-center justify-center jos-label">No photo</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SeverityPill severity={bike.severity}>{severityLabel(bike.severity)}</SeverityPill>
          <JosData>URG {bike.urgency}</JosData>
        </div>
        <JosData>{bike.year}</JosData>
        <JosItem className="text-base leading-tight">{bike.model}</JosItem>
        <JosData>{formatMiles(bike.mileage)}</JosData>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <JosKpi className="text-xl text-[var(--jos-orange)]">{formatPrice(bike.price)}</JosKpi>
          <JosData>{bike.daysOnLot}d</JosData>
        </div>
        <Gauge percent={bike.urgency} severity={bike.severity} />
      </div>
    </Link>
  );
}
