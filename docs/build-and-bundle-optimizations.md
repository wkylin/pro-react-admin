# 构建与包体优化说明（Pro React Admin）

本文档用于记录本项目已落地的构建/部署优化，以及仍建议继续推进的体积治理方向。

## 目标与约束

- **目标**：减少生产构建体积与静态资源体积，降低首屏加载开销与 Webpack performance 警告。
- **约束**：
  - 资源路径与文件名尽量保持稳定（避免影响业务引用）。
  - GitHub Pages（子路径 `/pro-react-admin/`）与 Vercel（根路径 `/`）都能正常访问。

## 已落地优化（当前仓库实际存在）

### 1) 清理未使用代码

- 删除了无引用的权限目录（`src/permission`）。
- 影响：减少冗余代码与潜在误用点；对运行时无副作用。

### 2) 图片资源压缩（生产构建）

- 位置：`webpack/webpack.prod.js`
- 做法：引入 `ImageMinimizerPlugin`（sharp 实现）对 `png/jpg/gif/webp/avif` 做生产期压缩。
- 关键点：配置了 `loader: false` 避免 Webpack 5 下可能出现的 asset info 冲突。
- 影响：
  - 生产构建耗时略增加（CI 首次安装 sharp 也会略慢）。
  - 输出图片体积显著降低（具体取决于原始素材质量）。

### 3) 音视频资源压缩（生产/CI 可运行的离线脚本）

- 脚本：`scripts/optimize-media.mjs`
- 产物目录：
  - `src/assets-optimized/audio`
  - `src/assets-optimized/video`
  - `public-optimized/audio`

#### 3.1 构建时“优先使用优化产物”，并保持引用路径不变

- 位置：`webpack/webpack.prod.js` + `webpack/webpack.common.js`
- 做法：
  - 若检测到优化目录存在，则在生产构建中通过 alias 优先解析：
    - `@assets/audio` → `src/assets-optimized/audio`
    - `@assets/video` → `src/assets-optimized/video`
  - 通过 `CopyWebpackPlugin` 将 `public-optimized/audio` 复制到 `dist/audio`，保证最终站点对外路径不变。

#### 3.2 build hook（默认行为）

- 位置：`package.json`
- 做法：在 `build:production` / `build:production:zip` 前通过 npm 的 `prebuild:*` 钩子运行 `optimize:media`。
- 影响：
  - 本地构建体验：更“自动化”，但构建前会多一次扫描与压缩流程。
  - CI（GitHub Actions）/ Vercel：如果每次都跑压缩会显著拉长构建时间（且压缩结果不一定会被缓存命中）。

> 建议：如果你希望 CI 只复用已提交的 `*-optimized` 产物，可以将该 hook 改为“CI 默认跳过、需要时用环境变量强制运行”（见本文末尾“建议继续推进”）。

### 4) GitHub Pages 部署链路

- Workflow：`.github/workflows/deploy-gh-pages.yml`
- 特点：
  - push 到 `main` 自动构建并部署
  - 同时构建主应用与 storybook
  - 通过 `PUBLIC_URL=/pro-react-admin`、`STORYBOOK_BASE_HREF=/pro-react-admin/storybook/` 来适配子路径

## 对部署（Vercel + GitHub Pages）的影响总结

### GitHub Pages

- 路径形态：站点在 `/pro-react-admin/` 子路径下。
- 受影响点：
  - `PUBLIC_URL` / Storybook base href 的正确性
  - 生产 `publicPath`（Webpack 中使用相对路径 `./`）对静态资源引用更稳健
  - 若 CI 每次运行音视频压缩：构建时间与失败概率上升（ffmpeg、文件系统、缓存命中率等因素）

### Vercel

- 路径形态：一般为根路径 `/`。
- 受影响点：
  - 如果 Vercel 使用 Webpack 构建，需要确保它执行的是 `npm run build:production`
  - 若 Vercel 构建阶段运行音视频压缩：会增加构建耗时；并且 Vercel 的缓存策略可能导致压缩收益不稳定

## 建议继续推进（未必已在当前仓库落地）

> 下面是“包体/首包”治理的常见下一步方向，是否落地请以当前代码为准。

### A) CI 默认跳过音视频压缩（推荐）

动机：GitHub Actions/Vercel 的构建通常更希望“快且可重复”，而压缩属于离线资产加工，更适合：
- 本地开发/专门的 asset pipeline 运行
- 或者只在需要更新素材时才运行（通过手动触发/环境变量强制）

建议策略：
- CI 环境检测到 `CI=true` / `GITHUB_ACTIONS=true` / `VERCEL=1` 时，跳过 `optimize:media`
- 通过 `OPTIMIZE_MEDIA=1` 强制开启

### B) 首包（app chunk）大依赖拆分

常见大头：
- `antd` / `@ant-design/icons`（barrel import 容易把聚合入口带进首包）
- `lucide-react`（从包入口导入多个图标时，容易把图标集合带进首包）
- `html2canvas`（截图/PDF 导出这类能力不应进入首屏）
- `react-markdown` + `remark/rehype` + `katex/highlight`（仅 markdown 页面需要）

建议手段：
- 图标改为“单文件导入”或“按图标模块导入”
- 将 `html2canvas`、markdown/katex runtime 改为动态 import（按页面或按功能触发加载）
- 收敛路由 preload（避免重页面被预取进首包）

## 如何验证优化是否生效

- 资源体积：对比 `dist/` 目录中图片/音视频体积（尤其是 `dist/static/js` 与 `dist/images`、`dist/audio`）。
- Webpack performance：观察生产构建输出的 performance hints。
- 包体归因：使用 `npm run analyze:build` / `npm run analyze:stats` 生成 stats，再按 entrypoint/app chunk 追踪主要模块来源。

