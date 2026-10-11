# `@w.ui/wui-react` 组件库

组件库的独立源码放在 `packages/wui-react/src`，发布清单位于 `packages/wui-react/package.json`，构建由 Webpack 5 完成。`AnimatedIcon`、`OneTimePasscode`、`WatermarkProvider` 和 `ResponsiveTable` 已使用 package-owned 源码并提供独立子路径。历史聚合 API 仍由 `src/lib/` 维护，其他旧组件会按复用边界分批迁入。

## 入口和导入路径

| 源入口                                | 消费端路径                      | 用途                       |
| ------------------------------------- | ------------------------------- | -------------------------- |
| `src/lib/index.ts`                    | `@w.ui/wui-react`               | 聚合入口                   |
| `src/lib/core.ts`                     | `@w.ui/wui-react/core`          | 应用基础组件               |
| `src/lib/stateful.ts`                 | `@w.ui/wui-react/stateful`      | 有状态组件                 |
| `src/lib/stateless.ts`                | `@w.ui/wui-react/stateless`     | 展示和交互组件             |
| `src/lib/tracking/index.ts`           | `@w.ui/wui-react/tracking`      | 埋点 SDK                   |
| `packages/wui-react/src/AnimatedIcon` | `@w.ui/wui-react/animated-icon` | 独立源码组件，支持单独导入 |
| `packages/wui-react/src/OneTimePasscode` | `@w.ui/wui-react/one-time-passcode` | 独立源码组件，支持单独导入 |
| `packages/wui-react/src/WatermarkProvider` | `@w.ui/wui-react/watermark-provider` | 独立源码组件，支持单独导入 |
| `packages/wui-react/src/ResponsiveTable` | `@w.ui/wui-react/responsive-table` | 可注入请求客户端的通用数据表格 |
| Webpack 提取样式                      | `@w.ui/wui-react/style.css`     | 组件样式                   |

子路径 API 在 `packages/wui-react/package.json#exports` 与 `config/library-contract.mjs` 显式声明；历史聚合 API 仍由 `src/lib` 维护。应用内部不再维护 `src/components/index.ts` 聚合出口。

## 构建命令

在仓库根目录执行。只构建聚合入口和类型声明：

```bash
pnpm run build:lib
```

需要完整构建聚合包、子路径入口并生成可发布目录时，使用一条命令：

```bash
pnpm run prepublishOnly
```

它等价于依次执行以下步骤，不会自动发布到 npm：

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
pnpm run check:lib-package
```

- `build:lib` 清理 `packages/wui-react/dist/`，用 `webpack/webpack.lib.js` 构建聚合包，并通过 `tsconfig.lib.json` 生成类型声明。
- `build:lib:entries` 构建分类入口以及 package-owned 组件的 ESM/CJS 子路径入口。
- `prepare:lib:publish` 复制 npm README 和 LICENSE；package metadata 已在 `packages/wui-react/package.json` 中维护。

构建完成后可用 `npm pack ./packages/wui-react --dry-run` 预览将进入 npm 包的文件，不会生成 tarball 或发布包。

产物结构：

```text
packages/wui-react/
├── package.json
├── README.md
├── LICENSE
└── dist/
    ├── pro-react-components.es.js
    ├── pro-react-components.umd.cjs
    ├── style.css
    ├── entries/
    │   ├── core.es.js / core.cjs
    │   ├── stateful.es.js / stateful.cjs
    │   ├── stateless.es.js / stateless.cjs
    │   ├── tracking.es.js / tracking.cjs
    │   ├── animatedIcon.es.js / animatedIcon.cjs
    │   ├── oneTimePasscode.es.js / oneTimePasscode.cjs
    │   ├── watermarkProvider.es.js / watermarkProvider.cjs
    │   └── responsiveTable.es.js / responsiveTable.cjs
    └── types/
        ├── src/lib/                         # 聚合 API 类型
        └── packages/wui-react/src/          # 独立组件类型
```

React、React DOM、Ant Design 和 React Router 在发布 package 中声明为 peer dependencies，消费项目需要自行安装兼容版本。

## 在新项目中使用

```bash
pnpm add @w.ui/wui-react react react-dom antd react-router-dom framer-motion
```

Framer Motion 是当前 `AnimatedIcon` 的 peer dependency。其他 peer dependencies 为 React、React DOM、Ant Design 和 React Router。

聚合入口保留给现有组件；新迁入的组件优先走独立子路径：

```tsx
import { SmartVideoPlayer } from '@w.ui/wui-react'
import { AnimatedIcon } from '@w.ui/wui-react'
import OneTimePasscode from '@w.ui/wui-react/one-time-passcode'
import WatermarkProvider from '@w.ui/wui-react/watermark-provider'
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'
```

也可以按类别导入：

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { SmartVideoPlayer } from '@w.ui/wui-react/stateless'
import AnimatedIcon from '@w.ui/wui-react/animated-icon'
import { TrackerProvider } from '@w.ui/wui-react/tracking'
import '@w.ui/wui-react/style.css'
```

若消费项目的 TypeScript 配置没有自动读取 React 类型，需要另行安装 `@types/react` 和 `@types/react-dom`。

## 新增公开组件

1. 将可独立复用的组件实现、类型、样式和 stories 放在 `packages/wui-react/src/<Component>`。
2. 从 package `src/index.ts` 导出组件，并在 `config/library-contract.mjs`、`package.json#exports` 中声明子路径。
3. 在 `webpack/webpack.lib.js` 中注册 ESM/CJS 构建入口，确认样式进入 `style.css` 或组件专属 CSS 文件。
4. 仅当组件属于现有聚合 API 时，才在对应 `src/lib/*.ts` 增加导出。
5. 运行 `pnpm run build:lib && pnpm run build:lib:entries`，再用 `npm pack ./packages/wui-react --dry-run` 检查包内容。

Story 文件只属于 Storybook，不要从 `src/lib` 导出。

## 发布

组件库版本独立维护。先选择版本变更，再预览包内容并发布：

```bash
pnpm run release:lib:patch # 或 release:lib:minor / release:lib:major
pnpm run prepublishOnly
npm pack ./packages/wui-react
pnpm run pub
```

`pnpm run pub` 发布正式版；`pnpm run pub:beta` 使用 beta tag。发布版本在 `packages/wui-react/package.json` 独立维护。正式发布前应检查版本号、package 文件清单和 npm dry-run 输出。不要把 `.env` 或构建凭据复制到发布目录。
