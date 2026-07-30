import Link from "next/link";
import { listRouteGuides } from "@/lib/content/guides";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Southeast Wisconsin Harley routes",
  description: "Day-ride planning notes for Southeast Wisconsin — inspiration, not GPS files.",
  path: "/routes",
});

export default function RoutesIndexPage() {
  const routes = listRouteGuides();
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="font-display text-3xl tracking-[0.06em]">Route guides</h1>
      <ul className="space-y-3">
        {routes.map((r) => (
          <li key={r.slug}>
            <Link href={`/routes/${r.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
              <p className="font-display text-lg">{r.title}</p>
              <p className="mt-2 text-sm text-steel">{r.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
