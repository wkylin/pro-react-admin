# 部署与缓存

## 静态应用

default 构建输出 dist；projectA/projectB/shell 输出由注册表决定。Hash 路由把页面路径放在 `#/...`，无需为每个页面配置服务器路由，但静态资源基路径仍必须正确。

```bash
PUBLIC_URL=/ pnpm run build:stats
pnpm run check:bundle-budget
pnpm run serve:dist
pnpm run test:e2e
```

子目录部署应把 PUBLIC_URL 设置为实际路径后重新构建。pnpm run deploy 是 GitHub Pages 发布操作，执行前需按发布流程核对目标；本地构建与 serve 不会发布。

## API 与授权

仓库生产环境模板仍开启 REACT_APP_USE_MOCK=true。真实业务部署必须在构建环境覆盖 false，接好权限接口、登录凭据与业务 API。APP_BASE_URL 为空时请求同源服务；静态站点本身不提供 API。

开发服务器代理不会随 dist 发布。生产需部署 Express helper 或其它后端，并提供实际身份鉴权代理。服务端配置见[API](API.md)，不在浏览器暴露埋点管理 token 或 GitHub secret。

## 缓存与更新

部署配置见 vercel.json、vercel.mfe.json、scripts/validate-deployment-config.mjs。HTML、Service Worker、Remote entry 与 manifest 应及时重新验证；内容 hash 的静态资源可长期缓存。发布顺序先上传新资源，再切换入口文件，保留旧 hash 资源供在途客户端加载。

platform/pwa 负责 Service Worker 注册和更新提示。排查旧页面时检查注册范围、PUBLIC_URL 与缓存响应头；仅硬刷新不能替代正确缓存配置。

MFE 的打包布局、URL 和检查见[微前端](MFE_DEPLOYMENT.md)。CI 构建验证不等于已经部署到线上。
