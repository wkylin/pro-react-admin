# MusicPlayer Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate the player and playlist visually and offer three appearance styles while retaining one MusicPlayer API.

**Architecture:** Keep audio state in `index.tsx`, render sibling playing and playlist regions, and drive palettes and composition with CSS module data attributes. Preserve `variant` behavior and add `appearance` for visual styles.

**Tech Stack:** React 19, TypeScript, Less modules, Storybook, Jest.

**Spec:** `docs/superpowers/specs/2026-10-29-music-player-layout-design.md`

## Global Constraints

- Keep `MusicPlayer` as the only player entry and preserve all current playback controls and callbacks.
- Keep `variant="studio" | "compact"`, `theme`, and labels usable by existing consumers.
- Use existing local audio and artwork in Storybook examples.

## Review Focus

- Empty tracks: the player should show an empty message without breaking the queue structure.
- Compact mode: the queue should start closed and expand on request.
- Narrow canvas: controls and queue should remain visible without horizontal scrolling.
- Dark host theme: editorial and minimal palettes should retain readable contrast.
- Switching tracks: active selection and audio source should continue to update together.

---

### Task 1: Separate the two regions and keep behavior

**Files:** `packages/wui-react/src/media/MusicPlayer/index.tsx`, `packages/wui-react/src/media/media.test.tsx`

- [x] Add a named playlist region as a sibling of the playing surface, with an `appearance` prop typed as `editorial | console | minimal`.
- [x] Add a focused test for region separation, style selection, and compact queue expansion.
- [x] Run the media Jest tests and keep existing playback tests green.

### Task 2: Build the three visual directions

**Files:** `packages/wui-react/src/media/MusicPlayer/index.module.less`

- [x] Replace the shared card with a responsive page-like split layout.
- [x] Give editorial, console, and minimal their own palettes, artwork treatment, and control styling.
- [x] Check desktop and narrow screenshots for overflow, legibility, and visual hierarchy.

### Task 3: Expose and document the styles

**Files:** `packages/wui-react/src/media/MusicPlayer/MusicPlayer.stories.tsx`, `.storybook/prop-meanings.mjs`, `.storybook/component-docs.json`, `.storybook/component-cautions.json`, `.storybook/component-props.generated.json`

- [x] Add Storybook entries and source snippets for each appearance and compact mode.
- [x] Explain appearance and layout props and update usage guidance.
- [x] Regenerate props, typecheck, build Storybook, and inspect the rendered stories.
