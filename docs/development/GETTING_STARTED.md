# 快速上手

本指南覆盖默认展示应用、企业项目、多项目、微前端、UI 组件库本地构建，以及真实租户登录和权限配置。所有命令均在**仓库根目录**执行；需要多个终端时会分别标明。开发服务不会自动打开浏览器，编译完成后访问对应地址。

## 准备环境

要求 Node.js **>=24.15.0 且 <25**、pnpm **11.5.2**。先安装满足要求的 Node；如果尚未安装 pnpm，执行：

```bash
npm install --global pnpm@11.5.2
node --version
pnpm --version
```

首次获取和安装：

```bash
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
pnpm install --frozen-lockfile
pnpm run project:doctor
```

已有仓库只需在根目录执行安装和 doctor。使用 `pnpm-lock.yaml`，不要混用 npm/yarn 安装工作区依赖；上面的 npm 命令仅用于安装 pnpm。

文中的 `PROJECT=enterprise pnpm run serve:dist` 等环境前缀适用于 macOS/Linux。Windows 可使用已安装的 cross-env，例如：

```bash
pnpm exec cross-env PROJECT=enterprise pnpm run serve:dist
```

## 本地环境文件

仓库提供可提交的 `.env.development.local.example`。在根目录创建本机配置，下面的命令仅在文件不存在时复制模板，保留已有配置：

```bash
node --input-type=module -e "import fs from 'node:fs'; if (!fs.existsSync('.env.development.local')) fs.copyFileSync('.env.development.local.example', '.env.development.local')"
```

用编辑器打开 `.env.development.local`。共享 `.env` 默认开启浏览器演示登录，本地模板只补 API 配置。Enterprise 两个启动命令默认同时启动前端和 Node API；没有自定义后端配置时，它们会创建隔离的本地 SQLite 演示租户。浏览器 Mock 演示需显式设置 `REACT_APP_USE_MOCK=true`，自建租户按[真实用户登录](#真实用户登录)配置。

| 配置                     | 默认值与作用                                                       |
| ------------------------ | ------------------------------------------------------------------ |
| `REACT_APP_USE_MOCK`     | `true`：演示账号；`false`：真实租户登录和 REST 数据                |
| `APP_BASE_URL`           | 空：前端请求走同源开发代理；外部 API 可填完整地址                  |
| `ENTERPRISE_ENABLED`     | 通用 API 默认 `false`；Enterprise 启动命令在本地真实模式会自动启用 |
| `TRACKING_STORE`         | `memory`：埋点使用内存，与企业 SQLite 持久化独立                   |
| `TRACKING_API_PORT`      | `5200`：全栈启动时本地 API 的起始端口，占用时递增                  |
| `ENTERPRISE_BOOTSTRAP_*` | 默认注释；仅首次创建真实租户时填写，完成后删除                     |

`.env.development.local` 已被 Git 忽略，模板可以提交，实际凭据只保留在本机。不要直接覆盖已有配置。Webpack 开发入口和全栈启动读取此文件；`api:bootstrap` 与 `pnpm --filter api dev` 也会读取它。外部命令环境变量优先于文件；配置修改后重启服务。

生产构建读取 `.env.production.local`，不会读取这个开发文件。Vercel 部署与 SQLite 持久化使用独立的生产配置，见[Vercel 演示登录与 SQLite 部署](../deployment/VERCEL_SQLITE.md)。

## 场景速查

| 场景                                      | 启动命令                                     | 默认访问地址                    | 构建产物                                  |
| ----------------------------------------- | -------------------------------------------- | ------------------------------- | ----------------------------------------- |
| [默认展示应用](#默认应用)                 | `pnpm start`                                 | http://localhost:8080/#/signin  | `dist`                                    |
| [Enterprise 登录](#enterprise-登录与演示) | `pnpm run start:enterprise`                  | Web 从 8080 起，API 从 5200 起  | `dist-enterprise` + 本地 SQLite           |
| [多项目独立应用](#多项目)                 | `pnpm run project:dev projectA` / `projectB` | 默认 8080，可指定 `PORT`        | `dist-projectA` / `dist-projectB`         |
| [微前端](#微前端)                         | 三个 `start:mf:*` 命令，分别运行             | Shell 8080，Remote 8081/8082    | 聚合目录 `dist-vercel`                    |
| [组件库](#本地构建-lib)                   | `pnpm run prepare:lib:release`               | 无应用服务；Storybook 使用 6006 | `packages/wui-react/dist`                 |
| [真实用户登录](#真实用户登录)             | 初始化后 `pnpm run start:enterprise:full`    | Web 从 8080 起，API 从 5200 起  | 前端 `dist-enterprise`，业务数据为 SQLite |

普通开发服务从 8080 开始寻找可用端口，实际地址以终端为准。切换场景前用 **Ctrl+C** 停止旧服务；微前端联调需要确保 8080/8081/8082 可用，Remote 端口变化后 Shell 的地址也必须同步。

## 演示配置与账号

仓库共享 `.env` 默认设置 `REACT_APP_USE_MOCK=true`，用于默认展示、多项目及显式的 Enterprise 浏览器演示。Enterprise 项目命令默认覆盖为真实租户登录；没有自定义配置时，本地启动器会自动创建可用的 SQLite 演示租户。只有命令环境显式传入 `REACT_APP_USE_MOCK=true` 时才启用浏览器 Mock 账号。两种本地演示都无需安装 MongoDB。

需要本地覆盖时，用编辑器创建或修改根 `.env.development.local`，保留已有的其它配置：

```dotenv
REACT_APP_USE_MOCK=true
APP_BASE_URL=
TRACKING_STORE=memory
TRACKING_API_PORT=5200
```

打开应用的 `/#/signin`，点击测试账号自动填入邮箱和密码，点击登录并完成滑块验证。演示密码由当前浏览器生成，并显示在测试账号列表右侧，**没有统一固定密码**。

| 演示账号            | 角色代码        | 用途                               |
| ------------------- | --------------- | ---------------------------------- |
| `admin@test.com`    | `super_admin`   | 查看全部功能，包括角色、用户、审计 |
| `manager@test.com`  | `admin`         | 查看部分页面及用户操作             |
| `business@test.com` | `business_user` | 业务页面权限演示                   |
| `user@test.com`     | `user`          | 基础页面及无权限场景               |
| `reviewer@test.com` | `reviewer`      | 独立查看和审批访问变更             |

完整体验企业管理请使用 `admin@test.com`。这些账号只用于浏览器演示，不会创建后端用户。演示角色和数据与真实模式的 `tenant-admin`、SQLite 数据独立。

## 默认应用

```bash
pnpm start
```

访问 http://localhost:8080/#/signin，登录后进入完整后台。`pnpm start`和`pnpm run dev:webpack` 同时启动 Webpack 前端与本地 Express API；`pnpm run dev:vite`启动 Vite 前端与同一 API。API 从`127.0.0.1:5200`起寻找空闲端口，所选前端的企业、埋点和 GitHub 演示登录代理跟随实际端口，终端会显示选用端口。默认埋点存储为内存，不需要 MongoDB；使用 Ctrl+C 同时停止前端和 API。GitHub 演示登录需在`.env.development.local` 配置 OAuth App 凭据和精确回调 URL，参见 [API 文档](../operations/API.md)。

只预览前端页面：

```bash
pnpm run start:web
```

此命令不启动 API；只预览 Vite 前端可运行 `BUILD_TOOL=vite pnpm run start:web`。两者的埋点管理和 GitHub 演示登录等服务功能都需要另外接入。首次演示登录可直接使用上面的测试账号。

构建并预览静态产物，先停止开发服务：

```bash
pnpm run build:stats
pnpm run serve:dist
```

访问 http://localhost:5000/#/signin。产物为 `dist`，统计文件为 `artifacts/build/webpack/default/stats.json`，可交互图为同目录的 `report.html`；此构建关闭 Sentry source map 上传。静态预览服务只提供前端文件，不提供开发 API 代理。

## Enterprise 登录与演示

```bash
pnpm run start:enterprise
```

启动后打开终端打印的 `Open Enterprise` 地址，通常是 http://localhost:8080/#/signin；若 8080 已被其它项目占用，企业版会使用 8081 等空闲端口，继续访问旧的 8080 页面会请求到错误的 API。`start:enterprise` 与 `start:enterprise:full` 都启动 Web 和 Node API；API 默认从 `127.0.0.1:5200` 开始寻找空闲端口，代理自动跟随。首次启动自动创建 Git 忽略的 `api/data/enterprise-demo.sqlite` 和 `api/data/enterprise-demo-totp.key`。如果该演示库正由另一实例使用，新实例会改用 `enterprise-demo-<实际 API 端口>.sqlite`；各实例的数据独立，终端会打印选中的数据库路径。登录页显示以下账号，并提供“填入演示账号”按钮：

| 字段    | 本地默认值         |
| ------- | ------------------ |
| 租户 ID | `demo`             |
| 邮箱    | `admin@demo.local` |
| 密码    | `DemoAdmin123!`    |

这是具有真实 SQLite 持久化和服务端 RBAC 的本地开发账号。重启后数据保留；修改密码或启用 TOTP 后，使用新密码和动态码登录。启动器只在开发环境、未配置 `ENTERPRISE_DB_PATH`、`ENTERPRISE_BOOTSTRAP_*`、外部 API，且默认 `api/data/enterprise.sqlite` 不存在时创建演示库；不会向自建或生产数据库写入演示账号。浏览器服务绑定回环地址以限制固定演示凭据的本地访问。

本地 `demo` 管理员可以在左侧“租户管理”查看租户 ID 列表，创建租户并设置初始管理员，编辑名称/状态，以及停用租户；“权限管理”提供按角色授权的编辑入口。平台身份只自动授予隔离的本地演示账号。自建租户管理员默认没有跨租户权限，需要运维人员在迁移数据库后显式运行 `pnpm run api:platform-admin grant --tenant acme --email admin@example.com`；详见[平台租户与权限管理](../operations/ENTERPRISE.md#平台租户与权限管理)。

需要本地演示账号时显式打开 Mock：

```bash
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run start:enterprise
```

Pages 展示构建也会显式打开 Mock，公开演示仍保留 `admin@test.com` 等演示账号。

| 页面     | 地址                                         |
| -------- | -------------------------------------------- |
| 工作台   | http://localhost:8080/#/                     |
| 用户管理 | http://localhost:8080/#/administration/users |
| 角色管理 | http://localhost:8080/#/administration/roles |
| 审计日志 | http://localhost:8080/#/administration/audit |

在显式 Mock 模式下，可演示用户添加、编辑、停用、删除，角色权限/范围编辑、独立审批及只读审计。演示数据保存在当前页面运行期间的内存中，账号切换后保留，刷新后重置；**编辑演示角色不会修改固定测试账号的登录权限，也不会创建可登录的新账号**。操作步骤见[RBAC 与独立审批](../architecture/RBAC_RESOURCE_APPROVAL.md)。需要持久化和实际授权时使用[真实用户登录](#真实用户登录)。

构建并预览：

```bash
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run build:enterprise:stats
PROJECT=enterprise pnpm run serve:dist
```

访问 http://localhost:5000/#/signin。产物为 `dist-enterprise`，统计文件为 `artifacts/build/webpack/enterprise/stats.json`。静态产物不包含开发启动器的演示租户或 Node API；需单独部署 API。两个 Enterprise 开发启动命令均运行本地 Node API，显式 `REACT_APP_USE_MOCK=true` 时浏览器使用 Mock 登录。

## 多项目

多项目是在构建时选择一个独立应用；每个项目有自己的入口、路由和输出目录。先查看注册表和检查文件：

```bash
pnpm run project:list
pnpm run project:doctor
```

单独启动一个项目时二选一：

```bash
pnpm run project:dev projectA
pnpm run project:dev projectB
```

`projectA` 复用完整展示路由，访问 `http://localhost:8080/#/signin`；`projectB` 为公开示例，访问 `http://localhost:8080/#/projectB/home`，无需登录。`default`、`enterprise`、`shell` 也登记在注册表中；Shell 加载 Remote 时使用下一节的微前端命令。

同时运行 projectA/projectB 时，分别在两个终端指定端口：

```bash
# 终端 1
pnpm exec cross-env PORT=8091 pnpm run project:dev projectA
```

```bash
# 终端 2
pnpm exec cross-env PORT=8092 pnpm run project:dev projectB
```

此时分别访问 `http://localhost:8091/#/signin` 和 `http://localhost:8092/#/projectB/home`。这些命令仅启动前端，互不加载对方的 Remote。

构建和预览 projectA：

```bash
pnpm run project:build projectA --stats
PROJECT=projectA pnpm run serve:dist
```

停止预览服务后，构建和预览 projectB：

```bash
pnpm run project:build projectB --stats
PROJECT=projectB pnpm run serve:dist
```

输出分别为 `dist-projectA`、`dist-projectB`，静态预览默认使用 5000。`PROJECT` 选择预览目录，不会重新构建；请在浏览器访问对应项目的 Hash 路由。

新增独立项目，先查看计划，再按需生成：

```bash
pnpm run project:create customer --dry-run
pnpm run project:create customer
pnpm run project:dev customer
pnpm run project:create customerAdmin --preset enterprise --dry-run
pnpm run project:create customerAdmin --preset enterprise
```

`--dry-run` 不写文件。默认预设生成公开空白入口，业务认证和权限需自行注册；`--preset enterprise` 生成受保护的租户业务入口，默认使用 Vite 和真实 Enterprise API。启动新项目使用 `PROJECT=customerAdmin pnpm start`，浏览器访问终端输出的登录地址。更多配置见[多项目与脚手架](./MULTI_PROJECT.md)。

## 微前端

先停止占用 8080/8081/8082 的服务。在三个终端分别运行，等两个 Remote 编译成功后访问 Shell：

```bash
# 终端 1：Remote A，默认 8081
pnpm run start:mf:projectA
```

```bash
# 终端 2：Remote B，默认 8082
pnpm run start:mf:projectB
```

```bash
# 终端 3：Shell，默认 8080
pnpm run start:mf:shell
```

| 入口                | 地址                                 |
| ------------------- | ------------------------------------ |
| Shell Portal        | http://localhost:8080/#/portal       |
| Shell 加载 Remote A | http://localhost:8080/#/projectA     |
| Shell 加载 Remote B | http://localhost:8080/#/projectB     |
| Remote A 容器文件   | http://localhost:8081/remoteEntry.js |
| Remote B 容器文件   | http://localhost:8082/remoteEntry.js |

在 Portal 选择 Remote，或直接打开 Shell 对应路由，可验证跨应用导航、toast 和共享状态。当前暴露的 Remote 是公开通信示例，无需登录；projectA 独立应用的完整后台路由是另一入口。三个命令只启动前端，不启动 API。

本地构建完整微前端并预览：

```bash
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm exec serve -s dist-vercel -l 5080
```

访问 http://localhost:5080/#/portal、`/#/projectA`、`/#/projectB`。`build:mf:vercel` 只构建和组装文件，**不会部署到 Vercel**。`dist-vercel` 根目录为 Shell，子目录 `projectA/`、`projectB/` 放对应 Remote；同时会重建 `dist-shell`、`dist-projectA`、`dist-projectB`。请使用聚合目录预览，`PROJECT=shell pnpm run serve:dist` 只服务 Shell 自己的目录。

单独构建 Remote 后若需在根路径预览，使用 standalone 目标，例如：

```bash
pnpm run mfe:build:standalone projectA --stats
PROJECT=projectA pnpm run serve:dist
```

该构建会覆盖 `dist-projectA`；再次预览聚合微前端前重新运行 `build:mf:vercel`。协议、跨域地址和部署配置见[微前端开发与部署](../deployment/MFE_DEPLOYMENT.md)。

## 本地构建 lib

UI 包名为 `@w.ui/wui-react`，源码在 `packages/wui-react/src`。只构建 ESM、CJS、CSS 和类型声明：

```bash
pnpm run build:lib
```

完整本地准备和验证，可直接使用一条聚合命令：

```bash
pnpm run prepare:lib:release
```

它依次执行以下步骤；需要逐步排查时分别运行：

```bash
pnpm run build:lib
pnpm run prepare:lib:publish
pnpm run check:lib-package
pnpm run check:lib-smoke
pnpm run check:lib-size
npm pack ./packages/wui-react --dry-run --ignore-scripts
```

产物为 `packages/wui-react/dist/esm`、`dist/cjs`、`dist/types` 和 `dist/style.css`。`check:lib-smoke` 验证构建后包的实际消费；`npm pack --dry-run` 查看打包清单。上述流程不会发布到 npm。根应用通过 `@wui` 消费源码，启动后台不能代替对 lib 产物的验证。

查看组件 Storybook：

```bash
pnpm run storybook
```

访问 http://localhost:6006。安装到其它项目、子路径导入及 peer 依赖见[包用法](../../NPM_README.md)，发布流程见[组件库指南](../deployment/LIBRARY_PUBLISH_GUIDE.md)。

发布到 npmjs 需要完整准备、npm login 和有发布权限的账号；可以打包后上传同一 tarball。逐条登录、版本升级、发布和核验命令见[构建与 npmjs 发布指南](../deployment/LIBRARY_PUBLISH_GUIDE.md#打包并发布同一份产物)。

## 真实用户登录

此流程运行仓库自带的单实例 SQLite 企业后端，实际校验租户、邮箱、密码和服务端权限。先停止演示服务，然后用编辑器修改根 `.env.development.local`：

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
ENTERPRISE_TOTP_KEY=<64位十六进制密钥>
```

将示例密码替换为自己的值，租户 ID 使用小写字母开头的字母、数字、`_` 或 `-`。先运行 `openssl rand -hex 32`，把输出的 64 位十六进制字符串填入 `ENTERPRISE_TOTP_KEY`；此密钥只供 API 读取，应长期保留。本地配置文件已被 Git 忽略；初始化变量只在 API 端读取。

```bash
# 首次初始化：创建租户和 tenant-admin 管理员
pnpm run api:bootstrap
```

看到 `Tenant provisioned` 后，从文件中删除五项 `ENTERPRISE_BOOTSTRAP_*`，保留 mock、API 和存储配置；记住刚才设置的密码。初始化**每个租户只执行一次**，已有租户会返回冲突，不能用它重置密码。

```bash
# 后续启动；start:enterprise:full 与此等效
pnpm run start:enterprise
```

访问 http://localhost:8080/#/signin，填写：

| 字段    | 上面配置对应的值       |
| ------- | ---------------------- |
| 租户 ID | `acme`                 |
| 邮箱    | `admin@example.com`    |
| 密码    | 初始化时设置的自选密码 |

自建租户登录界面不显示本地演示凭据。登录后可从左侧**登录验证器**绑定 TOTP，之后登录要再输入当前动态码或一次性恢复码；详见[绑定与恢复步骤](../operations/ENTERPRISE.md#企业账号登录验证器-totp)。自建租户的默认数据库是 `api/data/enterprise.sqlite`，刷新和重启后保留用户、角色、验证器状态及审计；内存埋点配置不会把业务数据库变成内存数据库。前端的同源 `/api/auth`、`/api/admin`、`/api/permissions`、`/api/roles` 由开发代理转发到全栈启动器选定的 API 端口。

### 真实模式构建后的本地预览

生产构建读取 `.env.production` / `.env.production.local`，**不读取 `.env.development.local`**。静态服务器也没有开发代理。沿用上面的租户和开发配置，在两个终端分别运行：

```bash
# 终端 1：真实 API，读取根 .env.development.local
pnpm --filter api dev
```

```bash
# 终端 2：将本地 API 地址编译进前端，构建脚本显式关闭 mock
pnpm exec cross-env APP_BASE_URL=http://127.0.0.1:5200 pnpm run build:enterprise:api
PROJECT=enterprise pnpm run serve:dist
```

访问 http://localhost:5000/#/signin，使用已创建的真实凭据。API 开发模式允许本机 loopback 来源的跨域请求；如修改了 API 端口，上面的地址也需对应修改。此构建会覆盖企业演示的 `dist-enterprise`，统计文件也共用；恢复演示产物时重新执行 `build:enterprise:stats`。

实际部署应改用部署后可访问的 API 地址或配置同源反向代理。Vercel 只部署静态前端，SQLite API 需要单实例持久主机；完整 Docker、HTTPS、租户初始化和 Vercel 登录演示步骤见[Vercel 与 SQLite 部署](../deployment/VERCEL_SQLITE.md)。生产数据库位置、CORS 等见[企业资源指南](../operations/ENTERPRISE.md)和[部署指南](../deployment/DEPLOY.md)。

## 权限设置

### 演示权限

在默认应用登录 `admin@test.com` 后访问 `http://localhost:8080/#/permission`，检查当前身份的角色授权、资源范围和菜单路由；退出后登录其它测试账号，对比可见功能。企业精简入口没有此展示页面。

演示账号权限来自 `src/platform/auth/mocks/permission.ts`，企业演示的角色编辑仅演示 CRUD。如要让新建角色决定真实账号权限，先完成上面的真实登录流程。

### 为真实用户分配角色

1. 使用初始化管理员登录，打开 `/#/administration/roles`，添加角色：名称「只读成员」、代码 `viewer`，权限选择 `home:read`、`user:read`，保存。
2. 打开 `/#/administration/users`，添加用户：填写姓名、邮箱，例如 `viewer@example.com`；设置 **12..256 字符**密码；选择 `viewer`，状态设为「启用」，保存。
3. 从头像菜单退出登录，用相同租户 `acme`、新用户邮箱和刚才的密码重新登录。
4. 验证可进入工作台和用户列表，无法添加、编辑、删除用户；角色和审计入口不应出现，直接访问对应地址也不能获得授权。
5. 退出后重新登录初始化管理员，可在审计页检查创建用户、角色和登录记录；用户页可以停用账号或设置新密码。

需要同时比较管理员和普通用户时，使用独立的无痕浏览器会话。同一浏览器、同一 origin 只有一个活动登录身份，多个标签页会同步换号。

| 能力                             | 所需权限                                      |
| -------------------------------- | --------------------------------------------- |
| 工作台                           | `home:read`                                   |
| 用户列表                         | `user:read`                                   |
| 添加 / 编辑 / 删除用户           | `user:create` / `user:update` / `user:delete` |
| 读取角色列表和用户表单的角色选项 | `role:read`                                   |
| 添加 / 编辑 / 删除角色           | `role:create` / `role:update` / `role:delete` |
| 审计列表                         | `audit:read`                                  |

用户运营角色可授予 `home:read`、`user:*`、`role:read`；在权限输入框键入 `user:*` 并确认标签。需要创建/编辑用户时必须能读取角色目录。可使用 `user:*`、`role:*` 或 `*:*` 通配权限，服务端只接受权限目录中的资源，并限制授予范围不能超过操作者自身权限；普通角色不能管理权限更高的管理员。

角色权限修改对下一次服务端请求生效；客户端权限缓存为 60 秒，窗口重新聚焦会强制同步，可重新登录立即核验菜单和按钮。账号停用、删除、角色/邮箱变更或密码重置会撤销该账号全部会话。内置 `tenant-admin` 角色受保护，最后一个有效管理员不能被停用、删除或降级。

业务路由的权限、标题、菜单元数据统一维护在 `config/route-policy.json`；新增页面还需登记到对应项目的模块/路由清单。更多实现说明见[权限与导航](../architecture/USER_ROLE_PERMISSION.md)。

## 模式切换与排查

配置优先级为外部进程环境 > `.env.<mode>.local` > `.env.<mode>` > `.env.local` > `.env`。修改浏览器变量后必须重启开发服务或重新构建，不能只刷新页面。`api:bootstrap` 和 `pnpm --filter api dev` 只读取根 `.env.development.local`；全栈启动脚本读取整套 development 文件。

| 现象                              | 检查与处理                                                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enterprise 默认显示租户登录       | 默认本地演示账号见登录页；浏览器 Mock 演示运行 `pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run start:enterprise`，然后重启服务                                                      |
| 企业接口返回 502 / 503 / 504      | 使用 `start:enterprise` 或 `start:enterprise:full` 启动，并打开终端输出的 `Open Enterprise` 地址；确认该实例的 API 已启动。8080 被占用时不要继续使用旧标签页；外部 API 需自行开启企业服务 |
| 真实登录失败 / 401                | 核对租户、邮箱、自选密码以及账号启用状态；演示账号不适用于真实模式                                                                                                                        |
| 初始化冲突 / 409                  | 租户已存在，直接启动并登录；密码重置使用已有管理员的用户管理操作                                                                                                                          |
| 静态预览返回 HTML 而不是 API JSON | `serve:dist` 没有 API 代理；按真实构建预览步骤配置 `APP_BASE_URL` 并启动独立 API                                                                                                          |
| 用户表单没有可选角色 / 403        | 操作者需要 `role:read`，同时只能分配自己可授予的角色                                                                                                                                      |
| Remote 不可用                     | 确认两个 Remote 已编译完成、端口与注册表一致、manifest/remoteEntry 可访问，再刷新 Shell 重试                                                                                              |
| 埋点页 502 / 503                  | 使用 `pnpm start` 或 `pnpm run dev:vite` 启动配套 API；检查 `TRACKING_API_PORT`、`TRACKING_API_TARGET`，不要将管理 token 注入浏览器                                                       |
| 预览了错误项目                    | 构建后用匹配的 `PROJECT` 选择目录；默认 `serve:dist` 使用 `dist`，微前端组合使用 `dist-vercel`                                                                                            |
| 浏览器显示旧版本                  | 检查 Service Worker 更新提示及站点缓存，确认当前端口和产物目录                                                                                                                            |
| 安装或构建失败                    | 核对 Node/pnpm 版本，重新执行 frozen lockfile 安装，并先处理首个类型、ESLint 或模块错误                                                                                                   |

需要运行工程检查时参阅[质量门禁](./QUALITY.md)；完整命令和环境变量清单见[自动生成参考](../reference/PROJECT_REFERENCE.md)。

## Storybook 与 GitHub 部署

查看当前源码组件，在根目录执行 `npm run storybook`，打开 http://localhost:6006。公共组件、共享 UI 和应用 UI 都有源码旁 stories；静态构建使用 `npm run build-storybook`，预览使用 `npm run serve:storybook`（6007）。独立 Vercel、Pages 子路径及 Refresh 报错排查见 [Storybook 指南](./STORYBOOK.md)。

全部静态演示可用 `PAGES_TARGET=all pnpm run build:pages` 构建到 dist-combined，再运行 `pnpm run check:pages`。GitHub Settings → Pages 选择 GitHub Actions 后，推送 main 自动部署；各场景命令、路径、标签与 Release 见 [GitHub 部署指南](../deployment/GITHUB_DEPLOYMENT.md)。Pages 不运行 SQLite API，真实登录依然连接外部持久服务。
