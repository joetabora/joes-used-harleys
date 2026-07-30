import { SITEMAP_SHARDS } from "@/lib/seo/sitemap-data";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Sitemap index XML at /sitemap.xml */
export async function GET() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_SHARDS.map(
  (shard) => `  <sitemap>
    <loc>${base}/sitemap/${shard}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
