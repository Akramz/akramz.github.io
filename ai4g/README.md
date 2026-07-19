# public

Static assets copied verbatim into the build (not processed by Vite's asset pipeline). Vite prefixes
root-absolute references to these with the configured `base` (default `/ai4g/`).

- `favicon.svg` — minimal four-tile mark derived from the top-left Microsoft-inspired brand lockup.
- `404.html` — GitHub Pages SPA fallback. Deep links use query params (`?theme=…`), which survive on
  the base path, so this only bounces a stray path back to the app root, preserving the query string
  and hash.
- `sitemap.xml` — the single planned catalog URL. It is packaged now but not submitted until launch.
- `og-card.svg` — editable 1200x630 Observatory social-card source.
- `og-card.png` — rendered social card referenced by OpenGraph and Twitter metadata.

There is intentionally no project `robots.txt`: under the planned custom-domain subpath, only
`https://akramz.space/robots.txt` is authoritative, and that personal-site file stays unchanged until
publication.
