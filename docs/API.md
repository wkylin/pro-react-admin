# API 与埋点 helper

api/ 是独立 workspace package，保留 CommonJS Express 5、Helmet、CORS、body-parser、Mongoose 埋点与 GitHub OAuth helper。可选 api/enterprise 增加租户身份、RBAC、持久化用户/角色与事务审计；业务核心使用 Node 24 原生 TypeScript、SQLite，HTTP adapter 使用 CommonJS。公司资质等其它业务接口仍需独立接入。

```bash
pnpm --filter api dev
```

该命令读取根 .env.development.local。默认监听 127.0.0.1:5200；生产监听 0.0.0.0，端口依次取 TRACKING_API_PORT、PORT、5200。配套开发代理推荐通过 pnpm start 启动。

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

开发 Webpack 的 /api/tracking 代理在服务端注入管理 header，仅用于本地开发。静态部署不会继承该代理；生产管理页面需要真实身份鉴权和服务端代理。开发 GitHub 路由当前代理至 GitHub，不能假设它与 api/server.js 的 helper 配置完全相同。

## 企业业务接口边界

用户、角色与审计页面通过 DataProvider 接入 `/api/admin/...`，接口与资源结构、初始化配置见[企业资源](ENTERPRISE.md)。企业登录使用 POST /api/auth/login，当前会话 GET/DELETE /api/auth/session，授权 GET /api/permissions/current，角色目录 GET /api/roles。其它企业 API 要求 Bearer 会话；X-Tenant-ID 可选但必须与会话一致。Tracking 管理 token、GitHub token、演示邮箱均不能访问企业服务。

HTTP adapter 管理鉴权入口、no-store 和每 IP 登录限速；service.mts 负责租户过滤、角色授予边界、最后管理员保护和事务审计；store.mts 负责表、外键、索引、WAL、schema 版本。业务核心执行 `pnpm run typecheck:api`，真实 HTTP 回归执行 `pnpm run test:api`。

SQLite 数据库和日志需要同一主机持久卷；生产配置缺失、未知 schema 或 Vercel 环境拒绝开启。首次初始化必须显式运行 `pnpm run api:bootstrap`，不会在启动时创建默认密码。业务与会话持久化不依赖 TRACKING_STORE。停用/重置密码等撤销与审计同事务，数据库触发器限制审计为追加；数据库管理员仍有修改权限，不是外部防篡改存储。运维暂未提供迁移、备份恢复或租户管理 UI。
