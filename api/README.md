# Express helper

这个 workspace package 提供 GitHub OAuth helper 和埋点采集/管理 API，采用 CommonJS。它不实现默认应用的 `/api/permissions/current`、`/api/roles` 或公司资质业务接口。

```bash
# 从仓库根运行，读取 .env.development.local
pnpm --filter api dev
# 配套前端和开发代理
pnpm start
```

默认开发端口 5200，内存存储无需 MongoDB；生产默认 MongoDB，需要 MONGODB_URI 和 CORS_ORIGINS。管理查询必须配置 TRACKING_ADMIN_TOKEN。采集接口具有 1 MiB JSON body 限制与进程内 IP 限速。

完整接口、变量、存储与代理边界见[API 文档](../docs/API.md)。生产部署见[部署指南](../docs/DEPLOY.md)。
