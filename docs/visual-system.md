# Visual system — Modern motorcycle garage

Source of truth for look and feel on joesusedharleys.com.  
Feeling: invite someone into Joe’s garage to talk motorcycles—not a SaaS landing page.

## Do / don’t

**Do:** warm concrete, asphalt, leather, chrome, craftsmanship, authenticity.  
**Don’t:** glass cards, startup gradients, corporate dealership gloss, fake biker stereotypes, fake photos/testimonials.

## Typography

| Role | Font | Notes |
|------|------|--------|
| Brand / titles | Oswald | Uppercase via `.font-display` |
| Body / UI | Source Serif 4 | Warm “sit and talk” reading |
| Labels | Oswald | `.font-label` — wide tracking, steel |

## Color tokens

Defined in `src/app/globals.css`:

| Token | Use |
|-------|-----|
| `--concrete` | Page background |
| `--bay` | Alternate section field |
| `--asphalt` | Hero / Match / contact bands |
| `--ink` | Body text on concrete |
| `--leather` | Accent links / clipboard rule |
| `--chrome` | Borders / rules |
| `--steel` | Meta labels |
| `--lamp` | Primary CTA only (not large washes) |

Tailwind color aliases: `concrete`, `bay`, `asphalt`, `ink`, `leather`, `chrome`, `steel`, `lamp`.

## Components / utilities

| Class | Purpose |
|-------|---------|
| `.joe-btn-primary` | Lamp workshop CTA |
| `.joe-btn-secondary` | Chrome outline on concrete |
| `.joe-btn-secondary-dark` | Chrome outline on asphalt |
| `.joe-btn-asphalt` | Solid asphalt CTA |
| `.joe-rule` | Hairline chrome section rule |
| `.joe-frame` | Media / empty bay frame |
| `.joe-clipboard` | Placeholder notes |
| `.joe-hero-atmosphere` | Warm lamp pools on asphalt |
| `.joe-asphalt-bay` | Band with overhead lamp radial |

## Imagery

Empty labeled frames only until Joe supplies real assets:

- Portrait: `aspect-[3/4]` — `[PLACEHOLDER — Joe photo]`
- Bike bay: `aspect-[16/9]` — `[PLACEHOLDER — bike photo when listed]`

No stock photography. No invented inventory.

## Motion

CSS only: hero fade-up, subtle atmosphere drift, 1px CTA lift. Respect `prefers-reduced-motion`.
