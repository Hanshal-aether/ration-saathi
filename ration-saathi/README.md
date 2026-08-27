# Ration Saathi

A production-quality prototype for a citizen-facing ration card application, status tracking, and shop-slot booking platform for India. Built for the Build What Moves INDIA hackathon.

## Overview

**Ration Saathi** simplifies ration card services by providing a modern web experience for Indian citizens to:
- Apply for new ration cards or make updates
- Track application status in real-time
- Find and book time slots at fair price shops
- Get help via a plain-language AI assistant (Gemini-powered)

### Current Scope
- **Full implementation**: Maharashtra (pilot state)
- **Coming soon**: 28 states + 8 union territories with phased rollout messaging

## Features

### ✅ Authentication & Authorization
- Phone + OTP login (mock implementation: OTP is `123456`)
- localStorage-based session persistence
- Logout option in settings menu
- Protected routes redirect to login

### ✅ State-wise National Portal
- 28 Indian states + 8 union territories selector
- Maharashtra pilot with full functionality
- "Coming soon" screens for other states with explore button
- State selection persists in localStorage and context

### ✅ Apply for Services
Four request types with guided multi-step forms:
1. **New Ration Card** 📋
2. **Add/Remove Family Member** 👪
3. **Correct Card Details** ✏️
4. **Lost Card Replacement** 🔎

Each form includes:
- Progress indicator
- Form auto-save to localStorage (resume if interrupted)
- Document checklist with explanations
- Confirmation screen before submission
- Reference number generation

### ✅ Status Tracking
- Enter reference number to check application progress
- Visual progress timeline (Submitted → Under Review → Verification → Approved)
- Real-time status updates
- Action required states with inline correction form
- Approved notifications with slot booking button

### ✅ Shop Finder & Slot Booking
- List of 8 seeded fair price shops across Maharashtra
- Stock status indicators (Available 🟢 / Low 🟡 / Unavailable 🔴)
- Queue length and distance display
- Slot booking interface with time selection
- Real-time slot availability

### ✅ AI Assistant
- **Floating chat button** on status and apply pages
- **Gemini API integration** (gemini-1.5-flash)
- Answers questions about ration cards, PDS, and app usage
- 2-3 sentence max responses in plain language
- Typing indicator, error handling, graceful degradation
- Works when GEMINI_API_KEY is provided

### ✅ Visual Design & Polish
- **Generous whitespace** and minimal design (not typical government site)
- **Clear typography hierarchy**: strong headings (3-4xl), readable body (16px)
- **Micro-interactions**: 150-300ms transitions, hover states, active scales
- **Consistent iconography**: emoji across pages (no mixed styles)
- **Mobile-first**: 375px viewport optimized, bottom nav on mobile
- **Empty/loading states**: skeletons, error boundaries, empty screens
- **Dark mode**: not implemented (focus on excellent light theme)
- **Design tokens**: consistent colors, spacing, radius throughout

### ✅ Database
- **SQLite** for local development
- **Prisma ORM** with migrations
- **Seeded data**: 3 mock citizens, 8 Maharashtra shops, 4 sample applications, 96 time slots
- Ready to swap to PostgreSQL (Neon, etc.) for production

### ✅ Localization
- **English & Hindi** language toggle
- Bilingual content throughout (landing page, forms, nav, status page)
- Language selection in header

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3
- **Database**: SQLite (Prisma) → PostgreSQL for production
- **Language**: JavaScript/JSX
- **API**: Gemini 1.5 Flash for assistant
- **Icons**: Emoji + occasional `lucide-react` for login

## Project Structure

```
ration-saathi/
├── app/
│   ├── api/
│   │   ├── admin/simulate-status/route.js
│   │   ├── applications/route.js
│   │   ├── applications/[id]/correct/route.js
│   │   ├── assistant/route.ts          # Gemini API endpoint
│   │   └── slots/[id]/book/route.js
│   ├── apply/[type]/
│   │   ├── page.js                     # Document checklist
│   │   ├── form/page.js                # Multi-step form
│   │   └── confirmation/[applicationId]/page.js
│   ├── login/page.tsx                  # Phone + OTP auth
│   ├── shops/[id]/page.js              # Shop detail + slot booking
│   ├── shops/page.js                   # Shop list
│   ├── status/page.js                  # Application tracker
│   ├── layout.js                       # Root layout
│   ├── page.js                         # Landing page
│   └── globals.css                     # Global styles
├── components/
│   ├── ai-assistant.js                 # Chat UI
│   ├── chrome.js                       # Header + nav
│   ├── coming-soon.js                  # State expansion screen
│   ├── empty-state.js                  # Empty/error states
│   ├── loading-skeleton.js             # Loading placeholders
│   ├── providers.js                    # Lang + State context
│   ├── state-guard.js                  # Maharashtra-only wrapper
│   └── state-selector.js               # State picker modal
├── lib/
│   ├── config.js                       # Request types config
│   ├── design-tokens.js                # Design system
│   └── prisma.js                       # DB client
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.js                         # Seed script
├── public/                             # Static assets
├── .env                                # Database URL
├── .env.example                        # Template
├── package.json
├── tailwind.config.js                  # Tailwind theme
├── next.config.mjs
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone and navigate to the project:
   ```bash
   cd ration-saathi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma db push --skip-generate --force-reset
   node prisma/seed.js
   ```

4. (Optional) Add Gemini API key for assistant:
   ```bash
   # Edit .env and add:
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Time - Complete Auth Flow
1. **Home page redirects to /login** (you're not logged in yet)
2. **Enter phone number**: Any 10-digit number (e.g., 9876543210)
3. **Click Continue** → OTP screen appears
4. **Enter code: `123456`** (demo OTP is always this)
5. **Click Verify** → ✅ Logged in
6. **State selector appears** → Choose **Maharashtra**
7. **Landing page** → Full app ready to use (Apply, Status, Shops, Chat)

### Login Credentials
- **Phone**: Any 10-digit number (e.g., 9876543210)
- **OTP**: `123456`

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# Reset database
npx prisma migrate reset --force
```

## Building for Production

```bash
npm run build
npm run start
```

The build process optimizes the app for production:
- Static page prerendering
- CSS/JS minification
- API route bundling

## Mocked vs. Real

### ✅ Fully Implemented
- Authentication flow (localStorage-based)
- Multi-step forms with validation
- Database schema and seeding
- Status tracking with mock statuses
- Shop finder with seeded locations
- Slot booking interface
- Chat UI and Gemini integration
- All routing and navigation

### 🎭 Mocked (for demo)
- OTP is always `123456`
- No real SMS/phone integration
- No actual document upload (forms just store data)
- No email/SMS notifications
- Application status updates via admin endpoint (for testing)
- No payment processing
- No real fair price shop data (manually seeded with realistic addresses)

### ⚙️ Database Notes
- **Development**: SQLite (local `ration-saathi-dev.db`)
- **Production**: Change `prisma/schema.prisma` datasource to PostgreSQL:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- Then run `npx prisma db push` to sync

## API Routes

### Public
- `GET /api/applications?reference=RS-XXXXXXXX` — Track by reference
- `POST /api/applications` — Submit application
- `POST /api/applications/[id]/correct` — Correct submission
- `GET /api/slots` — List available slots
- `POST /api/slots/[id]/book` — Book a slot
- `POST /api/assistant` — Chat with Gemini assistant

### Admin (Testing)
- `POST /api/admin/simulate-status` — Update app status for demo

## Seeded Data

### Citizens (3)
- Ravi Kumar (+91 98765 10002)
- Aisha Khan (+91 98765 10001) - Hindi preference
- Meera Nair (+91 98765 10003)

### Maharashtra Fair Price Shops (8)
- Andheri, Dombivli, Thane, Malad, Dadar, Chembur, Kurla, Worli
- Each with 4 time slots × 3 days = 12 slots per shop (96 total)

### Sample Applications (4)
1. New request (submitted) — Meera Nair
2. Add member (under review) — Aisha Khan
3. Correction needed — Ravi Kumar
4. Approved (lost card) — Aisha Khan

## Design System

### Colors
- **Service**: Teal (#168277, #116960, #0d524c)
- **Trust**: Blue (#185272, #2878a8)
- **Slate**: Gray (#0f172a → #f1f5f9)

### Spacing
- xs/sm/md/lg/xl/2xl (0.25rem → 3rem)

### Radius
- sm/md/lg/xl/2xl (0.5rem → 2rem)

### Transitions
- Fast: 150ms
- Normal: 200ms
- Slow: 300ms

All defined in `lib/design-tokens.js` and applied via Tailwind/CSS.

## Future Roadmap

1. **Expand to all 28 states + 8 UTs** with real data
2. **Real SMS/email** notifications
3. **Document upload** with AWS S3/Cloud Storage
4. **Real Aadhaar integration** (identity verification)
5. **Payment gateway** for new card fees
6. **Admin dashboard** for officials to process applications
7. **WhatsApp bot** for status updates
8. **Dark mode** support
9. **Offline mode** with service workers
10. **Analytics** (Mixpanel, Posthog)

## Notes

- **No confusing forms**: Each step is one clear question
- **Auto-save progress**: Interrupted forms can be resumed
- **Plain language**: All errors and steps explained simply
- **Mobile-first**: Tested at 375px viewport width
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation (can be enhanced)

## License

Built for Build What Moves INDIA hackathon. Mock implementation for demonstration.

## Support

For issues or questions:
1. Check seeded data is present: `node verify-seed.js`
2. Ensure `.env` DATABASE_URL is correct
3. Try clearing localStorage and reloading
4. Check browser console for errors

---

**Built with ❤️ for Indian citizens. Made simpler, one clear step at a time.**
