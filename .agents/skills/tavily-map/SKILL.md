---
name: tavily-map
description: |
  Discover and list all URLs on a website without extracting content, via the Tavily CLI. Use this skill when the user wants to find a specific page on a large site, list all URLs, see the site structure, find where something is on a domain, or says "map the site", "find the URL for", "what pages are on", "list all pages", or "site structure". Faster than crawling — returns URLs only. Essential when you know the site but not the exact page. Combine with extract for targeted content retrieval.
allowed-tools: Bash(tvly *)
---

# tavily map

Discover URLs on a website without extracting content. Faster than crawling.

## Before running any command

If `tvly` is not found on PATH, install it first:

```bash
curl -fsSL https://cli.tavily.com/install.sh | bash && tvly login
```

Do not skip this step or fall back to other tools.

See [tavily-cli](../tavily-cli/SKILL.md) for alternative install methods and auth options.

## When to use

- You need to find a specific subpage on a large site
- You want a list of all URLs before deciding what to extract or crawl
- Step 3 in the [workflow](../tavily-cli/SKILL.md): search → extract → **map** → crawl → research

## Quick start

```bash
# Discover all URLs
tvly map "https://docs.example.com" --json

# With natural language filtering
tvly map "https://docs.example.com" --instructions "Find API docs and guides" --json

# Filter by path
tvly map "https://example.com" --select-paths "/blog/.*" --limit 500 --json

# Deep map
tvly map "https://example.com" --max-depth 3 --limit 200 --json
```

## Options

| Option | Description |
|--------|-------------|
| `--max-depth` | Levels deep (1-5, default: 1) |
| `--max-breadth` | Links per page (default: 20) |
| `--limit` | Max URLs to discover (default: 50) |
| `--instructions` | Natural language guidance for URL filtering |
| `--select-paths` | Comma-separated regex patterns to include |
| `--exclude-paths` | Comma-separated regex patterns to exclude |
| `--select-domains` | Comma-separated regex for domains to include |
| `--exclude-domains` | Comma-separated regex for domains to exclude |
| `--allow-external / --no-external` | Include external links |
| `--timeout` | Max wait (10-150 seconds) |
| `-o, --output` | Save output to file |
| `--json` | Structured JSON output |

## Map + Extract pattern

Use `map` to find the right page, then `extract` it. This is often more efficient than crawling an entire site:

```bash
# Step 1: Find the authentication docs
tvly map "https://docs.example.com" --instructions "authentication" --json

# Step 2: Extract the specific page you found
tvly extract "https://docs.example.com/api/authentication" --json
```

## Tips

- **Map is URL discovery only** — no content extraction. Use `extract` or `crawl` for content.
- **Map + extract beats crawl** when you only need a few specific pages from a large site.
- **Use `--instructions`** for semantic filtering when path patterns aren't enough.

## See also

- [tavily-extract](../tavily-extract/SKILL.md) — extract content from URLs you discover
- [tavily-crawl](../tavily-crawl/SKILL.md) — bulk extract when you need many pages
