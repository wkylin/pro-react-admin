# 多项目与脚手架

projectA/projectB 独立预览、并行启动和构建命令见[快速上手](./GETTING_STARTED.md#多项目)；需要 Shell 加载 Remote 时使用[微前端模式](./GETTING_STARTED.md#微前端)。

`src/projects/registry.json` 登记项目源码、入口、路由、输出与 Remote 配置；`config/project-registry.mjs` 统一验证、路径解析和构建计划。Webpack、开发命令、预览、清理和部署不再各自推算目录。`mfeHost: true` 标识 Host，Remote 由 `remotes` 和 `mfeExpose` 登记。

```bash
pnpm run project:list
pnpm run project:doctor
pnpm run project:dev enterprise
pnpm run project:build enterprise
pnpm run project:build enterprise --dry-run
PROJECT=enterprise pnpm run serve:dist
```

项目命令直接用 Node 调用工作区已安装的 CLI，不运行递归 pnpm exec，也不自动下载工具。未知项目和动作立即失败；PORT、PUBLIC_URL、Remote URL 可通过环境覆盖。dry-run 只显示相关构建参数，不输出全部环境。停止命令会转发 SIGINT/SIGTERM。

## 新增项目

```bash
pnpm run project:create customer --dry-run
pnpm run project:create customer
pnpm run project:create customerAdmin --preset enterprise --dry-run
pnpm run project:create customerAdmin --preset enterprise
pnpm run project:create billing --remote --port 8083
```

默认脚手架生成公开的 entry/Home/router；Remote 额外生成暴露组件与本地状态/缓存 Provider。`--preset enterprise` 生成受保护的独立项目：复用租户登录、组织管理模块、类型化数据 Provider、服务端权限和审计，默认使用 Vite 与真实 Enterprise API。这个预设不能与 `--remote` 合用，也不会加入公开 Pages 多项目演示。生成器随后更新注册表、静态 Remote imports、类型声明、聚合部署 headers 和项目参考。它拒绝覆盖已存在项目或目录，并检测 Remote 端口、路径、环境键重复。

安全预设生成后，从仓库根目录运行：

```bash
PROJECT=customerAdmin pnpm start
pnpm run project:build customerAdmin
PROJECT=customerAdmin pnpm run preview:vite
```

开发命令同时启动前端和本地 Enterprise API，首次创建隔离的 SQLite 演示租户，并在终端显示地址与登录凭据。默认构建不注入浏览器 Mock；静态预览只运行前端，需保持独立 API 可用。登录后以生成的 `modules.ts` 和 `routers/index.tsx` 为入口增删业务模块，在 `config/route-policy.json` 中登记菜单与权限；现有 `src/features/administration/` 是可运行的参考实现。新项目的 `README.md` 保留这些命令。Windows 下用 `pnpm exec cross-env PROJECT=customerAdmin pnpm start` 设置变量。

需要沿用 Webpack 的团队可显式运行 `BUILD_TOOL=webpack PROJECT=customerAdmin pnpm start` 与 `pnpm run project:build customerAdmin --bundler=webpack`。

```bash
pnpm run check:project-registry
pnpm run check:project-contracts
pnpm run check:deployment-contracts
pnpm run check:aliases
pnpm run generate:docs
```

## 复用与隔离

`default` 是完整展示应用，`enterprise` 是精简业务入口；projectA 复用展示路由，projectB 有自己的公开页面，shell 管理 Remote 导航。`PROJECT` 在构建时选择项目，浏览器没有运行时项目切换器。

`@routers` 总是选择当前项目路由；共用布局过滤未登记页面，因此 enterprise 不显示展示菜单。通用路由算法位于 platform/navigation，公共 React 装配位于 app/bootstrap。Store、主题持久化和 KeepAlive 按根隔离；授权仍使用当前 origin 的登录会话，多个业务租户需另外设计。

注册表输出支持 dist*、dist/ 或 artifacts/ 内的目录；禁止覆盖源码、工作区根及其它项目产物。默认的路由/菜单静态契约检查覆盖展示路由模块，精简入口与微前端另外通过构建和浏览器验证。完整项目清单由[参考](../reference/PROJECT_REFERENCE.md)生成。
