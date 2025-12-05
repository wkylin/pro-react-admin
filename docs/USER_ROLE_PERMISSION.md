# 用户-角色-权限体系文档

本文档详细说明了 `pro-react-admin` 项目中的用户、角色与权限管理系统的设计与实现。

## 一、系统架构概述

本项目采用基于角色的访问控制 (RBAC) 模型。权限控制贯穿于前端的各个层面：

1.  **路由级控制**：用户只能访问其角色允许的路由。
2.  **组件级控制**：根据权限码控制按钮、链接等 UI 元素的显示。
3.  **接口级控制**：(模拟) 根据用户角色返回不同的数据。

## 二、用户体系与登录方式

系统支持两种登录方式，并根据登录信息自动映射角色。

### 1. 测试账号 (表单登录)

系统内置了以下测试账号，用于开发和演示不同角色的权限：

| 账号 (Email)        | 密码     | 对应角色       | 角色代码        | 权限描述                     |
| :------------------ | :------- | :------------- | :-------------- | :--------------------------- |
| `admin@test.com`    | `123456` | **超级管理员** | `super_admin`   | 拥有系统所有权限 (`*:*`)     |
| `manager@test.com`  | `123456` | **管理员**     | `admin`         | 拥有核心业务及大部分管理权限 |
| `business@test.com` | `123456` | **业务员**     | `business_user` | 仅拥有业务相关操作权限       |
| `user@test.com`     | `123456` | **普通用户**   | `user`          | 仅拥有基础查看权限           |

### 2. GitHub OAuth 登录

- **登录方式**: 通过 GitHub 授权登录。
- **角色映射**:
  - 邮箱为 `wkylin.w@gmail.com` 的用户自动识别为 **超级管理员 (`super_admin`)**。
  - 其他 GitHub 用户默认为 **普通用户 (`user`)**。

## 三、角色与权限定义

角色定义位于 `src/mock/permission.ts`，主要包含以下四种角色：

### 1. 超级管理员 (`super_admin`)

- **权限码**: `['*:*']`
- **可访问路由**: 所有路由
- **说明**: 系统最高权限，不受任何限制。

### 2. 管理员 (`admin`)

- **基础权限**: `home:read`, `user:read`, `user:create`, `user:update`, `dashboard:read`
- **动态权限**: 根据可访问路由自动推导 (如访问 `/tech` 自动获得 `tech:read`)。
- **可访问路由**: 包含仪表盘、业务管理、技术栈管理、图表等大部分功能页面。

### 3. 业务员 (`business_user`)

- **基础权限**: `home:read`, `business:*`, `coupons:*`, `dashboard:read`
- **动态权限**: 同上。
- **可访问路由**: 专注于业务模块 (`/business`) 及基础展示页面。

### 4. 普通用户 (`user`)

- **基础权限**: `home:read`, `dashboard:read`
- **可访问路由**: 仅限首页、仪表盘、个人中心等基础页面。

## 四、权限控制逻辑

### 1. 权限获取流程 (`src/service/api/permission.ts`)

前端通过 `getUserPermissions` 获取权限，逻辑如下：

1.  **Mock 模式**:
    - 检查 `localStorage.getItem('user_role')` 是否有手动指定的角色（调试用）。
    - 检查登录 Token 中的邮箱，匹配 `testAccounts` 中的测试账号。
    - 检查 GitHub 邮箱 (`wkylin.w@gmail.com`)。
    - 均不匹配则降级为 `user` 角色。
2.  **API 模式**: 发送请求 `/api/permissions/current` 获取后端权限数据。

### 2. 路由权限映射 (`routePermissionMap`)

系统维护了一个路由路径到权限码的映射表 (`src/mock/permission.ts`)，用于自动推导权限和校验路由访问：

```typescript
export const routePermissionMap = {
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  '/tech': 'tech:read',
  // ...
  '*': '*:*', // 通配符
}
```

### 3. 路由守卫 (`src/routers/authRouter.jsx`)

`AuthRouter` 组件在页面渲染前拦截路由跳转：

1.  **Token 检查**: 未登录用户重定向到登录页（白名单除外）。
2.  **权限检查**:
    - 调用 `permissionService.canAccessRoute(pathname)`。
    - 检查用户允许的 `routes` 列表是否包含当前路径。
    - 如果路由配置了 `meta.permission`，则进一步校验具体权限码。

## 五、开发指南

### 1. 核心文件结构

- `src/mock/permission.ts`: **核心**。定义角色、测试账号、路由映射表、Mock 数据。
- `src/service/permissionService.ts`: **服务层**。单例模式，负责权限的缓存、获取和校验方法 (`hasPermission`, `canAccessRoute`)。
- `src/service/api/permission.ts`: **接口层**。处理 API 请求与 Mock 数据的切换。
- `src/routers/authRouter.jsx`: **路由层**。实现路由守卫逻辑。
- `src/components/auth/PermissionGuard.tsx`: **组件层**。用于包裹需要权限控制的 UI 组件。

### 2. 如何在代码中使用权限

#### 在组件中控制显示

使用 `PermissionGuard` 组件或 `usePermission` Hook：

```tsx
import PermissionGuard from '@/components/auth/PermissionGuard'

// 仅拥有 user:create 权限的用户可见
;<PermissionGuard permission="user:create">
  <Button>创建用户</Button>
</PermissionGuard>
```

#### 在逻辑中检查权限

使用 `permissionService`：

```typescript
import { permissionService } from '@/service/permissionService'

const canEdit = await permissionService.hasPermission('user:update')
if (canEdit) {
  // 执行编辑逻辑
}
```

### 3. 调试技巧

在浏览器控制台执行以下代码可快速切换角色（无需重新登录）：

```javascript
// 切换为超级管理员
localStorage.setItem('user_role', 'super_admin')
location.reload()

// 切换为管理员
localStorage.setItem('user_role', 'admin')
location.reload()

// 切换为业务员
localStorage.setItem('user_role', 'business_user')
location.reload()
```

## 六、数据流向图

```mermaid
graph TD
    A[用户登录] --> B{登录方式}
    B -->|表单| C[匹配测试账号]
    B -->|GitHub| D[匹配特定邮箱]
    C --> E[确定角色 (Role)]
    D --> E
    E --> F[获取权限配置 (Mock/API)]
    F --> G[生成 UserPermission 对象]
    G -->|包含| H[Roles 列表]
    G -->|包含| I[Permissions 列表]
    G -->|包含| J[Routes 列表]
    G --> K[存入 PermissionService & LocalStorage]

    L[路由跳转] --> M[AuthRouter 拦截]
    M --> N{检查 Token}
    N -->|无| O[跳转登录]
    N -->|有| P{检查 Route 权限}
    P -->|在 Routes 列表中| Q[放行]
    P -->|不在列表| R[403 禁止访问]
```
