# 请求与 API 层

应用统一使用 `src/service/request.js` 作为 HTTP 客户端。业务 API 放在 `src/service/api/`，页面调用领域函数，不直接重复拼接 URL、请求参数和传输配置。

## 调用请求客户端

```ts
import request from '@src/service/request'

const response = await request.get('/api/users', { page: 1, pageSize: 20 })
const result = await request.post('/api/users', { name: 'Ada' })
```

支持 `get`、`post`、`put`、`patch`、`delete`、`form`、`upload` 和 `download`。请求的底层实现是 Axios。

响应拦截器默认返回响应体，而不是完整的 Axios Response。若调用代码需要状态码或原始响应头，传入 `returnFullResponse: true`。

## 常用配置

```ts
await request.get('/api/public/config', {}, {
  needToken: false,
  showError: false,
  addTimestamp: false,
})
```

- 默认会尝试从本地存储添加演示 Token；公开接口用 `needToken: false`，其 401/403 响应不会触发本地登录态清理。
- 默认取消相同的进行中请求；某个请求需要并发时设置 `cancelDuplicate: false`。
- GET/DELETE 默认追加时间戳参数；不需要时用 `addTimestamp: false`。
- 默认显示统一错误提示；由页面自行处理错误时设置 `showError: false`。
- 单次请求不加密可设置 `encrypt: false`。
- 调用第三方跨域 API 时显式考虑 `withCredentials`、认证和 CORS 策略；公开 API 通常关闭凭证。

## 增加业务 API

在领域文件中整理路径、参数和返回类型：

```ts
// src/service/api/users.ts
import request from '../request'

export function getUsers(page: number) {
  return request.get('/api/users', { page, pageSize: 20 })
}
```

页面只导入 `getUsers`，由 API 层承担网络细节。第三方 API 也放在对应领域 API 文件中，并显式设置 Token、凭证和错误处理选项。

请求默认配置、拦截器和加密实现位于 `src/service/request.js`；权限与认证等业务规则分别由 `permissionService.ts`、`authService.ts` 管理。

