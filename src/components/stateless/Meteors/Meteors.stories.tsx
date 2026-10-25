import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/Meteors',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          height: 360,
          overflow: 'hidden',
          background: '#0b1326',
          fontSize: 12,
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { starCount: 70 },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
