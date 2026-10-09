# 本地开发与联调指南

本文档适用于 `vite` 分支。主应用、独立子项目和微前端都由 Vite 启动。

## 环境准备

| 工具 | 版本 |
| --- | --- |
| Node.js | 24.x（`>=24.0.0 <25`） |
| pnpm | 11.5.2 |

克隆 Vite 分支并安装依赖：

```bash
git clone --branch vite https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
corepack enable
corepack prepare pnpm@11.5.2 --activate
pnpm install --frozen-lockfile
```

已有仓库则先切换分支：

```bash
git switch vite
```

Vite 会按运行模式加载根目录的 `.env` 和 `.env.development` 等文件。个人本地覆盖值可放在 `.env.development.local`，不要提交账号密码、OAuth secret 或其他私密值。`VITE_*` 环境变量会进入浏览器代码，不能存放秘密。

## 启动主应用

```bash
pnpm run dev
```

打开 <http://localhost:5173/>。开发服务器会代理项目配置的 API 请求。

需要本地 Faker API 时运行：

```bash
pnpm run dev:faker
```

这个命令会同时启动主应用和 Faker 服务。

## 启动独立子项目

主应用、ProjectA 和 ProjectB 可以分别启动：

| 项目 | 启动命令 | 默认地址 |
| --- | --- | --- |
| 主应用 | `pnpm run dev` | <http://localhost:5173/> |
| ProjectA | `pnpm run dev:projectA` | <http://localhost:8081/> |
| ProjectB | `pnpm run dev:projectB` | <http://localhost:8082/> |

ProjectA 和 ProjectB 使用各自的项目入口、路由和页面目录；通用组件仍从主项目共享。

## 联调微前端

微前端开发需要三个终端。先启动两个 remote，再启动 shell：

终端一：

```bash
pnpm run start:mf:projectA
```

终端二：

```bash
pnpm run start:mf:projectB
```

终端三：

```bash
pnpm run start:mf:shell
```

在浏览器打开：

- Portal：<http://localhost:8080/#/portal>
- ProjectA remote：<http://localhost:8080/#/projectA>
- ProjectB remote：<http://localhost:8080/#/projectB>

Shell 默认从 `http://localhost:8081/remoteEntry.js` 和 `http://localhost:8082/remoteEntry.js` 加载两个 remote。三个端口都必须空闲；如果 remote 页面无法加载，先确认两个 remote 服务已经启动。

## 构建和本地预览

| 目标 | 构建命令 | 预览命令 | 产物目录 |
| --- | --- | --- | --- |
| 主应用 | `pnpm run build:production` | `pnpm run preview` | `dist/` |
| GitHub Pages 子路径 | `pnpm run build:pages` | `pnpm run preview:pages` | `dist-pages/` |
| ProjectA 独立构建 | `pnpm run build:production:projectA` | `pnpm run preview:projectA` | `dist-projectA/` |
| ProjectB 独立构建 | `pnpm run build:production:projectB` | `pnpm run preview:projectB` | `dist-projectB/` |

要组装 Vercel 同域名多路径版本，运行：

```bash
pnpm run build:mf:vercel
```

它会先构建 shell 和两个 remote，再把产物合并到 `dist-vercel/`。各构建和预览脚本详见 [Vite 构建流程](../build/VITE_BUILD.md)；微前端部署结构详见 [Vite Module Federation 部署指南](../build/MFE_DEPLOYMENT.md)。

## 常见问题

- **端口被占用：** 结束占用进程后重启。微前端模式使用固定端口 `8080`、`8081`、`8082`，端口冲突时会直接启动失败。
- **remote 页面打不开：** 确认 ProjectA、ProjectB 和 shell 都在运行，并检查 remoteEntry 地址和浏览器控制台错误。
- **API 请求失败：** 检查 `.env.development.local` 中所需的本地配置；使用 Faker 接口时同时运行 `pnpm run dev:faker`。
- **pnpm 版本不一致：** 确认 `pnpm --version` 为 `11.5.2`，再执行 `pnpm install --frozen-lockfile`。
