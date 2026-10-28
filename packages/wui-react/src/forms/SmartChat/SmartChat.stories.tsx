import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Forms/SmartChat',
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
    apiUrl: '/storybook-chat',
    initialMessages: [{ role: 'assistant', content: '这是本地模拟回复，可以发送消息体验交互。' }],
    fetcher: async () =>
      new Response(
        `data: ${JSON.stringify({ content: '已收到消息：这是 Storybook 本地回复，无需 API 密钥。' })}\n\ndata: [DONE]\n\n`,
        {
          headers: { 'Content-Type': 'text/event-stream' },
        }
      ),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
