# public

Static assets copied verbatim into the build (not processed by Vite's asset pipeline). Vite prefixes
root-absolute references to these with the configured `base` (default `/ai4g/`).

- `favicon.svg` — minimal four-tile mark derived from the top-left Microsoft-inspired brand lockup.
- `404.html` — GitHub Pages SPA fallback. Deep links use query params (`?mode=…&domain=…`), which survive on
  the base path, so this only bounces a stray path back to the app root, preserving the query string
  and hash.
- `sitemap.xml` — the single planned catalog URL. It is packaged now but not submitted until launch.
- `og-card.svg` — editable 1200x630 AI for (Public) Goods Observatory social-card source.
- `og-card.png` — rendered AI for (Public) Goods social card referenced by OpenGraph and Twitter
  metadata.
- `featured/` — optimized local visuals for the featured-project map callouts, with source and
  license metadata in `../../data/featured-projects.json`.

There is intentionally no project `robots.txt`: under the planned custom-domain subpath, only
`https://akramz.space/robots.txt` is authoritative, and that personal-site file stays unchanged until
publication.
