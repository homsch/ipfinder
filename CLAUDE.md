# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small React + TypeScript single-page app (`ipfinder.de`) that displays the visitor's public IPv4 address. The IP is fetched at runtime from a separate Cloudflare Worker (`https://api-ipfinder.homsch-hopper.workers.dev`) — that backend lives in another repository. This repo contains only the static frontend.

The static build is deployed to **Cloudflare Pages** (project name `ipfinder`, see `wrangler.jsonc`).

## Development workflow

Development is intended to run **inside Docker** via Compose watch mode — `node_modules` for the runtime live in the container, while `npm install` is also run on the host purely so the IDE gets autocomplete (see README).

```bash
# Start dev server (Vite on :5173) with file sync into the container
docker compose watch ipfinder-dev

# Production build (TypeScript project refs build + vite build → ./dist)
docker compose exec -it ipfinder-dev npm run build

# Serve the built ./dist locally over HTTPS on :8443 (self-signed)
npm run servedist

# Deploy ./dist to Cloudflare Pages
npm run cloudflarelogin   # one-time wrangler login
npm run deploy
```

There are no unittests because the project ist very small. ESLint is configured (`eslint.config.js`, flat config) and exposed via `npm run lint` (check) and `npm run lint:fix` (autofix). Lint also runs in CI on every push and PR (see `.github/workflows/ci-cd.yml`) and will block deploys on failure.

## Architecture notes

- **Entry chain:** `index.html` → `src/main.tsx` (StrictMode root) → `src/App.tsx`. App is intentionally minimal; data is fetched once via `useEffect` guarded by a `useRef` flag to avoid the StrictMode double-invoke.
- **Backend coupling:** The fetch URL in `src/App.tsx` is hardcoded. Treat the Worker URL as the API contract — there is no proxy, no env var, no fallback. CORS must be allowed by the Worker for both the production origin and `localhost:5173`/`:8443`.
- **TypeScript:** Project references — `tsconfig.app.json` covers `src/`, `tsconfig.node.json` covers Vite/tooling config. The root `tsconfig.json` only references the two; `tsc -b` is what `npm run build` invokes before Vite.
- **Cloudflare Pages output:** `pages_build_output_dir` is `./dist`. `vite.config.ts` sets `base: "/"`, so do not change it without updating Pages config.

## Conventions

- Keep dependencies minimal — current runtime deps are only `react` and `react-dom`.
- Keep the design simple
- only grayscale colors when possible
