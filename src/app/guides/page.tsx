import Link from "next/link";
import { getPublishedGuides, getGuidesByTopic } from "@/lib/content/guides";
import { listTopics, getTopic } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley buying guides",
  description:
    "Buying, financing, maintenance, fitment, and more — education for used Harley shoppers in Southeast Wisconsin.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const topics = listTopics();
  const all = getPublishedGuides();
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="font-label text-lamp">Education</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Guides</h1>
        <p className="max-w-2xl text-steel">
          Topic hubs for Harley buyers. No invented inventory or market rankings.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl">Topics</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li key={t.slug}>
              <Link href={`/guides/${t.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
                <p className="font-display text-lg">{t.label}</p>
                <p className="mt-2 text-sm text-steel">{t.description}</p>
                <p className="mt-2 font-label text-steel">
                  {getGuidesByTopic(t.slug).length} guide(s)
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl">All published guides</h2>
        <ul className="space-y-2">
          {all.map((g) => (
            <li key={`${g.topic}-${g.slug}`}>
              <Link
                href={`/guides/${g.topic}/${g.slug}`}
                className="font-label text-lamp underline-offset-4 hover:underline"
              >
                {g.title}
              </Link>
              <span className="ml-2 text-sm text-steel">({getTopic(g.topic)?.label ?? g.topic})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
