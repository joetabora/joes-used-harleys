# Visual system — Dark outlaw (garage + dealership)

Source of truth for look and feel on joesusedharleys.com.  
Feeling: **Dark outlaw biker vibe meets Harley dealership**—fun, high-contrast, authentic. Not SaaS.

Inspired by Crooked Clubhouse and Highway Heathens: near-black canvas, hot accent, condensed display type, grit.

## Do / don’t

**Do:** asphalt black, bone text, ember accent, oxblood secondary, chrome hairlines, poster headlines, grain texture, badge moments.  
**Don’t:** light concrete SaaS layouts, glass cards, feature grids, dual equal hero CTAs, fake photos/testimonials, invented Joe voice.

## Homepage narrative (01–08)

1. Cinematic open  
2. Opening letter  
3. Meet Joe  
4. How we talk bikes (vertical chapters)  
5. On the floor  
6. From the bench  
7. Find your fit  
8. Come talk  

## Typography

| Role | Font | Class / notes |
|------|------|----------------|
| Brand / poster | Oswald | `.font-display` / `.font-poster` — uppercase, heavy, tight |
| Story headlines | Source Serif 4 | `.font-story` — **not** all-caps; readable contrast against outlaw display |
| Body | Source Serif 4 | ~18–20px, ~1.7 leading, `.joe-measure` (~34rem) |
| Labels / chapters | Oswald | `.font-label` — wide tracking; numbers often in `--lamp` |
| CTAs | Oswald | Workshop labels via `.joe-btn-*` |
| Badges | Oswald | `.joe-badge` — bordered sticker slabs |

**Hierarchy:** Poster brand ≥ serif invitation; chapter titles quieter than brand; body never competes with brand.

## Color tokens (dark by default)

Token **names** are stable; values are dark-first so the whole site flips together.

| Token | Role |
|-------|------|
| `--asphalt` | Deepest black — hero, header, footer |
| `--concrete` | Page background (dark charcoal) |
| `--bay` | Lifted alternate panel |
| `--ink` | Bone / off-white body + headings |
| `--steel` | Muted labels / secondary text |
| `--chrome` | Cool light-grey for outlines |
| `--leather` | Oxblood secondary accent (quotes / rare links) |
| `--lamp` | Hot ember — primary CTA, brand accent, hovers |

Semantic shadcn tokens (`--background`, `--foreground`, `--card`, `--border`, `--primary`, etc.) map onto the dark set. Borders are low-opacity light hairlines.

## Editorial primitives

| Component | Purpose |
|-----------|---------|
| `editorial-measure.tsx` | Narrow reading column |
| `chapter-block.tsx` | Numbered vertical chapter (lamp chapter numbers) |
| `media-frame.tsx` | Labeled empty portrait / bay / hero frames |
| `pull-quote.tsx` | Renders **only** when real quote text is passed |

## Utilities

`.font-poster`, `.joe-badge`, `.joe-grain`, `.joe-rule`, `.joe-frame`, `.joe-clipboard`, `.joe-measure`, `.joe-pull-quote`, `.joe-btn-primary`, `.joe-btn-secondary`, `.joe-btn-secondary-dark`, `.joe-btn-asphalt`, `.joe-hero-atmosphere`, `.joe-hero-grain`, `.joe-asphalt-bay`

## Imagery

Empty labeled frames until Joe supplies assets. No stock Harleys. Wire story copy to `docs/joe-profile.md` when filled.

## Motion

Slow hero fade-up; ambient ember drift in hero atmosphere; 1px CTA lift. Respect `prefers-reduced-motion`.
