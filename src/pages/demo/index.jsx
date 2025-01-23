import React from 'react'
import { Table } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import AnimationTabs from '@stateless/AnimationTabs'
const columns = [
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'Age',
    align: 'center',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Address',
    align: 'center',
    dataIndex: 'address'
  }
]

const tabs = [
  {
    title: 'Product',
    value: 'product',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Product Tab</p>
      </div>
    )
  },
  {
    title: 'Services',
    value: 'services',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Services tab</p>
      </div>
    )
  },
  {
    title: 'Playground',
    value: 'playground',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Playground tab</p>
      </div>
    )
  },
  {
    title: 'Content',
    value: 'content',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Content tab</p>
      </div>
    )
  },
  {
    title: 'Random',
    value: 'random',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Random tab</p>
      </div>
    )
  }
]
const ProDemo = () => {
  return (
    <FixTabPanel>
      <div className='h-[20rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start'>
        <AnimationTabs tabs={tabs} />
      </div>
      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </FixTabPanel>
  )
}

export default ProDemo
