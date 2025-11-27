import React from 'react'
import {
  Table,
  Pagination,
  Popover,
  Checkbox,
  Button,
  Popconfirm,
  Space,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Cascader,
  TreeSelect,
  Switch,
  Drawer,
  theme,
} from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTable from './useTable'

/**
 * ResponsiveTable
 *
 * 高级可配置表格组件（基于 antd Table 封装），功能包括：
 * - 自适应父容器尺寸，自动计算 `scroll.x` / `scroll.y`（基于 ResizeObserver）
 * - 底部独立分页（可与服务端分页配合使用）
 * - 列显示配置（可选择隐藏/显示列）
 * - 可配置的序号列（支持 `index` 列定义或 `showIndex`），可默认固定到左侧
 * - 操作列（actions）支持可配置按钮、权限控制、确认框、并默认固定到右侧
 * - 支持行选择（`rowSelection`：`null | 'multiple' | 'single'`），并支持基于记录的可选判断 `rowSelectable`
 * - 支持服务端数据拉取：`fetchData`（自定义函数）或 `fetchUrl`（内部使用 `requestLib.get`）
 *   - 支持请求/响应字段映射：`requestParamMap` / `responseFieldMap`
 *   - `fetchPage(page,pageSize,sort,extraParams)` 会将 `extraParams` 合并到请求参数中，便于传递查询表单数据
 * - 支持 server sort（`serverSort`）及默认排序 `defaultSort`
 * - 支持虚拟列表（`virtualized`），默认启用；可通过 `tableProps.virtual` 覆写
 * - 顶部 `toolbar`：左右两侧布局，左侧为固定操作按钮（新增/导出等），右侧为查询表单（支持校验、默认值、高级筛选、查询/重置按钮）
 *
 * Props（常用）：
 * - `columns`：antd Table 的列定义，支持在某列加 `index: true` 或 `type: 'index'` 来定义序号列
 * - `dataSource`：本地数据（非服务端模式）
 * - `fetchUrl` / `fetchData`：服务端拉取数据的配置
 * - `requestParamMap`：请求参数映射，例如 `{ pageField: 'page', pageSizeField: 'pageSize' }`
 * - `responseFieldMap`：响应字段映射，例如 `{ listField: 'data.items', totalField: 'data.total' }`
 * - `toolbar`：工具栏配置示例见源码
 * - `indexFixed` / `actionsFixed`：默认的 `fixed` 值（`'left' | 'right' | false`）
 * - `virtualized`：是否启用虚拟列表（默认 `true`）
 */
const ResponsiveTable = ({
  columns = [],
  dataSource = [],
  rowKey = 'id',
  initialPagination = { current: 1, pageSize: 10 },
  minBodyHeight = 120,
  minWidth = 600,
  showColumnSettings = true,
  pageSyncToUrl = false,
  onPaginationChange = () => {},
  onChange = () => {},
  // actions: array of either strings ('view'|'edit'|'delete') or objects { key, label, onClick }
  actions = ['view', 'edit', 'delete'],
  // permissionChecker(actionKey, record) => boolean
  permissionChecker = () => true,
  // callbacks
  onView,
  onEdit,
  onDelete,
  // optional reload function passed to hook to trigger server reload after deletes
  reloadPage,
  // show serial index column (默认不显示，建议在 columns 中用 { index: true } 指定)
  showIndex = false,
  // indexMode: 'global' | 'page' | 'custom'
  indexMode = 'global',
  // 默认固定位置（可配置为 false | 'left' | 'right'），定义序号列和操作列的默认 fixed 行为
  indexFixed = 'left',
  actionsFixed = 'right',
  // customIndexRender: (record, index, pagination) => ReactNode
  customIndexRender = null,
  // rowSelection: null | 'multiple' | 'single' - 控制是否显示选择列及模式
  // 当为 null 时不显示选择列；'multiple' 显示多选框；'single' 显示单选框
  rowSelection = null,
  // rowSelectable: function(record) or string key
  rowSelectable = null,
  // server/data fetch options
  fetchData = null,
  autoLoad = false,
  // fetchUrl and mapping
  fetchUrl = null,
  requestParamMap = { pageField: 'page', pageSizeField: 'pageSize', sortField: 'sort', orderField: 'order' },
  responseFieldMap = { listField: 'data', totalField: 'total' },
  serverSort = false,
  defaultSort = null,
  // 是否启用虚拟列表（提高大量数据渲染性能）。默认关闭，可通过 `tableProps.virtual` 覆写。
  virtualized = false,
  // 可配置序号列与操作列的默认宽度（若列定义中已包含 width 则以列定义为准）
  indexWidth = 80,
  actionsWidth = 180,
  // toolbar 配置：{ leftActions: [{ key,label,onClick,... }], query: { fields: [], initialValues: {}, advancedThreshold: 3, buttons: { searchText, resetText } } }
  toolbar = null,
  // explicit scroll override for Table (object same shape as antd `scroll` prop)
  scroll: scrollProp = undefined,
  // rest props passthrough to antd Table
  ...tableProps
}) => {
  const {
    containerRef,
    pagination,
    setPagination,
    tableScroll,
    pagedData,
    handleDelete,
    selectedRowKeys,
    handleSelectionChange,
    isRowSelectable,
    calcIndex,
    internalData,
    total,
    fetchPage,
    sortState,
    setSortState,
  } = useTable({
    dataSource,
    initialPagination,
    minBodyHeight,
    minWidth,
    pageSyncToUrl,
    onPaginationChange,
    reloadPage,
    fetchData,
    autoLoad,
    serverSort,
    defaultSort,
    selectionMode: rowSelection,
    rowSelectable,
    fetchUrl,
    requestParamMap,
    responseFieldMap,
  })

  // toolbar 表单（右侧查询）
  const [form] = Form.useForm()
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const [drawerVisible, setDrawerVisible] = React.useState(false)
  const [popoverVisible, setPopoverVisible] = React.useState(false)

  const { token } = theme.useToken()

  const toolbarConfig = toolbar || {}
  // 强制使用新命名：`toolbar.actions`（左侧按钮）和 `toolbar.search`（右侧查询）
  const leftActions = Array.isArray(toolbarConfig.actions) ? toolbarConfig.actions : []
  const queryConfig = toolbarConfig.search && typeof toolbarConfig.search === 'object' ? toolbarConfig.search : null

  // 控制左右 toolbar 是否显示：如果 toolbar.showLeft/showRight 显式设置则以其为准，
  // 否则根据内容自动决定（有 leftActions 则显示左侧，有 queryConfig 则显示右侧）
  const showToolbarLeft =
    typeof toolbarConfig.showLeft !== 'undefined' ? !!toolbarConfig.showLeft : leftActions.length > 0
  const showToolbarRight = typeof toolbarConfig.showRight !== 'undefined' ? !!toolbarConfig.showRight : !!queryConfig

  // 提供给 action handler 的受控 API（浅拷贝，避免 action 直接修改内部 state）
  const toolbarApi = React.useMemo(
    () => ({
      selectedRowKeys: Array.isArray(selectedRowKeys) ? [...selectedRowKeys] : [],
      fetchPage: async (...args) => {
        try {
          return await fetchPage(...args)
        } catch (err) {
          console.error('toolbar fetchPage error', err)
          throw err
        }
      },
      pagination: { ...pagination },
      form,
    }),
    [selectedRowKeys, fetchPage, pagination, form]
  )

  // 初始化表单默认值
  React.useEffect(() => {
    if (queryConfig && queryConfig.initialValues) {
      form.setFieldsValue(queryConfig.initialValues)
    }
  }, [queryConfig && queryConfig.initialValues])

  const handleSearch = async () => {
    try {
      const values = await form.validateFields()
      // 支持字段级 transform 或全局 transformValues
      let payload = { ...values }
      if (queryConfig && Array.isArray(queryConfig.fields)) {
        for (const f of queryConfig.fields) {
          if (f && typeof f.transform === 'function') {
            payload[f.name] = f.transform(values[f.name], values)
          }
        }
      }
      if (queryConfig && typeof queryConfig.transformValues === 'function') {
        payload = queryConfig.transformValues(payload) || payload
      }
      // reset to first page when searching
      setPagination((p) => ({ ...p, current: 1 }))
      // 优先使用自定义 onSearch 回调
      if (queryConfig && typeof queryConfig.onSearch === 'function') {
        await queryConfig.onSearch(payload, { fetchPage, form, setPagination, pagination })
      } else {
        await fetchPage(1, pagination.pageSize, sortState, payload)
      }
    } catch (e) {
      // validation error will be shown by Form
    }
  }

  const handleReset = async () => {
    form.resetFields()
    setPagination((p) => ({ ...p, current: 1 }))
    if (queryConfig && typeof queryConfig.onReset === 'function') {
      await queryConfig.onReset({ fetchPage, form, setPagination, pagination })
    } else {
      // fetch without extra params
      await fetchPage(1, pagination.pageSize, sortState, {})
    }
  }

  const [visibleKeys, setVisibleKeys] = React.useState(() => columns.map((c) => c.dataIndex || c.key).filter(Boolean))

  React.useEffect(() => setVisibleKeys(columns.map((c) => c.dataIndex || c.key).filter(Boolean)), [columns])

  const currentColumns = React.useMemo(() => {
    const keys = new Set(visibleKeys)
    return columns.filter((c) => keys.has(c.dataIndex || c.key))
  }, [columns, visibleKeys])

  // 如果 columns 中包含 index 标识字段，则使用该列作为序号列（并从 currentColumns 中移除）
  const indexColumnFromColumns = React.useMemo(() => {
    const idx = columns.find((c) => c && (c.index === true || c.type === 'index'))
    if (!idx) return null
    // create a normalized index column object
    const col = {
      ...idx,
      key: idx.key || '__index',
      // 保证当列自身未指定 width 时使用组件传入的 indexWidth
      width: typeof idx.width !== 'undefined' ? idx.width : indexWidth,
      // 默认居中对齐，除非列自身提供 align
      align: typeof idx.align !== 'undefined' ? idx.align : 'center',
      // 优先使用列自身的 fixed 定义，否则使用组件传入的 indexFixed
      fixed: typeof idx.fixed !== 'undefined' ? idx.fixed : indexFixed,
      render: idx.render || ((text, record, rowIndex) => (indexMode === 'page' ? rowIndex + 1 : calcIndex(rowIndex))),
    }
    return col
  }, [columns, indexMode, calcIndex])

  // 如果使用了 indexColumnFromColumns，需要从 currentColumns 中移除它，避免重复
  const effectiveColumns = React.useMemo(() => {
    if (!indexColumnFromColumns) return currentColumns
    const key = indexColumnFromColumns.dataIndex || indexColumnFromColumns.key
    return currentColumns.filter((c) => (c.dataIndex || c.key) !== key)
  }, [currentColumns, indexColumnFromColumns])

  const columnOptions = columns
    .map((c) => ({ label: c.title || c.dataIndex || c.key, value: c.dataIndex || c.key }))
    .filter((o) => o.value)

  const popContent = (
    <div style={{ maxWidth: 320 }}>
      <Checkbox.Group
        value={visibleKeys}
        onChange={(v) => setVisibleKeys(v)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {columnOptions.map((opt) => (
          <Checkbox key={opt.value} value={opt.value} style={{ margin: '4px 0' }}>
            {opt.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <div style={{ marginTop: 8, textAlign: 'right' }}>
        <Button
          size="small"
          onClick={() => setVisibleKeys(columns.map((c) => c.dataIndex || c.key))}
          style={{ marginRight: 8 }}
        >
          全部
        </Button>
        <Button size="small" onClick={() => setVisibleKeys(columns.slice(0, 3).map((c) => c.dataIndex || c.key))}>
          恢复默认
        </Button>
      </div>
    </div>
  )

  // actions normalization: support strings or full config
  const defaultMap = {
    view: { key: 'view', label: '查看', onClick: onView },
    edit: { key: 'edit', label: '编辑', onClick: onEdit },
    delete: { key: 'delete', label: '删除', onClick: onDelete },
  }

  const actionsConfig = (actions || []).map((a) => {
    if (typeof a === 'string') return defaultMap[a] || { key: a, label: a, onClick: undefined }
    return { ...(a.key ? defaultMap[a.key] : {}), ...a }
  })

  // 操作列：在标题位置放置列设置按钮（放在操作列右侧）
  const opColumn = {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>操作</span>
        {showColumnSettings && (
          <Popover content={popContent} title="列设置">
            <Button icon={<SettingOutlined />} size="small" />
          </Popover>
        )}
      </div>
    ),
    key: '__actions',
    width: typeof actionsWidth !== 'undefined' ? actionsWidth : 180,
    align: 'center',
    // 默认固定到右侧（可通过 actionsFixed 覆写）
    fixed: actionsFixed,
    render: (_text, record) => {
      return (
        <Space size="small">
          {actionsConfig.map((act) => {
            if (!act || !act.key) return null
            if (!permissionChecker(act.key, record)) return null
            if (act.key === 'delete') {
              return (
                <Popconfirm
                  key={act.key}
                  title={act.confirm || '确认删除吗？'}
                  onConfirm={async () => {
                    if (typeof act.onClick === 'function') {
                      // use hook helper to handle reload/back behavior
                      await handleDelete(async (r) => await Promise.resolve(act.onClick(r)), record)
                    }
                  }}
                >
                  <Button danger size="small">
                    {act.label}
                  </Button>
                </Popconfirm>
              )
            }

            return (
              <Button key={act.key} type="link" size="small" onClick={() => act.onClick && act.onClick(record)}>
                {act.label}
              </Button>
            )
          })}
        </Space>
      )
    },
  }

  // 如果需要显示序号，则插入到最前面
  // 优先使用 columns 中的 index 列（如果存在），否则根据 showIndex 决定是否插入默认序号列
  const indexColumn = indexColumnFromColumns
    ? indexColumnFromColumns
    : showIndex
      ? {
          title: '序号',
          key: '__index',
          width: typeof indexWidth !== 'undefined' ? indexWidth : 80,
          align: 'center',
          // 默认固定到左侧（可通过 indexFixed 覆写）
          fixed: indexFixed,
          render: (text, record, idx) => {
            if (indexMode === 'page') return idx + 1
            if (indexMode === 'custom' && typeof customIndexRender === 'function')
              return customIndexRender(record, idx, pagination)
            return calcIndex(idx)
          },
        }
      : null

  const columnsWithActions = indexColumn
    ? [indexColumn, ...effectiveColumns, opColumn]
    : [...effectiveColumns, opColumn]

  // rowSelection 配置：由单个 prop `rowSelection` 控制
  const rowSelectionConfig =
    rowSelection && rowSelection !== 'none'
      ? {
          type: rowSelection === 'single' ? 'radio' : 'checkbox',
          selectedRowKeys,
          onChange: (keys, rows) => handleSelectionChange(keys, rows),
          getCheckboxProps: (record) => ({ disabled: !isRowSelectable(record) }),
        }
      : null

  // Table onChange 处理：支持服务端排序/本地排序
  const onTableChange = async (pg, filters, sorter, extra) => {
    // sorter 可以是对象或数组（多列排序）；这里只处理单列常见场景
    const { current = 1, pageSize = pagination.pageSize } = pg || {}
    // 更新分页
    setPagination({ current, pageSize })

    if (serverSort) {
      const sort = { field: sorter.field || null, order: sorter.order || null }
      setSortState(sort)
      // fetch server page with new sort
      try {
        await fetchPage(current, pageSize, sort)
      } catch (e) {
        // ignore
      }
    }

    // 向外部透传事件
    if (typeof onChange === 'function') onChange(pg, filters, sorter, extra)
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* toolbar：左侧为操作按钮，右侧为查询表单（可分别控制显示） */}
      {(showToolbarLeft || showToolbarRight) && (
        <div
          className="responsive-table-toolbar"
          style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            {showToolbarLeft && (
              <Space>
                {leftActions.map((act) => (
                  <Button
                    key={act.key || act.label}
                    type={act.type || 'default'}
                    danger={act.danger}
                    onClick={() => {
                      try {
                        if (typeof act.onClick === 'function') act.onClick(toolbarApi)
                      } catch (err) {
                        console.error('toolbar action error', err)
                      }
                    }}
                  >
                    {act.icon ? act.icon : null}
                    {act.label}
                  </Button>
                ))}
              </Space>
            )}
          </div>
          <div>
            {showToolbarRight &&
              queryConfig &&
              (() => {
                const fields = queryConfig.fields || []
                const threshold = queryConfig.advancedThreshold || 3
                const baseFields = fields.slice(0, threshold)
                const advFields = fields.slice(threshold)
                const advancedPlacement = queryConfig.advancedPlacement || 'drawer' // 'inline' | 'popover' | 'drawer'

                const renderField = (f) => (
                  <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                    {f.render
                      ? f.render()
                      : (() => {
                          const t = f.type || 'input'
                          switch (t) {
                            case 'select':
                              return (
                                <Select
                                  style={{ minWidth: f.width || 160 }}
                                  placeholder={f.placeholder}
                                  options={f.options}
                                />
                              )
                            case 'date':
                              return <DatePicker {...(f.props || {})} />
                            case 'dateRange':
                              return <DatePicker.RangePicker {...(f.props || {})} />
                            case 'number':
                              return <InputNumber style={{ minWidth: f.width || 120 }} {...(f.props || {})} />
                            case 'switch':
                              return <Switch {...(f.props || {})} />
                            case 'cascader':
                              return <Cascader options={f.options} {...(f.props || {})} />
                            case 'treeSelect':
                              return <TreeSelect treeData={f.options} {...(f.props || {})} />
                            case 'custom':
                              return f.render ? f.render() : null
                            default:
                              return <Input placeholder={f.placeholder} {...(f.props || {})} />
                          }
                        })()}
                  </Form.Item>
                )

                if (advancedPlacement === 'inline') {
                  return (
                    <Form
                      form={form}
                      {...(queryConfig.formProps || {})}
                      layout={queryConfig.layout || 'inline'}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Space wrap>
                        {baseFields.map((f) => renderField(f))}
                        {showAdvanced && advFields.map((f) => renderField(f))}
                        {advFields.length > 0 && (
                          <Button type="link" onClick={() => setShowAdvanced((s) => !s)}>
                            {showAdvanced ? '收起' : '高级筛选'}
                          </Button>
                        )}
                        <Form.Item>
                          <Space>
                            <Button type="primary" onClick={handleSearch}>
                              {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                            </Button>
                            <Button onClick={handleReset}>
                              {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                            </Button>
                          </Space>
                        </Form.Item>
                      </Space>
                    </Form>
                  )
                }

                if (advancedPlacement === 'popover') {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form form={form} {...(queryConfig.formProps || {})} layout={queryConfig.layout || 'inline'}>
                        <Space wrap>
                          {baseFields.map((f) => renderField(f))}
                          <Form.Item>
                            <Space>
                              <Button type="primary" onClick={handleSearch}>
                                {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                              </Button>
                              <Button onClick={handleReset}>
                                {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                              </Button>
                            </Space>
                          </Form.Item>
                        </Space>
                      </Form>

                      {advFields.length > 0 && (
                        <Popover
                          placement={queryConfig.advancedPlacementPos || 'bottomRight'}
                          trigger="click"
                          open={popoverVisible}
                          onOpenChange={(open) => setPopoverVisible(open)}
                          getPopupContainer={() => document.body}
                          content={
                            <div style={{ minWidth: 320, maxWidth: 420, display: 'flex', flexDirection: 'column' }}>
                              {/* title */}
                              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${token.colorBorder}` }}>
                                高级筛选
                              </div>

                              {/* middle: scrollable form area */}
                              <div style={{ maxHeight: 360, overflowY: 'auto', padding: 16 }}>
                                <Form form={form} layout="vertical">
                                  {advFields.map((f) => (
                                    <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                                      {f.render ? f.render() : renderField(f).props.children}
                                    </Form.Item>
                                  ))}
                                </Form>
                              </div>

                              {/* bottom: fixed action bar */}
                              <div
                                style={{ borderTop: `1px solid ${token.colorBorder}`, padding: 12, textAlign: 'right' }}
                              >
                                <Space>
                                  <Button onClick={handleReset}>
                                    {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                                  </Button>
                                  <Button
                                    type="primary"
                                    onClick={async () => {
                                      await handleSearch()
                                      setPopoverVisible(false)
                                    }}
                                  >
                                    {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                                  </Button>
                                </Space>
                              </div>
                            </div>
                          }
                        >
                          <Button type="link">高级筛选</Button>
                        </Popover>
                      )}
                    </div>
                  )
                }

                if (advancedPlacement === 'drawer') {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form form={form} {...(queryConfig.formProps || {})} layout={queryConfig.layout || 'inline'}>
                        <Space wrap>
                          {baseFields.map((f) => renderField(f))}
                          <Form.Item>
                            <Space>
                              <Button type="primary" onClick={handleSearch}>
                                {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                              </Button>
                              <Button onClick={handleReset}>
                                {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                              </Button>
                            </Space>
                          </Form.Item>
                        </Space>
                      </Form>
                      {advFields.length > 0 && (
                        <>
                          <Button type="link" onClick={() => setDrawerVisible(true)}>
                            高级筛选
                          </Button>
                          <Drawer
                            title={'高级筛选'}
                            placement="right"
                            onClose={() => setDrawerVisible(false)}
                            open={drawerVisible}
                            size={420}
                            styles={{ body: { padding: 0 } }}
                          >
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                              {/* middle: scrollable form area */}
                              <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                                <Form form={form} layout="vertical">
                                  {advFields.map((f) => (
                                    <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                                      {f.render ? f.render() : renderField(f).props.children}
                                    </Form.Item>
                                  ))}
                                </Form>
                              </div>

                              {/* bottom: fixed action bar */}
                              <div
                                style={{ borderTop: `1px solid ${token.colorBorder}`, padding: 12, textAlign: 'right' }}
                              >
                                <Space>
                                  <Button onClick={handleReset}>
                                    {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                                  </Button>
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      handleSearch()
                                      setDrawerVisible(false)
                                    }}
                                  >
                                    {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                                  </Button>
                                </Space>
                              </div>
                            </div>
                          </Drawer>
                        </>
                      )}
                    </div>
                  )
                }

                return (
                  <Form
                    form={form}
                    {...(queryConfig.formProps || {})}
                    layout={queryConfig.layout || 'inline'}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Space wrap>
                      {baseFields.map((f) => renderField(f))}
                      {showAdvanced && advFields.map((f) => renderField(f))}
                      {advFields.length > 0 && (
                        <Button type="link" onClick={() => setShowAdvanced((s) => !s)}>
                          {showAdvanced ? '收起' : '高级筛选'}
                        </Button>
                      )}
                      <Form.Item>
                        <Space>
                          <Button type="primary" onClick={handleSearch}>
                            {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                          </Button>
                          <Button onClick={handleReset}>
                            {(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}
                          </Button>
                        </Space>
                      </Form.Item>
                    </Space>
                  </Form>
                )
              })()}
          </div>
        </div>
      )}

      <div style={{ flex: '1 1 auto', overflowX: 'auto', overflowY: 'hidden' }}>
        {/* allow explicit override from `scroll` prop, then `tableProps.scroll`, otherwise use computed `tableScroll` */}
        {(() => {
          const computed = { x: tableScroll.x, y: tableScroll.y }
          const tableScrollFromProps = tableProps && tableProps.scroll ? tableProps.scroll : {}
          // merge: computed <- tableProps.scroll <- explicit scrollProp (explicit wins)
          const finalScroll = {
            ...(typeof computed === 'object' ? computed : {}),
            ...(typeof tableScrollFromProps === 'object' ? tableScrollFromProps : {}),
            ...(typeof scrollProp === 'object' ? scrollProp : {}),
          }

          // avoid passing through original scroll in tableProps to prevent override
          const restTableProps = { ...tableProps }
          if (restTableProps && restTableProps.scroll) delete restTableProps.scroll

          return (
            <Table
              rowKey={rowKey}
              columns={columnsWithActions}
              dataSource={pagedData}
              rowSelection={rowSelectionConfig}
              pagination={false}
              scroll={finalScroll}
              virtual={typeof tableProps.virtual !== 'undefined' ? tableProps.virtual : virtualized}
              style={{ width: '100%' }}
              onChange={onTableChange}
              {...restTableProps}
            />
          )
        })()}
      </div>
      <div style={{ flex: '0 0 auto', padding: 8, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={typeof total === 'number' && total > 0 ? total : dataSource.length}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={async (current, pageSize) => {
            setPagination({ current, pageSize })
            // 如果是服务端模式，触发 fetch
            if (typeof fetchData === 'function' || typeof reloadPage === 'function') {
              try {
                await fetchPage(current, pageSize, sortState)
              } catch (e) {
                // ignore
              }
            }
          }}
          onShowSizeChange={async (current, size) => {
            setPagination({ current, pageSize: size })
            if (typeof fetchData === 'function' || typeof reloadPage === 'function') {
              try {
                await fetchPage(current, size, sortState)
              } catch (e) {}
            }
          }}
        />
      </div>
    </div>
  )
}

export default ResponsiveTable
