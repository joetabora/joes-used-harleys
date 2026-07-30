import { SITEMAP_SHARDS } from "@/lib/seo/sitemap-data";
import { assertSafeSiteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Sitemap index XML at /sitemap.xml — always uses NEXT_PUBLIC_SITE_URL (never invent host). */
export async function GET() {
  const base = assertSafeSiteUrl(siteConfig.url, {
    requirePublic: process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL),
  });
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
