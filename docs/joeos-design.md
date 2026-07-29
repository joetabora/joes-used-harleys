# JoeOS design system — sales cockpit

Visual and UX contract for the private sales OS (`/admin`). Customers never see this.

Public site keeps Dark outlaw editorial styling. JoeOS is scoped under `.joeos`.

## Do / don’t

**Do:** near-black void, gunmetal panels, Harley orange accents, condensed uppercase Oswald labels, dense Hot Actions, Morning Briefing first, sharp 0–2px corners, honest empty states.

**Don’t:** SaaS metric-card trios, pastel/purple/blue accents, floating rounded cards, decorative gradients, invented appointments/market comps/AI predictions.

## Tokens

Typed source: [`src/design-system/`](../src/design-system/)

| File | Role |
|------|------|
| `colors.ts` | void / pit / panel / orange / danger / success / warn |
| `typography.ts` | brand, label, heading, kpi, body, data |
| `spacing.ts` | density + aging thresholds (45 watch / 70 hot) |
| `components.ts` | CSS recipe names + nav IA |

Runtime CSS: [`src/app/joeos.css`](../src/app/joeos.css)

## Morning Briefing rules

Computed in [`src/lib/joeos/briefing.ts`](../src/lib/joeos/briefing.ts) from real `Bike` / `Lead` / `Interaction` / `SyncLog` only:

- **Aging bikes:** days since `firstSeenAt`; watch ≥45, hot ≥70
- **Potential revenue:** sum of `price` on aging bikes (at-risk inventory $)
- **Stale leads:** `NEW`/`CONTACTED` with no interaction in ≥3 days (or never contacted)
- **Inventory radar:** family buckets from model/category string rules
- **Command brief:** template sentences from those counts — not an LLM

No Appointment model yet — calendar items are out of scope until schema exists.

## Shell

- Desktop: left rail (Briefing / Inventory / Leads / Sync / Site / Sign out)
- Mobile: bottom nav + compact sign-out chip
- Public header/footer hidden on `/admin/*` via `SiteChrome`
