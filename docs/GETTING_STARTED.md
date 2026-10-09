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

打开 [http://localhost:8080/](http://localhost:8080/)。Webpack Dev Server 会在 8080 被占用时向后查找可用端口；以终端输出的地址为准。应用使用 Hash Router，页面地址形如：

```text
http://localhost:8080/#/dashboard
```

基本页面启动不要求复制环境文件。仓库中的 .env.<goal> 保存非敏感默认值；个人配置放到对应的 .env.<goal>.local，例如 .env.development.local。local 文件已加入 Git 忽略。Webpack 读取顺序是命令行/CI 环境变量优先，其次 local 文件，再其次基础文件。浏览器变量由 webpack/client-env.js 白名单注入；密码、私钥、OAuth secret、Sentry 上传 token 和 AES key 不允许进入白名单。

### 可选：启动本地 API helper

如果要调试 GitHub OAuth，需要额外启动仓库中的 Express helper；基础页面和多数 Mock 演示不依赖它：

```bash
pnpm --filter api dev
```

服务默认监听 5200。OAuth token exchange 需要在服务进程环境中配置 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET；secret 只放在 API 进程，不能放进前端变量。埋点管理和 /apis 示例写入还需要 API 进程配置 TRACKING_ADMIN_TOKEN。开发默认使用有上限的内存埋点存储；生产默认要求 `TRACKING_STORE=mongodb` 和 `MONGODB_URI`，数据库不可用时服务不会启动。更多配置见 api/README.md。

## 3. 运行多项目示例

项目是同仓库、同依赖安装下的多个应用入口：

| 模式 | 启动命令 | 默认路由选择 | 产物目录 |
| --- | --- | --- | --- |
| 主应用 | pnpm start | src/routers | dist/ |
| ProjectA | pnpm start:projectA | src/projects/projectA/routers | dist-projectA/ |
| ProjectB | pnpm start:projectB | src/projects/projectB/routers | dist-projectB/ |

这些命令分别从 8080 开始找空闲端口。对应生产构建：

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

打开 [http://localhost:6006](http://localhost:6006)。Stories 从 src 下的 *.stories.* 和 *.mdx 文件发现。增加组件示例时，跟随组件放置同名 *.stories.tsx 文件。配置、全局 decorator、静态产物和常见问题见[Storybook 指南](./STORYBOOK.md)。

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

产物生成在 `dist-lib/`，包括 ESM/UMD 聚合包、`style.css` 和 `types/` 下的类型声明。若要生成 `/core`、`/stateful`、`/stateless`、`/tracking` 子路径入口并准备完整的发布目录，运行：

```bash
pnpm run prepublishOnly
```

该命令依次构建聚合包、子路径入口和发布元数据，最终的完整包仍在 `dist-lib/`；它**只构建，不会发布到 npm**。单独执行各步骤时，命令顺序如下：

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
```

准备发布前可预览将打包的文件：

```bash
npm pack ./dist-lib --dry-run
```

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

| 想做什么 | 优先查看 |
| --- | --- |
| 增加页面 | src/pages/ 和 src/routers/modules/ |
| 增加菜单、权限 | src/config/menu.config.tsx、src/routers/ |
| 增加共享组件 | src/components/ |
| 增加项目差异 | src/projects/<project>/ |
| 增加微前端 remote 页面 | src/projects/<project>/mfe/App.tsx |
| 增加组件库公开 API | src/lib/ |
| 增加 Storybook 示例 | 对应组件旁的 *.stories.tsx |
| 调整应用构建 | webpack/webpack.common.js、webpack/webpack.dev.js、webpack/webpack.prod.js |

修改 src/projects/registry.json 后运行 `pnpm run sync:project-contracts`；修改 `config/path-aliases.json` 后运行 `pnpm run sync:aliases`。GitHub Actions 会检查生成契约和 Vercel 部署配置，运行 Jest、主应用和 MFE Playwright E2E，构建主应用、Storybook 和 MFE 聚合产物，并检查首屏 bundle 预算。

应用运行入口为 src/index.tsx；各项目通过自己的 index.tsx 复用 src/bootstrap/renderApp.tsx，再进入 src/theme.tsx 和路由。完整关系见[架构说明](./ARCHITECTURE.md)。

## 9. 常用参考

- [Webpack 构建与配置](./BUILD.md)
- [多项目架构](./MULTI_PROJECT.md)
- [微前端开发与部署](./MFE_DEPLOYMENT.md)
- [Storybook 指南](./STORYBOOK.md)
- [应用部署](./DEPLOY.md)
- [@w.ui/wui-react 组件库](./LIBRARY_PUBLISH_GUIDE.md)
