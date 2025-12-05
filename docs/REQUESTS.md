# Request 请求模块使用指南

位置: `src/service/request.js`

基于 Axios 封装的企业级 HTTP 请求库，提供了统一的错误处理、请求拦截、响应拦截、并发控制、文件处理等高级功能。

## 引入方式

```javascript
import request from '@/service/request'
```

---

## 一、基础使用

### 1. GET 请求

用于获取数据，参数会自动序列化到 URL 中。

```javascript
// 简单请求
const res = await request.get('/api/users')

// 带参数请求: /api/users?page=1&pageSize=10
const data = await request.get('/api/users', {
  page: 1,
  pageSize: 10,
})
```

### 2. POST 请求

用于提交数据，默认使用 `application/json`。

```javascript
const res = await request.post('/api/users', {
  username: 'john_doe',
  email: 'john@example.com',
})
```

### 3. PUT / DELETE 请求

```javascript
// PUT: 更新资源
await request.put('/api/users/123', {
  role: 'admin',
})

// DELETE: 删除资源
await request.delete('/api/users/123')
```

### 4. 表单提交

自动将 Content-Type 设置为 `application/x-www-form-urlencoded` 并序列化数据。

```javascript
// 发送 application/x-www-form-urlencoded 数据
await request.form('/api/login', {
  username: 'admin',
  password: 'password123',
})
```

### 5. 文件上传 (带进度)

支持 `FormData` 或普通对象（自动转换），并提供上传进度回调。

```javascript
const formData = new FormData()
formData.append('file', fileObject)

await request.upload('/api/upload', formData, {
  // 监听上传进度
  onProgress: ({ percent, loaded, total }) => {
    console.log(`上传进度: ${percent}%`)
  },
})
```

### 6. 文件下载

自动处理 Blob 响应，并触发浏览器下载行为。

```javascript
// 简单下载，文件名优先从响应头 Content-Disposition 获取
await request.download('/api/export/users')
```

### 7. 自定义文件名下载

如果后端未返回文件名，或需要覆盖文件名。

```javascript
await request.download(
  '/api/export/report',
  { year: 2024 }, // 查询参数
  '2024年度报表.xlsx' // 指定文件名
)
```

### 8. 自定义 Authorization

默认会自动携带 Token，如需覆盖或使用特殊 Token。

```javascript
await request.get(
  '/api/external/data',
  {},
  {
    headers: {
      Authorization: 'Bearer SPECIAL_TOKEN_123',
    },
  }
)
```

### 9. 禁用重复请求取消

默认情况下，相同的未完成请求会被自动取消（防抖）。如果业务需要允许重复请求（如聊天发送），可禁用此功能。

```javascript
await request.post(
  '/api/chat/send',
  { msg: 'hello' },
  {
    cancelDuplicate: false, // 允许重复发送
  }
)
```

### 10. 自定义配置

控制 Token 携带和错误提示行为。

```javascript
await request.get(
  '/api/public/config',
  {},
  {
    needToken: false, // 不携带 Token (适用于公开接口)
    showError: false, // 关闭默认的错误提示 (适用于需要手动处理错误的场景)
  }
)
```

### 11. 禁用时间戳后缀

默认情况下，`GET` 和 `DELETE` 请求会自动添加时间戳参数 `_` 以防止缓存。如果不需要此行为，可手动禁用。

```javascript
await request.get(
  '/api/static-data',
  {},
  {
    addTimestamp: false, // 禁用自动添加时间戳
  }
)
```

---

## 二、高级使用

### 1. 并发请求 (Parallel)

同时发起多个请求，并限制最大并发数（默认 5）。

```javascript
const userIds = [1, 2, 3, 4, 5, 6]

// 构建请求任务数组
const tasks = userIds.map((id) => ({
  method: 'GET',
  url: `/api/users/${id}`,
}))

// 执行并发请求，限制同时最多执行 3 个
const results = await request.parallel(tasks, 3)
console.log(results)
```

### 2. 串行请求 (Series)

按顺序执行请求，前一个完成后才执行下一个（适用于有依赖关系的请求）。

```javascript
const results = await request.series([
  // 任务 1
  { method: 'POST', url: '/api/step1', data: { init: true } },
  // 任务 2
  { method: 'POST', url: '/api/step2', data: { confirm: true } },
])
```

或者使用函数形式处理依赖：

```javascript
await request.series([
  async () => {
    const user = await request.get('/api/user/current')
    // 依赖上一步的结果
    return request.get(`/api/orders/${user.id}`)
  },
])
```

### 3. 轮询请求

结合 `RequestUtils.delay` 实现轮询。

```javascript
import request, { RequestUtils } from '@/service/request'

async function pollStatus(taskId) {
  while (true) {
    const res = await request.get(`/api/tasks/${taskId}`)

    if (res.status === 'COMPLETED') {
      return res.result
    }

    if (res.status === 'FAILED') {
      throw new Error('Task failed')
    }

    // 等待 2 秒后再次请求
    await RequestUtils.delay(2000)
  }
}
```

### 4. 重试机制

对于不稳定的接口，可以使用自动重试功能。

```javascript
// 如果请求失败，会自动重试 3 次，每次间隔 1000ms
const data = await request.retry(
  () => request.get('/api/unstable-service'),
  3, // 重试次数
  1000 // 延迟时间 (ms)
)
```

### 5. 请求队列

利用 `parallel` 的并发限制特性实现请求队列。

```javascript
// 假设有 100 个文件需要处理
const files = [...]

const uploadTasks = files.map(file => () => {
  return request.upload('/api/upload', { file })
})

// 创建一个最大并发数为 2 的上传队列
// 只有当前面的请求完成，后续请求才会开始
await request.parallel(uploadTasks, 2)
```

### 6. 批量上传文件（限制并发数）

同上，这是处理大批量文件上传的最佳实践。

```javascript
const fileList = [file1, file2, file3, ...]

// 封装上传任务
const tasks = fileList.map(file => {
  return () => request.upload('/api/files', { file }, {
    onProgress: (p) => console.log(`${file.name}: ${p.percent}%`)
  })
})

// 限制同时上传 3 个文件
await request.parallel(tasks, 3)
```

### 7. 全局请求前置处理

`request.js` 内部已内置了请求追踪和性能统计功能。

**请求追踪 (Request ID):**
可以通过传入 `requestId` 来标记特定请求，方便在日志中追踪。

```javascript
import { v4 as uuidv4 } from 'uuid'

request.get(
  '/api/trace-test',
  {},
  {
    requestId: uuidv4(), // 会添加到 Headers: X-Request-ID
  }
)
```

**响应时间统计:**
开发模式下，控制台会自动输出每个请求的耗时。

```
[Logger] 请求完成: GET /api/users [150ms]
```

如果需要在业务代码中获取耗时，可以在拦截器中扩展（需修改 `request.js`），或者简单地在调用处计算：

```javascript
const start = Date.now()
await request.get('/api/data')
const duration = Date.now() - start
console.log(`请求耗时: ${duration}ms`)
```

---

## 三、API 参考

### 配置对象 (Config)

| 属性                 | 类型     | 默认值  | 说明                                                  |
| -------------------- | -------- | ------- | ----------------------------------------------------- |
| `cancelDuplicate`    | boolean  | `true`  | 是否自动取消重复的进行中请求                          |
| `needToken`          | boolean  | `true`  | 是否自动在 Header 中携带 Token                        |
| `showError`          | boolean  | `true`  | 请求失败时是否自动弹出错误提示                        |
| `addTimestamp`       | boolean  | `true`  | 是否为 GET/DELETE 请求自动添加时间戳后缀              |
| `requestId`          | string   | -       | 自定义请求 ID，将放入 `X-Request-ID` 头               |
| `returnFullResponse` | boolean  | `false` | 是否返回完整的 Axios Response 对象，默认只返回 `data` |
| `onProgress`         | function | -       | 上传/下载进度回调                                     |

### 核心方法

- `request.get(url, params, config)`
- `request.post(url, data, config)`
- `request.put(url, data, config)`
- `request.delete(url, params, config)`
- `request.form(url, data, config)`
- `request.upload(url, data, config)`
- `request.download(url, params, fileName, config)`
- `request.parallel(tasks, concurrency)`
- `request.series(tasks)`
- `request.retry(fn, attempts, delay)`
