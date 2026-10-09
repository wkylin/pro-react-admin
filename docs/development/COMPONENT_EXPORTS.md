# components/index.ts 维护说明（内部 barrel）

本项目存在两个“入口”概念：

- **对外发布（build:lib）入口**：`src/lib/index.ts`（只包含可复用组件，避免把路由/页面代码打进 lib）
- **项目内部 barrel**：`src/components/index.ts`（应用内部使用，包含组件库未公开的认证和应用级组件）

此外可以发布按类别拆分的子路径入口，便于消费者按组件类别导入：

- **对外发布（build:lib:entries）入口**：
  - `src/lib/core.ts`
  - `src/lib/stateful.ts`
  - `src/lib/stateless.ts`
  - `src/lib/tracking/index.ts`

- `vite.config.lib.ts` 的 `build.lib.entry` 指向 `src/lib/index.ts`
- `pnpm run build:lib` 会基于它生成 `dist-lib/*`（包含 JS bundle 与 d.ts）

- `vite.config.lib.entries.ts` 会基于 `core/stateful/stateless/tracking` 四个入口生成 `dist-lib/entries/*`
- `pnpm run build:lib:entries` 会生成可被 `package.json#exports` 子路径引用的 js + d.ts

因此：**只有通过 `package.json#exports` 指向 `src/lib` 构建入口的组件/工具，才会成为对外 API**。根入口使用 `src/lib/index.ts`；子路径入口使用各自的分类入口。

并且：**如果你希望消费者通过 `@w.ui/wui-react/core`、`@w.ui/wui-react/stateful`、`@w.ui/wui-react/stateless` 或 `@w.ui/wui-react/tracking` 导入，则还必须在对应的 `src/lib` 入口里导出**。

## 什么时候需要改这个文件

当你新增了一个要对外发布的组件（或对外发布的 hooks / utils / types），需要：

1. 确保组件本体在 `src/components/stateless/*` 或 `src/components/stateful/*` 或 `src/components/*`（核心组件）下有可导入的入口文件（通常是 `index.tsx` / `index.ts` / `index.tsx`）
2. 在 `src/lib/index.ts` 增加对应的 `export`
3. 运行 `pnpm run build:lib` 验证能生成类型与产物

> 注意：Storybook 的 `*.stories.*` / `*.mdx` **不应** 被导出，它们只是文档/演示。

## 推荐目录与导出约定

### 1) 组件实现位置

- UI/展示类：优先放 `src/components/stateless/<ComponentName>/`
- 需要状态/数据处理：放 `src/components/stateful/<ComponentName>/`
- 项目级“核心壳/容器”能力：放 `src/components/<ComponentName>/`（例如 `ErrorBoundary`、`KeepAlive` 等）

### 2) 入口文件

推荐每个组件目录提供一个稳定入口（至少一个）：

- `index.tsx`：导出 React 组件（默认导出）
- `index.ts`：导出类型、常量、hooks 等

保持一致的好处：`components/index.ts` 只需要写一行清晰的 re-export。

### 3) 对外导出的命名

- 默认导出组件：使用 `export { default as Xxx } from '...'`
- 命名导出：使用 `export { Foo, Bar } from '...'` 或 `export * from '...'`

尽量保证导出名与目录名一致（`SmartVideoPlayer` ↔ `stateless/SmartVideoPlayer`）。

## 修改 checklist（建议每次都跑）

1. `src/lib/index.ts` 已新增 export（对外发布 API）
2. （可选）若你同时维护了 `src/components/index.ts`：`pnpm run check:components-index` 通过（避免漏加/写错导出路径）
3. `pnpm run build:lib` 成功（产物 + d.ts）
4. 如果该组件有样式（`.module.less/.css`），在消费侧能正常引入
5. 如果该组件依赖路由/i18n 等上下文，在 Storybook 里可正常预览（可选，但建议）
