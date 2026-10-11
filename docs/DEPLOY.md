# 部署与产物

## 构建、验证、复用

按项目构建一次，在同一产物上运行测试，再上传/组合/打包；不要在发布阶段用不同参数重新生成一个未验证目录。

```bash
PUBLIC_URL=/ pnpm run build:enterprise
PROJECT=enterprise pnpm run serve:dist
pnpm run test:e2e:enterprise
```

展示应用使用 build:stats、check:bundle-budget、test:e2e。PROJECT 的输出从注册表读取；更改目录后构建/预览/清理共同生效。Hash Router 不需要按页面配置重写，但 PUBLIC_URL 必须对应资源挂载路径。子目录部署需要按实际 PUBLIC_URL 构建。

## 平台与组合

Vercel 聚合使用 `pnpm run build:mf:vercel`，依次构建登记的 Host/Remote，再按 registry.output 与 prodPath 组合到 dist-vercel，并检查容器/manifest。`sync:deployment` 从注册表生成聚合 headers；`check:deployment-contracts` 检测漂移，`check:deployment-config` 验证目标和缓存策略。Standalone Vercel 示例仍保留对应项目配置。

GitHub Pages workflow 构建应用和 Storybook，`scripts/prepare-pages.mjs` 只组合已有目录到 dist-combined，生成导航与 .nojekyll。不存在构建入口时立即失败，不向发布目录静默复制过期内容。实际发布通过现有 Pages job；本地组合不发布。

## Nginx 静态镜像

```bash
pnpm run build:enterprise
docker build -f deploy/Dockerfile --build-arg ARTIFACT_DIR=dist-enterprise -t pro-react-admin:local .
docker run --rm -p 8080:8080 pro-react-admin:local
```

Dockerfile 只打包已验证产物，基于非 root Nginx，提供 /healthz。ARTIFACT_DIR 可以选择 dist 或 dist-vercel 等现有目录。项目提供静态配置，镜像构建/运行应在有 Docker 的环境独立核验；基础镜像版本应按组织镜像策略固定与维护。

`deploy/nginx.conf` 给 hash 静态资源长期缓存，对 HTML、SW、Remote entry/manifest 关闭缓存。未配置的 /api/ 返回 JSON 503，避免把 HTML fallback 当成业务响应；部署时替换为真实代理，或在构建时设置 APP_BASE_URL。独立跨域 Remote 还需配置明确 CORS 与 CSP。

## API、身份和更新

仓库环境模板显式开启演示；真实业务构建覆盖 REACT_APP_USE_MOCK=false，并接入登录、权限、业务持久化和审计接口。开发代理不随 dist 发布。服务端 secret、管理 token 不注入浏览器。

先上传新 hash 资源，再切换 HTML/Remote entry；保留旧 hash 资源供在途客户端使用，回滚入口也应指向仍存在的资源。PWA 注册/更新由 platform/pwa 管理，检查 scope、PUBLIC_URL 与缓存响应头；enterprise 入口目前没有自动注册 SW。

CI 上传产物便于复用，但 CI 配置不是本地执行记录；结果见[验证](VALIDATION.md)。本次改造没有实际发布站点或镜像。
