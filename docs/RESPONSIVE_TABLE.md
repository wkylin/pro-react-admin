# ResponsiveTable 组件文档

## 1. 组件简介

`ResponsiveTable` 是一个基于 Ant Design `Table` 封装的高级表格组件，旨在解决中后台系统中常见的表格需求。它集成了响应式布局、服务端分页/排序/筛选、URL 参数同步、工具栏配置、权限控制等功能，极大地简化了复杂表格页面的开发。

**核心特性：**

- **响应式自适应**：自动计算表格高度和宽度，适应父容器大小，避免页面滚动条，支持固定表头和列。
- **数据获取封装**：内置 `useTable` Hook，支持 `fetchUrl` 模式（配置式）和 `fetchData` 模式（函数式），自动处理 loading、分页和排序。
- **URL 同步与回显**：支持将分页、排序、筛选条件同步到 URL，并支持从 URL 恢复初始状态（支持合并策略）。
- **配置化工具栏**：通过 `toolbar` 属性配置搜索表单和操作按钮，无需手动编写布局代码。
- **内置操作列**：支持预设的查看、编辑、删除操作，支持权限检查和二次确认。
- **序号与选择**：内置全局/页内序号列，支持多选/单选配置。

## 2. 快速开始

```tsx
import React from 'react';
import ResponsiveTable from '@/components/ResponsiveTable';

const UserList = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '姓名', dataIndex: 'name', width: 120 },
    { title: '邮箱', dataIndex: 'email' },
    { title: '角色', dataIndex: 'role', width: 100 },
  ];

  return (
    <div style={{ height: '100vh', padding: 20 }}>
      <ResponsiveTable
        columns={columns}
        rowKey="id"
        fetchUrl="/api/users" // 自动从该 URL 获取数据
        autoLoad={true}       // 挂载时自动加载
        pageSyncToUrl={true}  // 分页同步到 URL
        toolbar={{
          search: {
            fields: [
              { name: 'name', label: '姓名', type: 'input' },
              { name: 'role', label: '角色', type: 'select', options: [{ label: 'Admin', value: 'admin' }] }
            ]
          },
          actions: [
            <Button type="primary" key="add">新增用户</Button>
          ]
        }}
        actions={['view', 'edit', 'delete']} // 启用默认操作列
        onView={(record) => console.log('View', record)}
        onEdit={(record) => console.log('Edit', record)}
        onDelete={(record) => console.log('Delete', record)}
      />
    </div>
  );
};
```

## 3. API 参考 (Props)

### 3.1 基础配置

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `ColumnsType<T>` | `[]` | 表格列定义（同 Antd Table）。 |
| `dataSource` | `T[]` | `[]` | 数据源（当不使用自动获取时使用）。 |
| `rowKey` | `string \| (record) => string` | `'id'` | 数据主键。 |
| `minBodyHeight` | `number` | `120` | 表格内容区域的最小高度，用于计算 scroll.y。 |
| `minWidth` | `number` | `600` | 表格的最小宽度，用于计算 scroll.x。 |
| `scroll` | `object` | - | 覆盖自动计算的 scroll 属性。 |

### 3.2 数据获取与分页

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fetchUrl` | `string` | `null` | 数据接口地址。组件会自动发起请求。 |
| `requestMethod` | `'get' \| 'post'` | `'get'` | 请求方法。 |
| `fetchData` | `(page, pageSize, sort, extra) => Promise` | `null` | 自定义数据获取函数，需返回 `{ data: [], total: 0 }` 结构（字段名可配置）。 |
| `autoLoad` | `boolean` | `false` | 是否在组件挂载时自动触发首次加载。 |
| `initialPagination` | `{ current, pageSize }` | `{ current: 1, pageSize: 10 }` | 初始分页配置。 |
| `pageSyncToUrl` | `boolean` | `false` | 是否将 `page` 和 `pageSize` 同步到 URL 查询参数。 |
| `requestParamMap` | `object` | `{ pageField: 'page', pageSizeField: 'pageSize', ... }` | 请求参数字段映射。 |
| `responseFieldMap` | `object` | `{ listField: 'data', totalField: 'total' }` | 响应数据字段映射。 |
| `serverSort` | `boolean` | `false` | 是否启用服务端排序。启用后点击表头会触发重新请求。 |
| `defaultSort` | `{ field, order }` | `null` | 默认排序状态。 |

### 3.3 URL 参数合并 (高级)

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mergeSearchToFetch` | `boolean` | `false` | 是否将 URL 中的查询参数合并到 `fetchUrl` 或 `fetchData` 的请求参数中。 |
| `mergeSearchToFetchOnce` | `boolean` | `false` | 是否仅在首次加载时合并 URL 参数。 |
| `clearUrlAfterInitialMerge` | `boolean` | `true` | 首次合并后是否清除 URL 中的查询参数（避免参数滞留）。 |
| `showUrlAppliedTag` | `boolean` | `false` | 是否在工具栏显示“已应用地址栏初始筛选”的提示标签。 |

### 3.4 工具栏 (Toolbar)

`toolbar` 属性接受一个对象，配置如下：

```typescript
{
  // 搜索表单配置
  search?: {
    initialValues?: Record<string, any>; // 表单初始值
    fields: Array<{
      name: string;
      label: string;
      type?: 'input' | 'select' | 'date' | ...; // 支持多种控件类型
      options?: Array<{ label, value }>; // select/radio 等的选项
      transform?: (value, allValues) => any; // 提交前转换值
      props?: any; // 传递给 Antd FormItem/Input 的其他属性
    }>;
    transformValues?: (values) => any; // 提交前转换整个表单值
  };
  // 左侧操作区配置
  actions?: ReactNode[]; // 例如 [<Button>新增</Button>, <Button>导出</Button>]
  showLeft?: boolean; // 强制显示/隐藏左侧
  showRight?: boolean; // 强制显示/隐藏右侧（搜索区）
}
```

### 3.5 操作列 (Actions)

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `actions` | `Array<'view' \| 'edit' \| 'delete' \| ActionConfig>` | `['view', 'edit', 'delete']` | 配置操作列显示的按钮。支持预设字符串或自定义对象。 |
| `actionsFixed` | `false \| 'left' \| 'right'` | `'right'` | 操作列是否固定。 |
| `actionsWidth` | `number` | `180` | 操作列宽度。 |
| `permissionChecker` | `(actionKey, record) => boolean` | `() => true` | 权限检查函数，返回 false 则隐藏对应按钮。 |
| `onView` | `(record) => void` | - | 点击“查看”的回调。 |
| `onEdit` | `(record) => void` | - | 点击“编辑”的回调。 |
| `onDelete` | `(record) => void` | - | 点击“删除”的回调（已内置 Popconfirm）。 |

**ActionConfig 定义**:
```typescript
type ActionConfig<T> = {
  key: string;
  label?: ReactNode;
  onClick?: (record: T) => void;
  confirm?: string; // 配置此项则显示 Popconfirm
  icon?: ReactNode;
  type?: 'link' | 'text' | 'primary' | 'default' | 'dashed';
  danger?: boolean;
}
```

### 3.6 序号与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `showIndex` | `boolean` | `false` | 是否显示序号列。 |
| `indexMode` | `'global' \| 'page'` | `'global'` | `global`: 全局连续序号；`page`: 每页从 1 开始。 |
| `indexFixed` | `false \| 'left' \| 'right'` | `'left'` | 序号列是否固定。 |
| `indexWidth` | `number` | `80` | 序号列宽度。 |
| `rowSelection` | `'multiple' \| 'single' \| null` | `null` | 行选择模式。 |
| `rowSelectable` | `(record) => boolean` | `null` | 判断某行是否可选。 |

### 3.7 其他

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `apiRef` | `MutableRefObject` | `null` | 传入 ref 以获取组件实例 API。 |
| `onToolbarReady` | `(api) => void` | `null` | 工具栏就绪时的回调，返回 api 对象。 |
| `showColumnSettings` | `boolean` | `true` | 是否显示列设置按钮。 |

## 4. 组件实例 API (apiRef)

通过 `apiRef` 或 `onToolbarReady` 可以获取以下 API，用于父组件控制表格：

- **`fetchPage(page?, pageSize?, sort?, extraParams?)`**: 主动触发数据加载。
- **`fetchPageWithSearch(...)`**: 触发加载，并自动合并当前 URL 中的查询参数。
- **`getSearch()`**: 获取当前 URL 查询参数对象。
- **`form`**: 获取搜索表单的 Antd Form 实例（可调用 `setFieldsValue`, `validateFields` 等）。
- **`pagination`**: 获取当前分页信息。
- **`selectedRowKeys`**: 获取当前选中的行 Key 数组。

## 5. useTable Hook

`ResponsiveTable` 内部使用的核心 Hook，也可单独使用。

```typescript
const {
  pagedData,       // 当前页数据
  pagination,      // 分页状态
  setPagination,   // 设置分页
  tableScroll,     // 计算出的 scroll { x, y }
  fetchPage,       // 数据加载函数
  handleDelete,    // 删除处理（自动回退页码）
  selectedRowKeys, // 选中行
  // ...
} = useTable({
  fetchUrl: '/api/data',
  autoLoad: true,
  // ... 其他配置同组件 Props
});
```

## 6. 最佳实践

### 6.1 外部触发查询

如果需要在父组件（例如顶部的全局过滤器）触发表格查询，可以使用 `apiRef`：

```tsx
const tableRef = useRef<any>();

// 在某个事件中
const handleGlobalFilterChange = (val) => {
  // 设置表单值并触发查询
  tableRef.current?.form?.setFieldsValue({ type: val });
  tableRef.current?.fetchPage(1); // 回到第一页
};

<ResponsiveTable apiRef={tableRef} ... />
```

### 6.2 详情页返回保持状态

利用 `pageSyncToUrl` 和 `mergeSearchToFetch` 可以轻松实现“列表 -> 详情 -> 返回列表”时状态保持：

1.  列表页开启 `pageSyncToUrl={true}` 和 `mergeSearchToFetch={true}`。
2.  用户筛选并翻页后，URL 会包含 `?page=2&status=active`。
3.  跳转详情页再返回时，组件会自动读取 URL 参数并恢复之前的视图状态。

### 6.3 自定义操作列

如果预设的 `view/edit/delete` 不满足需求，可以传入对象配置：

```tsx
actions={[
  'view', // 保留默认查看
  {
    key: 'audit',
    label: '审核',
    icon: <AuditOutlined />,
    onClick: (record) => handleAudit(record),
    // 仅状态为 pending 时显示
    permissionChecker: (key, record) => record.status === 'pending' 
  },
  {
    key: 'danger_op',
    label: '高危操作',
    danger: true,
    confirm: '确定要执行此操作吗？',
    onClick: (record) => handleDanger(record)
  }
]}
```
