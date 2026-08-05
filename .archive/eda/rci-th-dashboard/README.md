# Archived RCI Tabung Haji benchmark results

Archived in batches on 2026-08-04 and 2026-08-05 so these test results stay
out of the active VibeBench navigation and production EDA paths while remaining
recoverable from Git.

Archived model configurations:

- `deepseek-v4-flash-max`
- `gpt-5-6-luna-high`
- `gpt-5-6-luna-xhigh`
- `gpt-5-6-sol-max`
- `gpt-5-6-terra-high`
- `gpt-5-6-terra-xhigh`
- `opus-5-max`
- `sonnet-5-high`
- `glm-5-2-max`
- `kimi-k3-max`
- `minimax-m-3-thinking`
- `qwen3-8-max-high`
- `opus-5-high-x-gpt-5-6-luna-max`
- `opus-5-high-x-gpt-5-6-sol-high`
- `opus-5-high-x-gpt-5-6-sol-high-v2`

The archived `opus-5-high-x-gpt-5-6-luna-max` and
`opus-5-high-x-gpt-5-6-sol-high` copies were superseded by newer active EDA
versions that now use the same slugs. Do not restore either archive over its
active path.

To restore a result, move its directory back to the active EDA path and add its
contender and job entry to `data.js`:

```sh
git mv .archive/eda/rci-th-dashboard/<model> eda/rci-th-dashboard/<model>
```

The production Nginx configuration denies dot-directory paths, so `.archive`
is not publicly served.
