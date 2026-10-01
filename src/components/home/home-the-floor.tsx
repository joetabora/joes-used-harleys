import Image from "next/image";
import Link from "next/link";

const SERVICE_AREA = [
  "Milwaukee",
  "Wauwatosa",
  "West Allis",
  "Brookfield",
  "Waukesha",
  "Menomonee Falls",
  "Glendale",
  "Mequon",
  "Germantown",
  "Oak Creek",
  "Franklin",
  "Racine",
  "Kenosha",
  "West Bend",
  "Oconomowoc",
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Milwaukee+Harley-Davidson+11310+W+Silver+Spring+Rd+Milwaukee+WI+53225";

export function HomeTheFloor() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/floor.jpg"
        alt="Harley showroom floor packed with riders and motorcycles"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-asphalt via-asphalt/85 to-asphalt/40"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <div className="max-w-2xl">
          <p className="joe-kicker">The floor</p>
          <h2 className="joe-display mt-5 text-ink">
            Milwaukee is
            <span className="block text-lamp">where the bikes live.</span>
          </h2>
          <p className="mt-8 text-lg leading-[1.7] text-ink/80">
            The bikes Joe works with sit on the Milwaukee Harley-Davidson floor at 11310 W Silver
            Spring Rd. Joe&apos;s Used Harleys isn&apos;t a separate dealership — it&apos;s one
            salesman making sure you leave on the right one.
          </p>

          <p className="font-label mt-10 text-steel">Riders come in from</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICE_AREA.map((city) => (
              <li
                key={city}
                className="border border-chrome/20 bg-asphalt/60 px-3 py-1.5 font-label text-[0.62rem] text-chrome backdrop-blur-sm"
              >
                {city}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/used-harleys/milwaukee" className="joe-btn-primary">
              Used Harleys near Milwaukee
            </Link>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="joe-btn-secondary"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
