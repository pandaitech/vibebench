/*
 * Navigation data for the standalone VibeBench result pages.
 *
 * The gallery, method page, and votes remain in pandaitech. This small static
 * snapshot gives the result pages enough context to render their comparison
 * bar without depending on the main site's Flask runtime.
 */
window.VIBEBENCH = {
  "contenders": {
    "claude-opus-5-medium-claude": {"name": "Claude Opus 5 Medium · Claude Code", "accent": "#C96442"},
    "claude-opus-5-high-claude": {"name": "Claude Opus 5 High · Claude Code", "accent": "#C96442"},
    "claude-opus-5-high-2-claude": {"name": "Claude Opus 5 High (2) · Claude Code", "accent": "#C96442"},
    "claude-sonnet-5-low-claude": {"name": "Claude Sonnet 5 Low · Claude Code", "accent": "#C96442"},
    "gpt-5-6-sol-high-codex": {"name": "GPT-5.6 Sol High · Codex", "accent": "#10A37F"},
    "gpt-5-6-sol-max-codex": {"name": "GPT-5.6 Sol Max · Codex", "accent": "#10A37F"},
    "gpt-5-6-sol-ultra-codex": {"name": "GPT-5.6 Sol Ultra · Codex", "accent": "#10A37F"},
    "gpt-5-6-sol-medium-codex": {"name": "GPT-5.6 Sol Medium · Codex", "accent": "#10A37F"},
    "gpt-5-6-luna-max-codex": {"name": "GPT-5.6 Luna Max · Codex", "accent": "#10A37F"},
    "claude-opus-5-high-x-gpt-5-6-luna-max-claude-codex": {"name": "Claude Opus 5 High × GPT-5.6 Luna Max · Claude Code + Codex", "accent": "#A7D8C1"},
    "claude-opus-5-high-x-gpt-5-6-sol-high-claude-codex": {"name": "Claude Opus 5 High × GPT-5.6 Sol High · Claude Code + Codex", "accent": "#9CCFD8"},
    "gpt-5-6-luna-medium-codex": {"name": "GPT-5.6 Luna Medium · Codex", "accent": "#10A37F"},
    "deepseek-v4-flash-high": {"name": "DeepSeek V4 Flash High", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-opencode": {"name": "DeepSeek V4 Flash High · OpenCode", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-claude": {"name": "DeepSeek V4 Flash High · Claude Code", "accent": "#4D6BFE"},
    "deepseek-v4-flash-high-pi": {"name": "DeepSeek V4 Flash High · Pi", "accent": "#4D6BFE"}
  },
  "jobs": [
    {
      "id": "rci-th-dashboard",
      "title": "A 240-page government report",
      "entries": [
        {"contender": "claude-opus-5-medium-claude", "url": "/eda/rci-th-dashboard/claude-opus-5-medium-claude/"},
        {"contender": "claude-opus-5-high-claude", "url": "/eda/rci-th-dashboard/claude-opus-5-high-claude/"},
        {"contender": "claude-opus-5-high-2-claude", "url": "/eda/rci-th-dashboard/claude-opus-5-high-2-claude/"},
        {"contender": "claude-sonnet-5-low-claude", "url": "/eda/rci-th-dashboard/claude-sonnet-5-low-claude/"},
        {"contender": "gpt-5-6-sol-medium-codex", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-medium-codex/"},
        {"contender": "gpt-5-6-sol-high-codex", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-high-codex/"},
        {"contender": "gpt-5-6-sol-max-codex", "url": "/eda/rci-th-dashboard/gpt-5-6-sol-max-codex/"},
        {"contender": "gpt-5-6-luna-medium-codex", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-medium-codex/"},
        {"contender": "gpt-5-6-luna-max-codex", "url": "/eda/rci-th-dashboard/gpt-5-6-luna-max-codex/"},
        {"contender": "claude-opus-5-high-x-gpt-5-6-luna-max-claude-codex", "url": "/eda/rci-th-dashboard/claude-opus-5-high-x-gpt-5-6-luna-max-claude-codex/"},
        {"contender": "claude-opus-5-high-x-gpt-5-6-sol-high-claude-codex", "url": "/eda/rci-th-dashboard/claude-opus-5-high-x-gpt-5-6-sol-high-claude-codex/"},
        {"contender": "deepseek-v4-flash-high-opencode", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-opencode/"},
        {"contender": "deepseek-v4-flash-high-claude", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-claude/"},
        {"contender": "deepseek-v4-flash-high-pi", "url": "/eda/rci-th-dashboard/deepseek-v4-flash-high-pi/"}
      ]
    },
    {
      "id": "kedai-saya",
      "title": "Kedai Saya — pengurusan kedai 3D",
      "entries": [
        {"contender": "deepseek-v4-flash-high-claude", "url": "/game/kedai-saya/deepseek-v4-flash-high-claude/"},
        {"contender": "gpt-5-6-luna-max-codex", "url": "/game/kedai-saya/gpt-5-6-luna-max-codex/"},
        {"contender": "gpt-5-6-sol-ultra-codex", "url": "/game/kedai-saya/gpt-5-6-sol-ultra-codex/"},
        {"contender": "claude-opus-5-high-claude", "url": "/game/kedai-saya/claude-opus-5-high-claude/"}
      ]
    },
    {
      "id": "kedai-kita",
      "title": "Kedai Kita — dari kebun ke kaunter",
      "entries": [
        {"contender": "deepseek-v4-flash-high", "url": "/game/kedai-kita/deepseek-v4-flash-high/"}
      ]
    },
    {
      "id": "echo-garden",
      "title": "Echo Garden",
      "entries": [
        {"contender": "gpt-5-6-luna-max-codex", "url": "/game/echo-garden/gpt-5-6-luna-max-codex/"}
      ]
    },
    {
      "id": "empayar-sambal-bilis",
      "title": "Empayar Sambal Bilis — pengurusan dapur 3D",
      "entries": [
        {"contender": "deepseek-v4-flash-high", "url": "/game/empayar-sambal-bilis/deepseek-v4-flash-high/"},
        {"contender": "claude-opus-5-high-claude", "url": "/game/empayar-sambal-bilis/claude-opus-5-high-claude/"},
        {"contender": "gpt-5-6-sol-high-codex", "url": "/game/empayar-sambal-bilis/gpt-5-6-sol-high-codex/"},
        {"contender": "gpt-5-6-luna-max-codex", "url": "/game/empayar-sambal-bilis/gpt-5-6-luna-max-codex/"}
      ]
    },
    {
      "id": "lontar-kertas",
      "title": "Lontar Kertas — arcade 3D",
      "entries": [
        {"contender": "gpt-5-6-sol-ultra-codex", "url": "/game/lontar-kertas/gpt-5-6-sol-ultra-codex/"}
      ]
    }
  ]
};
