import Link from "next/link";
import { listColors } from "@/lib/content/taxonomy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley colors",
  description: "Used Harley paint and color notes — inspect honestly, ignore rarity myths.",
  path: "/harleys/colors",
});

export default function ColorsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="font-display text-3xl tracking-[0.06em]">Harley colors</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {listColors().map((c) => (
          <li key={c.slug}>
            <Link href={`/harleys/colors/${c.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
