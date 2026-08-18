# PWA — Modernization Roadmap

The repository is a Vite/TypeScript progressive web application with Azure Static Web Apps configuration.

## 10 tasks

1. Verify and document the actual installable/offline capabilities implemented in `src/` and `public/`.
2. Audit the web app manifest for names, icons, display mode, theme and start URL correctness.
3. Audit service-worker caching strategy and explicitly separate app-shell assets from volatile network data.
4. Define offline, update-available and failed-network UX.
5. Test installability and offline behavior rather than claiming PWA support from configuration alone.
6. Add tests for core application behavior plus a repeatable Lighthouse/PWA validation step.
7. Add CI for lint/type checks, tests and production build.
8. Review Azure Static Web Apps configuration, routing and fallback behavior.
9. Upgrade Vite/TypeScript dependencies after establishing current build behavior.
10. Create a portfolio case around verified offline/installability decisions and deployment architecture.

## Portfolio value

Useful as evidence of web-platform/deployment breadth if installability, caching and offline behavior are demonstrated rather than merely configured.