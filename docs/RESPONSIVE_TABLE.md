# ResponsiveTable

公开组件源码在 packages/wui-react/src/ResponsiveTable，入口同时导出 ResponsiveTable 与 useTable。它以 Ant Design Table 为基础，管理容器滚动尺寸、分页、选择、操作列、工具栏与数据请求。完整动态 props 见同目录 Storybook ArgTypes。

```tsx
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'

const rows = [{ id: '1', name: 'Example' }]
<ResponsiveTable
  rowKey="id"
  dataSource={rows}
  columns={[{ title: '名称', dataIndex: 'name' }]}
  actions={[]}
/>
```

## 远程数据

fetchUrl 使用可注入 requestLib；默认 httpRequest 是组件包自己的轻量客户端，不共享应用 token/拦截器。也可提供 fetchData(page, pageSize, sort, extraParams)，在业务层完成授权、响应校验和领域转换。requestParamMap 默认 page/pageSize/sort/order，responseFieldMap 默认 data/total。autoLoad 默认 false，应按实际加载流程显式启用。

useTable 默认 initialPagination 为 1/10、minBodyHeight 120、minWidth 600。fetchPage 可传第 4 个参数过滤条件；远程参数映射与响应映射需与服务一致。删除操作 handleDelete 在页面空时辅助回退。

## URL 与选择

pageSyncToUrl 默认 false。mergeSearchToFetch/mergeSearchToFetchOnce 与 clearUrlAfterInitialMerge 控制初始查询参数合并；不要把敏感过滤条件写入地址。selectionMode 支持 multiple/single/none，rowSelectable 可用函数或字段控制可选行。

表格 props 和部分内部排序/请求类型仍保留 any；strict 编译通过不意味着所有业务扩展点都有精确类型。请求取消、缓存和权限应由业务 requestLib 或 fetchData 明确定义。容器需要可计算高度，展示异常时先检查父级尺寸和 scroll 参数。
