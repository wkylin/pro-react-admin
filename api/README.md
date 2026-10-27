# Express API

这个 workspace package 提供 GitHub 演示登录、埋点采集/管理 API，以及显式启用的企业业务后端。企业模块包含 tenant 会话、服务端 RBAC、持久化用户/角色和事务审计；公司资质接口仍需另外接入。

```bash
# 从仓库根运行，读取 .env.development.local
pnpm --filter api dev
# 配套前端和开发代理
pnpm start
```

独立开发命令默认固定监听 5200；根目录 `pnpm start`、`pnpm run dev:webpack` 和 `pnpm run dev:vite` 从 5200 起寻找空闲端口，并同步所选前端的代理。内存存储无需 MongoDB；生产默认 MongoDB，需要 MONGODB_URI 和 CORS_ORIGINS。管理查询必须配置 TRACKING_ADMIN_TOKEN。采集接口具有 1 MiB JSON body 限制与进程内 IP 限速。

完整接口、变量、存储与代理边界见[API 文档](../docs/operations/API.md)。生产部署见[部署指南](../docs/deployment/DEPLOY.md)。

根 `compose.enterprise.yaml` 提供单实例 API、SQLite 持久卷与 HTTPS 网关；生产配置从 `.env.enterprise.production.local.example` 复制。Vercel 前端连接该 API 的完整命令见[Vercel / SQLite 部署](../docs/deployment/VERCEL_SQLITE.md)。

真实业务使用 Node 24 原生 TypeScript/SQLite，开发无需额外数据库进程。根 `pnpm run start:enterprise` 与 `pnpm run start:enterprise:full` 同时启动 Web 和此 Node API（默认 5200）；无自定义配置时自动创建隔离的本地演示库和账号 `demo` / `admin@demo.local` / `DemoAdmin123!`。默认演示库被占用时，第二个本地实例会按 API 端口使用独立的演示库文件。自建租户按[快速上手](../docs/development/GETTING_STARTED.md#真实用户登录)配置并初始化；生产需要 ENTERPRISE_DB_PATH 指向持久卷，Vercel 只部署静态前端并接入外部 API。授权和持久化行为见[企业资源指南](../docs/operations/ENTERPRISE.md)。业务核心的 strict 检查和集成回归分别为根 `pnpm run typecheck:api`、`pnpm run test:api`。

SQLite 运维入口是 `pnpm run api:db status`；同一入口也提供 `migrate`、`backup`、`verify-db`、`verify-backup` 和 `restore` 子命令。API 运行时只校验 schema，离线迁移前会自动留存旧库快照。迁移、备份/恢复和旧版本回滚边界见[企业 SQLite 运维](../docs/operations/ENTERPRISE.md#sqlite-迁移备份与恢复)。
