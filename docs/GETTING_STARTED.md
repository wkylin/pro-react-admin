# 新手入门

这份指南按仓库当前实现编写：应用、微前端、组件库和 Storybook 都由 Webpack 构建；Storybook 使用 Webpack 5 builder。日常开发只需启动主应用，其他模式按需启用。

## 1. 准备环境

- Node.js：24.x（package.json 限定为 24.x）
- pnpm：11.5.2（由 packageManager 和 CI 固定）
- Git

确认版本：

```bash
node --version
pnpm --version
```

安装依赖：

```bash
pnpm install
```

如果本地 pnpm 版本不匹配，先启用 Corepack，再用项目指定版本安装依赖：

```bash
corepack enable
corepack pnpm@11.5.2 install --frozen-lockfile
```

## 2. 启动主应用

```bash
pnpm start
```

`pnpm start` 会启动主应用和本地 API。打开 [http://localhost:8080/](http://localhost:8080/)；Webpack Dev Server 会在 8080 被占用时向后查找可用端口，以终端输出的地址为准。应用使用 Hash Router，页面地址形如：

```text
http://localhost:8080/#/dashboard
```

基础运行不要求复制环境文件。仓库中的 `.env.<goal>` 保存默认值；个人配置放到对应的 `.env.<goal>.local`，例如 `.env.development.local`。local 文件已加入 Git 忽略。命令行/CI 环境变量优先，其次 local 文件，再其次基础文件。浏览器变量由 `webpack/client-env.js` 白名单注入；密码、私钥、OAuth secret、Sentry 上传 token 和 AES key 不允许进入白名单。

### 埋点看板和本地 API

本地 API 默认使用内存埋点存储。`pnpm start` 会同时启动 Express API 和 Webpack 前端，并为当前开发会话生成随机管理 token；该 token 只存在于服务端进程，由代理附加到 API 请求，不会进入浏览器。主应用仅在开发模式自动上报页面浏览事件，便于在埋点看板验证从 SDK 到 API 的完整链路；生产构建不会启用这段示例采集。

若只需启动前端、不使用埋点看板，可运行：

```bash
pnpm run start:web
```

`pnpm run dev:tracking` 与 `pnpm start` 相同。API 默认监听 `127.0.0.1:5200`；前端代理转发 `/api/tracking/*`。遇到 8080 端口占用时，以终端打印的前端端口为准。未接通的埋点 API 会返回 JSON 错误，不会被 SPA 伪装成成功的 HTML。

需要固定管理 token 或修改端口时，在 `.env.development.local` 配置：

```dotenv
TRACKING_ADMIN_TOKEN=your-local-random-token
TRACKING_API_PORT=5200
TRACKING_API_TARGET=http://127.0.0.1:5200
```

更改 `.env.development.local` 后重启服务。GitHub OAuth token exchange 需要 API 环境中的 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`；secret 不能放进前端变量。本地 `/apis` 示例接口需要配置可用的 `MONGODB_URI`；生产默认要求 `TRACKING_STORE=mongodb` 和 `MONGODB_URI`，数据库不可用时 API 不会启动。Vercel/GitHub Pages 静态站点不包含这个 API 服务，生产使用埋点看板需要单独部署后端并配置服务端鉴权。更多配置见[本地 API helper](../api/README.md)。

## 3. 运行多项目示例

项目是同仓库、同依赖安装下的多个应用入口：

| 模式     | 启动命令            | 默认路由选择                  | 产物目录       |
| -------- | ------------------- | ----------------------------- | -------------- |
| 主应用   | pnpm start          | src/routers                   | dist/          |
| ProjectA | pnpm start:projectA | src/projects/projectA/routers | dist-projectA/ |
| ProjectB | pnpm start:projectB | src/projects/projectB/routers | dist-projectB/ |

主应用命令会同时启动本地埋点 API；ProjectA、ProjectB 命令只启动对应前端。这些命令分别从 8080 开始找空闲端口。对应生产构建：

```bash
pnpm run build:production
pnpm run build:production:projectA
pnpm run build:production:projectB
```

src/projects/registry.json 是项目入口、路由目录、输出目录和微前端配置的清单。PROJECT 只能使用清单中的项目名；拼错会让 Webpack 直接报错，不会静默构建主应用。除保留的快捷命令外，也可以使用由注册表驱动的统一入口：`pnpm run project:dev -- projectA` 和 `pnpm run project:build -- projectA`。详见[多项目架构](./MULTI_PROJECT.md)。

## 4. 本地联调微前端

微前端需要三个进程。开三个终端，先启动两个 Remote，再启动 Shell：

终端一：

```bash
pnpm run start:mf:projectA
```

终端二：

```bash
pnpm run start:mf:projectB
```

终端三：

```bash
pnpm run start:mf:shell
```

打开 [http://localhost:8080/#/portal](http://localhost:8080/#/portal)。Shell 在 8080，ProjectA Remote 在 8081，ProjectB Remote 在 8082。Shell 先读取 Remote 的 remote-manifest.json 验证协议，再请求 remoteEntry.js；失败后自动重试一次，仍失败则显示降级提示。新增或重命名 Remote 后运行 `pnpm run sync:project-contracts` 和 `pnpm run check:project-registry`。详见[微前端开发与部署](./MFE_DEPLOYMENT.md)。

## 5. 启动 Storybook

```bash
pnpm run storybook
```

打开 [http://localhost:6006](http://localhost:6006)。Stories 从 src 下的 _.stories._ 和 *.mdx 文件发现。增加组件示例时，跟随组件放置同名 *.stories.tsx 文件。配置、全局 decorator、静态产物和常见问题见[Storybook 指南](./STORYBOOK.md)。

构建静态 Storybook：

```bash
pnpm run build-storybook
```

产物位于 storybook-static/。部署到 GitHub Pages 的子路径时，工作流通过 STORYBOOK_BASE_HREF 设置 base href；本地构建默认不插入子路径。

## 6. 构建 `@w.ui/wui-react` 组件库

在仓库根目录运行。只需要构建聚合入口、样式和 TypeScript 声明时：

```bash
pnpm run build:lib
```

产物生成在 `packages/wui-react/dist/`，包括 ESM/UMD 聚合包、`style.css` 和 `types/` 下的类型声明。若要生成 `/core`、`/stateful`、`/stateless`、`/tracking`、`/animated-icon` 子路径入口并准备完整的发布目录，运行：

```bash
pnpm run prepublishOnly
```

该命令依次构建聚合包、子路径入口并准备独立 workspace package；它**只构建，不会发布到 npm**。单独执行各步骤时，命令顺序如下：

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
pnpm run check:lib-package
```

准备发布前可预览将打包的文件：

```bash
npm pack ./packages/wui-react --dry-run
```

应用根 package 是私有的，组件库版本与发布入口在 `packages/wui-react/package.json` 单独维护。`AnimatedIcon` 已迁到 `packages/wui-react/src`；其他公开组件仍由 `src/lib/` 汇总。库构建由根目录 Webpack 配置负责，组件与构建配置会继续分批迁入 package。

新项目安装已发布版本和组件库使用示例见[@w.ui/wui-react 组件库指南](./LIBRARY_PUBLISH_GUIDE.md)。

## 7. 构建和预览生产应用

```bash
pnpm run build:production
pnpm run serve:dist
```

生产构建输出到 dist/，本地静态预览默认使用 5000 端口。指定项目时，预览脚本也要使用相同的 PROJECT：

```bash
pnpm run build:production:projectA
PROJECT=projectA pnpm run serve:dist
```

build:production 有 prebuild 生命周期：本地会先运行媒体优化；GitHub Actions/Vercel 检测到 CI 时默认跳过。只有设置 OPTIMIZE_MEDIA=1 才会在 CI 强制执行。不要用 SKIP_OPTIMIZE_MEDIA 控制这个钩子，当前脚本不识别该变量。

## 8. 从哪里开始改代码

| 想做什么               | 优先查看                                                                   |
| ---------------------- | -------------------------------------------------------------------------- |
| 增加页面               | src/pages/ 和 src/routers/modules/                                         |
| 增加菜单、权限         | src/layouts/navigation/menu.config.tsx、src/routers/                                   |
| 增加共享组件           | src/components/                                                            |
| 增加项目差异           | src/projects/<project>/                                                    |
| 增加微前端 remote 页面 | src/projects/<project>/mfe/App.tsx                                         |
| 增加组件库公开 API     | src/lib/、config/library-contract.mjs                                      |
| 增加 Storybook 示例    | 对应组件旁的 *.stories.tsx                                                 |
| 调整应用构建           | webpack/webpack.common.js、webpack/webpack.dev.js、webpack/webpack.prod.js |

修改 src/projects/registry.json 后运行 `pnpm run sync:project-contracts`；修改 `config/path-aliases.json` 后运行 `pnpm run sync:aliases`。GitHub Actions 会检查生成契约和 Vercel 部署配置，运行 Jest、主应用和 MFE Playwright E2E，构建主应用、Storybook 和 MFE 聚合产物，并检查首屏 bundle 预算。

应用运行入口为 src/index.tsx；各项目通过自己的 index.tsx 复用 src/bootstrap/renderApp.tsx，再进入 src/theme.tsx 和路由。完整关系见[架构说明](./ARCHITECTURE.md)。

提交改动前可运行 `pnpm run typecheck` 检查主应用类型，并运行 `pnpm run typecheck:boundaries` 检查路由、KeepAlive、微前端桥接、features、shared 和 platform 的严格类型。CI 会执行这些检查。`pnpm run ci:quality` 汇总只读 lint、类型检查和已有自动化测试。

## 9. 常用参考

- [Webpack 构建与配置](./BUILD.md)
- [多项目架构](./MULTI_PROJECT.md)
- [微前端开发与部署](./MFE_DEPLOYMENT.md)
- [Storybook 指南](./STORYBOOK.md)
- [应用部署](./DEPLOY.md)
- [@w.ui/wui-react 组件库](./LIBRARY_PUBLISH_GUIDE.md)
