# components/index.ts 维护说明（组件库入口）

本项目的组件库构建入口是 `src/components/index.ts`。

- `vite.config.lib.ts` 的 `build.lib.entry` 指向它
- `npm run build:lib` 会基于它生成 `dist-lib/*`（包含 JS bundle 与 d.ts）

因此：**只有在 `src/components/index.ts` 里导出的组件/工具，才会成为对外可用的库 API**。

## 什么时候需要改这个文件

当你新增了一个要对外发布的组件（或对外发布的 hooks / utils / types），需要：

1. 确保组件本体在 `src/components/stateless/*` 或 `src/components/stateful/*` 或 `src/components/*`（核心组件）下有可导入的入口文件（通常是 `index.tsx` / `index.ts` / `index.jsx`）
2. 在 `src/components/index.ts` 增加对应的 `export`
3. 运行一次 `npm run build:lib` 验证能生成类型与产物

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

1. `src/components/index.ts` 已新增 export
2. `npm run check:components-index` 通过（避免漏加/写错导出路径）
3. `npm run build:lib` 成功（产物 + d.ts）
4. 如果该组件有样式（`.module.less/.css`），在消费侧能正常引入
5. 如果该组件依赖路由/i18n 等上下文，在 Storybook 里可正常预览（可选，但建议）

## 常见问题

### Q1: 为什么我新增了组件但打出来的 lib 里没有？

因为 `vite.config.lib.ts` 的入口是 `src/components/index.ts`：

- 你没在这里 export → Rollup 不会把它当作库 API 打包
- dts 插件也不会把它作为入口类型导出到 `dist-lib/index.d.ts`

### Q2: 新增组件放在 `src/components/OneTimePasscode/` 里，为何还要从 `stateless/OneTimePasscode` export？

`src/components/OneTimePasscode/` 这种目录在当前项目里主要是 **Storybook 文档/演示（mdx/stories）**。
真正组件实现位于 `src/components/stateless/OneTimePasscode/`，所以库入口应该导出实现目录，而不是导出 docs。

### Q3: 以后这个文件会越来越大，怎么维护更舒服？

建议遵循两条简单规则：

1. **只导出“要发布的公共 API”**（组件/类型/hooks），避免把 demo、页面级组件、内部路由壳导出。
2. **新增组件就顺手加一行 export + 跑 build:lib**，用构建作为“验收”。

如果后续你希望进一步自动化，可以新增一个脚本（可选）：

- 扫描 `src/components/stateless/*` 和 `src/components/stateful/*`
- 生成（或校验）`src/components/index.ts`

但因为当前存在少量特殊导出（例如非 default 导出、注释掉的 export），完全自动生成需要先统一约定；否则更推荐“半自动校验”而不是强制重写文件。
