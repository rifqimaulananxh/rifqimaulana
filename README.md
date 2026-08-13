# Rifqi Maulana — Portfolio

Personal portfolio and software engineering showcase for [rifqimaulana.dev](https://rifqimaulana.dev).

## Pages

- **Home** — hero, featured work, services overview
- **Work** — selected projects, categorized (web / design / playground), each with a case study built from a real project (Architecture Bureau, Frame Estate, Harmony Sound, Ockham, The Ordinary, and more)
- **Services** — offerings + FAQ
- **About Me** — background and how I work
- **Contact** — email + WhatsApp inquiry form

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **GSAP** + **@gsap/react** + **SplitText** — scroll-driven animations
- **Lenis** — smooth scrolling
- **System font stack** — offline-safe typography with no build-time font request

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

```bash
pnpm lint       # eslint
pnpm build      # production build
pnpm start      # serve the production build
```

## Dev-only config

Optional `DEV_ORIGIN` env var opens the dev server to other devices on the
same network (e.g. testing on your phone). See `.env.example`.

## Deploy

Build the app with `pnpm build` and run it with `pnpm start`, or deploy it to a
Next.js-compatible host such as Vercel. Add the `rifqimaulana.dev` domain in
your host's DNS settings.
