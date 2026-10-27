# 从源码部署到 GitHub Pages 与 Vercel

这份指南从当前仓库的脚本出发，完成两个可访问的演示站点：GitHub Pages 展示整套项目，Vercel 展示默认后台。所有命令都在仓库根目录执行；本文中的 `YOUR_NAME`、`YOUR_REPO` 和 `YOUR_PROJECT` 要换成自己的名称。

| 平台         | 谁构建                                | 本项目的入口                                                              | 构建产物                                | 适合做什么                                 |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------ |
| GitHub Pages | GitHub Actions                        | `.github/workflows/deploy-gh-pages.yml` → `build:pages`                   | `dist-combined/`                        | 展示默认应用、企业演示、微前端和 Storybook |
| Vercel       | 本机 CLI，或连接 Git 后由 Vercel 构建 | `build:production` → `vercel:prepare:default`；Git 构建使用 `vercel.json` | `.vercel/output/`；Git 构建使用 `dist/` | 部署默认后台及 GitHub 演示登录             |

GitHub Pages 是静态托管，不能运行本项目的企业 API 或持久化 SQLite。Vercel 的默认后台也只是演示前端；真实租户数据需要独立的持久化 API。先按本文完成静态演示，再看[企业 API 与 SQLite 部署](./VERCEL_SQLITE.md)。

## 先认识构建产物

源码是 `src/`、`api/` 和配置；构建是把源码转换成浏览器能加载的 HTML、JS、CSS；产物是部署平台实际接收的文件。**`pnpm run build:pages` 或 `pnpm run build:production` 只在本机生成文件，不会自动上传。**

本项目使用 Hash 路由，所以登录页地址包含 `/#/signin`。`PUBLIC_URL` 控制静态资源路径：Pages 仓库站点通常是 `/YOUR_REPO/`，Vercel 根域名是 `/`。这个值在构建时写入产物；改了部署路径，就要重新构建。

`REACT_APP_USE_MOCK=true` 表示公开演示模式。它不是线上业务授权方案。Pages 构建脚本会明确设置这个值；下文的 Vercel 命令也会明确设置。浏览器构建变量不能保存密码、数据库连接串或 OAuth 密钥。

## 准备源码与工具

仓库的 `package.json` 要求 Node.js `>=24.15.0 <25`，并固定 `pnpm@11.5.2`。先安装 Git、符合要求的 Node.js 和 pnpm，再检查版本：

```bash
node --version
npm install --global pnpm@11.5.2
pnpm --version
git --version
```

Fork 本仓库后，克隆**自己的**仓库。已有本地仓库时，确认 `git remote -v` 指向本次准备部署的仓库即可。

```bash
git clone https://github.com/YOUR_NAME/YOUR_REPO.git
cd YOUR_REPO
pnpm install --frozen-lockfile
```

`--frozen-lockfile` 使用仓库提交的 `pnpm-lock.yaml`；依赖与 CI 保持一致。每次改代码后，先在本地完成需要的检查，再提交并推送；Actions 和 Vercel 的 Git 集成只看远端提交，看不到未推送的文件。

## GitHub Pages：使用项目现有的 Actions

这是最省手工步骤的路径。工作流在推送 `main` 时构建 `all`，也支持从 Actions 页面手动选择 `default`、`enterprise`、`mfe`、`multi`、`storybook` 或 `all`。**每次部署替换整站**；希望所有入口同时保留，就选 `all`。所有选项都会包含 Storybook。

### 1. 在 GitHub 打开 Pages

1. 进入自己的仓库 **Settings → Pages → Build and deployment**，把 **Source** 设为 **GitHub Actions**。
2. 进入 **Actions**，确认 `Deploy to GitHub Pages` 工作流已启用。
3. 若仓库设置了 `github-pages` environment 的部署限制，允许 `main` 分支，并按仓库规则批准部署。

现有工作流已经声明 `contents: read`、`pages: write` 和 `id-token: write`，并负责安装 Node 24、pnpm 11.5.2、依赖和部署所需的 Actions。普通 Fork 不需要另存一个 Pages token。

### 2. 先看构建计划，再按需本地验证

下列示例以仓库名 `YOUR_REPO` 的项目站点为例；把域名和路径换成自己的实际 Pages 地址。

```bash
PAGES_TARGET=default \
PAGES_SITE_URL=https://YOUR_NAME.github.io \
PAGES_BASE_PATH=/YOUR_REPO/ \
node scripts/build-pages.mjs --dry-run
```

这个命令只打印计划。真正构建默认应用和 Storybook：

```bash
PAGES_TARGET=default \
PAGES_SITE_URL=https://YOUR_NAME.github.io \
PAGES_BASE_PATH=/YOUR_REPO/ \
pnpm run build:pages

pnpm run check:pages
```

输出位于 `dist-combined/`。可以查看其中的 `deployment.json`、`portal.html` 和 `.nojekyll`。`deployment.json` 的 `base` 应是 `/YOUR_REPO/`。本地执行不会发布到 GitHub。

若需要与自动工作流一样构建全部示例，将 `PAGES_TARGET=default` 改成 `PAGES_TARGET=all`。`all` 会依次构建多个应用和 Storybook，耗时及资源消耗明显更高。Windows 终端可用 `pnpm exec cross-env` 设置上述环境变量；工作流本身会从 Pages 设置读取实际域名和基础路径。

### 3. 提交并触发部署

```bash
git status --short
git add -A
git commit -m "docs: prepare Pages demo"
git push origin main
```

推送 `main` 会自动触发 `Deploy to GitHub Pages`，目标为 `all`。也可以在 **Actions → Deploy to GitHub Pages → Run workflow** 选择 `main` 与 `target=default`，先发布较小的演示站点。打开运行记录，等待 **Build selected applications and Storybook**、**Verify built assets**、**Deploy** 都成功，然后从 Summary 点击实际预览地址。

需要命令行手动触发时，可安装并登录 [GitHub CLI](https://cli.github.com/)：

```bash
gh workflow run deploy-gh-pages.yml --ref main -f target=all
gh run list --workflow deploy-gh-pages.yml --limit 5
# 将 RUN_ID 换成上一条命令显示的本次运行 ID
gh run watch RUN_ID --exit-status
```

### 4. 验收地址与路径

以原仓库为例，站点根路径是 `https://wkylin.github.io/pro-react-admin/`。Fork 后通常改为 `https://YOUR_NAME.github.io/YOUR_REPO/`。打开 `portal.html` 可看到本次实际打包的入口；只有选择 `all` 或相应目标时，下列路径才存在。

| 内容         | 相对于 Pages 站点根路径的地址 |
| ------------ | ----------------------------- |
| 默认后台     | `#/signin`                    |
| 企业演示     | `enterprise/#/signin`         |
| 微前端 Shell | `mfe/#/portal`                |
| Storybook    | `storybook/`                  |
| 部署清单     | `deployment.json`             |

工作流的 `configure-pages` 会读取真实 `origin` 和 `base_path`，再让脚本分别为各子项目设置 `PUBLIC_URL`。若使用自定义域名，路径可能是 `/`；以 Actions Summary 返回的 URL 和线上 `deployment.json` 为准。手动把 `dist-combined/` 上传到 `gh-pages` 分支属于另一种发布方式，完整步骤见[手动部署指南](./MANUAL_DEPLOYMENT.md#4-本地构建并上传-github-pages)。

## Vercel：部署默认后台

以下 CLI 路径直接上传本项目准备好的静态产物和一个 GitHub OAuth 函数。未设置 OAuth 变量时，GitHub 登录入口不会启用，普通演示登录仍可使用。该流程需要 Vercel 账号和项目的部署权限。

### 1. 建立 Vercel 项目

在 Vercel 新建项目，项目根目录设为**仓库根目录**，Node.js 版本选 **24.x**。记下项目名 `YOUR_PROJECT`。若此项目连接了 GitHub，推送 `main` 也可能触发 Vercel 自动部署；使用下面的手工 `--prebuilt` 流程时，先在项目的 Git 设置中关闭同一项目的自动生产部署，避免普通源码构建随后覆盖手工产物。

在本机安装 CLI 并登录：

```bash
npm install --global vercel@latest
vercel login
vercel link --project YOUR_PROJECT
vercel pull --yes --environment=production
```

`vercel link` 将本目录关联到项目；关联信息在 Git 忽略的 `.vercel/` 中。若你维护多个 Vercel 项目，发布前核对关联的项目名。

### 2. 构建默认后台

```bash
pnpm exec cross-env \
  PROJECT=default MFE_ROLE= PUBLIC_URL=/ REACT_APP_USE_MOCK=true APP_BASE_URL= \
  pnpm run build:production

pnpm run vercel:prepare:default
```

第一条调用当前仓库的 Webpack 生产构建，默认应用写入 `dist/`。第二条检查 `dist/version.json`，将构建结果及一个 GitHub OAuth 函数整理为 Vercel Build Output API 的 `.vercel/output/`。这一步只准备文件，不上传。检查两项关键文件：

```bash
ls dist/index.html dist/version.json
ls .vercel/output/config.json .vercel/output/static/index.html
```

`PUBLIC_URL=/` 与 Vercel 根路径匹配。`PROJECT=default` 和空的 `MFE_ROLE` 避免把此前终端会话的其他项目设置带入构建。`APP_BASE_URL=` 表示同源 API；此演示使用 mock，不依赖企业 API。不要把 `.env.*.local`、`.vercel/` 或真实密钥提交到 Git。

### 3. 发布这份产物并检查

```bash
vercel deploy --prebuilt --prod
```

CLI 返回本次生产 URL。打开 `https://YOUR_PROJECT.vercel.app/#/signin`，确认 HTML、JS、CSS 正常加载，再用演示账号登录。默认演示账号 `admin@test.com` 的密码由当前浏览器填充，项目没有统一固定密码。也可以打开浏览器开发者工具的 Network，确认资源地址以 `/static/` 开头且没有 404。

`--prebuilt` 上传已经生成的 `.vercel/output/`；修改源码或构建时环境变量后，必须重新执行第 2 步，再发布。生产域名以 CLI 返回和 Vercel 项目设置为准，不要仅凭项目名猜测。

### 4. 若想改用 Git 推送自动部署

在 Vercel 的 **Add New → Project** 中导入 GitHub 仓库，Root Directory 选仓库根目录，Production Branch 选 `main`，Node.js 选 24.x。本仓库根 `vercel.json` 使用 `scripts/build-vercel-default.mjs` 构建默认演示后台到 `dist/`，并配置页面及 GitHub OAuth 路由。脚本设置 `REACT_APP_USE_MOCK=true`、`PUBLIC_URL=/`；Production 有 Sentry 令牌时上传 source map，Preview 无令牌时直接构建。推送到连接的分支后，Vercel 会从 Git 中拉取**已提交**的源码并重新构建。

根 `.vercelignore` 只保留 `api/github.js` 作为前端项目的 Function；独立 Enterprise API 由 `apps/enterprise-api` 项目部署。Preview 来自非生产分支或手动部署，推送 `main` 只更新 Production。首次导入后核对 Functions 清单和 `/api/demo/github/config` 路由。[GitHub 演示登录配置](./VERCEL_GITHUB_LOGIN.md)

## 其他目标与必要边界

| 想部署的内容                     | 从哪里继续                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Vercel 企业前端的 mock 演示      | [Vercel 与 SQLite 指南：路径一](./VERCEL_SQLITE.md#路径一纯-vercel-演示登录)             |
| Vercel 企业前端 + 真实持久化 API | [Vercel 与 SQLite 指南：路径二](./VERCEL_SQLITE.md#路径二vercel-前端--持久化-sqlite-api) |
| Vercel 微前端 Shell + Remotes    | [手动部署指南：Shell + Remotes](./MANUAL_DEPLOYMENT.md#53-shell--remotes-同域聚合)       |
| Pages 多项目、微前端与自定义域名 | [GitHub Pages 详细指南](./GITHUB_DEPLOYMENT.md)                                          |

GitHub Pages 不能运行服务端程序；Vercel 的临时文件系统也不能作为本项目 SQLite 数据库的持久卷。对外提供真实注册、登录、权限和业务数据时，应部署独立 HTTPS API，并按[企业 API 指南](./VERCEL_SQLITE.md)配置前端地址与服务端存储。

## 失败时从哪里查

| 现象                          | 先检查                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| Pages 显示 404                | Settings → Pages 的 Source、Actions 部署结果、最新 `deployment.json` 是否包含所访问目标 |
| Pages 页面出现但 JS/CSS 404   | `PAGES_BASE_PATH`、构建时的 `PUBLIC_URL`、资源是否真的在 `dist-combined/`               |
| Vercel 显示错误应用或旧版本   | `vercel link` 的项目、`dist/version.json`、`.vercel/output/static/` 与此次部署 URL      |
| Vercel 登录页能打开但资源 404 | 是否把 Pages 的 `/YOUR_REPO/` 产物用于 Vercel；重新以 `PUBLIC_URL=/` 构建               |
| 真实数据写入后丢失            | 是否误把 mock 演示或 Vercel 临时文件系统当成持久化服务；查看企业 API 部署               |

**最后核对：**线上 URL 能打开；`/#/signin` 能加载；部署版本与预期提交一致；浏览器 Network 没有静态资源 404；演示登录可完成；没有把 `.env.*.local` 或密钥加入仓库。

本指南对应的项目配置是 [Pages 工作流](../../.github/workflows/deploy-gh-pages.yml)、[Pages 构建脚本](../../scripts/build-pages.mjs)、[Vercel 配置](../../vercel.json)和[默认应用预构建脚本](../../scripts/prepare-vercel-default.mjs)。平台操作以 [GitHub Pages 发布源文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[Vercel 构建设置](https://vercel.com/docs/builds/configure-a-build)和[Vercel 预构建部署](https://vercel.com/docs/cli/deploy)为准。
