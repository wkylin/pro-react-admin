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

### 5) 生产构建兼容性修复 (ESM/Webpack)

部分现代化库（如 `mermaid`, `remark-math`）默认提供 ESM 产物，但在 Webpack 生产构建流程中可能因 `import.meta` 或模块互操作性（Interop）问题导致报错。

- **Mermaid**:
  - **问题**：直接 `import('mermaid')` 会引入依赖 `import.meta.url` 的源码，导致 Webpack 构建警告或运行时错误。
  - **解决方案**：强制引入预编译的 UMD/Minified 版本：

    ```javascript
    import('mermaid/dist/mermaid.min.js')
    ```

- **Remark/Rehype 插件**:
  - **问题**：在生产模式下，动态导入的插件可能被包装为 Module Namespace 对象（`{ default: fn, ... }`），直接作为函数调用会导致崩溃。
  - **解决方案**：在使用前进行兼容性解包：

    ```javascript
    const plugin = importedPlugin?.default || importedPlugin;
    ```

## 本次构建体积分布（2026-03-09）

本节基于以下命令的实际产物与 stats 分析：

```bash
SKIP_OPTIMIZE_MEDIA=1 npm run build:production
```

### 主要超大产物

- `dist/static/js/app.*.js`：约 5.0 MiB（gzip 后约 1.5 MiB）
- `dist/static/js/9861.*.js`：约 2.9 MiB，对应 `mermaid/dist/mermaid.min.js`
- `dist/static/js/6416.*.js`：约 1.2 MiB（未压缩约 4.25 MiB），对应 `echarts/index.js + 571 modules`
- `dist/static/js/vendor-hls.*.js`：约 528 KiB，对应 `hls.js/dist/hls.mjs`
- `dist/d52ec1a71b0b003c7892.mjs`：约 1.0 MiB，对应 `pdfjs-dist/build/pdf.worker.min.mjs`
- `dist/images/732165aa59baa0e9674e.mp4`：约 4.2 MiB，对应 `src/assets-optimized/video/trailer.mp4`
- `dist/images/3b69854a302e6128ab4d.mp3`：约 4.0 MiB，对应 `src/assets-optimized/audio/longnight.mp3`
- `dist/images/2c1a073543dd765ee06c.mp3`：约 3.9 MiB，对应 `src/assets-optimized/audio/yesterday.mp3`
- `dist/images/45067c353c9c3e4ed796.mp3`：约 3.5 MiB，对应 `src/assets-optimized/audio/hearty.mp3`
- `dist/images/2152655c1d61800e86a3.mp3`：约 2.0 MiB，对应 `src/assets-optimized/audio/heart-of-the-sea.mp3`
- `dist/images/f5fb3175e80af3f631cc.png`：约 1.4 MiB，对应 `src/assets/images/spring.png`
- `dist/images/916ddb5adf113a8dd7a3.png`：约 1.1 MiB，对应 `src/assets/images/he.png`
- `dist/images/695c6a7e4d55286b3565.png`：约 1.0 MiB，对应 `src/assets/images/song.png`
- `dist/images/9ce539741014a14d8c0c.png`：约 909 KiB，对应 `src/assets/images/xue.png`

### 主要来源归因

#### 1) 音频资源块过大

- 来源：`src/components/stateless/FixMusicPlayer/data/songs.js`
- 影响：`ReactMusic` 页面对应 chunk 里直接带入 4 首本地 mp3，总体超过 14 MiB。
- 现状：`songs.js` 在模块顶层直接 import 本地音频与封面图，构建时会稳定打进产物。

#### 2) 视频资源块过大

- 来源：`src/pages/video/index.jsx` 与 `src/components/stateless/LandingPage/index.jsx`
- 影响：同一份 `trailer.mp4` 约 4.2 MiB，且属于本地静态资源，不经过自适应码率或 CDN 流式分发。

#### 3) 首页同步带入 PDF Worker

- 来源：`src/pages/home/index.jsx` 同步 import `InteractiveBook`
- 影响：额外产出约 1.0 MiB 的 `pdf.worker.min.mjs`，即使用户不打开 PDF 书籍功能，也会随站点发布。

#### 4) ChatGPT 页面块偏重

- 来源：`src/pages/chatgpt/index.jsx`
- 主要组成：
  - 页面自身及关联模块约 1.5 MiB
  - Mermaid 独立 chunk 约 2.9 MiB
  - `react-markdown` / `remark-parse` / `remark-rehype` / `unified` 等 markdown 管线被拉入公共路径

#### 5) ECharts 使用全量入口

- 来源：`src/pages/echarts/index.jsx`
- 现状：当前打入的是 `echarts/index.js + 571 modules`，未做按需引入。

#### 6) 菜单 hover 预加载会放大“懒加载页面”的实际网络成本

- 触发点：`src/pages/layout/proSecNav/index.jsx`
- 现状：菜单项 hover 时会执行 `comp.preload()` 与页面模块预取。
- 影响：即便页面路由本身是懒加载，用户悬停菜单后仍可能提前下载 `ChatGpt`、`Echarts`、`ReactMusic`、`MyVideo` 等重页面资源。

## 具体瘦身建议

### 优先级 P0：先处理媒体资源

- 将 `FixMusicPlayer` 的歌曲清单从“顶层静态 import”改为“元数据 + 点击时再解析 URL / 拉取资源”。如果这些资源只是演示素材，优先改成外链/CDN。
- 对 `trailer.mp4` 改成更低码率版本，至少补一份 `webm` 或更低分辨率资源。若只是展示页背景视频，优先提供 poster，滚动到可视区域或用户点击后再加载。
- 将 `spring.png`、`he.png`、`song.png`、`xue.png` 转成 `webp/avif`，并按展示尺寸重新导出。它们目前在首页、Demo、Tilt、FeatureAny、AutoSlider 等多个位置复用，体积收益会立刻体现。

### 优先级 P1：减少默认路径上的重功能

- 将首页里同步引入的 `InteractiveBook` 改成真正的动态加载，避免默认构建始终产出并暴露 1 MiB 的 PDF worker。
- 将 `ChatGpt` 页里的 Mermaid 能力再拆一层：只有检测到 Mermaid 代码块或用户打开 Mermaid 面板时再加载 Mermaid。当前虽然 Mermaid 已是独立 chunk，但菜单预加载会放大实际下载成本。
- 评估 `src/pages/layout/proSecNav/index.jsx` 的 hover 预加载策略，至少把 `ChatGpt`、`Echarts`、`ReactMusic`、`MyVideo`、`BigScreen` 这类重页面从自动预取名单里拿掉。

### 优先级 P2：收缩第三方库体积

- `echarts` 改成按需注册方式，不再使用全量入口。目标是只引入当前图表页实际使用的 chart、component、renderer。
- `lodash` 当前进入 `vendor` 的是整包 `lodash/lodash.js`。优先替换为按方法导入，或迁移到 `lodash-es` 并交给 tree-shaking。
- `hls.js` 已经被拆成独立 chunk，方向基本正确。后续只需避免非 HLS 场景触发预加载即可。

## 建议的落地顺序

1. 先处理本地音频与视频资源。
2. 再把首页 `InteractiveBook` 改成动态加载。
3. 再缩减菜单 hover 预加载名单。
4. 最后做 `echarts` 与 `lodash` 的代码级瘦身。

## 依赖回退说明：filemanager-webpack-plugin 10.0.0

### 结论

- 当前仓库应保持 `filemanager-webpack-plugin` 为 `^9.0.1`。
- 不要升级到 `10.0.0`，除非上游重新发布修复版本并验证通过。

### 回退原因

- 本项目的 Webpack 生产配置文件 `webpack/webpack.prod.js` 是 ESM。
- `filemanager-webpack-plugin@10.0.0` 的 npm 发布包中实际包含的是 `dist/index.mjs`，但其 `package.json` 却将 `import`/`module` 入口声明为 `dist/index.js`。
- 结果是：Webpack CLI 在加载 ESM 配置时会直接报错，无法解析该插件入口。

典型报错如下：

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../node_modules/filemanager-webpack-plugin/dist/index.js'
Did you mean to import "filemanager-webpack-plugin/dist/index.cjs"?
```

### 为什么回退到 9.0.1

- `9.0.1` 的发布包同时包含 `dist/index.js` 与 `dist/index.cjs`，其包元数据与实际产物一致。
- 在该版本下，`webpack/webpack.prod.js` 可以继续使用标准 ESM 写法：

```javascript
import FileManagerPlugin from 'filemanager-webpack-plugin'
```

### 升级前检查建议

如果后续需要重新评估升级，请先确认两点：

1. `npm pack filemanager-webpack-plugin@<version>` 解包后，ESM 入口文件是否真实存在。
2. `SKIP_OPTIMIZE_MEDIA=1 npm run build:production` 是否可以无兼容补丁直接通过。

