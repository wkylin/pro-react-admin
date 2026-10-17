# API 与埋点 helper

api/ 是独立 workspace package，保留 CommonJS Express 5、Helmet、CORS、body-parser、Mongoose 埋点与 GitHub OAuth helper。可选 api/enterprise 增加租户身份、RBAC、持久化用户/角色与事务审计；业务核心使用 Node 24 原生 TypeScript、SQLite，HTTP adapter 使用 CommonJS。公司资质等其它业务接口仍需独立接入。

```bash
pnpm --filter api dev
```

该命令读取根 .env.development.local，默认固定监听 127.0.0.1:5200；根目录 `pnpm start` 和 `pnpm run start:enterprise:full` 会从配置端口起寻找空闲端口并同步 Webpack 代理。生产监听 0.0.0.0，端口依次取 TRACKING_API_PORT、PORT、5200。

## 接口

| 方法   | 路径                  | 访问                                             |
| ------ | --------------------- | ------------------------------------------------ |
| POST   | /api/tracking/collect | 批量采集，JSON body 上限 1 MiB，进程内 IP 限速   |
| GET    | /api/tracking/events  | 查询事件，需管理 token                           |
| GET    | /api/tracking/stats   | 统计，需管理 token                               |
| DELETE | /api/tracking/events  | 清空，需管理 token                               |
| POST   | /apis                 | 保存 URL/延迟记录，需管理 token 与已连接 MongoDB |
| POST   | /api/github-token     | code 换 token，client secret 只在服务端读取      |
| GET    | /api/github-user      | GitHub 用户信息，Authorization: token ...        |
| GET    | /api/github-email     | GitHub email 列表，Authorization: token ...      |
| POST   | /api/events/ticket    | 企业 Bearer 会话申请一次性 WS 票据               |
| WS     | /api/events           | 企业租户内资源失效订阅，需票据和可信 Origin      |

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
| GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET | OAuth 服务端配置                                        |
| ENTERPRISE_ENABLED                      | true 才启用真实业务 API；默认关闭并返回 503             |
| ENTERPRISE_DB_PATH                      | 开发默认 api/data/enterprise.sqlite；生产必填持久卷路径 |
| ENTERPRISE_SESSION_TTL_MS               | 默认 28800000；范围 300000..604800000                   |
| ENTERPRISE_API_TARGET                   | Webpack 开发企业 API 代理目标，默认本地 API 端口        |

内存存储重启丢失，限速也是进程内实现。MongoDB tracking_events 有查询索引与 90 天 _receivedAt TTL。反向代理须正确处理身份、来源与 API 路径；不要将 TRACKING_ADMIN_TOKEN、client secret 注入浏览器包。

开发 Webpack 的 /api/tracking 代理在服务端注入管理 header，仅用于本地开发。静态部署不会继承该代理；生产管理页面需要真实身份鉴权和服务端代理。开发 GitHub 路由经同源 Webpack 代理转发到配套 API 的 helper；客户端无需固定本地 API 端口。实际 GitHub OAuth 仍需在服务端配置 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET。

## 企业业务接口边界

用户、角色与审计页面通过 DataProvider 接入 `/api/admin/...`，接口与资源结构、初始化配置见[企业资源](ENTERPRISE.md)。企业登录使用 POST /api/auth/login，当前会话 GET/DELETE /api/auth/session；GET /api/auth/session/tenants 列出当前身份可用组织，POST /api/auth/session/tenant 在已有成员关系间切换。授权使用 GET /api/permissions/current，角色目录使用 GET /api/roles。其它企业 API 要求 Bearer 会话；X-Tenant-ID 可选但必须与会话一致。Tracking 管理 token、GitHub token、演示邮箱均不能访问企业服务。

HTTP adapter 管理鉴权入口、no-store 和每 IP 登录限速；service.mts 负责租户过滤、角色授予边界、最后管理员保护和事务审计；store.mts 负责表、外键、索引、WAL、schema 版本。业务核心执行 `pnpm run typecheck:api`，真实 HTTP 回归执行 `pnpm run test:api`。

SQLite 数据库和日志需要同一主机持久卷；生产配置缺失、未知/待迁移 schema 或 Vercel 环境拒绝开启。schema v2 分离 principal 与组织成员关系；迁移不会按邮箱合并旧账号。首次初始化显式运行 `pnpm run api:bootstrap`（先迁移，再创建管理员），不会在启动时创建默认密码。离线迁移、带 manifest 的备份校验和恢复命令见[企业 SQLite 运维](ENTERPRISE.md#sqlite-迁移备份与恢复)。业务与会话持久化不依赖 TRACKING_STORE。停用/重置密码等撤销与审计同事务，数据库触发器限制审计为追加；数据库管理员仍有修改权限，不是外部防篡改存储。OIDC/组织账号关联策略和租户管理 UI 仍需产品策略及后续实现。

### 企业资源 WebSocket

客户端先以现有 Bearer session 调用 `POST /api/events/ticket`。返回的 256-bit 随机票据保存 30 秒、仅能消费一次，并绑定当前 session、principal 和 active tenant；WS URL 与 `Sec-WebSocket-Protocol` 都不携带 session bearer。连接使用 `wss://.../api/events`、子协议 `pro-admin-events-v1`，打开后第一帧必须发送：

```json
{ "type": "authenticate", "ticket": "<one-time-ticket>", "lastEventId": "<optional-cursor>" }
```

服务端对 Origin 使用与 CORS 相同的精确 allowlist。握手后 5 秒未认证、重复/过期票据、越权租户或错误消息会关闭连接。票据申请按 session 限速；服务端限制 pending/active 连接与消息大小。

v1 只发送无业务数据的租户资源失效：`resource.invalidate` 的 `resource` 是 `users`、`roles` 或 `audit`。管理写入成功提交后才发布主资源与审计失效；读取权限分别要求 `user:read`、`role:read`、`audit:read`，由服务端当前 session/role 再检查。事件 ID 使用租户独立 epoch 与单调序号，不包含 tenant ID 或记录 ID。

初次连接、进程重启、游标超出最近 1000 条进程内保留窗口或窗口内事件已被淘汰时，服务端发 `reset`；客户端必须失效该会话下全部资源后再记下最新 cursor。可续接时只重放 cursor 之后、同租户且当前角色可读的事件，完成后发 `ready`。session 每 15 秒重新验证，停用/注销/切换组织会关闭连接；浏览器断线采用有上限的指数退避并重新申请票据。

该契约用于单实例实时缓存失效：重启会触发全量刷新；它不是持久消息队列，也没有跨实例广播/outbox。当前不传记录内容，不实现乐观写入、服务端订阅筛选或分布式缓存。扩容到多 API 实例前，必须新增可持久顺序与跨实例发布方案并复核重放一致性。

### Web Vitals 字段

Tracking 插件使用 `web-vitals` 收集 TTFB、FCP、LCP、INP、CLS 的页面级指标，记录 value、delta、unit、rating 和 navigation type，不上传 DOM 元素归因。统计接口按最近 24 小时返回 count/avg/min/max/p75 和评级数量；MongoDB 不支持 `$percentile` 时保留其余统计并省略 p75。真实设备的 P75 仍须在目标部署收集足够有效流量后评估；本地浏览器或合成构建不代表真实设备基线。
