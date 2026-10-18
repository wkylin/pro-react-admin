import { createElement } from 'react'
import { Table, type TableColumnsType } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'
import type { Certificate } from '../model/types'
import { useCompanyCertificates } from '../hooks/useCompanyCertificates'

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

const Business = () => {
  const { companies: fetchData, loading } = useCompanyCertificates()

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
