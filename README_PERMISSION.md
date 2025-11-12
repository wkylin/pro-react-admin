# 权限系统使用文档

## 概述

本项目实现了一套完整的 RBAC (Role-Based Access Control) 权限管理系统，支持：

- ✅ 角色-权限管理
- ✅ 路由级权限控制
- ✅ 按钮级权限控制
- ✅ 组件级权限控制
- ✅ 权限缓存机制
- ✅ Mock 数据支持（方便开发测试）

## 架构设计

### 1. 类型定义 (`src/types/permission.ts`)

定义了权限系统的核心类型：

- `PermissionAction`: 权限操作类型（create, read, update, delete 等）
- `Resource`: 资源类型（user, role, dashboard 等）
- `PermissionCode`: 权限代码格式（如 `user:read`, `role:*`）
- `Role`: 角色信息
- `UserPermission`: 用户权限信息

### 2. 权限服务 (`src/service/permissionService.ts`)

单例模式的权限服务，提供：

- 权限检查方法
- 角色检查方法
- 路由权限检查
- 权限缓存管理

### 3. Mock 数据 (`src/mock/permission.ts`)

提供 4 种预定义角色：

- **超级管理员** (`super_admin`): 拥有所有权限 (`*:*`)
- **管理员** (`admin`): 拥有大部分管理权限
- **业务员** (`business_user`): 拥有业务相关权限
- **普通用户** (`user`): 仅拥有查看权限

### 4. API 层 (`src/service/api/permission.ts`)

封装权限相关的 API 调用，支持：

- 开发环境使用 Mock 数据
- 生产环境调用真实后端 API
- 自动降级机制

## 使用指南

### 1. 路由级权限控制

路由守卫会自动检查用户是否有权限访问特定路由：

```tsx
// src/routers/authRouter.jsx 已自动集成权限检查
// 无需额外配置，系统会自动根据用户权限控制路由访问
```

### 2. 组件级权限控制

使用 `PermissionGuard` 组件控制内容的显示/隐藏：

```tsx
import PermissionGuard from '@/components/auth/PermissionGuard'

// 单个权限检查
<PermissionGuard permission="user:read" fallback={<div>无权限</div>}>
  <div>只有拥有 user:read 权限的用户才能看到这个内容</div>
</PermissionGuard>

// 多个权限检查（全部需要）
<PermissionGuard
  permissions={['user:read', 'user:update']}
  requireAll={true}
>
  <div>需要同时拥有 user:read 和 user:update 权限</div>
</PermissionGuard>

// 多个权限检查（任一即可）
<PermissionGuard
  permissions={['user:read', 'role:read']}
  requireAll={false}
>
  <div>需要拥有 user:read 或 role:read 权限之一</div>
</PermissionGuard>

// 角色检查
<PermissionGuard role="admin">
  <div>只有管理员能看到这个内容</div>
</PermissionGuard>
```

### 3. 按钮级权限控制

使用 `AuthButton` 组件控制按钮的显示/禁用：

```tsx
import AuthButton from '@/components/auth/AuthButton'

// 无权限时隐藏按钮
<AuthButton permission="user:create" onClick={handleCreate}>
  创建用户
</AuthButton>

// 无权限时禁用按钮
<AuthButton
  permission="user:delete"
  hideWhenNoPermission={false}
  noPermissionText="您没有删除权限"
  onClick={handleDelete}
>
  删除用户
</AuthButton>
```

### 4. 使用 Hook 检查权限

使用 `usePermission` Hook 获取权限信息和检查方法：

```tsx
import { usePermission } from '@/hooks/usePermission'

const MyComponent = () => {
  const {
    permissions,      // 权限列表
    roles,           // 角色列表
    routes,          // 可访问路由列表
    loading,          // 加载状态
    hasPermission,    // 检查单个权限
    hasAllPermissions, // 检查多个权限（全部需要）
    hasAnyPermission,  // 检查多个权限（任一即可）
    hasRole,          // 检查角色
    canAccessRoute,   // 检查路由权限
    refreshPermissions, // 刷新权限
  } = usePermission()

  // 检查权限
  const handleClick = async () => {
    const canEdit = await hasPermission('user:update')
    if (canEdit) {
      // 执行编辑操作
    }
  }

  return (
    <div>
      <p>当前权限: {permissions.join(', ')}</p>
      <p>当前角色: {roles.join(', ')}</p>
      <Button onClick={refreshPermissions}>刷新权限</Button>
    </div>
  )
}
```

### 5. 在服务中使用权限检查

直接使用权限服务：

```tsx
import { permissionService } from '@/service/permissionService'

// 检查权限
const canEdit = await permissionService.hasPermission('user:update')

// 检查角色
const isAdmin = await permissionService.hasRole('admin')

// 检查路由权限
const canAccess = await permissionService.canAccessRoute('/user/edit')

// 刷新权限（登录后或权限变更时调用）
await permissionService.syncPermissions()
```

## 权限代码格式

权限代码采用 `资源:操作` 格式：

- `user:read` - 读取用户
- `user:create` - 创建用户
- `user:update` - 更新用户
- `user:delete` - 删除用户
- `user:*` - 用户的所有操作
- `*:*` - 所有权限（超级管理员）

## 路由权限映射

系统会自动根据以下映射检查路由权限（见 `src/mock/permission.ts`）：

```typescript
export const routePermissionMap = {
  '/': 'home:read',
  '/home': 'home:read',
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  '/product': 'product:read',
  '/coupons': 'coupons:read',
  '/coupons/add': 'coupons:create',
  '/coupons/edit/:id': 'coupons:update',
  // ...
}
```

## 角色切换（开发测试）

在开发环境中，可以通过以下方式切换角色进行测试：

1. 打开浏览器控制台
2. 执行：`localStorage.setItem('user_role', 'admin')`
3. 刷新页面

可用角色：
- `super_admin` - 超级管理员
- `admin` - 管理员
- `business_user` - 业务员
- `user` - 普通用户

或者在权限示例页面 (`/permission`) 直接切换角色。

## 与后端集成

当需要接入真实后端时，只需修改 `src/service/api/permission.ts`：

```typescript
export const getUserPermissions = async (userId?: string): Promise<UserPermission> => {
  // 调用真实 API
  const response = await request.get<ApiResponse<UserPermission>>('/api/permissions/current')
  return response.data
}
```

系统会自动使用真实 API 替换 Mock 数据。

## 最佳实践

1. **路由权限**: 在路由配置中使用 `auth: true` 标记需要权限验证的路由
2. **按钮权限**: 对于操作按钮，使用 `AuthButton` 组件
3. **内容权限**: 对于敏感内容，使用 `PermissionGuard` 组件包裹
4. **权限刷新**: 在用户登录、注销或权限变更时，调用 `permissionService.syncPermissions()` 刷新权限缓存
5. **权限代码规范**: 统一使用 `资源:操作` 格式命名权限代码

## 示例页面

访问 `/permission` 查看完整的权限系统使用示例，包括：

- 权限信息展示
- 角色切换
- 组件级权限控制示例
- 按钮级权限控制示例
- 多种权限检查方式示例

## 常见问题

**Q: 如何添加新的权限？**

A: 在 `src/mock/permission.ts` 中的角色权限列表中添加新的权限代码即可。

**Q: 权限缓存多久更新一次？**

A: 默认缓存时间为 30 分钟，可以在权限服务中修改 `cacheExpireTime`。

**Q: 如何强制刷新权限？**

A: 调用 `permissionService.syncPermissions()` 或 `permissionService.clearCache()` 后重新获取。

**Q: 如何实现按钮级权限但不禁用？**

A: 设置 `hideWhenNoPermission={false}`，按钮在无权限时会显示但处于禁用状态。

## 总结

权限系统已经完整集成到项目中，你只需要：

1. 在路由配置中设置 `auth: true`
2. 使用 `PermissionGuard` 和 `AuthButton` 组件
3. 使用 `usePermission` Hook 获取权限信息

系统会自动处理权限检查、路由守卫和缓存管理。




