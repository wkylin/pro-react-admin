import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { Button, Card, Statistic, Switch, Space } from 'antd'
import { useStore } from '@/store'

const ZustandDemo = () => {
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  const asyncIncrement = useStore((state) => state.asyncIncrement)

  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const toggleSidebar = useStore((state) => state.toggleSidebar)

  return (
    <FixTabPanel>
      <div className="flex flex-col gap-6 p-6">
        <Card title="Zustand 计数器模块 (Counter Slice)">
          <div className="flex flex-col items-center gap-8">
            <Statistic title="当前计数" value={count} />
            <Space>
              <Button type="primary" onClick={increment}>
                +1 (同步)
              </Button>
              <Button onClick={decrement}>-1 (同步)</Button>
              <Button onClick={asyncIncrement}>+1 (异步/延时)</Button>
            </Space>
          </div>
        </Card>

        <Card title="Zustand 全局应用模块 (App Slice)">
          <div className="flex items-center gap-8">
            <Statistic
              title="侧边栏状态"
              value={isSidebarOpen ? '开启' : '关闭'}
              styles={{ content: { color: isSidebarOpen ? '#3f8600' : '#cf1322' } }}
            />
            <Space>
              <Switch checked={isSidebarOpen} onChange={toggleSidebar} checkedChildren="开" unCheckedChildren="关" />
              <Button onClick={toggleSidebar}>切换状态</Button>
            </Space>
          </div>
          <div className="mt-4 text-gray-500">* 此状态已配置持久化，刷新页面后状态会保持。</div>
        </Card>
      </div>
    </FixTabPanel>
  )
}

export default ZustandDemo
