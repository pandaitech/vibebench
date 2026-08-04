# Archived RCI Tabung Haji benchmark results

Archived on 2026-08-04 so these test results stay out of the active VibeBench
navigation and production EDA paths while remaining recoverable from Git.

Archived model configurations:

- `deepseek-v4-flash-max`
- `gpt-5-6-luna-high`
- `gpt-5-6-luna-xhigh`
- `gpt-5-6-terra-high`
- `gpt-5-6-terra-xhigh`
- `opus-5-max`
- `sonnet-5-high`

To restore a result, move its directory back to the active EDA path and add its
contender and job entry to `data.js`:

```sh
git mv .archive/eda/rci-th-dashboard/<model> eda/rci-th-dashboard/<model>
```

The production Nginx configuration denies dot-directory paths, so `.archive`
is not publicly served.
