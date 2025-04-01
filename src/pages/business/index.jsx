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
    grid: '1634270012',
    name: '中化学土木工程有限公司',
    list: [],
  },
  // {
  //   grid: '304300699',
  //   name: '上海市建筑装饰工程集团有限公司',
  //   list: [],
  // },
  // {
  //   grid: '325253024',
  //   name: '上海市工程建设咨询监理有限公司',
  //   list: [],
  // },
  // {
  //   grid: '307886242',
  //   name: '上海市住安建设发展股份有限公司',
  //   list: [],
  // },
  // {
  //   grid: '828163972',
  //   name: '中石化上海工程有限公司',
  //   list: [],
  // },
  // {
  //   grid: '2350706740',
  //   name: '上海璞奥电子科技有限公司',
  //   list: [],
  // },
  // {
  //   grid: '804448386',
  //   name: '上海江崎格力高南奉食品有限公司',
  //   list: [],
  // },
  // {
  //   grid: '787672126',
  //   name: '清水建设（中国）有限公司',
  //   list: [],
  // },
  // {
  //   grid: '137331760',
  //   name: '信息产业电子第十一设计研究院科技工程股份有限公司',
  //   list: [],
  // },
  // {
  //   grid: '2416780932',
  //   name: '上海子绵置业有限公司',
  //   list: [],
  // },
]

const Business = () => {
  const [fetchData, setFetchData] = useState(initialFetchData)

  useEffect(() => {
    const fetchAllData = async () => {
      const newFetchData = [...fetchData]
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
          newFetchData[i] = {
            ...item,
            list: res.data?.list || [],
          }
        } catch (error) {
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
          <Table columns={fixColumns} dataSource={item.list} pagination={false} />
        </section>
      ))}
    </FixTabPanel>
  )
}

export default Business
