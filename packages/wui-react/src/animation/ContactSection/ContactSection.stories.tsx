import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/ContactSection',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    docs: { source: { code: '<ContactSection text="与我们一起，构建更好的管理体验" />' } },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { text: '与我们一起，构建更好的管理体验' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
