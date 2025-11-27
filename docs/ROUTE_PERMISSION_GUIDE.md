# 新增路由与权限维护指南（以通知中心为例）

本项目采用模块化路由与统一权限体系，以下以“通知中心”功能为例，说明如何规范地新增路由及维护相关权限，便于后续维护和扩展。

---

## 1. 路由管理

### 1.1 路由模块化
- 每个功能模块单独维护路由文件，统一放置于 `src/routers/modules/` 目录下。
- 例如：`src/routers/modules/notification.routes.jsx`。

### 1.2 路由定义示例
```js
// src/routers/modules/notification.routes.jsx
import React from 'react'

export const notificationRoutes = [
  {
    path: 'notifications',
    name: '通知中心',
    key: '/notifications',
    element: React.createElement(
      React.lazy(() => import('../../pages/notifications'))
    ),
    meta: {
      title: '通知中心',
      icon: 'BellOutlined',
      permission: 'notification',
    },
  },
]
```

### 1.3 主路由整合
- 在 `src/routers/index.jsx` 中引入并合并到 `mainLayoutRoute.children`：
```js
import { notificationRoutes } from './modules/notification.routes'
mainLayoutRoute.children = [
  ...mainLayoutRoute.children,
  ...notificationRoutes,
  // ...其他模块路由
]
```
- 这样 `/notifications` 路由即被主路由体系管理。

---

## 2. 权限控制

### 2.1 权限配置
- 路由的 `meta.permission` 字段用于标识权限点。
- 权限点统一在权限服务或配置中维护（如 `permissionService` 相关实现）。
- 例如：
```js
meta: {
  title: '通知中心',
  icon: 'BellOutlined',
  permission: 'notification', // 权限点
}
```

### 2.2 权限分配
- 在权限服务中配置所有角色可访问：
  - 目前通知中心权限已在统一权限体系中开放给所有用户，无需单独维护 `notification.js`。
- 权限校验与菜单、页面访问自动关联。

---

## 3. 维护建议

1. **新增功能时**，务必：
   - 在 `modules` 目录下新建对应路由文件。
   - 在主路由 `index.jsx` 中合并。
   - 路由 `meta` 字段补全 `title`、`icon`、`permission`。
2. **权限点命名**应简洁明了，避免重复。
3. **删除功能时**，同步移除对应路由、权限配置及无用文件。
4. **不再推荐**在 `src/routes/` 或 `src/permission/` 目录下单独维护路由/权限文件。

---

## 4. 参考
- 现有通知中心实现：
  - 路由：`src/routers/modules/notification.routes.jsx`
  - 页面：`src/pages/notifications/index.jsx`
  - 主路由整合：`src/routers/index.jsx`

如有疑问，建议先查阅本文件或现有模块实现。
