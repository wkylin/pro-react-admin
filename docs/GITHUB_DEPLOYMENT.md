# GitHub Pages 部署与 v5 发布

GitHub 托管代码，GitHub Actions 构建并上传静态站点，GitHub Pages 提供预览。当前部署入口是 `.github/workflows/deploy-gh-pages.yml` 与 `pnpm run build:pages`。同一站点可以同时展示默认后台、企业演示、独立多项目、微前端和 Storybook。

## 先启用 Pages

1. 将代码推送到自己的 GitHub 仓库；项目和组件站所需依赖使用仓库的 lockfile。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 确认 Actions 已启用，`github-pages` environment 允许从 `main` 部署；需要人工审批时在该 environment 的 deployment protection rules 中批准运行。
4. 推送 `main`，或打开 Actions → Deploy to GitHub Pages → Run workflow。

Workflow 默认选择 `all`。Fork 无需将路径硬编码为 `/pro-react-admin/`：configure-pages 提供真实 origin 与 base path。用户名站点和自定义域名可以部署在 `/`。

## 选择部署内容

| target       | 内容                            | 默认仓库路径                                                        |
| ------------ | ------------------------------- | ------------------------------------------------------------------- |
| `all`        | 全部演示入口与 Storybook        | 下列全部路径                                                        |
| `default`    | 完整后台展示                    | `/#/signin`                                                         |
| `enterprise` | 精简企业演示                    | `/enterprise/#/signin`                                              |
| `multi`      | 普通独立项目，不使用 Federation | `/projects/projectA/#/signin`、`/projects/projectB/#/projectB/home` |
| `mfe`        | Shell 与注册表全部 Remotes      | `/mfe/#/portal`、`/mfe/#/projectA`、`/mfe/#/projectB`               |
| `storybook`  | 仅组件站与导航入口              | `/storybook/`                                                       |

路径均相对于站点 base。例如本仓库默认企业地址是 `https://wkylin.github.io/pro-react-admin/enterprise/#/signin`。每一种 target 都包含 `/storybook/`；没有默认后台时，根 `/` 显示导航。`portal.html` 列出本次真正打包的入口，`deployment.json` 记录部署内容和挂载路径。

每次发布替换整个 Pages 站点：选择单个 target 后，上一次其它 target 的路径不会自动保留。希望所有预览链接长期可访问，应选择 `all`。

默认/企业/普通 projectA 是 mock 演示，选择 `admin@test.com` 自动填充当前浏览器生成的密码；没有统一固定密码。普通 projectB 与微前端通信示例是公开页面。演示角色编辑不会修改测试账号授权，演示数据不是服务端持久数据。

## 在 Actions 发布

推送前检查源码、文档和组件示例：

```bash
pnpm run check:docs
pnpm run check:stories
pnpm run typecheck:storybook
pnpm run test:tooling

git add -A
git commit -m "feat: prepare enterprise platform and component previews for v5"
git push origin main
```

提交前确认实际 `.env.*.local`、SQLite 数据和 `.vercel` 未进入暂存区；这些目录已由 `.gitignore` 排除。命令假设当前分支是 `main`。

使用 GitHub CLI 手动部署特定入口：

```bash
# macOS 尚未安装 gh 时：brew install gh
gh auth login --hostname github.com --web

gh workflow run deploy-gh-pages.yml --ref main -f target=default
gh workflow run deploy-gh-pages.yml --ref main -f target=enterprise
gh workflow run deploy-gh-pages.yml --ref main -f target=mfe
gh workflow run deploy-gh-pages.yml --ref main -f target=multi
gh workflow run deploy-gh-pages.yml --ref main -f target=storybook

# 同站点保留全部入口，最终选择 all
gh workflow run deploy-gh-pages.yml --ref main -f target=all
gh run list --workflow deploy-gh-pages.yml --limit 5
gh run watch --exit-status
```

选择一个部署命令执行即可；连续运行上面所有 target 会按顺序替换站点。Actions job summary 给出实际预览 URL，以 deploy-pages 成功结果为准。运行部署 workflow 不等于 Webpack CI 已通过，正式发布应同时检查质量、组件包与微前端 job。

## 本地构建同一部署产物

要求 Node 24 和 pnpm 11.5.2，在仓库根执行：

```bash
pnpm install --frozen-lockfile

# 默认应用 + Storybook
PAGES_TARGET=default pnpm run build:pages

# 企业演示 + Storybook
PAGES_TARGET=enterprise pnpm run build:pages

# 微前端 + Storybook
PAGES_TARGET=mfe pnpm run build:pages

# 普通多项目 + Storybook
PAGES_TARGET=multi pnpm run build:pages

# 全部场景
PAGES_TARGET=all pnpm run build:pages
```

选择一个场景；构建输出 `dist-combined`。普通项目与 Remote 使用相同的 registry.output，因此脚本在每次构建后立即复制到不同部署目录，避免微前端产物覆盖普通项目。构建脚本直接调用已安装 Node CLI，不依赖子进程中的全局 pnpm 启动器。

构建前查看计划，或显式指定 Fork/自定义域名：

```bash
node scripts/build-pages.mjs --dry-run

# 以下用户名和仓库名为示例，替换为自己的
PAGES_SITE_URL=https://your-name.github.io PAGES_BASE_PATH=/your-admin/ PAGES_TARGET=all pnpm run build:pages

# 自定义域名由 Pages 配置完成，域名根路径使用 /
PAGES_SITE_URL=https://admin.example.com PAGES_BASE_PATH=/ PAGES_TARGET=all pnpm run build:pages
```

macOS/Linux 支持以上环境前缀；Windows 可以使用 `pnpm exec cross-env PAGES_TARGET=all pnpm run build:pages`。本地构建不会上传；实际 Pages workflow 使用 configure-pages 的参数，不需要把示例域名写入 CI。

普通静态入口在本地根路径预览，可单独这样构建：

```bash
PAGES_TARGET=multi PAGES_BASE_PATH=/ pnpm run build:pages
pnpm exec serve dist-combined -l 5080
```

打开 http://localhost:5080/，通过导航访问项目与组件站。这里 `multi` 不包含微前端。Pages 的微前端产物写入了生产 HTTPS Remote URL，不能直接拿根 HTTP 本地服务器当作同域验证。微前端本地开发和聚合预览使用已有入口：

```bash
pnpm run build:mf:vercel
pnpm exec serve dist-vercel -l 5080
```

打开 http://localhost:5080/#/portal。该聚合构建使用根路径 Remote，区别于 Pages 仓库路径产物。详细启动步骤见 [微前端指南](MFE_DEPLOYMENT.md)。

## 资源与微前端路径

普通应用的 `PUBLIC_URL` 对应实际静态目录；Hash Router 的 `#/...` 页面路由不需要服务端 rewrite。微前端 Host 位于 `/仓库/mfe/`，每个 Remote 位于 `/仓库/mfe/projectA/` 或 `/仓库/mfe/projectB/`。Host 编译时分别注入绝对 HTTPS `MFE_PROJECTA_URL` / `MFE_PROJECTB_URL`；Remotes 各自使用独立的 PUBLIC_URL，Webpack Federation chunk 的 publicPath 仍是 auto。

不要给所有子项目继承同一个 PUBLIC_URL，也不要在 Pages 子目录继续使用 `/projectA/remoteEntry.js`。Storybook base 写入 manager 和 iframe，PDF 等资源也须保留组件站子路径。

Pages 不提供自定义缓存响应头。Remote entry/manifest 更新与旧 chunk 的保留策略比有可控网关的平台受限；需要严格缓存、独立 Remote 发版或 API 同源代理时，可使用 Vercel/Nginx 部署方案。参见 [部署与产物](DEPLOY.md)。

## 真实登录与 SQLite

GitHub Pages 只托管静态内容，不能运行 Express，不能存储可写 SQLite，也不能保管数据库凭据。当前 `build:pages` 固定使用 mock，定位为公开演示。

真实模式需先在有持久卷的 Node 24 主机部署企业 API，再以 HTTPS/CORS 连接前端。生产前端覆盖 `REACT_APP_USE_MOCK=false`、`APP_BASE_URL=https://api.example.com`，PUBLIC_URL 对应实际部署路径，并独立验证登录和越权拒绝；不要直接使用公开演示构建冒充真实权限隔离。初始化、Docker、HTTPS、Vercel 配置与数据库边界见 [Vercel / SQLite](VERCEL_SQLITE.md)。

## 创建 v5.0.0 标签与 Release

根应用标签为 `v5.0.0`；UI 包标签为 `wui-react-v5.0.0`。不要移动已经存在的标签，也不要使用 `git push --tags` 意外触发组件包重复发布。如果本次改动尚未提交，在当前 `main` 分支执行完整发布流程：

```bash
git status --short
git fetch origin main --tags
git add -A
git commit -m "feat: release enterprise platform and component previews for v5"
git tag -a v5.0.0 -m "Pro React Admin v5.0.0"
git push --atomic origin main v5.0.0
```

已经提交本次改动时跳过 `git add` 和 `git commit`。`--atomic` 要求分支与标签一起推送成功，避免分支更新被拒绝后标签仍触发 Release。首次部署前按本文开头启用 Pages；推送 `main` 触发 Pages 的 `all` 部署，推送应用标签触发 Release。

新增 `.github/workflows/release.yml` 在收到应用 `v*` 标签后校验根版本、文档与 Storybook，构建并验证 UI 包，生成 tarball/checksum，创建 GitHub Release；不会执行 npm publish。发布说明来自 `docs/releases/v5.0.0.md`。Actions 创建的 Release 只在这些检查通过后生成。

已有标签触发失败时，可重跑对应 Release workflow；不要为重跑修改标签。需要手动创建时，先确认该标签指向当前待发布提交，执行：

```bash
gh release create v5.0.0 --verify-tag --title "Pro React Admin v5.0.0" --notes-file docs/releases/v5.0.0.md
```

自动 workflow 与手动命令二选一，避免重复创建。npmjs 的 2FA/Trusted Publishing 与 GitHub Release 是两套发布流程；npm 未完成认证不表示 GitHub Release 已成功或失败。组件包构建、发布与核验命令见 [lib 发布指南](LIBRARY_PUBLISH_GUIDE.md)。

## 排查

- Pages 404：检查 Settings 的 Source、Actions deployment 是否成功，以及访问的 target 是否仍在最新 `deployment.json` 中。
- 页面打开但 chunk 404：检查部署目录与编译时 PUBLIC_URL，不能把 `/` 构建直接复制进仓库子目录。
- Shell 可以打开而 Remote 失败：检查 Remote entry/manifest 的真实 HTTPS 地址、协议/共享依赖版本和浏览器 Network；先核对当前 Pages hostname。
- Storybook 仍是旧示例：检查本次 commit 是否进入部署、浏览器缓存和 index.json；不是修改旧 npm 包版本来刷新 Storybook。
- 401/403 创建 Release：核对仓库 Actions 权限、Release job 的 contents:write 和 `v*` 标签；npm 发布权限不用于 GitHub。
