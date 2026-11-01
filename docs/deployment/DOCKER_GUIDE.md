# Docker 入门到进阶：pro-react-admin

本文围绕仓库现有 Docker 配置做练习。完成后，你会能构建并运行两种镜像：只提供前端静态文件的 Nginx 镜像，以及带持久化 SQLite 和 HTTPS 网关的 Enterprise API 服务。

## 1. 先看懂仓库里的容器

仓库有两条不同的容器路径，不要把它们当成同一个应用镜像：

| 路径           | 文件                                                        | 容器做什么                                                 | 适合什么场景                           |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| 静态站点       | `deploy/Dockerfile`                                         | 把已有 `dist-*` 产物复制到非 root Nginx，监听容器端口 8080 | 自建静态站点、预览已构建前端           |
| Enterprise API | `deploy/enterprise/Dockerfile` 与 `compose.enterprise.yaml` | Node API、SQLite 持久卷、Caddy HTTPS 网关                  | 有持久磁盘的单实例 Enterprise API 主机 |

静态镜像**不会构建前端**；需要先运行 pnpm build。Enterprise 镜像则在镜像构建时用 pnpm 安装 API 的生产依赖。不要把 SQLite 放入静态镜像，也不要把 SQLite 文件放在容器可写层中。

| Docker 概念                 | 在本仓库中的对应物                                             |
| --------------------------- | -------------------------------------------------------------- |
| Image（镜像）               | 已打包的 Nginx 静态站点或 Enterprise API                       |
| Container（容器）           | 镜像启动后的进程；销毁容器不应等于删除业务数据                 |
| Build context（构建上下文） | `docker build` 命令最后的路径；这里通常是仓库根目录 `.`        |
| Volume（卷）                | Compose 的 `enterprise-data`，保存 `/data/enterprise.sqlite`   |
| Network（网络）             | Compose 自动创建的内部网络；Caddy 用服务名 `api:5200` 访问 API |
| Port mapping（端口映射）    | `主机端口:容器端口`；静态练习映射 `8080:8080`                  |

## 2. 准备环境

仓库要求 Node.js `>=24.15.0 <25` 和 pnpm `12.16.1`。Docker 命令由 Docker Engine 执行；macOS 开发机通常需要先启动 Docker Desktop。

```bash
node --version
pnpm --version
docker --version
docker compose version
docker info
```

`docker --version` 只检查 CLI 是否安装；`docker info` 才能确认 CLI 已连接到可用 daemon。若看到 `Cannot connect to the Docker daemon`，先启动 Docker Desktop。

## 3. 入门练习：构建静态站点镜像

这个练习从源码生成 `dist-enterprise`，再把该目录封装进 Nginx 镜像。站点用根路径部署，所以构建时将 `PUBLIC_URL` 设为 `/`。

```bash
PUBLIC_URL=/ pnpm run build:enterprise
docker build \
  -f deploy/Dockerfile \
  --build-arg ARTIFACT_DIR=dist-enterprise \
  -t pro-react-admin-static:local \
  .
```

逐项理解这条构建命令：

- `-f deploy/Dockerfile` 选择 Dockerfile；Docker 默认不会自动选择子目录中的文件。
- `--build-arg ARTIFACT_DIR=dist-enterprise` 告诉 Dockerfile 复制哪个已构建目录。
- `-t pro-react-admin-static:local` 给本地镜像命名；`local` 是标签，不是部署环境。
- 最后的 `.` 指定构建上下文为仓库根目录；Dockerfile 中的 `COPY` 路径都相对于这个目录。

启动容器并验证 HTTP 服务和健康检查：

```bash
docker run --rm -d \
  --name pro-react-static \
  -p 8080:8080 \
  pro-react-admin-static:local

curl -i http://localhost:8080/healthz
curl -I http://localhost:8080/
docker logs pro-react-static
docker stop pro-react-static
```

`/healthz` 应返回 HTTP 200 和 `ok`。该镜像只提供文件，没有业务 API；未配置代理时，`/api/` 会返回 JSON 503，这是有意设计，不是 Docker 启动失败。

### 静态站点路径

前端构建时的 `PUBLIC_URL` 必须与浏览器访问路径一致。根路径使用 `PUBLIC_URL=/`；子路径部署还需要相应的 Nginx location/alias 配置，不能只改浏览器 URL。Pages 的 `/pro-react-admin/` 产物不能直接当成根路径产物发布。详细路径规则见[Pages 与 Nginx 部署](./GITHUB_PAGES_TO_NGINX.md)。

`deploy/Dockerfile` 使用 `nginxinc/nginx-unprivileged:1.29-alpine`，镜像只复制 Nginx 配置和 `ARTIFACT_DIR`。相邻的 `deploy/Dockerfile.dockerignore` 是白名单：构建上下文默认排除，只允许 Dockerfile 需要的文件进入。

## 4. 进阶练习：Enterprise API 与 Compose

Enterprise API 使用 SQLite，需要持久主机；Compose 文件启动 `api` 和 Caddy `gateway`。只有 Caddy 暴露主机 80/443，API 的 5200 端口留在 Compose 内部网络。

### 4.1 配置与构建

在部署主机准备忽略提交的环境文件：

```bash
cp .env.enterprise.production.local.example .env.enterprise.production.local
chmod 600 .env.enterprise.production.local
```

至少确认以下值符合实际环境：

```dotenv
API_DOMAIN=api.example.com
CORS_ORIGINS=https://your-frontend.example.com
NODE_ENV=production
ENTERPRISE_ENABLED=true
ENTERPRISE_DB_PATH=/data/enterprise.sqlite
TRACKING_STORE=memory
TRACKING_API_PORT=5200
```

`API_DOMAIN` 必须解析到部署主机，且主机允许入站 TCP 80/443；Caddy 会为该域名申请和续期 TLS 证书。`CORS_ORIGINS` 是前端的精确 origin，不含路径和末尾斜线。配置文件里不要放进 Git，也不要把密码或 TOTP key 写进 Dockerfile、镜像标签或构建参数。

从仓库根目录检查 Compose 配置并构建 API 镜像：

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml config --quiet
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml build api
```

API Dockerfile 使用 Node `24.15.0`、pnpm `12.16.1`，通过 `--filter api... --prod` 安装 API 与 workspace 运行时依赖；`api...` 的省略号会把 `@pro-react-admin/server` 一并纳入。生产依赖安装使用 frozen lockfile，若 manifest 和锁文件不一致，镜像构建会失败而不是悄悄解析新版本。

### 4.2 初始化数据库与租户

首次启动前，先迁移持久卷中的数据库，再创建初始租户。把示例租户、邮箱与密码替换为实际值；不要把真实密码复制到公开文档、聊天或 shell 历史。

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml run --rm api node server/enterprise/db-admin.mjs migrate
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml run --rm api node server/enterprise/bootstrap.mjs
```

若要启用平台管理员权限，再执行：

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml run --rm api node server/enterprise/platform-admin.mjs grant --tenant acme --email admin@example.com
```

初始化成功后，从 `.env.enterprise.production.local` 删除一次性的 `ENTERPRISE_BOOTSTRAP_*` 项，保留其它运行配置。租户只初始化一次；容器重建和普通重启不应再次播种数据。

### 4.3 启动、验收和查看日志

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml up -d
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml ps
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml logs --tail=100 api gateway
curl -i https://api.example.com/api/permissions/current
```

未登录请求应到达 API 并返回 HTTP 401 JSON。DNS、证书或 Caddy 配置错误优先看 `gateway` 日志；API 启动失败或迁移错误看 `api` 日志。

## 5. 数据、更新与回滚

Compose 命名卷 `enterprise-data` 保存 `/data/enterprise.sqlite` 及 SQLite WAL 文件。容器层可以重建，业务数据库不能随之丢失。

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml exec api node server/enterprise/db-admin.mjs status
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml exec api node server/enterprise/db-admin.mjs backup /data/enterprise-backup.sqlite
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml cp api:/data/enterprise-backup.sqlite ./enterprise-backup.sqlite
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml down
```

备份文件应转移到受保护的异机存储，并按运维流程验证备份及恢复演练。`docker compose down` 删除容器但保留 named volume；**不要在生产数据仍需要时运行 `docker compose down -v`**，它会删除 Compose 管理的数据卷。

更新 API 镜像时：先备份数据库，再构建并替换 API 容器，最后验证 API 和数据库状态。

```bash
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml build api
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml up -d --no-deps api
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml logs --tail=100 api
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml exec api node server/enterprise/db-admin.mjs status
```

`depends_on` 表示启动顺序，不代表 API 已完成数据库初始化或已通过 readiness 检查。当前 SQLite 部署面向单 API 实例；不要把一个 SQLite 文件挂给多个 API 容器做横向扩容。

## 6. 进阶：构建上下文、缓存与镜像检查

### 构建上下文和 ignore 文件

Docker 只能复制构建上下文内且未被 ignore 排除的文件。Enterprise 镜像的上下文仍是仓库根目录 `.`，但 `deploy/enterprise/Dockerfile.dockerignore` 对该 Dockerfile 生效，并覆盖根 `.dockerignore`。它先用 `*` 排除全部，再按 API 运行所需的 manifest、`api/`、`server/enterprise/`、一个 auth 源文件和路由配置逐项放行。

如果新增运行时 import 却忘记放行，常见错误是 `COPY ... not found`；如果目录放行了但依赖过滤不完整，容器可能在运行时出现 `Cannot find module`。排查时分别检查：源文件是否在上下文、ignore 是否允许该路径、workspace install filter 是否包含依赖闭包。

### 检查镜像和容器

```bash
docker image ls
docker image inspect pro-react-admin-enterprise-api:local
docker history pro-react-admin-enterprise-api:local
docker compose --env-file .env.enterprise.production.local -f compose.enterprise.yaml top api
docker stats
```

发布镜像时使用不可变版本标签，例如 Git commit SHA 或发行版本；不要让生产回滚依赖一个会移动的 `latest` 标签。不要把 `.env` 文件复制进镜像，也不要用 Docker `ARG` 传秘密，因为构建参数可能留在构建记录或镜像元数据中。

### 多架构与远端仓库

进阶任务：先确认目标主机架构、Node 原生依赖和基础镜像均支持目标平台，再使用 Buildx 构建并推送多架构镜像。下列 registry 和标签是占位符：

```bash
docker buildx create --name pro-react-builder --use
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -f deploy/enterprise/Dockerfile \
  -t registry.example.com/team/pro-react-admin-api:RELEASE_TAG \
  --push \
  .
```

先在各目标架构上执行安装、镜像启动和 API smoke test，再把多架构 tag 配置到部署主机。不要假定本机 arm64 上构建成功就代表 amd64 生产机可运行。

## 7. 故障排查

| 现象                                  | 优先检查                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Cannot connect to the Docker daemon` | 启动 Docker Desktop，再检查 `docker info`                                                |
| `COPY ... not found`                  | build context 是否为根目录 `.`；对应的 `Dockerfile.dockerignore` 是否放行该文件          |
| `Cannot find module`                  | API 是否使用 `--filter api...`；workspace 包的运行时依赖是否安装                         |
| Enterprise API 提示数据库未初始化     | 先对同一个 `enterprise-data` 卷运行 `db-admin.mjs migrate` 和一次性 bootstrap            |
| 重启后租户或会话丢失                  | 检查 Compose 项目名、`enterprise-data` 卷和 `ENTERPRISE_DB_PATH`；确认没有执行 `down -v` |
| 前端页面停留在 boot splash            | 查浏览器 Network 面板中的 JS 请求；核对 `PUBLIC_URL`、Nginx 路径和实际挂载路径           |
| API 返回 CORS 错误                    | `CORS_ORIGINS` 必须精确匹配前端 origin；修改后重建/重启 API 容器                         |
| Caddy 无法签发证书                    | 核对 `API_DOMAIN` DNS、主机 80/443 入站规则以及 gateway 日志                             |

## 8. 建议练习顺序

1. 构建并运行静态镜像，解释 build context、tag、port mapping 和 `/healthz`。
2. 修改静态构建参数，比较根路径与子路径资源 URL；阅读 `deploy/nginx.conf` 的 `try_files` 规则。
3. 构建 Enterprise API 镜像，检查 Dockerfile 专属 ignore 文件和 `api...` workspace filter。
4. 用 Compose 初始化临时 SQLite 卷，重建 API 容器并确认数据仍在。
5. 做一次离机备份、校验和恢复演练，再写出自己的回滚步骤。
6. 最后再尝试 Buildx 多架构和远端 registry 发布；每一步都用 commit SHA 标记镜像并保留上一个可回滚版本。

相关部署流程见[仓库部署总览](./DEPLOY.md)、[Enterprise SQLite 部署](./VERCEL_SQLITE.md)、[Pages 与 Nginx](./GITHUB_PAGES_TO_NGINX.md)和[企业数据库备份与恢复](../operations/ENTERPRISE.md#sqlite-迁移备份与恢复)。
