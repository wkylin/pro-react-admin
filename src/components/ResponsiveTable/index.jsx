import React from 'react'
import { Table, Pagination, Popover, Checkbox, Button, Popconfirm, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTable from './useTable'

/**
 * ResponsiveTable
 * - 自适应父容器尺寸，自动计算 scroll.x / scroll/y
 * - 底部独立分页，始终显示在容器底部右侧
 * - 支持动态列显示设置（列可开关）
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
  // 是否启用虚拟列表（提高大量数据渲染性能）。默认开启，可通过 `tableProps.virtual` 覆写。
  virtualized = true,
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
    width: 180,
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
  const indexColumn =
    indexColumnFromColumns ||
    (showIndex
      ? {
          title: '序号',
          key: '__index',
          width: 80,
          // 默认固定到左侧（可通过 indexFixed 覆写）
          fixed: indexFixed,
          render: (text, record, idx) => {
            if (indexMode === 'page') return idx + 1
            if (indexMode === 'custom' && typeof customIndexRender === 'function') {
              return customIndexRender(record, idx, pagination)
            }
            return calcIndex(idx)
          },
        }
      : null)

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
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        {/* allow explicit override from tableProps.virtual, otherwise use virtualized prop */}
        <Table
          rowKey={rowKey}
          columns={columnsWithActions}
          dataSource={pagedData}
          rowSelection={rowSelectionConfig}
          pagination={false}
          scroll={{ x: tableScroll.x, y: tableScroll.y }}
          virtual={typeof tableProps.virtual !== 'undefined' ? tableProps.virtual : virtualized}
          style={{ width: '100%' }}
          onChange={onTableChange}
          {...tableProps}
        />
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
