# Visual system — Modern motorcycle garage (editorial)

Source of truth for look and feel on joesusedharleys.com.  
Feeling: **Meet Joe and talk motorcycles**—magazine + garage—not a SaaS platform.

## Do / don’t

**Do:** warm concrete, asphalt, leather, chrome, craftsmanship, editorial storytelling, immersive spacing.  
**Don’t:** glass cards, feature grids, startup CTA bands, dual equal hero CTAs, fake photos/testimonials, invented Joe voice.

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
| Brand wordmark | Oswald | `.font-display` — uppercase, largest hero signal |
| Story headlines | Source Serif 4 | `.font-story` — **not** all-caps; magazine energy |
| Body | Source Serif 4 | ~18–20px, ~1.7 leading, `.joe-measure` (~34rem) |
| Labels / chapters | Oswald | `.font-label` — steel, wide tracking |
| CTAs | Oswald | Workshop labels via `.joe-btn-*` |

**Hierarchy:** Brand ≥ serif invitation; chapter titles quieter than brand; body never competes with brand.

## Color tokens

| Token | Use |
|-------|-----|
| `--concrete` | Page background |
| `--bay` | Alternate editorial field |
| `--asphalt` | Cinematic open atmosphere |
| `--ink` | Body text |
| `--leather` | Accent / pull-quote rule |
| `--chrome` | Borders / rules |
| `--steel` | Meta labels |
| `--lamp` | Primary CTA + brand accent only |

## Editorial primitives

| Component | Purpose |
|-----------|---------|
| `editorial-measure.tsx` | Narrow reading column |
| `chapter-block.tsx` | Numbered vertical chapter |
| `media-frame.tsx` | Labeled empty portrait / bay / hero frames |
| `pull-quote.tsx` | Renders **only** when real quote text is passed |

## Utilities

`.joe-rule`, `.joe-frame`, `.joe-clipboard`, `.joe-measure`, `.joe-pull-quote`, `.joe-btn-primary`, `.joe-btn-secondary`, `.joe-btn-secondary-dark`, `.joe-btn-asphalt`, `.joe-hero-atmosphere`, `.joe-asphalt-bay`

## Imagery

Empty labeled frames until Joe supplies assets. No stock Harleys. Wire story copy to `docs/joe-profile.md` when filled.

## Motion

Slow hero fade-up; ambient lamp drift; 1px CTA lift. Respect `prefers-reduced-motion`.
