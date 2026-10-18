import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/MemoizedStars',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          minHeight: 360,
          padding: 24,
          overflow: 'hidden',
          backgroundColor: '#0f172a',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
