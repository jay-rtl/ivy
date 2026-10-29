# Supplied photo update

## 1. Implemented

Added the two newly supplied PNGs as `source-assets/ivy-young-smiling.png` and `source-assets/ivy-young-conversation.png`. The smiling portrait is featured on About; the office conversation appears in a new editorial section on Representation; both also appear in the Journal gallery alongside the previous portraits. No client identity, endorsement, transaction or outcome is asserted by the new captions.

Generated responsive WebP versions in `dist/assets/`, with descriptive alt text, intrinsic dimensions, eager loading for the About portrait and lazy loading for below-fold photography. Updated `scripts/build.mjs`, `src/styles.css`, generated pages and assets. The two-column Journal gallery uses alternating offsets across both rows.

## 2. Design review

The smiling portrait complements the navy palette and makes About more personal. The conversation photograph accompanies “First, a conversation” on Representation. Existing portraits remain in the Journal. Local About and Representation desktop screenshots and Journal mobile screenshot were visually reviewed; the published Representation mobile screenshot was also reviewed. No material visual issues observed. Automated layout checks cover the three affected pages at desktop, tablet and phone widths locally and desktop/phone widths live.

## 3. Audit matrix

| Category / scope | Status | Evidence / limits |
| --- | --- | --- |
| Functionality — new photography | PASS | All new photos load in their intended placements; Journal contains five images including the event feature. Nine local and six live page/viewport checks passed without page runtime errors. |
| Functionality — external integrations | NOT APPLICABLE | No integration or submission flow added; previously documented external-service verification remains unchanged. |
| SEO — affected output | PASS | Clean production canonical URLs retained in About, Representation and Journal; new images have descriptive alternatives. |
| SEO — search engine processing | NOT TESTED | No recrawl, indexing or ranking validation performed. |
| Responsive/Visual — scoped Chrome review | PASS | 1440/768/390px local checks and 1440/390px live checks show no horizontal document overflow; representative screenshots reviewed. |
| Responsive/Visual — other devices/browsers | NOT TESTED | Physical devices, Safari and Firefox not tested in this update. |
| Accessibility — image and automated checks | PASS | All tested page images load with nonempty alt text and width/height attributes. Zero axe violations under selected WCAG A/AA tags across all fifteen tested views. |
| Accessibility — full manual assessment | NOT TESTED | Screen readers, zoom and full keyboard review not repeated for this image update. No interactive image controls added. |
| Security/Privacy — scoped change review | PASS | Supplied static photos and presentation changes only; no new runtime dependency, data collection, tracking or remote media service added. |
| Security/Privacy — broader legal assurance | NOT TESTED | No legal compliance certification. Existing ownership/likeness permissions and other owner review items remain as previously documented. |
| Performance — media optimization | PASS | New WebP files are 36,184–104,710 bytes. Below-fold images lazy-load and dimensions are reserved. |
| Performance — timing/field metrics | NOT TESTED | No new Lighthouse, throttled benchmark or field Core Web Vitals measurement. |
| Code/Regression — affected pages | PASS | Production build, build-script syntax check, fifteen image/layout/axe browser cases and GitHub Pages deployment succeeded. |

## 4. Tests run

Environment: Windows headless Chrome through Playwright and axe; local HTTP and public GitHub Pages HTTPS.

- `SITE_URL=https://jay-rtl.github.io/ivy npm run build` (PowerShell environment equivalent): five-page production output succeeded.
- `node --check scripts/build.mjs`: passed.
- Node output inspection: production canonical URLs retained in all three affected pages.
- `node .deployment-tools/photo-check.mjs`: nine passed page/viewport cases at 1440, 768, 390px; image placement/loading, alt/dimensions, overflow, axe scans and runtime errors checked.
- `node .deployment-tools/photo-check.mjs live`: six passed cases at 1440 and 390px against the public website.
- `view_image`: local desktop About/Representation, local mobile Journal and live mobile Representation screenshots reviewed.
- GitHub Actions run `40733626266`, code commit `3c02841`: successful publication.

New asset sizes: smiling 600px 48,600 bytes; smiling large 104,710 bytes; conversation 600px 36,184 bytes; conversation large 76,850 bytes. Source dimensions for both PNGs: 1098×1433. Local browser evidence lives in ignored `.deployment-tools/photos-*-results.json` and screenshots.

## 5. Outstanding items

Owner review of the selected placements. Broader legal/image-rights, alternate-browser, physical-device and assistive-technology checks from earlier reports remain; no known defect was found in the scoped image update.

## 6. Launch readiness

**READY FOR REVIEW** — photos are published and scoped verification passed; broader review limitations remain documented.

## 7. Next action

Review https://jay-rtl.github.io/ivy/about/ , https://jay-rtl.github.io/ivy/representation/ , and https://jay-rtl.github.io/ivy/journal/ . Refresh an existing tab if it retains older assets.
