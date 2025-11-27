import { useState, useRef, useEffect, useMemo } from 'react'
import request from '@/service/request'

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
  // 可选：从后端拉取数据的函数 (page, pageSize, sort) => Promise
  fetchData = null,
  // 可选：直接提供 fetch URL（当未提供 fetchData 时使用内部 request）
  fetchUrl = null,
  // 自定义请求库（需要包含 get/post 等），默认使用项目 request
  requestLib = request,
  // 请求参数映射：{ currentField, pageField, pageSizeField, sortField, orderField }
  // 支持后端使用不同字段名，如 'current' / 'page' / 'pageNum'
  requestParamMap = {
    pageField: 'page',
    pageSizeField: 'pageSize',
    sortField: 'sort',
    orderField: 'order',
  },
  // 响应字段映射：{ listField, totalField } 可以是点路径，如 'data.items'
  responseFieldMap = { listField: 'data', totalField: 'total' },
  // 是否在组件初始化自动加载（当 fetchData 提供时生效）
  autoLoad = false,
  // 服务端排序
  serverSort = false,
  // 默认排序状态 { field, order }
  defaultSort = null,
  // 选择配置： mode = 'multiple' | 'single', selectable: (record) => boolean
  selectionMode = 'multiple',
  rowSelectable = null,
} = {}) {
  const containerRef = useRef(null)
  const [pagination, setPagination] = useState(initialPagination)
  // ensure pagination numbers are normalized
  useEffect(() => {
    setPagination((p) => {
      const current = Number(p.current) || 1
      const pageSize = Number(p.pageSize) || 10
      if (current !== p.current || pageSize !== p.pageSize) return { current, pageSize }
      return p
    })
    // run once on mount
  }, [])
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

  // internal data 支持本地或服务端返回的数据
  const [internalData, setInternalData] = useState(dataSource || [])
  const [total, setTotal] = useState(Array.isArray(dataSource) ? dataSource.length : 0)
  const [sortState, setSortState] = useState(defaultSort || { field: null, order: null })

  const pagedData = useMemo(() => {
    const { current, pageSize } = pagination
    const isServerMode = typeof fetchData === 'function' || typeof reloadPage === 'function'
    if (isServerMode) {
      // internalData expected to be current page data when in server mode
      return internalData || []
    }
    const ps = Number(pageSize) || 0
    if (!ps || ps <= 0) return internalData || dataSource || []
    const start = (Number(current) - 1) * ps
    return (internalData || dataSource || []).slice(start, start + ps)
  }, [dataSource, internalData, pagination.current, pagination.pageSize, sortState])

  // Helper: get nested value by path
  const getByPath = (obj, path) => {
    if (!obj || !path) return undefined
    const parts = path.split('.')
    let cur = obj
    for (const p of parts) {
      if (cur == null) return undefined
      cur = cur[p]
    }
    return cur
  }

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
      try {
        await fetchPage(prev, pageSize)
      } catch (e) {
        // ignore - caller can handle
      }
    } else {
      // 否则重新加载当前页
      try {
        await fetchPage(current, pageSize)
      } catch (e) {
        // ignore
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

  // fetch page helper（用于服务端模式）
  const fetchPage = async (page = pagination.current, pageSize = pagination.pageSize, sort = sortState) => {
    const fetcher = fetchData || reloadPage
    try {
      let res
      if (typeof fetcher === 'function') {
        res = await fetcher(page, pageSize, sort)
      } else if (fetchUrl) {
        // build params according to requestParamMap
        const params = {}
        // use configured pageField to represent current page
        if (requestParamMap.pageField) params[requestParamMap.pageField] = page
        params[requestParamMap.pageSizeField] = pageSize
        if (sort && sort.field) params[requestParamMap.sortField] = sort.field
        if (sort && sort.order) params[requestParamMap.orderField] = sort.order
        // use requestLib.get
        res = await requestLib.get(fetchUrl, params).catch((e) => {
          console.error('fetchPage request failed', e)
          return null
        })
      } else {
        return Promise.resolve()
      }
      if (!res) return Promise.resolve(res)

      // Try using responseFieldMap first (listField / totalField)
      let list
      let totalNum
      try {
        list = getByPath(res, responseFieldMap.listField)
        totalNum = getByPath(res, responseFieldMap.totalField)
      } catch (err) {
        // ignore
      }

      // If mapping didn't yield an array, try a list of common candidate paths
      if (!Array.isArray(list)) {
        const listCandidates = []
        if (responseFieldMap && responseFieldMap.listField) listCandidates.push(responseFieldMap.listField)
        // common fallback paths
        listCandidates.push('data.items', 'items', 'data', 'list')

        for (const p of listCandidates) {
          const v = getByPath(res, p)
          if (Array.isArray(v)) {
            list = v
            break
          }
        }

        // final fallback: if response itself is array
        if (!Array.isArray(list) && Array.isArray(res)) list = res
      }

      if (Array.isArray(list)) {
        setInternalData(list)

        // resolve total using mapping first, then common fields
        const totalCandidates = []
        if (responseFieldMap && responseFieldMap.totalField) totalCandidates.push(responseFieldMap.totalField)
        totalCandidates.push('total', 'count', 'data.total', 'data.count')

        let resolvedTotal
        for (const p of totalCandidates) {
          const v = getByPath(res, p)
          if (typeof v === 'number') {
            resolvedTotal = v
            break
          }
        }

        if (typeof resolvedTotal === 'number') setTotal(resolvedTotal)
        else setTotal(list.length)
      }
      return Promise.resolve(res)
    } catch (e) {
      console.error('fetchPage error', e)
      return Promise.reject(e)
    }
  }

  // autoLoad on mount when fetchUrl or fetchData provided and autoLoad true
  const autoLoadRef = useRef(false)
  const inFlightRef = useRef(false)

  useEffect(() => {
    if (!autoLoad) return
    const isServerMode = typeof fetchData === 'function' || typeof reloadPage === 'function' || fetchUrl
    if (!isServerMode) return
    // guard against React StrictMode double-invocation in dev
    if (autoLoadRef.current) return
    autoLoadRef.current = true

    // fetch initial page, avoid concurrent duplicate fetches
    const doFetch = async () => {
      if (inFlightRef.current) return
      inFlightRef.current = true
      try {
        await fetchPage(pagination.current, pagination.pageSize, sortState)
      } catch (e) {
        console.error('autoLoad fetchPage failed', e)
      } finally {
        inFlightRef.current = false
      }
    }

    doFetch()
  }, [])

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
    // server-mode helpers
    internalData,
    total,
    fetchPage,
    sortState,
    setSortState,
  }
}
