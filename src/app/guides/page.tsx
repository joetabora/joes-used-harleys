import Link from "next/link";
import { guides } from "@/lib/guides";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley buying guides",
  description:
    "Model comparisons and buying education — written to help you decide, not to invent inventory.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <p className="font-label text-lamp">Education</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Guides</h1>
        <p className="text-steel">
          Educational content only. No fake inventory, prices, or dealership claims.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="joe-panel block p-5 transition-colors hover:border-lamp/40"
          >
            <p className="font-label text-steel">{guide.category}</p>
            <h2 className="mt-2 font-display text-xl tracking-[0.04em] text-ink hover:text-lamp">
              {guide.title}
            </h2>
            <p className="mt-3 text-sm text-ink/70">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
