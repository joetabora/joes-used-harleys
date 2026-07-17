import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { guides } from "@/lib/guides";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeEducation() {
  const featured = guides.slice(0, 3);

  return (
    <SectionShell tone="muted">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-wider text-steel">Learn first</p>
          <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
            Harley education &amp; resources
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Plain-English guides—no invented inventory or dealership claims.
          </p>
        </div>
        <Link href="/guides" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit")}>
          All guides
        </Link>
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {featured.map((guide) => (
          <li key={guide.slug} className="border-t border-border pt-6">
            <p className="text-xs uppercase tracking-wider text-steel">{guide.category}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-wide">
              <Link href={`/guides/${guide.slug}`} className="hover:text-signal">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{guide.excerpt}</p>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Read guide
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
