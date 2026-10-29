# Hostinger live deployment audit

## 1. Implemented

Published the completed five-page website to **https://ivy.independentliteraryagent.net/** using the authorized SSH deployment key. Verified the exact document root with a temporary random marker served through the intended subdomain, then removed that marker. The root is the existing `ivy` directory beneath the parent domain's `public_html`; neighboring websites were not changed.

Backed up the previous Ivy folder, which contained the Hostinger default page, to a private archive outside the web root. Verified that archive before activating the new release. Uploaded the generated static release, checked its SHA-256 checksum, set directory/file permissions, and copied it into the verified Ivy folder. Backup/release locations and the deployment checksum are stored locally in ignored `.deployment-tools/hostinger-deployment.json`.

The deployed files include the latest supplied photos, clean directory URLs, GSAP interactions and the homepage badge removal. Added `hosting/hostinger.htaccess` with an explicit HTML directory index, directory listing protection, four legacy `.html` → clean-route HTTP 301 rules, `nosniff`, and a referrer policy. Public HTTP requests redirect to HTTPS using the existing hosting configuration.

All primary canonical/social URLs and the sitemap now reference the Hostinger domain. Updated repository output and the GitHub mirror's build configuration to use this primary canonical domain. The GitHub mirror remains a separate deployment; future GitHub pushes update the mirror, **not Hostinger automatically**. No DNS changes were made and no password/private key was committed or included in a public archive.

## 2. Design review

Preserved the existing navy/ivory/slate design, supplied photography, sticky header, animated mobile menu and clean page URLs. Live Hostinger homepage screenshots were visually reviewed at 1440px and 390px. All five live pages were also checked for loaded images and document overflow at both widths. No material defect observed within this scope.

Hostinger initially presented its browser-security challenge with HTTP 403 to automated Chrome. Waiting for the normal challenge to finish and reloading produced the actual website successfully. The final browser audit passed; no hosting protection was disabled. First-time visitors may encounter this provider-controlled check.

## 3. Audit matrix

| Category / scope | Status | Evidence / limits |
| --- | --- | --- |
| Functionality — public site | PASS | Five public pages return 200; deployed page and asset bytes match the prepared release; latest images load; desktop/mobile menu checks pass without page runtime errors. |
| Functionality — old links | PASS | Four legacy `.html` URLs return server-side 301 with clean destinations and query strings preserved; browser navigation confirms anchors are retained. |
| Functionality — external services | NOT TESTED | Actual email/telephone delivery and third-party professional reference remain outside this deployment verification. |
| SEO — live configuration | PASS | Correct primary canonical URLs and indexability on all five pages; sitemap/robots return 200 with custom-domain content; assets/social image available. GitHub mirror configuration uses primary-domain canonicals. |
| SEO — external processing | NOT TESTED | Search engine indexing, Search Console and social preview caches not verified; no ranking guarantee. |
| Responsive/Visual — local Chrome to live HTTPS | PASS | Ten live page/viewport cases at 1440px/390px without horizontal document overflow; live desktop/mobile homepage screenshots visually reviewed. |
| Responsive/Visual — other devices/browsers | NOT TESTED | Physical devices, Safari and Firefox not tested in this deployment. Earlier local tablet checks are documented separately. |
| Accessibility — scoped live checks | PASS | Zero axe violations under selected WCAG A/AA tags in all ten live cases. Mobile menu opens and Escape closes it. This is not a conformance certification. |
| Accessibility — full manual review | NOT TESTED | Screen readers, zoom/text enlargement and full keyboard traversal not repeated on Hostinger. |
| Security/Privacy — deployment scope | PASS | Verified SSH target, private pre-upload backup, release checksum, HTTPS redirect, `nosniff` and referrer policy. Requests for `.env`, `.git/config`, `node_modules/package.json` and directory listing receive 403/404. Only static output uploaded; credentials remain outside the public site and Git. |
| Security/Privacy — broader assurance/legal | NOT TESTED | No penetration test, total security guarantee or legal certification. Prior owner/content rights and jurisdiction-specific review items remain. |
| Performance | NOT TESTED | No new Hostinger Lighthouse, throttled mobile benchmark, field Core Web Vitals or INP measurement. Compressed images/local libraries retained; the provider's first-visit browser challenge can affect perceived loading. |
| Code/Regression — build/deployment | PASS | Custom-domain production build succeeded; 31 public HTTP/file/redirect/header checks and ten live browser cases passed. Uploaded bytes match prepared output. |

## 4. Tests run

Environment: Windows OpenSSH/Node and local headless Google Chrome via Playwright/axe, accessing public Hostinger HTTPS. Browser checks allow the provider's normal challenge to finish before asserting the final page status.

- OpenSSH authenticated read-only inspection: located and resolved the exact Ivy directory; inspected existing files/rules before mutation.
- `node .deployment-tools/deploy-hostinger.mjs`: marker-based hostname/root verification, private backup and archive validation, uploaded release checksum comparison, scoped activation, marker cleanup; succeeded.
- `node .deployment-tools/verify-hostinger-http.mjs`: **31 checks passed**. Five page checksums/canonicals/headers; twelve image/vendor assets; five CSS/JS/favicon/robots/sitemap files; four legacy 301 routes; four excluded/listing paths; HTTP→HTTPS redirect.
- `node .deployment-tools/hostinger-live-check.mjs`: **10 page/viewport cases passed**, plus images, canonicals, indexability, axe, mobile menu, sitemap/robots and legacy query/anchor compatibility. No page runtime errors.
- `node .deployment-tools/capture-hostinger.mjs` and `view_image`: live desktop/mobile homepage screenshots captured and visually inspected.
- `SITE_URL=https://ivy.independentliteraryagent.net npm run build` (PowerShell equivalent): generated current primary-domain output successfully.

Private local evidence: `.deployment-tools/hostinger-deployment.json`, `hostinger-http-results.json`, `hostinger-live-results.json`, and `hostinger-live-*.png`. Public deliverable: `ivy-hostinger-upload.zip`, containing only the staged static output and Hostinger rules.

## 5. Outstanding items

Owner review on the real domain; external contact/reference verification; physical-device/alternate-browser and assistive-technology testing; legal/content rights review where applicable; production performance measurement. Hostinger first-visit security checks are provider-controlled. Automatic Hostinger deployment from GitHub has not been configured; future updates require a separate upload or an explicitly configured pipeline.

## 6. Launch readiness

**READY FOR REVIEW** — requested Hostinger deployment is complete and scoped live checks passed. Wider review limitations remain documented; no known failure remains in the tested site flows.

## 7. Next action

Review https://ivy.independentliteraryagent.net/ on your normal browser and phone. The site now uses this domain as its primary SEO address.
