# Storybook Media and Preview Implementation Plan

**Goal:** Repair the five Storybook preview and documentation issues shown in the user's screenshots.

**Architecture:** Keep the existing Storybook 10 Docs layout. Fix source snippets in the shared preview, use local scroll containers for scroll driven examples, restore FeatureAny progress from the same timer as autoplay, and expose one MusicPlayer.

**Tech Stack:** React, TypeScript, Less modules, Storybook 10, Jest, Playwright.

**Spec:** User request on 2026-10-29 with four screenshots and five numbered changes.

## Constraints

- Preserve the detailed MDX pages and remove the retired player export.
- Keep the app's existing theme, media cleanup, keep alive behavior, and browser autoplay handling.
- Use local media for the Storybook player demonstration.

## Tasks

### 1. Documentation layout and source

- [x] Correct PieNestCharts' malformed outer label formatter and provide a readable hover tip within the chart.
- [x] Rework `.storybook/preview.css` guide cards into two responsive columns with the caution card spanning the row; verify no horizontal overflow at narrow viewport widths.
- [x] Add shared source snippet generation to `.storybook/preview.tsx` so Docs Canvas panels display copyable JSX for every story, while respecting authored snippets.
- [x] Add a clear source section to automatic Docs, and verify manual MDX Canvas panels still expose code.

### 2. Scroll preview and FeatureAny

- [x] Put the ContactSection demo in a fixed height scroll container and pass its ref to the component; verify window scrolling does not drive the demonstration.
- [x] Replace FeatureAny's constant zero progress with time based progress that resets on automatic and manual selection; verify timer cleanup, progress and selection.

### 3. Unified MusicPlayer

- [x] Build one responsive player surface in `packages/wui-react/src/media/MusicPlayer` with cover art, metadata, elapsed and total time, icon controls, volume, queue and optional dismissal.
- [x] Delete the old player component and export, point the app music page at MusicPlayer, and use local tracks in Storybook.
- [x] Remove the duplicate player Storybook entry and update Storybook validation, guides and generated props to represent one component.
- [x] Verify media behavior tests, types, Storybook build, source panel content and desktop/mobile previews.
