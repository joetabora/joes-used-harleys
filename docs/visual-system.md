# Visual system — Dark outlaw (garage + dealership)

Source of truth for look and feel on joesusedharleys.com.  
Feeling: **Dark outlaw biker vibe meets Harley dealership**—fun, high-contrast, authentic. Not SaaS.

Palette is **aligned with JoeOS** ([`docs/joeos-design.md`](./joeos-design.md)): void / gunmetal / Harley orange. Public site stays editorial storytelling; JoeOS stays the sales cockpit.

Inspired by Crooked Clubhouse and Highway Heathens: near-black canvas, hot accent, condensed display type, grit.

## Do / don’t

**Do:** asphalt void black, bone text, Harley orange accent, chrome hairlines, poster headlines, grain texture, badge moments, asymmetric editorial layouts, sharp 0–2px corners.  
**Don’t:** light concrete SaaS layouts, glass cards, feature grids, dual equal hero CTAs, centered CTA bands, blog/resource feeds, empty-state cards, fake photos/testimonials, invented Joe voice, blue/purple gradients.

## Homepage narrative (01–08)

1. Cinematic open  
2. Opening letter  
3. Meet Joe  
4. How we talk bikes (vertical chapters)  
5. On the floor — garage/showroom (asymmetric bleed, not empty-state)  
6. From the bench — magazine contents (lead + numbered index)  
7. Find your fit  
8. Come talk — personal invitation (left-aligned note, not CTA band)

## Typography

| Role | Font | Class / notes |
|------|------|----------------|
| Brand / poster | Oswald | `.font-display` / `.font-poster` — uppercase, heavy, tight |
| Story headlines | Source Serif 4 | `.font-story` — **not** all-caps |
| Large editorial moments | Source Serif 4 | `.joe-headline-xl` — oversized serif for key statements |
| Editorial numerals | Oswald | `.joe-index` — oversized, low-contrast magazine numbers |
| Body | Source Serif 4 | ~18–20px, ~1.7 leading, `.joe-measure` (~34rem) |
| Labels / chapters | Oswald | `.font-label` — wide tracking; numbers often in `--lamp` |
| CTAs | Oswald | Workshop labels via `.joe-btn-*` |
| Badges | Oswald | `.joe-badge` — bordered sticker slabs |

**Hierarchy:** Poster brand ≥ `joe-headline-xl` moments ≥ serif story; body never competes with brand.

## Color tokens (dark by default)

Token **names** are stable; values match JoeOS hex ([`src/design-system/colors.ts`](../src/design-system/colors.ts)).

| Token | Value | Role |
|-------|-------|------|
| `--asphalt` | `#090909` | Void — hero, header, footer |
| `--concrete` | `#111111` | Page background (pit) |
| `--bay` | `#181818` | Panel surface |
| `--ink` | `#F2F2F0` | Bone / primary text |
| `--steel` | `#8A8F98` | Muted labels |
| `--chrome` | `#C5C9CE` | Aluminum outlines |
| `--leather` | `#E53935` | Danger / rare accent |
| `--lamp` | `#F4511E` | Harley orange — CTA, brand accent, hovers |
| `--lamp-foreground` | `#090909` | Text on orange CTAs |

Semantic shadcn tokens (`--background`, `--foreground`, `--card`, `--border`, `--primary`, etc.) map onto this set. Radius is 0–2px.

## Editorial rhythm

Break the repeated label → headline → paragraph → CTA template with:

- **Asymmetric layouts** — uneven columns, offset text
- **Overlapping / bleed media** — `SectionShell width="full"` + negative-margin media
- **Varied section widths** — `default` (`max-w-6xl`), `wide` (`max-w-7xl`), `full` (bleed)
- **Moments of silence** — generous vertical padding (Come Talk)
- **Large typography moments** — `.joe-headline-xl`, `.font-poster`, `.joe-index`

## Editorial primitives

| Component | Purpose |
|-----------|---------|
| `section-shell.tsx` | Tone + `width` (`default` / `wide` / `full`) + spread padding |
| `editorial-measure.tsx` | Narrow reading column |
| `chapter-block.tsx` | Numbered vertical chapter (lamp chapter numbers) |
| `media-frame.tsx` | Labeled empty portrait / bay / hero / **tall** frames |
| `pull-quote.tsx` | Renders **only** when real quote text is passed |

## Utilities

`.font-poster`, `.joe-headline-xl`, `.joe-index`, `.joe-hairline`, `.joe-badge`, `.joe-grain`, `.joe-rule`, `.joe-frame`, `.joe-clipboard`, `.joe-measure`, `.joe-pull-quote`, `.joe-panel`, `.joe-btn-primary`, `.joe-btn-secondary`, `.joe-btn-secondary-dark`, `.joe-btn-asphalt`, `.joe-hero-atmosphere`, `.joe-hero-grain`, `.joe-asphalt-bay`

## Imagery

Empty labeled frames until Joe supplies assets. No stock Harleys. Wire story copy to `docs/joe-profile.md` when filled.

## Motion

Slow hero fade-up; ambient orange drift in hero atmosphere; 1px CTA lift. Respect `prefers-reduced-motion`.
