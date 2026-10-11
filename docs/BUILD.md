# Webpack 构建

## 入口与环境

webpack.common.js 提供规则、aliases、shared chunks 与通用插件；webpack.dev.js 管理开发服务器；webpack.prod.js 管理生产优化、产物与可选插件；webpack.lib.js 独立构建 UI 包。

PROJECT 按 src/projects/registry.json 选择源码入口与输出，未知项目立即失败。生产文件缓存按项目、MFE 角色和 BUILD_GOAL 隔离，aliases、浏览器变量与 Remote URL 参与缓存版本，避免连续构建复用其它项目的路由。BUILD_GOAL 选择环境文件与目标，NODE_ENV 控制生产转换；不是在浏览器运行时切项目。

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

浏览器只获得 webpack/client-env.js 白名单变量，见[参考](PROJECT_REFERENCE.md)。Sentry 上传 token、管理 token、私钥均为构建或服务端凭据，不能注入客户端。

## 命令

```bash
pnpm run build:production
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run serve:dist
```

build:production 的 prehook 本地运行媒体优化，CI 默认跳过（OPTIMIZE_MEDIA=1 可强制）；FFmpeg 说明见[媒体](FFMPEG_INSTALLATION.md)。build:stats 生成 compilation-stats.json，关闭 Sentry sourcemap 上传，用于体积门禁。直接调用 Webpack 不会执行 pnpm prehooks，需要自行维护生成数据和媒体。

统一工程入口支持 `pnpm run project:build enterprise --stats`，将当前项目产物与 compilation-enterprise-stats.json 同时生成。构建计划、doctor、dry-run、项目脚手架及预览共享注册表解析，见[多项目](MULTI_PROJECT.md)。

开发与生产构建共用单行 WebpackBar reporter：终端中只显示百分比、进度条与构建阶段，使用 Webpack 的状态日志在原行更新并按终端宽度截短，不输出 loader 和模块路径。百分比是 Webpack 的阶段估算，显示值在单次构建中保持递增，重新编译时归零。开发服务器地址、警告和错误照常输出；状态日志负责清除、恢复进度行，避免重绘已有日志。CI、非 TTY 和 TERM=dumb 环境只记录构建开始与结束，不输出逐阶段进度；进度写入 stderr，不污染 stdout 的 stats JSON。

## 体积与加载

展示路由使用 @loadable/component，认证与管理模块使用 React.lazy 按需加载。企业项目使用自己的路由树，避免导入展示路由清单。首页与作品集现在也是异步入口；shared/vendor 分块会影响实际初始加载，所以仅添加 lazy 不足以证明减小首屏。

config/bundle-budget.json 保存原始 JS/CSS 预算。check-bundle-budget 从 entrypoint 汇总初始体积，并对全部 JS/CSS（含异步 chunk）检查单资源预算。它不包含图片、视频、source map，不是 gzip 大小。更新预算需先比较新的 stats 和加载行为。本次门禁按新结果收紧为展示初始 3.2 MiB、企业初始 3 MiB、单资源 3 MiB；企业全部 JS/CSS 另有 5 MiB 限额；stats 显式列出缓存资源，避免隐藏分组漏检异步 chunk。

Sentry 在启用时动态导入；设置抽屉、鼠标与轨迹效果按需加载且装饰默认关闭。入口体积仍需汇总所有共享 chunk，不能把压缩前产物等同于首屏速度。

项目、aliases、路由、文档和 import 边界检查见[质量门禁](QUALITY.md)。构建成功仍需浏览器验证懒加载、权限与缓存。
