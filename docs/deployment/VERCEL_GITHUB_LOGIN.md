# Vercel 默认站点的 GitHub 登录

`https://pro-react-admin.vercel.app` 的默认应用允许任意 GitHub 账号登录演示。GitHub 身份只获得普通演示用户权限，不关联企业租户、管理员角色或业务 API。GitHub access token 只在服务端换取公开用户资料，不写入浏览器或部署产物。

## GitHub OAuth App

在 GitHub Settings → Developer settings → OAuth Apps 新建应用：

| 设置                       | 值                                                            |
| -------------------------- | ------------------------------------------------------------- |
| Homepage URL               | `https://pro-react-admin.vercel.app/`                         |
| Authorization callback URL | `https://pro-react-admin.vercel.app/api/demo/github/callback` |

关闭回调 URL 通配匹配。不要使用 GitHub Pages 地址或 Vercel Preview 域名作为此应用的回调。授权仅请求 `read:user`；授权码流程使用一次性 `state` 和 PKCE S256。

在目标 Vercel 项目的 **Production** 环境设置以下服务端变量，保存后重新部署：

| 变量                       | 值                                                            |
| -------------------------- | ------------------------------------------------------------- |
| `GITHUB_CLIENT_ID`         | GitHub OAuth App Client ID                                    |
| `GITHUB_CLIENT_SECRET`     | GitHub OAuth App Client secret                                |
| `GITHUB_DEMO_CALLBACK_URL` | `https://pro-react-admin.vercel.app/api/demo/github/callback` |
| `GITHUB_DEMO_APP_URL`      | `https://pro-react-admin.vercel.app/`                         |
| `GITHUB_SESSION_SECRET`    | 运行 `openssl rand -base64 48` 生成的独立随机值               |

不要使用 `REACT_APP_*` 存放这些值，也不要把密钥提交到仓库。五项缺失或 URL 不同源时，`/api/demo/github/config` 返回 `enabled: false`，登录按钮不显示。Preview 域名不会复用生产 OAuth 回调。

## 构建与发布

根目录的 `api/` 还包含本地 Express 服务和企业 API，不能作为 Vercel Functions 目录整体自动发布。默认站点使用 Build Output API 显式打包同一份静态应用和一个 GitHub OAuth 函数。完成 Vercel CLI 登录与项目关联后，从仓库根目录执行：

```bash
pnpm run build:production
pnpm run vercel:prepare:default
vercel deploy --prebuilt --prod
```

`vercel:prepare:default` 生成 Git 忽略的 `.vercel/output`，其中只有默认应用静态文件和 `/api/github` 函数。构建若启用 Sentry source map 上传，先按[构建指南](../development/BUILD.md)设置服务端 token。发布前检查 `.vercel/output/config.json`、`.vercel/output/static/index.html` 和 `.vercel/output/functions/api/github.func/.vc-config.json` 均已生成。

### Git 自动部署

`pro-react-admin` 项目自身的 Build Command 设为 `node scripts/build-vercel-default.mjs`、Output Directory 设为 `dist`，用于构建默认演示后台。Git 源码部署由 `.vercelignore` 保留 `/api/github` 及 `api/package.json`，后者提供 OAuth Function 的独立构建步骤；根 `vercel.json` 将四条 `/api/demo/github/*` 路径转发给它，并让同仓库的其他前端项目保留各自的构建命令。Production 配有 Sentry 令牌时上传 source map；Preview 没有令牌时仍正常构建。企业服务模块位于 `server/enterprise/`，由独立 `apps/enterprise-api` 项目部署。

Preview 部署需要从非生产分支推送或手动运行 `vercel deploy`；仅推送 `main` 会触发 Production。上线前在 Preview 核验静态页面、函数、路由及 OAuth 回调的 `code`/`state` 查询参数。手动 `--prebuilt` 仍可用于发布相同的默认演示后台；自动 Git 部署和手动部署应保持同一前端目标。[Vercel 构建配置](https://vercel.com/docs/builds/configure-a-build)

## 验收

1. `GET https://pro-react-admin.vercel.app/api/demo/github/config` 应返回 `enabled: true` 和生产站点 URL。
2. 打开 `https://pro-react-admin.vercel.app/#/signin`，GitHub 按钮应出现。使用任意 GitHub 账号授权后，页面进入工作台，角色为普通用户。
3. 退出后重新访问工作台应回到登录页。浏览器中不能出现 GitHub access token；服务端会话是八小时有效的 HttpOnly、Secure、SameSite=Lax Cookie。

Cookie 中只有带签名的公开用户资料与有效期。退出会清除浏览器 Cookie；轮换 `GITHUB_SESSION_SECRET` 会使所有现有 GitHub 演示会话失效。GitHub Pages 仍是纯静态站点，不提供此登录入口。
