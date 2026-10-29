# Hostinger deployment preparation

Historical preparation report. Authentication was subsequently authorized and deployment completed. See `HOSTINGER-LIVE-AUDIT.md` for the final results.

## 1. Implemented

Prepared `ivy-hostinger-upload.zip` with the static site built for `https://ivy.independentliteraryagent.net`. Only generated website files are in the archive; no repository, dependencies, deployment keys or original asset folder is included. The root `index.html` is at the archive root. Latest photos, clean URLs and badge removal are included. GitHub Pages output was restored after creating this separate package; the existing live GitHub deployment was not changed.

Created a local deployment key. The private key remains in ignored `.deployment-tools/`; only its public half is provided in `HOSTINGER-PUBLIC-KEY.txt` for hPanel authorization. Both the host upload ZIP and public-key handoff file are excluded from Git.

## 2. Design review

No layout or imagery change for this hosting preparation. Previously verified navy/ivory site retained. No Hostinger-rendered version inspected because upload authentication is unavailable.

## 3. Audit matrix

| Category / subcheck | Status | Evidence |
| --- | --- | --- |
| Functionality — SSH authentication | FAIL | Supplied host/port reachable, but noninteractive SSH login returned `Permission denied (publickey,password)`. No authorized local credential is available. |
| Functionality — public domain reachability | PASS | HTTPS request to the supplied domain returned HTTP 200, server `hcdn`. This does not verify deployment of the new site. |
| Functionality — Hostinger deployment | NOT TESTED | No upload, remote folder inspection or backup performed because authentication failed. |
| SEO — prepared package | PASS | All five canonical URLs and index/follow directives match the custom domain; sitemap has five clean URLs; no GitHub-domain URLs in generated main pages. |
| SEO — live deployment | NOT TESTED | Prepared files have not been uploaded. |
| Responsive/Visual — Hostinger | NOT TESTED | No new rendered version available. Source design unchanged from previous verification. |
| Accessibility — Hostinger | NOT TESTED | No new live build available; this preparation changed metadata domain only. |
| Security/Privacy — credential handling | PASS | No password requested or stored. Private key stays in ignored local storage and is not in the public archive; only public key shared. |
| Security/Privacy — server configuration | NOT TESTED | Remote permissions, document root, existing files, HTTPS configuration and headers require authorized SSH inspection. |
| Performance — Hostinger | NOT TESTED | New site not deployed there. |
| Code/Regression — package generation | PASS | Host-domain production build completed, output assertions passed, ZIP generated, GitHub-domain local output restored. |

## 4. Tests run

- OpenSSH noninteractive connection to supplied IP/port/user: reachable but authentication denied; no remote command executed.
- `Invoke-WebRequest https://ivy.independentliteraryagent.net/`: HTTP 200, `hcdn` server.
- `node .deployment-tools/prepare-hostinger.mjs`: generated a domain-specific build, copied it to ignored staging, and restored GitHub output.
- Node package assertions: five correct canonical URLs/indexing directives, clean sitemap, expected new photo assets, no decorative badge, no old host URLs; passed.
- PowerShell `Compress-Archive`: generated `ivy-hostinger-upload.zip` from staged static files.

## 5. Outstanding items

Add the supplied deployment public key to this site's Hostinger hPanel under Advanced → SSH Access → Add SSH key. After authorization, remote files and the exact document root must be inspected, existing content backed up outside the web root, and only the intended site's files updated. Then verify the new domain's routes, assets, canonicals, redirects, accessibility, HTTPS and runtime behavior. No remote files, DNS or GitHub Pages deployment were changed during preparation.

## 6. Launch readiness

**BLOCKED** — Hostinger authentication is required before backup, upload and live verification.

## 7. Next action

In Hostinger SSH Access, add the entire contents of `HOSTINGER-PUBLIC-KEY.txt` as a public key named `ivy-deployment`, then tell the assistant it has been added. Do not upload or share the private key.

Official guidance: [Add a public SSH key in Hostinger hPanel](https://www.hostinger.com/support/5634532-how-to-generate-ssh-keys-and-add-them-to-hostinger-dashboard/).
