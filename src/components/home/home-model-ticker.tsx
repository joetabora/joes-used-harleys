import Link from "next/link";
import { getModel } from "@/lib/content/taxonomy";

const TICKER_SLUGS = [
  "road-glide",
  "street-glide",
  "road-king",
  "heritage-classic",
  "fat-boy",
  "low-rider",
  "street-bob",
  "breakout",
  "electra-glide",
  "iron-883",
  "sportster-s",
  "freewheeler",
];

export function HomeModelTicker() {
  const models = TICKER_SLUGS.map((slug) => getModel(slug)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m),
  );

  const row = (hidden: boolean) =>
    models.map((m) => (
      <li key={`${hidden ? "b" : "a"}-${m.slug}`} className="flex items-center">
        <Link
          href={`/harleys/${m.slug}`}
          tabIndex={hidden ? -1 : undefined}
          className="font-display whitespace-nowrap px-6 text-2xl tracking-[0.04em] text-ink/80 transition-colors hover:text-lamp md:text-3xl"
        >
          {m.displayName}
        </Link>
        <span className="text-lamp" aria-hidden>
          ✦
        </span>
      </li>
    ));

  return (
    <section
      aria-label="Harley models"
      className="joe-marquee-wrap overflow-hidden border-y border-chrome/10 bg-concrete py-5"
    >
      <div className="joe-marquee">
        <ul className="flex">{row(false)}</ul>
        <ul className="flex" aria-hidden>
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
