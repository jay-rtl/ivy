# GitHub Pages deployment audit

## 1. Implemented

- Published the five-page Ivy Young site to https://jay-rtl.github.io/ivy/ from https://github.com/jay-rtl/ivy.
- Enabled GitHub Pages with workflow publishing and enforced HTTPS.
- Added `.github/workflows/deploy.yml`: automatic build and deployment on pushes to `main`; the published artifact contains only `dist/`.
- Updated `scripts/build.mjs` to accept an HTTPS site base URL with a subpath. Production builds use `SITE_URL=https://jay-rtl.github.io/ivy` for canonical, social image and sitemap URLs and enable indexing.
- Excluded local deployment helpers and website ZIP from Git. Authentication used existing Git credentials in memory; no credential was written to source.
- Corrected spacing in the mobile hero paragraph where a hidden line break joined two sentences.

## 2. Design review

Retained the approved working navy/ivory/slate palette, supplied portraits, editorial page structure, sticky navigation and GSAP interactions. Live homepage screenshots were visually inspected at 1440px and 390px; no material visual defects were observed. All five live pages were also inspected programmatically at these widths for image loading and overflow. Prior local audits cover tablet and 320px layouts as documented in `PALETTE-REVIEW.md`.

## 3. Audit matrix

| Category / scope | Status | Evidence |
| --- | --- | --- |
| Functionality — live website | PASS | Five public pages return 200 at both desktop and mobile widths; all page images load; mobile menu opens and closes with Escape; no observed page runtime errors. |
| Functionality — external contacts/reference | NOT TESTED | Mailbox/phone delivery and the third-party reference destination remain unverified. |
| SEO — deployed configuration | PASS | Every page has the expected production canonical and index/follow metadata; sitemap and robots files return 200 and reference the production site base URL. No search ranking/indexing guarantee. |
| SEO — search/social systems | NOT TESTED | Search Console, actual indexing and third-party social preview rendering not tested. Project-level robots.txt is provided at `/ivy/robots.txt`; crawler robots policy is determined at the hosting domain root. |
| Responsive/Visual — Chrome | PASS | Ten live page/viewport combinations have no document overflow; desktop/mobile homepage screenshots visually reviewed. |
| Responsive/Visual — other browsers/devices | NOT TESTED | No physical devices, Safari or Firefox review. |
| Accessibility — automated live scan | PASS | Zero axe violations under selected WCAG A/AA tags in all ten live views. Mobile menu opening/Escape checked. Prior local focus/reduced-motion/no-JavaScript checks are documented separately. |
| Accessibility — full manual conformance | NOT TESTED | Screen readers, full manual keyboard traversal and text zoom not tested; no certification claimed. |
| Security/Privacy — deployment scope | PASS | HTTPS enforced; only static `dist/` artifact deployed; no credentials or new data collection introduced. Local deployment helpers are ignored by Git. |
| Security/Privacy — broader production/legal | NOT TESTED | No penetration test or legal certification. Content rights, email handling and legal notices still require owner/professional review as appropriate. |
| Performance — production benchmark | NOT TESTED | Images and scripts load, but no live Lighthouse, throttled mobile or field Core Web Vitals measurement performed. Previous local metrics remain historical. |
| Code/Regression — build/deployment | PASS | Local production build and SEO generation checks pass. GitHub Actions build and deployment complete successfully. Live smoke checks and axe scans pass. |

## 4. Tests run

- `node scripts/check-seo.mjs`: production metadata generation verified; local preview settings restored by that script before the final production build.
- `$env:SITE_URL = 'https://jay-rtl.github.io/ivy'; npm run build`: production static site generated successfully.
- GitHub Actions `Deploy website to GitHub Pages`: successful build and publication.
- `node .deployment-tools/live-check.mjs`: ten live checks across five pages at 1440px and 390px, HTTP status, images, canonical URLs, indexability, document overflow, axe A/AA tags, mobile menu, sitemap and robots; no runtime errors.
- `node .deployment-tools/capture.mjs` and `view_image`: live desktop/mobile screenshots captured and reviewed.

Browser environment: local Windows headless Chrome through Playwright accessing public HTTPS pages. Deployment helpers and live JSON/screenshot evidence are retained locally in ignored `.deployment-tools/`.

Workflow follows the official [GitHub Pages custom workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 5. Outstanding items

External contact/reference verification, owner review of business claims/image rights and any required legal notices, Safari/Firefox and physical-device testing, assistive-technology checks, and real production performance measurement. No custom domain was requested or configured.

## 6. Launch readiness

**READY FOR REVIEW** — the requested public deployment is complete and tested within the stated scope. Remaining business/legal and broader verification items are documented; this is not a claim of full accessibility or legal compliance.

## 7. Next action

Review the live site at https://jay-rtl.github.io/ivy/ . Future pushes to `main` automatically rebuild and deploy it.
