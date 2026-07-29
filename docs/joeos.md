# JoeOS (internal)

**JoeOS** is the private sales operating system behind joesusedharleys.com.

Customers never see this name.

| Surface | Role |
|---------|------|
| joesusedharleys.com | Customer-facing website |
| JoeOS (`/admin`, `src/lib/services`, cron) | Private sales OS |

## Surfaces

- **Morning Briefing** (`/admin`) — mission checklist, Hot Actions, Inventory Radar, Command Brief ([design](./joeos-design.md))
- Inventory, Leads, Sync — dense cockpit pages under the same shell

## Long-term capabilities

- Inventory sync (v1 — shipped)
- Morning briefing (v1 — rule-based from live data)
- CRM / lead follow-up
- Analytics
- AI sales coach (LLM — not yet)
- Appointments calendar (needs schema)
- Harley Match
- Customer recommendations

Architecture favors a licensable multi-dealer platform later: dealership feed adapter + Joe enrichment layer stay separable.
