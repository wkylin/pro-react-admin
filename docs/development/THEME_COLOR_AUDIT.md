# Theme color audit and migration

Date: 2026-11-07

## Root cause

The home page CTA mismatch did not come from AntD failing to apply the configured primary color. In the browser, the AntD link hover token matched the configured blue; the home page `Link` used a local green `#17654e` background and had no paired hover foreground, so the generic anchor hover color won.

The wider consistency issue came from multiple color sources: runtime values in `src/theme/palette.ts`, different static values in `src/styles/reset.css`, legacy `src/theme/light.ts` / `dark.ts` values, and package styles that used older custom-property names such as `--wui-primary` or `--wui-bg-container`.

## Canonical theme contract

- `src/theme/tokens.json` stores the light/dark foundations, default configurable primary, and brand-action seed.
- `src/theme/palette.ts` derives theme-aware primary, brand-action, status, selection, and contrast roles.
- `src/theme/createTheme.ts` maps those roles to AntD ConfigProvider tokens.
- `scripts/generate-theme-token-css.mjs` generates static CSS fallbacks; `pnpm run check:theme-tokens` detects drift.
- `src/styles/action-links.css` provides theme-primary, brand, and secondary action-link states for normal, hover, active, and keyboard focus.

Add a static color to `tokens.json`; add its runtime role mapping in `palette.ts`; add an AntD mapping in `createTheme.ts` when AntD has a corresponding semantic token. Regenerate CSS defaults with `pnpm run generate:theme-tokens` and keep `pnpm run check:theme-tokens` passing.

## Migrated surfaces

| Area            | Adaptation                                                                                                                                                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home CTA        | The green navigation and hero actions use the brand-action role; secondary links use the shared secondary variant.                                                                                                                                               |
| Access preview  | Primary and secondary links use the same shared state contract, including hover foreground and focus ring.                                                                                                                                                       |
| AntD theme      | Configurable primary, links, status foreground/background/borders, and selection use shared palette derivation.                                                                                                                                                  |
| Global search   | Modal, row selection, input, metadata, keyboard hints, and result highlights consume current AntD tokens instead of separate `isDark` color tables.                                                                                                              |
| Shared controls | SliderCaptcha, MoveChecker, AnimationTabs, and TextComponent use canonical surface, primary, selection, and status variables; stale `--wui-primary`, `--wui-text`, `--wui-bg-container`, and `--wui-fill-secondary` references were removed from these controls. |
| Navigation      | ProSider uses generated semantic surface/border variables when present; dark-header mobile icons use the dark navigation text role.                                                                                                                              |

## Fixed colors intentionally retained

The audit found approximately 2,748 color-literal matches and 688 custom `--wui-*` variable uses across `src` and `packages/wui-react/src`. The literal count includes examples, visualizations, and component skins, so it is not a target for mechanical replacement.

- Tracking chart series, map palettes, and status-coded visualization categories represent data and remain fixed.
- InteractiveBook, music/video, virtual-keyboard, code-highlighting, and illustration colors are authored content skins; theme-sensitive text and controls around them use semantic roles.
- `packages/wui-react/src/layout/layout.module.less` exposes `--wui-card-*`, `--wui-hero-*`, and `--wui-footer-*` customization variables for branded content layouts; those are component customization hooks, not global application surfaces.
- SettingDrawer swatches are the selectable primary-color choices and remain a deliberate fixed palette.
- Reusable WUI components retain fallback values where they may render outside `ProThemeProvider`. In the admin application, canonical variables take precedence.

## Browser verification

Verified the Vite app with `agent-browser` on `#/overview` and `#/preview/access` at desktop and narrow viewports.

- The light home CTA keeps its green foreground/background pairing through hover (`#145945`), active (`#114d3b`), and keyboard focus. The dark home CTA uses a lighter green (`#94b8ad`) with black text; hover and active states stay paired.
- The default light primary action resolves to `#115eca`; its hover and active backgrounds remain paired with white text. The default dark primary resolves to `#7cb2ff`.
- With a temporary dark-mode primary of `#F5222D`, the runtime primary resolved to `#fa9398`, and the AntD selected tab and primary action updated with it. The brand action stayed `#94b8ad`. The primary action retained black text and distinct hover (`#fba0a4`), active (`#fbadb1`), and focus-ring states. An ordinary footer link also followed the configured AntD link hover color.
- At 1440×1000, the access preview's internal `main` scroller was 1235px tall and scrolled to its bottom. At 390×844, it was 1846px tall and the wheel reached the bottom; the document stayed 390px wide. The wide table scrolls inside its own 680px content area instead of widening the document.
- The first browser load exposed a Vite/PostCSS resolution error when the generated token stylesheet was imported from inside `reset.css`. Importing it directly from `theme.tsx` fixed the 500 response and restored the app.
- The named browser session's theme preference was restored to light with the default `#1677ff` primary before closing it.

The protected admin shell and chart/media routes were not visually exercised: the local demo login remained disabled until its slider challenge was completed, so the challenge was not bypassed. Source review confirms that `ProLayout` still selects dark navigation independently when the content theme is light; the chart/media palettes were retained as authored content. The primary AntD link and selected-tab tokens were checked in the public preview, but an enabled AntD primary button in the protected shell was not browser-verified.

## Review boundary

When a remaining literal belongs to an application surface, action, selected/focused state, or feedback message, move it to a semantic role. When it is part of authored content, a data series, or an explicit component skin, keep it local and document the reason. Never add a second light/dark palette to a page stylesheet.
