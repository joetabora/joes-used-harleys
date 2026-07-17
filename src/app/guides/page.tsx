import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <h1 className="text-3xl font-semibold">Guides</h1>
        <p className="text-muted-foreground">
          Educational content only. No fake inventory, prices, or dealership claims.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.slug}>
            <CardHeader>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {guide.category}
              </p>
              <CardTitle className="text-xl">
                <Link href={`/guides/${guide.slug}`} className="hover:underline">
                  {guide.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{guide.excerpt}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
