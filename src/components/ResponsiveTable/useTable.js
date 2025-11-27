import { useState, useRef, useEffect, useMemo } from 'react'

// useTable: 提供分页管理、响应式 scroll 计算，以及删除后回退上一页的辅助方法
export default function useTable({
  dataSource = [],
  initialPagination = { current: 1, pageSize: 10 },
  minBodyHeight = 120,
  minWidth = 600,
  pageSyncToUrl = false,
  onPaginationChange = () => {},
  // 可选：用于在删除/操作后重新加载指定页的数据，函数签名 (page, pageSize) => Promise
  reloadPage = null,
  // 选择配置： mode = 'multiple' | 'single', selectable: (record) => boolean
  selectionMode = 'multiple',
  rowSelectable = null,
} = {}) {
  const containerRef = useRef(null)
  const [pagination, setPagination] = useState(initialPagination)
  const [tableScroll, setTableScroll] = useState({ x: Math.max(minWidth, 800), y: 280 })

  // 同步 URL（可选）
  useEffect(() => {
    if (!pageSyncToUrl) return
    const params = new URLSearchParams(window.location.search)
    const current = params.get('page') ? parseInt(params.get('page'), 10) : null
    const pageSize = params.get('pageSize') ? parseInt(params.get('pageSize'), 10) : null
    if (current || pageSize) {
      setPagination((p) => ({
        current: current || p.current,
        pageSize: pageSize || p.pageSize,
      }))
    }
  }, [pageSyncToUrl])

  // 当 pagination 改变时触发回调并可选写入 URL
  useEffect(() => {
    const { current, pageSize } = pagination
    onPaginationChange(pagination)
    if (pageSyncToUrl) {
      const params = new URLSearchParams(window.location.search)
      params.set('page', String(current))
      params.set('pageSize', String(pageSize))
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [pagination.current, pagination.pageSize])

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

  // 删除后处理：deleteFn 应返回 Promise；如果当前页删除后无条目且页码>1，则自动回退并触发 reload
  const handleDelete = async (deleteFn, record) => {
    if (typeof deleteFn !== 'function') throw new Error('deleteFn must be a function')
    // 执行删除
    await Promise.resolve(deleteFn(record))

    const { current, pageSize } = pagination
    // 如果本页只有一条（将被删除），尝试回退到上一页
    if (pagedData && pagedData.length <= 1 && current > 1) {
      const prev = current - 1
      setPagination((p) => ({ ...p, current: prev }))
      if (typeof reloadPage === 'function') {
        try {
          await reloadPage(prev, pageSize)
        } catch (e) {
          // ignore - caller can handle
        }
      }
    } else {
      // 否则重新加载当前页
      if (typeof reloadPage === 'function') {
        try {
          await reloadPage(current, pageSize)
        } catch (e) {
          // ignore
        }
      }
    }
  }

  // 选择相关
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const handleSelectionChange = (keys, rows) => {
    setSelectedRowKeys(keys || [])
    return { keys, rows }
  }

  // 计算序号（基于分页）
  const calcIndex = (localIndex) => {
    const { current, pageSize } = pagination
    return (current - 1) * pageSize + (localIndex || 0) + 1
  }

  // 默认 rowSelectable 函数（如果未提供，所有行可选）
  const isRowSelectable = (record) => {
    if (typeof rowSelectable === 'function') return !!rowSelectable(record)
    // 如果传入的是字符串字段名，用其为 key 判断 truthy 值表示可选
    if (typeof rowSelectable === 'string') return !!record[rowSelectable]
    return true
  }

  return {
    containerRef,
    pagination,
    setPagination,
    tableScroll,
    pagedData,
    handleDelete,
    selectedRowKeys,
    setSelectedRowKeys,
    handleSelectionChange,
    selectionMode,
    isRowSelectable,
    calcIndex,
  }
}
