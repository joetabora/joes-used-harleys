import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import { getPublishedGuides, listEventGuides, listRouteGuides } from "@/lib/content/guides";
import {
  FAMILIES,
  listColors,
  listComparisons,
  listEngines,
  listGeo,
  listModels,
  listTopics,
} from "@/lib/content/taxonomy";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  shard: string;
};

const base = () => siteConfig.url.replace(/\/+$/, "");

function u(path: string, shard: string, lastModified = new Date()): SitemapEntry {
  return { url: `${base()}${path === "/" ? "" : path}`, lastModified, shard };
}

/** Build sitemap entries from taxonomy (no DB required). */
export function buildTaxonomySitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const path of [
    "/",
    "/about",
    "/contact",
    "/how-it-works",
    "/inventory",
    "/guides",
    "/harleys",
    "/harleys/colors",
    "/harleys/engines",
    "/used-harleys",
    "/compare",
    "/routes",
    "/events",
  ]) {
    entries.push(u(path, "static"));
  }

  for (const t of listTopics()) entries.push(u(`/guides/${t.slug}`, "guides"));
  for (const g of getPublishedGuides()) {
    entries.push(u(`/guides/${g.topic}/${g.slug}`, "guides"));
  }

  for (const m of listModels()) {
    entries.push(u(`/harleys/${m.slug}`, "harleys"));
    for (const y of m.yearsInProduction.slice(-12)) {
      entries.push(u(`/harleys/${m.slug}/${y}`, "harleys"));
    }
  }
  for (const f of FAMILIES) entries.push(u(`/harleys/family/${f.toLowerCase()}`, "harleys"));
  for (const c of listColors()) entries.push(u(`/harleys/colors/${c.slug}`, "harleys"));
  for (const e of listEngines()) entries.push(u(`/harleys/engines/${e.slug}`, "harleys"));
  for (const c of listComparisons()) entries.push(u(`/compare/${c.slug}`, "compare"));

  const allModels = listModels();
  for (const city of listGeo()) {
    entries.push(u(`/used-harleys/${city.slug}`, "local"));
    for (const m of allModels) {
      entries.push(u(`/used-harleys/${city.slug}/${m.slug}`, "local"));
      if (city.tier === "primary") {
        for (const y of m.yearsInProduction) {
          entries.push(u(`/used-harleys/${city.slug}/${m.slug}/${y}`, "local"));
        }
      }
    }
  }

  for (const r of listRouteGuides()) entries.push(u(`/routes/${r.slug}`, "guides"));
  for (const e of listEventGuides()) entries.push(u(`/events/${e.slug}`, "guides"));

  return entries;
}

export async function buildInventorySitemapEntries(): Promise<SitemapEntry[]> {
  if (!isDatabaseConfigured() || !prisma) return [];
  const bikes = await prisma.bike.findMany({
    where: { status: { in: ["AVAILABLE", "PENDING"] }, hidden: false },
    select: { id: true, updatedAt: true, createdAt: true },
  });
  return bikes.map((b) =>
    u(`/inventory/${b.id}`, "inventory", b.updatedAt ?? b.createdAt),
  );
}

export async function buildAllSitemapEntries(): Promise<SitemapEntry[]> {
  const tax = buildTaxonomySitemapEntries();
  const inv = await buildInventorySitemapEntries();

  if (isDatabaseConfigured() && prisma) {
    try {
      const indexed = await prisma.seoUrl.findMany({
        where: { status: "INDEX" },
        select: { path: true, lastModified: true, type: true },
      });
      if (indexed.length > 0) {
        const fromDb = indexed.map((row) => {
          const shard =
            row.type === "INVENTORY"
              ? "inventory"
              : row.type === "GUIDE" || row.type === "ROUTE" || row.type === "EVENT"
                ? "guides"
                : row.type === "CITY" ||
                    row.type === "CITY_MODEL" ||
                    row.type === "CITY_MODEL_YEAR"
                  ? "local"
                  : row.type === "COMPARE"
                    ? "compare"
                    : row.type === "HUB" || row.type === "STATIC"
                      ? "static"
                      : "harleys";
          return u(row.path, shard, row.lastModified);
        });
        // Prefer DB INDEX set when present; still include inventory live
        return [...fromDb, ...inv];
      }
    } catch {
      /* table may not exist yet */
    }
  }

  return [...tax, ...inv];
}

export const SITEMAP_SHARDS = ["static", "guides", "harleys", "local", "compare", "inventory"] as const;
export type SitemapShard = (typeof SITEMAP_SHARDS)[number];
