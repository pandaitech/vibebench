/*
 * Navigation data for the standalone VibeBench result pages.
 *
 * The gallery, method page, and votes remain in pandaitech. This small static
 * snapshot gives the result pages enough context to render their comparison
 * bar without depending on the main site's Flask runtime.
 */
window.VIBEBENCH = {
  "contenders": {
    "opus-5-medium": {"name": "Claude Opus 5 Medium", "accent": "#C96442"},
    "opus-5-high": {"name": "Claude Opus 5", "accent": "#C96442"},
    "opus-5-high-v2": {"name": "Claude Opus 5 (v2)", "accent": "#C96442"},
    "sonnet-5-low": {"name": "Claude Sonnet 5 (low)", "accent": "#C96442"},
    "gpt-5-6-sol-high": {"name": "GPT-5.6 sol High", "accent": "#10A37F"},
    "gpt-5-6-sol-ultra": {"name": "GPT-5.6 sol Ultra", "accent": "#10A37F"},
    "gpt-5-6-sol-medium": {"name": "GPT-5.6 sol Medium", "accent": "#10A37F"},
    "gpt-5-6-luna-max": {"name": "GPT-5.6 luna Max", "accent": "#10A37F"},
    "gpt-5-6-luna-medium": {"name": "GPT-5.6 luna Medium", "accent": "#10A37F"},
    "deepseek-v4-flash-high": {"name": "deepseek-v4-flash-high", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-opencode": {"name": "deepseek-v4-flash-high-opencode", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-claude": {"name": "deepseek-v4-flash-high-claude", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-pi": {"name": "deepseek-v4-flash-high (pi)", "accent": "#4D6BFE"}
  },
  "jobs": [
    {
      "id": "rci-th-dashboard",
      "title": "A 240-page government report",
      "entries": [
        {"contender": "opus-5-medium", "url": "/eda/rci-th-dashboard/opus-5-medium/"},
        {"contender": "opus-5-high", "url": "/eda/rci-th-dashboard/opus-5-high/"},
        {"contender": "opus-5-high-v2", "url": "/eda/rci-th-dashboard/opus-5-high-v2/"},
        {"contender": "sonnet-5-low", "url": "/eda/rci-th-dashboard/sonnet-5-low/"},
        {"contender": "gpt-5-6-sol-medium", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-medium/"},
        {"contender": "gpt-5-6-sol-high", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-high/"},
        {"contender": "gpt-5-6-luna-medium", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-medium/"},
        {"contender": "gpt-5-6-luna-max", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-max/"},
        {"contender": "deepseek-v4-flash-high-opencode", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-opencode/"},
        {"contender": "deepseek-v4-flash-high-claude", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-claude/"},
        {"contender": "deepseek-v4-flash-high-pi", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-pi/"}
      ]
    },
    {
      "id": "kedai-saya-3d",
      "title": "Kedai Saya — pengurusan kedai 3D",
      "entries": [
        {"contender": "deepseek-v4-flash-high", "url": "/game/kedai-saya/deepseek-v4-flash-high/"}
      ]
    },
    {
      "id": "empayar-sambal-bilis",
      "title": "Empayar Sambal Bilis — pengurusan dapur 3D",
      "entries": [
        {"contender": "opus-5-high", "url": "/game/empayar-sambal-bilis/opus-5-high/"},
        {"contender": "gpt-5-6-sol-high", "url": "/game/empayar-sambal-bilis/gpt-5-6-sol-high/"},
        {"contender": "gpt-5-6-luna-max", "url": "/game/empayar-sambal-bilis/gpt-5-6-luna-max/"}
      ]
    },
    {
      "id": "lontar-kertas",
      "title": "Lontar Kertas — arcade 3D",
      "entries": [
        {"contender": "gpt-5-6-sol-ultra", "url": "/game/lontar-kertas/gpt-5-6-sol-ultra/"}
      ]
    }
  ]
};
