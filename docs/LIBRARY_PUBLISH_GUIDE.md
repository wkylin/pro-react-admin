# `@w.ui/wui-react` 组件库

组件库的公开 API 暂由 `src/lib/` 控制，独立发布清单位于 `packages/wui-react/package.json`，构建由 Webpack 5 完成。页面路由和应用入口不属于组件库入口。源码仍与主应用同仓，当前隔离的是版本和发布边界。

## 入口和导入路径

| 源入口                      | 消费端路径                  | 用途           |
| --------------------------- | --------------------------- | -------------- |
| `src/lib/index.ts`          | `@w.ui/wui-react`           | 聚合入口       |
| `src/lib/core.ts`           | `@w.ui/wui-react/core`      | 应用基础组件   |
| `src/lib/stateful.ts`       | `@w.ui/wui-react/stateful`  | 有状态组件     |
| `src/lib/stateless.ts`      | `@w.ui/wui-react/stateless` | 展示和交互组件 |
| `src/lib/tracking/index.ts` | `@w.ui/wui-react/tracking`  | 埋点 SDK       |
| Webpack 提取样式            | `@w.ui/wui-react/style.css` | 组件样式       |

只有从 `src/lib` 导出的组件才进入公开 API。不要从应用内部 barrel `src/components/index.ts` 自动生成库入口。

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
- `build:lib:entries` 构建 core、stateful、stateless 和 tracking 的 ESM/CJS 子路径入口。
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
    │   └── tracking.es.js / tracking.cjs
    └── types/src/lib/    # TypeScript 声明及其依赖声明
```

React、React DOM、Ant Design 和 React Router 在发布 package 中声明为 peer dependencies，消费项目需要自行安装兼容版本。

## 在新项目中使用

```bash
pnpm add @w.ui/wui-react react react-dom antd react-router-dom
```

聚合入口：

```tsx
import { OneTimePasscode, SmartVideoPlayer } from '@w.ui/wui-react'
import '@w.ui/wui-react/style.css'
```

也可以按类别导入：

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { SmartVideoPlayer } from '@w.ui/wui-react/stateless'
import { TrackerProvider } from '@w.ui/wui-react/tracking'
import '@w.ui/wui-react/style.css'
```

若消费项目的 TypeScript 配置没有自动读取 React 类型，需要另行安装 `@types/react` 和 `@types/react-dom`。

## 新增公开组件

1. 将组件实现放在 `src/components/` 对应分类下。
2. 在 `src/lib/core.ts`、`stateful.ts` 或 `stateless.ts` 增加导出。
3. 确认样式能通过 `style.css` 引入。
4. 运行 `pnpm run build:lib && pnpm run build:lib:entries`。
5. 用 `npm pack ./packages/wui-react` 检查包内容和导出路径。

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
