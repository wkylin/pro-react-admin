# 应用构建

默认使用 Webpack；`BUILD_TOOL=vite` 或工程命令的 `--bundler=vite` 可以选择 Vite。两套构建器共用项目注册表、源码入口和显式浏览器变量白名单。浏览器业务代码统一调用 `src/platform/config/env.ts`，不直接选择 Webpack 的 `process.env` 或 Vite 的 `import.meta.env`；两个应用构建都向该入口注入 `__APP_ENV__`。发布脚本目前仍以 Webpack 为默认，切换部署构建器时应显式设置 `BUILD_TOOL` 并核对目标目录。

`build/webpack/` 保存 Webpack 应用、组件库配置和 HTML 模板；`build/vite/` 保存 Vite 应用、组件库配置和 HTML 入口。`build/` 根目录的别名、浏览器变量和 Federation 辅助代码由两套配置共用。`public/` 仅存放静态资源，业务项目入口及路由放在 `src/projects/`，新项目由注册表解析，不需要复制构建配置。

## 入口与环境

`build/webpack/webpack.common.js` 提供规则、aliases、shared chunks 与通用插件；`webpack.dev.js` 管理开发服务器；`webpack.prod.js` 管理生产优化、产物与可选插件；`webpack.lib.js` 独立构建 UI 包。

PROJECT 按 src/projects/registry.json 选择源码入口与输出，未知项目立即失败。生产文件缓存按项目、MFE 角色和 BUILD_GOAL 隔离，aliases、浏览器变量与 Remote URL 参与缓存版本，避免连续构建复用其它项目的路由。Webpack 用 BUILD_GOAL 选环境模式；Vite 默认使用 development/production mode，显式 BUILD_GOAL 会转成 `--mode`。NODE_ENV 控制生产转换；不是在浏览器运行时切项目。

环境文件依次覆盖：`.env`、`.env.local`、`.env.<mode>`、`.env.<mode>.local`，已由 shell/CI 注入的变量优先于文件。`.env` 存放公开演示与本地预览默认值；生产差异放在 `.env.production`，本地文件不提交。`build:dev`、`build:test` 使用共享默认值，无需空的模式文件。API 的 Node 启动命令只读取其明确指定的 `.env.development.local`，不会自动读取浏览器构建文件。需要把新变量给组件使用时，先审核并加入 `build/client-env.js` 白名单，再通过 `getEnv`/`getEnvBool`/`getEnvNumber` 读取；构建凭据不得加入白名单。

| 变量                     | 用途                                                                |
| ------------------------ | ------------------------------------------------------------------- |
| PROJECT                  | 登记的项目，包括 default / enterprise / projectA / projectB / shell |
| BUILD_GOAL               | development、production、test、dev 等构建环境                       |
| PUBLIC_URL               | HTML 与静态资源基路径                                               |
| MFE_ROLE                 | host 或 remote，开启 Federation 配置                                |
| SENTRY_SOURCE_MAP        | no 关闭，map 启用对应 sourcemap 路径                                |
| STATS_ONLY / USE_ANALYZE | 统计与分析构建                                                      |
| DIST_ZIP                 | 可选归档产物                                                        |
| OPTIMIZE_MEDIA           | CI 中显式启用媒体优化                                               |

浏览器只获得 `build/client-env.js` 白名单变量，见[参考](../reference/PROJECT_REFERENCE.md)。Vite 原生仍支持 `import.meta.env.VITE_*`，但项目组件不使用它，避免另开一套配置契约；Webpack 的 `process.env` 替换仅保留给兼容依赖。Sentry 上传 token、管理 token、私钥均为构建或服务端凭据，不能注入客户端。

## 命令

`package.json#scripts` 按生命周期、开发、应用构建、构建分析、Storybook、组件库、预览、测试、质量、生成、部署/API 和维护顺序排列。运行 `pnpm run check:scripts` 可逐项检查 shell 语法、脚本引用、配置文件与本地 CLI；`node scripts/check-package-scripts.mjs --report` 将每项结果写入被 Git 忽略的 `artifacts/scripts/validation.json`。这是静态检查，发布、部署、版本变更和清理命令仍需在对应环境按实际目的执行。

```bash
pnpm run build:production
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run serve:dist
```

`build:production` 的 prehook 本地运行媒体优化，CI 默认跳过（`OPTIMIZE_MEDIA=1` 可强制）；FFmpeg 说明见[媒体](./FFMPEG_INSTALLATION.md)。`build:stats` 关闭 Sentry 上传，并生成 `artifacts/build/webpack/default/stats.json` 与可交互的 `report.html`。前者供体积门禁读取，后者供浏览器检查模块/包占比。`artifacts/` 被 Git 忽略，不进入部署目录。直接调用 Webpack 不会执行 pnpm prehooks。

统一工程入口支持 `pnpm run project:build enterprise --stats`，将当前项目产物与 `artifacts/build/webpack/enterprise/{stats.json,report.html}` 同时生成。构建计划、doctor、dry-run、项目脚手架及预览共享注册表解析，见[多项目](./MULTI_PROJECT.md)。

### Vite

```bash
pnpm run dev:vite
pnpm run build:vite
pnpm run preview:vite
pnpm run test:e2e:vite
pnpm run project:build enterprise --bundler=vite
BUILD_TOOL=vite pnpm run build:mf:vercel
```

`dev:vite` 会同时启动 Vite 与本地 API，开发埋点和 GitHub 演示登录使用同一代理端口；只需前端时运行 `BUILD_TOOL=vite pnpm run start:web`。

`BUILD_TOOL=vite pnpm run serve:dist` 和 `test:e2e:vite` 读取 `dist-vite`，默认 Webpack 预览与测试读取 `dist`。

Vite 默认应用输出 `dist-vite`，其它项目输出 `dist-vite-<项目名>`；预览端口为 5174。构建 Pages 或聚合微前端时，脚本会按部署契约设置 `VITE_OUT_DIR`。`--stats` 生成 `artifacts/build/vite/<项目名>/stats.json` 和可交互的 `report.html`；`check:bundle-budget` 当前只读取 Webpack stats。运行 `pnpm run analyze:build:vite` 可分析默认 Vite 应用。Storybook 与组件库的双构建命令见 [Storybook](./STORYBOOK.md) 和 [组件库构建](../deployment/LIBRARY_PUBLISH_GUIDE.md)。

旧根目录的 `build-stats.json` 是一次构建的静态体积快照，既不是配置，也不会随新代码更新，已删除。重新运行 `build:stats` 或 `build:stats:vite` 生成本次结果；两种分析图分别由仓库已安装的 `webpack-bundle-analyzer` 与 `rollup-plugin-visualizer` 生成。运行 `pnpm run analyze:report` 后访问 `http://localhost:8766/webpack/default/report.html` 或 `/vite/default/report.html`；HTML 文件也可以直接在浏览器打开。

### Sentry 发布

生产上传显式设置 `SENTRY_SOURCE_MAP=map` 和服务端 `SENTRY_AUTH_TOKEN`；Webpack 可运行 `pnpm run build:production`，Vite 可运行 `SENTRY_SOURCE_MAP=map pnpm run build:vite`。两个插件使用同一个 `SENTRY_RELEASE`（未设置时为 `pro-react-admin@<package version>`），注入 Debug ID、上传应用 JS/source map，并在上传后删除输出目录中的 `.map`。Vite 的 Serwist service worker 在插件上传后生成，其独立 map 会在归档前删除，不计入 Sentry 应用源码上传。缺少 token 或上传失败时构建会失败；失败构建的产物不得部署。`SENTRY_ORG`、`SENTRY_PROJECT` 和浏览器 DSN 来自生产环境文件，`SENTRY_URL` 可选，用于指定 Sentry 实例或组织域名。本机连接 `sentry.io` 的上传中断时，已验证 `SENTRY_URL=https://wkylin.sentry.io` 可完成上传。token 只放在 CI secret 或本机被 Git 忽略的 `.env.production.local`，不写入仓库。只在已验证的构建产物上部署；线上事件需到 Sentry 对应项目确认。运行时采集条件见[可观测性](../operations/OBSERVABILITY.md)。

开发与生产构建共用单行 WebpackBar reporter：终端中只显示百分比、进度条与构建阶段，使用 Webpack 的状态日志在原行更新并按终端宽度截短，不输出 loader 和模块路径。百分比是 Webpack 的阶段估算，显示值在单次构建中保持递增，重新编译时归零。开发服务器地址、警告和错误照常输出；状态日志负责清除、恢复进度行，避免重绘已有日志。CI、非 TTY 和 TERM=dumb 环境只记录构建开始与结束，不输出逐阶段进度；进度写入 stderr，不污染 stdout 的 stats JSON。

## 体积与加载

展示路由使用 @loadable/component，认证与管理模块使用 React.lazy 按需加载。企业项目使用自己的路由树，避免导入展示路由清单。首页与作品集现在也是异步入口；shared/vendor 分块会影响实际初始加载，所以仅添加 lazy 不足以证明减小首屏。

config/bundle-budget.json 保存原始 JS/CSS 预算。check-bundle-budget 从 entrypoint 汇总初始体积，并对全部 JS/CSS（含异步 chunk）检查单资源预算。它不包含图片、视频、source map，不是 gzip 大小。更新预算需先比较新的 stats 和加载行为。本次门禁按新结果收紧为展示初始 3.2 MiB、企业初始 3 MiB、单资源 3 MiB；企业全部 JS/CSS 另有 5 MiB 限额；stats 显式列出缓存资源，避免隐藏分组漏检异步 chunk。

Sentry 在启用时动态导入；设置抽屉、鼠标与轨迹效果按需加载且装饰默认关闭。入口体积仍需汇总所有共享 chunk，不能把压缩前产物等同于首屏速度。

项目、aliases、路由、文档和 import 边界检查见[质量门禁](./QUALITY.md)。构建成功仍需浏览器验证懒加载、权限与缓存。
