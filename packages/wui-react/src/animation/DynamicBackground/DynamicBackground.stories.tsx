import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'
import icons from './story-icons'

const meta = {
  title: 'Components/Stateless/DynamicBackground',
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
    items: icons.map((item) => ({ ...item, size: item.size as 'sm' | 'md' | 'lg' })),
    children: (
      <>
        <h1>Grow your Frontend Skills</h1>
        <p>with React, Angular, Vue and TypeScript</p>
      </>
    ),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
