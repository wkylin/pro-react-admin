# Zustand 状态迁移与示例集成

## 概要
本文件记录将项目中 Redux 逻辑替换为 Zustand（模块化 slice + 组合式 API）的完整变更与使用说明，包含：代码位置、改动说明、使用示例、验证步骤和扩展指南，作为后续功能扩展的参考示例。

---

## 本次变更一览（文件）
- 新增 / 修改：
  - `src/store/types.ts` —— 新增状态类型声明
  - `src/store/modules/counterSlice.ts` —— 新增 Counter slice
  - `src/store/modules/appSlice.ts` —— 新增 App slice（包含 `isSidebarOpen`）
  - `src/store/index.ts` —— 组合 store（`useStore`）并添加 `persist`/`devtools` 中间件
  - `src/pages/zustand/index.tsx` —— 新增演示页面（ZustandDemo）
  - `src/pages/layout/proSider/index.jsx` —— 改造：侧边栏切换由全局 `isSidebarOpen` 控制
  - `src/pages/layout/index.jsx` —— 移除传入 `collapsed`/`onCollapse` 的调用点
  - `src/routers/config/lazyLoad.config.jsx` —— 注册 `ZustandDemo` 懒加载组件
  - `src/routers/modules/business.routes.jsx` —— 添加 `/zustand` 路由并配置 `meta.permission`
  - `src/config/menu.config.jsx` —— 在主菜单中新增 `Zustand演示` 条目
  - `docs/Zustand-Migration.md` —— （本文件）记录说明
- 删除：
  - 项目中原始 Redux demo / action / reducer 文件（已删除冗余 `src/actions` / `src/reducers` 中的示例文件）


## 主要改动说明
- 状态组织
  - 采用 Slice Pattern：每个功能模块（例如 counter、app）在 `src/store/modules` 下维护自己的 state + actions。所有 slice 在 `src/store/index.ts` 中组合为单个 `useStore` Hook。
  - 持久化：通过 `zustand/middleware` 的 `persist` 对 `isSidebarOpen` 做了示例性持久化（可在 `partialize` 中调整持久字段）。

- 侧边栏（ProSider）改造
  - 原来由 `Layout` 组件通过 props `collapsed/onCollapse` 控制的逻辑，已统一改为 `useStore` 中的 `isSidebarOpen` / `toggleSidebar()`。优点：中央化、任何组件可以直接控制侧边栏、保持状态一致。
  - 修改位置：`src/pages/layout/proSider/index.jsx`、`src/pages/layout/index.jsx`

- 路由与页面
  - 新增演示页面 `src/pages/zustand/index.tsx`，作为 Zustand 使用示例。通过 `lazyLoad.config.jsx` 注册后在 `business.routes.jsx` 中加入路由并配置权限（`meta.permission`），在 `menu.config.jsx` 新增菜单项。

- 清理 Redux 代码
  - 项目中原有用于示例的 Redux action/reducer 已删除，且已从依赖中卸载 `redux react-redux @reduxjs/toolkit redux-logger`。若项目还有其它 Redux 依赖点，会在构建/运行时暴露引用错误，请按需删除或替换。


## 如何在组件中使用（示例）
- 仅使用需要的字段以避免不必要渲染：

```tsx
// 仅订阅 count
const count = useStore((s) => s.count)
// 仅订阅方法（不会触发渲染）
const increment = useStore((s) => s.increment)
```

- 示例：控制侧边栏（任意组件）
```tsx
const toggle = useStore((s) => s.toggleSidebar)
<button onClick={toggle}>切换侧边栏</button>
```


## 新增 Slice（扩展步骤）
1. 在 `src/store/modules` 新建 `yourSlice.ts`：导出 `createYourSlice: StateCreator<StoreState, [], [], YourSlice>`。
2. 在 `src/store/types.ts` 中添加 `YourSlice` 的类型，并将 `StoreState` 组合上新的类型。
3. 在 `src/store/index.ts` 中引入并展开该 slice：
```ts
...createCounterSlice(...a),
...createAppSlice(...a),
...createYourSlice(...a),
```
4. 在页面中直接使用 `useStore((s) => s.yourField)`。


## 验证与运行
- 本地开发预览：
```bash
npm run dev
# 或（项目有多个脚本）
npm run dev:vite
```
- 打包测试（库构建）：
```bash
npm run build:lib
```
- 推荐检查点：
  - 访问 `/zustand` 页面，验证计数器、异步动作、侧边栏切换是否生效。
  - 在多个页面切换，确认 `keepAlive`（路由 meta）与组件行为一致。


## 回滚与注意事项
- 如果需回滚到 Redux，保留已删除文件的历史（Git 提交），通过 `git checkout` 恢复。当前改动假设项目不再使用 Redux。
- 注意第三方依赖：某些库或页面可能仍旧通过 `react-redux` 提供的 context 注入数据，迁移需逐步替换对应调用点（`useSelector`、`useDispatch`）。


## 结语
本次迁移以最小侵入（模块化 slice）方式将示例功能从 Redux 替换为 Zustand，并演示了如何将全局 UI 状态（如侧边栏）统一管理。该结构便于横向扩展（继续加入更多 slice），且组件可以按需订阅状态以获得高性能渲染。

如需我：
- 把 README / contrib 文档中添加迁移说明；
- 运行一次端到端检查（`npm run test:e2e`）并修复发现的问题；
- 或把更多业务模块按同样模式迁移 —— 我可以继续逐步替换并提交 PR。

---
文档位置：`docs/Zustand-Migration.md`。

## 权限、角色与 i18n 更新说明

为确保 `Zustand` 示例页面在真实项目中按照角色与本地化规则正确展示，以下是本次针对权限与国际化（i18n）的具体修改与操作说明：

### 代码层面已做的修改
- 路由：`src/routers/modules/business.routes.jsx` 中新增路由条目 `/zustand`，并在 `meta` 中声明 `permission`（示例为 `['admin','manager','dev','user']`）与 `keepAlive: true`。
- 懒加载：在 `src/routers/config/lazyLoad.config.jsx` 注册 `ZustandDemo`（`ZustandDemo: lazyLoad(() => import('@pages/zustand'), { preload: true })`）。
- 菜单：在 `src/config/menu.config.jsx` 中新增菜单项并设置 `i18nKey: 'menu.zustand'`。
- 路由权限映射：`src/mock/permission.ts` 中已包含 `/zustand` 对应的 `routePermissionMap`（`'/zustand': 'zustand:read'`），并在 `mockRoles` 中为部分角色分配了 `zustand:read` 权限（例如 `admin`）。

### 如何为账号分配角色（开发/测试）
项目提供了三种常见的测试/开发方式来给账号分配角色：

1. 使用内置测试账号（推荐快速验证）
   - `src/mock/permission.ts` 中定义了 `testAccounts`：
     - `admin@test.com` → `super_admin`
     - `manager@test.com` → `admin`
     - `business@test.com` → `business_user`
     - `user@test.com` → `user`
   - 在本地使用这些账号模拟登录（token 为邮箱字符串或 mock 流程），系统会根据 `testAccounts` 返回对应权限集。

2. 临时覆盖（便于调试）
   - 在浏览器 console 或代码中设置 `localStorage.user_role`：

```js
// 设置为角色 code，示例：'admin' 或 'business_user' 或 'super_admin'
localStorage.setItem('user_role', 'admin')
// 然后刷新，permissionService 会优先使用该覆盖
```

   - 这种方式仅用于开发或 demo，不会影响真实后端数据。

3. 真实后端授权（生产环境）
   - 若项目对接真实权限 API，请在后端给对应用户分配 `roles` / `permissions`，后端 `permission` 接口会返回完整的 `UserPermission`（包含 `roles`、`permissions`、`routes`），`permissionService` 会从该接口读取并缓存。

### 修改 i18n key 的建议与示例
- 菜单项已设置 `i18nKey: 'menu.zustand'`（`src/config/menu.config.jsx`）。请在项目的 i18n 字典中添加对应条目，例如：

```json
{
  "menu": {
    "zustand": "Zustand 示例"
  }
}
```

- 若需要页面标题国际化，可在路由配置添加 `i18nKey: 'routes.zustand.title'`，并在 i18n 词典中添加 `routes.zustand.title`。

### 路由 & 权限生效说明
- 应用启动或登录时，`permissionService.getPermissions()` 会根据：
  1. `localStorage.user_role`（手动覆盖）
  2. GitHub / token 标识（若启用）
  3. 后端权限接口
  依次获取并构建 `UserPermission` 对象，包含 `roles`、`permissions` 与 `routes`。路由访问控制通过 `permissionService.canAccessRoute(path)` 实现。

### 在代码中判断权限的示例
在组件或路由守卫中检查角色/权限：

```ts
import { permissionService } from '@src/service/permissionService'

// 检查角色
const ok = await permissionService.hasRole('admin')

// 检查路由访问
const canAccess = await permissionService.canAccessRoute('/zustand')
```

### 文档记录位置与变更说明
- 本节记录了如何为 `Zustand` 页面配置权限（路由 `meta.permission`）、如何给账号分配角色（mock、localStorage 覆盖、后端）以及 i18n key 的使用建议。
- 已在代码中完成的改动请参考上方“本次变更一览（文件）”。

## 操作小结（快速步骤）
1. 添加页面并注册路由：`src/pages/zustand/index.tsx` → `lazyLoad.config.jsx` → `business.routes.jsx`（加 `meta.permission`）
2. 在 `src/config/menu.config.jsx` 中添加 `i18nKey` 并在本地化文件中添加对应翻译。
3. 本地测试权限：使用 `localStorage.setItem('user_role', '<role_code>')` 或使用测试账号登录。
4. 验证：登录后访问 `/zustand`，或在控制台调用 `permissionService.canAccessRoute('/zustand')`。


## 已添加的翻译条目

为方便直接展示菜单项，已在项目的中英文 i18n 词典中添加或确认了 `menu.zustand` 条目：

- 中文（已添加）：[src/locales/zh/translation.js](src/locales/zh/translation.js#L1) 中的 `menu.zustand: 'Zustand'`（也可改为 `Zustand 示例` 或其它更友好的文案）。
- 英文（已添加）：[src/locales/en/translation.js](src/locales/en/translation.js#L1) 中的 `menu.zustand: 'Zustand'`。

如果你希望使用不同的显示文案（例如中文显示为 “Zustand 示例”），请直接在上述文件中修改对应值并重启应用以加载新的语言资源。


