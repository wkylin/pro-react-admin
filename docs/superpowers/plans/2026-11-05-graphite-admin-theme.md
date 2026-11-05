# Graphite Admin Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved graphite theme across AntD, application chrome, and representative pages while preserving existing behavior.

**Architecture:** A shared semantic palette feeds AntD component tokens and the existing page CSS variables. The existing provider retains preference persistence; a feedback bridge inside the themed AntD App gives transient UI the same context. Layout and page styles consume the palette rather than defining independent dark colors.

**Tech Stack:** React 19, Ant Design 6, TypeScript 6, Less modules, Vite 8, pnpm 12; Node 24.

**Spec:** [Approved graphite theme design](../specs/2026-11-05-graphite-admin-theme-design.md). The user approved the design and requested direct implementation in this session; execution is Native without another confirmation round.

## Global Constraints

- Keep React, AntD, existing routes, permissions, login, CRUD, API calls, and i18n contracts.
- Preserve Chrome tabs and KeepAlive; breadcrumb single-line height 40px; content outer padding 0.
- Preserve sider widths 208px / 80px and menu inline indentation 8px.
- Main Header 56px; default controls 36px; compact setting remains functional.
- Dark canvas `#181818`, surface `#1f1f1f`, elevated `#272727`, border `#313131`.
- Text contrast at least 4.5:1; meaningful controls and focus at least 3:1.
- Preserve existing dirty files and incorporate earlier UI refinements; do not push unless requested.

## Review Focus

1. Independent dark navigation on a light page must use the dark palette without making page controls dark — Task 2 browser check.
2. White, black, green, and blue custom primary colors must retain readable text and distinguishable states — Task 1 palette tests.
3. Message / notification / confirmation portals must inherit the current theme — Task 2 context check and Task 4 browser coverage.
4. Cached tabs and forms must survive a theme toggle — Task 4 browser regression.
5. Narrow screens, compact density, and long menu labels must retain scrolling and operable controls — Tasks 3 and 4 checks.

---

### Task 1: Shared palette, typed AntD configuration, local font

**Files:** Create `src/theme/palette.ts`, `src/theme/createTheme.ts`, `src/theme/createTheme.test.ts`. Modify `src/theme/contrast.ts`, `src/theme/hooks.tsx`, `src/styles/reset.css`, `package.json`, `pnpm-lock.yaml`.

**Interfaces:**

- `ThemeAppearance = 'light' | 'dark'`.
- `getThemePalette(mode: ThemeAppearance): ThemePalette` exposes canvas, surface, elevated, border, text, secondary, muted, hover and semantic status roles.
- `getThemeVariables(mode: ThemeAppearance, primary: string): Record<string, string>` supplies existing `--wui-*` variables, including `--wui-bg-base`, `--wui-color-primary` and the legacy foreground/background aliases.
- `createAdminTheme(settings: Pick<ThemeSettings, 'colorPrimary' | 'compactAlgorithm'>, mode: ThemeAppearance): ThemeConfig` produces the typed ConfigProvider configuration.

- [x] Add tests named `shares palette roles with CSS variables and AntD surfaces`, `keeps custom accents readable on real surfaces`, `distinguishes hover and active states`, and `keeps compact density and dark navigation independent`.
- [x] Run `pnpm run test:jest --runInBand --runTestsByPath src/theme/createTheme.test.ts`; confirm the missing module makes the test fail before implementation.
- [x] Implement the palette, CSS variable mapping and typed configuration. Use installed AntD token types to validate component properties. Apply the approved layers, semantic statuses, 8px / 12px radii and default / compact control sizes.
- [x] Retain public contrast helpers and their existing cases; expose the smallest color-mixing utility needed for differentiated states. Base dark accent readability on the elevated surface as well as the page.
- [x] Install the verified `@fontsource-variable/geist@5.3.0` font package. Import only the Latin variable CSS / asset needed for the app; preserve Chinese system fallbacks and document the OFL-1.1 license source.
- [x] Publish variables in the existing provider before exposing the new theme; retain CSS initial fallback behavior and mode persistence. Remove competing actual-runtime color sources.
- [x] Run new tests plus `src/theme/contrast.test.ts`; verify light/dark, green/blue/black/white custom colors and compact sizes.
- [x] Record the deliverable checkpoint without staging unrelated work.

### Task 2: Theme integration, feedback scope and application chrome

**Files:** Modify `src/theme.tsx`, add `src/theme/ThemeFeedback.tsx`, and update `src/app/layouts/proHeader/index.tsx`, `proHeader/index.module.less`, `proSecNav/index.tsx`, `proSecNav/index.module.less`, `proSider/index.module.less`, `proTabs/index.tsx` and, if required, `proTabs/index.module.less`.

**Interfaces:** Consumes Task 1 exports. `ThemeFeedback(): React.ReactNode` binds the existing message adapter to an AntD App inside the configured theme.

- [ ] Replace ad hoc configuration in `ThemeIndex` with `createAdminTheme`; retain language, prefixes, compact setting, and stable router creation.
- [ ] Place a themed App / feedback bridge beneath ConfigProvider. Preserve renderApp's outer provider for consumers outside ThemeIndex; size the inner app root correctly.
- [ ] Apply 56px main Header and matching horizontal-menu dimensions, quieter toolbar borders and theme-aware hover / focus.
- [ ] Remove inline selected colors in ProSecNav so component tokens control foreground / background. Retain translated labels, preloading, access checks, tooltip labels, open keys and 8px indentation.
- [ ] Replace navy-specific header / sider fallbacks with semantic navigation values. Keep the independently dark navigation option readable on a light page.
- [ ] Make rail / selected tab / content surfaces coherent without changing tab action placement, event handlers or caching.
- [ ] Verify in the browser: expanded and collapsed menus; four nested levels; top navigation; light page + dark nav; refresh / close / overflow tab actions; message and confirmation theme context.
- [ ] Run typecheck and changed-file lint. Record the deliverable checkpoint.

### Task 3: Page surfaces and component consistency

**Files:** Modify `src/pages/deploymentGuide/index.module.less`, `src/features/administration/pages/workspace.module.less`, `src/features/pagePatterns/pages/patterns.module.less`, `src/shared/ui/FixTabPanel/FixTabPanel.tsx`; add font CSS import at the app theme boundary. Change other representative page colors only when actual checks show a mismatch.

**Interfaces:** Existing CSS `--wui-*` roles from Task 1. FixTabPanel continues accepting explicit `scrollProgressProps` overrides.

- [ ] Replace deployment-guide fixed foregrounds / light fallbacks with shared semantic roles, including code blocks, tables and platform cards.
- [ ] Apply the approved title / body hierarchy and balanced spacing to shared management and pattern shells. Preserve field labels, values, notices, actions and responsive table behavior.
- [ ] Keep FixTabPanel inner padding 0; default its progress line to the accessible primary CSS variable while allowing explicit caller colors.
- [ ] Validate dark/light users table and modal, basic and step forms, guide cards / code / tables, Select and DatePicker popups; include 390px and 440px widths.
- [ ] Verify compact density and long menu labels after the font has loaded, including fallback text and Chinese names.
- [ ] Run relevant lint, type checks and progress-bar / existing palette tests; regenerate the component catalog if shared UI metadata changes.
- [ ] Record the deliverable checkpoint.

### Task 4: Regression and visual evidence

**Files:** Create `tests/e2e/theme.spec.ts`; update the implementation plan checklist and project-generated docs as required.

**Interfaces:** Existing demo login fixture (`admin@test.com` / `super_admin` local test storage), theme controls, actual roles / labels and computed-style assertions.

- [ ] Add a browser test that switches theme with a filled form / cached tab and confirms the draft and route are preserved.
- [ ] Add a browser test that checks the guide's actual background / text contrast and an open dropdown / modal after switching themes; do not rely on class-name snapshots.
- [ ] Cover independently dark nav, custom primary and compact setting through the existing Preferences UI. Include 390px / 440px checks for horizontal overflow and reachable controls.
- [ ] Run `pnpm run typecheck`, targeted Jest, changed-file lint, `pnpm run test:e2e:typecheck`, and `SENTRY_SOURCE_MAP=no pnpm run build:vite`.
- [ ] Run `pnpm run test:e2e:vite theme.spec.ts route-tabs.spec.ts page-patterns.spec.ts authorized-access.spec.ts --workers=2` against the final build.
- [ ] Inspect actual screenshots for users, an overlay, the basic form, the guide and mobile navigation in both themes. Attribute failures accurately and fix regressions before delivery.
- [ ] Run `git diff --check`, review final changes against the approved spec, and obtain one fresh whole-change review as required by Native execution.
- [ ] Report changed behavior, actual checks and local preview URL. Keep remote publication outside this task.
