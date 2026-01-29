---
title: Fixing Storybook MDX runtime: “does not provide an export named 'ArgsTable'”
description: "A minimal compatibility re-export in Storybook's blocks entry fixes an MDX runtime error caused by Vite pre-bundling renaming exports."
tags: [Storybook, Vite, MDX, debugging, frontend]
medium_tags: [Storybook, Vite, MDX, debugging, frontend]
date: 2026-01-29
author: "wkylin"
cover: /docs/static/images/storybook-argstable-cover-en.png
og_image: /docs/static/images/storybook-argstable-cover-en.png
canonical: "https://your-domain.example/blog/fix-storybook-argstable-en"
---

# Fixing Storybook MDX runtime: “does not provide an export named 'ArgsTable'” — diagnosis, tests, and PR 🐞➡️✅

TL;DR: Vite pre-bundling can rename or remap named exports (e.g., `ArgsTable` → `PureArgsTable`) causing MDX imports to fail at runtime. I implemented a minimal compatibility re-export in the `blocks` entry and added tests; PR: https://github.com/storybookjs/storybook/pull/33702.

---

## Background

A Storybook MDX file importing `ArgsTable` from `@storybook/addon-docs/blocks` started failing at runtime with:

> The requested module '.../blocks.js' does not provide an export named 'ArgsTable'

This error appeared in environments where Vite had pre-bundled dependencies (optimizeDeps), and the generated `blocks` module exposed `PureArgsTable` but not the named `ArgsTable`.

## Investigation

- Reproduced the runtime error locally while running Storybook with Vite.
- Inspected the pre-bundled artifact in `.vite-cache/storybook/deps/` and confirmed `ArgsTable` missing and `PureArgsTable` present.
- Considered two mitigation approaches:
  1. Local shim + `optimizeDeps.exclude` workaround (short-term, used in our repo);
  2. Upstream fix: ensure `blocks` exports the named symbol `ArgsTable`.

## Implemented fix

Minimal, non-breaking change to `code/addons/docs/src/blocks.ts`:

```diff
-export { ArgsTable as PureArgsTable } from './blocks/components/ArgsTable/ArgsTable';
+export { ArgsTable as PureArgsTable } from './blocks/components/ArgsTable/ArgsTable';
+// Compatibility re-export so `ArgsTable` remains available as a named export
+export { ArgsTable } from './blocks/components/ArgsTable/ArgsTable';
```

Plus unit test at `code/addons/docs/src/__tests__/blocks.test.ts`:

```ts
import * as blocks from '../blocks';

describe('blocks module compatibility exports', () => {
  test('exports ArgsTable', () => expect(blocks.ArgsTable).toBeDefined());
  test('ArgsTable equals PureArgsTable', () => expect(blocks.ArgsTable).toBe(blocks.PureArgsTable));
});
```

## How to verify locally

- Run the added test:

```bash
npm run test:jest -- code/addons/docs/src/__tests__/blocks.test.ts
```

- Start Storybook and verify MDX pages load normally:

```bash
npm run storybook
# open http://localhost:6006
```

## Alternatives & notes

- Short-term: local `ArgsTable` shim that renders explicit rows and adding `@storybook/addon-docs` to `optimizeDeps.exclude` to avoid the pre-bundling changes.
- Long-term: adjust package `exports` map or build pipeline to guarantee stable named exports.

## Links

- Issue: https://github.com/storybookjs/storybook/issues/33691
- PR: https://github.com/storybookjs/storybook/pull/33702

---

## Screenshots & GIFs (suggestions and placeholders) 🖼️🎞️

Suggested assets to include in the post:

- Cover image (Medium: recommended 1200×630px; Juejin: 900×500px), place as `docs/static/images/storybook-argstable-cover-en.png`.
- Page screenshot: `docs/static/images/storybook-argstable-screenshot.png` (full page or key area).
- Short GIF: `docs/static/images/storybook-argstable.gif` (3-5s clip).

A `docs/static/images/README.md` is included with guidance and a small Playwright script to capture screenshots/videos automatically.

## Detailed reproduction steps (step-by-step) 🧭

1. Remove Storybook Vite pre-bundle cache (to reproduce the pre-bundling behavior):

```bash
rm -rf .vite-cache/storybook
```

2. Add a minimal MDX file that imports `ArgsTable`:

```md
---
name: ArgsTable demo
---

import { ArgsTable } from '@storybook/addon-docs/blocks'

# Demo

<ArgsTable of={SomeComponent} />
```

3. Start Storybook and observe the runtime error:

```bash
npm run storybook
```

You should see an error similar to:

> The requested module '.../blocks.js' does not provide an export named 'ArgsTable'

4. Inspect the pre-bundled artifact to confirm the presence of `PureArgsTable` and absence of `ArgsTable`:

```bash
grep -n "PureArgsTable\|ArgsTable" .vite-cache/storybook/deps/* || true
```

5. Run the added unit test to verify the fix:

```bash
npm run test:jest -- code/addons/docs/src/__tests__/blocks.test.ts
```

## How to capture screenshots / generate GIFs (scripted) 🛠️

Use the included `scripts/capture-storybook.js` (Playwright) to:

- navigate to a Storybook page and save `docs/static/images/storybook-argstable-screenshot.png`;
- record a short webm to `docs/static/images/video/` (convert to GIF with ffmpeg if desired).

Quick commands:

```bash
npm run storybook
STORYBOOK_URL=http://localhost:6006 STORY_PATH='/?path=/story/your--story' node scripts/capture-storybook.js
./scripts/convert-webm-to-gif.sh docs/static/images/video/latest.webm docs/static/images/storybook-argstable.gif
```

---

If you'd like, I can run the capture script locally and commit the images to the repo (I will need permission to run Storybook in your environment).
