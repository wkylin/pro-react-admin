import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Table, Pagination, Popover, Checkbox, Button, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

/**
 * ResponsiveTable
 * - 自适应父容器尺寸，自动计算 scroll.x / scroll.y
 * - 底部独立分页，始终显示在容器底部右侧
 * - 支持动态列显示设置（列可开关）
 *
 * Props:
 * - columns: 原始列配置（与 antd Table 相同）
 * - dataSource: 数据数组
 * - rowKey: 表格主键
 * - initialPagination: { current, pageSize }
 * - pageSyncToUrl: boolean（如需同步到 URL，可由上层扩展）
 * - minBodyHeight, minWidth: 数值，最小尺寸保护
 */
const ResponsiveTable = ({
  columns = [],
  dataSource = [],
  rowKey = 'id',
  initialPagination = { current: 1, pageSize: 10 },
  minBodyHeight = 120,
  minWidth = 600,
  showColumnSettings = true,
  onChange = () => {},
}) => {
  const containerRef = useRef(null)
  const [tableScroll, setTableScroll] = useState({ x: Math.max(minWidth, 800), y: 280 })
  const [pagination, setPagination] = useState(initialPagination)
  const [visibleKeys, setVisibleKeys] = useState(() => columns.map((c) => c.dataIndex || c.key).filter(Boolean))

  useEffect(() => setVisibleKeys(columns.map((c) => c.dataIndex || c.key).filter(Boolean)), [columns])

  // 计算分页切片
  const pagedData = useMemo(() => {
    const { current, pageSize } = pagination
    const start = (current - 1) * pageSize
    return dataSource.slice(start, start + pageSize)
  }, [dataSource, pagination.current, pagination.pageSize])

  // 响应式计算 scroll
  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const calc = () => {
      const rect = node.getBoundingClientRect()
      const width = Math.max(Math.floor(rect.width || minWidth), minWidth)
      const height = Math.max(Math.floor(rect.height || 400), minBodyHeight + 120)

      const headerEl = node.querySelector('.ant-table-header') || node.querySelector('.ant-table-thead')
      const headerH = headerEl ? headerEl.offsetHeight : 56
      const footerH = 64 // pagination area
      const padding = 16

      const bodyH = Math.max(minBodyHeight, height - headerH - footerH - padding)
      setTableScroll({ x: Math.max(width, minWidth), y: bodyH })
    }

    calc()
    const ro = new ResizeObserver(() => calc())
    ro.observe(node)
    return () => ro.disconnect()
  }, [containerRef, minBodyHeight, minWidth, pagination.pageSize])

  const currentColumns = useMemo(() => {
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

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
        {showColumnSettings && (
          <Popover content={popContent} title="列设置">
            <Button icon={<SettingOutlined />} size="small">
              列设置
            </Button>
          </Popover>
        )}
      </div>
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table
          rowKey={rowKey}
          columns={currentColumns}
          dataSource={pagedData}
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
