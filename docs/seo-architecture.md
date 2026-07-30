# Harley SEO system

Hybrid curated + programmatic SEO for Joe's Used Harleys (Southeast Wisconsin focus).

## Sources of truth

- Taxonomy: `src/content/taxonomy/*.json`
- **Knowledge Packs (model hubs):** `src/content/knowledge-packs/**` — see [harley-content-engine.md](./harley-content-engine.md)
- **Location Packs (SE WI city hubs):** `src/content/location-packs/**` — see [location-architecture.md](./location-architecture.md)
- Guides (MDX-shaped TS modules): `src/content/guides/**`
- SEO shell: `src/lib/seo/**`
- Ops tables: `SeoUrl`, `SeoIndexPing` (Prisma)

## Commands

```bash
npm run seo:sync         # upsert SeoUrl rows (needs DATABASE_URL)
npm run content:render   # optional hub prose cache from Knowledge Packs
npm test                 # includes seo-scoring + knowledge-pack tests
```

## IndexNow

Set `INDEXNOW_KEY` and host `public/{key}.txt`. Inventory sync pings IndexNow best-effort.

## Honesty

Never invent inventory, prices, comps, or dealer rankings. Empty related inventory is OK.
Model hubs omit sections when Knowledge Pack facts are insufficient — never fill with speculation.
