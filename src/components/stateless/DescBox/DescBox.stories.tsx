import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/DescBox',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: '客户详情按容器宽度调整分栏，字段标签与选项首行对齐，长选项完整换行。',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div style={{ width: context.parameters.previewWidth, maxWidth: '100%', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Compact: Story = { parameters: { previewWidth: 720 } }
export const Narrow: Story = { parameters: { previewWidth: 360 } }
