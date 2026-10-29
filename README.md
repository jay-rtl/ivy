# Ivy Young — literary & film representation

Live hosting: https://jay-rtl.github.io/ivy/ . The GitHub Pages workflow in `.github/workflows/deploy.yml` builds and deploys `dist/` automatically when `main` changes, with `SITE_URL=https://jay-rtl.github.io/ivy`. The site URL supports hosting subpaths. Default local builds still disable indexing.

Five static pages: Home, About, Representation, Journal, Contact. Source content is adapted from the supplied HTML and portraits, retained in `source-assets/`. No invented clients, testimonials, achievements, or portfolio projects are included.

Current palette: midnight navy `#15283D`, soft ivory `#F7F6F2`, slate blue `#3F6383`, and pale blue `#E8EEF3`. Theme tokens live in `src/styles.css`. Service-list arrows use the ASCII CSS escape `\2197` to avoid character-encoding corruption. The browser audit verifies every service-list marker.

## Run locally

```powershell
npm install
npm run build
npm run dev
```

Open http://127.0.0.1:4173. The build writes a complete static website to `dist/`. You can also open `dist/index.html` directly for a basic local preview. No backend or database is required.

## Files

- `scripts/build.mjs`: shared navigation/footer, page templates, metadata, image optimization, robots and sitemap.
- `src/styles.css`: tokens and responsive editorial layouts.
- `src/app.js`: GSAP/ScrollTrigger reveals, scroll progress, native modal mobile menu, reduced-motion handling.
- `source-assets/`: supplied originals; `dist/assets/`: responsive 600/1200px WebP assets.
- `scripts/audit.mjs`: local Chrome/Playwright/axe checks. Requires Chrome at the Windows path configured in the script. `npm test` requires the preview server to be running.
- `test-results/`: generated screenshots and JSON audit results (ignored by Git).

## Launch configuration

The default local build deliberately disables indexing. Once the final HTTPS origin is confirmed, build with:

```powershell
$env:SITE_URL = 'https://your-approved-domain.example'
npm run build
```

This enables indexing and generates absolute canonical, social image, and sitemap URLs using the configured site base URL. The sitemap includes only the five public pages. Deploy **only `dist/`**, using HTTPS. Never deploy the repository, `source-assets/`, or `node_modules/` as the web root. GitHub Pages is configured with HTTPS; its workflow publishes only `dist/`. Refer to `DEPLOYMENT-AUDIT.md` for deployment verification and remaining checks.

## Motion and accessibility

Animations progressively enhance visible semantic content. ScrollTrigger uses GSAP matchMedia for reduced-motion preferences; no scroll hijacking, pinned narrative, or heavy 3D libraries. Mobile navigation uses native `dialog` for focus containment, Escape dismissal, a labelled close button, and focus restoration. Without JavaScript, a mobile link list is available. GSAP and all media are served locally; no remote fonts, analytics, tracking, or embeds are included.

## Contact and privacy

Email and telephone links use details supplied in the original HTML. They open the visitor’s configured applications. The website does not process submissions or store personal data; email is handled by the sender and recipient providers. Confirm the mailbox, phone, legal identity, operating jurisdiction, image publishing permissions, email retention/access arrangements, and any required professionally reviewed privacy notice before launch. Hosting providers may keep access logs; review that configuration with the selected provider.

## Content decisions

The original generic portfolio placeholders were omitted because no book covers or confirmed projects were supplied. The Journal uses the supplied Frankfurt photo without asserting endorsement, affiliation, or a representation agreement. Personal biography and service descriptions come from the supplied source, and still require owner review. The original third-party credentials URL is retained on About as “Professional reference,” but could not be verified during this work; credential claims have not been reproduced as verified accreditation. Verify its destination and content before launch.

## Animation reference

Implementation follows the official [GSAP matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) for media-dependent animation cleanup and reduced-motion handling.
