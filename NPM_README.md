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
Layout currently exports AboutSection, AlignCenter, AnimationTabs, FadeInDiv, AutoScrollSection, FeatureAny, FixTabs, Footer, HorizontalScroll, LinearWrap, MarketingHero, PageContainer, ScrollToTop, StickyCard, StickyFooter and TrapezoidTabs. Animation exports FloatingIcon and SocialIcon; data-display exports TextComponent. Other groups gain components as their migration is completed.
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
