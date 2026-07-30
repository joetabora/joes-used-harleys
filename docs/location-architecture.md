# Southeast Wisconsin location architecture

Service-area local SEO for Joe's Used Harleys. One real NAP. Unique Location Knowledge Packs. No doorway city-name swaps.

## Locked rules

- **Single NAP + areaServed** — `NEXT_PUBLIC_BUSINESS_*` env vars; `localBusinessJsonLd()` emits only when NAP is complete.
- **No fake branches** — city pages help buyers near that city; they do not claim a storefront in every town.
- **Service pages** — buyer education only (questions to ask after purchase). Never service menus, shop hours, or “our service department.”
- **Anti-doorway** — SE WI primary hubs require a Location Knowledge Pack that passes richness gates before indexing.

## URLs

| Path | Role |
|------|------|
| `/used-harleys/[city]` | Canonical city hub |
| `/used-harleys/[city]/inventory` | Inventory framing + live related inventory |
| `/used-harleys/[city]/buying` | Buying guide |
| `/used-harleys/[city]/trade-in` | Trade-in guidance |
| `/used-harleys/[city]/financing` | Financing (process only) |
| `/used-harleys/[city]/events` | Events framing |
| `/used-harleys/[city]/service` | Service education |
| `/used-harleys/[city]/routes` | Nearby riding |
| `/used-harleys/[city]/faq` | FAQ |

City×model×year routes remain; they link up to the city hub.

## Sources of truth

- Geo: `src/content/taxonomy/geo.json`
- Packs: `src/content/location-packs/`
- Composer: `src/lib/content/compose-location.ts`

## NAP / Google Business env

```
NEXT_PUBLIC_BUSINESS_STREET=
NEXT_PUBLIC_BUSINESS_CITY=
NEXT_PUBLIC_BUSINESS_REGION=WI
NEXT_PUBLIC_BUSINESS_POSTAL=
NEXT_PUBLIC_BUSINESS_COUNTRY=US
NEXT_PUBLIC_BUSINESS_LAT=
NEXT_PUBLIC_BUSINESS_LNG=
NEXT_PUBLIC_GOOGLE_BUSINESS_URL=
```

Travel distance (straight-line miles) appears only when business geo and pack city coords are both set — never invented drive times.

## Commands

```bash
npm test   # includes location-packs.test.ts
```
