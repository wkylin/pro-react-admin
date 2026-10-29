import type { Meta, StoryObj } from '@storybook/react'
import { useRef, type ComponentProps } from 'react'
import Component from './index'

function WithContainerRef(args: ComponentProps<typeof Component>) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} style={{ height: 360, overflowY: 'auto', position: 'relative' }}>
      <Component {...args} scrollContainerRef={ref} />
    </div>
  )
}

const meta = {
  title: 'WUI/Components/ScrollableSections',
  component: Component,
  parameters: {
    docs: {
      description: {
        component:
          '滚动时导航跟随当前区块，点击导航平滑定位。省略 scrollContainerRef 时识别最近的滚动祖先，无滚动祖先时使用窗口；也可显式指定容器。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 420, overflow: 'auto', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    sections: [
      { title: '概览', content: '企业工作台' },
      { title: '设置', content: '项目与权限设置' },
      { title: '审计', content: '服务端审计记录' },
    ],
  },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const ExplicitContainer: Story = { render: (args) => <WithContainerRef {...args} /> }

export const Empty: Story = { args: { sections: [] } }
