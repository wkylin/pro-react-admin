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

## 截图（示例）

在此处放置组件运行截图以供审阅：

![示例截图占位](./images/responsive-table-screenshot.png)

> 如果需要，我可以在 PR 中附上真实截图或录屏演示。

*** End of Document
