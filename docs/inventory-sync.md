# Inventory sync — feed contract (JoeOS)

Internal JoeOS service mirrors Milwaukee Harley-Davidson **used Harley** inventory into joesusedharleys.com.

## Source of truth

`https://milwaukeeharley.com/inventory/xml?location=1595`

- Never scrape HTML.
- Never invent motorcycles.
- Never overwrite Joe-owned fields.

## Filters

1. `condition` = `used` (case-insensitive)
2. `make` = `Harley-Davidson` (case-insensitive)

## Match key

1. `vin` (primary)
2. Else `stocknumber`

## XML → Bike field map (dealership-owned only)

| XML tag | Bike field |
|---------|------------|
| `id` | `feedId` |
| `vin` | `vin` |
| `stocknumber` | `stockNumber` |
| `year` | `year` |
| `make` | `make` |
| `model` | `model` |
| `title` | `title` |
| `price` | `price` (integer dollars, rounded) |
| `miles` | `mileage` |
| `color` | `color` |
| `description` | `description` |
| `condition` | `condition` |
| `category` | `category` |
| `transmission` | `transmission` |
| `certified` | `certified` |
| `vrm` | `vrm` |
| `list` | `listPriceRaw` |
| `url` | `inventoryUrl` |
| `location_id` | `locationId` |
| `location` | `locationName` |
| `city` / `state` / `zipcode` | same |
| `telephone` / `email` | `dealerPhone` / `dealerEmail` |
| `image1`…`imageN` | `photos[]` (CDN URLs only) |

`dealerHash` = SHA-256 of canonical dealer payload (never includes Joe fields).

`SyncLog.feedVersion` = SHA-256 of raw XML body (feed has no version header).

## Joe-owned (sync never writes)

`featuredRank`, `hidden`, `joeRating`, joeInsights (`favoriteFeature`, `idealRider`, `thingsToMention`, `thingsToCheck`, `whyIDLikeIt`, `whoShouldSkipIt`, `conversationStarter`), `perfectFor`, `walkaroundVideoUrl`, `faq`, `buyingTips`, SEO/media, `internalNotes`.

## Sync behavior

- Hash match → update `lastSeenAt` only
- Hash differ + price change → insert `BikePriceHistory` then update Bike
- Missing from feed → `status=SOLD`, `hidden=true`, `soldAt=now()`
- Feed failure / malformed XML → log error, leave inventory untouched

## Cron

Hourly: `GET /api/cron/inventory-sync` with `Authorization: Bearer $CRON_SECRET`
