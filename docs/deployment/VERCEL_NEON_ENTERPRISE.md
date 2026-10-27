# Enterprise API：Vercel + Neon PostgreSQL

本指南用于**独立的 Enterprise API Vercel 项目**。现有 Enterprise 前端仍是另一个 Vercel 项目；浏览器通过 `APP_BASE_URL` 访问 API。实现参考 [chat-platform 的 Vercel 部署](https://github.com/wkylin/chat-platform/blob/main/apps/server/VERCEL.md)：Vercel 项目关联 Neon，生产数据写入 PostgreSQL。这个项目的租户、权限审批、TOTP 和审计需要跨多条语句的原子事务，因此后端使用 `pg` 连接池并在同一连接上运行事务，而不是单次 HTTP SQL 请求。[node-postgres 事务说明](https://node-postgres.com/features/transactions)

## 已实现的范围

| 部分 | 文件 | 作用 |
| --- | --- | --- |
| 数据库连接、事务 | `server/enterprise/postgres-store.mts` | 参数绑定、同连接事务、序列化冲突重试 |
| 版本化建表 | `server/enterprise/postgres-schema.mts` | 17 张表（含迁移表）、外键、唯一约束、审计只追加、事件通知触发器 |
| 业务接口 | `server/enterprise/postgres-service.mts` | 账号、会话、租户、角色、用户、权限、审批、TOTP、审计 |
| Vercel Function | `apps/enterprise-api/api/[...path].ts` | `/api/*` 路由、健康检查、CORS、数据库登录限速 |
| 跨实例更新 | `/api/resource-stream` + `/api/events/poll` | WebSocket 实时推送，连接故障时按审计游标轮询 |
| 运维入口 | `pnpm run api:pg` | 显式迁移、状态、首个租户、平台管理员授权 |

API 启动只校验数据库版本，不在流量请求中建表或创建默认账号。旧的 SQLite API 与本地演示仍可独立使用。PostgreSQL 的事件票据和审计游标保存在数据库，跨 Function 实例的通知来自 PostgreSQL `LISTEN/NOTIFY`；本地 SQLite API 仍提供原有 WebSocket。Neon 的连接 URL、TOTP 密钥和初始化密码只放服务端或受保护的本地运维环境，不写入前端构建变量。

Vercel 于 2026 年 10 月开放了 [Function 原生 WebSocket](https://vercel.com/docs/functions/websockets)。每条连接会固定在一个 Function 实例，达到最大执行时长后断开，因此浏览器会重新获取一次性票据并重连。连接票据只保存 SHA-256 摘要、30 秒过期且消费一次；每个会话每分钟最多发 30 张。连接建立时全量刷新管理页缓存，随后按租户和当前权限发送资源失效事件，不发送业务记录。数据库订阅失效或 WebSocket 连续失败时，浏览器改用 `/api/events/poll` 并定期尝试恢复 WebSocket。
旧版前端没有新 WebSocket 地址协商能力。新版前端在申请票据时发送 `X-Event-Transport: resource-stream-v1`；没有此头的浏览器仍得到 503 并沿用数据库轮询，避免 API 先上线时旧版页面反复连接旧地址。

API 项目的 `vercel-build` 会先检查类型，再把共享的 TypeScript 模块编译成供 Vercel 打包的 ESM 文件；生成文件已被 Git 忽略，不需手动维护或提交。

## 1. 新建独立 Vercel 项目

从本仓库 `wkylin/pro-react-admin` 导入一个新 Vercel 项目，建议命名 `pro-react-admin-enterprise-api`：

1. **Root Directory** 设为 `apps/enterprise-api`，Framework 选 `Other`。
2. 在项目设置的 Root Directory 区域启用 **Include source files outside of the Root Directory in the Build Step**，使 Function 可读取仓库根的 `api/`、`src/platform/auth/model/` 和 `config/route-policy.json`。Vercel 对新建 monorepo 项目通常默认启用此项，仍要核对。[Vercel monorepo FAQ](https://vercel.com/docs/monorepos/monorepo-faq)
3. Node.js 版本选 `24.x`。`apps/enterprise-api/package.json` 已声明此版本；使用仓库的 `pnpm-lock.yaml` 安装依赖。[Vercel Node.js Function](https://vercel.com/docs/functions/runtimes/node-js)
4. API 项目与现有前端项目保持两个独立的项目关联。不要在仓库根目录执行 `vercel link` 覆盖前端的 `.vercel/project.json`。

## 2. 创建并关联 Neon 数据库

在**新 API 项目**的 Vercel Storage / Marketplace 中添加 Neon Postgres，创建数据库并关联 API 项目的 Production 环境。Vercel 当前通过 Marketplace 提供 Postgres 集成；新项目不再创建旧版 Vercel Postgres。[Vercel Postgres](https://vercel.com/docs/postgres) 仓库的 API Function 配置在 `sin1` 区域，建库时建议选择 Neon `sin1`，让函数靠近数据库。[Vercel 区域说明](https://vercel.com/docs/regions)

在 API 项目的 Environment Variables 中核对：

| 变量 | 配置 |
| --- | --- |
| `DATABASE_URL` | Neon 的 PostgreSQL **pooled** 连接 URL，带 TLS 配置；仅 API 项目和运维终端可见 |
| `DATABASE_URL_UNPOOLED` | Neon 的 **direct** 连接 URL；仅 WebSocket Function 订阅数据库通知使用 |
| `CORS_ORIGINS` | 前端精确 origin，例如 `https://your-enterprise-frontend.vercel.app`；多个用逗号分隔 |
| `ENTERPRISE_TOTP_KEY` | 可选，`openssl rand -hex 32` 生成的 64 位十六进制密钥；启用验证器后必须保留原值 |
| `ENTERPRISE_SESSION_TTL_MS` | 可选，默认 `28800000`（8 小时） |

如集成生成的连接变量名称不同，将**池化连接 URL**复制到 API 项目的 `DATABASE_URL`，直连 URL 复制到 `DATABASE_URL_UNPOOLED`。Neon 的事务池不支持 `LISTEN/NOTIFY`，事件订阅必须使用直连；Function 实例没有活跃 WebSocket 连接时会关闭此直连。[Neon 连接池限制](https://neon.com/docs/connect/connection-pooling) 预览环境若也要连接真实数据，应使用独立 Neon 分支或数据库，并显式设置对应环境变量；不要让预览写入生产租户。数据库 URL 不放进前端 Vercel 项目。Vercel 的环境变量更新后需重新部署对应版本。

## 3. 显式建表和初始化

在有数据库访问权限的运维终端，从仓库根目录执行：

```bash
cp .env.enterprise.postgres.local.example .env.enterprise.postgres.local
# 用编辑器填入 Neon pooled DATABASE_URL
pnpm install --frozen-lockfile
pnpm run api:pg migrate
pnpm run api:pg status
```

迁移在事务及数据库 advisory lock 下运行，已存在的相同版本可重复执行；检测到未知表或不同 checksum 时会拒绝继续。v2 迁移新增事件票据表、限速表，以及审计插入后的 `NOTIFY` 触发器。旧 API 严格要求 v1，升级已有数据库时先部署兼容 v1/v2 的新 API，再执行 v2 迁移；此间管理页会继续使用轮询。不要把完整连接 URL 粘贴到命令行参数或终端日志。迁移后，在同一受保护配置文件中填写五个 `ENTERPRISE_BOOTSTRAP_*` 值，再运行：

```bash
pnpm run api:pg bootstrap
pnpm run api:pg grant-platform-admin --tenant acme --email admin@example.com
```

`bootstrap` 只创建一次指定租户及其 `tenant-admin`，不会在服务启动时自动播种。平台管理员授权仅可由数据库运维命令完成，不提供公开 HTTP 接口。成功后从本地配置删除 `ENTERPRISE_BOOTSTRAP_*`，将初始化密码交给账号所有者。若要创建其他租户，可在登录平台管理员后使用 `/api/admin/tenants` 接口。

## 4. 发布 API 与接入前端

已有 Vercel CLI 且已登录时，在**独立项目目录**关联 Vercel 项目与同一 Git 仓库；确认 `Root Directory` 仍为 `apps/enterprise-api`。将变更推送到项目的生产分支后，Vercel 会从仓库根安装 workspace 依赖并构建 API Function：

```bash
cd apps/enterprise-api
vercel link
vercel git connect https://github.com/wkylin/pro-react-admin.git
cd ../..
git push origin main
```

API 健康检查：`https://<api-project-domain>/api/health` 应返回 `{"status":"ok","database":"postgresql"}`。该检查会先验证数据库版本和 TOTP 密钥可用性。真实登录路径为 `/api/auth/login`；角色、用户、审计、审批与租户接口仍使用现有前端约定的 `/api/*` 路径。生产 API 域名需要允许浏览器访问；如果 Vercel 项目的 Deployment Protection 拦截前端请求，在确认应用登录与权限保护后，仅调整这个 API 项目的 SSO 保护设置。

在仓库根目录构建现有 Enterprise 前端，将 API **origin**（不含 `/api`）编译进浏览器包：

```bash
pnpm exec cross-env APP_BASE_URL=https://<api-project-domain> PUBLIC_URL=/ pnpm run build:enterprise:api
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

在执行最后一条命令前，确认当前根目录 `.vercel/project.json` 关联的是**前端项目**。如果前端由 Git 自动部署，则在前端项目构建变量中设置 `APP_BASE_URL` 并触发一次新构建。API 的 `CORS_ORIGINS` 必须包含前端实际打开的 origin。浏览器带 `Bearer` token 和 `X-Tenant-ID` 调用 API；前端不会收到数据库凭据。

## 验收与运维

```bash
pnpm run api:pg status
pnpm run typecheck:api
node --test server/enterprise/postgres.test.mjs
```

集成测试使用内存 PostgreSQL 兼容引擎，覆盖建表、登录、租户、RBAC、独立审批、TOTP 恢复码、审计约束、限速、一次性票据、WebSocket 事件和轮询；上线前还须在目标 Neon 数据库运行 `status` 并用真实前端完成一次登录与管理页验收。对 Neon 数据库启用项目所需的备份 / 恢复策略，并在独立分支或副本验证恢复。数据库迁移是显式操作，按本节顺序升级旧库。

| 症状 | 检查 |
| --- | --- |
| `/api/health` 返回 503 | API 项目是否有 `DATABASE_URL`、是否已迁移、TOTP 密钥是否匹配已存验证器 |
| 浏览器 CORS 错误 | `CORS_ORIGINS` 是否包含当前前端 origin（无路径和末尾 `/`） |
| 前端 404 或 HTML | `APP_BASE_URL` 是否为独立 API origin，构建后是否重新发布前端 |
| 登录 429 | 数据库中的同一客户端 10 分钟窗口登录请求超过配置上限 |
| WebSocket 无法连接 | 核对 `DATABASE_URL_UNPOOLED`、v2 迁移、`CORS_ORIGINS`、Function 的 Fluid Compute 和 `/api/resource-stream` 路由；浏览器会自动切回轮询 |
| 管理页更新延迟 | WebSocket 正常时由数据库提交触发推送；轮询兜底每 10 秒读取审计游标 |

当前 PostgreSQL 路径用于**新库初始化**。现有 SQLite 生产数据没有自动导入步骤；如需切换旧库，先设计并验证保留账号、密码哈希、principal、角色、审批、审计和 TOTP 密钥的离线迁移，再切换前端 API 地址。
