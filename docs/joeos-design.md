# JoeOS design system v3 — Command Center

Visual + UX contract for the private sales OS (`/admin`). Customers never see this name.

## Product language

Harley performance garage + racing telemetry density + tactical command layout.  
Not CRM. Not Stripe. Not Notion.

## Do / don’t

**Do:** void black (`#080808`), gunmetal panels, Harley orange, Oswald section brands (one per region), photo-first machine assets, dense Hot Queue as FocusZone, honest rule-based intelligence, Jos form primitives.

**Don’t:** SaaS equal metric-card trios, blue/purple gradients, soft rounded cards (`rounded-lg`), shadcn/`@/components/ui` inside `.jos`, Tailwind `green-*` / `destructive`, invented market comps, appointments (no schema), LLM fluff, emoji status glyphs, all-caps Oswald at body size for list items.

## Tokens

**Runtime (source of truth):** [`src/app/joeos.css`](../src/app/joeos.css) under `.jos`

**Typed mirrors:** [`src/design-system/`](../src/design-system/) — colors, typography roles, spacing scale, nav IA, aging/lead thresholds. Do not maintain orphan class-recipe strings that JSX ignores.

### Color

| Token | Role |
|-------|------|
| `--jos-void` / `--jos-void-deep` | App ground / rail |
| `--jos-panel` / `--jos-panel-raised` | Surfaces |
| `--jos-orange` / `--jos-orange-hot` / `--jos-orange-dim` | Brand, active, pressed |
| `--jos-bone` / `--jos-silver` / `--jos-steel` | Text primary / secondary / tertiary |
| `--jos-danger` / `--jos-warn` / `--jos-success` | Severity only |
| `--jos-border` | Hairlines |

### Typography roles (one job each)

| Role | Class | Use |
|------|-------|-----|
| brand | `.jos-brand` | Shell mark only |
| section | `.jos-section` | One per major region |
| title | `.jos-title` | One per screen |
| item | `.jos-item` | List/row primary label (not all-caps body) |
| label | `.jos-label` | Form labels, chrome meta |
| body | `.jos-body` | Prose, intel, notes |
| kpi | `.jos-kpi` | Telemetry numbers |
| data | `.jos-data` | IDs, timestamps, feed strings |

### Spacing (`--jos-space-1` … `--jos-space-8`)

4 → 48px. Panel default = space-4; hero panels = space-5; section stack = space-6; screen stack = space-8.

### Radius

0–2px only. Ban soft radius inside `.jos`.

### Severity

`hot | watch | ok | aging | muted` → `SeverityPill` only. Lucide for icons.

## Layout

Every screen has a **FocusZone** (primary job) and optional **SecondaryZone** (quieter support).

| Screen | FocusZone | SecondaryZone |
|--------|-----------|---------------|
| Command | Hot Queue | Mission strip; Radar + Intel below |
| Floor | Photo asset grid | Sticky toolbar only |
| Asset detail | Joe enrichment editor | Telemetry header band |
| Pipeline | Ranked lead list | Stale count in header |
| Lead detail | Interaction composer + timeline | Customer meta |
| Feed | Sync actions + last run | Telemetry as data list |
| Vault | Lock form | — |

## Navigation

| ID | Label | Short | Route |
|----|-------|-------|-------|
| command | Command | CMD | `/admin` |
| floor | Floor | FLOOR | `/admin/bikes` |
| pipeline | Pipeline | PIPE | `/admin/leads` |
| feed | Feed | FEED | `/admin/sync` |

Utilities: SITE (public), OUT (logout). Desktop: rail footer. Mobile: More sheet from bottom nav.

Detail ContextBar: back to pillar · entity label · status. Pillar stays active via prefix match.

## Mobile-first

- `base` &lt;768: bottom nav + More; single column
- `md` ≥768: rail; hide bottom nav
- Tap targets ≥44px; inputs min-height 44px
- Floor filters: horizontal chip scroll
- Safe-area padding on bottom nav + stage

## Component library

- Primitives: `src/components/joeos/ui/`
- Patterns: `src/components/joeos/`
- **No** `@/components/ui` imports under admin/JoeOS paths

## Intelligence rules (no inventions)

- Urgency score: days on lot + bonuses for recent price drop / PENDING
- Mission chips: aging bikes, stale leads (≥3 days), $ sum of aging prices
- Sales Intelligence: template from priority bike + lead counts + real price history only
- Forbidden: “below competitors,” “high demand,” fake sold comps, fake appointments
