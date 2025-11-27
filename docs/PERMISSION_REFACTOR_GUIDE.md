# 权限系统重构指南

## 📋 概述

本次重构对权限系统进行了全面优化，实现了以下核心功能：

- ✅ 不同账号登录后只能看到有权限的路由（菜单/导航自动过滤）
- ✅ 路由配置标准化（meta.permission 自动注入）
- ✅ ProtectedRoute 支持细粒度权限/角色控制
- ✅ 保持现有功能完全兼容，零破坏性

---

## 🔧 核心改动

### 1. ProtectedRoute 组件增强

**文件**: `src/components/auth/ProtectedRoute.tsx`

**新增功能**:

- 支持可选的 `permission` 属性（单个或数组）
- 支持可选的 `roles` 属性（角色数组）
- 支持 `requireAll` 属性（是否需要全部权限）
- 支持 `fallback` 自定义无权限提示

**使用示例**:

```tsx
// 基础用法（仅校验登录态，向下兼容）
<ProtectedRoute>
  <SomePage />
</ProtectedRoute>

// 权限控制
<ProtectedRoute permission="coupons:create">
  <CouponsAddPage />
</ProtectedRoute>

// 多权限（任一即可）
<ProtectedRoute permission={["user:read", "user:write"]}>
  <UserManagePage />
</ProtectedRoute>

// 多权限（全部需要）
<ProtectedRoute permission={["user:read", "user:write"]} requireAll>
  <UserManagePage />
</ProtectedRoute>

// 角色控制
<ProtectedRoute roles={["admin", "super_admin"]}>
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

**文件**: `src/routers/utils/index.js`

**新增函数**:

#### `annotateRoutesWithPermissions(routes)`

为路由树批量注入 `meta.permission`，基于 `routePermissionMap` 自动匹配。

#### `filterRoutesByAccessiblePaths(routes, accessiblePaths)`

根据可访问路径过滤路由树，用于生成菜单。

**特性**:

- 公开路由（`auth: false`）自动保留
- 递归过滤子路由
- 保留有可访问子路由的父节点

---

### 3. 路由入口改造

**文件**: `src/routers/index.jsx`

**核心变更**:

```javascript
// 1. 自动注入权限到路由
const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

// 2. 新增导出函数（获取菜单可见路由）
export async function getVisibleMenuRoutes() {
  const accessible = await permissionService.getAccessibleRoutes()
  const main = annotatedRootRouter.find((r) => r.key === '/')
  if (!main) return []
  const filteredChildren = filterRoutesByAccessiblePaths(main.children || [], accessible)
  return [{ ...main, children: filteredChildren }]
}

// 3. 默认导出改为注入权限后的路由
export default annotatedRootRouter
```

---

## 🎯 使用场景

### 场景1: 在布局/菜单中显示可访问路由

**示例: 侧边栏菜单组件**

```tsx
import React, { useEffect, useState } from 'react'
import { getVisibleMenuRoutes } from '@src/routers'
import { Link } from 'react-router-dom'

export const SidebarMenu = () => {
  const [menuRoutes, setMenuRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const routes = await getVisibleMenuRoutes()
        setMenuRoutes(routes[0]?.children || [])
      } catch (error) {
        console.error('加载菜单失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMenu()
  }, [])

  if (loading) return <div>加载中...</div>

  return (
    <nav>
      {menuRoutes.map((route) => (
        <div key={route.key || route.path}>
          <Link to={route.path}>{route.name}</Link>
          {route.children && route.children.length > 0 && (
            <ul>
              {route.children.map((child) => (
                <li key={child.key || child.path}>
                  <Link to={child.path}>{child.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}
```

---

### 场景2: 在路由配置中使用细粒度权限

**示例: 业务路由模块**

```jsx
// src/routers/modules/business.routes.jsx
import { ProtectedRoute } from '@src/components/auth/ProtectedRoute'

export const businessRoutes = [
  {
    path: 'business',
    name: '业务管理',
    key: '/business',
    auth: true,
    element: (
      <ProtectedRoute permission="business:read">
        <lazyComponents.BusinessList />
      </ProtectedRoute>
    ),
  },
  {
    path: 'business/add',
    name: '新增业务',
    key: '/business/add',
    auth: true,
    element: (
      <ProtectedRoute permission="business:create">
        <lazyComponents.BusinessAdd />
      </ProtectedRoute>
    ),
  },
]
```

---

### 场景3: 在组件内部检查权限

**示例: 按钮权限控制**

```tsx
import { usePermission } from '@src/hooks/usePermission'

export const UserManagePage = () => {
  const { hasPermission } = usePermission()
  const canDelete = hasPermission('user:delete')

  return (
    <div>
      <h1>用户管理</h1>
      {canDelete && <button onClick={handleDelete}>删除用户</button>}
    </div>
  )
}
```

---

## 📊 权限配置

### 路由权限映射

**文件**: `src/mock/permission.ts`

```typescript
export const routePermissionMap: Record<string, PermissionCode | PermissionCode[]> = {
  '/': 'home:read',
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  '/coupons': 'coupons:read',
  '/coupons/add': 'coupons:create',
  '/coupons/edit/:id': 'coupons:update',
  // ... 更多路由
}
```

### 用户权限数据

```typescript
export const mockUserPermissions: Record<string, UserPermission> = {
  admin: {
    userId: '2',
    username: 'manager',
    roles: [mockRoles[1]],
    permissions: ['user:*', 'dashboard:*', 'business:*', ...],
    routes: ['/', '/dashboard', '/business', ...],
  },
  business_user: {
    userId: '3',
    username: 'business',
    roles: [mockRoles[2]],
    permissions: ['business:read', 'coupons:read', ...],
    routes: ['/', '/dashboard', '/business', '/coupons'],
  },
  // ... 更多角色
}
```

---

## 🔄 登录流程与权限同步

### 登录时同步权限

**文件**: `src/pages/signin/index.jsx`

```javascript
// 登录成功后
await permissionService.syncPermissions()
const routes = await permissionService.getAccessibleRoutes(true)
console.log('用户可访问路由:', routes)
```

### 角色分配逻辑

**文件**: `src/mock/permission.ts` - `mockGetUserPermissions()`

当前支持的角色分配规则：

1. **通过 localStorage 中的 `user_role`** 直接指定
2. **通过 GitHub 登录**: 邮箱 `wkylin.w@gmail.com` → `admin` 角色
3. **通过表单登录**:
   - 邮箱包含 `admin` → `admin` 角色
   - 邮箱包含 `business` → `business_user` 角色
4. **默认**: `user` 角色（普通用户）

**扩展示例**:

```javascript
// 在登录接口返回后设置角色
localStorage.setItem('user_role', 'admin') // 或 'business_user', 'user'
await permissionService.syncPermissions()
```

---

## 🧪 测试不同角色

### 方式1: 修改 localStorage

```javascript
// 浏览器控制台执行
localStorage.setItem('user_role', 'business_user')
location.reload()
```

### 方式2: 使用测试账号

在 `src/mock/permission.ts` 的 `mockGetUserPermissions()` 中添加邮箱映射：

```javascript
if (email === 'test@example.com') {
  return { ...mockUserPermissions['business_user'] }
}
```

### 方式3: 编程式切换

```tsx
import { permissionService } from '@src/service/permissionService'

const switchRole = async (roleCode) => {
  localStorage.setItem('user_role', roleCode)
  await permissionService.syncPermissions()
  window.location.reload()
}

// 使用
<button onClick={() => switchRole('admin')}>切换到管理员</button>
<button onClick={() => switchRole('business_user')}>切换到业务员</button>
<button onClick={() => switchRole('user')}>切换到普通用户</button>
```

---

## 🎨 最佳实践

### 1. 路由权限配置原则

- ✅ 使用语义化权限代码（`resource:action`）
- ✅ 路由 `key` 与 `routePermissionMap` 保持一致
- ✅ 公开路由设置 `auth: false`

### 2. 权限检查策略

- ✅ 页面级：使用 `ProtectedRoute` 包裹
- ✅ 组件级：使用 `usePermission` Hook
- ✅ 菜单级：使用 `getVisibleMenuRoutes()`

### 3. 性能优化

- ✅ 权限数据带缓存（30分钟）
- ✅ 菜单路由按需加载
- ✅ 避免在渲染循环中调用权限检查

---

## 🔍 调试技巧

### 查看当前用户权限

```javascript
import { permissionService } from '@src/service/permissionService'

// 获取完整权限信息
const userPermissions = await permissionService.getPermissions()
console.log('权限:', userPermissions.permissions)
console.log('角色:', userPermissions.roles)
console.log('可访问路由:', userPermissions.routes)
```

### 测试权限检查

```javascript
const canCreate = await permissionService.hasPermission('coupons:create')
console.log('是否有创建优惠券权限:', canCreate)

const hasAllPerms = await permissionService.hasAllPermissions(['user:read', 'user:write'])
console.log('是否有所有用户权限:', hasAllPerms)
```

### 清除权限缓存

```javascript
permissionService.clearCache()
await permissionService.syncPermissions()
```

---

## 📦 文件清单

### 修改的文件

- ✅ `src/components/auth/ProtectedRoute.tsx` - 增强权限/角色检查
- ✅ `src/routers/utils/index.js` - 新增路由工具函数
- ✅ `src/routers/index.jsx` - 注入权限+导出菜单函数

### 依赖的文件（无需修改）

- `src/service/permissionService.ts` - 权限服务（已完备）
- `src/mock/permission.ts` - 权限数据配置
- `src/types/permission.ts` - 类型定义
- `src/hooks/usePermission.ts` - 权限 Hook

---

## 🚀 迁移步骤

### 第1步: 更新菜单/侧边栏（推荐）

找到你的菜单组件（通常在 `src/pages/layout` 或 `src/components/layout`），使用 `getVisibleMenuRoutes()` 替换硬编码路由。

### 第2步: 为敏感路由添加权限（可选）

在需要细粒度控制的路由配置中，使用 `ProtectedRoute` 包裹：

```jsx
element: <ProtectedRoute permission="admin:read">
  <AdminPage />
</ProtectedRoute>
```

### 第3步: 测试不同角色

切换角色并验证菜单是否正确过滤，页面访问是否受控。

---

## ⚠️ 注意事项

1. **向下兼容**: 所有现有功能保持不变，未使用新特性的代码不受影响
2. **渐进式迁移**: 可以逐步为路由添加权限控制，无需一次性全部迁移
3. **性能考虑**: `getVisibleMenuRoutes()` 是异步的，建议在布局组件挂载时调用一次
4. **超时降级**: `AuthRouter` 的超时降级机制依然生效（3秒超时）

---

## 🆘 常见问题

### Q1: 菜单没有过滤，显示了所有路由？

**A**: 确保在菜单组件中调用了 `getVisibleMenuRoutes()`，而不是直接使用 `rootRouter`。

### Q2: ProtectedRoute 一直显示 403？

**A**: 检查 `routePermissionMap` 中是否正确配置了路由权限，确认当前用户是否有对应权限。

### Q3: 如何为动态路由（如 `/edit/:id`）配置权限？

**A**: 在 `routePermissionMap` 中使用完整路径（含参数），如 `'/coupons/edit/:id': 'coupons:update'`。

### Q4: 权限更新后没生效？

**A**: 调用 `permissionService.syncPermissions()` 或清除缓存后刷新页面。

---

## 📚 相关资源

- [权限类型定义](src/types/permission.ts)
- [权限服务 API](src/service/permissionService.ts)
- [权限 Hook 使用](src/hooks/usePermission.ts)
- [Mock 数据配置](src/mock/permission.ts)

---

**更新日期**: 2025-11-23  
**版本**: v1.0.0  
**作者**: GitHub Copilot
