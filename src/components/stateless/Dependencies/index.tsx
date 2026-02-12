import React, { useState, useMemo } from 'react'
import { Table, Tabs, Typography, Input, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dependenciesData from '../../../data/dependencies.json'

const { Title } = Typography
const { TabPane } = Tabs
const { Search } = Input

interface Dependency {
  name: string
  version: string
}

const runtimeDependencies: Dependency[] = dependenciesData.runtime
const devDependencies: Dependency[] = dependenciesData.dev

const columns: ColumnsType<Dependency> = [
  {
    title: '依赖名称',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters: [
      { text: 'React 相关', value: 'react' },
      { text: 'Ant Design 相关', value: 'ant' },
      { text: 'TypeScript 相关', value: 'type' },
      { text: '测试相关', value: 'test' },
      { text: '构建相关', value: 'webpack|vite|babel' },
    ],
    onFilter: (value, record) => {
      const regex = new RegExp(value as string, 'i')
      return regex.test(record.name)
    },
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
    sorter: (a, b) => a.version.localeCompare(b.version),
  },
]

const Dependencies: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [activeTab, setActiveTab] = useState('1')

  const filteredRuntimeDeps = useMemo(() => {
    return runtimeDependencies.filter(
      (dep) =>
        dep.name.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.version.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [searchText])

  const filteredDevDeps = useMemo(() => {
    return devDependencies.filter(
      (dep) =>
        dep.name.toLowerCase().includes(searchText.toLowerCase()) ||
        dep.version.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [searchText])

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    setSearchText('') // 切换标签时清空搜索
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>项目依赖列表</Title>
      <Space direction="vertical" style={{ width: '100%', marginBottom: '16px' }}>
        <Search
          placeholder="搜索依赖名称或版本..."
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </Space>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab={`运行时依赖 (${filteredRuntimeDeps.length})`} key="1">
          <Table
            columns={columns}
            dataSource={filteredRuntimeDeps}
            rowKey="name"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
          />
        </TabPane>
        <TabPane tab={`开发依赖 (${filteredDevDeps.length})`} key="2">
          <Table
            columns={columns}
            dataSource={filteredDevDeps}
            rowKey="name"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Dependencies
