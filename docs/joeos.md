# JoeOS (internal)

**JoeOS** is the private sales operating system behind joesusedharleys.com.

Customers never see this name.

| Surface | Role |
|---------|------|
| joesusedharleys.com | Customer-facing website |
| JoeOS (`/admin`, `src/lib/services`, cron) | Private sales OS |

## Surfaces

- **COMMAND** (`/admin`) — Today’s Mission, Hot Queue, Inventory Radar, Sales Intelligence
- **FLOOR** (`/admin/bikes`) — photo-first machine assets
- **PIPELINE** (`/admin/leads`) — follow-up queue
- **FEED** (`/admin/sync`) — inventory sync bay

Design contract: [joeos-design.md](./joeos-design.md) (v3)

Public SEO architecture: [seo-architecture.md](./seo-architecture.md)

## Long-term capabilities

- Inventory sync (v1 — shipped)
- Morning / command briefing (v1 — rule-based from live data)
- CRM / lead follow-up
- Analytics event wiring (`BikeAnalytics`)
- AI sales coach (LLM — not yet)
- Appointments calendar (needs schema)
- Harley Match
- Customer recommendations

Architecture favors a licensable multi-dealer platform later: dealership feed adapter + Joe enrichment layer stay separable.

## ScanBike (related product)

ScanBike is an **independent** VIN/QR vehicle app at `/v/{VIN}` (see [scanbike.md](./scanbike.md)).

JoeOS operates ScanBike (Floor QR download, sync visibility, Pipeline leads with `product=SCANBIKE`, Command analytics panel) but does **not** own the customer UI.

Shared: Postgres `Bike` + inventory sync only. UI packages must not cross-import (`components/joeos` ↛ `components/vehicle`).

Multi-dealer path: plug a feed adapter into `inventory-sync` that maps to `ParsedFeedItem`; ScanBike stays theme-driven via `NEXT_PUBLIC_SCANBIKE_*` env.
