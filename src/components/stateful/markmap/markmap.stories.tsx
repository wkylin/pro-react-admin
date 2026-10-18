import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateful/markmap',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { markmap: '# Pro React Admin 5.0\n## 企业管理\n- 用户\n- 角色\n## 工程化\n- 多项目\n- 微前端' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
