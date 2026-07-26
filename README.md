# Idea Spoken

Idea Spoken is a bilingual education and youth-impact platform built with Next.js App Router.
The project combines content-rich program pages, course experiences, media galleries, and dashboard workflows in a reusable component architecture.

## Table of Contents

1. Overview
2. Core Features
3. Tech Stack
4. Local Setup
5. Environment Variables
6. Scripts
7. Project Structure
8. Route Map
9. Architecture and Conventions
10. Data and Media Pipeline
11. Common Development Tasks
12. Troubleshooting
13. Deployment Notes
14. Contributing

## Overview

The app is designed around:
- Public-facing pages for courses and program wings
- Dynamic media coming from backend blog APIs
- Reusable UI templates with section-level content providers
- Responsive layouts optimized for desktop and mobile

Primary goals:
- Clear storytelling for each initiative
- Reusable, scalable frontend structure
- Reliable media rendering from API and local assets

## Core Features

- Home page with Hero, Top Courses, Why IDEA, and 7 Wings sections
- Dedicated pages for program wings such as Youth Development, WIDEN, Pitha, Rise and Thrive
- Course listing and course detail pages
- Dashboard area with certificates, lessons, payments, and profile settings
- API-backed wing cover images and galleries
- Motion-enhanced UI using `motion`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- motion
- lucide-react
- ESLint 9 + eslint-config-next

## Local Setup

1. Clone the repository.
2. Install dependencies.
3. Create environment variables.
4. Start the development server.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create a `.env.local` file in the repository root.

```env
NEXT_PUBLIC_BACKEND_URL=https://api.idealessons.com
# Optional override if you want to set full API base explicitly
# BASE_URL=https://api.idealessons.com/api/v1
```

Variable reference:
- `NEXT_PUBLIC_BACKEND_URL`: Base backend origin used for media URL normalization (`/uploads/...`).
- `BASE_URL`: Optional explicit API base for endpoint requests. If omitted, code derives it from `NEXT_PUBLIC_BACKEND_URL`.

## Scripts

```bash
npm run dev     # Start dev server
npm run build   # Build production bundle
npm run start   # Start production server
npm run lint    # Run ESLint
```

Recommended check before PR:

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
	app/                          # Next.js routes (App Router)
		api/                        # Route handlers
		dashboard/                  # Dashboard pages
		our-wings/                  # Wings listing and dynamic wing route
	components/
		home/                       # Home page section components
		ui/                         # Generic reusable UI
		youth-development/          # Wing-specific sections
		...                         # Other wing/course section folders
	lib/
		api/                        # API service layer + typed interfaces
		auth/                       # Auth helpers
		data.ts                     # Shared local data
		getFullImageUrl.ts          # Converts media paths to full URLs
	types/                        # Shared type definitions

public/                         # Static assets (images, fonts, icons)
```

## Route Map

Main public routes:
- `/`
- `/about`
- `/blog`
- `/contact`
- `/courses`
- `/courses/[slug]`
- `/our-wings`
- `/our-wings/[wing]`

Program routes:
- `/youth-development`
- `/social-welfare`
- `/game-method`
- `/pitha`
- `/widen`
- `/bangla-pitha-research-institute`
- `/rise-and-thrive`

Auth and dashboard routes:
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/dashboard`
- `/dashboard/certificates`
- `/dashboard/lessons`
- `/dashboard/payment-history`
- `/dashboard/profile-settings`

## Architecture and Conventions

This project uses a template + content-provider pattern for most sections.

Pattern summary:
- Template components define structure and typed props.
- Wing/page-specific provider components prepare icons, text, and card arrays.
- Providers pass fully assembled content into template components.

Important conventions:
- Keep reusable templates data-agnostic.
- Use `lucide-react` icons for consistency.
- Prefer section spacing pattern: `py-20 md:py-24 lg:py-32`.
- Keep layouts responsive by default (mobile first).

## Data and Media Pipeline

Home and wing data flow:
1. Route-level server component fetches data through `src/lib/api`.
2. `getSevenWingsData()` fetches blogs and maps them to wing cards.
3. `getFullImageUrl()` converts upload paths into absolute URLs.
4. UI components render the mapped data.

Media handling behavior:
- API images often arrive as `/uploads/...` paths.
- These are normalized using `NEXT_PUBLIC_BACKEND_URL`.
- Local static assets should live in `public/` and be referenced as `/images/...` or `/home/...`.

## Common Development Tasks

### Add a new wing card sourced from backend

1. Ensure backend blog slug exists and is published.
2. Update slug-to-route mapping in `src/lib/api/index.ts` if needed.
3. Add fallback route/order entry for deterministic display.
4. Verify card image resolves via `getFullImageUrl()`.

### Update section content/style

1. Edit wing-specific content provider in `src/components/<wing>/`.
2. Keep template components reusable.
3. Validate responsive behavior on mobile and desktop.
4. Run lint/build checks.

### Update dashboard module

1. Modify route page under `src/app/dashboard/...`.
2. Update supporting components under `src/components/dashborad/`.
3. Keep sidebar navigation and active route behavior intact.

## Troubleshooting

### Images not rendering

Checklist:
- Confirm `NEXT_PUBLIC_BACKEND_URL` is set.
- Verify API returns `coverImage.url` for target content.
- Check host allowlist in `next.config.ts` `images.remotePatterns`.
- Ensure local fallback image exists in `public/`.

### Data appears stale

Checklist:
- Restart dev server after changing env vars.
- Confirm fetch revalidation settings in API functions.
- Hard refresh browser cache.

### Dev server fails to start

Checklist:
- Run `npm install` again.
- Check Node.js version (`node -v`, expected 20+).
- Resolve lint/type errors shown in terminal output.

## Deployment Notes

Typical production flow:

```bash
npm run build
npm run start
```

Before deploying:
- Configure environment variables in your hosting platform.
- Verify backend domain and media host are correct.
- Run smoke tests on home, wings, and dashboard routes.

## Contributing

Recommended workflow:
1. Create a feature branch.
2. Make focused changes.
3. Run lint and build checks.
4. Open a PR with screenshots for UI changes.

PR checklist:
- No broken images or routes
- Responsive behavior verified
- Reusable component pattern preserved
- No unnecessary refactors in unrelated files

---

If this project needs formal usage terms, add a `LICENSE` file.
