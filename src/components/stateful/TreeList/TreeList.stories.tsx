import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'Components/Stateful/TreeList',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    search: true,
    selectable: true,
    setSelectedKeys: fn(),
    getTreeList: async () => ({
      status: 1,
      data: [
        { id: 'root', pid: null, name: '企业' },
        { id: 'tech', pid: 'root', name: '技术部' },
        { id: 'sales', pid: 'root', name: '市场部' },
      ],
    }),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { getTreeList: async () => ({ status: 1, data: [] }) } }
