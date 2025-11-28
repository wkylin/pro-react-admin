# 路由权限系统说明

## 📋 系统架构

### 1. 权限分配逻辑 (`src/mock/permission.ts`)

#### **之前的问题**
- ❌ 使用随机算法（Fisher-Yates）分配路由
- ❌ 每次刷新页面，路由分配结果都会改变
- ❌ 不稳定，测试困难

#### **现在的方案**
- ✅ **固定路由分配**：每个角色有预定义的路由列表
- ✅ **按业务逻辑划分**：根据角色职责分配合理的路由
- ✅ **稳定可靠**：每次登录同一账号看到相同的菜单

#### **角色路由分配**

```typescript
// 超级管理员 (100%)：所有路由权限
const adminRoutes = [所有30个路由]

// 管理员 (60%)：核心业务 + 大部分功能
const managerRoutes = [
  '/', '/demo', '/business', '/echarts', '/d3-chart', 
  '/geo', '/coupons/add', '/coupons/edit', '/build/webpack',
  '/build/vite', '/backend', '/dashboard', '/permission', '/profile',
  '/print', '/markmap', '/postmessage'
]  // 16个路由

// 业务员 (35%)：业务相关功能
const businessRoutes = [
  '/', '/business', '/coupons/add', '/coupons/edit',
  '/build/webpack', '/backend', '/dashboard', '/demo',
  '/echarts', '/profile'
]  // 10个路由

// 普通用户 (17%)：基础查看功能
const userRoutes = [
  '/', '/demo', '/dashboard', '/profile', '/echarts'
]  // 5个路由
```

### 2. 动态菜单生成 (`src/pages/layout/proSecNav/index.jsx`)

#### **之前的问题**
- ❌ 硬编码的静态菜单
- ❌ 所有用户看到相同的菜单项
- ❌ 无法根据权限动态调整

#### **现在的方案**
- ✅ **动态获取权限**：组件初始化时从 `permissionService` 获取用户路由权限
- ✅ **智能过滤**：根据用户可访问路由自动过滤菜单
- ✅ **递归处理子菜单**：支持多级菜单的权限过滤

#### **核心代码逻辑**

```javascript
// 1. 初始化：获取用户权限
useEffect(() => {
  const initMenus = async () => {
    const userPermissions = await permissionService.getUserPermissions()
    const routes = userPermissions?.routes || ['/']
    setAccessibleRoutes(routes)
    
    // 生成动态菜单
    const dynamicMenus = generateMenuItems(routes)
    setMenuItems(dynamicMenus)
  }
  initMenus()
}, [])

// 2. 菜单过滤：支持精确匹配和父路径匹配
const hasAccess = (path) => {
  return routes.some(route => {
    if (route === path) return true  // 精确匹配
    if (path.startsWith(route + '/')) return true  // 父路径匹配
    return false
  })
}

// 3. 递归过滤：处理多级菜单
const filterMenuItems = (items) => {
  return items
    .map(item => {
      if (item.children) {
        const filteredChildren = filterMenuItems(item.children)
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren }
        }
        return null  // 子菜单全部被过滤则不显示父菜单
      }
      return hasAccess(item.key) ? item : null
    })
    .filter(Boolean)
}
```

## 🔐 测试账号

| 邮箱 | 密码 | 角色 | 可见路由数 | 典型权限 |
|------|------|------|-----------|---------|
| admin@test.com | 123456 | super_admin | 30 (100%) | 所有功能 |
| manager@test.com | 123456 | admin | 16 (60%) | 核心业务+管理 |
| business@test.com | 123456 | business_user | 10 (35%) | 业务操作 |
| user@test.com | 123456 | user | 5 (17%) | 基础查看 |

## 🎯 验证测试

### 测试步骤

1. **登录不同账号**
   ```bash
   访问: http://localhost:8080/signin
   依次使用上述4个测试账号登录
   ```

2. **观察左侧菜单**
   - super_admin：看到完整的菜单树（所有一级和二级菜单）
   - admin：看到大部分菜单（核心业务功能）
   - business_user：只看到业务相关菜单
   - user：只看到首页、Demo、Dashboard、Profile、Echarts

3. **验证路由访问**
   - 尝试直接访问 URL（如 `/business`）
   - 无权限的用户会被重定向到 `/403`

4. **检查嵌套菜单**
   - "技术栈" 子菜单：
     - 只有能访问 `/coupons/add` 或 `/coupons/edit` 的用户才能看到 "前端技术栈"
     - 只有能访问 `/backend` 的用户才能看到 "后端技术栈"
   - 如果子菜单全部被过滤，父菜单也会隐藏

## 📝 扩展指南

### 如何添加新路由？

1. **在 `src/mock/permission.ts` 中添加路由**
   ```typescript
   const allRoutes = [
     // ... 现有路由
     '/new-feature',  // 新增路由
   ]
   ```

2. **分配给角色**
   ```typescript
   const managerRoutes = [
     // ... 现有路由
     '/new-feature',  // 添加到管理员可访问列表
   ]
   ```

3. **在 `proSecNav` 中添加菜单项**
   ```javascript
   const allMenuItems = [
     // ... 现有菜单
     { label: '新功能', key: '/new-feature', icon: <StarOutlined /> },
   ]
   ```

### 如何调整角色权限？

直接修改 `src/mock/permission.ts` 中对应角色的路由数组：

```typescript
// 给业务员增加权限
const businessRoutes = [
  // ... 现有路由
  '/new-business-feature',  // 新增
]
```

## 🔄 数据流

```
用户登录
  ↓
permissionService.syncPermissions() 
  ↓
mockGetUserPermissions() 返回角色对应的 routes 数组
  ↓
localStorage 缓存权限数据
  ↓
proSecNav 组件初始化
  ↓
调用 permissionService.getUserPermissions()
  ↓
获取 routes 数组
  ↓
generateMenuItems(routes) 过滤菜单
  ↓
渲染动态菜单
```

## ⚠️ 注意事项

1. **路由路径必须精确匹配**
   - 菜单 key 和 routes 数组中的路径必须一致
   - 例如：`/coupons/add` 和 `/coupons/add/` 是不同的路径

2. **父路径自动匹配**
   - 如果用户有 `/coupons` 权限，会自动允许访问 `/coupons/add`
   - 这是通过 `path.startsWith(route + '/')` 实现的

3. **子菜单级联过滤**
   - 如果所有子菜单都被过滤，父菜单也会自动隐藏
   - 这避免了显示空的父菜单项

4. **降级策略**
   - 如果权限获取失败，会显示基础菜单（仅首页）
   - 这确保系统不会完全崩溃

## 🚀 性能优化

- ✅ 权限数据缓存在 localStorage（30分钟 TTL）
- ✅ 菜单仅在组件初始化时生成一次
- ✅ 使用 useState 缓存过滤结果，避免重复计算
- ✅ 路由变化时不重新获取权限（除非刷新页面）

## 🧭 多页签、参数化路由与懒加载提示（新增功能说明）

> 说明：近期实现了对参数化路由与按查询参数区分页签的支持，同时补充了路由懒加载与公共安全跳转的最佳实践。请在新增路由或使用多页签功能时参考下列要点。

- **参数化路由（示例）**：支持类似 `/notification/:id` 的动态路由，推荐在 `src/routers/modules` 中像下面这样声明：

```js
{
  path: 'notification/:id',
  key: '/notification/:id',
  element: <NotificationDetail />
}
```

- **tab key 策略（Query-sensitive）**：当 URL 包含查询字符串（例如 `?type=2`）时，系统会将 tab 的 key 设为 `pathname + search`（例如 `/notification/1?type=2`），从而保证：
  - 每个不同的查询会创建独立的 tab（如果路由的 `meta.keepQueryTabs` 未显式禁用）。
  - 与 KeepAlive 缓存/激活逻辑保持一致：`pane.key` 必须和 `fullPath`（`pathname+search`）精确匹配，才能正确显示已缓存的组件实例。

- **路由匹配逻辑（getKeyName）**：路由解析器会在路由表中匹配静态路由、参数化路由和通配符路由；在存在查询时优先使用完整路径作为 tab key。请注意避免在不同路由中使用重复的 key，否则会触发 React 的 key 冲突警告。

- **新增路由时的懒加载配置提醒**：如果你的路由采用了项目中的懒加载约定（路由按需加载），请务必在路由懒加载配置中注册新组件/路由，以便构建工具与运行时能够正确处理懒加载。配置文件位置示例：

```
src/routers/config/lazyLoad.config.js
```

在添加新路由后，检查并适配该配置（例如：将新路由对应的 chunk 名称或懒加载资源路径加入配置），否则用户在首次访问该路由时可能出现加载异常或找不到资源的问题。

- **公共安全跳转（useSafeNavigate）**：项目提供 `useSafeNavigate` 钩子用于统一的、安全的路由跳转（会先做权限检查再执行导航），使用示例：

```jsx
const { redirectTo } = useSafeNavigate()
// 带查询和权限检查的跳转
redirectTo(`/notification/${id}${search || ''}`)
```

如果跳转被权限策略阻止，`useSafeNavigate` 会处理友好提示并阻止导航，从而避免在未授权场景出现空白页或报错。

---

建议：新增复杂的参数化/查询敏感页面时，同时验证：路由配置（含懒加载）、菜单 key（避免重复）、以及是否需要在 `meta` 中设置 `keepQueryTabs` 来显式控制是否按查询拆分 tab。
