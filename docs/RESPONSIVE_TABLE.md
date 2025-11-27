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

## 截图（示例）

在此处放置组件运行截图以供审阅：

![示例截图占位](./images/responsive-table-screenshot.png)

> 如果需要，我可以在 PR 中附上真实截图或录屏演示。

\*\*\* End of Document
