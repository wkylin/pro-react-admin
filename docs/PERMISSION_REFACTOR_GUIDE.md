# 权限系统重构指南

## 📋 概述

本项目权限系统基于 RBAC 模型设计，实现了路由、组件、接口三个层面的权限控制。本指南旨在帮助开发者理解和使用新的权限系统。

## 🔧 核心组件与工具

### 1. ProtectedRoute 组件

**文件**: `src/components/auth/ProtectedRoute.tsx`

用于对路由或组件进行细粒度的权限控制。

**Props**:

- `permission`: `PermissionCode | PermissionCode[]` - 需要的权限码
- `roles`: `string[]` - 需要的角色
- `requireAll`: `boolean` - 多权限/角色时是否需要全部满足（默认为 `false`，即满足任一即可）
- `fallback`: `ReactNode` - 无权限时的占位显示（默认跳转 403）

**使用示例**:

```tsx
// 单权限控制
<ProtectedRoute permission="user:create">
  <Button>创建用户</Button>
</ProtectedRoute>

// 多权限控制（满足任一）
<ProtectedRoute permission={['user:read', 'user:write']}>
  <UserManagePage />
</ProtectedRoute>

// 角色控制
<ProtectedRoute roles={['admin']}>
  <AdminPanel />
</ProtectedRoute>

// 自定义无权限提示
<ProtectedRoute
  permission="admin:read"
  fallback={<div>您没有管理员权限</div>}
>
  <AdminDashboard />
</ProtectedRoute>
```

---

### 2. 路由工具函数

**文件**: `src/routers/utils/index.tsx`

提供了处理路由权限的核心工具函数：

- **`annotateRoutesWithPermissions(routes)`**:
  基于 `src/mock/permission.ts` 中的 `routePermissionMap`，自动为路由对象注入 `meta.permission` 属性。这使得我们无需在每个路由配置中手动写权限码。

- **`filterRoutesByAccessiblePaths(routes, accessiblePaths)`**:
  根据用户可访问的路径列表（从后端或 Mock 获取），递归过滤路由树。用于生成侧边栏菜单。
  - 自动保留 `auth: false` 的公开路由。
  - 如果父路由不可访问但子路由可访问，父路由会被保留。

## 🚀 路由系统改造

**文件**: `src/routers/index.tsx`

路由配置流程如下：

1.  **定义路由**: 在 `src/routers/modules/*.routes.tsx` 中定义各模块路由。
2.  **注入权限**: 使用 `annotateRoutesWithPermissions` 处理根路由，自动绑定权限。
3.  **导出路由**: 导出处理后的 `annotatedRootRouter` 供 `App.tsx` 使用。

```javascript
// src/routers/index.tsx
const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)
export default annotatedRootRouter
```

## 💻 最佳实践

### 1. 生成动态菜单

在侧边栏组件中，结合 `permissionService` 和 `filterRoutesByAccessiblePaths` 生成用户可见的菜单。

```tsx
import { useEffect, useState } from 'react'
import { permissionService } from '@src/service/permissionService'
import { filterRoutesByAccessiblePaths } from '@src/routers/utils'
import rootRouter from '@src/routers'

export const useMenuRoutes = () => {
  const [menuRoutes, setMenuRoutes] = useState([])

  useEffect(() => {
    const load = async () => {
      // 1. 获取用户可访问的路径列表
      const accessiblePaths = await permissionService.getAccessibleRoutes()

      // 2. 找到主布局路由（通常是 '/'）
      const mainRoute = rootRouter.find((r) => r.key === '/')

      // 3. 过滤子路由
      if (mainRoute && mainRoute.children) {
        const filtered = filterRoutesByAccessiblePaths(mainRoute.children, accessiblePaths)
        setMenuRoutes(filtered)
      }
    }
    load()
  }, [])

  return menuRoutes
}
```

### 2. 路由权限配置

在 `src/mock/permission.ts` 的 `routePermissionMap` 中维护“路由路径”到“权限码”的映射。

```typescript
export const routePermissionMap = {
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  // 支持参数路径
  '/business/:id': 'business:read',
}
```

### 3. 页面级权限控制

对于需要特定权限才能访问的页面，推荐在路由配置中使用 `ProtectedRoute` 包裹 `element`，或者依赖 `AuthRouter` 的自动拦截（基于 `routePermissionMap`）。

**方式 A：路由守卫自动拦截（推荐）**
`AuthRouter` 会自动检查当前路径是否在用户的 `accessibleRoutes` 中，或者是否满足 `meta.permission`。

**方式 B：显式包裹（更细粒度）**

```jsx
{
  path: 'add',
  element: (
    <ProtectedRoute permission="business:create">
      <BusinessAddPage />
    </ProtectedRoute>
  )
}
```

## 🔍 调试与测试

1.  **切换角色**: 使用 `localStorage.setItem('user_role', 'admin')` 切换角色，刷新页面查看菜单变化。
2.  **查看权限**: 在控制台调用 `await permissionService.getPermissions()` 查看当前用户的权限详情。

---

**注意**: 本文档描述的功能依赖于 `src/service/permissionService.ts` 的正确实现及 `src/mock/permission.ts` 中的数据配置。
