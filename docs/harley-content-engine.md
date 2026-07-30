# Harley Content Engine

Knowledge Packs are the single source of truth for model-hub content. Inventory pages stay unit-unique and link into hubs — they do not duplicate long essays.

## Architecture

1. **Packs** — `src/content/knowledge-packs/` structured facts per taxonomy model slug  
2. **Completeness** — `sectionAvailable()` omits sections without enough facts  
3. **Compose** — `composeModelHub()` builds canonical `/harleys/[model]` articles  
4. **Optional LLM** — `npm run content:render` may rewrite pack facts into prose only; cache under `src/content/generated/model-hubs/{slug}.json` keyed by pack hash  
5. **Inventory bridge** — `ModelHubBridge` + `matchBikeToPackSlug()` (chips + deep links)

## LLM contract

- Input: one section’s structured JSON from the pack  
- Allowed: clearer wording of existing facts  
- Forbidden: new specs, prices, HP numbers, insurance quotes, approvals, competitor dealer stock, invented inventory  

Without `OPENAI_API_KEY`, hubs still render deterministic prose from packs.

## Inventory uniqueness

Keep on the listing: photos, miles, color, price, condition, Joe enrichment, scorecard, lead form.  
Inherit only: one overview sentence, suitability chips, deep links to hub anchors, related reading links.

## Forbidden claims

Same honesty rules as SEO scoring: no “#1 dealer”, “below market/competitors”, or “guaranteed approval”.

## Commands

```bash
npm test                 # includes knowledge-packs.test.ts
npm run content:render   # optional prose cache (deterministic if no API key)
```
