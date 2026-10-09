# 部署说明

当前 Webpack 5 是应用唯一构建工具。普通主应用和 Storybook 由 GitHub Pages 工作流部署；Module Federation 可以在 Vercel 上聚合部署，也可以将 Shell/Remote 分别部署。

## GitHub Pages

.github/workflows/deploy-gh-pages.yml 只在 push 到 main 或手动触发时运行。工作流使用 Node 24、pnpm 11.5.2，构建默认主应用与 Storybook，再把 Storybook 放到站点的 storybook/ 子目录。

- 主应用： https://wkylin.github.io/pro-react-admin/
- Storybook： https://wkylin.github.io/pro-react-admin/storybook/

主应用使用 Hash Router。Pages 工作流不构建 ProjectA/ProjectB，也不部署 Module Federation Shell/Remote。

## Vercel：单项目聚合 MFE

聚合构建命令是 pnpm run vercel-build，结果位于 dist-vercel/。仓库新增 vercel.mfe.json，明确该 Build Command、Output Directory、安装命令、路由 fallback 和响应头。

使用 Vercel CLI 时可指定配置文件：vercel --local-config vercel.mfe.json。Git 集成部署时，Vercel 项目仍需在 Dashboard 设置或确认：

| 设置 | 聚合部署值 |
| --- | --- |
| Framework Preset | Other |
| Root Directory | 仓库根目录 |
| Install Command | corepack enable && corepack pnpm@11.5.2 install --frozen-lockfile |
| Build Command | pnpm run vercel-build |
| Output Directory | dist-vercel |

根级 vercel.json 继续保留当前部署入口和已有 Dashboard 约定，没有设置 Build Command/Output Directory。切换线上项目之前，应先核对 Vercel Dashboard 的真实值和环境变量。vercel.mfe.json 是明确的聚合构建目标，不会自动覆盖 Dashboard 配置。

聚合产物结构：

- Shell 放在 dist-vercel 根目录。
- ProjectA Remote 放在 dist-vercel/projectA/。
- ProjectB Remote 放在 dist-vercel/projectB/。

## Vercel：独立项目

仓库提供可通过 Vercel CLI local config 选择的配置：

| 配置文件 | Build Command | Output Directory |
| --- | --- | --- |
| vercel.shell.json | pnpm run build:mf:shell | dist-shell |
| vercel.projectA.json | pnpm run build:mf:projectA:standalone | dist-projectA |
| vercel.projectB.json | pnpm run build:mf:projectB:standalone | dist-projectB |

对应的 standalone Remote 使用站点根路径。独立域名部署时，构建 Shell 时通过 MFE_PROJECTA_URL、MFE_PROJECTB_URL 指定完整 HTTPS remoteEntry.js 地址。Webpack 会校验生产 Remote URL，只允许 HTTPS。

这些配置文件用于 Vercel CLI 的 local config 或复制到对应项目设置；Git 集成是否使用这些配置仍取决于项目的 Root Directory 和 Dashboard 配置。不要假设文件名会自动选择不同的 Vercel 项目。

## 缓存与跨域响应头

根聚合配置对以下 Remote 入口设置 no-cache：

- /remoteEntry.js
- /projectA/remoteEntry.js
- /projectB/remoteEntry.js

对应 `/remote-manifest.json`、`/projectA/remote-manifest.json` 和 `/projectB/remote-manifest.json` 同样设置 no-cache，并返回跨域资源响应头。带 hash 的静态 chunk 使用一年 immutable 缓存。Remote manifest、remoteEntry.js 和后续 chunk 都需要能从 Host Origin 读取。部署后应在浏览器 Network 或 curl 中核对实际响应头，并确认 Remote 后续 chunk 也成功加载。

## 环境变量和凭据

- 浏览器公开变量仅通过 webpack/client-env.js 白名单注入。
- 本机可使用 .env.development.local、.env.production.local 等覆盖文件；这些文件已加入 Git 忽略。CI/Vercel 进程环境变量优先于环境文件。
- GitHub OAuth Client Secret、SENTRY_AUTH_TOKEN、TRACKING_ADMIN_TOKEN 和 MongoDB 凭据只放部署平台的服务端密钥设置。
- SENTRY_DSN 是浏览器 SDK 使用的公开 DSN；PII 和 Replay 默认关闭。
- 仓库当前版本化环境文件已移除凭据字段。以前提交到 Git 历史或在对话中暴露过的 PAT/OAuth/Sentry 凭据均应在服务端撤销或轮换；当前改动不会重写历史。

## CI 与部署的关系

.github/workflows/webpack-ci.yml 在 main/webpack push、目标分支 PR 和手动触发时检查项目/alias/生成契约与 Vercel build/header 配置，运行 Jest 和主应用/MFE Playwright，构建默认应用、Storybook、聚合 MFE，并检查 Remote artifact 契约与首屏 bundle 预算。它不执行部署。GitHub Pages 发布仍由 deploy-gh-pages.yml 负责。
