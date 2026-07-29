import Link from "next/link";
import type { FloorBike } from "@/lib/joeos/briefing";
import { severityLabel } from "@/lib/joeos/briefing";
import { formatMiles, formatPrice } from "@/lib/format";

function pillClass(severity: FloorBike["severity"]) {
  if (severity === "hot") return "jos-pill jos-pill-hot";
  if (severity === "watch") return "jos-pill jos-pill-watch";
  return "jos-pill jos-pill-ok";
}

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
          <span className={pillClass(bike.severity)}>{severityLabel(bike.severity)}</span>
          <span className="jos-data">URG {bike.urgency}</span>
        </div>
        <p className="jos-label text-[var(--jos-steel)]">{bike.year}</p>
        <h2 className="jos-heading text-base leading-tight">{bike.model}</h2>
        <p className="jos-data">{formatMiles(bike.mileage)}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <p className="jos-kpi text-xl text-[var(--jos-orange)]">{formatPrice(bike.price)}</p>
          <p className="jos-data">{bike.daysOnLot}d</p>
        </div>
        <div className="jos-gauge-track">
          <div
            className="jos-gauge-fill"
            data-severity={bike.severity}
            style={{ width: `${bike.urgency}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
