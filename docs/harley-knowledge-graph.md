# Harley Knowledge Graph (JoeOS SSOT)

JoeOS Knowledge Console is the **single source of truth** for structured Harley education. The public site is a **published projection** of the graph — never draft/in-review nodes.

## Data model

Prisma models (see `prisma/schema.prisma`):

| Model | Role |
|-------|------|
| `KnowledgeEntity` | Typed node (`MODEL`, `FAMILY`, `GENERATION`, `TRIM`, topics, `CITY`, …) with `facts` JSON, status, SEO overrides |
| `KnowledgeRelation` | First-class edges (`IN_FAMILY`, `USES_ENGINE`, `HAS_GENERATION`, `HAS_TRIM`, `COMPARES`, `RELATED_GUIDE`, …) |
| `KnowledgeRevision` | Snapshot on every save/status change |

Statuses: `DRAFT` → `IN_REVIEW` → `PUBLISHED` | `ARCHIVED`.

## Seed

```bash
npm run knowledge:seed   # requires DATABASE_URL
```

Idempotent upsert by `(type, slug)` from:

- Taxonomy (`src/content/taxonomy/**`)
- Model knowledge packs + location packs
- Published file guides / routes / events
- Curated expansions: **Dyna** / **CVO** families, starter generations, Street Glide Special trim, upgrade / ownership / riding topics

Seed may mark entities `PUBLISHED` for bootstrap. Console publish still enforces `canPublish`.

## Publish gate (`canPublish`)

1. Type-specific `factsMeetFloor` completeness
2. Title + summary (≥40 chars)
3. `scoreSeoPage(composeDraftDocument(entity))` must be **INDEX** (≥70)

Thin entities cannot reach `PUBLISHED` from the console.

## Public URL map

| Type | Path |
|------|------|
| FAMILY | `/harleys/family/[slug]` |
| MODEL | `/harleys/[slug]` |
| GENERATION | `/harleys/generations/[slug]` |
| TRIM | `/harleys/trims/[slug]` |
| ENGINE / COLOR | `/harleys/engines|colors/[slug]` |
| COMPARISON | `/compare/[slug]` |
| Guide topics | `/guides/[topic]/[slug]` (hubs: `/guides/[topic]`) |
| CITY | `/used-harleys/[slug]` |
| ROUTE / EVENT | `/routes/[slug]`, `/events/[slug]` |

Composers: `resolvePublishedDocument` / `composeFromEntity` first; **file composers** only if DB empty or entity missing.

Unpublished → public 404 / noindex (generations & trims are graph-only).

## JoeOS Knowledge Console

- `/admin/knowledge` — filter, search, create draft
- `/admin/knowledge/[id]` — edit facts JSON, relations, SEO score, suggested links, revisions, AI section assist (prose-only rewrite; human must save/publish)

Nav: **Knowledge (KG)** in JoeOS rail.

## Cross-linking & inventory

- `neighbors(entityId)` + `suggestLinksFromNeighbors` drive Related modules
- Inventory `ModelHubBridge` prefers graph neighbors when a published MODEL exists
- Educational pages always offer `/inventory`; inventory never invents stock

## Explicit non-goals (this phase)

- Year × color × trim doorway matrix
- Full media library / WYSIWYG
- Multi-user ACL
- Automated IndexNow on every publish

## Honesty

Never invent inventory, prices, comps, dealer rankings, service menus, or NAP branches.
