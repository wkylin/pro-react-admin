import { useEffect, useState } from 'react'
import { Table, type TableColumnsType } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { fetchCompanyCertificates, type CompanyCertificate } from '@src/service/api/company'

type Company = {
  grid: string
  name: string
  list: CompanyCertificate[]
}

const columns: TableColumnsType<CompanyCertificate> = [
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

const initialCompanies: Company[] = [
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
  const [companies, setCompanies] = useState(initialCompanies)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)

    void Promise.all(
      initialCompanies.map(async (company) => {
        try {
          const list = await fetchCompanyCertificates(company.grid)
          return { ...company, list }
        } catch (error) {
          console.error(`获取 ${company.name} 的资质数据失败:`, error)
          return company
        }
      })
    )
      .then((result) => {
        if (active) setCompanies(result)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <FixTabPanel>
      {companies.map((company, index) => (
        <section className="my-4" key={company.grid}>
          <section className="my-4 text-lg">
            {index + 1}
            <span>.</span> {company.name} : {company.list.length}
          </section>
          <Table
            loading={loading}
            columns={columns}
            dataSource={company.list}
            rowKey="certificateNo"
            pagination={false}
          />
        </section>
      ))}
    </FixTabPanel>
  )
}

export default Business
