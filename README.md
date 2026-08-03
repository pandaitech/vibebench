# VibeBench

Standalone generated result pages for VibeBench.

This repository is intended to be hosted at `https://vibebench.pandaitech.my/`.
The gallery, method page, and voting API remain in the main `pandaitech` repo at
`https://pandaitech.my/vibebench`.

## Layout

- `eda/` — generated exploratory dashboards, served from `/eda/...`
- `logos/` — logos used by the result-page navigation and main gallery
- `data.js` — small navigation-data snapshot consumed by `vb-bar.js`
- `vb-bar.js` — shared comparison bar injected into result pages

Generated pages should use root-relative paths such as `/data.js`, `/vb-bar.js`,
and `/eda/...`. The future static-host configuration should map directories with
`index.html` to their clean URL.

When adding a result, update both the main repo's `vibebench_data.py` registry
and this repo's `data.js` navigation snapshot.
