import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const mockData = Array.from({ length: 30 }, (_, i) => ({
  name: `Item ${i + 1}`,
  category: ['A', 'B', 'C'][i % 3],
}))

const FixCarousel = ({ tradeList = [] }) => {
  const [data, setData] = useState([...tradeList, ...mockData])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const filters = [
    { label: '全部', value: 'all' },
    { label: '分类 A', value: 'A' },
    { label: '分类 B', value: 'B' },
    { label: '分类 C', value: 'C' },
  ]

  const filteredData = React.useMemo(() => {
    if (selectedFilter === 'all') return [...data]
    return data.filter((item) => selectedFilter.includes(item.category))
  }, [data, selectedFilter])

  const handleClear = () => {
    setSelectedFilter('all')
  }

  const itemsPerPage = 6
  const paginatedData = React.useMemo(() => {
    const pages = []
    for (let i = 0; i < filteredData.length; i += itemsPerPage) {
      pages.push(filteredData.slice(i, i + itemsPerPage))
    }
    return pages
  }, [filteredData])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const prevPage = () => setCurrentPage(Math.max(0, currentPage - 1))
  const nextPage = () => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
  const goToPage = (index) => setCurrentPage(index)

  useEffect(() => {
    // 当过滤条件或数据变更时，延迟将页码重置为 0，避免在 effect 中同步 setState
    const id = setTimeout(() => setCurrentPage(0), 0)
    return () => clearTimeout(id)
  }, [selectedFilter, data])

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="mb-4 flex justify-end">
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          className="w-[240px]"
          placeholder="请选择分类"
          options={filters}
        />
      </div>
      <div className="relative flex items-center justify-between">
        <Button className="cursor-pointer rounded-full" onClick={prevPage} disabled={currentPage === 0} shape="circle">
          <ChevronLeft />
        </Button>
        <div className="relative mx-4 flex-grow overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {paginatedData.length === 0 ? (
              <div className="w-full text-center text-gray-500">暂无数据</div>
            ) : (
              <>
                {paginatedData.map((page, pageIndex) => (
                  <div key={pageIndex} className="flex min-w-full flex-wrap justify-center">
                    {page.map((item, itemIndex) => (
                      <div key={itemIndex} className="w-1/3 p-2">
                        <div className="cus-bg mx-auto rounded-md border border-sky-500 p-4 text-center shadow-md">
                          <div className="mb-2 text-xl text-sky-500">{item.name}</div>
                          <div className="text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <Button
          className="cursor-pointer rounded-full"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1 || data.length === 0}
          shape="circle"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="mt-4 flex justify-center gap-4 space-x-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ring ring-blue-600/80 transition-colors duration-300 hover:bg-blue-600/80 ${
              currentPage === index ? 'bg-blue-600/80' : 'bg-white'
            }`}
            onClick={() => goToPage(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default FixCarousel
