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
pnpm run project:create billing --remote --port 8083
```

脚手架生成 entry/Home/router；Remote 额外生成暴露组件与本地状态/缓存 Provider。随后更新注册表、静态 Remote imports、类型声明、聚合部署 headers 和项目参考。拒绝覆盖已存在项目或目录，检测 Remote 端口、路径、环境键重复。生成的新项目是公开空白入口，正式业务需显式增加认证和页面权限。

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
