# 路由与权限

项目使用 RBAC 权限模型。权限检查分为路由访问控制和 UI 元素显隐；前端权限用于界面体验，后端仍须对受保护的数据和操作进行授权。

## 组成

- `src/types/permission.ts`：角色、权限码和用户权限类型。
- `src/mock/permission.ts`：演示角色、测试数据和路由到权限码的映射。
- `src/service/api/permission.ts`：权限 API 与 Mock 适配。
- `src/service/permissionService.ts`：权限获取、缓存和检查。
- `src/routers/modules/*.routes.tsx`：按模块声明路由。
- `src/routers/index.tsx`：组合、归一化路由并注入权限元数据。
- `src/routers/authRouter.tsx`：检查登录状态、公开路由、角色和权限。
- `src/components/auth/`：`PermissionGuard`、`AuthButton` 等组件级控制。

## 路由声明

在路由 `meta` 中声明访问策略。未配置细粒度权限时，路由守卫会使用 `permissionService` 的可访问路由结果判断。

```tsx
{
  path: '/reports',
  element: <ReportsPage />,
  meta: {
    title: '报表',
    permission: 'dashboard:read',
  },
}
```

公开路由通过 `auth: false` 或 `src/routers/config/publicRoutes.ts` 管理。菜单可见性由权限结果过滤，不应把菜单隐藏当作唯一的访问控制。

## 组件级检查

```tsx
<PermissionGuard permission="user:update" fallback={null}>
  <UserEditor />
</PermissionGuard>

<AuthButton permission="user:create">新建用户</AuthButton>
```

业务逻辑需要程序化判断时，调用 `permissionService` 的权限检查方法；不要在组件里自行读取或解析权限缓存。

## 新增受保护页面

1. 在 `src/pages/<feature>/` 添加页面。
2. 在对应的 `src/routers/modules/*.routes.tsx` 注册路由和 `meta`。
3. 在 `src/mock/permission.ts` 更新演示环境需要的路径和权限映射。
4. 若页面需要显示菜单，按现有菜单/路由元数据约定补充标题和国际化键。
5. 若按钮或局部内容也需要控制，使用 `PermissionGuard` 或 `AuthButton`。

演示账号与角色数据以 `src/mock/permission.ts` 当前内容为准，不在文档中复制凭据，避免文档与代码不一致。

