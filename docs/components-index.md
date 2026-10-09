# 组件库入口维护

仓库中有两个导出边界：

- `src/components/index.ts` 是应用内部 barrel，可供应用模块复用。
- `src/lib/` 是 `@w.ui/wui-react` 的公开 API，只有这里导出的内容进入 npm 包。

## 公开入口

- `src/lib/index.ts`：聚合入口 `@w.ui/wui-react`
- `src/lib/core.ts`：`@w.ui/wui-react/core`
- `src/lib/stateful.ts`：`@w.ui/wui-react/stateful`
- `src/lib/stateless.ts`：`@w.ui/wui-react/stateless`
- `src/lib/tracking/index.ts`：`@w.ui/wui-react/tracking`

Webpack 配置位于 `webpack/webpack.lib.js`，类型由 `tsconfig.lib.json` 生成。构建命令是 `pnpm run build:lib` 和 `pnpm run build:lib:entries`。

## 新增导出

1. 将组件放在 `src/components/stateless/`、`src/components/stateful/` 或 `src/components/`。
2. 从对应的 `src/lib/*.ts` 入口导出。
3. 需要兼容聚合导入时，同时从 `src/lib/index.ts` 导出。
4. 运行 `pnpm run build:lib && pnpm run build:lib:entries`。
5. 检查 `dist-lib/` 产物和 `package.json#exports`。

```ts
export { default as MyComponent } from '../components/stateless/MyComponent'
```

Storybook 的 `*.stories.*` 和 `*.mdx` 是演示内容，不要加入库入口。组件样式由 `@w.ui/wui-react/style.css` 提供。

详细发布流程见[组件库指南](./LIBRARY_PUBLISH_GUIDE.md)。
