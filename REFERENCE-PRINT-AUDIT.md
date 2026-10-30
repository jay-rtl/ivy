# Reference QR and one-sheet print update

## 1. Implemented

Restyled `/credentials/` to follow the supplied reference: red editorial strip/record section, dark photographic hero, profile card, source-page barcode, QR source panel, privacy/source rows and professional-standing content in a continuous native page. The rest of the site's navy design and sticky/mobile navigation remain.

Reused the background, portrait and codes from the user's supplied reference. Converted the background to WebP and the barcode SVG to a static high-resolution PNG. The QR opens **https://www.caa.com/about-us**; it does not authenticate Ivy's personal accreditation. Labels retain the distinction between independent source-page identifiers and agency-issued credentials. No masked placeholder document ID or unsupported affiliation claim was added.

Added page-specific `src/credentials.css` with screen and compact print layouts. Print reference invokes browser printing. The tested PDFs occupy **one A4 sheet and one Letter sheet**; repeated profile/marketing elements are omitted from paper while the subject, contact, source, identifiers/date, QR, barcode, professional framework and important context remain. Source record fields stay visible on the web; no accordion or embedded frame interrupts the page flow.

Updated `src/pages/credentials.mjs`, build/style loading and asset versioning in `scripts/build.mjs`, print handler in `src/app.js`, regression tests, assets and generated output. Added development-only `jsqr` and `scripts/reference-audit.mjs` (`npm run test:reference`) for scan/PDF checks. No QR library is sent to visitors. Hostinger release was backed up and checksum-verified before activation; private release details are in ignored local deployment records.

## 2. Design review

Reviewed desktop/mobile screen captures and print-media captures. Refined 320px text overflow, wording around hidden line breaks, screen action/text legibility, printed portrait fitting, readable print text and page breaks. The initial print version occupied two sheets; the final tested version fits one sheet without clipping core record data or the QR. Primary printed body/record text is approximately 8–9pt with smaller metadata/footnotes; the paper version removes large background areas and repeated profile content.

Screen and print QR images were decoded programmatically. The source barcode was visually reviewed and compared for pixel integrity; physical barcode scanning was not performed. The studio/building images are supplied reference imagery, not independently verified claims about office location or agency affiliation.

## 3. Audit matrix

| Category / scope | Status | Evidence / limits |
| --- | --- | --- |
| Functionality — QR and print action | PASS | QR decodes to the expected CAA URL at five screen widths and both print sizes; print handler invocation checked. PDFs contain exactly one page each for tested A4/Letter settings. |
| Functionality — site/navigation | PASS | Twenty-eight local regression cases and twelve live page/viewport cases passed, including mobile menu, native content, references and redirects. |
| Functionality — physical scanning/printing | NOT TESTED | No physical phone-camera scan, barcode scanner or printer used. PDF/QR checks are software-based. |
| SEO — retained six-page configuration | PASS | Unique metadata, canonicals, social metadata, six-page sitemap, robots and clean routes checked. No affiliation/credential structured data added. |
| SEO — external search/social processing | NOT TESTED | Indexing, rankings and social caches not tested. |
| Responsive/Visual — Chrome | PASS | Reference page at 1440/900/768/390/320px, local and public; no overflow, images load. Desktop/mobile and print-media images inspected. Continuous flow and no main-content iframe verified. |
| Responsive/Visual — broader devices | NOT TESTED | Physical devices, Safari and Firefox not tested. |
| Accessibility — scoped checks | PASS | Zero axe A/AA-tag violations in tested views. QR has text destination and an ordinary link; controls have labels/focus, reduced-motion and no-JavaScript paths checked in site regression. Print source record visible. |
| Accessibility — conformance/manual AT | NOT TESTED | No screen-reader, full zoom audit or accessibility certification. Small printed metadata may require magnification for some readers. |
| Security/Privacy — update/deployment | PASS | Codes and images hosted locally; no tracking/collection or outside script introduced. Existing protected external links, backup/checksum process, HTTPS, security headers, exclusion/listing paths and legacy redirects checked. New dependency scan during install reported zero known vulnerabilities. |
| Security/Privacy — accreditation/legal | NOT TESTED | No personal accreditation or legal compliance established. Source-page reference IDs remain contextual identifiers, not agency authentication. |
| Performance — assets | PASS | Background WebP 84,726 bytes; source QR PNG 554 bytes; barcode PNG 23,395 bytes before CDN encoding. Reference stylesheet loads only on its page, with content-versioned CSS/JS URLs. Hostinger PNG re-encodes were verified pixel-identical. |
| Performance — field/timing metrics | NOT TESTED | No new Lighthouse, throttled benchmark, INP or field Core Web Vitals measurement. |
| Code/Regression | PASS | Production/SEO builds, local suite, targeted scan/print tests, twelve live page cases and thirty-nine public file/HTTP checks passed. No observed page runtime errors. |

## 4. Tests run

Environment: Windows/Node, headless Google Chrome via Playwright/axe, sharp, jsQR; local HTTP and public Hostinger HTTPS. No physical printer/scanner. Normal Hostinger browser checks were allowed to finish; protections were not disabled.

- `npm install --save-dev jsqr`: installed development-only decoder; installation audit reported zero known vulnerabilities.
- `npm run build` and production `SITE_URL=https://ivy.independentliteraryagent.net npm run build` (PowerShell equivalent): six pages and optimized codes/background generated.
- `node scripts/check-seo.mjs`: six-page metadata/canonical/sitemap/robots checks passed.
- `npm test`: **28 local audit cases passed**, including 24 page/viewport scans, mobile navigation, print invocation/content visibility, reduced motion and no-JavaScript navigation.
- `npm run test:reference`: five viewport/axe/image/QR cases passed, plus one-page A4 and Letter PDF assertions and print-sized QR decoding.
- `npm run test:reference -- --live`: the same five-width and both paper-format checks passed against the public page. Generated final PDFs in `test-results/ivy-reference-A4.pdf` and `test-results/ivy-reference-Letter.pdf`.
- `node .deployment-tools/deploy-hostinger.mjs`: verified hostname/folder marker, private backup/archive, upload checksum, scoped activation and marker cleanup.
- `node .deployment-tools/hostinger-live-check.mjs`: **12 live page/viewport cases passed**, plus menu, source record, print invocation, sitemap and legacy links; no page runtime errors.
- `node .deployment-tools/verify-hostinger-http.mjs`: **39 final checks passed**. Six pages, seventeen image/vendor assets, six CSS/JS/metadata files, five legacy redirects, four private/listing paths and HTTP→HTTPS. Most files match byte-for-byte; Hostinger re-encoded the two code PNGs, so equal dimensions and exact decoded pixel hashes were independently verified.
- `view_image`: desktop/mobile page and print-media screenshots inspected. QR decode covers rendered screen and print images, not just the source file.

Evidence: ignored `test-results/reference-red-*-results.json`, screenshots, final PDFs, audit JSON, and `.deployment-tools/hostinger-*-results.json`/private backup manifest.

## 5. Outstanding items

Owner review of the red reference presentation; physical phone/physical printer and barcode scanner checks; other browsers, screen readers and production performance measurement. User-changed scale, margins, browser headers/footers or printer hardware can change pagination. Source identifiers and date remain source-listed details rather than independently established agency credentials.

## 6. Launch readiness

**READY FOR REVIEW** — live QR/reference/one-sheet PDF behavior passed within the stated software environment; broader review limits remain documented.

## 7. Next action

Open https://ivy.independentliteraryagent.net/credentials/ and choose **Print reference**. Use A4 or Letter at normal scale with the page's CSS settings. The generated PDFs provide reviewed one-sheet alternatives.
