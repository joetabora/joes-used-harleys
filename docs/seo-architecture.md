# Harley SEO system

Hybrid curated + programmatic SEO for Joe's Used Harleys (Southeast Wisconsin focus).

## Sources of truth

- Taxonomy: `src/content/taxonomy/*.json`
- Guides (MDX-shaped TS modules): `src/content/guides/**`
- SEO shell: `src/lib/seo/**`
- Ops tables: `SeoUrl`, `SeoIndexPing` (Prisma)

## Commands

```bash
npm run seo:sync    # upsert SeoUrl rows (needs DATABASE_URL)
npm test            # includes seo-scoring tests
```

## IndexNow

Set `INDEXNOW_KEY` and host `public/{key}.txt`. Inventory sync pings IndexNow best-effort.

## Honesty

Never invent inventory, prices, comps, or dealer rankings. Empty related inventory is OK.
