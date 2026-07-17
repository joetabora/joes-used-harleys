import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { guides } from "@/lib/guides";

export function HomeFromTheBench() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-label text-steel">06 — From the bench</p>
          <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
            Learn first. Buy when you&apos;re ready.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink/80">
            Magazine-style notes on used Harleys—no invented stock or dealership claims.
          </p>
        </div>
        <Link href="/guides" className="joe-btn-secondary w-fit">
          All guides
        </Link>
      </div>

      <ul className="mt-12">
        {guides.map((guide) => (
          <li key={guide.slug} className="joe-rule py-8">
            <p className="font-label text-steel">{guide.category}</p>
            <h3 className="mt-3 font-story text-2xl text-ink md:text-3xl">
              <Link href={`/guides/${guide.slug}`} className="hover:text-lamp">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/75">
              {guide.excerpt}
            </p>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-4 inline-block font-label text-lamp underline-offset-4 hover:underline"
            >
              Read
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
