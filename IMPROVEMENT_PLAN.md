# Completion plan

1. Establish upstream provenance immediately. README screenshots named `pwa-starter-overview`, `use-this-template`, `static-web-app`, Codespaces instructions and the generic structure indicate a PWA starter/template rather than a unique finished product. Identify exact upstream source/version/license.
2. Diff against upstream and document only actual custom changes. If there is no meaningful delta, classify this repository as a learning/template experiment and exclude it from the primary portfolio rather than implying original PWA engineering.
3. Audit `public/manifest.json`: app name/short name, start URL, scope, display mode, theme/background colors, icons, purpose/maskability and stable IDs. Replace starter branding only if this repo is intentionally becoming a distinct product.
4. Inspect the service-worker/build configuration in `package.json` and source to verify whether offline caching, installability and update behavior are genuinely implemented. Do not claim offline support merely because a manifest/icons exist.
5. If retaining as a PWA, define a concrete offline strategy: which shell/data/assets cache, cache versioning/eviction, navigation fallback and what happens when network-only features are unavailable.
6. Add an explicit update lifecycle so users do not remain indefinitely on stale cached assets: detect a new worker/version, communicate refresh when needed and avoid destructive cache deletion while the app is active.
7. Accessibility/mobile pass for the actual home/about/header UI: semantic navigation, keyboard/focus, viewport/safe-area behavior, touch target sizing, standalone-mode layout and readable offline/error states.
8. Remove bulky README/tutorial screenshots and VS Code/Codespaces starter artifacts that add no runtime or portfolio value, while preserving upstream attribution/license and only the documentation needed for this derivative.
9. Add automated checks for manifest validity, service-worker registration/update, offline navigation and installability using browser tests plus lint/build CI; verify production HTTPS deployment rather than development-only behavior.
10. Rewrite README truthfully: upstream attribution, exact modifications, verified PWA capabilities, caching/update model, install instructions, browser/platform limitations and whether the repository is maintained, archived or a learning experiment.
