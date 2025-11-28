# ResponsiveTable 组件与 useTable Hook

## 概述

`ResponsiveTable` 是一个基于 Ant Design `Table` 的高复用表格组件，特点：

- 适应父容器尺寸，自动计算 `scroll.x` / `scroll.y`，在大小变化时自动调整。
- 底部分页独立渲染，固定在右下角，始终可见。
- 支持动态列设置（列显示/隐藏）。
- 提供 `useTable` Hook，封装分页、响应式 scroll、URL 同步等逻辑，便于复用。

该实现参考了 antd-pro 的 Table 使用模式，并保留了高可配置性。

## 文件位置

- Hook: `src/components/ResponsiveTable/useTable.js`
- 组件: `src/components/ResponsiveTable/index.jsx`

## 快速使用示例

```jsx
import ResponsiveTable from '@/components/ResponsiveTable'

const columns = [
  { title: '标题', dataIndex: 'title', width: 200 },
  { title: '内容', dataIndex: 'description', ellipsis: true },
  { title: '时间', dataIndex: 'time', width: 120 },
]

<ResponsiveTable
  columns={columns}
  dataSource={items}
  rowKey="id"
  initialPagination={{ current: 1, pageSize: 10 }}
  minBodyHeight={120}
  minWidth={800}
  pageSyncToUrl={true}
  onPaginationChange={(p) => console.log('page changed', p)}
/>
```

## Props (组件)

- `columns` (Array): antd Table 列定义
- `dataSource` (Array): 表格数据
- `rowKey` (String|Function): 主键
- `initialPagination` ({current, pageSize}): 初始分页
- `minBodyHeight` (Number): 表体最小高度
- `minWidth` (Number): 最小横向宽度
- `showColumnSettings` (Boolean): 是否显示列设置面板
- `pageSyncToUrl` (Boolean): 是否将页码写入 URL 查询参数（`page`、`pageSize`）
- `onPaginationChange` (Function): 分页变化回调，参数为 `{ current, pageSize }`
- `onChange` (Function): antd Table 的 onChange
- `mergeSearchToFetch` (Boolean): 是否把当前地址栏的 `location.search` 自动合并到内部的 fetch 调用中（默认 `false`）。
  - 场景：当外部链接或共享 URL 带有查询参数，需要在分页/重置/跳转等场景自动应用这些查询时启用。

### 首次合并后 URL 的处理（`clearUrlAfterInitialMerge` / `showUrlAppliedTag`）

- `clearUrlAfterInitialMerge` (Boolean, default: `true`):
  - 说明：当 `mergeSearchToFetch`（或 `mergeSearchToFetchOnce`）将 `location.search` 的键值合并到组件的首次请求参数后，组件会默认把这些已合并的键从浏览器地址栏中移除（使用 `history.replaceState`）。
  - 目的：避免地址栏中仍显示“已过期”或“已应用但不再同步”的查询参数，从而减少用户混淆。该操作为 silent replace（不会新增历史记录条目）。
  - 可选行为：如果你希望保留 URL（例如用于分享或书签），请把该 prop 设为 `false`，组件将不会修改地址栏。

- `showUrlAppliedTag` (Boolean, default: `false`):
  - 说明：启用后，在 `ResponsiveTable` 的 toolbar 区域会显示一个蓝色 `Tag`（文本：`已应用地址栏初始筛选`），用于明确告知用户“当前列表的初始筛选来自于 URL 参数”。
  - 注意：当前实现中该 Tag 的展示逻辑基于内部 `hasMergedInitialSearch()` 状态（即当首次合并发生后，hook 会把该状态置为 `true`）。该 Tag 用于提醒用户初始筛选已应用；如果你需要 Tag 在用户进行下一次交互（例如提交新的查询或分页）时自动隐藏，请在父组件中监听表单/分页变化并控制 UI，或提出改进请求以让组件在后续版本支持自动隐藏行为。

示例：在组件使用时同时启用两项（默认会清除 URL 并显示 Tag）

```jsx
<ResponsiveTable
  mergeSearchToFetch={true}
  mergeSearchToFetchOnce={true}
  clearUrlAfterInitialMerge={true} // 默认 true，可选设为 false
  showUrlAppliedTag={true} // 可视提示
  fetchUrl="/api/items"
  autoLoad={true}
  ...
/>
```

行为说明示例：

- 打开页面 `/#/notifications?type=2&source=share`。
- 组件首次 autoLoad 会把 `type=2, source=share` 合并并发送给后端（form 的 `initialValues` 会覆盖相同字段）。
- 合并并请求完成后：
  - 由于 `clearUrlAfterInitialMerge` 为 `true`，地址栏中 `type` 与 `source` 会被移除（URL 被 `replaceState` 更新）；不会新增历史条目。
  - 如果 `showUrlAppliedTag` 为 `true`，toolbar 上会显示 `已应用地址栏初始筛选` 的提示。

## 场景 A（merge once + 清除 URL + 显示 Tag）

配置组件：

```jsx
<ResponsiveTable
  mergeSearchToFetch={true}
  mergeSearchToFetchOnce={true}
  clearUrlAfterInitialMerge={true}
  showUrlAppliedTag={true}
  fetchUrl="/api/items"
  autoLoad={true}
  ...
/>
```

观察：

- 首次 autoLoad 请求应包含 `type=2`、`foo=bar`（除非被 `toolbar.search.initialValues` 覆盖）。
- 请求完成后地址栏应把被合并的键删除（使用 `replaceState`，不会新增历史条目）。
- `toolbar` 上会短显示 `已应用地址栏初始筛选`（一次性提示）。
- 之后再点击“查询”/改变分页/重置，后续请求不再把已合并的 URL 参数重新带上（因为组件已记录初始合并状态）。

## 场景 B（保留 URL）

如果你希望保留 URL，可以把 `clearUrlAfterInitialMerge={false}`。在这种模式下：

- 地址栏不会被自动清理，仍然显示原始查询参数（便于分享/书签）。
- 即便如此，如果使用 `mergeSearchToFetchOnce={true}`，组件仍然只会在首次合并时把 URL 参数并入请求，之后的交互（查询/分页/重置）不会再次合并这些初始参数。
- 建议同时开启 `showUrlAppliedTag={true}` 来向用户表明“当前的初始筛选来自 URL”。

示例：

```jsx
<ResponsiveTable
  mergeSearchToFetch={true}
  mergeSearchToFetchOnce={true}
  clearUrlAfterInitialMerge={false}
  showUrlAppliedTag={true}
  fetchUrl="/api/items"
  autoLoad={true}
  ...
/>
```

如果你希望地址栏始终是当前表格的单一真相（例如便于分享与书签），另一个可选方案是启用将表格状态持续同步回 URL（参见 `pageSyncToUrl` 及未来可能的 `syncStateToUrl` 功能），这样每次筛选/分页都会更新地址栏，使 URL 与视图保持一致。

- `requestMethod` (String): 当使用 `fetchUrl` 时，指定 HTTP 方法，默认为 `'get'`。支持 `'get'`, `'post'` 或 `requestLib` 支持的其他方法名。
  - 说明：默认情况下组件使用 GET 请求把参数作为查询参数发送；若你希望以 POST 方式把分页/筛选参数作为请求体发送，可设置 `requestMethod='post'` 并确保 `requestLib`（项目默认的 `request`）支持该方法。

## useTable Hook

Hook 会返回：

- `containerRef`：绑定到表格容器，用于测量尺寸
- `pagination`：当前分页状态 `{ current, pageSize }`
- `setPagination`：设置分页
- `tableScroll`：计算后的 `{ x, y }` 可直接传给 Table
- `pagedData`：根据分页切片后的数据

## 注意事项

- `ResponsiveTable` 依赖父容器具有确定的高度（或通过 flex 布局撑满可视区域），否则无法正确计算表体高度。
- `pageSyncToUrl` 会在 `history.replaceState` 中写入查询参数，不会触发页面跳转。

## APIRef 扩展（新增）

近期组件对外暴露了更多的 `apiRef`（或 `toolbarApi`）方法，用于方便在父组件控制表格行为时与路由/查询互操作：

- `getSearch()`
  - 返回当前地址栏的查询参数对象（等同于将 `location.search` 解析为键值对）。
  - 用途：在点击“在新标签打开”时，将当前搜索/筛选条件附加到详情页 URL，以便用户返回列表时能恢复筛选状态。

- `fetchPageWithSearch(page, pageSize, sort, extraParams)`
  - 在内部会把 `location.search`（如果存在）与 `extraParams` 合并后再调用组件的 `fetchPage`，从而把 URL 上的查询优先并入后端请求参数。
  - 用途：当列表的筛选条件出现在 URL（例如从外部链接或分享）时，可方便地把这些条件应用到分页/请求中。

示例：通过 `tableApiRef` 读取当前搜索并打开详情页（将搜索作为 query 附带）

```jsx
// 在父页（如 Notifications 列表）中：
const tableApiRef = useRef()

const openInNewTabWithSearch = (id) => {
  const searchObj = tableApiRef.current?.getSearch?.() || {}
  const qs = new URLSearchParams(searchObj).toString()
  redirectTo(`/notification/${id}${qs ? `?${qs}` : ''}`)
}
```

示例：使用 `fetchPageWithSearch` 在组件挂载时把 URL 查询合并入后端请求：

```jsx
useEffect(() => {
  // 首次加载时让组件把 location.search 合并到 fetch 请求里
  tableApiRef.current?.fetchPageWithSearch?.(1, 10, null, {})
}, [])
```

说明：为保证行为一致，建议在父组件中始终使用 React Router 的 `useLocation().search` 以及组件提供的 `getSearch()`，而不要直接使用 `window.location.search`（SPA 环境中可能不稳定）。

额外说明：

- 组件现在使用 React Router 的 `useLocation()`（而非直接读取 `window.location`），以确保在 SPA 路由切换时能稳定读取到 `search`。
- 如果你希望组件在分页或重置等内置交互中自动把 URL 查询并入请求，请将 `mergeSearchToFetch` 设为 `true`：这会使组件在分页、改变 pageSize、重置和搜索提交时把 `location.search` 的键值合并到请求参数里（表单参数优先覆盖 URL 相同字段）。

### `toolbar.search.initialValues` 与 `autoLoad` 的合并行为（新增）

- 现行为：当组件的 `autoLoad` 为 `true` 且使用 `fetchUrl` 时，组件会在首次自动加载时把两类初始值合并进请求参数：
  1. URL 上的查询（`location.search`），以及
  2. `toolbar.search.initialValues`（经过字段级 `transform` 与 `transformValues` 处理后的结果）。
- 合并优先级：`initialValues` 中的字段会覆盖 URL 上相同字段的值（即表单声明式默认值优先）。
- 场景示例：如果 `toolbar.search.initialValues = { title: '默认标题' }` 且当前地址栏为 `?title=来自链接`，首次 autoLoad 请求会以 `title: '默认标题'` 为准。

### `onToolbarReady` 回调（新增）

- 说明：组件新增可选 prop `onToolbarReady(toolbarApi)`。当 toolbar/form 完成挂载并准备就绪时，组件会调用该回调（仅调用一次），把内部暴露的 `toolbarApi` 传给父组件。`toolbarApi` 包含 `form`, `fetchPage`, `fetchPageWithSearch`, `pagination`, `selectedRowKeys` 等方法/属性。
- 用途：在需要更精确的就绪时机（例如在表单完全 mount 后才执行动态初始化、或基于运行时环境做一次额外查询）时，使用该回调比在父组件的 mount effect 里直接读取 `apiRef` 更可靠。

示例：在父组件中使用 `onToolbarReady` 初始化表单并发起查询

```jsx
<ResponsiveTable
  onToolbarReady={(api) => {
    // 表单就绪时安全地设置值
    api.form.setFieldsValue({ title: '来自 onToolbarReady 的初始标题' })
    // 如需立即触发一次查询：
    // api.fetchPage(1, api.pagination.pageSize, null, api.form.getFieldsValue())
  }}
  ...
/>
```

兼容性说明：组件仍然在渲染阶段同步把 `toolbarApi` 赋值到父组件传入的 `apiRef.current`，所以两种方式（`apiRef` 与 `onToolbarReady`）都可用；`onToolbarReady` 提供了更严格的“表单就绪”时机保证。

## 截图（示例）

在此处放置组件运行截图以供审阅：

![示例截图占位](./images/responsive-table-screenshot.png)

> 如果需要，我可以在 PR 中附上真实截图或录屏演示。

## 重要提示（关于 `apiRef` 的可用性）

- **关键行为**：`ResponsiveTable` 在渲染阶段会同步将内部的 `toolbarApi` 赋值到父组件传入的 `apiRef.current`（而不是仅在子组件的 effect 中异步赋值）。因此父组件可以在自己的 mount effect（例如 `useEffect(() => { ... }, [])`）中立即访问 `tableApiRef.current`，并调用 `form.setFieldsValue(...)`、`fetchPage(...)` 等方法来初始化表单或触发加载。

- **建议用法**：如果你需要在列表加载后由父组件设置 toolbar 表单的初始值（比如示例中的 `tableApiRef.current.form.setFieldsValue({ title: '...' })`），请在父组件的 `useEffect` 中执行该调用；无需额外的延时或轮询来等待 ref 被赋值。

- **为何重要**：早期实现可能在子组件的 effect 中才赋值 `apiRef`，这会导致父组件的 mount effect 读到 `null`，从而出现无法设置初始表单值的问题。当前实现保证同步暴露 `apiRef`，避免该类时序问题。

- **稳健性建议**：尽管已同步赋值，仍建议在调用前做空值检查（`tableApiRef.current?.form`），以在非标准使用路径下保持健壮性。

\*\*\* End of Document
