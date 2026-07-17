import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { guides } from "@/lib/guides";

export function HomeEducation() {
  const featured = guides.slice(0, 3);

  return (
    <SectionShell tone="bay">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-label text-steel">Learn first</p>
          <h2 className="joe-rule mt-4 pt-4 font-display text-4xl leading-none text-ink md:text-5xl">
            Harley education &amp; resources
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.65] text-ink/75">
            Plain-English guides—no invented inventory or dealership claims.
          </p>
        </div>
        <Link href="/guides" className="joe-btn-secondary w-fit">
          All guides
        </Link>
      </div>

      <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
        {featured.map((guide) => (
          <li key={guide.slug} className="joe-rule pt-5">
            <p className="font-label text-steel">{guide.category}</p>
            <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
              <Link href={`/guides/${guide.slug}`} className="hover:text-leather">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.65] text-ink/75">{guide.excerpt}</p>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-5 inline-block font-label text-leather underline-offset-4 hover:underline"
            >
              Read guide
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
