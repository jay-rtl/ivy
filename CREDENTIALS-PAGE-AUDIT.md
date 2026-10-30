# Native Credentials page audit

## 1. Implemented

Created **https://ivy.independentliteraryagent.net/credentials/** as a complete native page with its own indexable HTML, title, description, canonical, portrait, professional-framework content, source links, expandable record details, contact CTA and print action. It is not a redirect or embedded Google Sites page. Added Credentials to desktop/mobile/footer navigation, connected About to it, and expanded the sitemap to six public pages. Added a Hostinger 301 redirect from `/credentials.html`.

Page content lives in `src/pages/credentials.mjs`; build/navigation/image processing changes in `scripts/build.mjs`; responsive/print styles in `src/styles.css`; print handler in `src/app.js`; host rules in `hosting/hostinger.htaccess`; tests updated in `scripts/audit.mjs` and `scripts/check-seo.mjs`. Original portrait extracted from the user-supplied reference is retained as `source-assets/ivy-young-reference.png`, with optimized derivatives in `dist/assets/`. All image width/height/srcset declarations now use actual source dimensions.

Published to Hostinger after a verified private backup and release checksum comparison. Source code and GitHub mirror published as commit `2635eef`, successful Actions run `40905874113`. Added content-derived CSS/JS version queries after public checks detected an old cached stylesheet. Final public checks verified that the versioned resources match the staged build.

## 2. Design and source review

Adapted the reference into the site's navy/ivory design with a profile-and-record composition, open numbered standards, source entries and native expandable details. Refined a heading that overflowed at 320px. Local and live desktop/mobile Credentials screenshots were visually inspected; no material issue remained in the scoped review. Print CSS exposes content hidden by scroll-reveal animations; the print handler and PDF generation were checked.

The supplied Google Sites title uses “CAA ACREDITATION,” but its embedded content describes an independent professional reference and links to CAA's general About page. The native page preserves that distinction. The [official CAA About page](https://www.caa.com/about-us) describes the company; it does not establish Ivy's personal employment, membership, accreditation or endorsement. The [user-supplied reference](https://sites.google.com/view/ivycaa/caa-acreditation) was read through Chrome, including its embedded frame.

Source-listed profile/control identifiers and the January 2, 2023 source review date are explicitly labelled as source-page details, not agency-issued credentials or a current verification date. A masked placeholder document ID, decorative barcode/QR verification claims, CAA branding and broken placeholder links were omitted. No credential structured data or certification claim was added.

## 3. Audit matrix

| Category / scope | Status | Evidence / limits |
| --- | --- | --- |
| Functionality — native page and navigation | PASS | `/credentials/` returns 200 with local HTML and no main-content iframe. All navigation destinations, mobile route access, expandable source details and print invocation checked. |
| Functionality — external contact outcomes | NOT TESTED | Actual mailbox/phone delivery not exercised. |
| SEO — configuration and public output | PASS | Six unique page titles/descriptions, primary headings, clean canonical URLs, six-page sitemap, robots, indexability and legacy redirects checked. About and all site menus link internally to the new page. |
| SEO — search/social systems | NOT TESTED | No Search Console/indexing or third-party social preview validation; no ranking guarantee. |
| Responsive/Visual — Chrome | PASS | Twenty-four local page/viewport cases at 1440/768/390/320px plus twelve live desktop/mobile cases. Updated local and live Credentials screenshots visually reviewed. Narrow-screen heading overflow fixed. |
| Responsive/Visual — other browsers/devices | NOT TESTED | Physical-device, Safari and Firefox checks not performed. |
| Accessibility — scoped checks | PASS | Zero axe A/AA-tag violations in local/live cases. Targeted modal keyboard/focus behavior, reduced motion, no-JavaScript navigation, source-detail expansion, print invocation and print-content visibility checked. |
| Accessibility — broader assessment | NOT TESTED | No screen-reader or complete zoom/manual conformance audit. Automated results are not certification. |
| Security/Privacy — new page/deployment | PASS | No form, embedded Google page, third-party runtime script or tracking introduced. External source links use noopener/noreferrer. Verified backup/upload checksums and HTTPS/headers; private-path/listing checks remain 403/404. Keys and raw source-capture data excluded from Git and public output. |
| Security/Privacy — credential/legal assurance | NOT TESTED | No personal accreditation or legal compliance independently established. Source identifiers are contextual records, not proof of affiliation. Owner rights/content and jurisdiction-specific reviews remain as applicable. |
| Performance — image/cache configuration | PASS | New portrait derivatives: 39,102 and 93,086 bytes. Responsive dimensions/srcset, eager profile image, system fonts and local assets retained. Content-versioned CSS/JS fixed the observed stale-resource response. |
| Performance — timing/field metrics | NOT TESTED | No new Lighthouse, throttled device benchmark or field Core Web Vitals measurement. |
| Code/Regression | PASS | Six-page builds and syntax checks passed. Twenty-eight local audit cases, thirty-five final public HTTP checks and twelve final live page/viewport cases passed without observed page runtime errors. Print PDF generated. |

## 4. Tests run

Environment: Windows/Node, local static preview, headless Google Chrome through Playwright/axe, and public Hostinger HTTPS. Normal Hostinger browser challenges were allowed to finish; no hosting protection was disabled.

- `node .deployment-tools/read-credential-source.mjs`: source Google Sites page returned 200; embedded text, source links and portrait inspected. The general web reader could not fetch this page, so Chrome was used.
- Official CAA About page retrieved with web browsing; company context reviewed.
- `node scripts/check-seo.mjs`: six unique metadata sets, clean internal/canonical URLs, social metadata, sitemap/robots and preview noindex restoration passed.
- `node --check src/pages/credentials.mjs`, `node --check src/app.js`: passed.
- `npm test`: **28 local audit cases passed**, including 24 page/viewport cases and focused mobile, credentials/printing, reduced-motion and no-JavaScript checks. `test-results/credentials-reference.pdf` generated; print API invocation was intercepted in the browser test rather than sent to a physical printer.
- `SITE_URL=https://ivy.independentliteraryagent.net npm run build` (PowerShell equivalent): successful six-page production build.
- `node .deployment-tools/deploy-hostinger.mjs`: exact hostname/root proof, private backup, checksum validation, scoped upload and marker cleanup succeeded.
- `node .deployment-tools/verify-hostinger-http.mjs`: **35 final public checks passed**, including six page checksums/canonicals, fourteen image/vendor assets, five static/metadata files, five legacy redirects, four excluded/listing paths and HTTP→HTTPS.
- `node .deployment-tools/hostinger-live-check.mjs`: **12 final live page/viewport cases passed**, with native Credentials content, image loading, canonical/indexability, axe, mobile current-page state, record expansion and print invocation; no page runtime errors observed.
- `node .deployment-tools/capture-credentials.mjs` and `view_image`: final live desktop/mobile page captured and reviewed.

Evidence is stored locally in ignored `test-results/` and `.deployment-tools/`, including screenshots, PDF, live JSON results, and the private backup/release manifest. Source and updated static output are in the repository.

## 5. Outstanding items

Owner review of the native page and source-listed identifiers; personal affiliation/credential claims would require independent agency-issued evidence before any such claim is added. Physical devices, other browsers, screen readers, legal/content-rights review and production timing remain outside this scoped verification. No known defect remains in the tested page behavior.

## 6. Launch readiness

**READY FOR REVIEW** — the requested separate native page is deployed and tested within the documented scope. This is not accreditation, legal or accessibility certification.

## 7. Next action

Review https://ivy.independentliteraryagent.net/credentials/ . The Credentials menu item opens the new page; source links are supporting references within it.
