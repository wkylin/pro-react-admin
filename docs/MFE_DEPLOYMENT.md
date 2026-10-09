# 微前端开发与部署

项目使用 Webpack 5 Module Federation。Shell 在运行时加载 Remote 的 remoteEntry.js 和暴露的 App 组件。项目清单位于 src/projects/registry.json，构建和 Shell 路由共享这份 Remote 配置。

## 运行模型

- Shell/Host：src/projects/shell/index.tsx；路由在 src/projects/shell/routers/index.tsx。
- ProjectA、ProjectB 的暴露模块：各自 src/projects/<name>/mfe/App.tsx。
- Shell 的静态动态导入由 src/projects/shell/remote-components.tsx 生成；Webpack Module Federation 要求 remote 名称在构建期可解析。
- RemoteApp 页面和 Portal 链接、Webpack remote URL 都根据注册表维护。
- `src/projects/registry.json` 是 Remote 协议版本的单一来源；`pnpm run sync:project-contracts` 生成静态 imports 和 TS module declarations。
- `scripts/validate-project-registry.mjs` 检查项目入口、路由目录、Remote 暴露文件和运行时环境变量白名单；CI 检查生成文件是否过期。
- Webpack 将 React、React DOM、React Router、Ant Design、dayjs、zustand 和 immer 配置为 singleton/eager shared。

普通多项目构建由 PROJECT 选择一个完整应用入口；MFE 构建则分别产出 Shell 和 Remote。详见多项目说明（MULTI_PROJECT.md）。

## 本地联调

在三个终端分别启动 ProjectA、ProjectB，再启动 Shell：

1. pnpm run start:mf:projectA，Remote 默认 8081。
2. pnpm run start:mf:projectB，Remote 默认 8082。
3. pnpm run start:mf:shell，Shell 默认 8080。

访问 http://localhost:8080/#/portal。先启动 Remote 可减少首次加载错误。可直接打开每个 Remote 的 `/remote-manifest.json` 和 `/remoteEntry.js`，确认 manifest 报告名称、版本及协议版本，且入口能响应 JavaScript。

常见检查：

- Remote 的 remoteEntry.js 和后续 chunk 在浏览器 Network 中均返回成功。
- Shell 的 MFE_PROJECTA_URL/MFE_PROJECTB_URL 指向对应 Remote。
- Host 和 Remote 从同一仓库、同一依赖锁文件构建。
- 修改依赖或 Webpack 配置后重启相关 dev server。

## Remote URL

注册表中的 Remote 字段包括 name、label、routePath、devPort、devUrl、prodPath 和 envKey。默认同域部署使用 prodPath，例如 /projectA/remoteEntry.js；独立部署时通过 MFE_PROJECTA_URL 或 MFE_PROJECTB_URL 覆盖。

构建期校验规则：

- 开发地址支持 HTTP 或 HTTPS。
- 生产环境完整 URL 必须是 HTTPS，且不能在 URL 中携带用户名或密码。
- 同域生产路径必须是以单斜线开头的绝对路径。
- URL 会被安全序列化进 remote loader，不再直接拼接原始配置文本。
- loader 先获取 `remote-manifest.json`，校验 schema、Remote 名称和 `mfeProtocolVersion` 后再加载 remoteEntry.js。
- 请求或脚本加载失败自动重试一次；总等待上限为 15 秒，超时后 Shell 显示降级提示。
- Remote manifest 和 remoteEntry.js 使用 no-cache 响应头；跨域部署需同时允许 manifest JSON 与 JavaScript chunk 的 CORS。

Remote imports 和 typings/module-federation.d.ts 都从注册表生成。添加、重命名 Remote 或修改协议版本后运行 `pnpm run sync:project-contracts`、`pnpm run check:project-registry` 和 `pnpm run check:project-contracts`。

## 事件通信协议

src/mfe/bridge.ts 适用于同一页面里的 Host/Remote 通信，事件 payload 会在运行时校验。协议和全局 bus 使用版本号；Host 与 Remote 应一起升级，跨版本未知事件或无效 payload 会被丢弃。

postMessage 仅用于 iframe/跨域集成：

- 默认发往当前 origin，默认只接收同源消息。
- 跨域时 attachMfePostMessageBridge 必须传入准确的 allowedOrigins。
- iframe 默认把消息发给父窗口；父窗口发给指定 iframe 时，将目标 Window 作为 emitMfePostMessage 的第四个参数传入。
- 不支持通配符 *；消息需要包含当前协议版本和合法事件结构。

这是一条应用内通信桥，不是登录授权或服务端信任边界。不要在事件或共享状态中传递密码、访问 token 等秘密。

## 构建

分别构建 Shell 和两个 Remote：

- pnpm run build:mf:shell
- pnpm run build:mf:projectA
- pnpm run build:mf:projectB

输出目录分别为 dist-shell/、dist-projectA/、dist-projectB/。普通 ProjectA/ProjectB 构建与 Remote 构建可能写入相同目录，不要同时运行。

构建并组装 Vercel 聚合产物：

- pnpm run vercel-build

Shell 位于 dist-vercel 根目录；两个 Remote 分别位于 projectA/、projectB/。

本地运行 MFE 浏览器 smoke 流程前，先生成聚合产物并安装 Playwright Chromium：

```bash
pnpm run build:mf:vercel
pnpm exec playwright install chromium
pnpm run test:e2e:mfe
```

测试会确认 ProjectA 能加载并校验 manifest，并让 ProjectB manifest 返回 503，确认 Host 重试一次后显示降级页。预览服务监听 5080。

## Vercel 发布

聚合 Vercel 配置：vercel.mfe.json，Build Command 为 pnpm run vercel-build，Output Directory 为 dist-vercel。使用 Vercel CLI 时指定 --local-config vercel.mfe.json；Git 集成仍需在 Dashboard 对照 Build Command、Output Directory 和 Root Directory。

独立部署配置：

| 配置 | 输出 |
| --- | --- |
| vercel.shell.json | dist-shell |
| vercel.projectA.json | dist-projectA |
| vercel.projectB.json | dist-projectB |

所有配置都使用 pnpm。独立 Remote 域名应将完整 HTTPS remoteEntry.js URL 设置在 Shell 的构建环境，并允许 Host 加载 Remote 入口和后续 JavaScript chunk。完整部署入口见 DEPLOY.md。

聚合部署对 root 和 Remote 子路径的 remoteEntry.js、remote-manifest.json 使用 no-cache；带 hash 的 static 资源使用长期 immutable 缓存。部署后仍要确认 CDN 实际响应头和 chunk publicPath。

## 兼容边界

- Shell 与 Remote 当前共用单仓库依赖锁文件，React 等依赖按 singleton/eager 共享；协议 manifest 能拒绝不兼容协议，但不代表支持 Remote 独立升级共享依赖。
- 新增 MFE 事件仍需要在 `MfeEventMap` 和运行时校验中显式声明，不能把事件桥当作任意 JSON 总线。
- CI 会构建聚合 MFE，校验 artifact manifest，并在 Playwright 中覆盖 Remote 加载成功、manifest 校验及失败重试降级；上线后的跨域 CORS 和缓存行为仍需对 Vercel Preview 实际响应头做一次检查。
