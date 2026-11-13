import type { Meta, StoryObj } from '@storybook/react'
import MinimizeHandle from './index'

const meta = {
  title: 'WUI/Components/MinimizeHandle',
  component: MinimizeHandle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '48px 24px 24px' }}>
        <div
          style={{
            position: 'relative',
            width: 390,
            maxWidth: '100%',
            padding: 24,
            boxSizing: 'border-box',
            border: '1px solid rgba(255, 255, 255, .1)',
            borderRadius: 22,
            background: '#2a2038',
            color: '#f7f4fc',
          }}
        >
          <Story />
          在现有面板中单独使用提手。
        </div>
      </div>
    ),
  ],
  args: { label: '收起面板', flashing: false },
  argTypes: { onClick: { action: 'click' } },
} satisfies Meta<typeof MinimizeHandle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Flashing: Story = { args: { flashing: true } }

export const Disabled: Story = { args: { disabled: true } }
