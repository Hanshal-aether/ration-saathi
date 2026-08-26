# Ration Saathi

Ration Saathi is a mobile-first prototype that makes ration-card services easier to understand: apply, track a request, correct one issue, and book a fair-price-shop visit.

## Problem

Government service journeys can be unclear and form-heavy. This prototype replaces jargon with guided choices, document checklists, simple status explanations, and collection-slot booking.

## Functional prototype features

- Next.js App Router UI with English and Hindi main navigation.
- Guided application flow with browser-local draft recovery.
- Prisma data model, seeded shop data, status flow, corrections, and booking APIs.
- Mock application status simulator for a recorded demo.

## Mocked versus real

All citizen, Aadhaar, shop, document, status, and slot data is mock data. The prototype does not access real Aadhaar, government, PDS, OTP, document-storage, notification, or calendar systems. Authentication is a hardcoded prototype citizen only.

## Local development

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Production and Vercel

SQLite is for local development only and will not persist on Vercel's serverless filesystem. For a live deployment, create a free hosted Postgres database with Neon or Supabase, set `DATABASE_URL` in Vercel, update `prisma/schema.prisma` to `provider = "postgresql"`, then run Prisma migrations against the hosted database. Keep `.env` out of Git.

## Scaling architecture

Use Postgres and Prisma migrations; replace the hardcoded citizen with OTP/session-based authentication; use private object storage for documents; integrate state PDS services behind audited adapters; queue status notifications; and add encryption, consent, rate limits, audit logs, and role-based staff access.
