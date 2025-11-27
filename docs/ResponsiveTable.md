# ResponsiveTable 组件 使用说明

## 概览
`ResponsiveTable` 是基于 Ant Design `Table` 封装的高级表格组件，支持：

- 自适应容器、自动计算 `scroll.x` / `scroll.y`。
- 底部独立分页（支持服务端分页、排序）。
- 列显示设置（列显隐开关）。
- 序号列（支持在列中直接 `index: true`，或使用 `showIndex`）。
- 可配置操作列（actions），支持权限控制和确认框。
- 行选择：`rowSelection` 支持 `null | 'multiple' | 'single'`。
- 服务端交互：通过 `fetchData`（函数）或 `fetchUrl`（URL + requestLib）获取数据。
  - 支持 `requestParamMap` 与 `responseFieldMap` 进行字段映射。
  - `fetchPage(page,pageSize,sort,extraParams)` 的 `extraParams` 用于传递查询表单数据。
- 可选虚拟化（`virtualized`，默认 false）。
- 顶部 `toolbar`（左侧操作按钮，右侧查询表单）支持自定义字段类型、校验、默认值和高级筛选。

---

## toolbar 配置示例

`toolbar` 是一个对象，常用结构示例：

```js
toolbar: {
  showLeft: true,   // 可选，显式控制是否显示左侧
  showRight: true,  // 可选，显式控制是否显示右侧
  actions: [
    { key: 'add', label: '新增', type: 'primary', onClick: ({ fetchPage }) => { /* 打开弹窗后刷新 */ } },
    { key: 'export', label: '导出', onClick: ({ selectedRowKeys }) => { /* 导出逻辑 */ } }
  ],
  search: {
    fields: [
      { name: 'title', label: '标题', placeholder: '请输入标题' },
      { name: 'status', label: '状态', type: 'select', options: [{label:'全部', value:''}, {label:'启用', value:1}] },
      { name: 'createdAt', label: '创建时间', type: 'dateRange' },
      { name: 'minId', label: '最小 ID', type: 'number' }
    ],
    // 字段级 transform 可在 field 定义中提供 transform: (value, allValues) => converted
    transformValues: (vals) => {
      // 把 dateRange 转为 start/end
      const out = { ...vals }
      if (Array.isArray(vals.createdAt)) {
        const [s, e] = vals.createdAt
        out.start = s ? (typeof s.toISOString === 'function' ? s.toISOString() : s) : undefined
        out.end = e ? (typeof e.toISOString === 'function' ? e.toISOString() : e) : undefined
        delete out.createdAt
      }
      if (out.minId === '' || out.minId == null) delete out.minId
      return out
    },
    // 可选：在用户点击查询时替换默认行为
    onSearch: async (payload, { fetchPage }) => {
      // 自定义搜索逻辑：例如在本地过滤或调整参数
      await fetchPage(1, 10, null, payload)
    },
    initialValues: {},
    advancedThreshold: 3,
    buttons: { searchText: '查询', resetText: '重置' }
  }
}

字段类型支持（内置渲染）：
- `number`（`InputNumber`）
- `cascader`（级联）
- `treeSelect`（树形选择）

---

## 新增：`scroll` 属性（可选）

`ResponsiveTable` 现在支持显式传入 `scroll` 属性，用于覆盖或合并组件计算的滚动值。Ant Design 的 `Table` 接受 `scroll` 对象（例如 `{ x: 1200, y: 400 }`），其中 `x` 可以是数字（像素）、字符串（如 `'100%'` 或 `'max-content'`），或 `true`（依赖 antd 版本）。

合并优先级（从低到高）：

- 组件内部计算值（基于容器宽度与 `minWidth`）
- `tableProps.scroll`（如果通过 `tableProps` 显式传入）
- 显式 `scroll` prop（直接传给 `ResponsiveTable`，优先级最高）

示例：

1) 使用组件自动计算（默认行为）

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
/>
```

2) 使用 `tableProps.scroll` 覆盖计算值（中等优先级）

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
  tableProps={{ scroll: { x: 1400 } }}
/>
```

3) 使用 `scroll` prop（最高优先级，推荐用于需要精确控制时）

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
  scroll={{ x: 'max-content', y: 520 }}
/>
```

注意事项：

- 固定列（`fixed`）的正确显示依赖于表格具有可滚动的容器（组件已将外层容器设置为 `overflow: auto`）。如果固定列仍然异常，请为固定列指定 `width`。
- 虚拟化（`virtual`）模式可能与列宽和固定列行为产生交互，必要时可通过 `tableProps={{ virtual: false }}` 关闭虚拟化以获得更稳定的布局。

---

### 部分传入 `scroll`（只传 `x` 或只传 `y`）时的行为说明

如果在使用 `ResponsiveTable` 时只传入 `scroll` 的一部分字段（例如只传入 `x` 而不传 `y`），组件会对未提供的字段回退到内部计算或 `tableProps.scroll` 的值。

合并行为回顾（字段级合并）：

- 首先使用组件内部计算值 `tableScroll`（由 `useTable` 的 ResizeObserver 根据容器高度、表头与分页区域计算得到的 `{ x, y }`）。
- 如果 `tableProps.scroll` 中包含对应字段，则覆盖内部计算值。
- 最后，如果 `ResponsiveTable` 的显式 `scroll` prop 中包含该字段，则以显式值为准。

举例：

- 只传 `x`，保留自动计算 `y`：

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
  scroll={{ x: 'max-content' }}
/>
```

最终传递给 AntD `Table` 的 `scroll` 类似 `{ x: 'max-content', y: <自动计算值> }`。

- 通过 `tableProps.scroll` 提供 `y`，同时在显式 `scroll` 中只提供 `x`：

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
  tableProps={{ scroll: { y: 600 } }}
  scroll={{ x: 1400 }}
/>
```

最终 `y` 来自 `tableProps.scroll`（600），`x` 来自显式 `scroll`（1400）。

注意与最佳实践：

- 内部计算的 `y` 为像素数（number），若你的应用对高度非常敏感（例如需要精确对齐或与其它布局组件联动），建议显式传入 `y`。 
- 在启用 `virtual`（虚拟渲染）时，建议显式设置 `y` 以避免虚拟化渲染导致的高度计算不一致。 
- 对于固定列（`fixed`），请同时确保：1) 固定列有 `width`；2) `scroll.x` 能触发横向滚动（可通过显式传入 `scroll.x`、增加 `minWidth` 或为列指定宽度来实现）。

````
- `custom`（需提供 `render()` 自定义渲染）

每个字段还支持：
- `props`：传递给控件的额外 props（例如 `style`、`placeholder`）
- `rules`：AntD Form 的校验规则
- `transform`：字段级别的转换函数，优先于 `transformValues`。

---

## 常见使用模式

- 使用 `fetchUrl + responseFieldMap` 直接与后端对接。
- 使用 `toolbar.query.transformValues` 将复杂表单值（如日期范围）映射为后端期望的字段名（例如 `start`/`end`）。
- 对于大数据量表格，开启 `virtualized` 提升渲染性能；若需要固定列（`fixed`）且发现兼容性问题，请关闭虚拟化：`tableProps={{ virtual: false }}`。
- 当你需要完全自定义查询行为（例如先做 client-side 预处理再请求后端），在 `query` 中提供 `onSearch`。

---

如果你希望，我可以再把一个小示例页面 (例如 `examples/responsive-table-demo.md`) 加到仓库里，包含完整的 `ResponsiveTable` 使用代码片段和后端 mock 数据示例。
 
---

## 新增：`indexWidth` / `actionsWidth` 与 `virtualized` 默认

为了更方便地控制固定列宽度，`ResponsiveTable` 新增了两个可选 props：

- `indexWidth`：序号列默认宽度（当未在列定义中显式指定 `width` 时使用），默认 `80`。
- `actionsWidth`：操作列默认宽度（当未在列定义中显式指定 `width` 时使用），默认 `180`。

示例：

```jsx
<ResponsiveTable
  columns={columns}
  dataSource={data}
  indexWidth={60}
  actionsWidth={220}
/>
```

另外，组件默认将 `virtualized` 设置为 `false`，如果你需要虚拟化渲染以提高大量数据的性能，请显式开启：`virtualized={true}` 或通过 `tableProps={{ virtual: true }}`。