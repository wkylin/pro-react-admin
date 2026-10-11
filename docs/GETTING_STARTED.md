# 快速开始

## 环境

应用要求 Node.js >=24.15.0 且 <25，包管理器声明为 pnpm 11.5.2。使用仓库的 pnpm-lock.yaml 安装，避免混用 npm/yarn 修改锁文件。

```bash
pnpm install --frozen-lockfile
pnpm run start:enterprise
# 完整展示应用与本地 API：pnpm start
```

`pnpm start` 通过 scripts/dev-tracking.mjs 同时启动前端与 Express helper。默认前端 http://localhost:8080，API 127.0.0.1:5200；实际端口以终端为准。开发默认使用内存埋点存储，不需要 MongoDB，脚本为 API 与开发代理共享临时管理 token。只运行前端可使用 `pnpm run start:web`，此时埋点服务须自行启动。

企业入口仅包含工作台、用户、角色与审计模块，独立于展示路由。演示可使用 admin@test.com 超级管理员、manager@test.com 管理员、business@test.com 业务员、user@test.com 普通用户；登录页面的演示机制不是真实服务认证。资源接入见[企业模块](ENTERPRISE.md)。

## 本地配置

在根目录创建 .env.development.local。不要提交凭据。脚本与 Webpack 会读取开发配置，外部进程环境变量具有优先级。

```dotenv
REACT_APP_USE_MOCK=true
APP_BASE_URL=
TRACKING_STORE=memory
TRACKING_API_PORT=5200
```

仓库 .env 模板（包括生产模板）显式开启 mock 授权，适合演示。只有 `REACT_APP_USE_MOCK=true` 才启用演示权限。接入真实服务时设为 false，并提供 `/api/permissions/current`、`/api/roles`；APP_BASE_URL 为空表示同源，不再隐式启用 mock。本地 api/ 不实现这两个授权接口，详见[权限](USER_ROLE_PERMISSION.md)。

应用使用 Hash 路由，例如 `/#/permission`。演示登录使用本地身份，GitHub OAuth 则还需要服务端 helper 与 OAuth App 配置。GitHub client secret 只放服务端，浏览器变量清单见[实现参考](PROJECT_REFERENCE.md)。

## 常用操作

```bash
pnpm run typecheck
pnpm run typecheck:boundaries
pnpm run typecheck:lib
pnpm run check:route-contract
pnpm run test:jest --runInBand
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run serve:dist
pnpm run test:e2e
pnpm run storybook
```

多项目和微前端是不同构建目标，见[多项目](MULTI_PROJECT.md)和[微前端](MFE_DEPLOYMENT.md)。组件包构建见[组件库](LIBRARY_PUBLISH_GUIDE.md)。

## 排查

- 权限为空：确认 mock 开关、登录身份、服务响应格式及网络错误。真实服务失败会撤销本次授权，不会退回演示角色。
- 埋点页 502：使用 pnpm start 启动配套 API，或检查 TRACKING_API_TARGET。
- 埋点管理 401/503：确认服务端管理 token 与代理配置，不能把管理 token 注入浏览器。
- 构建失败：先阅读首个 ESLint/类型/模块错误，检查 Node、pnpm 和 frozen lockfile 是否一致。
- 浏览器显示旧版本：检查 Service Worker 更新提示、HTML 缓存及 PUBLIC_URL。
