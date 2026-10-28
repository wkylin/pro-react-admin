import { useState } from 'react'
import { Segmented } from 'antd'
import OrgChart from './index'

// 示例组织数据
const orgData = {
  id: 1,
  name: '总公司',
  children: [
    {
      id: 2,
      name: '技术部',
      children: [
        {
          id: 5,
          name: '前端组',
          children: [
            { id: 11, name: 'React 小组' },
            { id: 12, name: 'Vue 小组' },
            { id: 15, name: 'Angular 小组' },
            { id: 16, name: '移动端小组' },
          ],
        },
        {
          id: 6,
          name: '后端组',
          children: [
            { id: 13, name: 'Java 小组' },
            { id: 14, name: 'Python 小组' },
            { id: 17, name: 'Go 小组' },
            { id: 18, name: 'Node.js 小组' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: '市场部',
      children: [
        { id: 7, name: '推广组' },
        { id: 8, name: '销售组' },
        { id: 25, name: '品牌组' },
        { id: 26, name: '公关组' },
      ],
    },
    {
      id: 4,
      name: '人力资源部',
      children: [
        { id: 9, name: '招聘组' },
        { id: 10, name: '培训组' },
        { id: 27, name: '薪酬组' },
        { id: 28, name: '员工关系组' },
      ],
    },
  ],
}

function OrgChartDemo() {
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical')
  // 自定义样式
  const customStyles = {
    currentBox: {
      // 可以在这里覆盖默认样式
    },
    childBox: {
      // 可以在这里覆盖默认样式
    },
  }

  return (
    <div className="chart-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <Segmented
          aria-label="布局方向"
          value={orientation}
          options={[
            { label: '纵向', value: 'vertical' },
            { label: '横向', value: 'horizontal' },
          ]}
          onChange={(value) => setOrientation(value === 'horizontal' ? 'horizontal' : 'vertical')}
        />
      </div>
      <OrgChart
        data={orgData}
        orientation={orientation}
        defaultExpanded={true}
        highlightOnHover={true}
        animated={true}
        rootNodeClassName="custom-root-node"
        expandIcon="▶"
        collapseIcon={orientation === 'horizontal' ? '◀' : '▼'}
        showExpandIcon={true}
        customStyles={customStyles}
      />
    </div>
  )
}

const Component = OrgChartDemo

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Stateless/OrgChart',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
