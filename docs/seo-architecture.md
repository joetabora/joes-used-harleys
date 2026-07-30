# Harley SEO system

Hybrid curated + programmatic SEO for Joe's Used Harleys (Southeast Wisconsin focus).

## Sources of truth

- **JoeOS Knowledge Graph (SSOT for published education):** Prisma `KnowledgeEntity` + relations — see [harley-knowledge-graph.md](./harley-knowledge-graph.md). Public pages prefer **PUBLISHED** graph nodes.
- Taxonomy / packs / guides under `src/content/**` remain **seed input** and file fallback when the DB is empty.
- **Knowledge Packs (model hubs):** `src/content/knowledge-packs/**` — see [harley-content-engine.md](./harley-content-engine.md)
- **Location Packs (SE WI city hubs):** `src/content/location-packs/**` — see [location-architecture.md](./location-architecture.md)
- Guides (MDX-shaped TS modules): `src/content/guides/**`
- SEO shell: `src/lib/seo/**`
- Ops tables: `SeoUrl`, `SeoIndexPing` (Prisma)

## Commands

```bash
npm run knowledge:seed   # upsert graph from taxonomy/packs/guides (needs DATABASE_URL)
npm run seo:sync         # upsert SeoUrl rows (needs DATABASE_URL)
npm run content:render   # optional hub prose cache from Knowledge Packs
npm test                 # includes seo-scoring + knowledge-pack + knowledge-graph tests
```

## IndexNow

Set `INDEXNOW_KEY` and host `public/{key}.txt`. Inventory sync pings IndexNow best-effort.

## Canonical site URL

Single source: `NEXT_PUBLIC_SITE_URL` → `siteConfig.url` (`src/lib/site.ts`).

- Sitemap index + shards and `robots.txt` all derive from this value.
- Production / Vercel builds **fail** if the URL is missing, `http://`, or localhost (`npm run assert:site-url` runs in `npm run build`).
- Canonical production value: `https://www.joesusedharleys.com`

## Honesty

Never invent inventory, prices, comps, or dealer rankings. Empty related inventory is OK.
Model hubs omit sections when Knowledge Pack facts are insufficient — never fill with speculation.
