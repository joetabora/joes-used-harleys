import Link from "next/link";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";

export type BikeCardData = {
  id: string;
  year: number;
  make: string;
  model: string;
  mileage: number | null;
  price: number | null;
  status: string;
  photoUrl?: string | null;
  stockNumber?: string | null;
};

export function BikeCard({ bike }: { bike: BikeCardData }) {
  const label = bikeLabel(bike);
  return (
    <Link
      href={`/inventory/${bike.id}`}
      className="joe-panel group flex flex-col overflow-hidden transition-colors hover:border-lamp/40"
    >
      <div className="aspect-[4/3] bg-asphalt">
        {bike.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bike.photoUrl}
            alt={label}
            className="h-full w-full object-cover transition-opacity group-hover:opacity-95"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-label text-steel">
            No photo yet
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="joe-badge">{bike.status.toLowerCase()}</span>
          <span className="font-label text-steel">{bike.year}</span>
        </div>
        <h2 className="font-display text-lg leading-tight tracking-[0.04em] text-ink group-hover:text-lamp">
          {label}
        </h2>
        {bike.stockNumber?.trim() ? (
          <p className="font-label text-lamp">Stock # {bike.stockNumber}</p>
        ) : null}
        <p className="text-sm text-steel">{formatMiles(bike.mileage)}</p>
        <p className="mt-auto font-display text-xl tracking-wide text-lamp">
          {formatPrice(bike.price)}
        </p>
      </div>
    </Link>
  );
}
