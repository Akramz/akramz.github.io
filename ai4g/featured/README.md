# featured

Optimized 640 x 400 WebP visuals for featured-project hover previews. Runtime code loads only these
local assets. Editorial order, alt text, source URLs, credits, and licenses live in
`../../../data/featured-projects.json`.

Keep crops faithful to their source, keep each file small, and run `uv run python data/validate.py
--light` after changing this directory.
