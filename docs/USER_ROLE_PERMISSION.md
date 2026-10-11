# 身份、权限与路由

## 数据来源

`REACT_APP_USE_MOCK=true` 是演示授权的唯一开关。空 APP_BASE_URL 表示同源服务。关闭 mock 后，请求失败或格式无效会抛错；PermissionService 刷新失败清除授权，不保留过期权限或切换为 mock。仓库所有环境模板仍显式开启演示，真实业务部署需要覆盖 false。

真实服务应实现：

| 方法 | 路径                     | 数据                      |
| ---- | ------------------------ | ------------------------- |
| GET  | /api/permissions/current | 当前身份的 UserPermission |
| GET  | /api/roles               | Role 数组                 |

api/ 的 Express helper 暂未实现这些接口。Axios 默认附加本地 token 的 Bearer Authorization；后端依据凭据确定身份，客户端 userId 参数只用于演示接口。

响应可直接返回对象，也可使用 `{ code: 0, data: ... }` 或 `{ code: 200, data: ... }`。其它带 code 的对象视为业务失败。

```ts
interface Role {
  id: string
  name: string
  code: string
  permissions: string[]
}
interface UserPermission {
  userId: string
  username: string
  roles: Role[]
  permissions: string[]
  routes: string[]
}
```

permission.ts 对上述必需字段做结构校验。PermissionCode 在 TypeScript 中约束 resource:action；运行时目前验证字符串结构，未逐项验证所有资源枚举。

## 策略与守卫

config/route-policy.json 是路径权限、标题、i18nKey、菜单分组的维护入口。policy.ts 生成 routePermissionMap，匹配优先采用精确策略，其次采用最长父路径策略。权限支持精确点、资源名、resource:* 和超级权限 _:_。

routers/utils 注入策略；AuthRouterBase 使用 matchRoutes 的实际叶子路由检查权限，权限与角色同时存在时要求二者均满足；有效缓存可同步判定，切页不会为重复异步检查卸载 Tabs。ProtectedRoute / PermissionGuard 提供局部守卫，AuthButton 控制按钮，菜单结合可访问路由过滤。公共登录和错误回退由路由结构显式维护；未映射的路由不能被视作自动具有超级权限。

新增资源要更新 model/permission.ts 的 Resource、route-policy.json、相应路由与 mock 角色（演示需要时）。运行 `pnpm run check:route-contract`，它用 TypeScript AST 比较声明与菜单，当前不执行运行时路由代码。

## 会话与缓存

PermissionService 是当前应用使用的单例，内存与 localStorage 缓存绑定当前 authKey。正常缓存期限 30 分钟；清缓存会提升 generation，使旧请求不能提交结果。切换 token 时旧身份的结果也不能写入新缓存。内存缓存单独绑定身份键，清除持久化会话后也不会复用旧授权。

authKey 与请求层共用 readStoredToken：优先读取 token，再读取 github_token，并附加演示角色。GitHub 用户资料不作为凭据；同一资料下更新 token 也会失效旧缓存。旧 GitHub 身份键在升级后自动失效，需要重新获取权限。

HTTP 401、业务 401 或 41002 清理本地会话并跳转 `#/signin`。HTTP 403 表示权限不足，保留登录状态。业务 code 必须使用数字，字符串 `"401"` 不等同于数字 401。

浏览器 localStorage 不是可信授权源；后端对每次受保护请求重新鉴权。GitHub OAuth 的 client secret 只在服务端使用；演示邮箱 token 不适用于真实业务服务。

## 回归

单测覆盖同源接口、服务失败不 mock、非法响应、刷新撤权、切号在途结果、策略匹配。浏览器回归覆盖授权访问、拒绝访问和账户缓存隔离，见[质量门禁](QUALITY.md)。
