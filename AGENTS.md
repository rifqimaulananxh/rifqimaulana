<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Context

This repository is the Rifqi Maulana portfolio — a Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS v4 site with GSAP + Lenis animations and a system font stack.

This file documents the permanent engineering and design context for this project. Explicit instructions given in a future task always take priority over the general preferences below.

## Technology stack

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query

Backend:
- NestJS
- TypeScript
- Prisma ORM
- REST API
- Swagger

Database:
- PostgreSQL
- Redis
- Amazon S3

Authentication:
- JWT
- Refresh Token
- OAuth 2.0
- Argon2id
- MFA

Infrastructure:
- Docker
- ECS Fargate
- CloudFront
- RDS
- Route53
- AWS

## Frontend architecture preference

Use Next.js App Router.

Preferred structure:

```
src/
├── app/
├── components/
│   ├── ui/
│   ├── common/
│   └── layout/
├── features/
├── hooks/
├── lib/
└── config/
```

Directory responsibilities:
- `app/` — routes, pages, and layouts.
- `components/ui/` — reusable UI primitives (buttons, inputs, dialogs, etc.).
- `components/common/` — reusable application-level components.
- `components/layout/` — global layout components (navbar, footer, etc.).
- `features/` — feature-specific logic and components.
- `hooks/` — reusable React hooks.
- `lib/` — shared utilities and integrations.
- `config/` — application configuration and environment validation.

Note: the existing `src/` differs from the preferred structure. It currently contains `app/`, `components/` (organized per page/section: `about`, `contact`, `hero`, `layout`, `services`, `work`), `context/`, `hooks/`, and `lib/`. Do not force a restructure — follow the existing architecture unless explicitly asked to restructure.

## Backend architecture preference

Use NestJS with modular architecture.

Preferred high-level structure:

```
src/
├── modules/
├── common/
├── config/
├── database/
└── main.ts
```

- Controllers handle HTTP concerns.
- Services hold business logic.
- Prisma handles database access.
- REST API is the primary API architecture.
- Swagger documents the API.

This repo currently has no backend. Do not automatically restructure any existing backend; this is the preferred architecture for future backend development.

## UI/UX preference

The preferred visual direction is minimal, editorial, premium, modern, clean, sophisticated, typography-driven, image-driven, spacious, intentional, and high-end. The UI should feel carefully designed and art-directed.

Visual references (treat as inspiration for the design language, not designs to copy literally): premium architecture websites, design studios, creative agencies, luxury brands, premium product websites, and editorial websites.

Important characteristics:
- strong typography
- large headlines
- generous whitespace
- clear visual hierarchy
- editorial grid systems
- asymmetric layouts when appropriate
- large and carefully cropped imagery
- restrained colors
- subtle borders
- minimal navigation
- intentional spacing
- refined interactions
- subtle animation

Avoid generic SaaS aesthetics, and avoid:
- excessive cards
- excessive rounded corners
- excessive shadows
- excessive gradients
- excessive glassmorphism
- excessive pills
- excessive icons
- repetitive 3-column card sections
- unnecessary decorative elements
- overly colorful UI
- generic dashboard aesthetics
- animations everywhere

Do not turn every section into cards. Do not make every element rounded. Do not add visual effects simply to make the UI look modern. Typography, spacing, imagery, composition, and hierarchy should do most of the visual work.

## Writing & content style

All website copy should feel concise, confident, intelligent, modern, clear, intentional, premium, and human.

Prefer short, strong sentences over long explanations. Use simple language with strong meaning.

Avoid generic AI/SaaS marketing language such as:
- "Revolutionize your business"
- "Take your business to the next level"
- "Unlock your potential"
- "Powerful solutions for your business"
- "Seamlessly"
- "Cutting-edge"
- "Transform your workflow"
- "The future of..."
- "All-in-one platform"

Avoid excessive buzzwords. Avoid sounding overly corporate, overly promotional, generic, cheesy, exaggerated, or AI-generated.

Headlines should be short, memorable, confident, and specific when possible.

Prefer:

"Software built to last."

over:

"Powerful software solutions designed to transform your business."

Supporting copy should provide context without repeating the headline.

CTAs should be direct and natural. Prefer "View project", "Explore", "Start a project", "Get in touch", "See how it works". Avoid overly promotional CTAs.

Do not invent statistics, testimonials, awards, clients, case-study results, or business claims unless explicitly provided or requested as placeholder content. When content is missing, use concise placeholder copy rather than inventing fake claims.

Writing should support the visual design. Do not fill whitespace simply because there is available space.

## Engineering preferences

Prefer:
- clean architecture
- maintainable code
- simple solutions
- reusable components
- strong TypeScript
- predictable patterns
- responsive implementation
- accessibility
- performance
- minimal dependencies

Before modifying code:
1. Inspect the existing implementation.
2. Understand the existing architecture.
3. Search for reusable components.
4. Follow existing conventions.
5. Make the smallest appropriate change.

Do not:
- rewrite working code unnecessarily
- introduce unnecessary dependencies
- create duplicate components
- over-engineer
- over-componentize
- change architecture without a reason
- modify unrelated files

## Responsive design

Desktop and mobile are both first-class experiences. Do not simply shrink desktop layouts. Mobile layouts should be intentionally composed while preserving hierarchy, typography, spacing, imagery, and usability.

Always check for:
- overflow
- broken layouts
- typography issues
- navigation issues
- image problems

## Animation

Animation should be subtle, smooth, intentional, and premium. Prefer fade, translate, stagger, image reveal, subtle hover transitions, and restrained scroll interactions. Avoid excessive bouncing, scaling, parallax, rotation, and decorative animation. Animation should support the experience, not dominate it.

## Important rule

AGENTS.md is a permanent project context file. Future development tasks should use it as the default engineering and design context. However, explicit instructions given in a future task always take priority over these general preferences.
