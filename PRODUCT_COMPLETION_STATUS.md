# Product Completion Status — PWA Starter

Canonical repository: `shikakker/PWA`  
Completion branch: `ai/product-completion/PWA`  
Draft PR: #2  
Vercel project: `pwa` (`prj_pjMYCdI7gVWcmyDj5cHwSgCSe7LH`).

## Product definition

User → needs a small installable PWA reference → opens the app, navigates through the client shell, installs it and receives service-worker updates → gets a stable offline-capable starter without duplicate registration, unpinned CDN runtime, over-broad third-party caching or vulnerable build tooling.

Current maturity: maintained starter/reference project, not a standalone commercial product.

## T01–T10 — Core tasks

| ID | Priority | Status | Task |
| --- | --- | --- | --- |
| T01 | P0 | DONE | Removed invalid classic-script `import.meta` service-worker registration. |
| T02 | P0 | DONE | VitePWA is the single service-worker lifecycle owner. |
| T03 | P0 | DONE | Production dependency audit is clean. |
| T04 | P1 | DONE | Runtime router upgraded to patched `@vaadin/router` 2.0.1. |
| T05 | P1 | DONE | Build-only Workbox/PWA tooling remains outside production dependencies. |
| T06 | P1 | DONE | TypeScript upgraded to 5.9.2 without `skipLibCheck`. |
| T07 | P1 | DONE | Installability/service-worker/CDN/cache regression contracts added. |
| T08 | P1 | DONE | Permanent Node 22 / Actions v7 Quality gate. |
| T09 | P0 | DONE | Vite/Workbox tooling migrated to clean full-audit boundary. |
| T10 | P1 | BLOCKED | Exact-current-head Vercel preview/browser install/offline/update smoke is blocked by Hobby deployment-rate capacity. |

## I01–I10 — Improvements

| ID | Status | Improvement |
| --- | --- | --- |
| I01 | DONE | Node 22 runtime declaration. |
| I02 | DONE | Frozen npm install in CI. |
| I03 | DONE | Production and full dependency audit gates at high severity. |
| I04 | DONE | Separate non-emitting TypeScript verification from declaration build semantics. |
| I05 | DONE | Strict dependency type checking retained. |
| I06 | DONE | Single service-worker lifecycle owner. |
| I07 | DONE | Third-party Fluent Web Components CDN runtime pinned to `2.5.14`. |
| I08 | DONE | Third-party Workbox cache now matches only the exact pinned request and caches only CORS-verifiable HTTP 200 responses; opaque status 0 and path/query variants are excluded. |
| I09 | DONE | Service worker disabled in development; Actions v7 removes deprecated action-runtime warnings. |
| I10 | DEFERRED WITH REASON | Lighthouse/performance and interactive offline/update tuning follow exact final preview availability. |

## F01–F10 — Product features

| ID | Priority | Status | Feature |
| --- | --- | --- | --- |
| F01 | P0 | DONE | Installable manifest. |
| F02 | P0 | DONE | Service-worker registration through `virtual:pwa-register`. |
| F03 | P1 | DONE | Automatic service-worker update path. |
| F04 | P1 | DONE | Lit application shell. |
| F05 | P1 | DONE | Client-side routing. |
| F06 | P1 | DONE | PWABuilder install component. |
| F07 | P2 | DEFERRED WITH REASON | Store packaging is outside this repository's release scope. |
| F08 | P2 | DEFERRED WITH REASON | Push notifications require a real backend/product need. |
| F09 | P2 | DEFERRED WITH REASON | Background sync requires a real data workflow rather than demo code. |
| F10 | P2 | DEFERRED WITH REASON | Additional offline data strategies require product-specific content. |

## Verification evidence

Initial completion work removed duplicate service-worker ownership and migrated the runtime/tooling graph to a clean production/full-audit boundary. Earlier exact code/release head `2d01e487f7c8b9aee3d7a3cb9a927e75a9e52c60` passed `npm ci`, both audits, contracts, typecheck and Vite/PWA build.

### Latest third-party cache slice

The Fluent runtime was version-pinned and loaded with `crossorigin="anonymous"`, but Workbox still matched any path/query suffix under the versioned package URL and allowed `cacheableResponse.statuses: [0, 200]`. That could persist opaque/unverifiable responses and cache requests outside the single runtime entry the page actually uses.

- `914d8d07478134e373716016c29c18da82d71d74` — regression first: Workbox must match only the exact pinned package-root request and only cache HTTP 200.
- Pre-fix exact config was RED because its regex allowed `(?:[/?#].*)?` and its cacheable statuses included `0`.
- `3f027e30de1b9d0ba539f5c7dbeb58af865dfcd0` — narrows `urlPattern` to exact `https://unpkg.com/@fluentui/web-components@2.5.14` and `statuses: [200]`; the application script URL/version are unchanged.
- An SRI hash was **not invented**: the execution network could not resolve `unpkg.com` to retrieve and hash the exact 2.5.14 bytes. The implemented change therefore improves the verifiable cache boundary without claiming artifact-integrity verification that was not performed.

Exact-head GitHub Quality run `35281779593`, job `105405121015`: **PASS** with real executed steps:
- `npm ci`: PASS;
- production high-severity audit: PASS;
- full dependency high-severity audit: PASS;
- `npm test`: PASS including the new cache-boundary contract;
- typecheck: PASS;
- Vite/PWA production build: PASS.

## Hosted state

Canonical Vercel project `pwa` remains connected. Exact runtime-head Vercel status for `3f027e30...` is still **Deployment rate limited** before application build. The last READY completion deployment predates the current cache hardening, so final install/offline/update/browser PASS is not claimed.

## Remaining release gate

**BLOCKED ONLY BY:**
1. Vercel Hobby build capacity for an exact-current-head preview;
2. install/offline/update/console/network smoke on that exact preview.

## Project checkpoint

**PROJECT:** `PWA`  
**Fixed this pass:** narrowed third-party Workbox cache from an asset-family/opaque-response policy to the exact pinned CORS request with HTTP-200-only caching.  
**Verification:** exact-head install/audits/tests/typecheck/build = **PASS**; Vercel exact head = RATE-LIMITED; interactive install/offline/update = NOT VERIFIED.  
**Git:** `ai/product-completion/PWA`, Draft PR #2; verified runtime head `3f027e30...`.  
**Status:** **PARTIAL**.

No merge, production promotion, billing action or destructive operation has been performed automatically.
