# UI 组件库

## 包边界

@w.ui/wui-react 的源码只在 packages/wui-react/src，config/library-contract.mjs 定义 12 个公开组件、子路径、类型、peer、externals 与体积预算。根应用消费 @wui 源码别名，不通过发布包 dist。

构建产物包括 dist/esm、dist/cjs、dist/types 和 dist/style.css；ESM/CJS 根入口与每组件子路径独立导出。TS 声明开启 strict。React、React DOM、Ant Design、Framer Motion 为 peer；其它运行依赖按契约 external，不将应用状态、API 或 Tracking SDK 打包进去。

```tsx
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'
```

类型与安装约束见根 NPM_README.md；packages/wui-react/README.md 由 prepare-lib-publish 从它复制，不单独维护另一套安装文档。

## 构建与检查

```bash
pnpm run build:lib
pnpm run prepare:lib:publish
pnpm run check:lib-package
pnpm run check:lib-smoke
pnpm run check:lib-size
npm pack ./packages/wui-react --dry-run --ignore-scripts
```

build:lib 清理旧 dist，Webpack 分别输出 ESM/CJS/CSS，再生成声明与 finalize 公共入口。prepare:lib:release 聚合构建、准备、契约、消费 smoke 与体积检查。npm pack --dry-run 只预览；发布命令不是验证命令。

新增公开组件先解除应用 imports、建立 props 类型与 Story，再更新 library-contract、包 manifest 和类型入口。运行 catalog 生成、strict typecheck 与发布消费检查。应用中的 MdxEditor、SmartVideoPlayer、InteractiveBook 不属于当前公开 UI 包。

## 发布

根应用版本与包版本独立；修改 packages/wui-react/package.json 的版本后执行 release 检查。仓库 publish-wui-react.yml 实现包发布工作流，具体凭据/Trusted Publishing 由 npm 与 GitHub 配置管理。手动 pub/pub:beta 会写入 npm，需按发布权限执行；本地构建不表示新版本已发布。

自动组件列表见[实现参考](PROJECT_REFERENCE.md)，完整源码清单见[组件目录](COMPONENT_CATALOG.md)。
