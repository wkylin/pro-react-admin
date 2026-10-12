# 组件与源码清单

> 本文由 `pnpm run generate:component-catalog` 生成。统计按目录与入口文件计算，不等同于 AST 识别出的 React 函数组件数量；新增、移动或删除模块后重新生成。

## 工程规模

| 指标                          | 数量 | 统计口径                                                            |
| ----------------------------- | ---: | ------------------------------------------------------------------- |
| `src/` 文件                   |  849 | 包含源码、样式、资源与配置文件                                      |
| TS/JS 源文件                  |  679 | `.ts/.tsx/.js/.jsx` 等源码扩展名                                    |
| `packages/wui-react/src` 文件 |   51 | 组件库源码、stories 与组件文档                                      |
| 组件库 TS/JS 源文件           |   39 | 组件库自身源码，不含 MDX                                            |
| 样式文件                      |   91 | Less、CSS、SCSS                                                     |
| CSS Modules                   |   85 | 文件名含 `.module.`                                                 |
| Storybook stories             |  157 | `*.stories.*`                                                       |
| TS/JS 测试文件                |   31 | 应用源码与组件库 package 下的 `*.test.*`/`*.spec.*`；不含仓库级 E2E |
| 根 package scripts            |  164 | `package.json#scripts` 命令数                                       |
| pnpm workspace 项目           |    3 | 根应用、API 与组件库                                                |

## 可复用模块分类

| 当前目录                                | 数量 | 说明                                                                           |
| --------------------------------------- | ---: | ------------------------------------------------------------------------------ |
| `src/components/stateless`              |  155 | 含 `index.*` 的模块目录（直接子目录 139，嵌套入口 16）；目录名不保证组件无状态 |
| `src/components/stateful`               |    4 | 含 `index.*` 的直接子目录                                                      |
| `src/components` 独立目录               |    0 | 未归入现有分类目录的直接子目录                                                 |
| `src/platform/auth/components` TSX 文件 |    5 | 认证、鉴权和权限守卫相关模块                                                   |
| `src/components/hooks`                  |   49 | 含入口文件的直接 Hook 模块目录，不含聚合入口                                   |
| `src/shared/ui`                         |    2 | 应用级共享 UI 模块入口                                                         |
| `packages/wui-react/src`                |   12 | 已进入独立源码边界的组件库模块                                                 |
| `src/app/layouts`                       |    9 | 应用壳与直接布局组件入口                                                       |
| `src/pages` 页面入口                    |   56 | 含 `index.*` 的页面模块目录（直接子目录 38）                                   |
| `src/features` 业务域                   |    4 | 已建立 feature-first 入口的业务域                                              |
| `src/projects` 项目入口                 |    8 | 含 `index.*` 的项目模块目录                                                    |

## Stateless 目录入口

以下清单沿用当前目录名；后续迁移时应依据用途重新分类，不应将它们全部视为纯展示组件。

| 模块                                  | 模块                                     | 模块                                     | 模块                                 |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------- | ------------------------------------ |
| `AboutSection`                        | `AdvancedCodeBlock`                      | `AlignCenter`                            | `AlternatingText`                    |
| `AnimBackground`                      | `AnimGroup`                              | `AnimInView`                             | `AnimInViewBasic`                    |
| `AnimText`                            | `AnimateOnScreen`                        | `AnimateRipple`                          | `AnimateWave`                        |
| `AnimatedList`                        | `AnimationTabs`                          | `ApiStateHandler`                        | `AutoLink`                           |
| `AutoScrollSection`                   | `AutoSlider`                             | `AvatarCard`                             | `BackgroundBeams`                    |
| `BackgroundBoxes`                     | `BlurFade`                               | `BlurText`                               | `BorderBeam`                         |
| `BreatheText`                         | `ClockFace`                              | `CodeHighlighter`                        | `ColorfulText`                       |
| `CompareAll`                          | `ContactSection`                         | `ContentPlaceholder`                     | `CopyToClipboard`                    |
| `CubeSpinner`                         | `CustomSwitch`                           | `DeploymentFlow`                         | `DeploymentFlow/phases/Phase01_Code` |
| `DeploymentFlow/phases/Phase02_CICD`  | `DeploymentFlow/phases/Phase03_Env`      | `DeploymentFlow/phases/Phase04_Strategy` | `DeploymentFlow/phases/Phase05_Ops`  |
| `DeploymentFlow/shared/CardContainer` | `DeploymentFlow/shared/KnowledgeSummary` | `DeploymentFlow/shared/SectionBadge`     | `DeploymentFlow/shared/TimelineDot`  |
| `DescBox`                             | `DonutCharts`                            | `DottedStepper`                          | `DynamicBackground`                  |
| `EChart`                              | `EChartsCommon`                          | `EChartsCommon/BaseChart`                | `Exception`                          |
| `FeatureAny`                          | `FixCarouse`                             | `FixMusicPlayer`                         | `FixTabs`                            |
| `FlipLink`                            | `FlipWords`                              | `FloatAny`                               | `FloatingIcon`                       |
| `Footer`                              | `GradientAnimation`                      | `GradientStats`                          | `GradientTracking`                   |
| `GradualSpacing`                      | `HorizontalScroll`                       | `IconCloud`                              | `InteractiveBook`                    |
| `InteractiveGrid`                     | `IntervalInput`                          | `IsometricCard`                          | `LandingPage`                        |
| `LanguageSwitcher`                    | `LazyLoadImage`                          | `LineBordered`                           | `LinearWrap`                         |
| `Loading`                             | `LogoSlider`                             | `MagicTrail`                             | `MarketingHero`                      |
| `MdxEditor`                           | `MdxEditor/components/EditorCore`        | `MdxEditor/components/Footer`            | `MdxEditor/components/Header`        |
| `MdxEditor/components/SourceView`     | `MdxEditor/components/Toolbar`           | `MemoizedStars`                          | `MeshGradientBackground`             |
| `Meteors`                             | `MouseTrail`                             | `MultiColorBorder`                       | `MultiDirectionSlide`                |
| `MusicPlayer`                         | `NoMatch`                                | `NumberFlowFix`                          | `NumberViewCard`                     |
| `OrbitingCircles`                     | `OrgChart`                               | `OrgChart/org-chart`                     | `PDFExport`                          |
| `PHBarChart`                          | `PageContainer`                          | `PieNestCharts`                          | `PointerMove`                        |
| `PromptOptimizer`                     | `RadioInput`                             | `ReMarkdown`                             | `ReactSignature`                     |
| `SafeLink`                            | `SandpackBasic`                          | `ScratchToReveal`                        | `ScriptView`                         |
| `ScrollAnimation`                     | `ScrollToTop`                            | `ScrollVelocity`                         | `SectionNotFound`                    |
| `SettingDrawer`                       | `ShiCode`                                | `ShiftingCard`                           | `ShinyText`                          |
| `ShootingStars`                       | `SkeletonFix`                            | `SlideButton`                            | `SlideLinear`                        |
| `SlideText`                           | `SmartChat`                              | `SmartVideoPlayer`                       | `SoundBar`                           |
| `Sparkles`                            | `SparklesText`                           | `Spotlight`                              | `SquaresGrid`                        |
| `StarBackground`                      | `StarRating`                             | `StaticStepper`                          | `StatisticCard`                      |
| `StickyCard`                          | `StickyFooter`                           | `SvgPreview`                             | `TagCard`                            |
| `TagCloud`                            | `TestimonialCarousel`                    | `TextClip`                               | `TextComponent`                      |
| `TextLoader`                          | `TextReveal`                             | `ThreeDCard`                             | `TransferHistory`                    |
| `TrapezoidTabs`                       | `TypeWriter`                             | `TypedText`                              | `UserIP`                             |
| `Video`                               | `Watermark`                              | `WordRotate`                             |

## Stateful 目录入口

| 模块            | 模块       | 模块      | 模块           |
| --------------- | ---------- | --------- | -------------- |
| `CheckableTags` | `TreeList` | `markmap` | `mermaidHooks` |

## Hook 模块

| 模块                | 模块                         | 模块                 | 模块                |
| ------------------- | ---------------------------- | -------------------- | ------------------- |
| `useApiCallOnMount` | `useAsyncTip`                | `useAutoScale`       | `useBodyScrollLock` |
| `useCallbackState`  | `useCookie`                  | `useCopyToClipboard` | `useCycle`          |
| `useDebounce`       | `useElementViewportPosition` | `useErrorBoundary`   | `useEventListener`  |
| `useFetchReducer`   | `useFocus`                   | `useHover`           | `useImageUpload`    |
| `useInViewport`     | `useInitialRender`           | `useIntersection`    | `useInterval`       |
| `useIsMount`        | `useKeyPress`                | `useLocalStorage`    | `useMasonry`        |
| `useMounted`        | `useMousePosition`           | `useNetworkStatus`   | `useOAuth`          |
| `usePersistedState` | `usePollingEffect`           | `usePreviousValue`   | `useRandomInterval` |
| `useRect`           | `useRefVariable`             | `useRootClick`       | `useScript`         |
| `useScrollIntoView` | `useScrollPosition`          | `useStep`            | `useSystemTheme`    |
| `useTable`          | `useThrottle`                | `useTitle`           | `useUnload`         |
| `useUpdate`         | `useVideo`                   | `useViewport`        | `useWebsocket`      |
| `useWindowScroll`   |                              |                      |

## Shared UI 模块

| 模块          | 模块                | 模块 | 模块 |
| ------------- | ------------------- | ---- | ---- |
| `FixTabPanel` | `ScrollProgressBar` |      |

## WUI 组件库模块

| 模块           | 模块                 | 模块              | 模块                |
| -------------- | -------------------- | ----------------- | ------------------- |
| `AnimatedIcon` | `IconFrame`          | `MoveChecker`     | `OneTimePasscode`   |
| `OverflowText` | `PortalTooltip`      | `ResponsiveTable` | `SafeHtml`          |
| `ScrollLayout` | `ScrollableSections` | `SliderCaptcha`   | `WatermarkProvider` |

## Layout 模块

| 模块               | 模块        | 模块         | 模块         |
| ------------------ | ----------- | ------------ | ------------ |
| `ApplicationShell` | `FixLayout` | `fullscreen` | `primaryNav` |
| `proContent`       | `proHeader` | `proSecNav`  | `proSider`   |
| `proTabs`          |             |              |

## 未归类的 components 根目录

_无_

## 鉴权与权限组件文件

| 模块             | 模块           | 模块               | 模块              |
| ---------------- | -------------- | ------------------ | ----------------- |
| `AuthButton`     | `AuthCallback` | `EnterpriseSignIn` | `PermissionGuard` |
| `ProtectedRoute` |                |                    |
