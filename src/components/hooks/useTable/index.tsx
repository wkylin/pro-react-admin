import React, { useState, useEffect } from 'react'

export type TablePaginationInput = {
  page?: number
  pageNum?: number
  pageSize?: number
  [key: string]: unknown
}

export type TableApiResponse<TData = unknown> = {
  status?: number
  data?: TData
  [key: string]: unknown
}

export type TableResponseData<T> = T[] | { list?: T[]; total?: number }

export type TableDataInterface<TData, TPayload extends TablePaginationInput> = (
  params: Partial<TPayload> & { pageNum?: number; pageSize?: number }
) => Promise<TableApiResponse<TData>>

export type UseTableProps<
  T = Record<string, unknown>,
  TResponseData = TableResponseData<T>,
  TPayload extends TablePaginationInput = TablePaginationInput,
> = {
  dataInterface?: TableDataInterface<TResponseData, TPayload>
  implemented?: boolean
  isPagination?: boolean
  paths?: string[]
  payload?: TPayload
}

type TablePaginationConfig = {
  total: number
  size: 'default'
  current: number
  pageSize: number
  onChange: (page: number, pageSize: number) => void
  onShowSizeChange: (page: number, pageSize: number) => void
  showQuickJumper: boolean
  showSizeChanger: boolean
  hideOnSinglePage: boolean
  showTotal: (total: number) => React.ReactNode
}

type UseTableResult<T, TResponseData, TPayload extends TablePaginationInput> = {
  tableConfig: {
    loading: boolean
    dataSource: T[]
    pagination: TablePaginationConfig | false
    scroll: { scrollToFirstRowOnChange: boolean; x: 'max-content' } | false
  }
  page: number
  pageSize: number
  rawData: TResponseData | Record<string, never> | undefined
  updateTable: (params?: { dataInterface?: TableDataInterface<TResponseData, TPayload>; payload?: TPayload }) => void
  resetTable: () => void
}

const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'

function useTable<
  T = Record<string, unknown>,
  TResponseData = TableResponseData<T>,
  TPayload extends TablePaginationInput = TablePaginationInput,
>(props: UseTableProps<T, TResponseData, TPayload>): UseTableResult<T, TResponseData, TPayload> {
  const { dataInterface, implemented = true, isPagination = true, paths = ['data'], payload = {} as TPayload } = props
  const [rawData, setRawData] = useState<TResponseData | Record<string, never> | undefined>({})
  const [dataSource, setDataSource] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(payload.pageNum || 1)
  const [pageSize, setPageSize] = useState(10)
  const [cachePayload, setCachePayload] = useState<TPayload>({ ...payload })
  const [loading, setLoading] = useState(!dataInterface)

  const getTableList = (
    request: TableDataInterface<TResponseData, TPayload> | undefined,
    {
      page = 1,
      pageSize = 10,
      ...other
    }: Partial<TPayload> & {
      page?: number
      pageSize?: number
    }
  ) => {
    setLoading(true)
    if (!request || typeof request !== 'function') {
      setLoading(false)
      return
    }
    request({
      ...(isPagination ? { pageNum: page, pageSize } : {}),
      ...other,
    } as Partial<TPayload> & { pageNum?: number; pageSize?: number }).then((resp) => {
      if (resp && resp.status === 1) {
        setPage(page)
        setPageSize(pageSize)
        try {
          let data: unknown = JSON.parse(JSON.stringify(resp))

          let path = [...paths]
          while (path.length) {
            if (!isRecord(data)) {
              throw new TypeError('Response path does not resolve to an object')
            }
            data = data[path[0]]
            path = path.slice(1)
          }

          if (Array.isArray(data)) {
            setTotal(data.length)
            setDataSource(data as T[])
          } else if (isRecord(data)) {
            setTotal(typeof data.total === 'number' ? data.total : 0)
            setDataSource(Array.isArray(data.list) ? (data.list as T[]) : [])
          } else {
            setTotal(0)
            setDataSource([])
          }
        } catch {
          setTotal(0)
          setDataSource([])
        }
        setRawData(resp.data)
      }
      setLoading(false)
    })
  }

  const onChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
    if (isPagination) {
      getTableList(dataInterface, { page, pageSize, ...payload })
    }
  }

  const resetTable = () => {
    setTotal(0)
    setPage(1)
    setPageSize(10)
    setDataSource([])
  }

  const updateTable: UseTableResult<T, TResponseData, TPayload>['updateTable'] = (params) => {
    const { dataInterface: nextDataInterface, payload: nextPayload } = params || {}
    const safePayload = nextPayload && typeof nextPayload === 'object' ? nextPayload : ({} as TPayload)

    setPage(safePayload.page || 1)
    setPageSize(safePayload.pageSize || 10)
    setCachePayload({ ...safePayload } as TPayload)
    getTableList(nextDataInterface || props.dataInterface, {
      ...cachePayload,
      ...safePayload,
    })
  }

  useEffect(() => {
    if (implemented) {
      // 避免在 effect 中同步触发大量 setState，初始化 state 已在 useState 时完成。
      getTableList(dataInterface, { ...payload })
    }
  }, [JSON.stringify(payload), dataInterface, implemented])

  return {
    tableConfig: {
      loading,
      dataSource: [...dataSource],
      pagination: isPagination
        ? {
            total,
            size: 'default',
            current: page,
            pageSize,
            onChange,
            onShowSizeChange: onChange,
            showQuickJumper: true,
            showSizeChanger: true,
            hideOnSinglePage: false,
            showTotal: (total: number) => (
              <span>{`共计 ${total} 条记录 第${page}/${Math.ceil(total / pageSize)}页`}</span>
            ),
          }
        : false,
      scroll: dataSource.length ? { scrollToFirstRowOnChange: true, x: 'max-content' } : false,
    },
    page,
    pageSize,
    rawData,
    updateTable,
    resetTable,
  }
}
export default useTable

/**
 *
 * const [searchValues, setSearchValues] = useState({})
 * getResultData 请求方法
 * const { tableConfig, page, pageSize } = useTable({
    dataInterface: getResultData,
    payload: {
      key: 'url',
      ...searchValues,
    },
  });
 */
