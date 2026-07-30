import { buildAllSitemapEntries, type SitemapShard } from "@/lib/seo/sitemap-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ shard: string }> };

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(_req: Request, { params }: Props) {
  const { shard: raw } = await params;
  const shard = raw.replace(/\.xml$/, "") as SitemapShard;
  const all = await buildAllSitemapEntries();
  const entries = all.filter((e) => e.shard === shard);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${xmlEscape(e.url)}</loc>
    <lastmod>${e.lastModified.toISOString()}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
