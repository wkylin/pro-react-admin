# 用户-角色-权限关系文档

## 一、系统用户

当前系统支持以下用户类型（通过不同方式登录）：

### 1. GitHub OAuth 登录用户
- **登录方式**: 通过 GitHub OAuth 授权
- **用户信息**: 从 GitHub API 获取
- **用户标识**: GitHub 邮箱地址

### 2. 表单登录用户
- **登录方式**: 邮箱 + 密码表单登录
- **用户信息**: 表单输入的邮箱地址
- **用户标识**: 邮箱地址

## 二、预定义角色

系统预定义了 4 种角色：

### 1. 超级管理员 (super_admin)
- **角色代码**: `super_admin`
- **角色ID**: `1`
- **权限**: `*:*` (所有权限)
- **可访问路由**: 所有路由
- **描述**: 拥有系统所有权限

### 2. 管理员 (admin)
- **角色代码**: `admin`
- **角色ID**: `2`
- **权限列表**:
  - `user:*` - 用户管理所有权限
  - `role:read` - 角色查看权限
  - `permission:read` - 权限查看权限
  - `dashboard:*` - 仪表盘所有权限
  - `system:*` - 系统管理所有权限
  - `business:*` - 业务管理所有权限
  - `chart:*` - 图表所有权限
  - `ui:*` - UI组件所有权限
  - `coupons:*` - 优惠券管理所有权限
  - `product:*` - 产品管理所有权限
  - `home:*` - 首页所有权限
  - `demo:*` - 演示页面所有权限
- **可访问路由**:
  - `/`, `/dashboard`, `/business`, `/chart`, `/ui`
  - `/coupons`, `/coupons/home`, `/coupons/add`, `/coupons/edit/:id`, `/coupons/detail/:id`
  - `/product`, `/demo`, `/permission`
- **描述**: 拥有大部分管理权限

### 3. 业务员 (business_user)
- **角色代码**: `business_user`
- **角色ID**: `3`
- **权限列表**:
  - `business:read`, `business:create`, `business:update` - 业务管理权限
  - `coupons:read`, `coupons:create` - 优惠券查看和创建权限
  - `product:read` - 产品查看权限
  - `dashboard:read` - 仪表盘查看权限
  - `home:read` - 首页查看权限
  - `chart:read` - 图表查看权限
- **可访问路由**:
  - `/`, `/dashboard`, `/business`
  - `/coupons`, `/coupons/home`, `/product`, `/chart`
- **描述**: 拥有业务相关操作权限

### 4. 普通用户 (user)
- **角色代码**: `user`
- **角色ID**: `4`
- **权限列表**:
  - `home:read` - 首页查看权限
  - `demo:read` - 演示页面查看权限
  - `dashboard:read` - 仪表盘查看权限
- **可访问路由**:
  - `/`, `/dashboard`, `/demo`
- **描述**: 仅拥有查看权限

## 三、用户与角色绑定关系

### 1. 基于邮箱的自动绑定

系统根据用户邮箱自动分配角色：

| 用户邮箱 | 绑定角色 | 角色代码 |
|---------|---------|---------|
| `wkylin.w@gmail.com` | 管理员 | `admin` |
| 其他邮箱 | 普通用户 | `user` |

### 2. 手动角色切换（开发/测试）

可以通过以下方式手动切换角色：

```javascript
// 在浏览器控制台执行
localStorage.setItem('user_role', 'admin')        // 切换为管理员
localStorage.setItem('user_role', 'business_user') // 切换为业务员
localStorage.setItem('user_role', 'super_admin')   // 切换为超级管理员
localStorage.setItem('user_role', 'user')          // 切换为普通用户
```

### 3. 通过权限示例页面切换

访问 `/permission` 页面，可以通过界面切换角色进行测试。

## 四、用户-角色-权限关系图

```
┌─────────────────┐
│   用户 (User)    │
│  - GitHub用户    │
│  - 表单登录用户  │
└────────┬────────┘
         │
         │ 拥有
         ▼
┌─────────────────┐
│   角色 (Role)    │
│  - super_admin   │
│  - admin         │
│  - business_user │
│  - user          │
└────────┬────────┘
         │
         │ 包含
         ▼
┌─────────────────┐
│  权限 (Permission)│
│  - resource:action│
│  - resource:*     │
│  - *:*           │
└────────┬────────┘
         │
         │ 控制
         ▼
┌─────────────────┐
│   路由 (Route)   │
│  - /home        │
│  - /dashboard   │
│  - /business    │
│  - ...          │
└─────────────────┘
```

### 关系说明

1. **用户 → 角色**: 一个用户可以有多个角色（当前实现为单角色）
2. **角色 → 权限**: 一个角色包含多个权限
3. **权限 → 路由**: 权限控制路由的访问

## 五、登录表单与权限系统集成

### 1. GitHub OAuth 登录流程

```
用户点击GitHub登录
    ↓
跳转到GitHub授权页面
    ↓
GitHub回调 /auth/callback
    ↓
AuthCallback 组件处理回调
    ↓
获取GitHub用户信息（包含邮箱）
    ↓
保存用户信息到 localStorage
    ↓
调用 permissionService.syncPermissions()
    ↓
根据用户邮箱分配角色（wkylin.w@gmail.com → admin）
    ↓
获取用户权限和可访问路由
    ↓
跳转到第一个有权限的路由（优先 /home）
```

### 2. 表单登录流程

```
用户填写邮箱+密码
    ↓
提交登录表单
    ↓
onFinish 处理登录
    ↓
保存 token 到 localStorage
    ↓
跳转到首页 /
    ↓
AuthRouter 路由守卫
    ↓
检查 token
    ↓
调用 permissionService.canAccessRoute()
    ↓
根据邮箱分配角色（wkylin.w@gmail.com → admin）
    ↓
检查路由权限
    ↓
有权限：渲染页面
无权限：跳转 /403
```

### 3. 代码实现位置

#### 登录表单 (`src/pages/signin/index.jsx`)
```javascript
const onFinish = (values) => {
  // 模拟后端登录
  const { email } = values
  setLocalStorage('token', { token: email })
  redirectTo('/')
}
```

#### GitHub 回调处理 (`src/components/auth/AuthCallback.tsx`)
```typescript
await authService.handleCallback(code)
// 登录成功后立即同步权限
await permissionService.syncPermissions()
// 获取用户可访问的路由并跳转
const routes = await permissionService.getAccessibleRoutes(true)
```

#### 权限获取逻辑 (`src/mock/permission.ts`)
```typescript
export const mockGetUserPermissions = async (
  userId?: string,
  roleCode?: string
): Promise<UserPermission> => {
  // 1. 检查是否有手动设置的角色
  const storedRoleCode = localStorage.getItem('user_role')

  // 2. 根据用户邮箱自动分配角色
  const githubUser = localStorage.getItem('github_user')
  if (githubUser && user.email === 'wkylin.w@gmail.com') {
    return { ...mockUserPermissions['admin'] }
  }

  // 3. 默认返回普通用户权限
  return { ...mockUserPermissions['user'] }
}
```

## 六、权限代码格式

### 权限代码规则

格式：`资源:操作` 或 `资源` 或 `*:*`

- **资源** (Resource): `user`, `role`, `dashboard`, `business`, `chart`, `ui`, `coupons`, `product`, `home`, `demo` 等
- **操作** (Action): `create`, `read`, `update`, `delete`, `export`, `import`, `approve`, `reject`
- **通配符**:
  - `resource:*` - 资源的所有操作权限
  - `*:*` - 所有权限（超级管理员）

### 权限示例

- `user:read` - 读取用户
- `user:create` - 创建用户
- `user:update` - 更新用户
- `user:delete` - 删除用户
- `user:*` - 用户的所有操作
- `*:*` - 所有权限

## 七、路由权限映射

路由与权限的映射关系 (`src/mock/permission.ts`):

| 路由路径 | 所需权限 | 说明 |
|---------|---------|------|
| `/` | `home:read` | 首页 |
| `/dashboard` | `dashboard:read` | 仪表盘 |
| `/business` | `business:read` | 业务管理 |
| `/coupons` | `coupons:read` | 优惠券列表 |
| `/coupons/add` | `coupons:create` | 创建优惠券 |
| `/coupons/edit/:id` | `coupons:update` | 编辑优惠券 |
| `/coupons/detail/:id` | `coupons:read` | 优惠券详情 |
| `/product` | `product:read` | 产品管理 |
| `/chart` | `chart:read` | 图表 |
| `/ui` | `ui:read` | UI组件 |
| `/demo` | `demo:read` | 演示页面 |
| `/permission` | `permission:read` | 权限示例 |

## 八、使用示例

### 1. 测试不同角色

```javascript
// 切换为管理员
localStorage.setItem('user_role', 'admin')
location.reload()

// 切换为业务员
localStorage.setItem('user_role', 'business_user')
location.reload()

// 切换为普通用户
localStorage.setItem('user_role', 'user')
location.reload()
```

### 2. 检查用户权限

```typescript
import { permissionService } from '@/service/permissionService'

// 检查单个权限
const canEdit = await permissionService.hasPermission('user:update')

// 检查多个权限（全部需要）
const result = await permissionService.hasAllPermissions(['user:read', 'user:update'])

// 检查角色
const isAdmin = await permissionService.hasRole('admin')

// 检查路由权限
const canAccess = await permissionService.canAccessRoute('/coupons/add')
```

### 3. 在组件中使用权限控制

```tsx
import PermissionGuard from '@/components/auth/PermissionGuard'
import AuthButton from '@/components/auth/AuthButton'

// 组件级权限控制
<PermissionGuard permission="user:create">
  <Button>创建用户</Button>
</PermissionGuard>

// 按钮级权限控制
<AuthButton permission="user:delete" onClick={handleDelete}>
  删除用户
</AuthButton>
```

## 九、扩展说明

### 添加新用户

要添加新的用户-角色绑定关系，修改 `src/mock/permission.ts`:

```typescript
// 在 mockGetUserPermissions 函数中添加
if (user.email === 'newuser@example.com') {
  return { ...mockUserPermissions['admin'] } // 或其他角色
}
```

### 添加新角色

1. 在 `src/mock/permission.ts` 的 `mockRoles` 中添加新角色定义
2. 在 `mockUserPermissions` 中添加对应的权限配置
3. 更新 `routePermissionMap` 添加路由映射

### 添加新权限

1. 在 `src/types/permission.ts` 的 `Resource` 或 `PermissionAction` 类型中添加
2. 在角色权限列表中添加新的权限代码
3. 在路由映射中添加对应的权限要求

## 十、数据流程图

```
登录成功
    ↓
保存用户信息（localStorage）
    ↓
调用 permissionService.syncPermissions()
    ↓
清除权限缓存
    ↓
调用 mockGetUserPermissions()
    ↓
检查 localStorage['user_role'] → 手动设置的角色
    ↓
检查用户邮箱 → 自动分配角色
    ↓
返回用户权限信息（角色+权限+路由）
    ↓
保存权限到缓存
    ↓
路由守卫检查权限
    ↓
允许/拒绝访问
```

## 总结

- **用户**: 通过 GitHub OAuth 或表单登录
- **角色**: 4 种预定义角色（super_admin, admin, business_user, user）
- **权限**: 资源:操作格式的权限代码
- **路由**: 根据权限控制访问
- **绑定**: 基于邮箱自动分配，支持手动切换（测试用）

