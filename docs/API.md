# API 与埋点 helper

api/ 是独立 workspace package，使用 CommonJS Express 5、Helmet、CORS、body-parser、Mongoose。它实现埋点与 GitHub OAuth helper，未提供业务授权、公司资质或用户管理服务。

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

## 服务端变量

| 变量                                    | 行为                                                 |
| --------------------------------------- | ---------------------------------------------------- |
| TRACKING_STORE                          | memory 或 mongodb；开发默认 memory，生产默认 mongodb |
| MONGODB_URI                             | mongodb 模式必需；连接失败时该模式启动失败           |
| TRACKING_ADMIN_TOKEN                    | 埋点管理与 /apis 所需凭据                            |
| CORS_ORIGINS                            | 逗号分隔可信 origin；生产至少一个，开发允许 loopback |
| TRACKING_RATE_WINDOW_MS                 | 限速窗口，默认 60000                                 |
| TRACKING_RATE_LIMIT                     | 每 IP 窗口内请求数，默认 60                          |
| TRACKING_API_PORT / PORT                | 监听端口                                             |
| GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET | OAuth 服务端配置                                     |

内存存储重启丢失，限速也是进程内实现。MongoDB tracking_events 有查询索引与 90 天 _receivedAt TTL。反向代理须正确处理身份、来源与 API 路径；不要将 TRACKING_ADMIN_TOKEN、client secret 注入浏览器包。

开发 Webpack 的 /api/tracking 代理在服务端注入管理 header，仅用于本地开发。静态部署不会继承该代理；生产管理页面需要真实身份鉴权和服务端代理。开发 GitHub 路由当前代理至 GitHub，不能假设它与 api/server.js 的 helper 配置完全相同。
