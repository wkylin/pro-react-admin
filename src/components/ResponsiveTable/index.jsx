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
  // show serial index column
  showIndex = false,
  // selection config: 'multiple' | 'single' | null (disable)
  rowSelectionMode = 'multiple',
  // rowSelectable: function(record) or string key
  rowSelectable = null,
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
  } = useTable({
    dataSource,
    initialPagination,
    minBodyHeight,
    minWidth,
    pageSyncToUrl,
    onPaginationChange,
    reloadPage,
    selectionMode: rowSelectionMode,
    rowSelectable,
  })

  const [visibleKeys, setVisibleKeys] = React.useState(() => columns.map((c) => c.dataIndex || c.key).filter(Boolean))

  React.useEffect(() => setVisibleKeys(columns.map((c) => c.dataIndex || c.key).filter(Boolean)), [columns])

  const currentColumns = React.useMemo(() => {
    const keys = new Set(visibleKeys)
    return columns.filter((c) => keys.has(c.dataIndex || c.key))
  }, [columns, visibleKeys])

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
    fixed: false,
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
  const indexColumn = showIndex
    ? {
        title: '序号',
        key: '__index',
        width: 80,
        render: (_t, _r, idx) => calcIndex(idx),
      }
    : null

  const columnsWithActions = indexColumn ? [indexColumn, ...currentColumns, opColumn] : [...currentColumns, opColumn]

  // rowSelection 配置
  const rowSelection =
    rowSelectionMode && rowSelectionMode !== 'none'
      ? {
          type: rowSelectionMode === 'single' ? 'radio' : 'checkbox',
          selectedRowKeys,
          onChange: (keys, rows) => handleSelectionChange(keys, rows),
          getCheckboxProps: (record) => ({ disabled: !isRowSelectable(record) }),
        }
      : null

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          rowKey={rowKey}
          columns={columnsWithActions}
          dataSource={pagedData}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: tableScroll.x, y: tableScroll.y }}
          style={{ width: '100%' }}
          onChange={(...args) => onChange(...args)}
        />
      </div>
      <div style={{ flex: '0 0 auto', padding: 8, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={dataSource.length}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={(current, pageSize) => setPagination({ current, pageSize })}
          onShowSizeChange={(current, size) => setPagination({ current, pageSize: size })}
        />
      </div>
    </div>
  )
}

export default ResponsiveTable
