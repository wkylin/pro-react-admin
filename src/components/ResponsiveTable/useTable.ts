import { useState, useRef, useEffect, useMemo } from 'react'

// --- Type helpers ---
export type RequestParamMap = {
  pageField: string
  pageSizeField: string
  sortField: string
  orderField: string
}

export type ResponseFieldMap = {
  listField: string
  totalField: string
}

export type UseTableOptions<T = any> = {
  dataSource?: T[]
  initialPagination?: { current: number; pageSize: number }
  minBodyHeight?: number
  minWidth?: number
  pageSyncToUrl?: boolean
  onPaginationChange?: (pagination: { current: number; pageSize: number }) => void
  reloadPage?: ((page: number, pageSize: number) => Promise<any>) | null
  fetchData?: ((page: number, pageSize: number, sort?: any, extraParams?: any) => Promise<any>) | null
  fetchUrl?: string | null
  requestLib?: any
  requestMethod?: string
  mergeSearchToFetch?: boolean
  mergeSearchToFetchOnce?: boolean
  clearUrlAfterInitialMerge?: boolean
  initialSearch?: Record<string, any>
  requestParamMap?: RequestParamMap
  responseFieldMap?: ResponseFieldMap
  autoLoad?: boolean
  serverSort?: boolean
  defaultSort?: any
  selectionMode?: 'multiple' | 'single' | 'none'
  rowSelectable?: ((record: T) => boolean) | string | null
}

export type UseTableReturn<T = any> = {
  containerRef: ReturnType<typeof useRef>
  pagination: { current: number; pageSize: number }
  setPagination: (
    p:
      | { current: number; pageSize: number }
      | ((prev: { current: number; pageSize: number }) => {
          current: number
          pageSize: number
        })
  ) => void
  tableScroll: { x: number; y: number }
  pagedData: T[]
  handleDelete: (deleteFn: (record?: T) => Promise<any>, record?: T) => Promise<void>
  selectedRowKeys: Array<React.Key>
  setSelectedRowKeys: (keys: Array<React.Key>) => void
  handleSelectionChange: (keys: Array<React.Key>, rows: T[]) => { keys: Array<React.Key>; rows: T[] }
  selectionMode: 'multiple' | 'single' | 'none'
  isRowSelectable: (record: T) => boolean
  calcIndex: (localIndex: number) => number
  internalData?: T[]
  total?: number
  fetchPage: (page?: number, pageSize?: number, sort?: any, extraParams?: any) => Promise<any>
  sortState?: any
  setSortState?: (s: any) => void
  hasMergedInitialSearch?: () => boolean
}
import request from '@/service/request'

// useTable: 提供分页管理、响应式 scroll 计算，以及删除后回退上一页的辅助方法
//
// 重要变更：fetchPage 支持第四个参数 `extraParams`，用于传递来自查询表单的过滤条件。
// fetchPage(page, pageSize, sort, extraParams) 会把 extraParams 合并到通过 `fetchUrl` 发出的请求参数中；
// 如果使用自定义 `fetchData`/`reloadPage`，则会以第四个参数的形式传入（向后兼容旧签名）。
export default function useTable<T = any>(opts: UseTableOptions<T> = {}): UseTableReturn<T> {
  const {
    dataSource = [],
    initialPagination = { current: 1, pageSize: 10 },
    minBodyHeight = 120,
    minWidth = 600,
    pageSyncToUrl = false,
    onPaginationChange = () => {},
    reloadPage = null,
    fetchData = null,
    fetchUrl = null,
    requestLib = request,
    requestMethod = 'get',
    mergeSearchToFetch = false,
    mergeSearchToFetchOnce = false,
    clearUrlAfterInitialMerge = true,
    initialSearch = {},
    requestParamMap = {
      pageField: 'page',
      pageSizeField: 'pageSize',
      sortField: 'sort',
      orderField: 'order',
    },
    responseFieldMap = { listField: 'data', totalField: 'total' },
    autoLoad = false,
    serverSort = false,
    defaultSort = null,
    selectionMode = 'multiple',
    rowSelectable = null,
  } = opts
  // ensure serverSort is referenced (used by consumer components); keep a no-op to avoid TS unused error
  void serverSort
  const containerRef = useRef<HTMLDivElement | null>(null)
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
  const [tableScroll, setTableScroll] = useState({
    x: Math.max(minWidth, 800),
    y: 280,
  })

  // 同步 URL（可选）
  useEffect(() => {
    if (!pageSyncToUrl) return
    const params = new URLSearchParams(window.location.search)
    const pageStr = params.get('page')
    const current = pageStr ? parseInt(pageStr, 10) : null
    const pageSizeStr = params.get('pageSize')
    const pageSize = pageSizeStr ? parseInt(pageSizeStr, 10) : null
    if (current !== null || pageSize !== null) {
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
  const getByPath = (obj: any, path: string) => {
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
    const node = containerRef.current as HTMLDivElement | null
    if (!node) return

    const calc = () => {
      const rect = node.getBoundingClientRect()

      // Prefer clientHeight when available (excludes border), fallback to rect.height
      const containerH =
        typeof node.clientHeight === 'number' && node.clientHeight > 0
          ? Math.floor(node.clientHeight)
          : typeof rect.height === 'number' && rect.height > 0
            ? Math.floor(rect.height)
            : minBodyHeight + 120

      const width = Math.max(Math.floor(rect.width || minWidth), minWidth)

      // table header inside the antd Table
      const headerEl =
        node.querySelector<HTMLElement>('.ant-table-header') || node.querySelector<HTMLElement>('.ant-table-thead')
      const headerH = headerEl ? headerEl.offsetHeight : 56

      // toolbar (top actions / search) - subtract its height if present
      const toolbarEl = node.querySelector<HTMLElement>('.responsive-table-toolbar')
      const toolbarH = toolbarEl ? toolbarEl.offsetHeight : 0

      const footerH = 64 // pagination area
      const padding = 16

      // available space for table body inside container
      const availableBodyH = containerH - toolbarH - headerH - footerH - padding

      // If availableBodyH is smaller than minBodyHeight, we allow shrinking
      // to avoid creating an outer vertical scrollbar. But keep a hard lower
      // bound so table remains usable.
      const hardMin = 50
      let bodyH = availableBodyH
      if (availableBodyH <= 0) bodyH = hardMin
      else if (availableBodyH < minBodyHeight) bodyH = Math.max(hardMin, availableBodyH)

      setTableScroll({
        x: Math.max(width, minWidth),
        y: Math.max(bodyH, hardMin),
      })
    }

    calc()
    const ro = new ResizeObserver(() => calc())
    ro.observe(node)
    return () => ro.disconnect()
  }, [containerRef, minBodyHeight, minWidth, pagination.pageSize])

  // 删除后处理：deleteFn 应返回 Promise；如果当前页删除后无条目且页码>1，则自动回退并触发 reload
  const handleDelete = async (deleteFn: (record?: T) => Promise<any>, record?: T) => {
    if (typeof deleteFn !== 'function') throw new Error('deleteFn must be a function')
    // 执行删除
    await Promise.resolve(deleteFn(record))

    const { current, pageSize } = pagination
    // 如果本页只有一条（将被删除），尝试回退到上一页
    if (pagedData && pagedData.length <= 1 && current > 1) {
      const prev = current - 1
      setPagination((p) => ({ ...p, current: prev }))
      try {
        // only include initialSearch if mergeSearchToFetch is enabled and
        // either not configured to merge-once or hasn't merged yet
        const includeSearch = mergeSearchToFetch && (!mergeSearchToFetchOnce || !initialMergedRef.current)
        const extra = includeSearch ? initialSearch || {} : undefined
        await fetchPage(prev, pageSize, undefined, extra)
      } catch {
        // ignore - caller can handle
      }
    } else {
      // 否则重新加载当前页
      try {
        const includeSearch = mergeSearchToFetch && (!mergeSearchToFetchOnce || !initialMergedRef.current)
        const extra = includeSearch ? initialSearch || {} : undefined
        await fetchPage(current, pageSize, undefined, extra)
      } catch {
        // ignore
      }
    }
  }

  // 选择相关
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const handleSelectionChange = (keys: Array<React.Key>, rows: T[]) => {
    setSelectedRowKeys(keys || [])
    return { keys, rows }
  }

  // 计算序号（基于分页）
  const calcIndex = (localIndex: number) => {
    const { current, pageSize } = pagination
    return (current - 1) * pageSize + (localIndex || 0) + 1
  }

  // 默认 rowSelectable 函数（如果未提供，所有行可选）
  const isRowSelectable = (record: T) => {
    if (typeof rowSelectable === 'function') return !!rowSelectable(record)
    // 如果传入的是字符串字段名，用其为 key 判断 truthy 值表示可选
    if (typeof rowSelectable === 'string') return !!(record as any)[rowSelectable]
    return true
  }

  // fetch page helper（用于服务端模式）
  // fetchPage 支持可选的 extraParams（例如查询表单的 filter 字段）
  const fetchPage = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    sort = sortState,
    extraParams = {}
  ) => {
    const fetcher = fetchData || reloadPage
    try {
      let res
      if (typeof fetcher === 'function') {
        // 兼容性：向后兼容旧的 fetcher 签名，额外的参数会被忽略
        res = await fetcher(page, pageSize, sort, extraParams)
      } else if (fetchUrl) {
        // build params according to requestParamMap
        const params: Record<string, any> = {}
        // if mergeSearchToFetch is enabled, merge initialSearch first (so extraParams override)
        if (mergeSearchToFetch && initialSearch && typeof initialSearch === 'object') {
          // if configured to merge only once, ensure we only merge the first time
          if (!mergeSearchToFetchOnce || !initialMergedRef.current) {
            Object.assign(params, initialSearch)
            // mark as merged
            initialMergedRef.current = true

            // optionally clear the used query keys from the URL to avoid user confusion
            try {
              if (clearUrlAfterInitialMerge && typeof window !== 'undefined' && window && window.location) {
                const usedKeys = Object.keys(initialSearch || {})
                if (usedKeys.length > 0) {
                  const sp = new URLSearchParams(window.location.search)
                  for (const k of usedKeys) sp.delete(k)
                  const qs = sp.toString()
                  const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
                  window.history.replaceState({}, '', newUrl)
                }
              }
            } catch {
              // ignore URL modification errors
            }
          }
        }
        // merge extraParams so explicit page/pageSize/sort override if provided
        Object.assign(params, extraParams || {})
        // use configured pageField to represent current page
        if (requestParamMap.pageField) params[requestParamMap.pageField] = page
        params[requestParamMap.pageSizeField] = pageSize
        if (sort && sort.field) params[requestParamMap.sortField] = sort.field
        if (sort && sort.order) params[requestParamMap.orderField] = sort.order
        // choose request method
        const method = (requestMethod || 'get').toLowerCase()
        try {
          if (method === 'get') {
            res = await requestLib.get(fetchUrl, params)
          } else if (typeof requestLib[method] === 'function') {
            // POST/PUT etc: send params as body
            res = await requestLib[method](fetchUrl, params)
          } else {
            // fallback to get
            res = await requestLib.get(fetchUrl, params)
          }
        } catch (e) {
          console.error('fetchPage request failed', e)
          res = null
        }
      } else {
        return Promise.resolve()
      }
      if (!res) return Promise.resolve(res)

      // Try using responseFieldMap first (listField / totalField)
      let list: any = undefined
      try {
        list = getByPath(res, responseFieldMap.listField)
      } catch {
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
        let totalCandidates = []
        if (responseFieldMap && responseFieldMap.totalField) totalCandidates.push(responseFieldMap.totalField)
        totalCandidates.push('total', 'count', 'data.total', 'data.count')

        let resolvedTotal = undefined
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
  const initialMergedRef = useRef(false)

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
        // let fetchPage handle merging initialSearch according to mergeSearchToFetch/Once
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
    // indicate whether initialSearch has been merged already
    hasMergedInitialSearch: () => !!initialMergedRef.current,
  }
}
