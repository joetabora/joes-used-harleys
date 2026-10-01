import Link from "next/link";
import { BikeCard, type BikeCardData } from "@/components/bike-card";

export function HomeFreshFloor({
  bikes,
  total,
}: {
  bikes: BikeCardData[];
  total: number;
}) {
  return (
    <section className="bg-asphalt">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="joe-kicker">On the floor</p>
            <h2 className="joe-display mt-5 text-ink">
              Ready <span className="text-lamp">to ride</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4 md:text-right">
            <p className="text-ink/70">
              Live used Harley-Davidson inventory, mirrored straight from the dealership feed.
              Ask Joe about any of them.
            </p>
            <Link
              href="/inventory"
              className="font-label inline-block text-lamp underline-offset-4 hover:underline"
            >
              {total > 0 ? `Browse current used Harley inventory (${total}) →` : "Browse current used Harley inventory →"}
            </Link>
          </div>
        </div>

        {bikes.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="joe-tile joe-stripe mt-14 flex flex-col items-start gap-5 p-10 md:p-14">
            <p className="joe-display text-ink">The floor&apos;s turning over.</p>
            <p className="max-w-lg text-ink/70">
              Nothing to show this second — tell Joe what you&apos;re hunting for and he&apos;ll
              keep an eye out. No invented bikes, ever.
            </p>
            <Link href="/contact" className="joe-btn-primary">
              Tell Joe what you want
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
