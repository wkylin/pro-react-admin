# 手动部署与版本发布

本文按当前项目的脚本和配置整理，覆盖应用、Storybook、GitHub Pages、Vercel 和 GitHub Release。所有命令默认在仓库根目录执行，Shell 示例使用 macOS/Linux；Windows 可用 Git Bash，或将环境变量前缀改为 `pnpm exec cross-env`。

当前发布版本为 **5.1.0**，应用标签 `v5.1.0` 指向提交 `09efb4ec`。重新部署已有版本只需选择该版本的代码并部署，**不需要重建标签或再次创建 Release**。后文的新版本示例使用 `5.1.1`，实际发布时替换为你选择的版本。

## 1. 选择部署路径

| 目标                              | 推荐操作                                         | 实际构建与上传方               |
| --------------------------------- | ------------------------------------------------ | ------------------------------ |
| 手动发布应用及 Storybook 到 Pages | 第 3 节：网页或 CLI 触发 Actions，选择 `all`     | GitHub Actions                 |
| 在本机构建，再发布到 Pages        | 第 4 节：上传 `dist-combined` 到 `gh-pages` 分支 | 本机构建，GitHub Pages 托管    |
| 手动发布默认后台到 Vercel         | 第 5.1 节                                        | Vercel CLI 构建并上传          |
| 发布企业前端、微前端或独立 Remote | 第 5.2～5.4 节                                   | 对应构建脚本与 Vercel CLI      |
| Storybook 独立 Vercel 站点        | 第 5.5 节，使用独立项目                          | 本机构建并上传静态产物         |
| 创建新版本 Release                | 第 6 节                                          | 标签工作流或本机打包后手动创建 |

Pages 当前的 `all` 部署包含以下路径，均相对于 `https://wkylin.github.io/pro-react-admin/`：

| 内容                     | 路径                                                                |
| ------------------------ | ------------------------------------------------------------------- |
| 默认后台                 | `/#/signin`                                                         |
| 企业演示                 | `/enterprise/#/signin`                                              |
| 普通 projectA / projectB | `/projects/projectA/#/signin`、`/projects/projectB/#/projectB/home` |
| 微前端 Shell             | `/mfe/#/portal`                                                     |
| 微前端页面               | `/mfe/#/projectA`、`/mfe/#/projectB`                                |
| Storybook                | `/storybook/`                                                       |
| 本次部署导航 / 清单      | `/portal.html`、`/deployment.json`                                  |

每次 Pages 发布会替换整个站点。`all/default/enterprise/mfe/multi/storybook` 六种 target **都会包含 Storybook**；选择 `storybook` 只保留组件站和导航。需要保留所有入口时始终选择 `all`。

## 2. 环境与代码准备

要求 Node.js `>=24.15.0 <25`、pnpm `11.5.2`、Git，以及目标平台的部署权限。

```bash
# 已安装 nvm 时选择项目所需 Node；也可通过其它方式安装符合要求的 Node 24
nvm install 24
nvm use 24
npm install --global pnpm@11.5.2
node --version
pnpm --version

# 首次取得仓库
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
pnpm install --frozen-lockfile
```

已有仓库先检查工作区，保存正在进行的修改，再更新源码：

```bash
git status --short --branch
git switch main
git pull --ff-only origin main
git fetch origin --tags
pnpm install --frozen-lockfile
```

需要严格部署 5.1.0 时，可建立独立目录，避免切换当前工作区：

```bash
git worktree add --detach ../pro-react-admin-v5.1.0 v5.1.0
cd ../pro-react-admin-v5.1.0
pnpm install --frozen-lockfile
```

后续命令在选定的部署目录执行。`git rev-parse HEAD`、根 `package.json`、`packages/wui-react/package.json` 分别记录源码提交、应用版本和组件包版本。

GitHub CLI 在 macOS 可用 `brew install gh`；其它系统按 [GitHub CLI 安装说明](https://cli.github.com/) 安装。Vercel CLI 用 npm 安装：

```bash
gh auth login --hostname github.com --web
gh auth status
gh repo view

npm install --global vercel@latest
vercel login
vercel whoami
```

只使用相应平台时安装对应 CLI 即可。Fork 要核对 `git remote -v` 和 `gh repo view` 指向自己的仓库。

发布前检查当前源码与文档：

```bash
pnpm run check:docs
pnpm run check:component-catalog
pnpm run check:stories
pnpm run typecheck:storybook
pnpm run typecheck:boundaries
pnpm run typecheck:api
pnpm run test:tooling
```

若自动生成文档过期，执行 `pnpm run generate:docs`，审阅并提交差异，再重新检查。`packages/wui-react/README.md` 在打包时由 `NPM_README.md` 生成；文档校验直接读取后者，干净 checkout 无需先构建组件库。

## 3. 手动触发 GitHub Actions 部署 Pages

### 3.1 首次配置

1. 打开仓库 **Settings → Pages → Build and deployment**，Source 选择 **GitHub Actions**。
2. 打开 **Actions → Deploy to GitHub Pages**，确认工作流已启用。
3. 检查 **Settings → Environments → github-pages** 的部署分支/标签规则。常规部署允许 `main`；部署历史标签时也要允许对应标签。若配置了 required reviewers，运行后需要在 GitHub 审批该 environment。

当前工作流同时响应 `main` 推送和手动触发。若需要今后**只由你手动发布**，编辑 `.github/workflows/deploy-gh-pages.yml`，删除 `on.push`，保留现有 `workflow_dispatch` 及其 `target` 输入，然后提交该改动。以下是修改后的触发部分，其余 job 保持原配置：

```yaml
on:
  workflow_dispatch:
    inputs:
      target:
        description: Application set (Storybook is always included)
        required: true
        default: all
        type: choice
        options: [all, default, enterprise, mfe, multi, storybook]
```

这是可选的仓库配置调整，本文不会自动修改工作流。禁用整个工作流会同时禁用手动触发，因而仅手动 Actions 模式应保留工作流启用。

### 3.2 网页操作

1. 将待部署源码提交并推送到远端。
2. 进入 **Actions → Deploy to GitHub Pages → Run workflow**。
3. Branch 选择 `main`，target 选择 `all`，点击 **Run workflow**。
4. 打开这次运行，等待构建、资源校验、上传和 **Deploy** 全部成功。
5. 在 Summary 查看实际站点 URL，并执行第 7 节的线上核验。

Actions 在远端 checkout 选定版本；本地未提交、未推送的改动不会出现在部署中。

### 3.3 CLI 操作

```bash
gh workflow run deploy-gh-pages.yml --ref main -f target=all
gh run list --workflow deploy-gh-pages.yml --limit 5

# 将 RUN_ID 替换为本次运行的数字 ID
gh run watch RUN_ID --exit-status
gh run view RUN_ID
```

仅在确实要替换站点内容时改变 target。失败后先查看日志，再重试：

```bash
gh run view RUN_ID --log-failed
gh run rerun RUN_ID --failed
gh run watch RUN_ID --exit-status
```

## 4. 本地构建并上传 GitHub Pages

这条路径使用 `gh-pages` 分支，适合由本机控制构建和上传。与第 3 节的 Actions Pages 模式选择其一。

### 4.1 一次性切换托管方式

```bash
gh workflow disable deploy-gh-pages.yml
gh run list --workflow deploy-gh-pages.yml --limit 5
```

等待已运行的 Pages 部署结束；禁用工作流不会取消正在运行的任务。上传分支后，在 **Settings → Pages** 将 Source 改为 **Deploy from a branch**，Branch 选 `gh-pages`，目录选 `/(root)`。首次尚无该分支时，先完成下面的上传，再回来选择。

此模式不运行项目的全量构建工作流，GitHub 仍会执行分支内容的 Pages 发布步骤。

### 4.2 构建与校验

明确填写目标站点的 HTTPS origin 和仓库路径，Fork 不应沿用 `wkylin`：

```bash
pnpm exec cross-env PAGES_TARGET=all PAGES_SITE_URL=https://wkylin.github.io PAGES_BASE_PATH=/pro-react-admin/ APP_BASE_URL= pnpm run build:pages
pnpm run check:pages
node scripts/validate-stories.mjs --built
```

构建输出为 `dist-combined`，含默认应用、企业、普通项目、Shell/Remotes、Storybook、`portal.html`、`deployment.json` 和 `.nojekyll`。

| 场景       | `PAGES_SITE_URL`              | `PAGES_BASE_PATH`   |
| ---------- | ----------------------------- | ------------------- |
| 当前仓库   | `https://wkylin.github.io`    | `/pro-react-admin/` |
| Fork       | `https://your-name.github.io` | `/your-repo/`       |
| 用户名站点 | `https://your-name.github.io` | `/`                 |
| 自定义域名 | `https://admin.example.com`   | `/`                 |

`PAGES_SITE_URL` 只写 origin，不带仓库路径；`PAGES_BASE_PATH` 写实际资源挂载目录。微前端 Remote URL 会在构建时写入最终 HTTPS 地址，不能将一个域名的产物直接当作另一个域名的产物发布。

构建计划可先用相同的环境变量执行 `node scripts/build-pages.mjs --dry-run` 查看。Pages 的完整微前端构建在本地预览时仍会请求配置的 HTTPS Remote；只想预览本地微前端可另用 `pnpm run build:mf:vercel` 和 `pnpm exec serve dist-vercel -l 5080`，部署时使用前述 Pages 产物。

### 4.3 上传同一份产物

```bash
pnpm exec gh-pages --dist dist-combined --branch gh-pages --remote origin --dotfiles --nojekyll --message "docs: deploy Pro React Admin v5.1.0"
```

上传命令会创建/更新远端 `gh-pages` 分支中的构建产物，不会替你提交源码。`--dotfiles` 和 `--nojekyll` 保证静态资源按原样提供。这里应上传 `dist-combined`；旧 `pnpm run deploy`、`deploy:only` 面向单应用 `dist`，无法发布本指南的完整站点。

自定义域名先在 Pages 设置和 DNS 中完成域名配置，构建时使用该域名，并在上面的上传命令追加 `--cname admin.example.com`，保证整站替换后保留 `CNAME`。

上传后在 GitHub 的 Pages 部署运行中确认成功，再核验线上路径。切回 Actions 模式时，先等分支部署完成，将 Pages Source 改回 **GitHub Actions**，然后执行：

```bash
gh workflow enable deploy-gh-pages.yml
gh workflow run deploy-gh-pages.yml --ref main -f target=all
```

## 5. 手动部署 Vercel

默认后台、企业前端、微前端和独立 Storybook 可使用不同 Vercel 项目。根 `.vercel/project.json` 保存当前关联，部署前确认项目名称；切换企业或微前端项目会改变根目录关联。需要长期维护多个目标时，使用独立 checkout/worktree 保存各自关联。

在 Vercel 项目设置中选 **Node.js 24.x**。若已连接 GitHub 且只希望手动部署，可在项目 **Settings → Git** 中断开 Git 仓库集成，再使用 CLI 部署。调整后核对是否仍有正在进行的自动部署。

### 5.1 默认后台

根 `vercel.json` 明确构建默认后台，输出 `dist`：

```bash
vercel link --project pro-react-admin
vercel pull --yes --environment=production
pnpm exec cross-env PROJECT=default MFE_ROLE= PUBLIC_URL=/ REACT_APP_USE_MOCK=true APP_BASE_URL= vercel build --prod --local-config vercel.json

# 审阅生成产物后，上传本次构建的同一份文件
vercel deploy --prebuilt --prod --local-config vercel.json
```

项目名替换为自己账号中的实际名称。`vercel build` 生成 `.vercel/output`，部署命令返回的 production URL 是本次实际访问地址，应用入口为 `/#/signin`。根源码构建还可能发现 `api/` 中的 Vercel Functions；持久化企业 API 按第 5.6 节独立部署。

根脚本 `vercel-build` 是**微前端聚合**构建，不能作为默认后台的替代命令。默认后台使用 `vercel.json`；不要在同一次上传前再执行企业产物准备，后者会替换 `.vercel/output`。

### 5.2 企业演示前端

这是只上传静态前端的路径：

```bash
vercel link --project your-enterprise-project
pnpm exec cross-env REACT_APP_USE_MOCK=true APP_BASE_URL= PUBLIC_URL=/ pnpm run build:enterprise:stats
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

准备脚本将 `dist-enterprise` 复制到 `.vercel/output/static`，保留项目关联，替换旧 `.vercel/output`；不上传根 API 源码。访问部署地址的 `/#/signin`。演示登录选择 `admin@test.com` 自动填充浏览器生成的密码，完成滑块验证；演示数据刷新后重置。

### 5.3 Shell + Remotes 同域聚合

聚合部署根目录是 Shell，Remote 位于 `/projectA/`、`/projectB/`。使用 `vercel.mfe.json`：

```bash
vercel link --project your-mfe-project
vercel pull --yes --environment=production
pnpm exec cross-env PUBLIC_URL= MFE_PROJECTA_URL= MFE_PROJECTB_URL= vercel build --prod --local-config vercel.mfe.json
pnpm run check:mfe-artifacts
pnpm run check:deployment-config
vercel deploy --prebuilt --prod --local-config vercel.mfe.json
```

该配置调用 `pnpm run vercel-build`，输出 `dist-vercel`。这里显式清空父终端的 `PUBLIC_URL` 与 Remote URL，让注册表给每个项目分配自己的资源路径。也要检查 Vercel 项目下载的环境配置没有为此目标强制设置这些覆盖值。

上线检查 `/#/portal`、`/#/projectA`、`/#/projectB`，以及两个 Remote 的 `remoteEntry.js` 和 `remote-manifest.json`。

### 5.4 独立 Remote 与 Shell

先分别发布 Remote，再把它们返回的生产域名写入 Shell 构建。下面使用三个独立 Vercel 项目，逐项执行：

```bash
# Remote A
vercel link --project your-remote-a
vercel pull --yes --environment=production
pnpm exec cross-env PUBLIC_URL=/ vercel build --prod --local-config vercel.projectA.json
vercel deploy --prebuilt --prod --local-config vercel.projectA.json
```

```bash
# Remote B
vercel link --project your-remote-b
vercel pull --yes --environment=production
pnpm exec cross-env PUBLIC_URL=/ vercel build --prod --local-config vercel.projectB.json
vercel deploy --prebuilt --prod --local-config vercel.projectB.json
```

```bash
# Shell；将示例域名替换为刚才两个 Remote 的真实 production 域名
vercel link --project your-mfe-shell
vercel pull --yes --environment=production
pnpm exec cross-env PUBLIC_URL=/ MFE_PROJECTA_URL=https://remote-a.example.com/remoteEntry.js MFE_PROJECTB_URL=https://remote-b.example.com/remoteEntry.js vercel build --prod --local-config vercel.shell.json
vercel deploy --prebuilt --prod --local-config vercel.shell.json
```

Remote 的 manifest、脚本和 chunks 必须能从 Shell origin 访问，且共享依赖与协议满足当前契约。环境变量在构建时生效，改域名后要重新构建 Shell。独立普通项目不使用 Federation，启动与构建见[多项目指南](MULTI_PROJECT.md)。

### 5.5 独立 Storybook

Storybook 使用独立 Vercel 项目，下面的准备脚本把项目关联与产物放在 `artifacts/vercel-storybook`，保留根后台项目关联：

```bash
# 清除 Pages 构建的路径覆盖，重新生成域名根路径的 Storybook
pnpm exec cross-env STORYBOOK_BASE_HREF=/ pnpm run build-storybook
node scripts/validate-stories.mjs --built
pnpm run vercel:prepare:storybook
vercel link --cwd artifacts/vercel-storybook --project pro-react-admin-storybook
vercel deploy --cwd artifacts/vercel-storybook --prebuilt --prod
```

将项目名替换为自己创建的组件站项目，访问 CLI 返回域名的 `/`。不能将含 `/pro-react-admin/storybook/` base 的 Pages 产物直接部署到 Vercel 根路径；准备脚本遇到这种产物会拒绝发布。

若选择从源码构建，使用独立 checkout 关联 Storybook 项目，并明确指定 `--local-config vercel.storybook.json`。根 `vercel.json` 的构建目标是后台，不能只依赖后台项目的默认设置来构建组件站。

### 5.6 真实登录与持久 API

GitHub Pages 构建固定为公开 mock 演示。真实登录需要单实例 Node 24 API、持久 SQLite 卷和 HTTPS 网关；当前 SQLite 实现不能放在 Vercel Functions 临时文件系统中。

完整主机准备、初始化租户、Compose 与 HTTPS 命令见 [Vercel / SQLite 指南](VERCEL_SQLITE.md#路径二vercel-前端--持久化-sqlite-api)。API 成功启动后，部署前端：

```bash
vercel link --project your-enterprise-project
pnpm exec cross-env APP_BASE_URL=https://api.example.com PUBLIC_URL=/ pnpm run build:enterprise:api
pnpm run vercel:prepare:enterprise
vercel deploy --prebuilt --prod
```

`build:enterprise:api` 显式设置 `REACT_APP_USE_MOCK=false`。API 服务器的 `CORS_ORIGINS` 要与实际前端 origin 一致；数据库路径、bootstrap 密码保留在服务端。用初始化的租户、邮箱、密码登录，创建只读用户并验证重启后数据仍存在。静态页面升级与数据库升级分别管理。

## 6. 手动管理 GitHub Release

### 6.1 已发布的 5.1.0

```bash
gh release view v5.1.0
git rev-parse 'v5.1.0^{commit}'
```

当前已有 [v5.1.0 Release](https://github.com/wkylin/pro-react-admin/releases/tag/v5.1.0)，附 `w.ui-wui-react-5.1.0.tgz` 与 `SHA256SUMS`。重新部署不改变 Release，也不要删除、移动或重复创建该标签。

### 6.2 新版本由标签工作流创建

新版本发布在日常开发的 `main` 工作区进行。若此前使用第 2 节的 detached worktree 部署旧版，先回到原 `main` 仓库目录。保存已有修改并确认工作区干净，然后同步分支，检查新标签和 Release 尚未占用：

```bash
git status --short --branch
git switch main
git pull --ff-only origin main
git fetch origin --tags
git tag --list v5.1.1
git ls-remote origin refs/tags/v5.1.1
gh release view v5.1.1
```

标签查询应没有结果，Release 查询应提示不存在；遇到认证/网络错误先解决，不能将其当作版本可用。以下以新版本 `5.1.1` 为例，将应用和本轮组件包附件同步升级：

```bash
npm version 5.1.1 --no-git-tag-version --ignore-scripts
npm --prefix packages/wui-react version 5.1.1 --no-git-tag-version --ignore-scripts
```

创建 `docs/releases/v5.1.1.md`，记录本次实际变化、升级注意项和验证结果；补充根 `CHANGELOG.md`。然后执行：

```bash
pnpm run generate:docs
pnpm run check:docs
pnpm run check:component-catalog
pnpm run check:stories
pnpm run typecheck:storybook
pnpm run typecheck:boundaries
pnpm run typecheck:api
pnpm run test:tooling

git status --short
git diff --check
# 审阅全部差异后暂存源码、版本和发布说明
git add -A
git commit -m "chore: release v5.1.1"
# 确保标签推送时 Release 工作流已启用
gh workflow enable release.yml
git tag -a v5.1.1 -m "Pro React Admin v5.1.1"
git push --atomic origin main v5.1.1
```

版本更新本身不更改依赖；按仓库约定使用 `pnpm-lock.yaml`，审阅 npm 命令是否额外产生了不需要的 lockfile。组件包有独立版本约定时可保留其版本，但发布说明与附件必须描述实际版本。

`.github/workflows/release.yml` 仅响应 `v*` 标签推送，**没有 `workflow_dispatch`**。不要使用 `gh workflow run release.yml`。它校验 tag 与根版本、发布说明、文档和 Storybook，构建组件包并附校验文件。监控方式：

```bash
gh run list --workflow release.yml --limit 5
gh run watch RUN_ID --exit-status
gh release view v5.1.1
```

失败后查看日志并重跑原运行，不移动已有标签：

```bash
gh run view RUN_ID --log-failed
gh run rerun RUN_ID --failed
```

应用标签 `v*` 不会发布 npm；`wui-react-v*` 会触发另一条 npm 发布工作流。只创建 GitHub Release 时推送指定应用标签，不执行 `git push --tags`。

### 6.3 完全由本机打包并创建 Release

选择此方式时先运行 `gh workflow disable release.yml`，确认没有正在创建同一版本 Release 的工作流，避免自动流程与手动命令竞争。在 `main` 工作区完成上一节版本检查、版本修改、文档校验及源码提交，跳过其中的工作流启用、标签创建和推送步骤，然后构建并打包：

```bash
pnpm run prepare:lib:release
pnpm run build-storybook
node scripts/validate-stories.mjs --built

# 创建全新的目录；若该目录已存在，停止并检查，选择新目录后同步修改后续路径
mkdir -p artifacts/releases
mkdir artifacts/releases/v5.1.1 && npm pack ./packages/wui-react --pack-destination artifacts/releases/v5.1.1 --ignore-scripts
```

在 `artifacts/releases/v5.1.1` 中生成校验和，再回到仓库根目录：

```bash
cd artifacts/releases/v5.1.1
shasum -a 256 ./*.tgz > SHA256SUMS
shasum -a 256 -c SHA256SUMS
cd ../../..
```

Linux 也可使用 `sha256sum ./*.tgz > SHA256SUMS` 和 `sha256sum -c SHA256SUMS`。接着创建并推送未占用的标签、上传附件：

```bash
git tag -a v5.1.1 -m "Pro React Admin v5.1.1"
git push --atomic origin main v5.1.1
gh release create v5.1.1 artifacts/releases/v5.1.1/*.tgz artifacts/releases/v5.1.1/SHA256SUMS --verify-tag --title "Pro React Admin v5.1.1" --notes-file docs/releases/v5.1.1.md
gh release view v5.1.1
```

这一节替代上一节的标签工作流发布，不应连续执行两次标签创建。上传的包必须来自 `prepare:lib:release` 已完成检查的产物；单独 `npm pack` 不等于完成验证。希望未来恢复自动 Release 时执行 `gh workflow enable release.yml`，它不会补跑之前已推送的标签。

## 7. 部署后核验

Pages 发布完成后，先检查真实线上产物。下面的根版本接口适用于 `all/default`：

```bash
curl -fsSL https://wkylin.github.io/pro-react-admin/version.json
curl -fsSL https://wkylin.github.io/pro-react-admin/deployment.json
curl -fsSL https://wkylin.github.io/pro-react-admin/storybook/index.json
curl -fI https://wkylin.github.io/pro-react-admin/storybook/iframe.html
```

核对 `version`、`buildTime`、`project`；`deployment.json` 的 target 和 entries 应与本次选择一致。其它 target 读取对应子目录的版本文件，例如 `/enterprise/version.json`、`/projects/projectA/version.json` 或 `/mfe/version.json`；`storybook` target 没有应用版本接口。5.1.0 的 `all` 构建有 8 个部署入口，Storybook 索引有 376 个 story/docs 条目，这些数字是该版本基准，后续增删组件会变化。

打开浏览器检查：默认/企业应用登录、用户和角色编辑回填、技术架构与 Webpack 页面；在 Storybook 中打开本次修改的组件，检查动画、滚动、图表、视频和主题。Network 中确认 JS、CSS、图片、PDF 无路径 404；微前端额外检查 manifest、remoteEntry 和 chunks。

Vercel 用实际部署域名替换以上域名。默认/企业前端检查 `/version.json`，独立 Storybook 检查 `/index.json`、`/iframe.html`；聚合微前端检查 `/projectA/remote-manifest.json`、`/projectB/remote-manifest.json`。独立 Storybook 本身没有应用版本接口。

Release 附件可下载到单独目录检查：

```bash
mkdir -p artifacts/release-verification/v5.1.0
gh release download v5.1.0 --dir artifacts/release-verification/v5.1.0 --pattern '*.tgz' --pattern SHA256SUMS
cd artifacts/release-verification/v5.1.0
shasum -a 256 -c SHA256SUMS
tar -xOf w.ui-wui-react-5.1.0.tgz package/package.json
cd ../../..
```

同时确认 GitHub 的 Webpack CI、Release 与 Pages 各自的结果；它们是独立运行。5.1.0 发布时 Qodana 的既有失败源于无效项目令牌，需要维护者在仓库 Actions secret `QODANA_TOKEN_1824326538` 更新有效 Qodana 项目 token 后重试。

## 8. 回退与常见问题

### 8.1 Pages 回退

Actions 模式可重新部署已有标签：

```bash
gh workflow run deploy-gh-pages.yml --ref v5.1.0 -f target=all
gh run list --workflow deploy-gh-pages.yml --limit 5
gh run watch RUN_ID --exit-status
```

确保 `github-pages` environment 允许该标签，标签中的工作流也有手动触发入口。仅手动发布模式下保留工作流启用；自动模式中后续 `main` 推送仍会更新站点。

本地分支模式在第 2 节的独立 worktree 中选定历史标签，按第 4 节使用相同站点域名与 base 重新构建、校验、上传。回退站点不需要重置 `main` 或改动标签。

### 8.2 Vercel 回退

在 Vercel 项目 **Deployments** 中选择上一个已验证的生产部署，执行 **Instant Rollback**；以项目提供的回退操作为准。确认操作对象是应用、企业、微前端或 Storybook 的正确项目。回退后核验域名、版本、Remote manifest 和静态资源；真实 API/数据库独立处理，前端回退不会回退数据库数据。

### 8.3 排查表

| 现象                                | 处理                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| 看不到 Run workflow                 | 检查默认分支中存在手动入口、工作流已启用，以及仓库操作权限                                       |
| Pages 等待审批或禁止部署标签        | 检查 `github-pages` environment 的 reviewers 和分支/标签保护                                     |
| 发布 Storybook 后其它应用 404       | 本次选了 `storybook`，整站被替换；重新以 `all` 发布                                              |
| 页面能打开但 JS/CSS 404             | 核对编译时资源 base 与实际挂载路径，重新构建对应目标                                             |
| Vercel Storybook 提示 base 错误     | 设置 `STORYBOOK_BASE_HREF=/` 重建，再执行组件站准备命令                                          |
| Vercel 发布了错误应用               | 核对项目关联、`--local-config`、输出目录与本次 `.vercel/output` 来源                             |
| 微前端 Remote 无法加载              | 检查 URL、HTTPS、CORS、manifest 协议、共享依赖和 Remote 自身资源路径                             |
| 线上仍是旧界面                      | 比较 buildTime 和本次工作流提交，检查浏览器/PWA 缓存后重开页面                                   |
| `check:docs` 提示参考过期           | `pnpm run generate:docs` 后审阅并提交；不要手工维护生成表格                                      |
| Release 报 tag/version 不匹配       | 新标签必须与根版本一致；已发布标签保持原指向，修复后按新的版本发布                               |
| pnpm 启动器卡住                     | 确认 Node 24、pnpm 11.5.2 和 registry 连通；已安装依赖可按 Storybook/组件库指南使用等价 Node CLI |
| 真实登录返回 HTML、404 或 CORS 错误 | 检查公网 API、编译时 APP_BASE_URL、服务端 CORS 与 HTTPS；见真实 API 指南                         |

继续阅读：[GitHub Pages 原理与配置](GITHUB_DEPLOYMENT.md)、[Storybook 开发与资源规则](STORYBOOK.md)、[微前端协议](MFE_DEPLOYMENT.md)、[Vercel 与持久 API](VERCEL_SQLITE.md)、[组件库与 npm 发布](LIBRARY_PUBLISH_GUIDE.md)。
