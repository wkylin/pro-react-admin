# HTTP 请求模块使用指南

位置: `src/service/http.js`

基于原生 `fetch` API 封装的 HTTP 客户端，提供了统一的错误处理、拦截器、超时控制、文件处理等功能，并包含一套 React Hooks。

## 引入方式

推荐使用命名导入，以便同时使用 Hooks：

```javascript
import { http, useGet, usePost } from '@/service/http'
```

也可以使用默认导入（仅使用 http 实例时）：

```javascript
import http from '@/service/http'
```

---

## 一、HTTP 客户端 (HttpClient)

`http` 是 `HttpClient` 的实例，提供了类似 Axios 的 API。

### 1. 基础请求方法

```javascript
// GET 请求 (参数自动序列化)
const res = await http.get('/api/users', { page: 1, type: 'active' })

// POST 请求
const res = await http.post('/api/users', { name: 'John', age: 30 })

// PUT / PATCH / DELETE
await http.put('/api/users/1', { name: 'John Doe' })
await http.patch('/api/users/1', { status: 'inactive' })
await http.delete('/api/users/1')
```

### 2. 文件上传与下载

**文件上传** (自动处理 `Content-Type`):

```javascript
const formData = new FormData()
formData.append('file', file)
await http.upload('/api/upload', formData)
```

**文件下载** (支持进度回调):

```javascript
await http.download('/api/export', { id: 123 }, 'report.xlsx', {
  onProgress: ({ percent, loaded, total }) => {
    console.log(`下载进度: ${percent}%`)
  },
})
```

### 3. 高级功能

**拦截器**:

```javascript
// 请求拦截器
http.useRequestInterceptor((config) => {
  config.headers['Authorization'] = 'Bearer token'
  return config
})

// 响应拦截器
http.useResponseInterceptor((data, config) => {
  return data.result // 提取核心数据
})
```

**重试机制**:

```javascript
// 失败自动重试 3 次，间隔 1 秒
await http.retry(() => http.get('/api/unstable'), 3, 1000)
```

**并发请求**:

```javascript
const [user, posts] = await http.parallel([{ url: '/api/user/1' }, { url: '/api/user/1/posts' }])
```

**取消请求**:

```javascript
const controller = new AbortController()
http.get('/api/long-task', {}, { controller })
controller.abort() // 取消请求
```

**禁用时间戳后缀**:

默认情况下，`GET` 和 `DELETE` 请求会自动添加时间戳参数 `_` 以防止缓存。如果不需要此行为，可手动禁用。

```javascript
await http.get(
  '/api/static-data',
  {},
  {
    addTimestamp: false, // 禁用自动添加时间戳
  }
)
```

---

## 二、React Hooks

提供了一组 Hooks 用于在组件中便捷地发起请求，自动管理 `loading` 和 `error` 状态，并在组件卸载时自动取消请求。

### 1. useRequest (基础 Hook)

```javascript
const [data, loading, error, refetch] = useRequest('/api/data', {
  method: 'GET',
  params: { id: 1 },
})
```

### 2. 快捷 Hooks

- `useGet(url, options)` - GET 请求
- `usePost(url, options)` - POST 请求
- `usePut(url, options)` - PUT 请求
- `useDelete(url, options)` - DELETE 请求
- `usePatch(url, options)` - PATCH 请求

**示例**:

```javascript
const UserProfile = ({ id }) => {
  const [user, loading, error, refresh] = useGet('/api/user', { id })

  if (loading) return <Spin />
  if (error) return <Alert message={error.message} />

  return (
    <div>
      <h1>{user.name}</h1>
      <Button onClick={() => refresh()}>刷新</Button>
    </div>
  )
}
```

---

## 三、默认行为说明

1.  **Suffix 处理**: 默认拦截器会自动为 `GET` 和 `DELETE` 请求的参数添加时间戳后缀（参数名为 `_`），以防止浏览器缓存。可通过配置 `addTimestamp: false` 禁用。
2.  **错误处理**: 默认情况下，请求失败会自动弹出全局错误提示 (`showMessage.error`)。可通过配置 `isShowError: false` 关闭。
3.  **业务状态码**: 响应拦截器会自动检查 `data.code`。如果非 0 或 200，将抛出错误；如果是 41002，将跳转至登录页。

---

## 四、API 参考

### FetchClient 配置 (Config)

| 属性           | 类型    | 默认值                                 | 说明                                     |
| -------------- | ------- | -------------------------------------- | ---------------------------------------- |
| `BASE_URL`     | string  | `process.env.APP_BASE_URL`             | 基础 URL                                 |
| `TIMEOUT`      | number  | `20000`                                | 超时时间 (ms)                            |
| `HEADERS`      | object  | `{'Content-Type': 'application/json'}` | 默认请求头                               |
| `isShowError`  | boolean | `true`                                 | 请求失败时是否自动弹出错误提示           |
| `addTimestamp` | boolean | `true`                                 | 是否为 GET/DELETE 请求自动添加时间戳后缀 |

### http 实例方法

- `request(url, options)`
- `get(url, params, config)`
- `post(url, payload, config)`
- `put(url, payload, config)`
- `delete(url, params, config)`
- `patch(url, payload, config)`
- `upload(url, formData, config)`
- `download(url, params, fileName, config)`
- `retry(fn, retries, delay)`
- `parallel(tasks)`
