# AetherX - Cinematic Landing Page PRD

## Original Problem Statement
A cinematic, scroll-choreographed landing experience for media launches — engineered to feel like a blockbuster premiere. Built for marketing and design teams who demand pixel-perfect precision and jaw-dropping, high-impact storytelling without sacrificing performance.

## Product Details
- **Product Name:** AetherX
- **Tagline:** "Where Intelligence Meets Imagination."
- **Visual Tone:** Futuristic & tech-forward (sci-fi aesthetic)

## User Personas
1. **Marketing Teams** - Need high-impact landing pages for product launches
2. **Design Teams** - Demand pixel-perfect precision and cinematic visuals
3. **Tech Enthusiasts** - Early adopters interested in AI products
4. **Investors/Press** - Looking for impressive product presentations

## Core Requirements (Static)
- Hero section with video trailer embed (YouTube)
- Feature showcase with scroll animations
- Story/About section with parallax effects
- Launch countdown timer
- Image gallery with Bento grid layout
- Newsletter signup (early access waitlist)
- Social sharing buttons
- Smooth scroll with Lenis
- Framer Motion animations
- Responsive design (mobile-first)

## Tech Stack
- **Frontend:** React, Framer Motion, Lenis smooth scroll, Tailwind CSS
- **Backend:** FastAPI, MongoDB
- **Design:** Syne + Space Grotesk fonts, Electric Cyan (#00F0FF) + Neon Violet (#7000FF) accent colors

## What's Been Implemented (February 2026)
- [x] Hero section with animated title reveal
- [x] Video modal with YouTube embed
- [x] Sticky navigation with smooth scroll
- [x] Features grid (6 cards) with hover effects
- [x] Story section with parallax scrolling
- [x] Countdown timer (30-day launch date)
- [x] Bento grid gallery
- [x] Newsletter signup with MongoDB persistence
- [x] Footer with social links
- [x] Noise texture overlay
- [x] Mobile responsive design
- [x] Backend API for newsletter subscriptions

## API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Subscribe to waitlist
- `GET /api/newsletter/count` - Get subscriber count

## P0/P1/P2 Features Remaining

### P0 (Critical) - None

### P1 (Important)
- Real YouTube trailer video (currently placeholder)
- Email confirmation integration (SendGrid/Resend)
- Analytics tracking (page views, CTA clicks)

### P2 (Nice to Have)
- Admin dashboard for subscribers
- A/B testing for CTAs
- Internationalization (i18n)
- Dark/Light theme toggle
- Share to social media (actual integration)

## Next Tasks
1. Replace placeholder YouTube video with actual trailer
2. Integrate email service for welcome emails
3. Add Google Analytics or similar
4. Connect social share buttons to actual share APIs
