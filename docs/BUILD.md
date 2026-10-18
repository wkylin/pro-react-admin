# Vite 构建

应用、多项目、微前端、组件库和 Storybook 均使用 Vite。应用配置在 `vite.config.ts`；组件库在 `vite.config.lib.ts`；Storybook 使用独立的 `.storybook/vite.config.ts` 与 `.storybook/main.ts`。

## 入口与环境

`PROJECT` 按 `src/projects/registry.json` 选择源码入口、路由和输出目录。默认应用输出 `dist`，其他项目使用注册表登记的目录。`config/path-aliases.json` 是共享别名来源，`@routers` 按项目选择；`@app` 始终指向共享应用层。

| 变量                   | 用途                                                          |
| ---------------------- | ------------------------------------------------------------- |
| PROJECT                | default、enterprise、projectA、projectB、shell 或新增注册项目 |
| PUBLIC_URL / VITE_BASE | HTML、资源和微前端的部署基路径                                |
| VITE_OUT_DIR           | 可选覆盖输出，限制在仓库内的 dist* 或 artifacts/              |
| MFE_ROLE               | host 或 remote，启用 Module Federation                        |
| PORT                   | 开发服务器端口，普通应用与宿主默认 8080，Remote 使用登记端口  |
| SENTRY_SOURCE_MAP      | map 生成隐藏 source map；有上传 token 时启用 Sentry 上传      |
| VITE_BUILD_STATS       | 构建统计 JSON 的文件路径                                      |
| USE_ANALYZE            | 1 生成产物目录中的 stats.html                                 |
| ZIP_DIST               | 1 将完整产物归档到 dist-zip/                                  |
| OPTIMIZE_MEDIA         | 1 在 CI 中显式运行媒体优化                                    |
| DEBUG_PROD             | 1 关闭压缩并生成 source map                                   |

Vite 的 `--mode` 选择 `.env`、`.env.local`、`.env.<mode>` 和 `.env.<mode>.local`。显式进程变量优先。生产转换由 Vite build 管理；`build:dev` 与 `build:test` 使用对应环境文件生成静态产物。

浏览器获得 `build/client-env.js` 的白名单值和 Vite 原生的 `VITE_*` 公开变量。凭据保留在构建进程或服务端；本地 API 代理在 `build/dev-proxy.ts` 中配置。Enterprise 项目命令默认使用真实授权，演示构建需显式设置 `REACT_APP_USE_MOCK=true`。

## 命令

```bash
pnpm start
pnpm run build:production
pnpm run preview
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run project:build enterprise --stats
pnpm run build:lib
pnpm run build-storybook
pnpm run build:mf:vercel
pnpm run build:pages
```

`build:production` 的 prehook 本地运行媒体优化，CI 默认跳过；FFmpeg 安装见[媒体指南](FFMPEG_INSTALLATION.md)。`build` 的 prehook 更新依赖展示数据。直接调用 Vite CLI 时需自行执行需要的生成步骤。

普通构建生成内容哈希资源、`version.json`、`sw.js`、gzip 和 Brotli 文件。Service Worker 预缓存排除版本文件和 source map。微前端输出 ESM `remoteEntry.js` 和版本兼容契约 `remote-manifest.json`，宿主通过联邦运行时加载并校验契约。

组件库按 `config/library-contract.mjs` 输出各组件的 ESM、CommonJS 和统一 `style.css`；TypeScript 生成 `packages/wui-react/dist/types`，公开包结构与校验流程见[发布指南](LIBRARY_PUBLISH_GUIDE.md)。

`build:pages` 根据 Pages 计划构建所选应用、微前端和 Storybook，组合到 `dist-combined`。单独检查主应用的 Pages 子路径可运行 `build:pages:app`，输出 `dist-pages`。

## 体积与预览验证

`build:stats` 输出 `build-stats.json`；`project:build <project> --stats` 输出 `build-<project>-stats.json`。统计包括 Vite 生成的 JS/CSS 资源、大小和入口的静态依赖列表。`check:bundle-budget` 按 `config/bundle-budget.json` 检查初始体积、单资源体积及可选的总大小，使用原始字节数。

`pnpm run verify:vite:preview` 启动 Vite preview 并检查 HTML、静态资源、版本文件和 Service Worker。也可传 `--static-only` 只检查文件。预览与构建使用相同的 `PROJECT`、`PUBLIC_URL` 和 `VITE_OUT_DIR`。

项目与交付的更多说明见[多项目](MULTI_PROJECT.md)、[微前端](MFE_DEPLOYMENT.md)、[Storybook](STORYBOOK.md)和[部署](DEPLOY.md)。
