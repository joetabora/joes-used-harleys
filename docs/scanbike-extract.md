# ScanBike standalone extraction

When splitting ScanBike into its own Next.js deploy:

## Move

1. `src/app/(scanbike)/v` → `app/v` (or keep route group)
2. `src/components/vehicle`
3. `src/lib/vehicle`
4. ScanBike APIs under `app/api/v`
5. Prisma `Bike` / `Lead` / `AnalyticsEvent` models needed for read + leads (or shared package)

## Keep shared

- Same Postgres (or read replica) as JoeOS inventory SSOT
- Prefer **read-only** ScanBike against DB; run inventory sync only from JoeOS / shared worker
- Optionally extract `src/lib/services/inventory-sync` as an internal package later

## Cutover

1. Set `NEXT_PUBLIC_SCANBIKE_URL` / DNS to the new origin
2. Preserve path `/v/{VIN}` so printed QR stickers remain valid
3. Theme via `NEXT_PUBLIC_SCANBIKE_DEALER_*` — never hard-code Joe branding

## Multi-dealer

Implement a feed adapter that maps dealer XML/JSON → `ParsedFeedItem` / `DealerBikePayload`. Visibility rules and ScanBike UI stay dealership-neutral.
