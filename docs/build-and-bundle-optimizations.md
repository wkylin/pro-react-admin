# Vite 构建与资源优化

应用构建统一使用 Vite，配置集中在 vite.config.ts。

## 构建分析

构建分析由 rollup-plugin-visualizer 生成：

    pnpm run analyze:build

报告写入当前 Vite 输出目录。设置 PROJECT 可分析子项目，设置 VITE_OUT_DIR 可指定单独的产物目录。

## 静态资源

生产构建通过 vite-plugin-compression 额外生成 gzip 和 Brotli 文件，不删除原始资源。媒体素材可在构建前通过 optimize:media 脚本压缩；CI 默认跳过媒体重写，可设置 OPTIMIZE_MEDIA=1 强制执行。

    pnpm run optimize:media
    pnpm run build:production

## 代码分块

主应用的 manualChunks 将 React、Ant Design、Zustand 和 HLS 依赖按组拆分。Module Federation 构建关闭这项手动拆分，由联邦运行时管理共享模块和远程边界。

## 部署产物

默认应用输出到 dist，项目构建输出到 dist-<project>。GitHub Pages 使用 build:pages 生成带子路径 base 的产物。Vercel 微前端聚合构建由 build:mf:vercel 生成 dist-vercel。

更改部署命令或输出目录前，请同步核对 GitHub Actions 和 Vercel 项目面板中的配置。
