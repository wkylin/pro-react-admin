## 权限集中策略说明

### 目标
- 在路由层集中声明权限策略，渲染前完成拦截，减少页面内重复校验。
- 优先使用路由 `meta` 元数据（permission / roles / auth）驱动授权，必要时回退到权限服务的路由白名单。

### 关键点
- 路由元数据：
  - `meta.auth === false` 表示公开路由，登录/未登录均放行。
  - `meta.permission` 支持字符串或字符串数组；`meta.requireAll` 表示数组需“全部满足”。
  - `meta.roles` 支持字符串或数组，语义同上。
- 策略解析：`AuthRouter` 通过 `annotatedRootRouter` + `matchPath` 定位当前路由策略；先判公开路由，再判 meta 权限/角色，最后回退到 `permissionService.canAccessRoute`。
- 登录态访问公开页：自动跳转到首个可访问路由（`permissionService.getAccessibleRoutes()`），避免停留在登录页。
- 无权提示：仅在首次拒绝该路径时弹出 `message.error`，避免重复骚扰。

### 调用链概览
1) 路由配置阶段：在路由定义中按需填充 `meta.permission` / `meta.roles` / `auth:false`。
2) 运行时拦截：`AuthRouter` 在最外层包裹 `<Outlet />`（见 `src/components/RootLayout.tsx`）。
3) 授权判定顺序：
   - 公开路由放行
   - `meta.permission` / `meta.roles` 校验（`requireAll` 可选）
   - 回退：`permissionService.canAccessRoute(pathname)`（含 3s 超时与强制刷新重试）
4) 未登录：重定向 `/signin`
5) 已登录但无权限：渲染空节点 + 弹错误提示（不跳转，避免循环）

### 添加新路由的约定
- 公开页面：`auth: false` 或在 `publicRoutes` 列表中添加路径。
- 需要权限的页面：在路由元数据中设置 `meta.permission`（推荐），或根据角色设置 `meta.roles`；必要时标注 `requireAll`。

### 相关文件
- 拦截器：`src/routers/authRouter.jsx`
- 路由元数据：`src/routers/index.jsx`（经 `annotateRoutesWithPermissions` 注入）
- 公开路由列表：`src/routers/config/publicRoutes.ts`
- 权限服务：`src/service/permissionService.ts`