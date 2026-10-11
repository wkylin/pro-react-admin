import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'WUI/Components/WatermarkProvider',
  component: Component,
  tags: ['autodocs'],
  args: {
    content: 'Pro React Admin 5.0',
    containerId: 'storybook-watermark',
    children: <div style={{ height: 320, padding: 24 }}>带水印的业务内容</div>,
  },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
