# 本地 API helper

`api/` 是 pnpm workspace 中的 Express 服务，提供 GitHub OAuth token exchange、埋点收集和示例 API。主前端不依赖它；需要调试 OAuth、管理埋点或写入示例记录时再启动。

## 安装和启动

```bash
pnpm install
pnpm --filter api dev
```

默认监听 5200，可通过 `PORT` 修改。开发环境只允许 loopback 来源跨域访问；部署时通过 `CORS_ORIGINS` 配置允许的完整 Origin，例如 `https://admin.example.com`。

## 配置

| 变量 | 用途 | 默认行为 |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | GitHub OAuth App ID | OAuth helper 不可用 |
| `GITHUB_CLIENT_SECRET` | 服务端 OAuth secret | 仅在 API 进程使用，不能注入前端 |
| `TRACKING_ADMIN_TOKEN` | 查询、统计、清空埋点和写入示例 API 的管理凭据 | 未配置时管理接口返回 503 |
| `TRACKING_STORE` | `memory` 或 `mongodb` | 开发默认为 memory；生产默认为 mongodb |
| `MONGODB_URI` | MongoDB 连接地址 | 开发默认连接本机 promotion 数据库；生产使用 mongodb 时必须设置 |
| `TRACKING_RATE_LIMIT` | 单 IP 每窗口 collect 请求数 | 60 |
| `TRACKING_RATE_WINDOW_MS` | collect 限流窗口 | 60000 毫秒 |
| `CORS_ORIGINS` | 逗号分隔的来源白名单 | 生产必须显式配置 |

生产环境使用默认的 MongoDB store 时，如果 URI 缺失或连接失败，服务会拒绝启动，避免把“临时内存模式”误当成持久化服务。仅用于短期演示时可以显式设置 `TRACKING_STORE=memory`。

## 接口

- `POST /api/github-token`：服务端交换 GitHub OAuth code。
- `GET /api/github-user`、`GET /api/github-email`：使用访问 token 请求 GitHub API。
- `POST /api/tracking/collect`：接收埋点事件，不需要管理 token；每批最多 100 条，单 IP 默认每分钟最多 60 个请求。
- `GET /api/tracking/events`、`GET /api/tracking/stats`、`DELETE /api/tracking/events`：要求 `TRACKING_ADMIN_TOKEN`。
- `POST /apis`：校验并保存示例记录，要求 `TRACKING_ADMIN_TOKEN`。

JSON body 最大 1 MB。埋点字段会校验名称、类型和时间戳；不再保存请求 IP。MongoDB store 为事件创建查询索引，并在 90 天后自动清理。memory store 最多保留 10000 条，重启或多实例之间不会共享数据。

管理请求使用 `Authorization: Bearer <token>`，也可以使用 `X-API-Key`。不要把管理 token 写入 Webpack 客户端白名单、浏览器存储或仓库文件。CORS 不是身份认证，collect 端点也不要直接暴露给无边界的生产流量。

## 存储和扩展边界

MongoDB 模式提供跨进程持久化、查询和 90 天 TTL 清理。memory 模式只用于本地开发。当前速率限制是单进程内存窗口：多实例生产部署仍需在 API Gateway/CDN/WAF 设置分布式限流和滥用防护；不要把它作为 DDoS 防护。

GitHub OAuth 的 secret 只放服务端环境。埋点里的匿名 ID、会话 ID 和 properties 仍需由接入方遵循自己的隐私告知和数据最小化要求。

## 代码位置

- 服务入口：`api/server.js`
- 埋点持久化、查询和统计：`api/tracking-collect.js`
- 前端 OAuth 请求：`src/service/authService.ts`
- 本地运行步骤：[`docs/GETTING_STARTED.md`](../docs/GETTING_STARTED.md)
