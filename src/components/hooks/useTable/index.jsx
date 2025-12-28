import React, { useState, useEffect } from 'react'

const useTable = (props) => {
  const { dataInterface, implemented = true, isPagination = true, paths = ['data'], payload = {} } = props
  const [rawData, setRawData] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(payload.pageNum || 1)
  const [pageSize, setPageSize] = useState(10)
  const [cachePayload, setCachePayload] = useState({ ...payload })
  const [loading, setLoading] = useState(!dataInterface)

  const onChange = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
    if (isPagination) {
      getTableList(dataInterface, { page, pageSize, ...payload })
    }
  }

  const getTableList = (dataInterface, { page = 1, pageSize = 10, ...other }) => {
    setLoading(true)
    if (!dataInterface || typeof dataInterface !== 'function') {
      setLoading(false)
      return
    }
    dataInterface({
      ...(isPagination ? { pageNum: page, pageSize } : {}),
      ...other
    }).then((resp) => {
      if (resp && resp.status === 1) {
        setPage(page)
        setPageSize(pageSize)
        try {
          let data = JSON.parse(JSON.stringify(resp))

          let _path = [...paths]
          while (_path.length) {
            data = data[_path[0]]
            _path = _path.slice(1)
          }

          if (Array.isArray(data)) {
            setTotal(data.length)
            setDataSource(data)
          } else {
            setTotal(data.total || 0)
            setDataSource(data.list || [])
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

  const resetTable = () => {
    setTotal(0)
    setPage(1)
    setPageSize(10)
    setDataSource([])
  }

  const updateTable = (params) => {
    const { dataInterface, payload } = params || {}
    const safePayload = payload && typeof payload === 'object' ? payload : {}

    setPage(safePayload.page || 1)
    setPageSize(safePayload.pageSize || 10)
    setCachePayload({ ...safePayload })
    getTableList(dataInterface || props.dataInterface, {
      ...cachePayload,
      ...safePayload
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
            showTotal: (total) => <span>{`共计 ${total} 条记录 第${page}/${Math.ceil(total / pageSize)}页`}</span>
          }
        : false,
      scroll: dataSource.length ? { scrollToFirstRowOnChange: true, x: 'max-content' } : false
    },
    page,
    pageSize,
    rawData,
    updateTable,
    resetTable
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
