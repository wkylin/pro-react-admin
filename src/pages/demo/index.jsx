import React from 'react'
import { Table } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
const columns = [
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    align: 'center',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    align: 'center',
    dataIndex: 'address',
  },
]
const ProDemo = () => {
  return (
    <FixTabPanel>
      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </FixTabPanel>
  )
}

export default ProDemo
