# 身份、权限与导航

`REACT_APP_USE_MOCK=true` 显式开启演示授权；关闭后只请求真实接口，失败不会降级为 mock。空 APP_BASE_URL 表示同源服务；api/ helper 暂未实现 RBAC 接口。演示邮箱 token 不适用于真实服务。

## 真实接口

| 方法 | 路径                     | 数据                      |
| ---- | ------------------------ | ------------------------- |
| GET  | /api/permissions/current | 当前身份 UserPermission   |
| GET  | /api/roles               | Role 数组（授权系统接口） |

响应可直接返回对象，或 `{code:0,data:...}` / `{code:200,data:...}`。其它 code 失败。UserPermission 包含 userId、username、roles、permissions、routes；Role 包含 id、name、code、permissions。接口 parser 检查必需结构，运行时权限字符串尚未逐项限定 Resource 枚举。管理页的数据接口是独立 `/api/admin/...`，见[企业资源](ENTERPRISE.md)。

## 单一策略

`config/route-policy.json` 保存 permission、title、i18nKey、menuGroup、menu.parent/order/icon。策略按精确路径、动态参数、最长已登记父路径匹配。权限支持精确点、资源名、`resource:*`、`*:*`。已映射页面必须满足 permission，宽泛 routes grant 不覆盖页面策略；未映射页面需明确 routes 模式或超级权限。

路由模块表达结构；平台 normalize/annotate 工具生成统一 metadata。AuthRouterBase 按 React Router 实际叶子路由判定；permission 和 role 同时声明时二者均需满足。公共身份和错误页仍由路由配置明确维护。

侧栏和全局搜索使用相同导航树，先过滤未注册的项目页面，再按权限过滤；无可访问子项的分组被移除。参数面包屑从匹配地址生成，不把 `:id` 当实际链接。PrimaryNav 也检查页面是否注册与是否授权。

新增页面注册路由，并更新 route-policy；新增权限资源扩展 model/permission.ts，必要时修改演示角色。`check:route-contract` 检查声明、有效策略、父级、环、同级顺序和图标注册。它不执行路由代码，不能替代构建/浏览器验证。

## 响应式授权

PermissionService 保存稳定快照，usePermission、ProtectedRoute、PermissionGuard、路由和菜单通过 `useSyncExternalStore` 订阅。刷新结果、刷新失败和清理会话同时更新所有已挂载消费者，不需要重新进页面。订阅时安装 storage、session-changed、focus 监听，最后一个消费者卸载时移除并取消到期计时器。

缓存有效期 30 分钟，按 active token 与演示 role override 绑定；同一资料的 GitHub token 更新也会失效。订阅期间到期重新同步，focus 检查失效缓存。清缓存提升 generation，在途旧响应在退出或切号后不可提交。

readStoredToken 优先读取 token，再读取 github_token，兼容原始字符串和 JSON token；GitHub profile 不代表有效凭据。没有 token 时不会请求授权服务或获取演示权限。登录/切换后调用 syncPermissions；同页退出使用 clearSession，它通知订阅者；跨标签页 token/role 变化由 storage 事件同步。

HTTP 401、业务数字 401/41002 清理会话并跳转 signin；403 保留身份。业务字符串 `"401"` 不等于数字 401。前端会话仍共享当前 origin 的凭据，尚未提供多个并行身份的 Provider。

## 验证与边界

单测覆盖多消费者刷新/撤权、监听销毁、跨标签页凭据变化、匿名拒绝、切号在途结果和策略越权。浏览器验证无刷新撤权和真实叶子路由保护。

localStorage 不属于可信授权源。业务后端每次请求须验证真实身份与 tenant 范围；角色管理和账号停用还需要服务端会话失效和审计。完整接入契约见[企业资源](ENTERPRISE.md)。
