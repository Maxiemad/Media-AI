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
- Smooth scroll with native CSS
- Responsive design (mobile-first)
- **Persistent AI chatbot** fixed in bottom-right viewport corner

## Tech Stack
- **Frontend:** React, Tailwind CSS, CSS 3D Transforms, React Portals
- **Backend:** FastAPI, MongoDB
- **AI Integration:** OpenAI GPT-4o-mini (via Emergent Integrations)
- **Design:** Syne + Space Grotesk fonts, Electric Cyan (#00F0FF) + Neon Violet (#7000FF) accent colors

## What's Been Implemented

### December 2025
- [x] Hero section with animated title reveal
- [x] Video modal with YouTube embed
- [x] Sticky navigation with smooth scroll
- [x] Features grid (6 cards) with 3D hover effects
- [x] Story section with parallax scrolling
- [x] Countdown timer (30-day launch date)
- [x] Bento grid gallery
- [x] Newsletter signup with MongoDB persistence
- [x] Footer with social links
- [x] Noise texture overlay
- [x] Mobile responsive design
- [x] Backend API for newsletter subscriptions
- [x] **AI Chatbot (GPT-4o-mini)** with chat history persistence
- [x] **Fixed chatbot positioning** - uses React Portal to escape CSS stacking contexts
- [x] **Modern chatbot animations** - floating/pulsing effects, smooth open/close transitions
- [x] **Scroll lag fix** - removed heavy animation libraries (Lenis, excessive Framer Motion)

## API Endpoints
- `GET /api/` - Health check
- `POST /api/subscribe` - Subscribe to waitlist
- `GET /api/stats` - Get subscriber count
- `GET /api/launch-date` - Get countdown target date
- `POST /api/chat` - Send message to AI chatbot
- `GET /api/chat/history/{session_id}` - Get chat history
- `DELETE /api/chat/history/{session_id}` - Clear chat history

## P0/P1/P2 Features Remaining

### P0 (Critical) - NONE (All resolved)

### P1 (Important)
- YouTube/Vimeo trailer embed (user interactive video player)
- Email confirmation integration (SendGrid/Resend)
- Analytics tracking (page views, CTA clicks)

### P2 (Nice to Have)
- Refactor 3D tilt effect into reusable `useTilt` hook
- Admin dashboard for subscribers
- A/B testing for CTAs
- Internationalization (i18n)

## Known Technical Decisions
- **Removed `perspective: 1000px` from body** - this CSS property creates a containing block that breaks `position: fixed` for child elements
- **Using React Portal** for chatbot to render directly to `document.body`, escaping all transform/perspective stacking contexts
- **Native scrolling** instead of Lenis for better performance

## Next Tasks
1. Implement YouTube/Vimeo trailer embed in hero section
2. Integrate email service for welcome emails
3. Refactor 3D tilt logic into `useTilt` custom hook
