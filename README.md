# Joe's Used Harleys

Personal Harley-Davidson sales engine for **joesusedharleys.com**.

This is **not** a traditional dealership website. It is a trust + lead + education platform for one salesperson.

**Status (2026-07-17):** Implementation is paused after the initial scaffold. The app builds, but it is **not production-ready** (no live Supabase DB wired in this repo, DIY admin auth, no rate limiting / bot protection). Do not treat empty inventory or placeholder contact fields as real data.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Prisma 7 + Supabase PostgreSQL (`@prisma/adapter-pg`)
- Server Actions for forms
- Vercel hosting (target)

## Product principles

- Do not invent inventory, reviews, dealership info, or APIs
- Label placeholders clearly
- Prefer empty states over fake data
- AI assistant stays disabled until `OPENAI_API_KEY` is set (not free)

## Clone and run

```bash
git clone https://github.com/joetabora/joes-used-harleys.git
cd joes-used-harleys
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without real Supabase credentials, marketing pages and guides still load. Inventory, leads, and admin data features show explicit “not configured” empty states.

### Environment files (important)

| File | Tracked? | Purpose |
|------|----------|---------|
| `.env.example` | Yes | Placeholders only — safe to commit |
| `.env` / `.env.local` / `.env.*` | **No** (gitignored) | Real secrets — never commit |

Copy `.env.example` → `.env.local` and replace every `PLACEHOLDER_*` value. Do not commit real keys.

Prisma client is generated on `npm install` / `npm run build` into `src/generated/prisma` (also gitignored).

### Optional: connect Supabase

1. Create a free Supabase project
2. Set in `.env.local`:
   - `DATABASE_URL` — pooled (port **6543**, `pgbouncer=true`)
   - `DIRECT_URL` — session/direct (port **5432**) for migrations
3. Apply schema:

```bash
npx prisma migrate deploy
# or during local development:
npm run db:migrate
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Next.js server |
| `npm run build` | `prisma generate` + production build |
| `npm test` | Zod validator smoke test |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Prisma migrate (needs `DIRECT_URL`) |

## What’s in the scaffold

- Trust pages: `/`, `/about`, `/how-it-works`, `/contact`
- Inventory: `/inventory` (+ admin CRUD when DB + admin env are set)
- Guides + city SEO pages: `/guides`, `/used-harleys/[city]`
- Admin: `/admin` (env-based login — not production auth)
- AI assistant UI: `/assistant` (no-op without `OPENAI_API_KEY`)

## Admin

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` (16+ chars), then visit `/admin/login`.

Photos: upload to Supabase Storage, paste the public URL on the bike edit page (no upload API yet).

## Lead notifications

Optional Resend free tier: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `EMAIL_FROM`.

Without these, leads still save to the database when Supabase is configured.

## Deploy (Vercel)

1. Import this GitHub repo in Vercel
2. Add the same env vars as `.env.example` (with real values)
3. Attach `joesusedharleys.com`

**Note:** Vercel Hobby ToS may restrict commercial sites. Acknowledge before public launch.

## Database (core only)

Three tables — capture and manage buyers:

- **Lead** — name, email, phone, source, status, notes, createdAt
- **Bike** — year, make, model, price, mileage, description, status, photos[], createdAt
- **Interaction** — leadId, type (phone / text / visit / email / test ride), note, createdAt

Admin logs interactions on `/admin/leads/[id]`.

## Folder map

```
prisma/                 # schema + migrations
src/app/                # routes (marketing, inventory, guides, admin, assistant)
src/actions/            # server actions
src/components/         # UI + site components
src/lib/                # prisma, auth, seo, guides, validators
scripts/                # lightweight tests
```

## Known gaps before production

- Supabase not required to clone/build, but required for leads/inventory
- Admin auth is env plaintext + HMAC cookie (replace before launch)
- No rate limiting, bot protection, or observability
- AI, unused schema models, and brand/SEO polish are unfinished

## License / ownership

Private project for Joe's Used Harleys.
