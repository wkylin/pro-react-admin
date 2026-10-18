import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/SlideButton',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 360,
          padding: 24,
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { children: 'Button' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
