# 路由与权限升级记录

> 记录路由定义、权限体系及构建策略的关键变更日志。

## 2026-01-07 升级记录：路由 Key 统一与生产环境修复

### 1. 路由 Key / Path 强制统一

- **变更**：全量重构了路由配置，强制 **`key` 必须等于绝对路径 `path`**。
- **影响范围**：
  - `src/config/menu.config.jsx`: 菜单配置现已完全使用 path 作为唯一标识。
  - `src/routers/modules/*.jsx`: 移除了所有手动指定的 `key`，由 `normalizeRouteTree` 自动生成。
- **目的**：解决 ProTabs 多标签页中因 `/route` 与 `route` 不一致导致的标签重复、无法关闭、高亮丢失等问题。
- **开发注意**：
  - 新增路由时，**不要**再手动写 `key` 字段。
  - 在代码中引用路由时，请始终使用完整的绝对路径（如 `/tech/frontend`）。

### 2. 权限策略修正

- **Admin 角色**：修复了 `admin` 角色在 `mock/permission.ts` 中缺少部分新业务页面（如 `/markmap`）权限的问题。
- **路由守卫增强**：`AuthRouter` 增加了对 `matchPath` 的异常捕获，防止因路由配置不规范导致整个应用在鉴权阶段白屏崩溃。

## 2025-12-04 升级记录：v7 适配与基础对齐

### 1. 路由定义与调整

- **嵌套路由必须一键对齐完整 URL**：`src/routers/modules/nested.routes.jsx` 中所有 `key` 值等于页面最终路径，`index: true` 的子路由直接继承父级路径，不允许使用 `/xxx/index` 等派生写法。菜单高亮、面包屑、权限校验均依赖该字段。
- **中间层级强制使用 `<Outlet />`**：含子路由的节点（如 `/tech/frontend`、`/tech/frontend/plugins`）统一渲染 `<Outlet />` 并挂载 `RouterErrorElement`，保证错误边界在每个模块内生效。
- **分区级兜底页面**：每个模块新增 `path: '*'` 的 SectionNotFound，组件本身根据 `pathname` 计算“模块首页”路径，提供“返回模块首页/返回全局首页”两个按钮，避免从 404 直接掉到根路由。
- **懒加载集中管理**：所有子页面指向 `lazyComponents`，配合 v7 的 `createHashRouter`，减少升级后 `Suspense`/`lazy` 组合的重复逻辑。
- **菜单/路由统一来源**：菜单 key 现与 `nestedRoutes` 中的 key 完全一致，避免早期“菜单指向 `/tech/frontend/vue`，实际路由写成 `/tech/frontend/Vue`”导致的 404。

## 2. React Router v7 升级影响

- **导航 Hook 统一**：`@hooks/useSafeNavigate` 只保留组件版实现，暴露 `redirectTo`（支持 `{ replace: true }`）与 `goBack`。`goBack` 会在历史栈不足时跳转 `/`，确保 v7 之后 `RouterProvider` 不再自动兜底。
- **错误边界与 KeepAlive**：每个嵌套路由的 `errorElement` 指向 `RouterErrorElement`，并由 `FixTabPanel`、`KeepAlive` 控制 tabs/缓存行为，满足 v7 的“路由定义即数据”规范。
- **通配符行为与 Tab 同步**：调整 wildcard 顺序后，`/tech/frontend/plugins/*` 优先匹配 SectionNotFound，再冒泡到顶级 `/tech/frontend/*`，防止 v7 的 `*` 误吞兄弟节点；FixTabPanel 负责在 tab 切换时保留当前模块上下文。

## 3. 权限与角色体系

- **集中式权限服务**：`src/service/permissionService.ts` 作为单例负责：
  - 30 分钟缓存 + localStorage 持久化，支持 `forceRefresh`/`syncPermissions`。
  - `canAccessRoute` 先查 `routePermissionMap`（permission code 映射），再 fallback 到后端返回的 `routes` 列表，并在必要时自动刷新权限集。
  - 角色检查提供 `hasRole`/`hasAllRoles`/`hasAnyRole`，`*:*` 超级权限仍可直通所有路由。
- **导航前置校验**：`redirectTo` 会在跳转前调用 `permissionService.canAccessRoute`，若缺少权限只弹出一次“您没有权限访问该页面”的错误信息并终止跳转。
- **角色变更后的同步流程**：升级 v7 后，登录/切换角色需要调用 `permissionService.syncPermissions()`；否则缓存的路由表会让 `canAccessRoute` 继续以老身份判定。

## 4. 后续建议

1. 新增嵌套路由时，先更新 `lazyComponents` 与 `nestedRoutes`，再同步菜单/权限映射，确保 key 一致。
2. 任何权限/角色策略变更，务必更新 `routePermissionMap` 与相关文档，并通过 `syncPermissions` 触发缓存刷新。
3. 若需调整 Hook 目录或别名，参考 `docs/hooks-structure.md`，避免再次出现重复实现、别名指向错误等问题。

如需补充更多路由或权限案例，请在本文件下追加章节，保持团队共识。
