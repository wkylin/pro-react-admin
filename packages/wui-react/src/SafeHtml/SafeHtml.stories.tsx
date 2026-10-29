import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Components/SafeHtml',
  component: Component,
  args: {
    html: '<h2>安全 HTML</h2><p><strong>允许的格式</strong>会保留。</p><script>alert(1)</script><img src=x onerror=alert(1)>',
  },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const PlainText: Story = { args: { html: '<p>普通文本和 <strong>粗体</strong></p>' } }
