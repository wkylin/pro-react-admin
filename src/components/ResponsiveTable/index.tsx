import React from 'react'
import type { ReactNode } from 'react'
import type { TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  Table,
  Pagination,
  Popover,
  Tag,
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
import { useLocation } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'
import useTable from './useTable'

export type ActionConfig<T> = {
  key: string
  label?: ReactNode
  onClick?: (record: T) => any
  confirm?: string
  icon?: ReactNode
  type?: string
  danger?: boolean
}

export type ResponsiveTableProps<T = any> = {
  columns?: ColumnsType<T>
  dataSource?: T[]
  rowKey?: string | ((record: T) => React.Key)
  initialPagination?: { current: number; pageSize: number }
  minBodyHeight?: number
  minWidth?: number
  showColumnSettings?: boolean
  pageSyncToUrl?: boolean
  onPaginationChange?: (pagination: { current: number; pageSize: number }) => void
  onChange?: (...args: any[]) => any
  // actions can be preset strings or detailed configs
  actions?: Array<'view' | 'edit' | 'delete' | ActionConfig<T>>
  permissionChecker?: (actionKey: string, record: T) => boolean
  onView?: (record: T) => any
  onEdit?: (record: T) => any
  onDelete?: (record: T) => any
  // optionally provided reload/fetch helpers
  reloadPage?: ((page: number, pageSize: number) => Promise<any>) | null
  showIndex?: boolean
  indexMode?: 'global' | 'page' | 'custom'
  indexFixed?: false | 'left' | 'right'
  actionsFixed?: false | 'left' | 'right'
  customIndexRender?: (record: T, index: number, pagination: any) => ReactNode
  rowSelection?: null | 'multiple' | 'single'
  rowSelectable?: ((record: T) => boolean) | string | null
  fetchData?: ((page: number, pageSize: number, sort?: any, extraParams?: any) => Promise<any>) | null
  autoLoad?: boolean
  fetchUrl?: string | null
  requestParamMap?: { pageField: string; pageSizeField: string; sortField: string; orderField: string }
  responseFieldMap?: { listField: string; totalField: string }
  serverSort?: boolean
  defaultSort?: any
  virtualized?: boolean
  mergeSearchToFetch?: boolean
  mergeSearchToFetchOnce?: boolean
  requestMethod?: string
  clearUrlAfterInitialMerge?: boolean
  showUrlAppliedTag?: boolean
  indexWidth?: number
  actionsWidth?: number
  toolbar?: any
  apiRef?: any
  onToolbarReady?: (api: any) => void
  scroll?: any
} & TableProps<T>

const ResponsiveTable = <T,>(props: ResponsiveTableProps<T> & TableProps<T>) => {
  const {
      columns = [],
      dataSource = [],
      rowKey = 'id' as any,
      initialPagination = { current: 1, pageSize: 10 },
      minBodyHeight = 120,
      minWidth = 600,
      showColumnSettings = true,
      pageSyncToUrl = false,
      onPaginationChange = () => {},
      onChange = () => {},
      actions = ['view', 'edit', 'delete'] as Array<any>,
      permissionChecker = () => true,
      onView,
      onEdit,
      onDelete,
      reloadPage,
      showIndex = false,
      indexMode = 'global',
      indexFixed = 'left',
      actionsFixed = 'right',
      customIndexRender = null,
      rowSelection = null,
      rowSelectable = null,
      fetchData = null,
      autoLoad = false,
      fetchUrl = null,
      requestParamMap = { pageField: 'page', pageSizeField: 'pageSize', sortField: 'sort', orderField: 'order' },
      responseFieldMap = { listField: 'data', totalField: 'total' },
      serverSort = false,
      defaultSort = null,
      virtualized = false,
      mergeSearchToFetch = false,
      mergeSearchToFetchOnce = false,
      clearUrlAfterInitialMerge = true,
      showUrlAppliedTag = false,
      indexWidth = 80,
      actionsWidth = 180,
      toolbar = null,
      apiRef = null,
      onToolbarReady = null,
      scroll: scrollProp = undefined,
      requestMethod = 'get',
      ...tableProps
    } = props

  // location/search parser must be defined before passing initialSearch into useTable
  const location = useLocation()

  const parseLocationSearch = React.useCallback(() => {
    try {
      const params = new URLSearchParams(location?.search || '')
      const obj: Record<string, any> = {}
      for (const [k, v] of params.entries()) obj[k] = v
      return obj
    } catch (e) {
      return {}
    }
  }, [location && (location as any).search])

  // derive toolbar/query config early so initial form values can be merged into initialSearch
  const toolbarConfig = toolbar || {}
  const queryConfig = toolbarConfig.search && typeof toolbarConfig.search === 'object' ? toolbarConfig.search : null

  const initialFormPayload = React.useMemo(() => {
    if (!queryConfig) return {}
    let payload: Record<string, any> = { ...(queryConfig.initialValues || {}) }
    if (queryConfig && Array.isArray(queryConfig.fields)) {
      for (const f of queryConfig.fields) {
        if (f && typeof f.transform === 'function') {
          payload[f.name] = f.transform(payload[f.name], payload)
        }
      }
    }
    if (queryConfig && typeof queryConfig.transformValues === 'function') {
      payload = queryConfig.transformValues(payload) || payload
    }
    return payload
  }, [queryConfig && queryConfig.initialValues, queryConfig && queryConfig.fields, queryConfig && queryConfig.transformValues])

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
    // internalData is returned by the hook but not used directly in this component
    total,
    fetchPage,
    sortState,
    setSortState,
    hasMergedInitialSearch,
  } = useTable<T>({
    dataSource,
    initialPagination,
    minBodyHeight,
    minWidth,
    pageSyncToUrl,
    onPaginationChange,
    reloadPage: reloadPage ?? null,
    fetchData: fetchData ?? null,
    autoLoad,
    serverSort,
    defaultSort,
    selectionMode: rowSelection ?? 'none',
    rowSelectable,
    fetchUrl,
    requestParamMap,
    responseFieldMap,
    // forward search/merge options to hook
    mergeSearchToFetch,
    mergeSearchToFetchOnce,
    clearUrlAfterInitialMerge,
    // initialSearch merges URL search and toolbar initialValues so autoLoad includes form defaults
    initialSearch: { ...parseLocationSearch(), ...(initialFormPayload || {}) },
    requestMethod,
  })

  // toolbar form (right side)
  const [form] = Form.useForm()
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const [drawerVisible, setDrawerVisible] = React.useState(false)
  const [popoverVisible, setPopoverVisible] = React.useState(false)

  const { token } = theme.useToken()

  const leftActions = Array.isArray(toolbarConfig.actions) ? toolbarConfig.actions : []

  const showToolbarLeft = typeof toolbarConfig.showLeft !== 'undefined' ? !!toolbarConfig.showLeft : leftActions.length > 0
  const showToolbarRight = typeof toolbarConfig.showRight !== 'undefined' ? !!toolbarConfig.showRight : !!queryConfig

  const toolbarApi = React.useMemo(
    () => ({
      selectedRowKeys: Array.isArray(selectedRowKeys) ? [...selectedRowKeys] : [],
      fetchPage: async (...args: any[]) => {
        try {
          return await fetchPage(...args)
        } catch (err) {
          console.error('toolbar fetchPage error', err)
          throw err
        }
      },
      // 返回当前 URL 查询对象（key -> value），供外部使用
      getSearch: () => {
        // 返回当前地址栏的查询对象，优先使用 react-router 的 location
        return parseLocationSearch()
      },
      // fetchPage 并把当前 URL 查询合并到 extraParams 中
      fetchPageWithSearch: async (
        page = pagination.current,
        pageSize = pagination.pageSize,
        sort = sortState,
        extraParams = {}
      ) => {
        try {
          const searchObj = parseLocationSearch()
          const merged = { ...searchObj, ...(extraParams || {}) }
          return await fetchPage(page, pageSize, sort, merged)
        } catch (err) {
          console.error('toolbar fetchPageWithSearch error', err)
          throw err
        }
      },
      pagination: { ...pagination },
      form,
    }),
    [selectedRowKeys, fetchPage, pagination, form, parseLocationSearch, sortState]
  )

  if (apiRef && typeof apiRef === 'object') {
    apiRef.current = toolbarApi
  }

  React.useEffect(() => {
    return () => {
      if (apiRef && typeof apiRef === 'object') apiRef.current = null
    }
  }, [apiRef])

  const _toolbarReadyFired = React.useRef(false)
  React.useEffect(() => {
    if (_toolbarReadyFired.current) return
    if (typeof onToolbarReady === 'function') {
      if (toolbarApi && toolbarApi.form) {
        try {
          onToolbarReady(toolbarApi)
          _toolbarReadyFired.current = true
        } catch (e) {
          console.error('onToolbarReady callback error', e)
        }
      }
    }
  }, [onToolbarReady, toolbarApi])

  React.useEffect(() => {
    if (queryConfig && queryConfig.initialValues) {
      form.setFieldsValue(queryConfig.initialValues)
    }
  }, [queryConfig && queryConfig.initialValues])

  const handleSearch = async () => {
    try {
      const values = await form.validateFields()
      let payload: Record<string, any> = { ...values }
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
      setPagination((p: any) => ({ ...p, current: 1 }))
      const includeSearch =
        mergeSearchToFetch && (!mergeSearchToFetchOnce || !hasMergedInitialSearch || !hasMergedInitialSearch())
      const finalPayload = includeSearch ? { ...parseLocationSearch(), ...(payload || {}) } : payload
      if (queryConfig && typeof queryConfig.onSearch === 'function') {
        await queryConfig.onSearch(finalPayload, { fetchPage, form, setPagination, pagination })
      } else {
        await fetchPage(1, pagination.pageSize, sortState, finalPayload)
      }
    } catch (e) {
      // validation error will be shown by Form
    }
  }

  const handleReset = async () => {
    form.resetFields()
    setPagination((p: any) => ({ ...p, current: 1 }))
    if (queryConfig && typeof queryConfig.onReset === 'function') {
      await queryConfig.onReset({ fetchPage, form, setPagination, pagination })
    } else {
      const includeSearch =
        mergeSearchToFetch && (!mergeSearchToFetchOnce || !hasMergedInitialSearch || !hasMergedInitialSearch())
      const extra = includeSearch ? parseLocationSearch() : {}
      await fetchPage(1, pagination.pageSize, sortState, extra)
    }
  }

  const [visibleKeys, setVisibleKeys] = React.useState<React.Key[]>(() => (columns || []).map((c) => (c as any).dataIndex || (c as any).key).filter(Boolean))

  React.useEffect(() => setVisibleKeys((columns || []).map((c) => (c as any).dataIndex || (c as any).key).filter(Boolean)), [columns])

  const currentColumns = React.useMemo(() => {
    const keys = new Set(visibleKeys)
    return columns.filter((c) => keys.has((c as any).dataIndex || (c as any).key))
  }, [columns, visibleKeys])

  const indexColumnFromColumns = React.useMemo(() => {
    const idx = columns.find((c) => c && ((c as any).index === true || (c as any).type === 'index'))
    if (!idx) return null
    const col = {
      ...idx,
      key: idx.key || '__index',
      width: typeof idx.width !== 'undefined' ? idx.width : indexWidth,
      align: typeof idx.align !== 'undefined' ? idx.align : 'center',
      fixed: typeof idx.fixed !== 'undefined' ? idx.fixed : indexFixed,
      render: idx.render || ((_text: any, _record: any, rowIndex: number) => (indexMode === 'page' ? rowIndex + 1 : calcIndex(rowIndex))),
    }
    return col
  }, [columns, indexMode, calcIndex])

  const effectiveColumns = React.useMemo(() => {
    if (!indexColumnFromColumns) return currentColumns
    const key = (indexColumnFromColumns as any).dataIndex || (indexColumnFromColumns as any).key
    return currentColumns.filter((c) => ((c as any).dataIndex || (c as any).key) !== key)
  }, [currentColumns, indexColumnFromColumns])

  const columnOptions = columns
    .map((c) => ({ label: (c as any).title || (c as any).dataIndex || (c as any).key, value: (c as any).dataIndex || (c as any).key }))
    .filter((o) => o.value)

  const popContent = (
    <div style={{ maxWidth: 320 }}>
      <Checkbox.Group
        value={visibleKeys}
        onChange={(v: any) => setVisibleKeys(v)}
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
          onClick={() => setVisibleKeys((columns || []).map((c) => (c as any).dataIndex || (c as any).key))}
          style={{ marginRight: 8 }}
        >
          全部
        </Button>
        <Button size="small" onClick={() => setVisibleKeys((columns || []).slice(0, 3).map((c) => (c as any).dataIndex || (c as any).key))}>
          恢复默认
        </Button>
      </div>
    </div>
  )

  const defaultMap: Record<string, any> = {
    view: { key: 'view', label: '查看', onClick: onView },
    edit: { key: 'edit', label: '编辑', onClick: onEdit },
    delete: { key: 'delete', label: '删除', onClick: onDelete },
  }

  const actionsConfig = (actions || []).map((a) => {
    if (typeof a === 'string') return defaultMap[a] || { key: a, label: a, onClick: undefined }
    return { ...(a.key ? defaultMap[a.key] : {}), ...a }
  })

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
    fixed: actionsFixed,
    render: (_text: any, record: any) => {
      return (
        <Space size="small">
          {actionsConfig.map((act: any) => {
            if (!act || !act.key) return null
            if (!permissionChecker(act.key, record)) return null
            if (act.key === 'delete') {
              return (
                <Popconfirm
                  key={act.key}
                  title={act.confirm || '确认删除吗？'}
                  onConfirm={async () => {
                    if (typeof act.onClick === 'function') {
                      await handleDelete(async (r: any) => await Promise.resolve(act.onClick(r)), record)
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

  const indexColumn = indexColumnFromColumns
    ? indexColumnFromColumns
    : showIndex
    ? {
        title: '序号',
        key: '__index',
        width: typeof indexWidth !== 'undefined' ? indexWidth : 80,
        align: 'center',
        fixed: indexFixed,
        render: (_text: any, record: any, idx: number) => {
          if (indexMode === 'page') return idx + 1
          if (indexMode === 'custom' && typeof customIndexRender === 'function') return customIndexRender(record, idx, pagination)
          return calcIndex(idx)
        },
      }
    : null

  const columnsWithActions = indexColumn ? [indexColumn, ...effectiveColumns, opColumn] : [...effectiveColumns, opColumn]

  const rowSelectionConfig =
    rowSelection && rowSelection !== null
      ? {
          type: rowSelection === 'single' ? 'radio' : 'checkbox',
          selectedRowKeys,
          onChange: (keys: any, rows: any) => handleSelectionChange(keys, rows),
          getCheckboxProps: (record: any) => ({ disabled: !isRowSelectable(record) }),
        }
        : undefined

  const onTableChange = async (pg: any, filters: any, sorter: any, extra: any) => {
    const { current = 1, pageSize = pagination.pageSize } = pg || {}
    setPagination({ current, pageSize })

    if (serverSort) {
      const sort = { field: sorter.field || null, order: sorter.order || null }
      if (typeof setSortState === 'function') setSortState(sort)
      try {
        await fetchPage(current, pageSize, sort)
      } catch (e) {}
    }

    if (typeof onChange === 'function') onChange(pg, filters, sorter, extra)
  }

  return (
    <div ref={containerRef as any} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {showUrlAppliedTag && hasMergedInitialSearch && hasMergedInitialSearch() && (
        <Tag color="blue" style={{ marginRight: 8 }}>
          已应用地址栏初始筛选
        </Tag>
      )}
      {(showToolbarLeft || showToolbarRight) && (
        <div
          className="responsive-table-toolbar"
          style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            {showToolbarLeft && (
              <Space>
                {leftActions.map((act: any) => (
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
                const advancedPlacement = queryConfig.advancedPlacement || 'drawer'

                const renderField = (f: any) => (
                  <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                    {f.render
                      ? f.render()
                      : (() => {
                          const t = f.type || 'input'
                          switch (t) {
                            case 'select':
                              return <Select style={{ minWidth: f.width || 160 }} placeholder={f.placeholder} options={f.options} />
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
                        {baseFields.map((f: any) => renderField(f))}
                        {showAdvanced && advFields.map((f: any) => renderField(f))}
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
                            <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
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
                          {baseFields.map((f: any) => renderField(f))}
                          <Form.Item>
                            <Space>
                              <Button type="primary" onClick={handleSearch}>
                                {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                              </Button>
                              <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
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
                              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${token.colorBorder}` }}>
                                高级筛选
                              </div>

                              <div style={{ maxHeight: 360, overflowY: 'auto', padding: 16 }}>
                                <Form form={form} layout="vertical">
                                  {advFields.map((f: any) => (
                                    <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                                      {f.render ? f.render() : renderField(f).props.children}
                                    </Form.Item>
                                  ))}
                                </Form>
                              </div>

                              <div style={{ borderTop: `1px solid ${token.colorBorder}`, padding: 12, textAlign: 'right' }}>
                                <Space>
                                  <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
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
                          {baseFields.map((f: any) => renderField(f))}
                          <Form.Item>
                            <Space>
                              <Button type="primary" onClick={handleSearch}>
                                {(queryConfig.buttons && queryConfig.buttons.searchText) || '查询'}
                              </Button>
                              <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
                            </Space>
                          </Form.Item>
                        </Space>
                      </Form>
                      {advFields.length > 0 && (
                        <>
                          <Button type="link" onClick={() => setDrawerVisible(true)}>
                            高级筛选
                          </Button>
                          <Drawer title={'高级筛选'} placement="right" onClose={() => setDrawerVisible(false)} open={drawerVisible} size={420} styles={{ body: { padding: 0 } }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                                <Form form={form} layout="vertical">
                                  {advFields.map((f: any) => (
                                    <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules || []}>
                                      {f.render ? f.render() : renderField(f).props.children}
                                    </Form.Item>
                                  ))}
                                </Form>
                              </div>

                              <div style={{ borderTop: `1px solid ${token.colorBorder}`, padding: 12, textAlign: 'right' }}>
                                <Space>
                                  <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
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
                  <Form form={form} {...(queryConfig.formProps || {})} layout={queryConfig.layout || 'inline'} style={{ display: 'flex', alignItems: 'center' }}>
                    <Space wrap>
                      {baseFields.map((f: any) => renderField(f))}
                      {showAdvanced && advFields.map((f: any) => renderField(f))}
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
                          <Button onClick={handleReset}>{(queryConfig.buttons && queryConfig.buttons.resetText) || '重置'}</Button>
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
        {(() => {
          const computed = { x: tableScroll.x, y: tableScroll.y }
          const tablePropsAny = tableProps as any
          const tableScrollFromProps = tablePropsAny && tablePropsAny.scroll ? tablePropsAny.scroll : {}
          const finalScroll = {
            ...(typeof computed === 'object' ? computed : {}),
            ...(typeof tableScrollFromProps === 'object' ? tableScrollFromProps : {}),
            ...(typeof scrollProp === 'object' ? scrollProp : {}),
          }

          const restTableProps: any = { ...tableProps }
          if (restTableProps && restTableProps.scroll) delete restTableProps.scroll

          return (
            <Table
              rowKey={rowKey}
              columns={columnsWithActions}
              dataSource={pagedData}
              rowSelection={rowSelectionConfig as any}
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
          showTotal={(totalVal) => `共 ${totalVal} 条`}
          onChange={async (current, pageSize) => {
            setPagination({ current, pageSize })
            if (typeof fetchData === 'function' || typeof reloadPage === 'function') {
              try {
                const includeSearch =
                  mergeSearchToFetch &&
                  (!mergeSearchToFetchOnce || !hasMergedInitialSearch || !hasMergedInitialSearch())
                const extra = includeSearch ? parseLocationSearch() : undefined
                await fetchPage(current, pageSize, sortState, extra)
              } catch (e) {}
            }
          }}
          onShowSizeChange={async (current, size) => {
            setPagination({ current, pageSize: size })
            if (typeof fetchData === 'function' || typeof reloadPage === 'function') {
              try {
                const includeSearch =
                  mergeSearchToFetch &&
                  (!mergeSearchToFetchOnce || !hasMergedInitialSearch || !hasMergedInitialSearch())
                const extra = includeSearch ? parseLocationSearch() : undefined
                await fetchPage(current, size, sortState, extra)
              } catch (e) {}
            }
          }}
        />
      </div>
    </div>
  )
}

export default ResponsiveTable
