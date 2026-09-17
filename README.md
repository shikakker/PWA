# PWA Starter

A small installable Progressive Web App starter based on PWABuilder's original template. This repository is kept as a working reference for Vite, Lit web components, client-side routing, a web app manifest, and service-worker lifecycle handling.

## What works

- installable web app manifest with standalone display mode and 192/512 px icons;
- a single service-worker registration path through `vite-plugin-pwa` / `virtual:pwa-register`;
- automatic service-worker updates through the existing application update UI;
- Lit-based application shell and Vaadin client-side routing;
- Vite production build;
- Node 22 CI with deterministic install, production dependency audit, PWA contract tests, TypeScript, and build verification.

The completion pass removed a second broken inline service-worker registration that used `import.meta` from a classic script, upgraded the runtime router, moved build-only Workbox packages out of production dependencies, and reduced the production audit from critical/high findings to zero.

## Stack

- Lit
- Vite
- `vite-plugin-pwa`
- `@pwabuilder/pwainstall`
- `@vaadin/router`
- TypeScript

## Requirements

- Node.js 22
- npm (lockfile: `package-lock.json`)

## Local development

```bash
npm ci
npm run dev-server
```

The Vite development server opens the app locally. `npm run dev` uses the Azure Static Web Apps CLI wrapper retained from the original starter and may download that CLI through `npx`.

## Quality checks

```bash
npm test
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

GitHub Actions runs the same release-critical checks from `.github/workflows/quality.yml`.

## PWA files

- `public/manifest.json` — installability metadata.
- `src/app-index.ts` — application shell and the single `registerSW({ immediate: true })` entry point.
- `vite.config.ts` — VitePWA configuration.
- generated `sw.js` — produced during the Vite production build.

Do not add a second manual `navigator.serviceWorker.register(...)` block to `index.html`; service-worker ownership belongs to the VitePWA integration.

## Deployment

The repository is connected to a Vercel project named `pwa`. Build with `npm run build`. The current completion branch is verified in CI before it is considered deployable; production promotion is not automatic.

## Provenance

This is a maintained fork/reference derived from the PWABuilder PWA starter, not a claim of authorship of the upstream starter framework. Upstream PWABuilder documentation remains useful for broader packaging and store-distribution guidance.
