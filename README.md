# Joe's Used Harleys

Personal Harley-Davidson sales engine for **joesusedharleys.com**.

Not a traditional dealership website — a trust + lead + education platform for one salesperson.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma 7 + Supabase PostgreSQL (`@prisma/adapter-pg`)
- Server Actions for forms
- Vercel hosting

## Product principles

- Do not invent inventory, reviews, dealership info, or APIs
- Label placeholders clearly
- Prefer empty states over fake data
- AI assistant stays disabled until `OPENAI_API_KEY` is set (not free)

## Local setup

1. Copy env file:

```bash
cp .env.example .env.local
```

2. Create a free Supabase project and fill:

- `DATABASE_URL` — pooled (port **6543**, `pgbouncer=true`)
- `DIRECT_URL` — session/direct (port **5432**) for migrations

3. Install + generate Prisma client:

```bash
npm install
npx prisma generate
```

4. Apply schema (when Supabase is ready):

```bash
npx prisma migrate dev --name init
```

5. Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` (16+ chars), then visit `/admin/login`.

Manage bikes at `/admin/bikes` and leads at `/admin/leads`.

Photos: upload to Supabase Storage, paste the public URL on the bike edit page.

## Lead notifications

Optional Resend free tier:

- `RESEND_API_KEY`
- `LEAD_NOTIFY_EMAIL`
- `EMAIL_FROM`

Without these, leads still save to the database when configured.

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import in Vercel
3. Add the same env vars
4. Attach `joesusedharleys.com` in Vercel domains

**Note:** Vercel Hobby ToS may restrict commercial sites. Acknowledge before public launch; Pro may be required later.

## Folder map

```
prisma/                 # schema + migrations
src/app/                # routes (marketing, inventory, guides, admin, assistant)
src/actions/            # server actions
src/components/         # UI + site components
src/lib/                # prisma, auth, seo, guides, validators
```

## Roadmap status

- Phase 0 — foundation scaffold
- Phase 1 — trust pages + lead capture
- Phase 2 — inventory, alerts, pre-approval, admin
- Phase 3 — guides + city SEO pages + sitemap/JSON-LD
- Phase 4 — AI assistant scaffold (gated on API key)
