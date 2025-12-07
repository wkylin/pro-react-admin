# 权限系统扩展开发指南

## 概述

本文档记录了新增权限示例页面的完整开发流程，涵盖页面创建、权限分配、路由配置、角色管理等各个环节，为后续权限相关功能的开发提供标准化参考。

## 开发步骤详解

### 1. 页面创建

#### 1.1 创建页面组件

```bash
# 在 src/pages/ 下创建权限相关目录
mkdir -p src/pages/permission
touch src/pages/permission/index.tsx
```

#### 1.2 实现页面功能

- 创建完整的权限演示组件
- 集成 `usePermission` Hook
- 实现角色切换功能（开发测试用）
- 添加权限检查示例（单个权限、多个权限、角色检查）
- 集成权限组件（PermissionGuard、AuthButton）

### 2. 类型定义扩展

#### 2.1 更新权限资源类型

**文件**: `src/types/permission.ts`

在 `Resource` 类型联合中添加新的资源类型：

```typescript
export type Resource =
  | 'user'
  | 'role'
  | 'dashboard'
  // ... 其他现有资源
  | 'permission' // 新增：权限示例页面资源
```

#### 2.2 权限代码验证

确保新增的权限代码符合 `PermissionCode` 类型定义：

```typescript
// 格式：resource:action 或 resource:* 或 *
'permission:read' // ✅ 符合类型定义
```

### 3. 路由配置

#### 3.1 添加路由定义

**文件**: `src/routers/modules/ui.routes.jsx`

在路由配置中添加新页面路由：

```javascript
{
  path: '/permission',
  element: <PermissionExample />,
  meta: {
    title: '权限示例',
    auth: true,  // 需要认证
  },
}
```

#### 3.2 注册懒加载组件

**文件**: `src/routers/config/lazyLoad.config.jsx`

添加组件懒加载配置：

```javascript
const PermissionExample = lazy(() => import('@/pages/permission'))
```

### 4. 菜单配置

#### 4.1 更新菜单结构

**文件**: `src/config/menu.config.jsx`

在菜单配置中添加新菜单项：

```javascript
{
  key: '/permission',
  label: '权限示例',
  icon: <LockOutlined />,
  auth: true,
}
```

### 5. 权限系统配置

#### 5.1 路由权限映射

**文件**: `src/mock/permission.ts`

在 `routePermissionMap` 中添加路由权限映射：

```typescript
export const routePermissionMap: Record<string, PermissionCode> = {
  // ... 其他路由映射
  '/permission': 'permission:read', // 新增：权限示例页面需要 permission:read 权限
  '*': '*:*',
}
```

#### 5.2 更新完整路由列表

在 `allRoutes` 数组中添加新路由：

```typescript
const allRoutes = [
  // ... 其他路由
  '/permission', // 新增
]
```

#### 5.3 角色权限分配

根据业务需求为不同角色分配权限：

**超级管理员**: 自动拥有所有权限（`*:*`）

**管理员**: 分配核心权限 + 权限示例页面访问：

```typescript
// 在管理员权限配置中包含 permission:read
permissions: ['home:read', 'user:read' /* ... */, , 'permission:read']
```

**业务员**: 分配业务相关权限，根据需要决定是否包含权限示例

**普通用户**: 基础权限，不包含权限示例页面访问

### 6. 权限服务集成

#### 6.1 组件权限检查

在页面组件中使用权限检查：

```typescript
// Hook 使用
const { hasPermission, hasRole, canAccessRoute } = usePermission()

// 权限守卫组件
<PermissionGuard permission="permission:read">
  <Content />
</PermissionGuard>

// 权限按钮
<AuthButton permission="user:create">
  创建用户
</AuthButton>
```

#### 6.2 路由权限验证

系统会自动通过 `AuthRouter` 检查路由访问权限，无需额外配置。

### 7. 测试账号配置

#### 7.1 更新测试账号

**文件**: `src/mock/permission.ts`

在 `testAccounts` 中确保账号角色映射正确：

```typescript
export const testAccounts: Record<string, { password: string; role: string; name: string }> = {
  'admin@test.com': { password: '123456', role: 'super_admin', name: '超级管理员' },
  'manager@test.com': { password: '123456', role: 'admin', name: '管理员' },
  'business@test.com': { password: '123456', role: 'business_user', name: '业务员' },
  'user@test.com': { password: '123456', role: 'user', name: '普通用户' },
}
```

### 8. 登录/退出逻辑调整

#### 8.1 登录时权限清理

**文件**: `src/pages/signin/index.jsx`

在登录成功后清除可能的手动设置角色：

```javascript
// 清除可能的手动设置角色，确保使用正确的账号角色
localStorage.removeItem('user_role')
```

#### 8.2 退出时缓存清理

**文件**: `src/service/authService.ts`

确保 `logout()` 方法清除所有相关缓存：

```typescript
localStorage.removeItem('user_permissions')
localStorage.removeItem('user_role')
localStorage.removeItem('permissions_fetch_time')
localStorage.removeItem('token')
localStorage.removeItem('github_token')
localStorage.removeItem('github_user')
```

## 开发检查清单

### ✅ 页面创建

- [ ] 页面组件创建完成
- [ ] 权限检查功能集成
- [ ] 角色切换功能（开发环境）

### ✅ 类型定义

- [ ] `Resource` 类型添加新资源
- [ ] 权限代码符合类型规范

### ✅ 路由配置

- [ ] 路由定义添加
- [ ] 懒加载配置注册
- [ ] 路由权限映射更新

### ✅ 菜单配置

- [ ] 菜单项添加
- [ ] 图标和权限设置

### ✅ 权限分配

- [ ] 路由权限映射
- [ ] 角色权限分配
- [ ] 测试账号配置

### ✅ 系统集成

- [ ] 权限组件使用
- [ ] 登录/退出逻辑
- [ ] 缓存清理机制

## 扩展建议

### 1. 权限设计原则

- **最小权限原则**: 只授予必要权限
- **角色分层**: 超级管理员 > 管理员 > 业务员 > 普通用户
- **权限粒度**: 支持资源级和操作级权限控制

### 2. 开发最佳实践

- **类型安全**: 使用 TypeScript 确保权限代码正确性
- **缓存管理**: 合理使用 localStorage 缓存，提升性能
- **错误处理**: 权限检查失败时提供友好的用户提示
- **测试覆盖**: 为权限逻辑编写单元测试和集成测试

### 3. 维护建议

- **权限审计**: 定期检查权限分配是否合理
- **文档更新**: 新增权限时同步更新相关文档
- **向后兼容**: 权限变更时考虑现有用户的影响

## 故障排除

### 常见问题

1. **权限不生效**: 检查路由权限映射和角色权限分配
2. **缓存问题**: 清除 localStorage 或调用 `permissionService.clearCache()`
3. **类型错误**: 确保权限代码符合 `PermissionCode` 类型定义

### 调试技巧

- 使用浏览器开发者工具检查 localStorage
- 查看控制台权限检查日志
- 使用权限示例页面测试各种权限场景

这份文档提供了完整的权限系统扩展流程，确保开发过程的规范性和可维护性。
