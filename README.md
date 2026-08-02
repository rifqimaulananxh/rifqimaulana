# Rifqi Maulana — Portfolio

Personal portfolio and software engineering showcase for [rifqimaulana.dev](https://rifqimaulana.dev).

## Pages

- **Home** — hero, featured work, services overview
- **Work** — selected projects, categorized (web / backend / design / playground)
- **Services** — offerings + FAQ
- **About Me** — background and how I work
- **Contact** — email + WhatsApp inquiry form

## Stack

- **Next.js 16** (App Router, Turbopack) — fully static, SSG
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **GSAP** + **@gsap/react** + **SplitText** — scroll-driven animations
- **Lenis** — smooth scrolling
- **Motion** (Framer Motion) — route transitions

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

```bash
pnpm lint       # eslint
pnpm build      # production build (SSG)
pnpm start      # serve the production build
```

## Dev-only config

Optional `DEV_ORIGIN` env var opens the dev server to other devices on the
same network (e.g. testing on your phone). See `.env.example`.

## Deploy

Fully static — deploy the `pnpm build` output to any static host (Vercel,
Netlify, Cloudflare Pages). Add the `rifqimaulana.dev` domain in your host's
DNS settings.
