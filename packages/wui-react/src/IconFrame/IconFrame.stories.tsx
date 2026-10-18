import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'WUI/Components/IconFrame',
  component: Component,
  tags: ['autodocs'],
  args: { children: <span aria-label="设置">⚙</span> },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
