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
`CubeSpinner`, `DynamicBackground` and `FlipLink`.

Install the animation entry's optional peers before importing it:

```sh
npm install motion@'>=12 <15' @react-spring/web@^10
```

The group also uses the existing `framer-motion` peer (`>=12 <15`). `motion`
and `@react-spring/web` are optional for other entries; the root entry remains
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
