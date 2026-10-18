import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/ApiStateHandler',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { loading: false, error: null, children: <p>数据加载成功</p> },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = { args: { loading: true } }
export const Failure: Story = { args: { error: new Error('加载失败') } }
