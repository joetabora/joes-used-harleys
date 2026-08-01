# ScanBike — independent VIN/QR vehicle information product

## Product boundary

- Audience: anyone beside a bike (digital window sticker via QR).
- Copy/UI must never mention Joe, JoeOS, or personal salesperson branding.
- Current surface: informational only (photos, specs, description, share). Scheduling, leads, and estimators are deferred.

## Shared with JoeOS only

- Postgres inventory (`Bike` + sync artifacts)
- Inventory sync engine

## Not shared

- Joe branding, JoeOS UI, Joe enrichment, marketing chrome, knowledge graph SEO

## Folder seams (extractable)

- `src/app/(scanbike)/v` — routes + layout
- `src/components/vehicle` — ScanBike UI only
- `src/lib/vehicle` — visibility, URLs, compose, QR payload, dealer theme

Hard rule: `components/joeos` must not import `components/vehicle`.
`components/vehicle` must not import `components/joeos` or Joe site chrome.

## Canonical URLs

- VIN present → `/v/{VIN}` forever (QR payload)
- VIN empty → `/v/s/{stock}` temporary; 301 to VIN when VIN appears

## Visibility (sync-owned)

- Used Harley available/pending → `PUBLIC_INDEX`
- New Harley / Non-Harley → `QR_ONLY` (noindex)
- Sold → `ARCHIVED` (default) or `HIDDEN` (`SCANBIKE_ARCHIVE_SOLD=false`)

## Standalone extract (Phase 4)

See [scanbike-extract.md](./scanbike-extract.md).

1. Move `(scanbike)/v`, `components/vehicle`, `lib/vehicle`.
2. Keep same Postgres (or replica) via Prisma Bike model.
3. Sync stays on JoeOS or shared worker; ScanBike can be read-only.
4. Point `NEXT_PUBLIC_SCANBIKE_URL` / DNS; keep `/v/{VIN}` path.

## Dealer theme env

- `NEXT_PUBLIC_SCANBIKE_DEALER_NAME`
- `NEXT_PUBLIC_SCANBIKE_DEALER_PHONE` / `_EMAIL` / `_CITY` / `_STATE`
- `NEXT_PUBLIC_SCANBIKE_ACCENT`
- `NEXT_PUBLIC_SCANBIKE_URL` (optional absolute origin for QR)
- `SCANBIKE_ARCHIVE_SOLD` (default true)

## Multi-dealer adapter path

Feed parsing already lives under `inventory-sync`. Future dealers plug a feed adapter that maps to `ParsedFeedItem` / `DealerBikePayload`; ScanBike remains dealership-neutral and theme-driven via env.
