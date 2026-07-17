# Joe's Used Harleys — Official Development Roadmap

**Product:** Personal Harley-Davidson sales engine for joesusedharleys.com  
**Goal:** Sell more used Harleys through trust, lead capture, education, and disciplined follow-up.  
**Status:** Product stabilization. This document is the source of truth for what we build next.

## Principles

1. Every feature must directly support selling motorcycles.
2. Prefer empty states and placeholders over invented inventory, reviews, or dealership claims.
3. Do not invent APIs or integrations that do not exist.
4. Ship the smallest thing that helps Joe close a deal.

## Explicitly out of scope

Unless a future roadmap revision says otherwise:

- Merch / shop / Stripe storefront
- Fake reviews or fabricated social proof
- Inventory scrapers or unverified third-party feeds
- Multi-dealership portals
- CMS sprawl unrelated to selling bikes
- AI features before Phase 5 (and only with a real LLM budget)

---

## Phase 1 — Foundation cleanup

Stabilize the platform so lead and inventory work is safe to build on.

### Git safety

| | |
|---|---|
| **Status** | Done (maintain) |
| **Purpose** | Keep secrets out of version control and make the repo cloneable without foot-guns. |
| **User benefit** | Joe or a collaborator can clone, copy `.env.example`, and run locally without leaking credentials. |
| **Business value** | Protects Supabase, email, and admin credentials; reduces deploy breakage. |
| **Dependencies** | `.gitignore` (env files ignored, `.env.example` allowed), README clone steps, no secrets in tracked files. |

### Database simplification

| | |
|---|---|
| **Status** | Done in schema; apply migration on real Supabase when connected |
| **Purpose** | One CRM model focused on buyers: Lead, Bike, Interaction. |
| **User benefit** | Admin is understandable; history of a buyer lives in one place. |
| **Business value** | Engineering time goes to closing deals, not unused tables. |
| **Dependencies** | Prisma schema (`Lead` / `Bike` / `Interaction`); `prisma migrate deploy` against live `DATABASE_URL` / `DIRECT_URL`. |

### Authentication decision

| | |
|---|---|
| **Status** | Open (decision locked; implementation pending) |
| **Purpose** | Replace interim plaintext env + HMAC cookie admin auth with real identity. |
| **User benefit** | Joe can sign in safely from any device without sharing a shared password in env forever. |
| **Business value** | Stops unauthorized access to leads and inventory. |
| **Dependencies** | Supabase project; **Supabase Auth (email/password for Joe only)**; Next.js middleware protecting `/admin/**`. Env-cookie auth is interim only. |

### Admin separation

| | |
|---|---|
| **Status** | Open |
| **Purpose** | Isolate the salesperson workspace from the public marketing site chrome. |
| **User benefit** | Faster daily workflow; fewer clicks and less visual noise. |
| **Business value** | Fewer operational mistakes; clearer “work mode” vs “sell mode.” |
| **Dependencies** | Auth middleware; `(admin)` route group (or equivalent) without public header/footer. |

---

## Phase 2 — Lead Generation Engine

Turn visitors into leads Joe can follow up. Capture first; qualify second.

A person who simply says “Hey, do you still have that Road Glide?” is already valuable. Every visitor should be able to become a lead before we build fancy qualification.

### Phase 2A — Lead Capture Foundation

Ship the minimum path from “interested” → “Joe can call them back.”

#### Lead form

| | |
|---|---|
| **Purpose** | Let anyone leave name + contact + a short note from key pages. |
| **User benefit** | Easy way to ask about a bike or get help without calling first. |
| **Business value** | Captures buyers who will not dial; creates a durable record. |
| **Dependencies** | Public form UI; writes a `Lead` (`name`, `email`/`phone`, `source`, `notes`). |

#### Contact button

| | |
|---|---|
| **Purpose** | Persistent, obvious path to reach Joe from any page. |
| **User benefit** | No hunting for how to get in touch. |
| **Business value** | More inquiries from the same traffic. |
| **Dependencies** | Site header/CTA → `/contact` (or inline form); works even when phone env is unset. |

#### Text Joe button

| | |
|---|---|
| **Purpose** | One-tap SMS to Joe on mobile. |
| **User benefit** | Fastest path for “is that Road Glide still there?” |
| **Business value** | High-intent, immediate conversations. |
| **Dependencies** | `NEXT_PUBLIC_JOE_PHONE` / `NEXT_PUBLIC_JOE_SMS_LINK` configured (no placeholder). |

#### Call Joe button

| | |
|---|---|
| **Purpose** | One-tap phone dial for buyers who prefer voice. |
| **User benefit** | Instant human contact. |
| **Business value** | Speeds deals that need a live conversation. |
| **Dependencies** | Real phone number in env; `tel:` link in UI. |

#### Lead database

| | |
|---|---|
| **Purpose** | Persist every inquiry so nothing lives only in a text thread. |
| **User benefit** | Joe doesn’t lose context between devices or days. |
| **Business value** | Pipeline visibility; basis for dashboard and follow-up. |
| **Dependencies** | Supabase + `Lead` model migrated; admin list/detail to read leads. |

#### Notification

| | |
|---|---|
| **Purpose** | Alert Joe the moment a lead lands. |
| **User benefit** | Buyer hears back while interest is hot. |
| **Business value** | Time-to-first-contact drops; fewer cold leads. |
| **Dependencies** | Resend (or equivalent) with `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`; form still saves to DB if email is unset. |

#### Lead dashboard

| | |
|---|---|
| **Purpose** | Give Joe one screen to see and prioritize buyers. |
| **User benefit** | Joe knows who to call next and why. |
| **Business value** | Time-to-first-contact drops; fewer lost leads. |
| **Dependencies** | Admin auth; Lead list + detail (`/admin/leads`, `/admin/leads/[id]`). |

#### Follow-up workflow

| | |
|---|---|
| **Purpose** | Enforce status + next-action discipline on every lead. |
| **User benefit** | Buyer isn’t ghosted after the first inquiry. |
| **Business value** | Higher close rate from the same traffic. |
| **Dependencies** | `Lead.status`; Interaction logging (model exists); dashboard UX to make status changes habitual. |

### Phase 2B — Harley Match

Build qualification **after** capture works end-to-end.

#### Harley Match quiz

| | |
|---|---|
| **Purpose** | Qualify intent (riding style, budget, experience, timeline) before or alongside the first call. |
| **User benefit** | Buyer gets a clear “what fits me” answer instead of guessing models. |
| **Business value** | Higher-intent leads with structured notes Joe can act on immediately. |
| **Dependencies** | Phase 2A lead capture working; public quiz UI; writes a `Lead` (source + structured notes). |

---

## Phase 3 — Inventory Experience

Help buyers trust and find real bikes Joe can sell.

### Bike pages

| | |
|---|---|
| **Purpose** | Present real units with honest detail and a clear ask-Joe path. |
| **User benefit** | Shop with confidence; understand the bike before contacting. |
| **Business value** | Converts browsers into bike-specific inquiries. |
| **Dependencies** | `Bike` model; public `/inventory/[id]` (scaffold exists). |

### Photos

| | |
|---|---|
| **Purpose** | Show condition clearly (angles, wear, options). |
| **User benefit** | Fewer surprise objections after arrival or deposit. |
| **Business value** | Trust—especially for remote and out-of-state buyers. |
| **Dependencies** | Supabase Storage (or equivalent); `Bike.photos` URL list; admin upload or paste flow. |

### Videos

| | |
|---|---|
| **Purpose** | Walkarounds, cold starts, and sound—proof the bike is real. |
| **User benefit** | Remote buyers can “see” the bike before travel or shipping. |
| **Business value** | More out-of-state and sight-unseen closes. |
| **Dependencies** | Hosted video links or Storage; Bike field(s) for video URLs (not in schema yet—add when implementing). |

### Search

| | |
|---|---|
| **Purpose** | Let buyers find a model/year quickly. |
| **User benefit** | Less friction than scrolling a long list. |
| **Business value** | More engagement per visit; clearer intent when they inquire. |
| **Dependencies** | Bike indexes; inventory search UI. |

### Filters

| | |
|---|---|
| **Purpose** | Narrow inventory by price, mileage, status, model family. |
| **User benefit** | Self-serve shopping without endless back-and-forth. |
| **Business value** | Higher-quality lead questions (“this one under $X”). |
| **Dependencies** | Inventory list query params; server-side filtering on `Bike`. |

---

## Phase 4 — Sales Intelligence

Make Joe sharper on every conversation.

### Customer profiles

| | |
|---|---|
| **Purpose** | One place for buyer context across the deal. |
| **User benefit** | Continuity—Joe remembers what they care about. |
| **Business value** | Joe sounds prepared; fewer repeated questions. |
| **Dependencies** | `Lead` + `Interaction`; add profile fields only when needed for selling (budget, trade, timeline)—not speculative CRM bloat. |

### Interactions

| | |
|---|---|
| **Purpose** | Log phone calls, texts, visits, emails, and test rides. |
| **User benefit** | Clear history of what was promised and when. |
| **Business value** | Accountability, coaching, and cleaner handoffs. |
| **Dependencies** | `Interaction` model (exists); admin UI polish on lead detail. |

### Reminders

| | |
|---|---|
| **Purpose** | Surface warm leads that need a next touch. |
| **User benefit** | Buyer gets timely follow-up instead of silence. |
| **Business value** | Recovered deals that would have gone cold. |
| **Dependencies** | Lead/Interaction data; notify channel (email first; SMS only when a real provider is configured). |

---

## Phase 5 — AI Features

Use AI only when it is grounded in our content and inventory—and only with budget.

### AI assistant

| | |
|---|---|
| **Purpose** | Answer buying questions from guides + live inventory. |
| **User benefit** | 24/7 education without waiting for Joe. |
| **Business value** | Nurture dreamers; hand off serious buyers to Joe. |
| **Dependencies** | Paid LLM API key; answers grounded in guides + live `Bike` rows only; never invent stock or prices. |

### AI sales coach

| | |
|---|---|
| **Purpose** | Suggest next talk track from lead history and notes. |
| **User benefit** | Joe prepares faster before a call or visit. |
| **Business value** | Better conversations; fewer missed objections. |
| **Dependencies** | Phase 4 profiles/interactions; paid LLM; admin-only surface. |

### Recommendations

| | |
|---|---|
| **Purpose** | Suggest models or listed bikes from quiz answers + inventory. |
| **User benefit** | Shorter path to the right unit. |
| **Business value** | Higher match rate → higher close rate. |
| **Dependencies** | Phase 2B Harley Match quiz + Phase 3 inventory; no recommendations without real bikes or clear “none in stock—set expectation / talk to Joe.” |

---

## Suggested build order

```text
Phase 1 (auth + admin shell)
  → Phase 2A (form + contact/text/call + lead DB + notify + dashboard + follow-up)
    → Phase 2B (Harley Match quiz)
      → Phase 3 (photos/videos/search/filters on bikes)
        → Phase 4 (profiles + reminders)
          → Phase 5 (AI with budget)
```

Do not start Phase 2B until a simple inquiry (“still have that Road Glide?”) can become a lead Joe is notified about.  
Do not start Phase 5 until Phases 2A–3 are producing real leads and real inventory pages Joe trusts.

## Success metric

**Primary:** Leads contacted and progressed per week (not pageviews).  
**Secondary:** Time from lead created → first Interaction logged.  
**Inventory:** Available bikes with photos Joe would show a buyer without apology.
