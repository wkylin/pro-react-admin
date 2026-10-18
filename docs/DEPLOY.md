# 部署与产物

按顺序执行的手动发布命令见 [手动部署指南](MANUAL_DEPLOYMENT.md)，涵盖 Pages、Vercel、Storybook、Release 与回退。

企业业务后端需独立部署在有持久卷的单实例 Node 24 主机，配置 ENTERPRISE_ENABLED=true、ENTERPRISE_DB_PATH、CORS_ORIGINS，经 HTTPS/反向代理服务前端。SQLite 不适用 Vercel 临时文件系统，本实现检测该环境后拒绝开启；Vercel 继续部署静态前端，真实模式通过 APP_BASE_URL 或同源代理接入外部服务。租户初始化、版本化迁移、备份校验和恢复限制见[企业资源](ENTERPRISE.md)。

`deploy/Dockerfile` 用于静态站点；`deploy/enterprise/Dockerfile` 和 `compose.enterprise.yaml` 提供业务 API、SQLite 持久卷及 Caddy HTTPS 网关。逐条部署命令、生产配置、演示/真实登录与 Vercel 静态产物上传见[Vercel 与 SQLite 部署指南](VERCEL_SQLITE.md)。容器恢复和真实部署旧库升级仍需在目标主机副本演练。

## 构建、验证、复用

按项目构建一次，在同一产物上运行测试，再上传/组合/打包；不要在发布阶段用不同参数重新生成一个未验证目录。

```bash
PUBLIC_URL=/ pnpm run build:enterprise
PROJECT=enterprise pnpm run serve:dist
pnpm run test:e2e:enterprise
```

展示应用使用 build:stats、check:bundle-budget、test:e2e。PROJECT 的输出从注册表读取；更改目录后构建/预览/清理共同生效。Hash Router 不需要按页面配置重写，但 PUBLIC_URL 必须对应资源挂载路径。子目录部署需要按实际 PUBLIC_URL 构建。

## 平台与组合

根 `vercel.json` 部署默认后台展示应用，显式使用 `pnpm run build:production` 和 `dist` 输出目录。已关联项目可使用 `vercel --prod` 发布；通过 `vercel build --prod` 在本地生成并验证产物后，也可使用 `vercel deploy --prebuilt --prod` 上传同一产物。Vercel 项目关联、下载的环境变量和构建产物保存在 Git 忽略的 `.vercel/` 中。

Vercel 聚合使用 `pnpm run build:mf:vercel`，依次构建登记的 Host/Remote，再按 registry.output 与 prodPath 组合到 dist-vercel，并检查容器/manifest。`sync:deployment` 从注册表生成聚合 headers；`check:deployment-contracts` 检测漂移，`check:deployment-config` 验证目标和缓存策略。Standalone Vercel 示例仍保留对应项目配置。

GitHub Pages workflow 使用 `pnpm run build:pages` 构建全部场景，或通过 workflow_dispatch 选择 default、enterprise、mfe、multi、storybook。产物在 dist-combined，包含导航、部署清单与 .nojekyll；各项目分别编译对应 PUBLIC_URL，MFE Host 注入真实 HTTPS Remote 地址。`pnpm run check:pages` 检查 HTML 资源、Storybook base 与 Remote 容器。逐条命令、Fork/自定义域名与 Release 流程见 [GitHub 部署指南](GITHUB_DEPLOYMENT.md)。原 `prepare:pages` 仍仅组合已有单应用和 Storybook，适用于旧单入口流程。

Storybook 可部署到 Pages 的 `/storybook/` 或独立 Vercel 项目。`vercel.storybook.json` 提供源码构建配置；`pnpm run vercel:prepare:storybook` 将已有静态产物准备到独立 artifacts 目录，不覆盖后台应用的 Vercel 关联。命令见 [Storybook](STORYBOOK.md)。

## Nginx 静态镜像

`deploy/Dockerfile` 只打包已构建产物，基于非 root Nginx，提供 `/healthz`；`ARTIFACT_DIR` 默认是 `dist-enterprise`，也可选择其它构建目录。当前 `.dockerignore` 排除了 `dist*`，因此直接以仓库根作为 Docker 构建上下文会导致 Dockerfile 的 `COPY` 找不到产物；使用镜像前需先调整构建上下文。项目提供静态配置，镜像构建/运行仍应在有 Docker 的环境独立核验；基础镜像版本应按组织镜像策略固定与维护。自有宿主机 Nginx 的根路径/子路径配置及上传命令见 [Pages 构建产物与 Nginx 部署](GITHUB_PAGES_TO_NGINX.md)。

`deploy/nginx.conf` 给 `assets/` 资源长期缓存，对 `index.html`、`sw.js`、`version.json`、Remote entry/manifest 关闭缓存；其它 HTML 未设置专门的缓存头。未配置的 `/api/` 返回 JSON 503，避免把 HTML fallback 当成业务响应；部署时替换为真实代理，或在构建时设置 `APP_BASE_URL`。独立跨域 Remote 还需配置明确 CORS 与 CSP。

## API、身份和更新

仓库环境模板显式开启演示；真实业务构建覆盖 REACT_APP_USE_MOCK=false，并接入登录、权限、业务持久化和审计接口。开发代理不随 dist 发布。服务端 secret、管理 token 不注入浏览器。

先上传新 hash 资源，再切换 HTML/Remote entry；保留旧 hash 资源供在途客户端使用，回滚入口也应指向仍存在的资源。PWA 注册/更新由 platform/pwa 管理，检查 scope、PUBLIC_URL 与缓存响应头；enterprise 入口目前没有自动注册 SW。

CI 上传产物便于复用，但 CI 配置不是本地执行记录；结果见[验证](VALIDATION.md)。

2026-10-11 已将默认后台 `5.0.0` 发布至 [Vercel 主站](https://pro-react-admin.vercel.app)，部署状态为 production / Ready。线上 `/version.json` 的版本、项目和构建时间与本地产物一致，首页与 5 个入口脚本均返回 200。本次使用下载的生产环境配置，通过 Vercel Build Output API 构建并上传已验证产物；本地复用已安装依赖，使用 `node scripts/project-command.mjs build default --stats` 的等价入口，没有执行包管理器 prehook 或上传 Sentry sourcemap。Docker 镜像构建与运行仍未在本机验证。
