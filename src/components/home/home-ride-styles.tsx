import Link from "next/link";
import { listModels } from "@/lib/content/taxonomy";

const STYLES = [
  {
    family: "Touring",
    tagline: "Eat the miles",
    body: "Baggers and full-dressers built for highway days, two-up trips, and room for the gear.",
  },
  {
    family: "Softail",
    tagline: "Old-school soul",
    body: "Hidden-shock hardtail looks with modern manners — cruisers for the town-and-back-road rider.",
  },
  {
    family: "Sportster",
    tagline: "Lean & raw",
    body: "Lighter, nimble, and honest. A great first Harley, and plenty of fun for riders who've had a few.",
  },
  {
    family: "Trike",
    tagline: "Three wheels, zero excuses",
    body: "Touring comfort without balancing at the lights — keeps a lot of riders in the wind longer.",
  },
] as const;

export function HomeRideStyles() {
  const models = listModels();

  return (
    <section className="bg-asphalt">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="max-w-2xl">
          <p className="joe-kicker">Pick your ride</p>
          <h2 className="joe-display mt-5 text-ink">
            How do <span className="text-lamp">you</span> ride?
          </h2>
          <p className="mt-6 text-lg leading-[1.7] text-ink/70">
            Start with how you&apos;ll actually use the bike — not the chrome. Each family solves a
            different problem.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STYLES.map((style, i) => {
            const familyModels = models.filter((m) => m.family === style.family).slice(0, 3);
            return (
              <div key={style.family} className="joe-tile group flex flex-col p-7">
                <span className="joe-index text-[3.5rem]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-label mt-6 text-lamp">{style.tagline}</p>
                <h3 className="font-display mt-2 text-3xl tracking-[0.03em] text-ink">
                  <Link
                    href={`/harleys/family/${style.family.toLowerCase()}`}
                    className="after:absolute after:inset-0 hover:text-lamp"
                  >
                    {style.family}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-[0.98rem] leading-[1.65] text-ink/65">{style.body}</p>
                {familyModels.length > 0 ? (
                  <ul className="relative z-[1] mt-6 flex min-h-[4.5rem] flex-wrap content-start gap-x-4 gap-y-2 border-t border-chrome/10 pt-5">
                    {familyModels.map((m) => (
                      <li key={m.slug}>
                        <Link
                          href={`/harleys/${m.slug}`}
                          className="font-label text-[0.62rem] text-chrome/70 transition-colors hover:text-lamp"
                        >
                          {m.displayName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
