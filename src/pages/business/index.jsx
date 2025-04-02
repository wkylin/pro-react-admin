import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { postFetch, getFetch } from '@src/service/'

const fixColumns = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   render: (_text, _record, index) => index +1 ,
  // },
  {
    title: '资质名称',
    dataIndex: 'certificateName',
    render: (text, _record, index) => text || '-',
  },
  {
    title: '证书编号',
    dataIndex: 'certificateNo',
    render: (text, _record, index) => text || '-',
  },
  {
    title: '发证机构',
    dataIndex: 'certifyOrgName',
    render: (text, _record, index) => text || '-',
  },
  {
    title: '发证日期',
    dataIndex: 'issueDate',
    render: (text, _record, index) => text || '-',
  },
  {
    title: '有效期至',
    dataIndex: 'endDate',
    render: (text, _record, index) => text || '-',
  },
  {
    title: '证书状态',
    dataIndex: 'status',
    render: (text, _record, index) => text || '-',
  },
]

const initialFetchData = [
  {
    grid: '2316258212',
    name: '上海徐汇规划建筑设计有限公司',
    list: [],
  },
  {
    grid: '551517222',
    name: '中交第一公路勘察设计研究院有限公司',
    list: [],
  },
]

const Business = () => {
  const [fetchData, setFetchData] = useState(initialFetchData)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchAllData = async () => {
      const newFetchData = [...fetchData]
      setLoading(true)
      for (let i = 0; i < newFetchData.length; i++) {
        const item = newFetchData[i]
        try {
          const res = await postFetch(
            'https://capi.tianyancha.com/cloud-business-state/company/certificate/detail/list',
            {
              payload: {
                companyGid: item.grid,
                pageSize: 1000,
                pageNum: 1,
                certificateName: '-100',
                status: '-100',
                issueYear: '-100',
                searchKey: '',
                sortType: '',
              },
            }
          )
          setLoading(false)
          newFetchData[i] = {
            ...item,
            list: res.data?.list || [],
          }
        } catch (error) {
          setLoading(false)
          console.error('数据请求失败:', error)
        }
      }
      setFetchData(newFetchData)
    }
    fetchAllData()
  }, [])

  return (
    <FixTabPanel>
      {fetchData.map((item, index) => (
        <section className="my-4" key={item.grid}>
          <section className="my-4 text-lg">
            {index + 1}
            <span>.</span> {item.name} : {item.list.length}
          </section>
          <Table loading={loading} columns={fixColumns} dataSource={item.list} pagination={false} />
        </section>
      ))}
    </FixTabPanel>
  )
}

export default Business
