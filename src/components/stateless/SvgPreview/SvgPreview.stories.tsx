import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/SvgPreview',
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
    svgSource:
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect x="20" y="20" width="360" height="160" rx="16" fill="#1677ff"/><text x="70" y="110" fill="white" font-size="24">Pro React Admin 6.0</text></svg>',
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
