# Asset scores & first-party analytics

Rule-based scores from **our live lot** and **on-site interest** only. No external comps, auctions, MSRP indexes, competitor dealer scrapes, or invented “market demand.”

## Honesty rules

1. Every score returns `{ value, reasons[] }`. Each reason cites a concrete field or counter.
2. Missing analytics → Demand / contact Lead reasons are explicit (“No view data yet”) — never fabricated interest.
3. **Market Score** subtitle is always **Lot position** (scarcity on our floor).
4. **Competition Score** subtitle is always **On-lot peers** (live inventory peers).
5. Admin (`/admin`) traffic is not counted toward public Demand.
6. Do not claim regional market demand, auction comps, or competitor pricing in UI copy.

## Signal dictionary

| Score | Signals |
|-------|---------|
| **Aging** | `daysOnLot` vs `agingThresholds` (45 watch / 70 hot) |
| **Price** | `BikePriceHistory` drop count, recent drop %, days since drop; price vs **in-lot** same-family median |
| **Opportunity** | Same inputs as `urgencyScore`: days + recent drop + `PENDING` |
| **Joe** | `joeRating` (1–10), enrichment field completeness, `featuredRank` |
| **Lead** | Leads whose `source` contains `/inventory/{id}`; `contactClicks`, `financingOpens` |
| **Demand** | `views`, `uniqueVisitors`, `impressions`, `searchHits`, `shares`, `favorites` |
| **Market** (Lot position) | Count of live same-model / same-family peers (`publicBikeWhere`) |
| **Competition** (On-lot peers) | Live family peer count (fewer → higher) |

## Analytics pipeline

1. Client (`src/lib/analytics/client.ts`) sends events to `POST /api/analytics/collect`.
2. Events append to `AnalyticsEvent`; bike-scoped types upsert `BikeAnalytics` rollups.
3. Score engine (`src/lib/assets/score-bike.ts`) reads bike + history + rollups + peer stats — pure functions, unit-tested.

### Event types

| Type | When |
|------|------|
| `PAGE_VIEW` / `BIKE_DETAIL_VIEW` | Public `/inventory/[id]` mount |
| `TIME_ON_PAGE` | Unmount / `visibilitychange` with `meta.durationMs` |
| `INVENTORY_IMPRESSION` | Inventory card in viewport (once per session/bike) |
| `SEARCH_QUERY` / `FILTER_USAGE` | Inventory browser committed filters (debounced) |
| `CONTACT_CLICK` | Lead form focus/submit |
| `SHARE_CLICK` / `FINANCING_OPEN` / `FAVORITE` / `APPOINTMENT_REQUEST` | API-ready helpers; wire UI when product exists |

Privacy: opaque `sessionId` in `localStorage`. No PII in events.

## UI surfaces

- **JoeOS Floor** — OPP / DEM / AGE pills on asset tiles
- **JoeOS Asset detail** — full scorecard above enrichment
- **Public bike page** — scorecard + honesty blurb

## Forbidden claims (do not ship)

- “High demand in Texas / the region”
- “Priced below market / auction / MSRP”
- “Beats competitor dealers”
- LLM-generated reasons without citing DB fields
