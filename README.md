# Ivy Young — literary & film representation

Primary website: https://ivy.independentliteraryagent.net/ on Hostinger. GitHub mirror: https://jay-rtl.github.io/ivy/ . The GitHub Pages workflow rebuilds the mirror on pushes to `main`, with canonical and social URLs pointing to the primary Hostinger domain. Default local builds still disable indexing. Hostinger uploads are separate from the GitHub Pages workflow; pushing to GitHub alone does not upload files to Hostinger.

Primary public routes use clean directory URLs: `/`, `/about/`, `/representation/`, `/journal/`, `/credentials/`, `/contact/`. The GitHub mirror retains its `/ivy/` prefix. Navigation, canonicals and the sitemap use clean URLs. Hostinger's `hosting/hostinger.htaccess` provides 301 redirects for old `.html` routes. Compatibility documents provide client-side redirects on GitHub Pages, which does not use `.htaccess`. The local server supports directory index pages and old `.html` redirects.

Six static pages: Home, About, Representation, Journal, Credentials, Contact. Source content is adapted from the supplied HTML, portraits and professional-reference URL. Assets are retained in `source-assets/`. No invented clients, testimonials, achievements, or portfolio projects are included.

`src/pages/credentials.mjs` defines the native `/credentials/` page. Its red editorial design follows the supplied reference, with the local background/portrait, source-page barcode, scannable QR, and one continuous document flow. The QR opens `https://www.caa.com/about-us`; it is a company-information link, not personal accreditation verification. Source identifiers/date are labelled accordingly, and a masked placeholder document ID was omitted. No Google Sites iframe, tracking or remote image service is used.

`src/credentials.css` loads only on Credentials, with a compact one-sheet print layout. The Print reference button invokes browser printing. Tests generate one-page A4 and Letter PDFs at the tested Chrome settings (8mm CSS margins), preserve core reference fields/codes, and omit repeated profile/marketing blocks. Physical printers and user-overridden print settings can differ. `npm run test:reference` checks five screen widths, QR decoding and PDF page count against local preview; append `-- --live` to check the published Hostinger page. Test PDFs/screenshots are saved in ignored `test-results/`. The `jsqr` package is a development-only scan checker; it is not shipped to browsers.

Main-site palette: midnight navy `#15283D`, soft ivory `#F7F6F2`, slate blue `#3F6383`, and pale blue `#E8EEF3`. Credentials has its requested red editorial treatment in `src/credentials.css`. Main tokens live in `src/styles.css`. Service-list arrows use the ASCII CSS escape `\2197` to avoid character-encoding corruption. The browser audit verifies every service-list marker.

## Run locally

```powershell
npm install
npm run build
npm run dev
```

Open http://127.0.0.1:4173. The build writes a complete static website to `dist/`. Use the local server to preview directory routes. No backend or database is required.

## Files

- `scripts/build.mjs`: shared navigation/footer, page templates, metadata, image optimization, robots and sitemap.
- `src/styles.css`: tokens and responsive editorial layouts.
- `src/app.js`: GSAP/ScrollTrigger reveals, scroll progress, native modal mobile menu, reduced-motion handling.
- `source-assets/`: supplied originals; `dist/assets/`: responsive 600/1200px WebP assets.
- `scripts/audit.mjs`: local Chrome/Playwright/axe checks. Requires Chrome at the Windows path configured in the script. `npm test` requires the preview server to be running.
- `test-results/`: generated screenshots and JSON audit results (ignored by Git).

## Launch configuration

For Hostinger updates, build with `SITE_URL=https://ivy.independentliteraryagent.net`, copy `hosting/hostinger.htaccess` to the generated output as `.htaccess`, and upload only the static output to the verified Ivy document root after taking a backup outside the public directory. The previous Hostinger deployment was backed up; its exact backup location and release checksum are stored in ignored `.deployment-tools/hostinger-deployment.json`. Do not upload deployment keys, original assets, source code or dependencies. See `HOSTINGER-LIVE-AUDIT.md` for the completed deployment checks.

The default local build deliberately disables indexing. Once the final HTTPS origin is confirmed, build with:

```powershell
$env:SITE_URL = 'https://your-approved-domain.example'
npm run build
```

This enables indexing and generates absolute canonical, social image, and sitemap URLs using the configured site base URL. The sitemap includes only the six public pages. Deploy **only `dist/`**, using HTTPS. Never deploy the repository, `source-assets/`, or `node_modules/` as the web root. The primary Hostinger deployment uses `hosting/hostinger.htaccess`; the GitHub mirror publishes only `dist/`. Refer to `HOSTINGER-LIVE-AUDIT.md` for deployment verification and remaining checks.

## Motion and accessibility

Animations progressively enhance visible semantic content. ScrollTrigger uses GSAP matchMedia for reduced-motion preferences; no scroll hijacking, pinned narrative, or heavy 3D libraries. Mobile navigation uses native `dialog` for focus containment, Escape dismissal, a labelled close button, and focus restoration. Without JavaScript, a mobile link list is available. GSAP and all media are served locally; no remote fonts, analytics, tracking, or embeds are included.

## Contact and privacy

Email and telephone links use details supplied in the original HTML. They open the visitor’s configured applications. The website does not process submissions or store personal data; email is handled by the sender and recipient providers. Confirm the mailbox, phone, legal identity, operating jurisdiction, image publishing permissions, email retention/access arrangements, and any required professionally reviewed privacy notice before launch. Hosting providers may keep access logs; review that configuration with the selected provider.

## Content decisions

The original generic portfolio placeholders were omitted because no book covers or confirmed projects were supplied. The Journal uses the supplied Frankfurt photo without asserting endorsement, affiliation, or a representation agreement. Personal biography and service descriptions come from the supplied source, and still require owner review. About now links to the native Credentials page, which identifies the original Google Sites reference and official CAA company-information destination. Both sources were inspected for this update; no personal CAA accreditation was independently established or claimed.

Stylesheet and interaction-script URLs include a content-derived version query so changed CSS/JS is fetched after deployments, including when Hostinger CDN retains the old unversioned resource.

## Animation reference

Implementation follows the official [GSAP matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) for media-dependent animation cleanup and reduced-motion handling.
