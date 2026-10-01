import Link from "next/link";
import { getPublishedGuides } from "@/lib/content/guides";

export function HomeFromTheBench() {
  const guides = getPublishedGuides();
  const [lead, ...rest] = guides;
  if (!lead) return null;

  const hrefFor = (topic: string, slug: string) => `/guides/${topic}/${slug}`;

  return (
    <section className="bg-asphalt">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="joe-kicker">From the bench</p>
            <h2 className="joe-display mt-5 text-ink">
              Know before <span className="text-lamp">you buy</span>
            </h2>
          </div>
          <Link href="/guides" className="font-label text-lamp underline-offset-4 hover:underline">
            Used Harley buying guides →
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Link
            href={hrefFor(lead.topic, lead.slug)}
            className="joe-tile joe-glow group flex min-h-[22rem] flex-col justify-end p-8 md:p-12 lg:col-span-7"
          >
            <p className="font-label text-lamp">Feature · {lead.topic}</p>
            <h3 className="joe-display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink transition-colors group-hover:text-lamp">
              {lead.title}
            </h3>
            <p className="mt-5 max-w-xl text-ink/70">{lead.excerpt}</p>
            <span className="font-label mt-8 text-lamp">Read the guide →</span>
          </Link>

          <ol className="grid gap-5 lg:col-span-5">
            {rest.slice(0, 4).map((guide, index) => (
              <li key={`${guide.topic}-${guide.slug}`}>
                <Link
                  href={hrefFor(guide.topic, guide.slug)}
                  className="joe-tile group flex h-full items-start gap-5 p-6"
                >
                  <span className="joe-index shrink-0 text-[2.5rem] leading-none">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-label text-[0.6rem] text-steel">{guide.topic}</p>
                    <p className="font-display mt-1 text-lg leading-[1.15] tracking-[0.02em] text-ink transition-colors group-hover:text-lamp">
                      {guide.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
