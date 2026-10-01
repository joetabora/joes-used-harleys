import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { publicBikeWhere } from "@/lib/inventory-public";
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
import { scanBikeVinPath } from "@/lib/vehicle/urls";

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

  const topics = [
    "inventory",
    "buying",
    "trade-in",
    "financing",
    "events",
    "service",
    "routes",
    "faq",
  ] as const;

  // Local sitemap: SE WI primary city hubs + topics only.
  // Exclude secondary markets and thin city×model / city×model×year matrices.
  for (const city of listGeo()) {
    if (city.region !== "southeast-wi" || city.tier !== "primary") continue;
    entries.push(u(`/used-harleys/${city.slug}`, "local"));
    for (const topic of topics) {
      entries.push(u(`/used-harleys/${city.slug}/${topic}`, "local"));
    }
  }

  for (const r of listRouteGuides()) entries.push(u(`/routes/${r.slug}`, "guides"));
  for (const e of listEventGuides()) entries.push(u(`/events/${e.slug}`, "guides"));

  return entries;
}

export async function buildInventorySitemapEntries(): Promise<SitemapEntry[]> {
  if (!isDatabaseConfigured() || !prisma) return [];
  const bikes = await prisma.bike.findMany({
    where: publicBikeWhere,
    select: { id: true, updatedAt: true, createdAt: true },
  });
  return bikes.map((b) =>
    u(`/inventory/${b.id}`, "inventory", b.updatedAt ?? b.createdAt),
  );
}

/** ScanBike PUBLIC_INDEX VIN pages only — never QR_ONLY / archived / non-Harley. */
export async function buildScanBikeSitemapEntries(): Promise<SitemapEntry[]> {
  if (!isDatabaseConfigured() || !prisma) return [];
  try {
    const bikes = await prisma.bike.findMany({
      where: {
        scanVisibility: "PUBLIC_INDEX",
        status: { in: ["AVAILABLE", "PENDING"] },
        OR: [{ scanSlugVin: { not: null } }, { vin: { not: null } }],
      },
      select: {
        vin: true,
        scanSlugVin: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return bikes
      .map((b) => {
        const slug = b.scanSlugVin ?? b.vin;
        if (!slug) return null;
        return u(scanBikeVinPath(slug), "scanbike", b.updatedAt ?? b.createdAt);
      })
      .filter((e): e is SitemapEntry => Boolean(e));
  } catch {
    return [];
  }
}

export async function buildAllSitemapEntries(): Promise<SitemapEntry[]> {
  const tax = buildTaxonomySitemapEntries();
  const inv = await buildInventorySitemapEntries();
  const scan = await buildScanBikeSitemapEntries();

  if (isDatabaseConfigured() && prisma) {
    try {
      const indexed = await prisma.seoUrl.findMany({
        where: { status: "INDEX" },
        select: { path: true, lastModified: true, type: true },
      });
      if (indexed.length > 0) {
        const primaryLocalSlugs = new Set(
          listGeo()
            .filter((c) => c.region === "southeast-wi" && c.tier === "primary")
            .map((c) => c.slug),
        );
        const fromDb = indexed
          .filter((row) => {
            // Phase 1: never reintroduce thin city×model matrices from stale INDEX rows.
            if (row.type === "CITY_MODEL" || row.type === "CITY_MODEL_YEAR") {
              return false;
            }
            const cityHub = row.path.match(/^\/used-harleys\/([^/]+)$/);
            if (cityHub && !primaryLocalSlugs.has(cityHub[1])) return false;
            const cityModel = row.path.match(
              /^\/used-harleys\/[^/]+\/[^/]+(?:\/\d+)?$/,
            );
            if (cityModel) {
              const seg = row.path.split("/")[3];
              const topics = new Set([
                "inventory",
                "buying",
                "trade-in",
                "financing",
                "events",
                "service",
                "routes",
                "faq",
              ]);
              // Allow city topic pages; block city/model and city/model/year.
              if (!topics.has(seg ?? "")) return false;
            }
            return true;
          })
          .map((row) => {
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
        // Prefer DB INDEX set when present; still include inventory + ScanBike live
        return [...fromDb, ...inv, ...scan];
      }
    } catch {
      /* table may not exist yet */
    }
  }

  return [...tax, ...inv, ...scan];
}

export const SITEMAP_SHARDS = [
  "static",
  "guides",
  "harleys",
  "local",
  "compare",
  "inventory",
  "scanbike",
] as const;
export type SitemapShard = (typeof SITEMAP_SHARDS)[number];
