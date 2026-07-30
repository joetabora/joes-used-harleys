import Link from "next/link";
import { listModels, listTopics, FAMILIES } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley models",
  description:
    "Used Harley model guides — Touring, Softail, Sportster, Trike, and more. Education first, live inventory when available.",
  path: "/harleys",
});

export const revalidate = 3600;

export default function HarleysIndexPage() {
  const models = listModels();
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="font-label text-lamp">Models</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Harley models</h1>
        <p className="max-w-2xl text-steel">
          Browse model guides and families. Inventory below each page is mirrored from real feed
          stock — never invented.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl tracking-[0.04em]">Families</h2>
        <ul className="flex flex-wrap gap-2">
          {FAMILIES.map((f) => (
            <li key={f}>
              <Link
                href={`/harleys/family/${f.toLowerCase()}`}
                className="joe-btn-secondary inline-flex"
              >
                {f}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl tracking-[0.04em]">All models</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {models.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/harleys/${m.slug}`}
                className="joe-panel block p-4 transition-colors hover:border-lamp/40"
              >
                <p className="font-label text-steel">{m.family}</p>
                <p className="font-display text-lg tracking-[0.04em]">{m.displayName}</p>
                <p className="mt-2 text-sm text-steel">{m.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-steel">
        Also see{" "}
        <Link href="/harleys/colors" className="text-lamp underline-offset-4 hover:underline">
          colors
        </Link>
        ,{" "}
        <Link href="/harleys/engines" className="text-lamp underline-offset-4 hover:underline">
          engines
        </Link>
        , and{" "}
        <Link href="/guides" className="text-lamp underline-offset-4 hover:underline">
          guides
        </Link>
        . Topics: {listTopics().map((t) => t.slug).join(", ")}.
      </p>
    </div>
  );
}
