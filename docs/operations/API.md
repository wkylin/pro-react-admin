# API 与埋点 helper

api/ 是独立 workspace package，保留 CommonJS Express 5、Helmet、CORS、body-parser、Mongoose 埋点与 GitHub 演示 OAuth。可选 api/enterprise 增加租户身份、RBAC、持久化用户/角色与事务审计；业务核心使用 Node 24 原生 TypeScript、SQLite，HTTP adapter 使用 CommonJS。公司资质等其它业务接口仍需独立接入。

```bash
pnpm --filter api dev
```

该命令读取根 .env.development.local，默认固定监听 127.0.0.1:5200；根目录 `pnpm start`、`pnpm run dev:webpack`、`pnpm run dev:vite`、`pnpm run start:enterprise` 和 `pnpm run start:enterprise:full` 会从配置端口起寻找空闲端口并同步所选前端的代理。Enterprise 启动器在没有自定义业务库或外部 API 时启用隔离的 SQLite 演示租户；生产监听 0.0.0.0，端口依次取 TRACKING_API_PORT、PORT、5200。

## 接口

| 方法   | 路径                      | 访问                                             |
| ------ | ------------------------- | ------------------------------------------------ |
| POST   | /api/tracking/collect     | 批量采集，JSON body 上限 1 MiB，进程内 IP 限速   |
| GET    | /api/tracking/events      | 查询事件，需管理 token                           |
| GET    | /api/tracking/stats       | 统计，需管理 token                               |
| DELETE | /api/tracking/events      | 清空，需管理 token                               |
| POST   | /apis                     | 保存 URL/延迟记录，需管理 token 与已连接 MongoDB |
| GET    | /api/demo/github/config   | 演示 OAuth 是否可用                              |
| GET    | /api/demo/github/start    | 发起授权并设置一次性 state cookie                |
| GET    | /api/demo/github/callback | 服务端验证 state、交换 code 并设置会话 cookie    |
| GET    | /api/demo/github/session  | 读取已验证的演示用户资料                         |
| DELETE | /api/demo/github/session  | 注销演示会话，要求应用同源 Origin                |
| POST   | /api/events/ticket        | 企业 Bearer 会话申请一次性 WS 票据               |
| WS     | /api/events               | 企业租户内资源失效订阅，需票据和可信 Origin      |

管理端支持 `Authorization: Bearer ...` 或 X-API-Key，使用 timingSafeEqual 比较并返回 no-store；缺配置返回 503，凭据不符返回 401。采集接口不使用该管理鉴权，不应把它暴露成管理读写接口。

CORS 只允许配置的可信 origin（开发额外允许 loopback），允许 credentials 以兼容 Axios 默认配置，并由中间件响应 Authorization/X-Tenant-ID 的预检。没有使用通配 origin；企业身份仍使用 Bearer 会话，不使用跨站 Cookie。

## 服务端变量

| 变量                                    | 行为                                                    |
| --------------------------------------- | ------------------------------------------------------- |
| TRACKING_STORE                          | memory 或 mongodb；开发默认 memory，生产默认 mongodb    |
| MONGODB_URI                             | mongodb 模式必需；连接失败时该模式启动失败              |
| TRACKING_ADMIN_TOKEN                    | 埋点管理与 /apis 所需凭据                               |
| CORS_ORIGINS                            | 逗号分隔可信 origin；生产至少一个，开发允许 loopback    |
| TRACKING_RATE_WINDOW_MS                 | 限速窗口，默认 60000                                    |
| TRACKING_RATE_LIMIT                     | 每 IP 窗口内请求数，默认 60                             |
| TRACKING_API_PORT / PORT                | 监听端口                                                |
| GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET | GitHub OAuth App 凭据，仅 API 服务端读取                |
| GITHUB_DEMO_CALLBACK_URL                | GitHub OAuth App 中注册的精确回调 URL                   |
| GITHUB_DEMO_APP_URL                     | 同源演示前端根 URL，可包含部署子路径                    |
| GITHUB_SESSION_SECRET                   | 至少 32 字节的随机签名密钥，仅服务端使用                |
| ENTERPRISE_ENABLED                      | true 才启用真实业务 API；通用 API 默认关闭，两个 Enterprise 开发启动命令自动启用本地真实模式 |
| ENTERPRISE_DB_PATH                      | 开发默认 api/data/enterprise.sqlite；生产必填持久卷路径 |
| ENTERPRISE_SESSION_TTL_MS               | 默认 28800000；范围 300000..604800000                   |
| ENTERPRISE_TOTP_KEY                     | 32 字节随机密钥的 64 位十六进制，仅服务端保存           |
| ENTERPRISE_API_TARGET                   | Webpack 开发企业 API 代理目标，默认本地 API 端口        |

内存存储重启丢失；埋点与登录 IP 限速在进程内，TOTP 账号限次在 SQLite 中持久保存。MongoDB tracking_events 有查询索引与 90 天 _receivedAt TTL。反向代理须正确处理身份、来源与 API 路径；不要将 TRACKING_ADMIN_TOKEN、client secret 注入浏览器包。

开发 Webpack 的 /api/tracking 代理在服务端注入管理 header，仅用于本地开发。静态部署不会继承该代理；生产管理页面需要真实身份鉴权和服务端代理。Webpack 与 Vite 都将 `/api/demo/github` 同源代理到配套 API。GitHub OAuth App 的 Authorization callback URL 必须与 `GITHUB_DEMO_CALLBACK_URL` 完全一致，例如 `http://localhost:8080/api/demo/github/callback`；`GITHUB_DEMO_APP_URL` 对应 `http://localhost:8080/`。五项配置缺一或前后端不同源时，演示登录入口不显示。Vercel 默认站点使用单独打包的同源函数，配置和发布流程见 [Vercel GitHub 登录](../deployment/VERCEL_GITHUB_LOGIN.md)。纯静态 GitHub Pages 没有 API，不能启用此入口。

此流程仅用于 `REACT_APP_USE_MOCK=true` 的演示页面。API 验证五分钟有效的签名 `state` Cookie，并使用 PKCE S256 交换授权码和读取 GitHub 用户；GitHub access token 不返回浏览器。八小时演示会话使用带签名的 HttpOnly、SameSite=Lax Cookie，HTTPS 环境另加 Secure；浏览器只缓存公开资料且刷新时重新验证。演示权限固定为普通用户，不能访问企业 API 或自动关联租户。Cookie 可跨无共享内存的 Vercel Functions 实例验证；退出清除浏览器 Cookie，签名密钥轮换会使原有会话失效。

## 企业业务接口边界

用户、角色、租户与审计页面通过 DataProvider 接入 `/api/admin/...`，接口与资源结构、初始化配置见[企业资源](./ENTERPRISE.md)。企业登录使用 POST /api/auth/login；启用验证器的账号在密码正确后还需动态码或一次性恢复码，签发会话前由服务端校验。`/api/auth/totp` 提供当前身份的绑定、启用、恢复码更新与停用，完整流程见[企业登录验证器](./ENTERPRISE.md#企业账号登录验证器-totp)。当前会话 GET/DELETE /api/auth/session；GET /api/auth/session/tenants 仅列出当前身份可用组织，POST /api/auth/session/tenant 在已有成员关系间切换。平台管理员的 `GET/POST /api/admin/tenants`、`GET/PATCH/DELETE /api/admin/tenants/:id` 用于跨租户管理；DELETE 停用租户并撤销会话，保留数据。授权使用 GET /api/permissions/current，角色目录使用 GET /api/roles。其它企业 API 要求 Bearer 会话；X-Tenant-ID 可选但必须与会话一致。Tracking 管理 token、GitHub token、浏览器演示邮箱均不能访问企业服务。

HTTP adapter 管理鉴权入口、no-store 和每 IP 登录限速；service.mts 负责租户过滤、角色授予边界、最后管理员保护和事务审计；store.mts 负责表、外键、索引、WAL、schema 版本。业务核心执行 `pnpm run typecheck:api`，真实 HTTP 回归执行 `pnpm run test:api`。

SQLite 数据库和日志需要同一主机持久卷；生产配置缺失、未知/待迁移 schema 或 Vercel 环境拒绝开启。schema v2 分离 principal 与组织成员关系；v5 单独保存平台管理员授权。首次初始化显式运行 `pnpm run api:bootstrap`（先迁移，再创建管理员），不会在启动时创建默认密码；生产平台身份需运维人员执行 `api:platform-admin grant`。离线迁移、带 manifest 的备份校验和恢复命令见[企业 SQLite 运维](./ENTERPRISE.md#sqlite-迁移备份与恢复)。业务与会话持久化不依赖 TRACKING_STORE。停用/重置密码等撤销与审计同事务，数据库触发器限制审计为追加；数据库管理员仍有修改权限，不是外部防篡改存储。OIDC/跨组织身份关联策略仍需单独确定。

### 企业资源 WebSocket

客户端先以现有 Bearer session 调用 `POST /api/events/ticket`。返回的 256-bit 随机票据保存 30 秒、仅能消费一次，并绑定当前 session、principal 和 active tenant；WS URL 与 `Sec-WebSocket-Protocol` 都不携带 session bearer。连接使用 `wss://.../api/events`、子协议 `pro-admin-events-v1`，打开后第一帧必须发送：

```json
{ "type": "authenticate", "ticket": "<one-time-ticket>", "lastEventId": "<optional-cursor>" }
```

服务端对 Origin 使用与 CORS 相同的精确 allowlist。握手后 5 秒未认证、重复/过期票据、越权租户或错误消息会关闭连接。票据申请按 session 限速；服务端限制 pending/active 连接与消息大小。

v1 只发送无业务数据的租户资源失效：`resource.invalidate` 的 `resource` 是 `users`、`roles`、`audit` 或 `access_requests`。管理写入成功提交后才发布主资源与审计失效；读取权限分别要求 `user:read`、`role:read`、`audit:read`、`access:read`，由服务端当前 session/role 和资源范围再检查。事件 ID 使用租户独立 epoch 与单调序号，不包含 tenant ID 或记录 ID。

初次连接、进程重启、游标超出最近 1000 条进程内保留窗口或窗口内事件已被淘汰时，服务端发 `reset`；客户端必须失效该会话下全部资源后再记下最新 cursor。可续接时只重放 cursor 之后、同租户且当前角色可读的事件，完成后发 `ready`。session 每 15 秒重新验证，停用/注销/切换组织会关闭连接；浏览器断线采用有上限的指数退避并重新申请票据。

该契约用于单实例实时缓存失效：重启会触发全量刷新；它不是持久消息队列，也没有跨实例广播/outbox。当前不传记录内容，不实现乐观写入、服务端订阅筛选或分布式缓存。扩容到多 API 实例前，必须新增可持久顺序与跨实例发布方案并复核重放一致性。

### Web Vitals 字段

Tracking 插件使用 `web-vitals` 收集 TTFB、FCP、LCP、INP、CLS 的页面级指标，记录 value、delta、unit、rating 和 navigation type，不上传 DOM 元素归因。统计接口按最近 24 小时返回 count/avg/min/max/p75 和评级数量；MongoDB 不支持 `$percentile` 时保留其余统计并省略 p75。真实设备的 P75 仍须在目标部署收集足够有效流量后评估；本地浏览器或合成构建不代表真实设备基线。
