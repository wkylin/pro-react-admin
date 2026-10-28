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

Extend `config/library-contract.mjs` with group entries for `layout`, `animation`, `data-display`, `forms`, `media`, `visualization`, and `editor`, as frozen by Task 1. Preserve all existing component contract rows. Update Webpack/Vite library entry generation, finalization, package export validation, independent ESM/CJS smoke checks, package `exports`, and source directory validation for groups with named exports and no default. Create typed group entry files. Keep the root package entry limited to the existing 12 light/core exports; new grouped entries must be accessible by their subpaths. Design the type output for all 133 accepted source directories: bundle or otherwise consolidate group declarations so the eventual npm tarball remains below the existing 250-file gate without dropping public prop types. Include a targeted test that detects a missing group named export or wrong conditional export.

Verification: `pnpm run prepare:lib:release` and `pnpm exec cross-env BUILD_TOOL=vite pnpm run prepare:lib:release` pass with empty or initial groups, and existing 12 subpaths still resolve. Commit the infrastructure.

## Task 3: Migrate the layout group

Migrate all 15 roster items in `layout`: AboutSection, AlignCenter, AnimationTabs, AutoScrollSection, FeatureAny, FixTabs, Footer, HorizontalScroll, LinearWrap, MarketingHero, PageContainer, ScrollToTop, StickyCard, StickyFooter and TrapezoidTabs. Follow each roster adaptation, move implementation/styles/stories to `packages/wui-react/src/layout/<Component>`, expose typed named exports, replace application use sites with `@wui` source imports and retain thin legacy forwarders only where needed. Remove fixed demo content and app theme/router imports. Package utility-class styling. Add meaningful tests for interactive behavior and the independent layout group consumer.

Verification: relevant unit tests, app/lib/Storybook typechecks, Webpack release preparation, and `check:docs` pass. Commit the group migration.

## Task 4: Migrate the forms group

Migrate all nine roster items in `forms`: CheckableTags, DottedStepper, IntervalInput, LanguageSwitcher, PromptOptimizer, RadioInput, ReactSignature, SmartChat and StarRating. Apply every item-specific adaptation, type props/events/refs, replace app context, i18n and feedback dependencies with public props or package-local behavior, and ensure accessible keyboard interaction. Move source/styles/stories to the package forms group and update app imports/forwarders. Declare newly required optional peers at the group entry, leaving the root light. Add behavior tests for stateful form controls and request/stream cleanup.

Verification: focused tests, app/lib/Storybook typechecks, Webpack release preparation and independent group consumer pass. Commit the forms migration.

## Task 5: Migrate the data-display group

Migrate all 21 roster items in `data-display`: TreeList, ApiStateHandler, AutoLink, AvatarCard, ClockFace, ContentPlaceholder, CopyToClipboard, Exception, GradientStats, Loading, NumberViewCard, PDFExport, SkeletonFix, StaticStepper, StatisticCard, SvgPreview, TagCard, TextComponent, TransferHistory, UserIP and Watermark. Apply the audit's item-specific extraction, including replacing old component imports, app navigation/feedback/theme and fixed network/demo data. Keep PDF/export/SVG handling safe, type public props, package styles and update app call sites. Add targeted tests for async tree/network lifecycle, SVG/PDF security behavior and public data props.

Verification: focused tests, app/lib/Storybook typechecks, Webpack release preparation and group consumer pass. Commit the data-display migration.

## Task 6: Migrate animation group A

Migrate the first 20 animation roster items: AlternatingText, AnimatedList, AnimateOnScreen, AnimateRipple, AnimateWave, AnimBackground, AnimGroup, AnimInView, AnimText, BackgroundBeams, BackgroundBoxes, BlurFade, BlurText, BorderBeam, BreatheText, ColorfulText, ContactSection, CubeSpinner, DynamicBackground and FlipLink. Follow per-item adaptations for typed props, package styles, optional motion/spring peers and cleanup. Move source and stories into the package animation group, update app imports and group exports without touching later animation items.

Verification: focused interaction/cleanup tests, app/lib/Storybook typechecks, Webpack release preparation and group consumer pass. Commit this batch.

## Task 7: Migrate animation group B

Migrate the next 20 animation roster items: FlipWords, FloatAny, FloatingIcon, GradientAnimation, GradientTracking, GradualSpacing, InteractiveGrid, IsometricCard, LineBordered, MagicTrail, MemoizedStars, MeshGradientBackground, Meteors, MouseTrail, MultiColorBorder, MultiDirectionSlide, OrbitingCircles, PointerMove, ScratchToReveal and ScrollAnimation. Follow roster adaptations, package styles/dependencies, type public props, keep timer/RAF/listener cleanup and update app imports and stories.

Verification: focused interaction/cleanup tests, app/lib/Storybook typechecks, Webpack release preparation and group consumer pass. Commit this batch.

## Task 8: Migrate animation group C

Migrate the final 20 animation roster items: ScrollVelocity, ShiftingCard, ShinyText, ShootingStars, SlideButton, SlideLinear, SlideText, Sparkles, SparklesText, Spotlight, SquaresGrid, StarBackground, TagCloud, TextClip, TextLoader, TextReveal, ThreeDCard, TypedText, TypeWriter and WordRotate. Follow roster adaptations, package styles/dependencies, type public props, preserve accessible text/keyboard behavior and lifecycle cleanup, and update app imports and stories.

Verification: focused interaction/cleanup tests, app/lib/Storybook typechecks, both library build tools, smoke and size gates. Commit this batch.

## Task 9: Migrate the media group

Migrate all 12 media roster items: AutoSlider, CompareAll, FixCarouse, FixMusicPlayer, InteractiveBook, LazyLoadImage, LogoSlider, MusicPlayer, SmartVideoPlayer, SoundBar, TestimonialCarousel and Video. Move fixed audio/images/tracks to stories, expose caller data and labels as typed props, isolate optional media peers, and preserve audio/video/player/RAF/observer disposal. Keep application adapters and document required media CSS. Move source/styles/stories into the package group and update imports.

Verification: focused media and book-engine tests, app/lib/Storybook typechecks, both library build tools, smoke and size gates. Commit the media migration.

## Task 10: Migrate the visualization group

Migrate all nine visualization roster items: markmap, mermaidHooks, DonutCharts, EChart, EChartsCommon, IconCloud, OrgChart, PHBarChart and PieNestCharts. Move fixed datasets/maps and theme hooks to stories/app adapters, expose typed data/config props, isolate optional diagram/chart peers, sanitize externally supplied SVG/HTML, and preserve renderer/observer cleanup. Move source/styles/stories and update app imports.

Verification: focused visualizer behavior/security tests, app/lib/Storybook typechecks, both library builds, smoke and size gates. Commit the visualization migration.

## Task 11: Migrate the editor group

Migrate all seven editor roster items: AdvancedCodeBlock, CodeHighlighter, MdxEditor, ReMarkdown, SandpackBasic, ScriptView and ShiCode. Move app theme/feedback/clipboard integrations to props or package-local behavior, expose typed value/change/render APIs, maintain safe Markdown/HTML handling and document optional editor/highlighter peers. Move source/styles/stories, update app imports and preserve existing editor behavior through focused tests.

Verification: focused editor/Markdown tests, app/lib/Storybook typechecks, both library builds, smoke and size gates. Commit the editor migration.

## Task 12: Final package documentation, integration and release

Reconcile the Task 1 roster against actual package implementations and exports; every migrate/adapt item must resolve from its group or have its decision corrected with evidence. Update `NPM_README.md`, package README source, component catalog/reference generation and publishing docs with all group entry paths and optional peer installation instructions. Set package version to `6.1.0` and update the lockfile. Run full `prepare:lib:release` with Webpack and Vite, Storybook checks, app quality gates, `npm pack --dry-run`, and relevant browser flows. Package a fixed tarball and review its file list. Commit final source and docs. Push the release source branch and exact `wui-react-v6.1.0` tag, follow the trusted publish workflow, then query npm for `6.1.0` and `latest`; if remote publication is blocked, report the specific condition and retain the verified tarball.

Verification: all release gates pass, remote workflow succeeds, npm registry confirms the version and dist-tag, and an independent consumer can import a new grouped export.

## Review Focus

- A component can compile in the monorepo while its published package still references an application alias, missing asset or undeclared peer.
- Grouping must preserve existing default exports and not pull optional heavy modules through the root entry.
- Converting fixed demo data to props can silently change Storybook and application behavior.
- CSS module and Tailwind conversion can pass typechecks but fail visual behavior or packed stylesheet checks.
- A successful local build or tag push does not prove npm publication; verify registry metadata and actual consumer imports.
