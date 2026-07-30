import Link from "next/link";
import { listGeo } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Used Harleys near you",
  description:
    "Southeast Wisconsin and nearby city guides for used Harley buyers — honest inventory, education first.",
  path: "/used-harleys",
});

export default function UsedHarleysIndexPage() {
  const primary = listGeo().filter((g) => g.tier === "primary");
  const secondary = listGeo().filter((g) => g.tier === "secondary");
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="font-label text-lamp">Local</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">
          Used Harleys — Southeast Wisconsin & nearby
        </h1>
        <p className="max-w-2xl text-steel">
          Each Southeast Wisconsin city hub is written for local buyers — travel corridors,
          riding context, buying and trade-in guidance, and mirrored inventory. City pages are
          service-area guides, not fake branch storefronts.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl">Southeast Wisconsin</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/used-harleys/${c.slug}`}
                className="joe-panel block p-4 hover:border-lamp/40"
              >
                <p className="font-display text-lg">
                  {c.name}, {c.state}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl">Also nearby</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {secondary.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/used-harleys/${c.slug}`}
                className="joe-panel block p-4 hover:border-lamp/40"
              >
                <p className="font-display text-lg">
                  {c.name}, {c.state}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
