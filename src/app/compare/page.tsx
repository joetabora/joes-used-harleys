import Link from "next/link";
import { listComparisons } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley comparisons",
  description: "Model-vs-model Harley explainers — editorial only, no fake market rankings.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="font-display text-3xl tracking-[0.06em]">Comparisons</h1>
      <ul className="space-y-3">
        {listComparisons().map((c) => (
          <li key={c.slug}>
            <Link href={`/compare/${c.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
              <p className="font-display text-lg">{c.title}</p>
              <p className="mt-2 text-sm text-steel">{c.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
