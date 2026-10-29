# Clean URL update

## 1. Implemented

Published clean routes at https://jay-rtl.github.io/ivy/ : `about/`, `representation/`, `journal/`, and `contact/`. Pages are generated as directory `index.html` files. Navigation, CTA links, canonical/OG URLs and sitemap entries now use the clean public addresses. CSS, scripts, favicon, images and responsive image sources resolve from nested pages.

Old `.html` links remain as compatibility redirect documents: JavaScript forwards to the corresponding clean path while preserving query strings and fragments. Meta-refresh and a visible link provide a fallback. These are client-side redirects on GitHub Pages, not configurable HTTP 301 responses. The local preview server provides 301 redirects and directory index handling.

Affected areas: `scripts/build.mjs`, `scripts/serve.mjs`, `scripts/audit.mjs`, `scripts/check-seo.mjs`, `README.md`, generated `dist/` pages/sitemap and this report. Published code commit: `6012cb6`.

## 2. Design review

This is a routing change. The existing navy/ivory design and GSAP interactions remain. Updated local mobile Representation screenshot visually inspected; no material visual issue observed. Automated checks confirm page assets and overflow behavior across local desktop/tablet/mobile views and live desktop/mobile views.

## 3. Audit matrix

| Category / scope | Status | Evidence |
| --- | --- | --- |
| Functionality — clean routes | PASS | Five pages at four local widths and two live widths; images, local link destinations and mobile menu checked. Four legacy public `.html` URLs redirect to clean paths with query and anchor retained. |
| Functionality — external services | NOT TESTED | Mail delivery, phone and external reference remain outside this change. |
| SEO — routing configuration | PASS | Clean canonical URLs, indexability, sitemap and robots delivery checked live; source SEO checks verify unique titles/descriptions and no `.html` internal links in generated main pages. Redirect documents are noindex with clean canonical links. |
| SEO — search processing | NOT TESTED | Search engine recrawling/indexing and social preview refresh not verified. |
| Responsive/Visual — scoped Chrome checks | PASS | No document overflow at 1440/768/390/320px locally and 1440/390px live; images load. Updated local mobile Representation screenshot reviewed. |
| Responsive/Visual — other browsers/devices | NOT TESTED | Physical devices, Safari and Firefox not tested. |
| Accessibility — scoped automated/interaction checks | PASS | Zero axe violations under selected A/AA tags in twenty local and ten live page/viewport views. Local focus restoration, modal keyboard behavior, reduced motion and no-JavaScript clean navigation pass. |
| Accessibility — full manual assessment | NOT TESTED | No screen reader, full tab traversal or text zoom audit. |
| Security/Privacy — change review | PASS | No new dependency or data collection; compatibility redirect destinations are fixed generated routes. Preview server continues to constrain file access to `dist/`. HTTPS deployment unchanged. |
| Security/Privacy — broader assurance | NOT TESTED | No penetration test or legal certification; prior content/legal review items remain. |
| Performance | NOT TESTED | No new timing benchmark. No new media, fonts or runtime dependency added to canonical pages. |
| Code/Regression | PASS | Production build, syntax checks, SEO check, 23 local browser audit cases, ten live cases and compatibility redirect assertions passed; deployment workflow succeeded. No observed page runtime errors. |

## 4. Tests run

Environment: Windows, Node 24, headless Chrome/Playwright with axe. Local HTTP preview and public HTTPS GitHub Pages.

- `node scripts/check-seo.mjs` — passed clean canonical and internal-link assertions, unique metadata, sitemap/robots and local noindex restoration.
- `npm test` — 23 passed cases; four viewport widths over five pages plus menu/reduced-motion/no-JavaScript fallback checks.
- `node --check scripts/build.mjs`, `node --check scripts/serve.mjs`, `node --check scripts/audit.mjs` — passed.
- `SITE_URL=https://jay-rtl.github.io/ivy npm run build` (PowerShell environment equivalent) — successful production build.
- GitHub Actions run `40729772210` — success, code commit `6012cb6`.
- `node .deployment-tools/live-check.mjs` — ten live page/viewport checks, canonical/indexing checks, image loading, no overflow, axe scans, mobile menu, sitemap/robots, and four legacy redirects preserving `?source=legacy` and `#main`/`#publishing` — passed.
- `view_image` — updated local Representation mobile screenshot reviewed.

Local evidence: `test-results/audit.json`, screenshots, `.deployment-tools/live-results.json` (evidence directories ignored by Git).

## 5. Outstanding items

GitHub Pages old-link redirects are client-side, with a meta-refresh/link fallback. Broader external-contact, legal, assistive-technology, alternate-browser and production performance checks remain as previously documented. No known failure remains in the scoped routing checks.

## 6. Launch readiness

**READY FOR REVIEW** — clean URLs are deployed and verified; wider pre-existing review items remain. No claim of full accessibility, security or legal compliance.

## 7. Next action

Open https://jay-rtl.github.io/ivy/representation/ . Refresh an existing tab if it still shows cached navigation. Previously shared `.html` links forward automatically.
