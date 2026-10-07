import { createElement, useEffect, useState } from 'react'
import { Table, type TableColumnsType } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { http } from '@src/service/http'

type Certificate = {
  certificateName?: string
  certificateNo?: string
  certifyOrgName?: string
  issueDate?: string
  endDate?: string
  status?: string
}

type Company = {
  grid: string
  name: string
  list: Certificate[]
}

const fixColumns: TableColumnsType<Certificate> = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   render: (_text, _record, index) => index +1 ,
  // },
  {
    title: '资质名称',
    dataIndex: 'certificateName',
    render: (text: string | undefined) => text || '-',
  },
  {
    title: '证书编号',
    dataIndex: 'certificateNo',
    render: (text: string | undefined) => text || '-',
  },
  {
    title: '发证机构',
    dataIndex: 'certifyOrgName',
    render: (text: string | undefined) => text || '-',
  },
  {
    title: '发证日期',
    dataIndex: 'issueDate',
    render: (text: string | undefined) => text || '-',
  },
  {
    title: '有效期至',
    dataIndex: 'endDate',
    render: (text: string | undefined) => text || '-',
  },
  {
    title: '证书状态',
    dataIndex: 'status',
    render: (text: string | undefined) => text || '-',
  },
]

const initialFetchData: Company[] = [
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
          const res = await http.post(
            'https://capi.tianyancha.com/cloud-business-state/company/certificate/detail/list',
            {
              companyGid: item.grid,
              pageSize: 1000,
              pageNum: 1,
              certificateName: '-100',
              status: '-100',
              issueYear: '-100',
              searchKey: '',
              sortType: '',
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

  return createElement(
    FixTabPanel,
    null,
    <>
      {fetchData.map((item, index) => (
        <section className="my-4" key={item.grid}>
          <section className="my-4 text-lg">
            {index + 1}
            <span>.</span> {item.name} : {item.list.length}
          </section>
          <Table
            loading={loading}
            columns={fixColumns}
            dataSource={item.list}
            rowKey="certificateNo"
            pagination={false}
          />
        </section>
      ))}
    </>
  )
}

export default Business
