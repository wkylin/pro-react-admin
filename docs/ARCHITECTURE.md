# 技术架构与改进落实

本文按 `webpack` 分支当前代码编写。应用、微前端、组件库和 Storybook 均使用 Webpack；Vite 不在当前构建链路中。下文的“已落实”指仓库代码与 CI 已具备对应约束；线上 Vercel Dashboard 和凭据轮换属于仓库外操作。

## 架构总览

```mermaid
flowchart LR
  Dev[开发者] --> Registry[src/projects/registry.json]
  Dev --> AliasManifest[config/path-aliases.json]
  Registry --> Commands[scripts/project-command.mjs]
  Registry --> WebpackPaths[webpack/paths.js]
  Registry --> MfeContracts[生成 Remote imports / types]
  AliasManifest --> Webpack[Webpack]
  AliasManifest --> TypeScript[TypeScript paths]
  AliasManifest --> Storybook[Storybook]
  AliasManifest --> Library[Component library]
  WebpackPaths --> Common[webpack/webpack.common.js]
  Common --> DevConfig[webpack/webpack.dev.js]
  Common --> ProdConfig[webpack/webpack.prod.js]
  DevConfig --> App[React app]
  ProdConfig --> Artifacts[dist / dist-project*]
  Shell[Shell / Host] --> Manifest[Remote manifest check]
  Manifest --> RemoteEntry[remoteEntry.js]
  RemoteEntry --> RemoteA[ProjectA]
  RemoteEntry --> RemoteB[ProjectB]
  Storybook --> Stories[src/**/*.stories.*]
  Library --> PublicAPI[src/lib explicit exports]
  CI[GitHub Actions] --> Gates[Config + TypeScript + Jest + Playwright + app/lib builds + bundle budget]
```

配置入口分成两个单一数据源：

- `src/projects/registry.json`：项目入口、路由目录、产物目录、开发端口、Remote 暴露路径和 MFE 协议版本。
- `config/path-aliases.json`：源码别名。Webpack、Storybook 和组件库直接读取；TypeScript 使用生成的 `tsconfig.paths.json`。

Webpack 的应用、Storybook 和 lib 都基于 Webpack 5，但各自负责不同的产物：应用和 Remote 输出部署站点，Storybook 输出组件文档，lib 输出 ESM/UMD/CJS npm 包。它们共享 alias；样式规则根据产物目的保持独立：应用/lib 提取 CSS，Storybook 在浏览器中注入 CSS。`packages/wui-react/package.json` 是独立发布清单，组件库构建产物位于该 package 的 `dist/`，应用根 package 则保持私有，不再承担 npm 包身份。

`config/library-contract.mjs` 是组件库外置依赖、peer dependencies 和公开子路径的唯一配置源。Webpack externals 与发布清单从这里读取；发布检查核对 `packages/wui-react/package.json`、独立的 peer dependencies、exports 和实际构建文件，降低改入口时漏改某一处配置的风险。

目前完成的是 package 身份、版本、发布文件清单和 exports 的 workspace 隔离；库源码仍在仓库的 `src/lib/`，并通过根目录的 Webpack 配置构建。下一步应将 `src/lib` 依赖的组件和样式逐步迁入 `packages/wui-react/src`，先消除对应用 alias 与私有应用模块的引用，再把构建配置移到 package 内。这样可以在保留当前 API 的同时形成真正独立的组件库源码边界。

## 应用启动和路由

1. `scripts/project-command.mjs` 从项目注册表解析项目名、端口、构建角色和 Webpack 配置。旧的 `start:projectA` 等命令作为兼容入口转交给这个脚本。
2. `webpack/paths.js` 验证入口和路由目录，计算 `@app`、`@routers` alias 和产物目录。未知项目立即报错。
3. 主应用或项目入口调用 `src/bootstrap/renderApp.tsx`，创建 React 根节点并安装全局 Provider、错误边界和遥测。
4. `src/theme.tsx` 建立 Hash Router、主题和布局，页面与权限由对应路由模块组合。

路由树在 `src/routers/index.tsx` 统一规范化，并将标题、国际化 key、稳定路由 key 和 Tab 策略写入 `route.handle`。主布局中的 `ProContent` 从 `useMatches()` 读取当前真实匹配项，通过 `useOutlet()` 获取 React Router 已经解析的页面内容；它不再从扁平配置中自行猜测路由并直接渲染 `route.element`。这样动态参数、嵌套路由、懒加载和路由上下文都由同一套路由匹配结果驱动。

`ProTabs` 以路由 key 管理页面实例，并在首个 render 直接将当前匹配页面加入可见 Tab，之后再同步到缓存状态。route id 用来区分真正的页面路由；相同 URL 的 outlet 元素每次 render 都可能有新对象身份，所以 pane 更新按 route id、path 和可见元数据比较。内容身份没有变化时保留 KeepAlive 实例，避免 effect 不断制造新 pane 数组或重置页面状态。动态路由默认用实际 pathname 做 Tab key；需要合并为同一 Tab 的路由可在 `handle.tabKey` 或 `meta.tabKey` 显式指定。

Hash Router 将业务地址放在 URL 的 `#` 后面，因此 GitHub Pages 不需要为业务路由额外配置服务器 fallback。

## 多项目与微前端

多项目构建在构建时选择一个项目入口；Module Federation 分别构建 Shell 和 Remote，并在运行时组合。

| 模式            | 选择方式                    | 输出                               | 主要用途                    |
| --------------- | --------------------------- | ---------------------------------- | --------------------------- |
| 主应用          | `PROJECT=default`           | `dist/`                            | 主站和 GitHub Pages         |
| 独立项目        | `PROJECT=projectA/projectB` | `dist-projectA/`、`dist-projectB/` | 独立运行项目入口            |
| MFE             | `MFE_ROLE=host/remote`      | `dist-shell/`、`dist-project*/`    | Shell 加载远程 App          |
| Vercel 聚合部署 | `pnpm run vercel-build`     | `dist-vercel/`                     | Shell 根路径、Remote 子路径 |

Shell 的静态 Remote import 位于生成的 `src/projects/shell/remote-components.tsx`。它和 `typings/module-federation.d.ts` 均由 `src/projects/registry.json` 生成，以满足 Webpack Module Federation 对静态模块名的编译要求。

Remote 构建会生成 `remote-manifest.json`，包含 schema、Remote 名称、应用版本、Git SHA、暴露模块和共享依赖范围。Shell 在插入 `remoteEntry.js` 前检查 schema、名称、`mfeProtocolVersion` 和共享依赖主版本；加载失败后重试一次，总等待时间不超过 15 秒。为支持滚动升级，运行时也接受旧版仅列出 React/React DOM 的 manifest；新 Remote 产物必须列出完整共享依赖清单，CI 会拒绝不完整或主版本不兼容的产物。Webpack Module Federation 对共享依赖启用 `strictVersion`，由运行时校验处理旧 manifest 的兼容窗口。

`src/mfe/bridge.ts` 提供同页面事件和共享状态；payload 在运行时校验。协议版本来自项目注册表，并用于区分全局事件总线。`postMessage` 默认只接受同源，跨域接入必须配置准确的 origin。事件桥不是认证边界，不能传递秘密。

### 新增项目或 Remote

1. 在 `src/projects/registry.json` 注册入口、路由、输出和端口；Remote 另设 `mfeExpose`、`devUrl`、`prodPath` 和环境变量键。
2. 运行 `pnpm run sync:project-contracts`，更新静态 Remote imports 和 TS 类型。
3. 运行 `pnpm run check:project-registry`、`pnpm run check:project-contracts`。
4. 在对应项目内实现页面与暴露的 `mfe/App.tsx`。

项目命令由注册表驱动，不需要为新项目复制一整条 Webpack 命令：

```bash
pnpm run project:dev -- projectA
pnpm run project:build -- projectA
```

### 本地联调 MFE

分别启动三个终端：

```bash
pnpm run start:mf:projectA
pnpm run start:mf:projectB
pnpm run start:mf:shell
```

Shell 默认在 8080，Remote 默认在 8081 和 8082。打开 `http://localhost:8080/#/portal`。浏览器先读取 Remote manifest，再加载 Remote entry 和 chunk。

## 别名与工具配置

`config/path-aliases.json` 是路径映射唯一源。修改别名后运行：

```bash
pnpm run sync:aliases
pnpm run check:aliases
```

Webpack 应用会将注册表计算出的 `@app`、`@routers` 覆盖清单默认路径；组件库和 Storybook 使用仓库根路径。优化媒体时，生产配置还可将 `@assets/audio`、`@assets/video` 指向压缩资源目录。新增 alias 不再需要分别修改 Webpack、TypeScript、Storybook 和 lib。

## 目录职责

| 目录                            | 职责                                               |
| ------------------------------- | -------------------------------------------------- |
| `config/`                       | 路径 alias、构建体积预算                           |
| `src/projects/registry.json`    | 项目入口、输出、Remote URL 和协议清单              |
| `webpack/`                      | Webpack 应用、MFE、客户端环境变量和组件库构建      |
| `scripts/`                      | 项目命令、生成契约、配置校验、产物组装和发布辅助   |
| `src/bootstrap/`                | 共享 React 启动包装                                |
| `src/theme.tsx`、`src/theme/`   | Router、主题和布局                                 |
| `src/routers/`、`src/projects/` | 主应用路由及派生项目入口、页面                     |
| `src/pages/`、`src/components/` | 页面和可复用应用组件                               |
| `src/service/`、`src/store/`    | API 请求、业务服务和状态                           |
| `src/mfe/`                      | Host/Remote 消息桥和共享状态                       |
| `src/lib/`                      | npm 组件库的显式公开 API                           |
| `config/library-contract.mjs`   | 组件库 externals、peer dependencies 和公开 exports |
| `.storybook/`                   | Storybook Webpack builder、preview 和装饰器        |
| `api/`                          | 本地 Express helper、OAuth、埋点和示例接口         |

## CI 与构建体积

`.github/workflows/webpack-ci.yml` 覆盖：

- 项目注册表、浏览器环境变量 allowlist、共享 alias 和生成契约检查。
- 使用 TypeScript 6 CLI 执行应用类型检查，并对路由契约、KeepAlive 和 MFE bridge 单独启用 `strict` 检查。
- 单独构建组件库发布目录，验证 exports、类型声明、入口文件和 npm pack 文件清单。
- Vercel 配置检查：构建目标、Remote manifest/entry 缓存、CORS 和 hash 资源策略。
- Jest、主应用 Playwright E2E 和 MFE manifest/Remote 加载成功、失败重试 E2E。
- 默认应用 Webpack 生产构建、初始 JS/CSS 预算检查和 stats artifact。
- Storybook 独立静态构建。
- Shell + 全部 Remotes 聚合构建及 `remote-manifest.json` 契约检查。

`config/bundle-budget.json` 使用当前 Webpack 默认的 6 MiB 初始 entrypoint 和单资源上限。每次 CI 会生成 `compilation-stats.json` 并保存 14 天；本地可运行 `pnpm run build:stats` 和 `pnpm run check:bundle-budget` 获取同一种测量。`docs/build-and-bundle-optimizations.md` 中较早的具体大小属于历史快照，不是现行测量结果。

## API、数据和安全边界

`pnpm start` 在本地同时启动 Webpack 主应用和 `api/server.js`；管理 token 在每个开发会话中随机生成，并只通过服务端代理传递。`start:web` 可单独启动前端。生产使用埋点看板仍需部署 API 和可信的服务端鉴权。CORS 使用 allowlist，JSON body 上限 1 MB。

- 开发默认使用最多 10000 条的内存 store，collect 每批最多 100 条，并限制单 IP 每分钟 60 个请求；主应用开发入口只自动采集页面浏览事件，供本地看板联调。
- 生产默认使用 MongoDB；未配置 `MONGODB_URI` 或数据库无法连接时拒绝启动。
- MongoDB 埋点创建查询索引并在 90 天后 TTL 删除；请求 IP 不写入事件。
- 当前速率限制是单进程保护，多实例滥用防护仍由生产 Gateway/CDN/WAF 提供。

Webpack 浏览器环境值由 `webpack/client-env.js` 白名单注入，敏感变量名会被拒绝。GitHub OAuth secret、Sentry upload token、数据库凭据和管理 token 只能放在服务端环境。Sentry PII 与 Replay 默认关闭。

## 当前不足、建议与落实状态

| 之前识别的不足                                                              | 当前落实                                                                                                                   | 状态                               |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 项目脚本、Shell imports、Remote 类型重复维护                                | 项目命令、静态 imports 和类型从 `src/projects/registry.json` 解析或生成；CI 检查生成文件是否过期                           | 已关闭                             |
| Webpack、TS、Storybook、lib alias 漂移                                      | 共用 `config/path-aliases.json`；TS config 自动生成并在 CI 校验                                                            | 已关闭                             |
| Remote 缺少可检查的发布契约                                                 | 新增 `remote-manifest.json`；Host 校验协议版本、名称、schema 和共享依赖主版本；构建 CI 要求新产物声明完整共享依赖清单      | 已关闭                             |
| Remote 失败后只有刷新页面                                                   | loader 增加一次自动重试、15 秒总超时，保留明确降级界面                                                                     | 已关闭                             |
| ProTabs 与 React Router 页面内容可能脱节，页面节点存在但内容/路由上下文异常 | 页面内容统一来自当前路由的 `useOutlet()`；route handle 提供 Tab 元数据；pane 更新具备语义比较并保留缓存实例                | 已落实，待浏览器回归               |
| TypeScript native 7 和 TypeScript 6 API/CLI 混用，且部分依赖使用 `latest`   | 删除未使用的 native 7 别名；类型检查和 lib 声明构建明确调用 `tsc6`；将两项 `latest` 依赖锁到当前解析版本                   | 已落实                             |
| 全仓开启 TypeScript strict 会触发大量历史组件错误                           | 新增 `tsconfig.strict-boundaries.json`，先对路由契约、KeepAlive 与 MFE bridge 强制 strict，并纳入 CI；全量迁移仍需分批完成 | 进行中                             |
| 组件库 exports 与实际发布文件可能漂移                                       | 发布前核验每个导出入口和声明文件存在；CI 独立构建库并预览 npm tarball 清单                                                 | 已添加，待 CI 首次构建             |
| 埋点只存在内存且可无限提交                                                  | 生产 Mongo 持久化、90 天 TTL、事件批次上限、请求体上限和 per-process rate limit                                            | 已关闭（应用层）                   |
| CI 只构建默认应用，缺少 Remote 成功/失败验证                                | 加入 Jest、主应用和 MFE Playwright、Storybook build、MFE 聚合 build、artifact contract 和 bundle budget                    | 已关闭（部署后响应头仍需线上核对） |
| Bundle 体积记录已过时                                                       | CI 每次产出 stats artifact，并用 6 MiB Webpack 上限做初始预算门禁                                                          | 已关闭（持续采样）                 |
| Vercel 各 Remote 的缓存和跨域策略不完整                                     | 仓库配置补上 Remote manifest/entry no-cache、hash chunk immutable、静态跨域响应头                                          | 已落实                             |
| 凭据可能在 Git 历史中出现                                                   | 当前环境文件和浏览器白名单已清理，服务端边界已明确                                                                         | 需要外部轮换                       |
| Vercel 面板可能覆盖仓库设置                                                 | 聚合和独立项目配置文件均存在；真实 Git 集成项目仍需按 Preview 核对设置                                                     | 需要线上核对                       |

仓库能控制的架构和质量门禁已在代码中实现。还需在对应服务账号中撤销/轮换曾经暴露的 GitHub PAT、OAuth 和 Sentry 凭据，并确认每个 Vercel Project 的 Root Directory、Build Command、Output Directory、环境变量和部署后响应头。上述操作需要服务账号权限，不由本地代码变更代替。

## 当前旗舰化实施边界

本阶段优先修复页面路由和 ProTabs 的渲染契约，为主应用增加 TypeScript 检查入口，并先对核心边界启用 strict。浏览器中的动态路由、多 Tab 保活、错误恢复和关闭行为仍需要在真实运行环境回归；本次变更没有通过自动化浏览器测试确认。

大型项目能力的后续重点是完成组件库源码迁入独立 package、给共享 API 建立兼容策略，并对微前端共享依赖/首屏体积建立按项目的预算。应用根 package 已与 `@w.ui/wui-react` 发布清单分离；全仓 TypeScript `strict` 仍关闭，Bundle 门禁仍以 Webpack initial asset 大小为主；这些是未完成项，不能视为已达到企业旗舰级。
