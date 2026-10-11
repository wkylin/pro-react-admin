import FixTabPanel from '@shared/ui/FixTabPanel'
import { Button, Card, Statistic, Switch, Space, Typography } from 'antd'
import { useAppStore } from '@/store'
import { useZustandDemoStore } from './model/store'

const ZustandDemo = () => {
  const count = useZustandDemoStore((state) => state.count)
  const increment = useZustandDemoStore((state) => state.increment)
  const decrement = useZustandDemoStore((state) => state.decrement)
  const asyncIncrement = useZustandDemoStore((state) => state.asyncIncrement)

  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)

  const immerItems = useZustandDemoStore((state) => state.items)
  const pushImmerItem = useZustandDemoStore((state) => state.pushItem)
  const popImmerItem = useZustandDemoStore((state) => state.popItem)
  const clearImmerItems = useZustandDemoStore((state) => state.clearItems)

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
          <Typography.Text type="secondary" className="mt-4 block">
            * 侧边栏属于跨页面的全局应用状态，并配置为持久化。
          </Typography.Text>
        </Card>

        <Card title="Zustand + Immer 示例">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <Statistic title="Immer 列表长度" value={immerItems.length} />
              <Space>
                <Button onClick={pushImmerItem}>Push Item (immer)</Button>
                <Button onClick={popImmerItem}>Pop Item</Button>
                <Button onClick={clearImmerItems}>Clear</Button>
              </Space>
            </div>

            <div className="mt-2">
              <div className="text-sm text-gray-500">Items:</div>
              <div className="mt-2 max-h-40 overflow-auto">
                {immerItems.map((it) => (
                  <div key={it.id} className="border-b py-1">
                    {it.value}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-gray-500">
              * 这里用的是 Zustand 的 `immer` middleware：`set(draft =&gt; draft.xxx = ...)`。
            </div>
          </div>
        </Card>
      </div>
    </FixTabPanel>
  )
}

export default ZustandDemo
