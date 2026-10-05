import Link from "next/link";
import Image from "next/image";
import { bikeLabel, formatAdvertisedPrice, formatMiles } from "@/lib/format";

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
  const pending = bike.status === "PENDING";
  return (
    <Link
      href={`/inventory/${bike.id}`}
      className="joe-tile group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-asphalt">
        {bike.photoUrl ? (
          <Image
            src={bike.photoUrl}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="joe-zoom object-cover"
          />
        ) : (
          <div className="joe-stripe flex h-full items-center justify-center font-label text-steel">
            Photos coming
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-asphalt/90 to-transparent"
          aria-hidden
        />
        <span className="absolute left-3 top-3 bg-asphalt/80 px-2.5 py-1 font-label text-[0.62rem] text-chrome backdrop-blur-sm">
          {pending ? "Sale pending" : bike.year}
        </span>
        <span className="absolute bottom-3 right-3 font-display text-2xl tracking-wide text-ink drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          {formatAdvertisedPrice(bike.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-label text-[0.62rem] text-steel">
          {bike.year} · {bike.make}
        </p>
        <h3 className="font-display text-xl leading-[1.05] tracking-[0.02em] text-ink transition-colors group-hover:text-lamp">
          {bike.model}
        </h3>
        <span className="sr-only">{label}</span>
        <div className="mt-auto flex items-center justify-between border-t border-chrome/10 pt-4 text-sm text-steel">
          <span>{formatMiles(bike.mileage)}</span>
          {bike.stockNumber?.trim() ? (
            <span className="font-label text-[0.62rem]">Stock {bike.stockNumber}</span>
          ) : null}
          <span className="font-label text-[0.62rem] text-lamp" aria-hidden>
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
