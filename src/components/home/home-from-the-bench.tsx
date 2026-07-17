import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { guides } from "@/lib/guides";

/**
 * Magazine contents layout — one lead feature + numbered index.
 * Not a blog/resource feed.
 */
export function HomeFromTheBench() {
  const [lead, ...rest] = guides;

  return (
    <SectionShell width="wide">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-label text-steel">06 — From the bench</p>
          <h2 className="font-poster mt-4 text-ink">From the bench</h2>
        </div>
        <p className="max-w-xs text-sm leading-[1.65] text-ink/65 md:text-right">
          Magazine-style notes on used Harleys—no invented stock or dealership claims.
        </p>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        <article className="md:col-span-7">
          <p className="font-label text-lamp">Feature</p>
          <h3 className="joe-headline-xl mt-4">
            <Link href={`/guides/${lead.slug}`} className="transition-colors hover:text-lamp">
              {lead.title}
            </Link>
          </h3>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-ink/75">
            {lead.excerpt}
          </p>
          <Link
            href={`/guides/${lead.slug}`}
            className="mt-6 inline-block font-label text-lamp underline-offset-4 hover:underline"
          >
            Read →
          </Link>
        </article>

        <aside className="md:col-span-5 md:border-l md:border-white/12 md:pl-10 lg:pl-12">
          <p className="font-label text-steel">Contents</p>
          <ol className="mt-8 space-y-10">
            {rest.map((guide, index) => (
              <li key={guide.slug} className="group">
                <div className="flex gap-4">
                  <span className="joe-index shrink-0 text-[clamp(2rem,4vw,3rem)] leading-none">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="font-story text-xl text-ink transition-colors group-hover:text-lamp md:text-2xl"
                    >
                      {guide.title}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/guides" className="mt-12 inline-block font-label text-steel hover:text-lamp">
            All guides →
          </Link>
        </aside>
      </div>
    </SectionShell>
  );
}
