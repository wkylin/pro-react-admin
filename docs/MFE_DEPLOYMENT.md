# Module Federation 开发与部署

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

Host 加载前先 fetch 同目录 remote-manifest.json，校验 schemaVersion、name、protocolVersion 与 sharedDependencies。通过后才注入 remoteEntry.js。加载最多尝试 2 次，间隔 250 ms，总超时 15 秒；失败显示远程应用不可用的 fallback。共享 React 等依赖必须满足契约，manifest 检查不代替 Remote 来源信任。当前共享依赖使用 eager 模式；Remote 容器保留其同步初始化依赖，只有独立应用入口参与初始分块，remoteEntry.js 必须单独加载即可提供 get/init。独立应用不再导出相同全局变量，避免覆盖容器。

开发 URL 来自注册表，生产默认 /projectA/remoteEntry.js、/projectB/remoteEntry.js。MFE_PROJECTA_URL、MFE_PROJECTB_URL 可在构建侧覆盖，覆盖值需指向无凭据的绝对 HTTPS URL；生产默认同源相对路径由配置支持。

## 构建

```bash
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm run check:deployment-config
pnpm run test:e2e:mfe
```

构建 Shell 和两个 Remote，再由 prepare-vercel-mfe.mjs 组合 dist-vercel：根目录是 Shell，Remote 放在各自子目录。对应部署配置为 vercel.mfe.json；standalone Remote 构建使用独立命令并设根 PUBLIC_URL。

跨域部署须配置 manifest 的 CORS、script 的可访问性与 CSP。remoteEntry/manifest 应及时验证，hash chunks 可长期缓存；旧资源需保留到在途页面退出。

浏览器回归测试验证 manifest 成功加载及服务失败后 2 次重试、fallback。构建 artifact 检查既验证 manifest，也在隔离 VM 中单独执行 remoteEntry.js，确认容器同步可用；浏览器回归验证真实 chunk 与共享模块加载。不能仅凭注册表宣称 Remote 已可运行。
