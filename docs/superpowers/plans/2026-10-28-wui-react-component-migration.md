# WUI React 6.1.0 implementation plan

Spec: `docs/superpowers/specs/2026-10-28-wui-react-component-migration-design.md`

## Global Constraints

- Inspect all 143 direct child directories of `src/components/stateless` and `src/components/stateful`; every directory must have a verifiable migrate/adapt/keep decision. Directory names do not prove reusability.
- Migrate every component that can be made independently consumable: no application runtime imports, fixed project/demo content, required global Tailwind/theme, unsafe render-time browser access, or untyped public props. Adapt reusable editor, chart, video and audio components even when they require new declared optional peer dependencies.
- Existing 12 default-export subpaths and root exports remain compatible. New components use named exports from grouped subpaths. The root entry must not require optional heavy peers.
- Keep the existing 250-file, 5 MiB packed, 15 MiB unpacked package gates. Redesign entry output rather than relaxing the budgets or omitting otherwise qualified components.
- Publish one stable package version `@w.ui/wui-react@6.1.0` through the `wui-react-v6.1.0` trusted publishing workflow, then verify npm `latest` and entry consumption. Do not claim publication before registry verification.
- Preserve the previously committed page-patterns work and the 6.0 component-story wording. Do not rewrite historical release notes or unrelated version ranges.

## Task 1: Audit all source components and freeze the migration roster

Create `docs/components/WUI_MIGRATION_AUDIT.md` with one row for each of the 143 source directories. For each, record current dependencies, whether it is generic or project-specific, required adaptation, destination group, and final decision. `keep in app` requires a concrete reason from the spec. Use the approved broad scope: adapt genuinely reusable components even when this needs new dependencies or removal of fixed demo data. Record the accepted roster as machine-readable data in `config/wui-migration-roster.json` so later tasks and checks can verify completeness. Keep the roster focused on direct directories; nested helpers move with their parent.

Verification: a new roster validation script confirms exactly 143 unique directory names and a decision/reason for each; `pnpm run check:docs` passes. Commit the audit, roster and validator.

## Task 2: Support grouped public entries without breaking existing subpaths

Extend `config/library-contract.mjs` with group entries for `layout`, `animation`, `data-display`, `forms`, `media`, `visualization`, `editor`, and `utilities`, adjusted only if Task 1 proves another grouping necessary. Preserve all existing component contract rows. Update Webpack/Vite library entry generation, finalization, package export validation, independent ESM/CJS smoke checks, package `exports`, and source directory validation for groups with named exports and no default. Create typed group entry files. Keep the root package entry limited to the existing 12 light/core exports; new grouped entries must be accessible by their subpaths. Include a targeted test that detects a missing group named export or wrong conditional export.

Verification: `pnpm run prepare:lib:release` and `pnpm exec cross-env BUILD_TOOL=vite pnpm run prepare:lib:release` pass with empty or initial groups, and existing 12 subpaths still resolve. Commit the infrastructure.

## Task 3: Migrate generic layout, form, utility and data-display components

Move every Task 1 roster item assigned to these groups into `packages/wui-react/src/<Group>/<Component>` with actual implementation and styles in the package. Remove fixed demo content from runtime and place examples in stories. Export typed props through each group entry; replace application use sites with the package source alias and keep thin compatibility forwarding only where needed. Include stateful candidates such as `CheckableTags` and `TreeList` if the audit marks them reusable, including their shared dependencies. Ensure CSS works without application Tailwind/theme. Add focused behavior tests for nontrivial interactions and test at least one independent package consumer of each group.

Verification: app and library typechecks, relevant unit tests, Storybook typecheck, and Webpack library release preparation pass. Commit the group migration.

## Task 4: Migrate reusable animation and visual effect components

Move every Task 1 animation roster item, including those using `motion` or `framer-motion`, into the package animation group. Declare any newly needed dependency or optional peer consistently in the contract and package manifest; do not make optional animation dependencies required by the core root entry. Convert application-only utility classes to package-owned styles, type public props, and verify cleanup for timers, pointer listeners and animation frames. Keep stories adjacent to the package source, and update application imports.

Verification: focused animation behavior/cleanup checks, Storybook typecheck, both library build tools, smoke and size gates. Commit the animation migration.

## Task 5: Migrate reusable visualization, editor and media components

Move every Task 1 roster item assigned to these groups, including reusable chart, markmap, mermaid, editor, image/video/audio and export components after removing application service imports and fixed demo assets. Use optional peer dependencies and group subpaths so a consumer needs a heavy runtime only for the group it imports. Preserve current application behavior through explicit adapters at application call sites. Ensure security-sensitive renderers retain content sanitization and safe defaults. Add targeted tests for data-driven APIs, resource cleanup and package consumer imports.

Verification: focused unit tests, app and Storybook typechecks, both app and library builds, ESM/CJS group smoke, package size and docs checks. Commit the heavy-module migration.

## Task 6: Final package documentation, integration and release

Reconcile the Task 1 roster against actual package implementations and exports; every migrate/adapt item must resolve from its group or have its decision corrected with evidence. Update `NPM_README.md`, package README source, component catalog/reference generation and publishing docs with all group entry paths and optional peer installation instructions. Set package version to `6.1.0` and update the lockfile. Run full `prepare:lib:release` with Webpack and Vite, Storybook checks, app quality gates, `npm pack --dry-run`, and relevant browser flows. Package a fixed tarball and review its file list. Commit final source and docs. Push the release source branch and exact `wui-react-v6.1.0` tag, follow the trusted publish workflow, then query npm for `6.1.0` and `latest`; if remote publication is blocked, report the specific condition and retain the verified tarball.

Verification: all release gates pass, remote workflow succeeds, npm registry confirms the version and dist-tag, and an independent consumer can import a new grouped export.

## Review Focus

- A component can compile in the monorepo while its published package still references an application alias, missing asset or undeclared peer.
- Grouping must preserve existing default exports and not pull optional heavy modules through the root entry.
- Converting fixed demo data to props can silently change Storybook and application behavior.
- CSS module and Tailwind conversion can pass typechecks but fail visual behavior or packed stylesheet checks.
- A successful local build or tag push does not prove npm publication; verify registry metadata and actual consumer imports.
