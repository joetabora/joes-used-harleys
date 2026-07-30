import Link from "next/link";
import { listEngines } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley engines",
  description: "Public-facing Harley engine family overviews — confirm specs on the actual bike.",
  path: "/harleys/engines",
});

export default function EnginesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="font-display text-3xl tracking-[0.06em]">Harley engines</h1>
      <ul className="space-y-3">
        {listEngines().map((e) => (
          <li key={e.slug}>
            <Link href={`/harleys/engines/${e.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
              <p className="font-display text-lg">{e.name}</p>
              <p className="mt-1 text-sm text-steel">{e.era}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
