# Webpack 构建体积基线

实际构建数据不再手工抄在文档里。CI 在稳定的 Node.js 24、pnpm 11.5.2 和默认生产构建下生成 `compilation-stats.json`，并把文件保存为 14 天的 workflow artifact。

## 当前门禁

`config/bundle-budget.json` 是 Webpack performance hint 与 CI 检查共用的预算来源：

- 初始 JavaScript + CSS entrypoint 总量：6 MiB。
- 单个初始 JavaScript/CSS 资源：6 MiB。

这是构建输出的未压缩字节数。它是保护上限，不是当前实际体积的声明；当前实测值应从最近一次 CI 的 `webpack-stats-<run id>` artifact 查看。超过上限时，CI 会失败并打印各初始资源大小。不要只为通过 CI 就上调预算，应先检查同步加载页面、重复依赖和大资源。

## 本地生成相同数据

```bash
CI=1 PUBLIC_URL=/ pnpm run build:stats
pnpm run check:bundle-budget
```

`CI=1` 使媒体优化生命周期与 CI 一样跳过；设置 `OPTIMIZE_MEDIA=1` 会显式强制优化媒体，因此这两种数据不适合直接比较。构建目标、Node/pnpm 版本和环境变量应一致。

## 详细归因

如需 Bundle Analyzer 的可视化模块树，运行：

```bash
pnpm run analyze:build
```

组件库使用独立分析命令：

```bash
pnpm run build:lib:analyze
```

分析报告用于查找优化方向；只有 entrypoint/asset 预算是 CI 门禁。具体性能优化建议见[构建与包体优化说明](./build-and-bundle-optimizations.md)。
