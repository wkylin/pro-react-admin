import React from 'react'
// import ErrorBoundary from '@stateful/ErrorBoundary'
// import React, { useState, useEffect } from 'react'
import { reqFetch, useReqFetch } from '@src/service'
// import { useReqFetch, useGetFetch, reqFetch } from '@src/service'
import { Select, Table, Cascader, Space } from 'antd'
import FixTabPanel from '@src/components/stateless/FixTabPanel'
import { toFixed } from '@utils/aidFn'

// import ShopsList from './shopsList'
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

const viteEnvMode = import.meta?.env?.MODE ?? 'webapck env'
const viteEnvVariableValue = import.meta?.env?.VITE_GREETINGS ?? 'webapck env'

const ProDemo = () => {
  const [res, loading, error] = useReqFetch('https://my-json-server.typicode.com/wkylin/angular-json-server/react', {
    method: 'GET',
  })

  // const [booksRes, booksLoading, booksError] = useGetFetch('/faker/shops')

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
      .then((response) => {
        console.log(response)
      })
      .catch((errors) => {
        console.log('error', errors)
      })
  }
  return (
    <FixTabPanel>
      <h2>
        项目文档<span style={{ fontSize: 12, color: '#999', margin: '0 10px' }}>待完善</span>
      </h2>
      <h4>Mock API 示例</h4>
      <h4>useFetch: {loading ? 'Loading...' : error ? 'error' : JSON.stringify(res, null, 2)}</h4>
      {/* <h4>useFetch: {booksLoading ? 'Books Loading...' : booksError ? 'error' : JSON.stringify(booksRes, null, 2)}</h4> */}
      <h4 onClick={onFetch}>ErrorBoundary</h4>
      {/* <ErrorBoundary>
        <ShopsList />
      </ErrorBoundary> */}
      <h4>File Upload</h4>
      <FileUpload />

      <h4>TS 支持</h4>
      <TsDemo />

      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

      <Cascader options={options} expandTrigger="hover" placeholder="Please select" />

      <Select placeholder="Select a person" optionFilterProp="children">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="tom">Tom</Select.Option>
      </Select>
      {toFixed(0.75 * 100, 2)}

      <h3>Vite Env</h3>
      <Space>Mode: {viteEnvMode}</Space>
      <br />
      <Space>Variable value: {viteEnvVariableValue}</Space>

      <div style={{ height: 400 }}>Height For Scroll</div>
    </FixTabPanel>
  )
}

export default ProDemo
