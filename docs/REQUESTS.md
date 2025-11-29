**请求模块 使用说明**

位置: `src/service/request.js`

简介
- 本文档说明如何使用仓库中增强过的 `request` 模块。该模块基于 `axios`，提供：可取消请求、并发/串行执行、重试机制、上传/下载进度回调、每次请求可开关错误弹窗及全局配置接口。

导入

```js
import request from '@/service/request'
```

1) 全局配置

- 设置 baseURL:

```js
request.setBaseURL('https://api.example.com')
```

- 设置全局默认 headers:

```js
request.setDefaultHeaders({ 'X-Trace-Id': 'abc123' })
```

2) 基本请求（返回 Promise，同时附带 `.cancel()`）

```js
// GET
const p = request.get('/api/users', { page: 1 })
p.then(res => console.log(res)).catch(err => console.error(err))

// 取消请求
p.cancel()

// POST
request.post('/api/user', { name: 'alice' })
  .then(res => console.log(res))
  .catch(err => console.error(err))

// 禁用该次请求的错误弹窗
request.get('/api/maybe-missing', {}, { showError: false })
```

注意：当后端采用 `{ code, data, message }` 约定时，模块会在 `code === 0` 视作成功并返回后端对象；否则会按 `message` 展示错误（可用 `showError:false` 关闭）。如果后端返回不是该结构，则直接返回原始数据。

3) 上传与下载（支持进度回调）

```js
// 上传
const fd = new FormData()
fd.append('file', fileInput.files[0])
request.upload('/api/upload', fd, {
  onUploadProgress: (e) => {
    const pct = Math.round((e.loaded / e.total) * 100)
    console.log('上传进度', pct)
  },
}).then(res => console.log('上传完成', res))

// 下载（会触发浏览器下载）
request.download('/api/export', { q: 'all' }, 'report.xlsx', {
  onDownloadProgress: (e) => {
    const pct = Math.round((e.loaded / e.total) * 100)
    console.log('下载进度', pct)
  }
}).then(() => console.log('下载结束'))
```

4) 并行 / 并发控制

```js
// 简单并行：传入请求描述数组，返回 Promise 数组结果
// 描述可以是：函数、axios config 对象，或 [method, url, body, config]
const results = await request.parallel([
  ['get', '/api/a'],
  ['post', '/api/b', { x: 1 }],
  () => request.get('/api/c')
], /* concurrency */ 3)

console.log(results)
```

5) 串行

```js
// 依次执行
const seriesResults = await request.series([
  () => request.get('/api/step1'),
  ['post', '/api/step2', { id: 123 }],
])
```

6) 可取消的自定义请求

```js
const promise = request.request({ method: 'get', url: '/api/long', params: { t: 1 } })
// 取消
promise.cancel()
```

7) 重试（对任意返回 Promise 的函数）

```js
await request.retry(() => request.get('/api/maybe-flaky'), 3, 1000)
```

8) 访问底层 axios（高级用法）

```js
const ax = request.axios()
ax.get('/raw/endpoint').then(r => console.log(r))
```

9) 常见使用场景示例
- 场景 A：页面 mount 时保护性加载权限数据，避免重复请求

```js
// 使用 permissionService（单例）来避免多个组件重复向后端请求权限
import permissionService from '@/service/permissionService'
// 在 App 初始化处调用一次
permissionService.getPermissions()
```

- 场景 B：文件导出，提供进度与取消

```js
const downloadPromise = request.download('/api/export', {}, 'report.xlsx', {
  onDownloadProgress: (e) => console.log('progress', e.loaded)
})
// 在需要时取消
// downloadPromise.cancel()
```

- 场景 C：批量请求但限制并发（防止后端压力）

```js
const tasks = urls.map((u) => ['get', u])
const results = await request.parallel(tasks, 4)
```

备注
- 默认超时时间与 baseURL 可通过 `request.setBaseURL` 与 `request.setDefaultHeaders` 调整。
- 单次请求关闭弹窗：传 `config.showError = false`。
- 所有请求返回的 Promise 都包含 `.cancel()`（内部使用 AbortController）。

如需我把示例中的某些场景自动替换到代码中（例如把多个直接调用 `permissionAPI.getUserPermissions()` 的位置替换为 `permissionService.getPermissions()`），我可以继续扫描并提交补丁。
