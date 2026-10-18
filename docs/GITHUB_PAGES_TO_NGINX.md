# GitHub Pages 构建产物与自有 Nginx 部署

本文按当前仓库的 `.github/workflows/deploy-gh-pages.yml`、`config/pages-plan.mjs`、`scripts/build-pages.mjs` 和 `deploy/nginx.conf` 说明实际流程。GitHub Pages 托管静态文件，**不会运行仓库中的 Nginx**；`deploy/nginx.conf` 只供自建静态镜像使用。下面的 Nginx 示例用于在自己的域名上托管同类产物，不代表当前 Pages 站点的服务器配置。

## 1. GitHub Pages 当前如何发布

1. 推送 `main` 会触发 `Deploy to GitHub Pages`；也可在 Actions 中手动触发，选择 `all`、`default`、`enterprise`、`mfe`、`multi` 或 `storybook`。推送时默认 `all`。
2. Actions 在 Ubuntu 上安装 Node 24、pnpm 11.5.2 和锁文件依赖。`actions/configure-pages@v5` 读取当前仓库 Pages 的 HTTPS origin 和 base path，分别传给 `PAGES_SITE_URL`、`PAGES_BASE_PATH`。
3. 先检查 Story 覆盖与 Storybook 类型，再执行 `pnpm run build:pages`。脚本按构建计划逐个编译应用和 Storybook，并立即复制到 `dist-combined`。
4. 构建结束后检查 Storybook 索引，`pnpm run check:pages` 再检查 HTML 资源、Storybook base、Remote manifest/容器以及 Host 中的 Remote URL。
5. `actions/upload-pages-artifact@v3` 上传整个 `dist-combined`；`actions/deploy-pages@v4` 将该 artifact 发布到 GitHub Pages。仓库不通过 Nginx、SSH、`gh-pages` 分支或 Vercel 执行这条 Actions 发布链。

每次部署替换整个 Pages 站点。手动选择部分 target 后，其它 target 的入口不会从上一版自动保留。需要所有入口时选择 `all`。Pages 的 Source 应在仓库 Settings → Pages 中设为 **GitHub Actions**；部署结果以 Actions 的 Deploy 步骤和 Summary URL 为准。

## 2. 构建链和产物目录

`build:pages` 调用 `scripts/build-pages.mjs`。它先根据 `PAGES_TARGET`、`PAGES_SITE_URL`、`PAGES_BASE_PATH` 创建计划，然后依次调用 `scripts/project-command.mjs` 构建应用，以及 Storybook CLI 构建组件站。构建进程设置 `CI=true`、`NODE_ENV=production`、`SENTRY_SOURCE_MAP=no`。所有应用任务显式设置 `REACT_APP_USE_MOCK=true`，所以这套产物是公开演示站点，不能仅靠在外层设置 `REACT_APP_USE_MOCK=false` 切换为真实租户登录。

每个应用的 `PUBLIC_URL` 等于站点 base path 加上该应用的目标目录；Storybook 的 `index.html`、`iframe.html` 写入对应的 `<base href>`。普通项目和 Federation Remote 会复用注册表中的 `dist-projectA`、`dist-projectB` 构建目录，脚本必须在下一次编译覆盖它们之前复制到 `dist-combined`。构建失败会中止，不会上传不完整的 artifact。

以 `PAGES_TARGET=all` 为例，`dist-combined` 结构如下。表中路径均相对于站点 base path；应用目录内还有各自的 `assets/`、`index.html`、`version.json` 等编译文件。

| `dist-combined` 路径                       | 作用                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `index.html`                               | 默认后台入口，访问 `/#/signin`；只有未构建默认应用时才由导航页补位             |
| `portal.html`                              | 本次构建包含的应用导航，始终生成                                               |
| `deployment.json`                          | 本次 target、origin、base、应用条目及目录的清单，始终生成                      |
| `.nojekyll`                                | 供 GitHub Pages 跳过 Jekyll；Nginx 无需处理                                    |
| `enterprise/`                              | 企业演示独立入口，`enterprise/#/signin`                                        |
| `projects/projectA/`、`projects/projectB/` | 不依赖 Federation 的独立项目入口                                               |
| `mfe/`                                     | Federation Host，`mfe/#/portal`                                                |
| `mfe/projectA/`、`mfe/projectB/`           | Remote 的 `remoteEntry.js`、`remote-manifest.json`、chunks，也包含独立页面入口 |
| `storybook/`                               | Storybook 静态站点，访问 `storybook/`                                          |

任意 target 都包含 Storybook。`mfe` target 包含 Host 和两个 Remote；`all` 还构建两个独立项目，因此 ProjectB Remote 中的 Standalone 链接会指向本次站点的 `projects/projectB/`。`portal.html` 和 `deployment.json` 可用于核对一次实际构建包含哪些入口。

当前仓库的 Pages 示例地址是 `https://wkylin.github.io/pro-react-admin/`。在此地址下，`mfe/projectA/remoteEntry.js` 的完整 URL 是 `https://wkylin.github.io/pro-react-admin/mfe/projectA/remoteEntry.js`。Host 的 `MFE_PROJECTA_URL`、`MFE_PROJECTB_URL` 以及 ProjectB Standalone 链接在**构建时**写入代码；迁移域名或 base path 必须重新构建，单纯复制旧的 Pages 产物会继续请求旧地址。

## 3. 为自己的域名重新构建

要求 Node.js `>=24.15.0 <25`、pnpm `11.5.2`。以下命令在仓库根目录运行，示例域名须替换为自己的 HTTPS 域名。`PAGES_SITE_URL` 只写 origin，不带末尾目录；`PAGES_BASE_PATH` 写浏览器中的挂载路径。构建脚本校验 origin 必须是无凭据的 HTTPS 地址。

```bash
pnpm install --frozen-lockfile

# 独占域名根路径：https://admin.example.com/
PAGES_SITE_URL=https://admin.example.com \
PAGES_BASE_PATH=/ \
PAGES_TARGET=all \
APP_BASE_URL= \
pnpm run build:pages

pnpm run check:pages
```

如需挂在已有域名的 `/pro-react-admin/`，应重新执行以下构建，不能把上面的根路径产物直接放进子目录：

```bash
PAGES_SITE_URL=https://example.com \
PAGES_BASE_PATH=/pro-react-admin/ \
PAGES_TARGET=all \
APP_BASE_URL= \
pnpm run build:pages

pnpm run check:pages
```

构建前可用同一组环境变量执行 `node scripts/build-pages.mjs --dry-run` 查看每个 `PUBLIC_URL`、输出目录和 Remote URL。`APP_BASE_URL=` 在这里明确清空可能继承的 API 地址；Pages 构建仍是 Mock。部署真实 API、真实租户登录需要走独立的真实模式构建与后端部署，详见[部署与产物](DEPLOY.md)和[Vercel / SQLite](VERCEL_SQLITE.md)。

## 4. 上传产物与更新顺序

下文两种 Nginx 方案都将站点文件放在服务器的 `/srv/www/pro-react-admin/`。第一次部署先创建目录，并从**本次**构建的 `dist-combined/` 上传全部内容。构建机与服务器不在同一台机器时，将 rsync 目标改成 `deploy@example.com:/srv/www/pro-react-admin/`，并先配置目录写权限。

下例的 `deploy` 是服务器上已有的部署账户示例；请替换成实际用户名和用户组。

```bash
sudo mkdir -p /srv/www/pro-react-admin
sudo chown deploy:deploy /srv/www/pro-react-admin

# 以下命令由有目录写权限的 deploy 用户执行
rsync -a dist-combined/ /srv/www/pro-react-admin/
```

后续更新先上传新资源，再更新无 hash 的入口文件。不要对正在服务的目录直接执行 `rsync --delete`：仍在浏览器中运行的旧页面可能继续请求旧 hash chunk。下例保留旧资源供在途页面和回滚使用；发布窗口内多个入口文件并非整体原子切换，严格要求原子发布时应另行设计版本目录与旧资源保留方案。

```bash
# 先上传带 hash 的 JS/CSS、图片和其它资源
rsync -a \
  --exclude='*.html' \
  --exclude='remoteEntry.js' \
  --exclude='remote-manifest.json' \
  --exclude='sw.js' \
  dist-combined/ /srv/www/pro-react-admin/

# 再更新 HTML、Federation 入口/清单和 Service Worker
rsync -a --delay-updates \
  --include='*/' \
  --include='*.html' \
  --include='remoteEntry.js' \
  --include='remote-manifest.json' \
  --include='sw.js' \
  --exclude='*' \
  dist-combined/ /srv/www/pro-react-admin/
```

新版本确认稳定后再按保留周期清理旧 hash 文件。回滚时用旧版 `dist-combined` 按相同顺序恢复入口文件，并保证其引用的旧资源仍在目录中。此增量发布命令适合持续使用 `all`；若改用部分 target，旧 target 的文件可能残留在 Nginx 目录，需按 `deployment.json` 审核并有计划地移除。

## 5. Nginx：域名根路径

使用第 3 节的根路径构建。下面示例假设 TLS 证书已配置，证书路径、域名和文件目录按实际环境调整。Nginx 直接读取 `dist-combined` 的内容，`root` 指向存放这些文件的目录；Hash Router 的 `#/...` 不会发送到服务器，因此无需为每个前端页面配置 rewrite。

```nginx
server {
    listen 443 ssl;
    server_name admin.example.com;
    ssl_certificate /etc/letsencrypt/live/admin.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.example.com/privkey.pem;
    root /srv/www/pro-react-admin;
    index index.html;

    location = /healthz { access_log off; default_type text/plain; return 200 "ok\n"; }

    # Pages 演示构建不包含 API；真实模式应替换成实际 API 代理。
    location ^~ /api/ {
        default_type application/json;
        return 503 '{"code":503,"message":"API is not configured"}';
    }

    # Vite 输出到 assets/ 的资源文件名包含内容哈希。
    location ~ /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        add_header X-Content-Type-Options nosniff always;
        try_files $uri =404;
    }
    location ~ (^|/)(remoteEntry\.js|remote-manifest\.json|sw\.js|version\.json|index\.json|[^/]+\.html)$ {
        add_header Cache-Control "no-store" always;
        add_header X-Content-Type-Options nosniff always;
        try_files $uri =404;
    }
    location ~ \.[A-Za-z0-9]+$ { try_files $uri =404; }
    location / { try_files $uri $uri/ =404; }
}
```

对外 HTTPS 也可以由上层负载均衡器终止；即使 Nginx 内部监听 HTTP，浏览器访问的 origin 仍须与构建时的 `PAGES_SITE_URL` 一致。已有的 `deploy/nginx.conf` 面向**单个**静态镜像，监听 8080 且根目录固定为 `/usr/share/nginx/html`；它不会被 GitHub Pages 使用。对聚合产物可参考上面更明确的多入口路径处理。

仓库的 `deploy/Dockerfile` 使用非 root 的 `nginxinc/nginx-unprivileged:1.29-alpine`，将指定的**已构建**目录复制进镜像，暴露 8080，并通过 `/healthz` 做健康检查。默认 `ARTIFACT_DIR=dist-enterprise`；设置 `ARTIFACT_DIR=dist-combined` 才会选择聚合产物。**当前 `.dockerignore` 排除了 `dist*`，直接在仓库根执行 `docker build` 会使 `COPY ${ARTIFACT_DIR}/` 找不到目录。**因此这条镜像构建路径当前还需先调整 Docker 构建上下文；上面的宿主机 Nginx + rsync 方案不依赖它。Dockerfile 本身也不会重新编译前端。若将来使用容器托管，外部 HTTPS origin 和路径仍须与构建参数一致，子路径还需替换容器中的 Nginx 配置。

## 6. Nginx：已有域名的子路径

使用第 3 节 `/pro-react-admin/` 构建，并将文件上传到 `/srv/www/pro-react-admin/`。这里 `root /srv/www` 将 URL `/pro-react-admin/...` 映射到同名磁盘目录；其它路径默认返回 404。不要把整份 `dist-combined` 再套入第二层 `pro-react-admin/`。

```nginx
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    root /srv/www;
    index index.html;

    location = /healthz { access_log off; default_type text/plain; return 200 "ok\n"; }
    location = /pro-react-admin { return 308 /pro-react-admin/; }

    # 当前前端的 /api/... 请求仍是域名根路径下的绝对路径。
    location ^~ /api/ {
        default_type application/json;
        return 503 '{"code":503,"message":"API is not configured"}';
    }
    location ~ ^/pro-react-admin/(?:.*/)?assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        add_header X-Content-Type-Options nosniff always;
        try_files $uri =404;
    }
    location ~ ^/pro-react-admin/(?:.*/)?(remoteEntry\.js|remote-manifest\.json|sw\.js|version\.json|index\.json|[^/]+\.html)$ {
        add_header Cache-Control "no-store" always;
        add_header X-Content-Type-Options nosniff always;
        try_files $uri =404;
    }
    location ~ ^/pro-react-admin/.*\.[A-Za-z0-9]+$ { try_files $uri =404; }
    location /pro-react-admin/ { try_files $uri $uri/ =404; }
    location / { return 404; }
}
```

**PWA 限制：**默认应用当前在 `src/platform/pwa/registerServiceWorker.ts` 固定请求域名根路径的 `/sw.js`、`/version.json`。子路径部署时，页面和微前端可以按上面的静态路径运行，但默认应用的 Service Worker 更新流程不会自动使用 `/pro-react-admin/sw.js`。不要为了绕过这一点把子路径的 SW 随意复制到共享域名根目录；若要在子路径启用 PWA，应先把客户端注册与版本请求改成基于 `PUBLIC_URL` 的路径，并单独核对 SW scope。

## 7. 发布核对与常见问题

把第 5 节或第 6 节的 `server` 块放进服务器的 `/etc/nginx/conf.d/pro-react-admin.conf`（或发行版启用的 `sites-available` 站点文件），确认 `server_name`、证书路径和目录访问权限后检查配置并重载。证书签发和 80 → 443 跳转由站点现有 TLS 方案负责：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

以根路径方案为例，依次检查站点入口、部署清单、组件站和两个 Remote；子路径方案须在每个 URL 的域名后加 `/pro-react-admin`。

```bash
curl -fsSI https://admin.example.com/
curl -fsS https://admin.example.com/deployment.json
curl -fsSI https://admin.example.com/storybook/
curl -fsSI https://admin.example.com/mfe/projectA/remoteEntry.js
curl -fsSI https://admin.example.com/mfe/projectA/remote-manifest.json
curl -fsSI https://admin.example.com/mfe/projectB/remoteEntry.js
```

还应在浏览器打开 `/#/signin`、`/enterprise/#/signin`、`/mfe/#/portal` 和 `/storybook/`，确认 Network 中 JS/CSS 无 404、Remote manifest 与 entry 均来自本次域名；`deployment.json` 的 `origin`、`base` 应与实际访问地址一致。

| 现象                              | 首先检查                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 首页可打开，但 JS/CSS 404         | 构建时 `PAGES_BASE_PATH` 与 Nginx URL 路径、磁盘目录是否一致                                         |
| Shell 可打开，但 Remote 加载失败  | Host 中构建时写入的 HTTPS Remote URL、`remoteEntry.js`、`remote-manifest.json` 和 chunk 是否同批上传 |
| 访问 Storybook 时资源指向错误目录 | `storybook/index.html`、`storybook/iframe.html` 的 `<base href>` 是否为实际子路径                    |
| 刷新后仍看到旧版本                | HTML、Remote entry/manifest、SW 是否被旧缓存保留；检查 `Cache-Control` 和浏览器 SW 状态              |
| 页面显示 503 API 未配置           | Pages 构建是 Mock；真实模式还需独立构建真实前端、部署 API 并替换 `/api/` 处理                        |

跨域独立部署 Remote 时，还需要重新写入 Host 的 HTTPS Remote URL，并配置明确的 CORS 和 CSP。自有 Nginx 可设置 Pages 无法控制的缓存头和 API 代理，但 Nginx 本身只服务静态文件，不运行 Express 或保存 SQLite。更多平台差异见[GitHub 部署](GITHUB_DEPLOYMENT.md)、[微前端部署](MFE_DEPLOYMENT.md)和[部署与产物](DEPLOY.md)。
