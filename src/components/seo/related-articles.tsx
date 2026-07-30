import Link from "next/link";
import type { SeoLink } from "@/lib/seo/types";

export function RelatedArticles({ links }: { links: SeoLink[] }) {
  if (links.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl tracking-[0.04em]">Related reading</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="joe-panel block p-4 transition-colors hover:border-lamp/40"
            >
              <p className="font-display text-lg tracking-[0.04em] text-ink">{l.title}</p>
              {l.excerpt ? <p className="mt-2 text-sm text-steel">{l.excerpt}</p> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
