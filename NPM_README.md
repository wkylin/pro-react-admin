# @w.ui/wui-react

React 19 UI components, built as ESM and CommonJS with TypeScript declarations and a shared stylesheet. The package contains 12 public components; it does not include the admin application, authentication, request infrastructure, or tracking SDK.

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
These entries are initially empty and gain components as their migration is completed.
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
