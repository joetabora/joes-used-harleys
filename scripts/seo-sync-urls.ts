/**
 * Sync SeoUrl rows from taxonomy + guides.
 * Run: npx tsx scripts/seo-sync-urls.ts
 * DB optional — prints counts when prisma unavailable.
 */

import "dotenv/config";
import {
  composeSeoDocument,
  defaultFaqs,
  section,
} from "../src/lib/seo/compose-page";
import { scoreSeoPage, statusFromScore } from "../src/lib/seo/scoring";
import {
  FAMILIES,
  getModel,
  listColors,
  listComparisons,
  listEngines,
  listGeo,
  listModels,
  listTopics,
} from "../src/lib/content/taxonomy";
import {
  getPublishedGuides,
  listEventGuides,
  listRouteGuides,
} from "../src/lib/content/guides";

type Row = {
  path: string;
  type: string;
  score: number;
  status: "DRAFT" | "NOINDEX" | "INDEX";
  payload: Record<string, unknown>;
};

function scoreDoc(partial: Parameters<typeof composeSeoDocument>[0]): Row {
  const doc = composeSeoDocument(partial);
  return {
    path: doc.path,
    type: String(partial.type ?? "HUB").toUpperCase(),
    score: doc.score,
    status: doc.status,
    payload: { title: doc.title, h1: doc.h1 },
  };
}

function buildRows(): Row[] {
  const rows: Row[] = [];

  const staticHubs = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About" },
    { path: "/contact", title: "Contact" },
    { path: "/how-it-works", title: "How it works" },
    { path: "/inventory", title: "Inventory" },
    { path: "/guides", title: "Guides" },
    { path: "/harleys", title: "Harley models" },
    { path: "/used-harleys", title: "Local Harley buyers" },
    { path: "/routes", title: "Route guides" },
    { path: "/events", title: "Events" },
    { path: "/compare", title: "Comparisons" },
  ];

  for (const h of staticHubs) {
    rows.push({
      path: h.path,
      type: "HUB",
      score: 85,
      status: "INDEX",
      payload: { title: h.title },
    });
  }

  for (const topic of listTopics()) {
    rows.push({
      path: `/guides/${topic.slug}`,
      type: "HUB",
      score: 80,
      status: "INDEX",
      payload: { topic: topic.slug },
    });
  }

  for (const g of getPublishedGuides()) {
    const doc = composeSeoDocument({
      path: `/guides/${g.topic}/${g.slug}`,
      title: g.title,
      description: g.excerpt,
      h1: g.title,
      type: "guide",
      ogType: "article",
      sections: g.sections,
      faqs: g.faqs,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: g.topic, path: `/guides/${g.topic}` },
        { name: g.title, path: `/guides/${g.topic}/${g.slug}` },
      ],
      relatedLinks: [],
      relatedInventoryHint: g.models?.[0] ? { model: g.models[0] } : {},
    });
    rows.push({
      path: doc.path,
      type: "GUIDE",
      score: doc.score,
      status: doc.status,
      payload: { topic: g.topic, slug: g.slug },
    });
  }

  for (const m of listModels()) {
    const years = m.yearsInProduction.slice(-12);
    const modelDoc = composeSeoDocument({
      path: `/harleys/${m.slug}`,
      title: `Used ${m.displayName} Harley buying guide`,
      description: m.summary,
      h1: `Used ${m.displayName}`,
      type: "model",
      sections: [
        section("Overview", m.summary),
        section("Who it's for", m.whoItsFor),
        section(
          "Years to know",
          `Common years in this guide set: ${years.join(", ")}. Confirm options and condition on any live unit.`,
        ),
      ],
      faqs: defaultFaqs("model", m.displayName),
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Harleys", path: "/harleys" },
        { name: m.displayName, path: `/harleys/${m.slug}` },
      ],
      relatedLinks: [],
      relatedInventoryHint: { model: m.displayName },
    });
    rows.push({
      path: modelDoc.path,
      type: "MODEL",
      score: modelDoc.score,
      status: modelDoc.status,
      payload: { model: m.slug },
    });

    for (const year of years) {
      const yd = composeSeoDocument({
        path: `/harleys/${m.slug}/${year}`,
        title: `${year} ${m.displayName} used buying notes`,
        description: `What to check on a ${year} ${m.displayName} — educational notes plus live inventory when available.`,
        h1: `${year} ${m.displayName}`,
        type: "model",
        sections: [
          section(
            "Year focus",
            `You're looking at ${year} ${m.displayName} examples. Specs and options vary — verify on the VIN and build sheet.`,
          ),
          section("Inspection priorities", m.whoItsFor),
          section("Next step", "Compare live inventory below or ask Joe what's realistic for your budget."),
        ],
        faqs: defaultFaqs("year", `${year} ${m.displayName}`),
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Harleys", path: "/harleys" },
          { name: m.displayName, path: `/harleys/${m.slug}` },
          { name: String(year), path: `/harleys/${m.slug}/${year}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: { model: m.displayName, year },
      });
      rows.push({
        path: yd.path,
        type: "MODEL_YEAR",
        score: yd.score,
        status: yd.status,
        payload: { model: m.slug, year },
      });
    }
  }

  for (const family of FAMILIES) {
    rows.push(
      scoreDoc({
        path: `/harleys/family/${family.toLowerCase()}`,
        title: `Used Harley ${family} bikes`,
        description: `How the ${family} family fits different riders — with links to models and live inventory.`,
        h1: `${family} Harleys`,
        type: "model",
        sections: [
          section(
            "Family overview",
            `${family} is a practical way to narrow used Harley shopping. Sit on multiple models before you decide.`,
          ),
          section(
            "Honesty rule",
            "We do not invent which family is 'hottest.' Fit and condition matter more than trends.",
          ),
        ],
        faqs: defaultFaqs("family", family),
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Harleys", path: "/harleys" },
          { name: family, path: `/harleys/family/${family.toLowerCase()}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: { family },
      }),
    );
  }

  for (const c of listColors()) {
    rows.push(
      scoreDoc({
        path: `/harleys/colors/${c.slug}`,
        title: `${c.name} used Harley paint notes`,
        description: `Shopping used Harleys in ${c.name} — inspect paint honestly, ignore rarity myths.`,
        h1: c.name,
        type: "website",
        sections: [
          section(
            "Paint on used bikes",
            `${c.name} shows up across many years. Inspect fading, chips, and resprays in daylight.`,
          ),
          section("Color is preference", "Buy the bike that fits. Paint is secondary to mechanical condition."),
        ],
        faqs: defaultFaqs("color", c.name),
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Harleys", path: "/harleys" },
          { name: "Colors", path: "/harleys/colors" },
          { name: c.name, path: `/harleys/colors/${c.slug}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: { color: c.name },
      }),
    );
  }

  for (const e of listEngines()) {
    rows.push(
      scoreDoc({
        path: `/harleys/engines/${e.slug}`,
        title: `${e.name} engine overview`,
        description: e.notes,
        h1: e.name,
        type: "website",
        sections: [
          section("Era", e.era),
          section("Notes", e.notes),
          section(
            "Confirm on the bike",
            "Displacement, tune, and options vary by year and model. Use the VIN and service records.",
          ),
        ],
        faqs: defaultFaqs("engine", e.name),
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Harleys", path: "/harleys" },
          { name: "Engines", path: "/harleys/engines" },
          { name: e.name, path: `/harleys/engines/${e.slug}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: {},
      }),
    );
  }

  for (const cmp of listComparisons()) {
    const a = getModel(cmp.a);
    rows.push(
      scoreDoc({
        path: `/compare/${cmp.slug}`,
        title: cmp.title,
        description: cmp.excerpt,
        h1: cmp.title,
        type: "compare",
        sections: cmp.sections,
        faqs: cmp.faqs,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: cmp.title, path: `/compare/${cmp.slug}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: { model: a?.displayName },
      }),
    );
  }

  const allModels = listModels();

  for (const city of listGeo()) {
    rows.push(
      scoreDoc({
        path: `/used-harleys/${city.slug}`,
        title: city.headline,
        description: city.intro,
        h1: city.headline,
        type: "local",
        sections: [
          section("Buying with Joe", city.intro),
          section(
            "Inventory honesty",
            "We never invent local stock counts. Related inventory below is mirrored from the live feed when connected.",
          ),
        ],
        faqs: defaultFaqs("city", city.name),
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Local", path: "/used-harleys" },
          { name: city.name, path: `/used-harleys/${city.slug}` },
        ],
        relatedLinks: [],
        relatedInventoryHint: {},
      }),
    );

    for (const m of allModels) {
      rows.push(
        scoreDoc({
          path: `/used-harleys/${city.slug}/${m.slug}`,
          title: `Used ${m.displayName} for ${city.name} buyers`,
          description: `${city.name}, ${city.state} riders shopping a used ${m.displayName}. Education first — live inventory when available.`,
          h1: `${m.displayName} in ${city.name}`,
          type: "local",
          sections: [
            section("Local framing", city.intro),
            section("Model notes", m.summary),
            section("Who it's for", m.whoItsFor),
          ],
          faqs: defaultFaqs("city-model", `${m.displayName} near ${city.name}`),
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Local", path: "/used-harleys" },
            { name: city.name, path: `/used-harleys/${city.slug}` },
            { name: m.displayName, path: `/used-harleys/${city.slug}/${m.slug}` },
          ],
          relatedLinks: [],
          relatedInventoryHint: { model: m.displayName },
        }),
      );

      if (city.tier === "primary") {
        for (const year of m.yearsInProduction) {
          rows.push(
            scoreDoc({
              path: `/used-harleys/${city.slug}/${m.slug}/${year}`,
              title: `${year} ${m.displayName} for ${city.name} buyers`,
              description: `Shopping a ${year} ${m.displayName} from ${city.name}, ${city.state} — educational landing with live inventory when available.`,
              h1: `${year} ${m.displayName} · ${city.name}`,
              type: "local",
              sections: [
                section("Intent", `Riders near ${city.name} often compare ${year} ${m.displayName} examples. Confirm options on the actual bike.`),
                section("Model context", m.summary),
                section("Next step", "Review live inventory or contact Joe — we do not invent stock."),
              ],
              faqs: defaultFaqs("local-year", `${year} ${m.displayName}`),
              breadcrumbs: [
                { name: "Home", path: "/" },
                { name: city.name, path: `/used-harleys/${city.slug}` },
                { name: m.displayName, path: `/used-harleys/${city.slug}/${m.slug}` },
                {
                  name: String(year),
                  path: `/used-harleys/${city.slug}/${m.slug}/${year}`,
                },
              ],
              relatedLinks: [],
              relatedInventoryHint: { model: m.displayName, year },
            }),
          );
        }
      }
    }
  }

  for (const r of listRouteGuides()) {
    const scored = scoreSeoPage({
      path: `/routes/${r.slug}`,
      title: r.title,
      description: r.excerpt,
      h1: r.title,
      type: "guide",
      sections: r.sections,
      faqs: r.faqs,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Routes", path: "/routes" },
        { name: r.title, path: `/routes/${r.slug}` },
      ],
      relatedLinks: [],
      indexable: true,
    });
    rows.push({
      path: `/routes/${r.slug}`,
      type: "ROUTE",
      score: scored.score,
      status: statusFromScore(scored.score),
      payload: { slug: r.slug },
    });
  }

  for (const e of listEventGuides()) {
    const scored = scoreSeoPage({
      path: `/events/${e.slug}`,
      title: e.title,
      description: e.excerpt,
      h1: e.title,
      type: "event",
      sections: e.sections,
      faqs: e.faqs,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: e.title, path: `/events/${e.slug}` },
      ],
      relatedLinks: [],
      indexable: true,
    });
    rows.push({
      path: `/events/${e.slug}`,
      type: "EVENT",
      score: scored.score,
      status: statusFromScore(scored.score),
      payload: { slug: e.slug },
    });
  }

  return rows;
}

async function main() {
  const rows = buildRows();
  const byStatus = rows.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log(`SeoUrl candidates: ${rows.length}`);
  console.log("By status:", byStatus);

  const { PrismaClient } = await import("../src/generated/prisma/client");
  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { Pool } = await import("pg");

  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL unset — dry count only.");
    return;
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  let upserted = 0;
  for (const row of rows) {
    await prisma.seoUrl.upsert({
      where: { path: row.path },
      create: {
        path: row.path,
        type: row.type as never,
        status: row.status,
        score: row.score,
        scoreDetail: row.payload as object,
        payload: row.payload as object,
      },
      update: {
        type: row.type as never,
        status: row.status,
        score: row.score,
        scoreDetail: row.payload as object,
        payload: row.payload as object,
      },
    });
    upserted += 1;
  }

  console.log(`Upserted ${upserted} SeoUrl rows.`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
