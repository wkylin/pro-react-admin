# Express API

这个 workspace package 提供 GitHub OAuth helper、埋点采集/管理 API，以及显式启用的企业业务后端。企业模块包含 tenant 会话、服务端 RBAC、持久化用户/角色和事务审计；公司资质接口仍需另外接入。

```bash
# 从仓库根运行，读取 .env.development.local
pnpm --filter api dev
# 配套前端和开发代理
pnpm start
```

默认开发端口 5200，内存存储无需 MongoDB；生产默认 MongoDB，需要 MONGODB_URI 和 CORS_ORIGINS。管理查询必须配置 TRACKING_ADMIN_TOKEN。采集接口具有 1 MiB JSON body 限制与进程内 IP 限速。

完整接口、变量、存储与代理边界见[API 文档](../docs/API.md)。生产部署见[部署指南](../docs/DEPLOY.md)。

根 `compose.enterprise.yaml` 提供单实例 API、SQLite 持久卷与 HTTPS 网关；生产配置从 `.env.enterprise.production.local.example` 复制。Vercel 前端连接该 API 的完整命令见[Vercel / SQLite 部署](../docs/VERCEL_SQLITE.md)。

真实业务使用 Node 24 原生 TypeScript/SQLite，开发无需额外数据库进程。设置 ENTERPRISE_ENABLED=true，按[快速上手](../docs/GETTING_STARTED.md#真实用户登录)配置并初始化，再运行根 `pnpm run start:enterprise:full` 并登录。生产需要 ENTERPRISE_DB_PATH 指向持久卷，Vercel 只部署静态前端并接入外部 API；授权和持久化行为见[企业资源指南](../docs/ENTERPRISE.md)。业务核心的 strict 检查和集成回归分别为根 `pnpm run typecheck:api`、`pnpm run test:api`。
