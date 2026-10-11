# 请求层

## 入口与责任

| 文件                            | 责任                                                           |
| ------------------------------- | -------------------------------------------------------------- |
| platform/api/client.ts          | 新业务使用的 apiClient（Axios）与 fetchClient（Fetch）类型入口 |
| platform/api/request.js         | Axios 兼容适配器、自动 Bearer token、去重、上传下载            |
| platform/api/http.js            | Fetch 兼容适配器、响应类型、拦截器及 useRequest                |
| platform/api/core/response.ts   | RequestError、业务 envelope 检查、显式 unwrap                  |
| platform/api/core/async.ts      | 超时、延迟、重试、按序并发                                     |
| platform/api/core/encryption.ts | 共享可选协议实现，客户端配置相互独立                           |
| platform/auth/model/session.ts  | token 读取与身份失效处理                                       |

legacy 适配器保持 JS API；新入口不会自动将 JS 全部变为类型安全。泛型只描述调用方预期，领域 API 必须校验外部数据。

```ts
import { apiClient } from '@platform/api/client'
import { unwrapPayload, isRecord } from '@platform/api/core/response'

export async function loadName(signal: AbortSignal): Promise<string> {
  const raw = await apiClient.get<unknown>('/api/profile', {}, { signal, showError: false })
  const data = unwrapPayload(raw)
  if (!isRecord(data) || typeof data.name !== 'string') throw new Error('Invalid profile response')
  return data.name
}
```

## 响应与错误

HTTP 非 2xx 失败；JSON 中存在 code 时，仅数字 0/200 成功。成功 envelope 原样保留，unwrapPayload 在领域层读取 data。RequestError 携带 status、code、response（按传输情况）。两种适配器的 HTTP 错误 body 处理仍有差异，不能假设所有错误均已读取 JSON。

401/41002 失效当前请求身份的会话，403 保留登录；换号后迟到的旧 401 不清理新会话。needToken:false 不附带身份，也不触发登录失败清理。showError:false（Fetch 也支持 isShowError:false）关闭默认提示，页面自行显示。取消和超时拒绝 Promise，调用方仍需 catch；卸载时不要把取消提示当作业务错误。

## 传输差异

Axios 默认 baseURL 为 APP_BASE_URL、读取 token、可取消重复请求；替换 Axios instance 后仍安装统一拦截器。外部 AbortSignal 与去重 controller 合并，旧取消请求只清理自己的记录，不能删除新请求。

Fetch 使用原生 fetch 与同源 credentials，现在与 Axios 一样默认附加活动 Bearer token，企业会话同时附带 X-Tenant-ID；needToken:false 或显式 Authorization 可覆盖自动处理。FormData 自动移除 Content-Type，让浏览器生成 boundary；URL 已有 query 时正确追加 `&`。timeout 覆盖响应 body 读取，finally 清 timer；raw Response 模式返回后，后续 body 消费不在该超时范围。204/205 返回 undefined。

GET/DELETE 默认加时间戳防缓存，可设 addTimestamp:false。响应类型、上传下载及额外传输选项仍使用对应 legacy 适配器，JsonClient 只覆盖常用 JSON 方法。

## 并发与重试

core/async 的 attempts 包含第一次请求，取消不重试。runWithConcurrency 保持输入顺序；它本身不取消其它已启动任务。withTimeout 清理 timer，但不自动终止底层任务，网络调用需同时使用 AbortSignal。

features/business 的 useCompanyCertificates 并行读取公司资质，API decoder 检查返回结构，卸载取消并避免旧状态更新。不要在页面重复封装重试、token 失效或 envelope 检查。

可选加密见[协议说明](REQUEST_ENCRYPTION.md)。

服务端状态的浏览器缓存属于 platform/data/cache.ts 的 Provider 装饰层，不在传输层重复缓存。键、TTL、取消、失效与身份隔离见[企业资源](ENTERPRISE.md)。企业 API 自身使用 Cache-Control:no-store，不把授权响应交给 HTTP/CDN 缓存。
