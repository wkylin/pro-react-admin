# Module Federation 开发与部署

按终端划分的启动命令、访问地址和独立 Remote 预览见[快速上手](../development/GETTING_STARTED.md#微前端)。

## 开发

分别启动三个终端：

```bash
pnpm run start:mf:shell
pnpm run start:mf:projectA
pnpm run start:mf:projectB
```

Shell 默认 8080，Remote 为 8081/8082。Shell `/#/portal` 展示入口，`/#/projectA` 与 `/#/projectB` 加载对应 Remote。Remote 通过登记的 mfeExpose 暴露应用入口。

## 协议与失败处理

config/mfe-protocol.json 当前 protocolVersion 为 1，config/mfe-contract.mjs 定义 manifest 与共享依赖兼容策略，platform/mfe/bridge.ts 定义跨应用交互。生成项目契约由 sync:project-contracts 管理。

Host 加载前先 fetch 同目录 remote-manifest.json，校验 schemaVersion、name、protocolVersion 与完整 sharedDependencies。缺少共享依赖声明的旧式部分清单直接拒绝，不再猜测默认依赖；通过后才注入 remoteEntry.js。加载最多尝试 2 次，间隔 250 ms，总超时 15 秒；失败显示远程应用不可用的 fallback。共享 React 等依赖必须满足契约，manifest 检查不代替 Remote 来源信任。当前共享依赖使用 eager 模式；Remote 容器保留其同步初始化依赖，只有独立应用入口参与初始分块，remoteEntry.js 必须单独加载即可提供 get/init。独立应用不再导出相同全局变量，避免覆盖容器。

开发 URL 来自注册表，生产默认 /projectA/remoteEntry.js、/projectB/remoteEntry.js。MFE_PROJECTA_URL、MFE_PROJECTB_URL 可在构建侧覆盖，覆盖值需指向无凭据的绝对 HTTPS URL；生产默认同源相对路径由配置支持。

## 构建

```bash
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm run check:deployment-config
pnpm run test:e2e:mfe
```

build-mfe.mjs 从注册表查找 mfeHost 和所有 remotes，直接调用已安装 Webpack，逐项构建并验证产物，再由 prepare-vercel-mfe.mjs 按 output/prodPath 组合 dist-vercel：根目录是 Shell，Remote 放在各自子目录。对应部署配置为 vercel.mfe.json；standalone Remote 构建使用独立命令并设根 PUBLIC_URL。

本地预览聚合产物，构建后执行：

```bash
pnpm exec serve -s dist-vercel -l 5080
```

访问 `http://localhost:5080/#/portal`。`build:mf:vercel` 不会自动部署；`PROJECT=shell pnpm run serve:dist` 只预览 `dist-shell`，无法同时提供组合目录里的两个 Remote。

跨域部署须配置 manifest 的 CORS、script 的可访问性与 CSP。remoteEntry/manifest 应及时验证，hash chunks 可长期缓存；旧资源需保留到在途页面退出。

浏览器回归测试验证 manifest 成功加载及服务失败后 2 次重试、fallback。构建 artifact 检查既验证 manifest，也在隔离 VM 中单独执行 remoteEntry.js，确认容器同步可用；浏览器回归验证真实 chunk 与共享模块加载。不能仅凭注册表宣称 Remote 已可运行。

## 根实例与通信边界

Standalone 通过 renderApp 创建独立 Store/KeepAlive Provider；导出的 Remote App 通过 RemoteScope 创建自己的上下文，复用 Host router，断点仅写本地 Store，不更改 Host document class。Host 卸载 Remote 时 React effects 清理订阅。ProjectA → ProjectB 示例消息使用 `MfeSharedMessage` 类型，并由 `parseMfeSharedMessage` 校验共享状态中的字段、长度和时间戳；通用 `mfe:state` 仍允许其它模块化状态。

`src/components/hooks/useWebsocket` 是独立的通用浏览器 WebSocket hook，不属于 MFE bridge 协议，也不是企业资源事件客户端。企业管理 Provider 通过 `platform/data/resourceEvents.ts` 订阅经票据认证的 `/api/events`，收到资源失效事件后清理对应缓存；其服务端协议和单实例限制见[企业资源](../operations/ENTERPRISE.md#资源-websocket-实时失效)。`mfe:*` 仍只表示 Host/Remote 浏览器内通信。

Bridge 是版本化的显式共享事件/状态，不是共用 UI Store。postMessage 验证版本、事件字段与精确 origin；不接受 wildcard origin。共享状态也不属于可信授权源。Module Federation 的 shared singleton 不等于状态、样式、身份或安全沙箱。

Fallback 保留整页刷新重试，因为失败的 Federation 外部 promise 可能被模块运行时缓存；仅重新创建 React.lazy 不保证恢复。刷新会重建运行时并重新校验 manifest。新 Remote 通过 project:create 生成并同步静态 import/type 和部署 headers；同步检查见质量门禁。

### ProjectB 的 Standalone 链接

Remote 页面中的“打开 Standalone 的 About”指向独立构建的 ProjectB 应用，因此链接需要包含 Pages 的仓库子路径和 `projects/projectB/` 目录。GitHub Pages `all` 构建会根据 `PAGES_SITE_URL` 与 `PAGES_BASE_PATH` 注入 `PROJECTB_STANDALONE_BASE_URL`；例如当前站点生成 `https://wkylin.github.io/pro-react-admin/projects/projectB/`。`mfe` 单独构建不包含 Standalone 产物，所以不会显示这个链接。其它部署可将 `PROJECTB_STANDALONE_BASE_URL` 设置为独立应用目录 URL；保留 `PROJECTB_STANDALONE_ORIGIN` 作为旧的根路径覆盖项。
