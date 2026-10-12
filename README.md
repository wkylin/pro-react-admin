# Pro React Admin

React 企业管理应用与组件工作区，基于 React 19、Ant Design 6、React Router 7、Zustand 5、Webpack 5 和 TypeScript 6。提供完整展示应用、精简企业入口、多项目构建、Module Federation Host/Remote，以及独立 UI 包 @w.ui/wui-react。

## 线上预览

- [默认后台展示应用](https://pro-react-admin.vercel.app)。
- [Storybook 组件预览](https://wkylin.github.io/pro-react-admin/storybook/)。
- [GitHub Pages 各应用导航](https://wkylin.github.io/pro-react-admin/portal.html)。

Pages 的新增示例和全部应用入口以本次 Actions 部署成功为准。手动触发、本地上传、Vercel、Release、核验与回退的完整步骤见 [手动部署指南](docs/MANUAL_DEPLOYMENT.md)。Pages 配置见 [GitHub 部署指南](docs/GITHUB_DEPLOYMENT.md)，组件预览见 [Storybook 指南](docs/STORYBOOK.md)。

## 快速上手

要求 Node.js >=24.15.0 且 <25、pnpm 11.5.2。

```bash
# 尚未安装 pnpm 时：npm install --global pnpm@11.5.2
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
pnpm install --frozen-lockfile
pnpm start
```

已有仓库只需在根目录安装并启动。访问 http://localhost:8080/#/signin，点击 `admin@test.com` 自动填充当前浏览器生成的演示密码，再点击登录并完成滑块验证；没有统一固定密码。`pnpm start` 同时启动完整展示应用和本地 API（5200），开发埋点使用内存，无需 MongoDB。

所有后续命令均在仓库根目录执行；切换场景前用 Ctrl+C 停止旧服务。编译完成后手动打开浏览器，端口以终端输出为准。完整步骤、环境切换及排查见[快速上手指南](docs/GETTING_STARTED.md)。

本地环境模板为 `.env.development.local.example`，首次运行可在根目录创建 `.env.development.local`：

```bash
node --input-type=module -e "import fs from 'node:fs'; if (!fs.existsSync('.env.development.local')) fs.copyFileSync('.env.development.local.example', '.env.development.local')"
```

实际文件被 Git 忽略，默认演示配置不包含密码；已有配置会保留。变量说明和开发/生产加载规则见[本地环境文件](docs/GETTING_STARTED.md#本地环境文件)。

| 场景           | 命令                                            | 默认地址 / 输出              |
| -------------- | ----------------------------------------------- | ---------------------------- |
| 默认应用与 API | `pnpm start`                                    | Web 8080、API 5200           |
| 仅默认前端     | `pnpm run start:web`                            | 8080                         |
| 企业演示       | `pnpm run start:enterprise`                     | 8080                         |
| 多项目         | `pnpm run project:dev projectA` / `projectB`    | 默认 8080，可设置 `PORT`     |
| 微前端         | 分别启动三个 `start:mf:*`，见下文               | Shell 8080、Remote 8081/8082 |
| 本地 lib       | `pnpm run prepare:lib:release`                  | `packages/wui-react/dist`    |
| 真实租户登录   | 配置并初始化后 `pnpm run start:enterprise:full` | Web 8080、API 5200           |

### 默认应用和企业演示

以下使用模板默认的 `REACT_APP_USE_MOCK=true`。企业入口包含工作台、用户、角色和审计管理；完整体验使用 `admin@test.com`。其它演示账号为 `manager@test.com`、`business@test.com`、`user@test.com`，可退出登录后切换，对比权限。

```bash
# 企业演示：仅前端
pnpm run start:enterprise
```

登录后访问 `/#/administration/users`、`/#/administration/roles`、`/#/administration/audit`。演示数据刷新后重置，编辑演示角色不会改变测试账号授权，也不会创建可登录的新用户。

构建并静态预览，默认应用和企业入口二选一：

```bash
# 默认应用：dist，预览 http://localhost:5000/#/signin
pnpm run build:stats
pnpm run serve:dist
```

```bash
# 企业入口：dist-enterprise，预览 http://localhost:5000/#/signin
pnpm run build:enterprise:stats
PROJECT=enterprise pnpm run serve:dist
```

环境前缀写法适用于 macOS/Linux；Windows 使用 `pnpm exec cross-env PROJECT=enterprise pnpm run serve:dist`。静态预览不提供 API 代理，真实登录的构建预览另见下文指南。

### 多项目

```bash
pnpm run project:list
pnpm run project:doctor

# 终端 1：projectA，http://localhost:8091/#/signin
pnpm exec cross-env PORT=8091 pnpm run project:dev projectA
```

```bash
# 终端 2：projectB，http://localhost:8092/#/projectB/home
pnpm exec cross-env PORT=8092 pnpm run project:dev projectB
```

projectA 复用展示路由，projectB 是公开示例，无需登录。构建后用 `PROJECT` 选择对应预览目录：

```bash
pnpm run project:build projectA --stats
PROJECT=projectA pnpm run serve:dist
```

projectB 将上述项目名替换为 `projectB`；输出分别是 `dist-projectA`、`dist-projectB`，静态预览端口为 5000。新增项目可先运行 `pnpm run project:create customer --dry-run` 查看计划，再运行 `pnpm run project:create customer` 和 `pnpm run project:dev customer`。详见[多项目指南](docs/MULTI_PROJECT.md)。

### 微前端

先确保 8080/8081/8082 可用，在三个终端分别运行：

```bash
# 终端 1：Remote A，8081
pnpm run start:mf:projectA
```

```bash
# 终端 2：Remote B，8082
pnpm run start:mf:projectB
```

```bash
# 终端 3：Shell，8080
pnpm run start:mf:shell
```

编译完成后访问 http://localhost:8080/#/portal，通过 `/#/projectA`、`/#/projectB` 查看公开 Remote 通信示例。三个命令仅启动前端。

```bash
# 聚合构建及本地预览，不执行 Vercel 部署
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm exec serve -s dist-vercel -l 5080
```

访问 http://localhost:5080/#/portal。组合产物在 `dist-vercel`，同时重建 Shell 和两个 Remote 的独立输出目录；聚合预览使用 `dist-vercel`。详见[微前端指南](docs/MFE_DEPLOYMENT.md)。

### 本地构建 lib

```bash
# 只构建 ESM / CJS / CSS / 类型声明
pnpm run build:lib
```

```bash
# 完整准备、包契约、消费 smoke 和体积检查
pnpm run prepare:lib:release
npm pack ./packages/wui-react --dry-run --ignore-scripts
```

输出为 `packages/wui-react/dist`，以上命令不会发布到 npm。查看组件示例运行 `pnpm run storybook`，访问 http://localhost:6006。逐步构建命令见[快速上手](docs/GETTING_STARTED.md#本地构建-lib)，包安装和导入见[组件包用法](NPM_README.md)。

发布到 npmjs，先确认版本未发布并完成完整准备，再登录、打包和上传。以下示例为组件包 5.1.0：

```bash
pnpm run check:lib-release
pnpm run prepare:lib:release
npm login --registry=https://registry.npmjs.org/ --auth-type=web
npm whoami --registry=https://registry.npmjs.org/
node --input-type=module -e "import fs from 'node:fs'; fs.mkdirSync('artifacts/npm', {recursive:true})"
npm pack ./packages/wui-react --pack-destination artifacts/npm --ignore-scripts
npm publish ./artifacts/npm/w.ui-wui-react-5.1.0.tgz --access public --tag latest --registry=https://registry.npmjs.org/ --ignore-scripts
npm view @w.ui/wui-react@5.1.0 version --registry=https://registry.npmjs.org/
```

已发布版本不能覆盖；更新时升级组件包版本并使用对应 tarball 文件名。`--ignore-scripts` 仅用于上传已完整验证的固定产物。Node 工具构建替代命令、beta 通道、发布核验、GitHub Trusted Publishing 和常见问题见[组件库构建与 npmjs 发布指南](docs/LIBRARY_PUBLISH_GUIDE.md)。

如果登录成功后发布仍提示需要两步验证，在自己的终端运行 `npm profile enable-2fa auth-and-writes` 完成设置，或按现有 2FA 提示认证，再重试同一 tarball。具体命令见[发布 2FA](docs/LIBRARY_PUBLISH_GUIDE.md#npmjs-要求发布两步验证)。

### Storybook 当前源码预览

公共包的 12 个组件、共享 UI 和 `components` 的全部直接 UI 入口都有 stories，共 157 个入口；从当前源码预览，不需要先构建 lib。

```bash
npm run storybook
# 开发预览：http://localhost:6006

pnpm run check:stories
pnpm run typecheck:storybook
npm run build-storybook
node scripts/validate-stories.mjs --built
npm run serve:storybook
# 静态预览：http://localhost:6007
```

更新配置后先按 Ctrl+C 停止旧 Storybook，执行 `npm run storybook:reset` 清理专用缓存并启动；普通启动已显式设置 `BABEL_ENV=storybook`，避免注入应用的 React Refresh。在线入口为 [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)。新示例上线需要推送代码并等待 Pages workflow 完成。`$RefreshSig$` 排查、样式/Provider、源码分组和 Vercel 独立部署见 [Storybook 指南](docs/STORYBOOK.md)。

### 发布全部 GitHub Pages 演示

仓库 Settings → Pages → Source 选择 GitHub Actions；推送 `main` 自动发布全部场景。手动 workflow 可选择默认应用、企业演示、微前端、多项目或仅 Storybook。

```bash
# 本地构建，不上传
PAGES_TARGET=all pnpm run build:pages
pnpm run check:pages

# gh 已登录后手动触发远端部署
gh workflow run deploy-gh-pages.yml --ref main -f target=all
```

输出 `dist-combined`：默认应用在根，企业演示在 `/enterprise/`，普通项目在 `/projects/projectA/` 与 `/projects/projectB/`，微前端在 `/mfe/`，组件站在 `/storybook/`。这些路径相对于实际 Pages base，Fork 和自定义域名从 Pages 配置推断。完整命令与 v5.1.0 标签/Release 流程见 [GitHub 部署指南](docs/GITHUB_DEPLOYMENT.md)。

### 真实用户登录和权限设置

停止演示服务，创建或修改根 `.env.development.local`，将示例密码替换为自己的 12..256 字符密码：

```dotenv
REACT_APP_USE_MOCK=false
APP_BASE_URL=
ENTERPRISE_ENABLED=true
TRACKING_STORE=memory
TRACKING_API_PORT=5200
ENTERPRISE_BOOTSTRAP_TENANT=acme
ENTERPRISE_BOOTSTRAP_TENANT_NAME=Acme
ENTERPRISE_BOOTSTRAP_NAME=Administrator
ENTERPRISE_BOOTSTRAP_EMAIL=admin@example.com
ENTERPRISE_BOOTSTRAP_PASSWORD="替换为你自己的12至256字符密码"
```

```bash
# 每个租户只初始化一次；已有租户不能通过此命令重置密码
pnpm run api:bootstrap
```

成功后删除配置文件中的五项 `ENTERPRISE_BOOTSTRAP_*`，保留其它配置，再启动：

```bash
pnpm run start:enterprise:full
```

访问 http://localhost:8080/#/signin，填租户 `acme`、邮箱 `admin@example.com` 和初始化密码。业务数据库默认 `api/data/enterprise.sqlite`，刷新和重启保留数据。演示账号不能用于真实登录。

1. 管理员在角色管理添加 `viewer`，授予 `home:read`、`user:read`。
2. 在用户管理添加真实邮箱和 12..256 字符密码，分配 `viewer`，状态设为启用。
3. 退出后用同一租户和新用户凭据登录，验证可读工作台、用户列表，不能修改用户或访问角色、审计页。

用户操作权限为 `user:create`、`user:update`、`user:delete`，角色操作为 `role:create`、`role:update`、`role:delete`，审计为 `audit:read`；创建/编辑用户的角色选项还需要 `role:read`。用户运营角色可配置 `home:read`、`user:*`、`role:read`。服务端限制授予范围，账号停用和密码重置等操作会撤销会话；角色撤权在下一次服务请求生效，客户端聚焦或重新登录可同步。

同一 origin 的标签页共享当前登录身份，比较多个账号请使用独立无痕会话。真实模式的构建预览先停止全栈开发服务，再分别运行：

```bash
# 终端 1：沿用上面的开发配置，启动真实 API
pnpm --filter api dev
```

```bash
# 终端 2：关闭 mock 并指定本地 API 地址，再预览构建结果
pnpm exec cross-env APP_BASE_URL=http://127.0.0.1:5200 pnpm run build:enterprise:api
PROJECT=enterprise pnpm run serve:dist
```

访问 http://localhost:5000/#/signin。此构建会覆盖企业演示的 `dist-enterprise`；API 需要一直运行。开发和生产本地环境文件分别是 `.env.development.local`、`.env.production.local`，修改后需重启或重新构建。更多配置见[真实模式构建预览](docs/GETTING_STARTED.md#真实模式构建后的本地预览)和[企业资源接入](docs/ENTERPRISE.md)。

### Vercel 演示登录与 SQLite

纯在线演示无需数据库，关联企业 Vercel 项目后执行：

```bash
pnpm exec cross-env REACT_APP_USE_MOCK=true APP_BASE_URL= PUBLIC_URL=/ pnpm run build:enterprise:stats
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

当前文件型 SQLite 无法持久运行在 Vercel Functions；真实登录使用 **Vercel 前端 + 带持久卷的 SQLite API 主机**。仓库提供 `compose.enterprise.yaml`、API 镜像与 Caddy HTTPS 配置，生产环境模板为 `.env.enterprise.production.local.example`。

API 主机初始化并启动后，在开发机部署真实前端：

```bash
pnpm exec cross-env APP_BASE_URL=https://api.example.com PUBLIC_URL=/ pnpm run build:enterprise:api
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

将示例 API 地址换为自己的 HTTPS 域名，使用真实租户、邮箱和密码登录。CLI 登录/项目关联、服务器完整命令及只读演示用户创建见[Vercel 与 SQLite 部署指南](docs/VERCEL_SQLITE.md)。

## 工程能力

- 明确的 app/features/platform/shared/UI 包边界，类型与依赖方向门禁。
- 一处维护权限、标题和菜单元数据；导航与搜索同步授权，已挂载页面响应撤权。
- 每个应用根独立 Store 和页面缓存，项目偏好按命名空间保存。
- 注册表驱动开发、构建、预览、清理和部署，支持 doctor、dry-run 与项目脚手架。
- 可替换的类型化 DataProvider、REST adapter、用户/角色 CRUD 和只读审计示例。
- 可选真实租户/RBAC 后端，服务端会话撤销、持久化 CRUD 与事务审计；会话隔离的资源缓存和写入失效。
- 编译期业务模块契约，统一路由、Provider、资源目录、依赖和权限控制的 Header 插槽。
- 展示与企业路由独立，重型页面和可选效果按需加载，生产包体积门禁。

## 常用命令

```bash
pnpm run project:doctor
pnpm run project:create customer --dry-run
pnpm run project:dev projectA
pnpm run build:enterprise:stats
pnpm run test:e2e:enterprise
pnpm run ci:quality
```

Docker 静态镜像、Vercel/GitHub Pages 与组件库发布见文档。根应用为 private，UI 包独立构建和发布。

## 维护入口

- [快速上手：全部预览、构建、登录与权限命令](docs/GETTING_STARTED.md)。
- [架构与边界](docs/ARCHITECTURE.md)、[源码职责](docs/SRC_DIRECTORY_GUIDE.md)。
- [企业资源接入](docs/ENTERPRISE.md)、[权限与导航](docs/USER_ROLE_PERMISSION.md)。
- [业务模块扩展](docs/MODULES.md)。
- [多项目](docs/MULTI_PROJECT.md)、[微前端](docs/MFE_DEPLOYMENT.md)、[构建与部署](docs/DEPLOY.md)。
- [GitHub 开源对标](docs/BENCHMARKS.md)、[实测验证](docs/VALIDATION.md)。
- [文档索引](docs/README.md)、[自动生成参考](docs/PROJECT_REFERENCE.md)。
- [贡献指南](CONTRIBUTING.md)、[安全说明](SECURITY.md)、[组件包用法](NPM_README.md)。

工程已具备单实例自托管的租户/RBAC、持久化与事务审计基础。SSO、多组织成员关系、分布式服务、运行期插件和全仓 strict 仍需继续完善，详见架构和对标文档。
