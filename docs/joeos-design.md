# JoeOS design system v2 — Command Center

Visual + UX contract for the private sales OS (`/admin`). Customers never see this name.

## Product language

Harley performance garage + racing telemetry density + tactical command layout.  
Not CRM. Not Stripe. Not Notion.

## Do / don’t

**Do:** void black (`#080808`), gunmetal panels, Harley orange, Oswald uppercase section brands, photo-first machine assets, dense Hot Queue, honest rule-based intelligence.

**Don’t:** SaaS metric-card trios, blue/purple gradients, soft rounded cards, invented market comps, appointments (no schema), LLM fluff.

## Tokens

Typed: [`src/design-system/`](../src/design-system/)  
Runtime: [`src/app/joeos.css`](../src/app/joeos.css) under `.jos`

## IA

| Route | Role |
|-------|------|
| `/admin` | COMMAND CENTER |
| `/admin/bikes` | FLOOR showroom |
| `/admin/bikes/[id]` | ASSET detail |
| `/admin/leads` | PIPELINE |
| `/admin/leads/[id]` | Customer file |
| `/admin/sync` | FEED bay |
| `/admin/login` | Vault lock |

## Intelligence rules (no inventions)

- Urgency score: days on lot + bonuses for recent price drop / PENDING
- Mission chips: aging bikes, stale leads (≥3 days), $ sum of aging prices
- Sales Intelligence: template from priority bike + lead counts + real price history only
- Forbidden: “below competitors,” “high demand,” fake sold comps, fake appointments
