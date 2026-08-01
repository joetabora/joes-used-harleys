import Link from "next/link";
import type { FloorScorePills } from "@/lib/assets/load-scorecard";
import type { FloorBike } from "@/lib/joeos/briefing";
import { floorInventoryClassLabel, severityLabel } from "@/lib/joeos/briefing";
import { formatMiles, formatPrice } from "@/lib/format";
import { ScorePill } from "@/components/assets/asset-scorecard";
import { Gauge, JosData, JosItem, JosKpi, SeverityPill } from "@/components/joeos/ui";

export function BikeAssetTile({
  bike,
  pills,
}: {
  bike: FloorBike;
  pills?: FloorScorePills;
}) {
  const label = `${bike.year} ${bike.make} ${bike.model}`;
  const opportunity = pills?.opportunity ?? bike.urgency;
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
          <JosData>OPP {opportunity}</JosData>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="jos-chip" data-active="true">
            {floorInventoryClassLabel(bike.inventoryClass)}
          </span>
          <span className="jos-chip" data-active={bike.hasQrIdentity ? "true" : "false"}>
            {bike.hasQrIdentity ? "QR ready" : "No QR"}
          </span>
        </div>
        {pills ? (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <ScorePill label="DEM" value={pills.demand} />
            <ScorePill label="AGE" value={pills.aging} />
          </div>
        ) : null}
        <JosData>
          {bike.year}
          {bike.condition ? ` · ${bike.condition}` : ""}
        </JosData>
        <JosItem className="text-base leading-tight">
          {bike.make} {bike.model}
        </JosItem>
        {bike.stockNumber ? <JosData>Stock {bike.stockNumber}</JosData> : null}
        <JosData>{formatMiles(bike.mileage)}</JosData>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <JosKpi className="text-xl text-[var(--jos-orange)]">{formatPrice(bike.price)}</JosKpi>
          <JosData>{bike.daysOnLot}d</JosData>
        </div>
        <Gauge percent={opportunity} severity={bike.severity} />
      </div>
    </Link>
  );
}
