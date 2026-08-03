/*
 * Navigation data for the standalone VibeBench result pages.
 *
 * The gallery, method page, and votes remain in pandaitech. This small static
 * snapshot gives the result pages enough context to render their comparison
 * bar without depending on the main site's Flask runtime.
 */
window.VIBEBENCH = {
  "contenders": {
    "opus-5-high": {"name": "Claude Opus 5", "accent": "#C96442"},
    "sonnet-5-high": {"name": "Claude Sonnet 5", "accent": "#C96442"},
    "gpt-5-6-sol-high": {"name": "GPT-5.6 sol", "accent": "#10A37F"},
    "gpt-5-6-terra-high": {"name": "GPT-5.6 terra", "accent": "#10A37F"},
    "gpt-5-6-luna-high": {"name": "GPT-5.6 luna", "accent": "#10A37F"},
    "gpt-5-6-luna-max": {"name": "GPT-5.6 luna Max", "accent": "#10A37F"}
  },
  "jobs": [
    {
      "id": "rci-th-dashboard",
      "title": "A 240-page government report",
      "entries": [
        {"contender": "opus-5-high", "url": "/eda/rci-th-dashboard/opus-5-high/"},
        {"contender": "sonnet-5-high", "url": "/eda/rci-th-dashboard/sonnet-5-high/"},
        {"contender": "gpt-5-6-sol-high", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-high/"},
        {"contender": "gpt-5-6-terra-high", "url": "/eda/rci-th-dashboard/gpt-5-6-terra-high/"},
        {"contender": "gpt-5-6-luna-high", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-high/"},
        {"contender": "gpt-5-6-luna-max", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-max/"}
      ]
    }
  ]
};
