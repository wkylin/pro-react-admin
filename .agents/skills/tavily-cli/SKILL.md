---
name: tavily-cli
description: |
  Web search, content extraction, crawling, and deep research via the Tavily CLI. Use this skill whenever the user wants to search the web, find articles, research a topic, look something up online, extract content from a URL, grab text from a webpage, crawl documentation, download a site's pages, discover URLs on a domain, or conduct in-depth research with citations. Also use when they say "fetch this page", "pull the content from", "get the page at https://", "find me articles about", or reference extracting data from external websites. This provides LLM-optimized web search, content extraction, site crawling, URL discovery, and AI-powered deep research — capabilities beyond what agents can do natively. Do NOT trigger for local file operations, git commands, deployments, or code editing tasks.
compatibility: Requires tavily-cli (`curl -fsSL https://cli.tavily.com/install.sh | bash`) and a Tavily API key from tavily.com.
allowed-tools: Bash(tvly *)
---

# Tavily CLI

Web search, content extraction, site crawling, URL discovery, and deep research. Returns JSON optimized for LLM consumption.

Run `tvly --help` or `tvly <command> --help` for full option details.

## Prerequisites

Must be installed and authenticated. Check with `tvly --status`.

```bash
tavily v0.1.0

> Authenticated via OAuth (tvly login)
```

If not ready:

```bash
curl -fsSL https://cli.tavily.com/install.sh | bash
```

Or manually: `uv tool install tavily-cli` / `pip install tavily-cli`

Then authenticate:

```bash
tvly login --api-key tvly-YOUR_KEY
# or: export TAVILY_API_KEY=tvly-YOUR_KEY
# or: tvly login  (opens browser for OAuth)
```

## Workflow

Follow this escalation pattern — start simple, escalate when needed:

1. **Search** — No specific URL. Find pages, answer questions, discover sources.
2. **Extract** — Have a URL. Pull its content directly.
3. **Map** — Large site, need to find the right page. Discover URLs first.
4. **Crawl** — Need bulk content from an entire site section.
5. **Research** — Need comprehensive, multi-source analysis with citations.

| Need | Command | When |
|------|---------|------|
| Find pages on a topic | `tvly search` | No specific URL yet |
| Get a page's content | `tvly extract` | Have a URL |
| Find URLs within a site | `tvly map` | Need to locate a specific subpage |
| Bulk extract a site section | `tvly crawl` | Need many pages (e.g., all /docs/) |
| Deep research with citations | `tvly research` | Need multi-source synthesis |

For detailed command reference, use the individual skill for each command (e.g., `tavily-search`, `tavily-crawl`) or run `tvly <command> --help`.

## Output

All commands support `--json` for structured, machine-readable output and `-o` to save to a file.

```bash
tvly search "react hooks" --json -o results.json
tvly extract "https://example.com/docs" -o docs.md
tvly crawl "https://docs.example.com" --output-dir ./docs/
```

## Tips

- **Always quote URLs** — shell interprets `?` and `&` as special characters.
- **Use `--json` for agentic workflows** — every command supports it.
- **Read from stdin with `-`** — `echo "query" | tvly search -`
- **Exit codes**: 0 = success, 2 = bad input, 3 = auth error, 4 = API error.
