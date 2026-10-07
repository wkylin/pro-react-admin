import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import PHBarChart from '@stateless/PHBarChart'
import { useActivate } from '@/components/KeepAlive'

const PHBar = () => {
  // 当页面被激活时，通知 PHBarChart 组件重新初始化
  useActivate(() => {
    // 通过自定义事件通知图表组件重新初始化
    window.dispatchEvent(new CustomEvent('phbar-activate'))
  })

  return (
    <FixTabPanel>
      <PHBarChart />
    </FixTabPanel>
  )
}
export default PHBar
