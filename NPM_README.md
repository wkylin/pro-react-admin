# @w.ui/wui-react

React 19 UI components, built as ESM and CommonJS with TypeScript declarations and a shared stylesheet. The package preserves 12 root components and adds named component groups; it does not include the admin application, authentication, request infrastructure, or tracking SDK.

## Install

```bash
pnpm add @w.ui/wui-react react react-dom antd framer-motion
```

Peer ranges: React/React DOM >=19 <20, Ant Design >=6 <7, Framer Motion >=12 <15. Package Node support is ^22.22.2 || ^24.15.0 || >=26.0.0; the repository tooling has its own Node 24 constraint.

## Usage

```tsx
import OneTimePasscode from '@w.ui/wui-react/one-time-passcode'
import '@w.ui/wui-react/style.css'

export function CodeInput() {
  return <OneTimePasscode length={6} onChange={(value) => console.log(value)} />
}
```

Named root imports are also available: `import { OneTimePasscode } from '@w.ui/wui-react'`. CommonJS consumers use `require('@w.ui/wui-react')`. Import the stylesheet once at your application entry.

## Public components

| Export                     | Subpath             |
| -------------------------- | ------------------- |
| AnimatedIcon               | animated-icon       |
| IconFrame                  | icon-frame          |
| MoveChecker                | move-checker        |
| OneTimePasscode            | one-time-passcode   |
| OverflowText               | overflow-text       |
| PortalTooltip              | portal-tooltip      |
| ResponsiveTable / useTable | responsive-table    |
| SafeHtml                   | safe-html           |
| ScrollLayout               | scroll-layout       |
| ScrollableSections         | scrollable-sections |
| SliderCaptcha              | slider-captcha      |
| WatermarkProvider          | watermark-provider  |

Props types are exported from the root and corresponding subpaths. ResponsiveTable accepts a requestLib or fetchData integration; its default client does not inherit the admin application's authorization. SliderCaptcha is a UI challenge and requires server validation for security decisions. SafeHtml sanitizes content according to its implementation and props; review allowed content for your use case.

## Group entries

The migration provides seven named-only subpaths: `@w.ui/wui-react/layout`,
`@w.ui/wui-react/animation`, `@w.ui/wui-react/data-display`, `@w.ui/wui-react/forms`,
`@w.ui/wui-react/media`, `@w.ui/wui-react/visualization`, and `@w.ui/wui-react/editor`.
Layout currently exports AboutSection, AlignCenter, AnimationTabs, FadeInDiv, AutoScrollSection, FeatureAny, FixTabs, Footer, HorizontalScroll, LinearWrap, MarketingHero, PageContainer, ScrollToTop, StickyCard, StickyFooter and TrapezoidTabs. Animation exports FloatingIcon and SocialIcon; data-display exports the components documented below. Other groups gain components as their migration is completed.
Group components and their prop types are exported by name; groups have no default
export and are not re-exported from the root. The existing 12 component subpaths and
root exports remain available.

Each public entry includes a consolidated TypeScript declaration. Declaration
bundling preserves public prop types while keeping the published file count
independent of the number of internal component files. The same declaration build
runs after both Webpack and Vite builds.

Group-specific optional peers will be documented alongside migrated components.
Importing a group loads its static runtime imports, so consumers must install all
peers listed for that group. Importing the root does not load the new group entries.

Source, Storybook and development documentation: [GitHub](https://github.com/wkylin/pro-react-admin). Build and publishing instructions: [release guide](https://github.com/wkylin/pro-react-admin/blob/main/docs/deployment/LIBRARY_PUBLISH_GUIDE.md). Published package: [npm](https://www.npmjs.com/package/@w.ui/wui-react).

### Layout consumption

```tsx
import { FixTabs, PageContainer } from '@w.ui/wui-react/layout'
import '@w.ui/wui-react/style.css'

export function Workspace() {
  return (
    <PageContainer title="Workspace" footer={<small>Your footer</small>}>
      <FixTabs tabs={[{ id: 'overview', label: 'Overview', content: 'Ready' }]} />
    </PageContainer>
  )
}
```

Layout uses the existing React, React DOM, Ant Design and Framer Motion peers;
animation uses React and Framer Motion. No Tailwind setup or application theme is
required. Motion imports use the existing `framer-motion` peer. `FeatureAny` requires
caller data; `HorizontalScroll` and `AboutSection` accept cards with image alt text
or children. `MarketingHero` accepts a decoration slot. `Footer` accepts brand,
navigation, social and legal content; `PageContainer` has no default footer.
`ScrollToTop` accepts `resetKey`, `behavior` and an optional element ref `target`:
pass a router pathname as `resetKey` in your application. `StickyFooter.bottom`
defaults to zero. Tab components support arrow keys, Home/End and controlled values
(`activeId`, `activeValue`, or `activeTab`). `FixTabs.theme` selects light/dark styling.
`SocialIcon.color` accepts a CSS color and `label` supplies its accessible name.

### Forms consumption

`@w.ui/wui-react/forms` exports CheckableTags, DottedStepper, IntervalInput,
LanguageSwitcher, PromptOptimizer, RadioInput, ReactSignature, SmartChat and
StarRating, with their public props, events, request/value and ref types.
Install the forms entry's optional peers before importing it:

```sh
npm install @uiw/react-signature@^1.3.5 highlight.js@^11 react-markdown@^10 rehype-highlight@^7 remark-breaks@^4 remark-gfm@^4
```

These dependencies are optional for other entries. The forms group uses the existing
React, React DOM, Ant Design and Framer Motion peers. Import `@w.ui/wui-react/style.css`
for standalone styles, including the Markdown code highlighting theme.

CheckableTags, IntervalInput, PromptOptimizer, DottedStepper and StarRating support
controlled values and change callbacks, or defaults for uncontrolled usage.
IntervalInput has no implicit numeric bounds. RadioInput is a read-only visual
radio/checkbox indicator; use an interactive input when users must change it.
LanguageSwitcher accepts language/options/onLanguageChange; application i18n context
is not required. DottedStepper accepts caller steps/content, navigation labels and
a light/dark theme and uses responsive container CSS.

ReactSignature exposes a typed ref, labels and validation/copy/download callbacks.
SmartChat accepts an endpoint or fetcher, typed request transformers, optional system
prompt and configurable labels. Its fetcher must return a Response containing SSE
`data:` records (plain text or OpenAI-compatible JSON deltas); `[DONE]` terminates
the response. Stop, initial-message replacement and unmount abort the request and
cancel the stream reader. Request option/transformer signals also cancel the request.
Markdown is rendered without raw HTML. Clipboard feedback timers and signature
image resources are released on unmount.

### Data display consumption

`@w.ui/wui-react/data-display` exports TreeList, ApiStateHandler, AutoLink,
AvatarCard, ClockFace, ContentPlaceholder, CopyToClipboard, Exception, GradientStats,
Loading, NumberViewCard, PDFExport, SkeletonFix, StaticStepper, StatisticCard,
SvgPreview, TagCard, TextComponent, TransferHistory, UserIP and Watermark, with their
public prop/data types. ExceptionView and the four Exception status variants,
StaticStep/CodeContainer, Word and useCopyToClipboard are also named exports.
Import `@w.ui/wui-react/style.css` once. No application theme or Tailwind is required.

```tsx
import { NumberViewCard, UserIP, TransferHistory } from '@w.ui/wui-react/data-display'
import '@w.ui/wui-react/style.css'

<NumberViewCard value={750000} label="Views" formatValue={value => Number(value).toLocaleString()} />
<UserIP loadInfo={signal => fetch('/api/network', { signal }).then(response => response.json())} />
<TransferHistory groups={[]} theme="light" />
```

TreeList calls `getTreeList(params, signal)` and aborts/ignores replaced or unmounted
requests; existing one-argument loaders remain supported. Plain `params` objects
and arrays are compared by value, so inline loader/params props do not reload on
parent renders. Change `queryKey` (or call the ref's `updateTree`) to reload when
query context outside `params` changes. UserIP takes `data` or
`loadInfo(signal)`, plus caller labels, and never contacts a built-in endpoint.
TransferHistory takes typed groups, companies and records; `renderTitle`,
`renderLabel` and `renderRatio` customize content. TagCard takes theme/tokens, icons
and expand/collapse labels. ApiStateHandler accepts loading/error fallback slots.
ClockFace accepts `locale`, `hour12` or `formatTime`; placeholders are deterministic.
Exception variants expose action/children slots; routing belongs to the caller.

PDFExport takes children or a `contentRef`, `fileName`, `pdfOptions`, `scale`,
`onComplete` and `onError`. `pdfOptions` uses the package-owned `PDFDocumentOptions`
type, so other data-display consumers do not need PDF peers for typechecking.
Install its lazy optional peers before exporting:

```sh
npm install html2canvas@^1.4.1 jspdf@^4.2.1
```

They are loaded only when export is requested, not when the group is imported.
Capture excludes remote image elements and embedded frames; supply data/blob image
sources. Canvas resources are released on completion/failure; export is suppressed
after unmount. Exports are limited to 100 PDF pages.

SvgPreview sanitizes SVG strings and remote responses to static primitives before
display/download, removing scripts, embedded HTML, links, animation and external
resource references. `SvgComponent` is trusted caller React code. Keyboard arrows
pan, +/- zoom; controls have accessible labels. `onError` and `onStatus` replace
application feedback services. Remote loads are aborted and object URLs revoked.

Watermark is an imperative function, not a React component:

```tsx
useEffect(() => Watermark({ container: element, content: 'Confidential' }), [element])
```

Its returned disposer removes the watermark and disconnects its observer. Calling
it outside a browser returns a no-op disposer. Copy helpers expose failure callbacks
and cancel pending copied-state timers when unmounted. CopyToClipboard invokes
the supplied native `onClick` first; `event.preventDefault()` cancels copying.

### Animation group

Import the named animation components and public props from
`@w.ui/wui-react/animation`. This group includes `FloatingIcon`, `SocialIcon`,
`AlternatingText`, `AnimatedList`, `AnimateOnScreen`, `AnimateRipple`, `AnimateWave`,
`AnimBackground` (`AnimatedBackground`), `AnimGroup` (`AnimatedGroup`), `AnimInView`
(`AnimationInView`), `AnimText`, `BackgroundBeams`, `BackgroundBoxes`, `BlurFade`,
`BlurText`, `BorderBeam`, `BreatheText`, `ColorfulText`, `ContactSection`,
`CubeSpinner`, `DynamicBackground`, `FlipLink`, `FlipWords`, `FloatAny`,
`GradientAnimation`, `GradientTracking`, `GradualSpacing`, `InteractiveGrid`,
`IsometricCard`, `LineBordered`, `MagicTrail`, `MemoizedStars`,
`MeshGradientBackground`, `Meteors`, `MouseTrail`, `MultiColorBorder`,
`MultiDirectionSlide`, `OrbitingCircles`, `PointerMove`, `ScratchToReveal` and
`ScrollAnimation`, `ScrollVelocity`, `ShiftingCard`, `ShinyText`, `ShootingStars`,
`SlideButton`, `SlideLinear`, `SlideText`, `Sparkles`, `SparklesText`, `Spotlight`,
`SquaresGrid`, `StarBackground`, `TagCloud`, `TextClip`, `TextLoader`, `TextReveal`,
`ThreeDCard`, `TypedText`, `TypeWriter` and `WordRotate`.

Install the animation entry's optional peers before importing it:

```sh
npm install motion@'>=12 <15' @react-spring/web@^10 @tsparticles/react@^4.4 @tsparticles/engine@^4.4 @tsparticles/slim@^4.4
```

The group also uses the existing `framer-motion` peer (`>=12 <15`). `motion`
and `@react-spring/web` plus the three `@tsparticles` peers are optional for other entries; the root entry remains
separate. Import `@w.ui/wui-react/style.css` for CSS effects. Animation layout
styles are packaged and do not require Tailwind.

Supply content through props and children: `AnimateWave` accepts `text` and
`words`, `BreatheText` accepts `text`/`secondaryText`, `CubeSpinner` accepts `items`,
`ContactSection` accepts `text` and an optional scroll container ref, and
`DynamicBackground` accepts icon `items` and foreground `children`. Technology
icons, hero copy and example links live in stories. `AlternatingText` accepts an
interval in milliseconds and an optional placeholder for empty lists.

Selection backgrounds preserve caller handlers and select on focus, Enter and
Space; consumers should supply native interactive children that accept nested spans.
Native void elements (including inputs), selects and textareas pass through
unchanged; they retain their original content/events and receive no selection background. `FlipLink` forwards
link attributes and animates on focus. Decorative duplicates are hidden from
assistive technology. Timers, observers and pointer listeners are cleaned up.

`GradientTracking` accepts native button attributes and caller `children`.
`MeshGradientBackground` accepts foreground children and optional `gradient` and
`backgroundColor`. `MemoizedStars` accepts `count`, `color` and `size`; star and
meteor geometry is deterministic during server rendering and hydration.
`MouseTrail` images are decorative (`alt=""`) unless `imageAlt(src, index)` supplies
meaningful alternatives. Its fade timers are canceled when items change or the
component unmounts. `ScratchToReveal` keeps covered content inert until revealed
and always provides a native button (`revealLabel`) for keyboard and reduced-motion
users; reduced-motion users reveal without the completion animation. `MagicTrail`
uses a canvas overlay, observes its size and DPR, and cancels listeners/frames on
unmount. Its optional `containerRef` selects the pointer event owner.

`TagCloud` accepts `items` and children; `TextClip` accepts `items`, `prefix`,
`suffix` and children. Example labels are provided in stories. `SlideButton` uses
native button attributes and keyboard behavior. `TypedText` and `TypeWriter`
expose complete text to assistive technology while typing. `StarBackground`
accepts count/color/container options and initializes random geometry after mount.
`Sparkles` initializes its particle provider within the animation group and uses
caller colors (transparent background and white particles by default).

The animation entry uses a native dynamic import for `@tsparticles/slim` when
`Sparkles` mounts. This avoids the upstream 4.4 CommonJS wrapper; Node 22+/24+
and modern browsers support this import form. Application bundlers resolve the
optional package when bundling the animation entry. Server rendering does not
initialize particles. The provider catches initialization failures, and ignores
completion after unmount; its particle container is destroyed on teardown.

### Media group

Import media components and their prop types from `@w.ui/wui-react/media`.
This group exports `AutoSlider`, `CompareAll`, `FixCarouse`, `FixMusicPlayer`,
`InteractiveBook`, `LazyLoadImage`, `LogoSlider`, `MusicPlayer`,
`SmartVideoPlayer`, `SoundBar`, `TestimonialCarousel` and `Video`.

The media peers below are optional for consumers of the root or other groups.
Install these compatible versions when using the media group:

| Peer | Compatible range |
| --- | --- |
| `react-pdf` | `>=11.0.0 <12.0.0` |
| `pdfjs-dist` | `>=6.3.289 <7.0.0` |
| `video.js` | `>=8.24.1 <9.0.0` |
| `hls.js` | `>=1.7.3 <2.0.0` |
| `i18next` | `>=26.0.0 <27.0.0` |
| `react-i18next` | `>=17.0.0 <18.0.0` |

Import the package stylesheet once. `Video` additionally requires its peer's
stylesheet in your **browser entry**; the media runtime deliberately does not
import external CSS, so Node ESM/CJS and SSR imports remain valid:

```tsx
import '@w.ui/wui-react/style.css'
import 'video.js/dist/video-js.css'
import { Video, MusicPlayer } from '@w.ui/wui-react/media'
```

The layouts work without application Tailwind or theme styles. Supply your own
`tracks` to the music players, `slides` to `AutoSlider`, `items` to the generic
carousels, `{ src, alt }` companies to `LogoSlider`, and `src` to `SoundBar`.
`MusicPlayer` and `FixMusicPlayer` accept `theme`, `labels`, playback callbacks,
and `active`; temporarily setting `active={false}` pauses playback and restores
previously playing audio on reactivation, while respecting explicit user pauses.
`SmartVideoPlayer` provides scoped English/Chinese messages plus `language` and
`labels` overrides, and loads HLS only for the corresponding media source.

#### InteractiveBook PDF worker ownership

`InteractiveBook` accepts `pdfWorker`, a caller-owned `pdfjs.PDFWorker` instance,
or uses the host's existing PDF.js worker configuration. Create browser resources
only in the browser (for example in an application effect), and use a worker file
whose PDF.js version matches the runtime exported by `react-pdf`. A bundler that
supports worker URLs can configure an explicit worker as follows:

```tsx
import { pdfjs } from 'react-pdf'
import { InteractiveBook } from '@w.ui/wui-react/media'

// Browser setup; keep these resources alive while their books are mounted.
const port = new Worker(
  new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url),
  { type: 'module' }
)
const pdfWorker = new pdfjs.PDFWorker({ port })

const book = (
  <InteractiveBook
    coverImage="/covers/manual.jpg"
    pages={[]}
    pdfUrl="/documents/manual.pdf"
    pdfWorker={pdfWorker}
    pageTurnSound="/audio/page-turn.mp3"
  />
)

// Owner teardown after unmounting every book that uses this worker:
pdfWorker.destroy()
port.terminate()
```

The book cancels its render tasks and destroys document loading tasks; it does
not own an injected worker. It makes no worker CDN choice and supplies no private
audio. `pageTurnSound` is optional (`soundSrc` remains supported). The component
requests exactly the supplied `pdfUrl`; applications and Storybook stories must
resolve deployment base paths themselves, without relying on speculative retries.

### Visualization (`@w.ui/wui-react/visualization`)

Named exports: EChart, EChartsCommon, BaseChart, DonutCharts, PieNestCharts, PHBarChart, OrgChart, IconCloud, MarkmapHooks, MermaidHooks, getPHColor. Import the package stylesheet for OrgChart. This group stays outside the lightweight root.

Optional peers: `echarts >=6.1.0 <7.0.0` for charts, `markmap-lib >=0.18.12 <0.19.0` and `markmap-view >=0.18.12 <0.19.0` for mind maps, `mermaid >=12.1.0 <13.0.0` for diagrams. ECharts is required when importing the visualization group; diagram peers load only when their components mount.

Chart options/data, themes, map registrations (`maps: [{ name, data, specialAreas? }]`) and accessible `ariaLabel` text are caller-owned. Map names use ECharts' global registry; use distinct names for different datasets. `PHBarChart` requires `ranges: [{name, values}]`, with optional markers and title. `PieNestCharts.data` provides the inner series when no explicit series are supplied. OrgChart takes a caller tree, including IDs equal to zero.

Diagram markup is always sanitized: Mermaid uses strict security by default and static SVG primitives; scripts, styles, external SVG resources and embedded HTML are removed even in loose mode. Flowchart HTML labels are disabled to preserve text. Markmap permits safe inline HTML but never loads plugin scripts/styles. Mermaid configuration/rendering is serialized within this package; external Mermaid users should avoid changing the same global configuration during a render. IconCloud renders caller icons/images and accepts an accessible text alternative plus arrow-key rotation.

### Editor (`@w.ui/wui-react/editor`)

Named exports: `AdvancedCodeBlock`, `CodeHighlighter`, `MdxEditor`, `ReMarkdown`, `SandpackBasic`, `ScriptView`, `ShiCode`. Import `@w.ui/wui-react/style.css` for independent styles. The root and original component subpaths do not load editor peers. Install the editor group peers before importing this group:

- `@codesandbox/sandpack-react ^2.20.0`
- `@tiptap/core 3.31.4`
- `@tiptap/extension-code-block-lowlight ^3.31.4`
- `@tiptap/extension-image ^3.31.4`
- `@tiptap/extension-link ^3.31.4`
- `@tiptap/extension-placeholder ^3.31.4`
- `@tiptap/extension-table ^3.31.4`
- `@tiptap/extension-task-item ^3.31.4`
- `@tiptap/extension-task-list ^3.31.4`
- `@tiptap/extension-text-align ^3.31.4`
- `@tiptap/extension-underline ^3.31.4`
- `@tiptap/react ^3.31.4`
- `@tiptap/starter-kit ^3.31.4`
- `highlight.js >=11.0.0 <12.0.0`
- `katex ^0.19.0`
- `lowlight ^3.3.0`
- `marked ^18.1.0`
- `prism-react-renderer ^2.4.1`
- `react-markdown >=10.0.0 <11.0.0`
- `rehype-highlight >=7.0.0 <8.0.0`
- `rehype-katex ^7.0.1`
- `remark-breaks >=4.0.0 <5.0.0`
- `remark-gfm >=4.0.0 <5.0.0`
- `remark-math ^6.0.0`
- `shiki ^4.5.0`
- `turndown ^7.2.4`

All peers above are optional for other groups. SandpackBasic forwards typed Sandpack files, template, options and theme; supply your own files. MdxEditor accepts `value`/`onChange` or `initialMarkdown`, `readOnly`, `theme`/`onThemeChange`, `title`, `labels`, and `downloadFileName`. It parses Markdown (not executable MDX) and sanitizes HTML before inserting it into Tiptap. ReMarkdown ignores raw HTML, rejects unsafe URL protocols through react-markdown, and supports trusted caller `components` and `renderLoading`; `onCopy`/`onCopyError` provide feedback. CodeHighlighter exposes typed Shiki languages/themes, falls back to escaped source on failure, and discards stale/unmounted async results. AdvancedCodeBlock accepts figure attributes and filename. ScriptView accepts commandMap, language, theme and copy labels; ShiCode accepts preCode, filename, language and copy label.

Math is rendered as native MathML, avoiding global KaTeX font CSS and embedded font payloads.
