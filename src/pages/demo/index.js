import React from 'react'
import ErrorBoundary from '@stateful/ErrorBoundary'
// import React, { useState, useEffect } from 'react'
// import { reqFetch } from '@src/service'
import { useReqFetch, useGetFetch, reqFetch } from '@src/service'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Select, Table, Cascader, Tabs } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import rootAction from '@src/actions'

import ShopsList from './shopsList'
import FileUpload from './fileUpload'
import TsDemo from './tsDemo'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

const ProDemo = () => {
  const inReducer = useSelector((state) => state.inReducer)
  const deReducer = useSelector((state) => state.deReducer)

  const dispatch = useDispatch()

  const [res, loading, error] = useReqFetch('/faker/app/api/user/list', {
    method: 'GET',
  })

  const [booksRes, booksLoading, booksError] = useGetFetch('/faker/shops')

  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)
  // const [res, setRes] = useState([])

  // const useAsyncFetch = async (canceled, controller) => {
  //   try {
  //     if (loading) return
  //     setLoading(true)
  //     const res = await reqFetch('/mocker/app/api/user/list', {
  //       method: 'GET',
  //       controller,
  //     })
  //     if (!canceled) {
  //       setRes(res)
  //     }
  //   } catch (error) {
  //     setError(true)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // useEffect(() => {
  //   const controller = new AbortController()
  //   let canceled = false
  //   useAsyncFetch(canceled, controller)
  //   return () => {
  //     setRes(() => {})
  //     canceled = true
  //     controller.abort()
  //   }
  // }, [])

  const onFetch = () => {
    reqFetch('/faker/shops', { method: 'GET' })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <FixTabPanel>
      <h2>
        项目文档<span style={{ fontSize: 12, color: '#999', margin: '0 10px' }}>待完善</span>
      </h2>
      <h4>Mock API 示例</h4>
      <h4>useFetch: {loading ? 'Loading...' : error ? 'error' : JSON.stringify(res, null, 2)}</h4>
      <h4>useFetch: {booksLoading ? 'Books Loading...' : booksError ? 'error' : JSON.stringify(booksRes, null, 2)}</h4>
      <h4>Redux 示例:</h4>
      <Space>
        <Space>
          <Button type="primary" onClick={() => dispatch(rootAction.inAction.increment(1))}>
            Increment
          </Button>
          {inReducer.inNumber}
        </Space>
        <Space>
          <Button onClick={() => dispatch(rootAction.deAction.decrement(2))}>Decrement</Button>
          {deReducer.deNumber}
        </Space>
      </Space>
      <h4 onClick={onFetch}>ErrorBoundary</h4>
      <ErrorBoundary>
        <ShopsList />
      </ErrorBoundary>
      <h4>File Upload</h4>
      <FileUpload />
      <Select placeholder="Select a person" optionFilterProp="children">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="tom">Tom</Select.Option>
      </Select>
      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

      <Cascader options={options} expandTrigger="hover" placeholder="Please select" />

      <TsDemo />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
      <div style={{ height: 400 }}>Height For Scroll</div>
    </FixTabPanel>
  )
}

export default ProDemo
