# Pro React Admin

供团队复用的 React 管理后台脚手架。安全项目预设提供受保护路由、租户身份、服务端授权、持久化资源与审计；展示应用、双构建器、微前端示例和独立 UI 包可按需选用。基于 React 19、Ant Design 6、React Router 7、Zustand 5 和 TypeScript 6。

第一次使用建议从下方的安全项目预设开始。[线上项目概览](https://pro-react-admin.vercel.app/#/overview)和[工程导览](./docs/architecture/ENGINEERING_OVERVIEW.md)展示源码、验证命令与交付边界；公开站点使用浏览器演示数据。

要直接体验类似 Ant Design Pro 的常见管理页，登录后打开“业务页面模板”：查询表格、基础表单、分步表单、详情和提交结果在默认应用与 Enterprise 入口均可运行。按[业务页面模板指南](./docs/development/PAGE_PATTERNS.md)可从页面走到源码、数据 Provider、权限策略和验证命令。模板记录只属于当前工作区会话。

## 线上预览

- [默认后台展示应用](https://pro-react-admin.vercel.app)。
- [Storybook 组件预览](https://wkylin.github.io/pro-react-admin/storybook/)。
- [GitHub Pages 各应用导航](https://wkylin.github.io/pro-react-admin/portal.html)。

Pages 的新增示例和全部应用入口以本次 Actions 部署成功为准。第一次发布可按[GitHub Pages 与 Vercel 部署实操](./docs/deployment/PAGES_VERCEL_GUIDE.md)完成构建与验收；手动触发、本地上传、Release 和回退见[手动部署指南](./docs/deployment/MANUAL_DEPLOYMENT.md)。Pages 配置见[GitHub 部署指南](./docs/deployment/GITHUB_DEPLOYMENT.md)，组件预览见[Storybook 指南](./docs/development/STORYBOOK.md)。

## 快速上手

要求 Node.js >=24.15.0 且 <25、pnpm 11.5.2。

```bash
# 尚未安装 pnpm 时：npm install --global pnpm@11.5.2
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
pnpm install --frozen-lockfile
pnpm run project:create myApp --preset enterprise
PROJECT=myApp pnpm start
```

安全预设默认使用 Vite，生成独立项目并启动前端与 Enterprise API。首次启动会创建隔离的本地 SQLite 演示租户；访问终端打印的地址，使用登录页提供的本地演示账号。创建结果、可修改范围和生产配置见[多项目与脚手架](./docs/development/MULTI_PROJECT.md)。

### 浏览展示应用

只想查看全部演示场景时，在仓库根目录运行 `pnpm start`。访问终端打印的 `/#/signin` 地址，点击 `admin@test.com` 自动填充当前浏览器生成的演示密码，再登录并完成滑块验证；没有统一固定密码。展示应用和本地 API 一起启动，开发埋点使用内存，无需 MongoDB。

演示账号和管理数据由应用内的权限 mock 与 `src/features/administration/api/demoProvider.ts` 提供，不需要额外启动假接口服务；真实租户模式则调用 `server/enterprise/`。

### Webpack / Vite 构建选择

同一份应用与组件源码支持两套构建器。展示应用与既有示例默认使用 Webpack；新建的安全项目预设默认使用 Vite。设置 `BUILD_TOOL=vite` 后，`start`、`project:dev`、`project:build`、`mfe:*` 和 `build:pages` 使用 Vite。应用也可在命令后传 `--bundler=vite`，该参数优先于环境变量。

```bash
pnpm run dev:webpack                 # Webpack 应用与本地 API
pnpm run dev:vite                    # Vite 应用与本地 API
pnpm run build:webpack              # 输出 dist
pnpm run build:vite                 # 输出 dist-vite
pnpm run build:stats                # Webpack 统计与交互图
pnpm run build:stats:vite           # Vite 统计与交互图
pnpm run analyze:report             # 预览 http://localhost:8766
pnpm run preview:vite               # 预览 http://localhost:5174
pnpm run test:e2e:vite              # 验证 dist-vite
pnpm run project:build projectA --bundler=vite
BUILD_TOOL=vite pnpm run build:mf:vercel
```

`dev:webpack` 和 `dev:vite` 都会启动本地 API；只需前端时使用 `pnpm run start:web` 或 `BUILD_TOOL=vite pnpm run start:web`。多项目 Vite 默认输出 `dist-vite-<项目名>`；`BUILD_TOOL=vite pnpm run build:pages` 和微前端聚合构建会按部署契约写入既有发布目录。Storybook 使用 `storybook:vite` / `build-storybook:vite`（端口 6008、输出 `storybook-static-vite`），组件库使用 `build:lib:vite`。这些命令的默认 Webpack 对应项分别是 `storybook` / `build-storybook` 和 `build:lib`。两套组件库构建都写入 `packages/wui-react/dist`，请顺序运行。Windows 下用 `pnpm exec cross-env BUILD_TOOL=vite pnpm run ...` 设置环境变量；更多 Storybook 命令见 [Storybook 指南](./docs/development/STORYBOOK.md)。

构建统计和交互图位于 `artifacts/build/<webpack|vite>/<项目名>/`，不会提交或部署。生产 Sentry source map 上传需配置服务端 `SENTRY_AUTH_TOKEN`，并显式设置 `SENTRY_SOURCE_MAP=map`；见[构建指南](./docs/development/BUILD.md#sentry-发布)。

应用组件从 `@platform/config/env` 读取公开变量，不直接使用 `process.env` 或 `import.meta.env`；Webpack 和 Vite 共用相同的白名单与 `.env` 覆盖顺序。新增构建命令后运行 `pnpm run check:scripts`，逐项校验所有脚本的入口与引用。

所有后续命令均在仓库根目录执行；切换场景前用 Ctrl+C 停止旧服务。编译完成后手动打开浏览器，端口以终端输出为准。完整步骤、环境切换及排查见[快速上手指南](./docs/development/GETTING_STARTED.md)。

### 测试与报告

```bash
pnpm run test:jest                  # 贴近源码的单元测试
pnpm run test:coverage              # 单元测试与代码覆盖率
pnpm run test:e2e:typecheck         # 浏览器用例与配置类型检查
pnpm run test:e2e                   # Webpack 浏览器测试，需先 build:webpack
pnpm run test:e2e:vite              # Vite 浏览器测试，需先 build:vite
pnpm run test:report                # 浏览 http://localhost:8765
```

测试基础设施统一位于 `tests/`，生成结果保存在被 Git 忽略的 `tests/reports/`。总览可以查看 Jest 逐项结果、行/语句/分支/函数覆盖率及各场景的 Playwright 报告。更多入口与环境要求见[质量门禁](./docs/development/QUALITY.md)。

本地环境模板为 `.env.development.local.example`，首次运行可在根目录创建 `.env.development.local`：

```bash
node --input-type=module -e "import fs from 'node:fs'; if (!fs.existsSync('.env.development.local')) fs.copyFileSync('.env.development.local.example', '.env.development.local')"
```

实际文件被 Git 忽略；公开演示默认值在共享 `.env` 中，本地模板不包含密码，已有配置会保留。变量说明和开发/生产加载规则见[本地环境文件](./docs/development/GETTING_STARTED.md#本地环境文件)。

| 场景           | 命令                                                                    | 默认地址 / 输出                | 登录账户                                      |
| -------------- | ----------------------------------------------------------------------- | ------------------------------ | --------------------------------------------- |
| 默认应用与 API | `pnpm start`                                                            | Web 从 8080 起、API 从 5200 起 | `admin@test.com` 等演示账号，密码由浏览器生成 |
| 仅默认前端     | `pnpm run start:web`                                                    | 8080                           | 同上                                          |
| 企业本地全栈   | `pnpm run start:enterprise` 或 `pnpm run start:enterprise:full`         | Web 从 8080 起、API 从 5200 起 | `demo` / `admin@demo.local` / `DemoAdmin123!` |
| 企业浏览器演示 | `pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run start:enterprise` | Web 从 8080 起、API 从 5200 起 | `admin@test.com` 等浏览器演示账号             |
| 多项目         | `pnpm run project:dev projectA` / `projectB`                            | 默认 8080，可设置 `PORT`       | projectA 使用演示账号；projectB 无需登录      |
| 微前端         | 分别启动三个 `start:mf:*`，见下文                                       | Shell 8080、Remote 8081/8082   | 公开通信示例，无需登录                        |
| 本地 lib       | `pnpm run prepare:lib:release`                                          | `packages/wui-react/dist`      | 不适用                                        |
| 自建租户登录   | 配置并初始化后 `pnpm run start:enterprise`                              | Web 从 8080 起、API 从 5200 起 | 初始化时设置的租户 ID、邮箱和自选密码         |

当前开发机的隔离预览账户另记在 Git 忽略的 `docs/LOCAL_PREVIEW.local.md`；该文件不随仓库分发，预览账号也不是项目默认账号。

### 默认应用和企业演示

默认应用使用共享 `.env` 中的 `REACT_APP_USE_MOCK=true`。Enterprise 开发入口默认使用仓库内的真实 Node API 和隔离的 SQLite 演示库 `api/data/enterprise-demo.sqlite`；首次本地启动自动创建租户 `demo`、邮箱 `admin@demo.local`、密码 `DemoAdmin123!`，登录页可一键填入。数据会在重启后保留，修改密码后应使用新密码。该演示库和验证器密钥被 Git 忽略；默认演示库被另一实例占用时，新实例会按 API 端口使用独立的 `enterprise-demo-<端口>.sqlite`，终端显示实际路径。配置自建数据库、引导租户或外部 API 时不会自动创建或切换数据库。两个企业启动命令等效，都从 5200 开始寻找 API 空闲端口。前端端口也会自动选择；访问终端打印的 `Open Enterprise` 地址，不要继续使用被其它项目占用的旧标签页。

本地 `demo` 管理员还可使用左侧“租户管理”查看租户 ID 和管理租户，“权限管理”按角色分配权限。自建数据库的平台管理员须由运维人员显式授权，普通租户管理员不能跨租户操作；删除租户采用可恢复的停用方式。配置和权限边界见[企业资源指南](./docs/operations/ENTERPRISE.md#平台租户与权限管理)。

Enterprise 入口若显式开启 Mock，则使用浏览器演示账号。企业入口包含工作台、用户、角色、审计管理及业务页面模板；浏览器演示完整体验使用 `admin@test.com`。其它账号为 `manager@test.com`、`business@test.com`、`user@test.com`，可退出登录后切换，对比权限。点击登录页账号会填入该浏览器生成的密码，没有统一固定密码。页面模板的申请记录只在浏览器会话内，不写企业 API。

```bash
# 企业浏览器演示：同时启动前端和 Node API，企业登录使用 Mock
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run start:enterprise
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
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run build:enterprise:stats
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

projectB 将上述项目名替换为 `projectB`；输出分别是 `dist-projectA`、`dist-projectB`，静态预览端口为 5000。新增项目可先运行 `pnpm run project:create customer --dry-run` 查看计划，再运行 `pnpm run project:create customer` 和 `pnpm run project:dev customer`。详见[多项目指南](./docs/development/MULTI_PROJECT.md)。

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

访问 http://localhost:5080/#/portal。组合产物在 `dist-vercel`，同时重建 Shell 和两个 Remote 的独立输出目录；聚合预览使用 `dist-vercel`。详见[微前端指南](./docs/deployment/MFE_DEPLOYMENT.md)。

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

输出为 `packages/wui-react/dist`，以上命令不会发布到 npm。查看组件示例运行 `pnpm run storybook`，访问 http://localhost:6006。逐步构建命令见[快速上手](./docs/development/GETTING_STARTED.md#本地构建-lib)，包安装和导入见[组件包用法](NPM_README.md)。

发布到 npmjs 时，先确认新版本尚未发布并完成完整准备。提交版本变更后，推送 `wui-react-v<版本>` 标签可触发 Trusted Publishing；需要手动发布时，按[组件库发布指南](./docs/deployment/LIBRARY_PUBLISH_GUIDE.md)上传同一份已验证产物。

```bash
pnpm run check:lib-release
pnpm run prepare:lib:release
npm pack ./packages/wui-react --dry-run --ignore-scripts
npm view @w.ui/wui-react versions dist-tags --json --registry=https://registry.npmjs.org/
```

已发布版本不能覆盖。手动发布、beta 通道、npm 认证和发布后核验见[组件库构建与 npmjs 发布指南](./docs/deployment/LIBRARY_PUBLISH_GUIDE.md)。

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

更新配置后先按 Ctrl+C 停止旧 Storybook，执行 `npm run storybook:reset` 清理专用缓存并启动；普通启动已显式设置 `BABEL_ENV=storybook`，避免注入应用的 React Refresh。在线入口为 [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)。新示例上线需要推送代码并等待 Pages workflow 完成。`$RefreshSig$` 排查、样式/Provider、源码分组和 Vercel 独立部署见 [Storybook 指南](./docs/development/STORYBOOK.md)。

### 发布全部 GitHub Pages 演示

仓库 Settings → Pages → Source 选择 GitHub Actions；推送 `main` 自动发布全部场景。手动 workflow 可选择默认应用、企业演示、微前端、多项目或仅 Storybook。

```bash
# 本地构建，不上传
PAGES_TARGET=all pnpm run build:pages
pnpm run check:pages

# gh 已登录后手动触发远端部署
gh workflow run deploy-gh-pages.yml --ref main -f target=all
```

输出 `dist-combined`：默认应用在根，企业演示在 `/enterprise/`，普通项目在 `/projects/projectA/` 与 `/projects/projectB/`，微前端在 `/mfe/`，组件站在 `/storybook/`。这些路径相对于实际 Pages base，Fork 和自定义域名从 Pages 配置推断。部署命令见 [GitHub 部署指南](./docs/deployment/GITHUB_DEPLOYMENT.md)，本次版本变化见 [v6.1.1 发布说明](./docs/releases/v6.1.1.md)。

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

访问 http://localhost:8080/#/signin，填租户 `acme`、邮箱 `admin@example.com` 和初始化密码。业务数据库默认 `api/data/enterprise.sqlite`，刷新和重启保留数据。浏览器 Mock 账号和本地 `demo` 租户账号都不属于这个自建租户。

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

访问 http://localhost:5000/#/signin。此构建会覆盖企业演示的 `dist-enterprise`；API 需要一直运行。开发和生产本地环境文件分别是 `.env.development.local`、`.env.production.local`，修改后需重启或重新构建。更多配置见[真实模式构建预览](./docs/development/GETTING_STARTED.md#真实模式构建后的本地预览)和[企业资源接入](./docs/operations/ENTERPRISE.md)。

### Vercel 企业登录与数据库

默认站点 `https://pro-react-admin.vercel.app` 的 GitHub 登录接受任意 GitHub 账号，登录后固定为普通演示用户，不关联企业租户。部署需在 Vercel Production 配置 OAuth 凭据和签名密钥，再构建静态应用与一个同源函数：

```bash
pnpm run build:production
pnpm run vercel:prepare:default
vercel deploy --prebuilt --prod
```

GitHub OAuth App 的精确回调、环境变量及验收步骤见 [Vercel GitHub 登录](./docs/deployment/VERCEL_GITHUB_LOGIN.md)。纯静态 GitHub Pages 不提供此登录方式。

纯在线演示无需数据库，关联企业 Vercel 项目后执行：

```bash
pnpm exec cross-env REACT_APP_USE_MOCK=true APP_BASE_URL= PUBLIC_URL=/ pnpm run build:enterprise:stats
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

真实登录有两种部署方式：**独立 Vercel Enterprise API + Neon PostgreSQL**（[完整部署指南](./docs/deployment/VERCEL_NEON_ENTERPRISE.md)），或 **Vercel 前端 + 带持久卷的 SQLite API 主机**（[SQLite 部署指南](./docs/deployment/VERCEL_SQLITE.md)）。文件型 SQLite 不放在 Vercel Functions 中。PostgreSQL 路径提供显式建表、连接池、完整 Enterprise API、数据库登录限速和资源轮询；SQLite 路径继续提供单实例 WebSocket 事件。

API 主机初始化并启动后，在开发机部署真实前端：

```bash
pnpm exec cross-env APP_BASE_URL=https://api.example.com PUBLIC_URL=/ pnpm run build:enterprise:api
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

将示例 API 地址换为自己的 HTTPS 域名，使用真实租户、邮箱和密码登录。选择 Neon 时，先按 [Vercel + Neon 指南](./docs/deployment/VERCEL_NEON_ENTERPRISE.md)创建独立 API 项目、数据库与表；桌面客户端连接见 [DBeaver 连接指南](./docs/deployment/DBEAVER_NEON_CONNECTION.md)。选择 SQLite 时，服务器完整命令及只读演示用户创建见 [Vercel 与 SQLite 指南](./docs/deployment/VERCEL_SQLITE.md)。

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

- [快速上手：全部预览、构建、登录与权限命令](./docs/development/GETTING_STARTED.md)。
- [架构与边界](./docs/architecture/ARCHITECTURE.md)、[源码职责](./docs/development/SRC_DIRECTORY_GUIDE.md)。
- [企业资源接入](./docs/operations/ENTERPRISE.md)、[权限与导航](./docs/architecture/USER_ROLE_PERMISSION.md)。
- [业务模块扩展](./docs/architecture/MODULES.md)。
- [多项目](./docs/development/MULTI_PROJECT.md)、[微前端](./docs/deployment/MFE_DEPLOYMENT.md)、[构建与部署](./docs/deployment/DEPLOY.md)。
- [架构现状](./docs/architecture/ARCHITECTURE.md)、[测试与报告](./docs/development/QUALITY.md)。
- [文档索引](docs/README.md)、[自动生成参考](./docs/reference/PROJECT_REFERENCE.md)。
- [贡献指南](CONTRIBUTING.md)、[安全说明](SECURITY.md)、[组件包用法](NPM_README.md)。

工程已具备单实例自托管的租户/RBAC、持久化与事务审计基础。SSO、多组织成员关系、分布式服务、运行期插件和全仓 strict 仍需继续完善，详见架构和对标文档。
