# 使用 DBeaver 连接 Enterprise Neon 数据库

本项目的独立 `pro-react-admin-enterprise-api` Vercel 项目使用 Neon PostgreSQL。以下是已在 DBeaver 中连接成功的配置方式；本地 Enterprise 演示使用的 SQLite 文件不是这里的连接目标。

## 获取连接信息

从 API 项目的 Vercel Environment Variables 中查看 `DATABASE_URL`，或在有运维权限的本地工作区查看 `.env.enterprise.postgres.local`。这个 URL 包含用户名和密码，不要放入文档、截图或前端环境变量。若密码或 Neon 端点已轮换，以当前 Vercel / Neon 控制台的连接信息为准。

本次连接使用的字段如下；密码从上述受保护的配置中取得：

| DBeaver 字段 | 值 |
| --- | --- |
| 驱动 | PostgreSQL |
| 连接方式 | 主机（Host），不是 URL |
| 主机 | `ep-steep-cloud-b3s1059z-pooler.c-4.ap-southeast-1.aws.neon.tech` |
| 端口 | `5432` |
| 数据库 | `neondb` |
| 身份验证 | Username/password |
| 用户名 | `neondb_owner` |
| 密码 | `DATABASE_URL` 中该用户名后的密码；不要使用 Enterprise 管理员登录密码 |
| SSL mode | `require` |

主机名中的 `-pooler` 表示这是 Neon 的池化连接，与 API 的 `DATABASE_URL` 一致。如果需要直连，请从 API 项目的 `DATABASE_URL_UNPOOLED` 或 Neon 控制台复制直连主机名，不要凭猜测修改端点。

## 在 DBeaver 中配置

1. 新建数据库连接，选择 **PostgreSQL**。
2. 在 **主要** 标签选择 **主机**，按表格分别填写主机、端口、数据库、用户名和密码。**主机栏只填域名，不要附加 `:5432`**；端口单独填在右侧。顶部 JDBC URL 会由 DBeaver 自动生成，无需在主机模式下手工填写。
3. 不启用 **SSH**。如果顶部出现 SSH 标签且提示 `Hostname is not specified`，点击该标签旁的 **×** 移除 SSH 配置。Neon 的普通 PostgreSQL 连接不需要 SSH 跳板机。
4. 点击右上角 **＋ SSL, Proxy → SSL**，在出现的 **SSL** 标签中启用 SSL，并把 **SSL mode** 设为 `require`。连接 URL 中的 `sslmode=require` 在这里设置；不要把 URL 查询参数拼进主机栏。
5. 点击 **测试连接**。成功后点击 **确定**，在左侧展开 `neondb → Schemas → public → Tables` 查看表。

可以在 SQL 编辑器执行只读检查：

```sql
SELECT current_database(), current_user;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
```

## 常见问题

| 现象 | 检查 |
| --- | --- |
| 自动生成的 JDBC URL 出现 `:5432:5432` | 主机栏包含了端口；删除主机栏末尾的 `:5432`，端口栏保留 `5432` |
| `Hostname is not specified` | SSH 标签已启用但没有 SSH 主机；移除 SSH 配置 |
| SSL 连接错误 | 在 SSL 标签确认已启用 SSL，`SSL mode` 为 `require` |
| 用户名或密码验证失败 | 检查当前 `DATABASE_URL` 的账号和密码是否已轮换；Enterprise 管理员账号不能用于数据库认证 |
| 主机无法解析或连接超时 | 核对当前 Neon 端点和本机网络 / DNS；历史配置中的主机名可能已失效 |

此连接可能指向 Enterprise API 的真实业务数据。数据库创建、迁移和 API 部署步骤见 [Vercel + Neon 部署指南](./VERCEL_NEON_ENTERPRISE.md)。
