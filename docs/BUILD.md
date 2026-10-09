# Webpack 构建与本地开发

Webpack 5 是当前仓库唯一的应用构建工具。开发服务器、生产应用、多项目、Module Federation 和组件库使用仓库的 Webpack 配置；Storybook 使用 Webpack 5 builder。

## 环境要求

- Node.js 24.x
- pnpm 11.5.2

```bash
pnpm install
pnpm start
```

默认主应用在 8080 附近启动，实际端口以终端为准。完整首次运行步骤见[新手入门](./GETTING_STARTED.md)。

## 构建配置

| 文件 | 职责 |
| --- | --- |
| src/projects/registry.json | 项目入口、路由目录、产物目录和 Remote 元数据单一清单 |
| config/path-aliases.json | Webpack、TypeScript、Storybook、组件库共用的路径别名清单 |
| webpack/paths.js | 校验 PROJECT，并按注册表选择入口、路由/public 和产物目录 |
| webpack/webpack.common.js | 公共 Webpack 规则、项目 alias 覆盖、dotenv 加载与 MF 插件 |
| webpack/webpack.dev.js | 开发模式、HMR、代理和 Webpack Dev Server |
| webpack/webpack.prod.js | 生产压缩、代码分割、资源复制、PWA、Sentry 与产物 |
| webpack/mfe.config.js | 校验 Remote URL，并安全生成 Module Federation loader |
| webpack/remote-manifest-plugin.js | 为 Remote 输出协议、版本和共享依赖清单 |
| scripts/project-command.mjs | 从项目注册表解析统一的多项目/微前端命令 |
| webpack/client-env.js | 浏览器环境变量 allowlist 和敏感名称拒绝规则 |
| webpack/webpack.lib.js | @w.ui/wui-react 的 ESM、UMD/CJS 和子路径构建 |
| .storybook/main.ts | Storybook Webpack 5 builder、共享 alias 和 Less |

修改 config/path-aliases.json 后运行 `pnpm run sync:aliases`，生成供 TypeScript 编辑器读取的 tsconfig.paths.json。Webpack、Storybook 和组件库直接读取同一清单；CI 会检查生成文件和所有路径。

## 常用命令

```bash
# 本地应用
pnpm start
pnpm start:projectA
pnpm start:projectB
# 通用入口：新增项目无需再复制 Webpack 命令
pnpm run project:dev -- projectA

# 生产应用
pnpm run build:production
pnpm run build:production:projectA
pnpm run build:production:projectB
pnpm run project:build -- projectB
pnpm run serve:dist

# Storybook
pnpm run storybook
pnpm run build-storybook
pnpm run serve:storybook

# 组件库
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
```

普通主应用输出到 dist/，普通项目输出到 dist-<project>/；MF 输出到 dist-shell/、dist-projectA/ 和 dist-projectB/；聚合 Vercel 输出到 dist-vercel/。组件库输出到 dist-lib/，Storybook 输出到 storybook-static/。

## 环境变量

BUILD_GOAL 选择 dotenv 文件：

| BUILD_GOAL | 文件 |
| --- | --- |
| development 或未设置 | .env.development |
| production | .env.production |
| dev | .env.dev |
| test | .env.test |

.env.<goal>.local 是 Git 忽略的本机覆盖文件，例如 .env.development.local。Webpack 的读取顺序是命令行/CI 环境变量、local 覆盖、基础 .env.<goal> 文件。webpack/client-env.js 是唯一浏览器变量白名单；DefinePlugin 会把清单中的值写进 bundle。SENTRY_AUTH_TOKEN 等构建凭据不得加入客户端清单。实际变量读取入口是 src/utils/env.ts。

PUBLIC_URL 决定普通生产资源的 publicPath；Webpack 会规范成带斜杠的路径。Module Federation 下 publicPath 使用 auto，Remote 部署仍需核对自身 chunk 地址、远程入口 URL 和响应头。

## 项目注册表和生成契约

src/projects/registry.json 驱动项目入口选择、端口、MFE URL、协议版本和 Remote imports。改动 Remote 清单后运行：

```bash
pnpm run sync:project-contracts
pnpm run check:project-registry
pnpm run check:project-contracts
```

Remote 构建会生成 remote-manifest.json。Shell 先读取 manifest，检查 Remote 名称和协议版本，再加载 remoteEntry.js；网络或脚本失败时会重试一次，15 秒总超时后进入降级页。聚合构建完成后 `pnpm run check:mfe-artifacts` 会检查 Shell、Remote 入口和 manifest。

## CI 与构建预算

Webpack CI 执行注册表/别名/生成契约、Vercel build/header 检查，运行 Jest、主应用生产构建和 Playwright，独立构建 Storybook 与 MFE 聚合产物。MFE Playwright 流程覆盖 Remote manifest 校验、加载成功、失败重试和降级状态。主应用构建会生成 `compilation-stats.json` 并检查首屏 JS/CSS 预算；CI 将实际 stats 保存为 14 天 artifact。预算定义在 `config/bundle-budget.json`，与 Webpack 默认 6 MiB entrypoint/asset 上限一致。

## 生产构建的媒体优化钩子

运行 build:production 前会触发 prebuild:production。开发者本机默认执行 scripts/optimize-media.mjs，生成被 Git 忽略的 src/assets-optimized 和 public-optimized；GitHub Actions/Vercel 检测到 CI 环境时默认跳过。设置 OPTIMIZE_MEDIA=1 可强制执行。SKIP_OPTIMIZE_MEDIA 不是当前脚本支持的开关。

## Storybook

Storybook 运行方式、story 结构、decorator 和子路径部署见[Storybook 指南](./STORYBOOK.md)。默认开发地址 6006，静态目录为 storybook-static/。
