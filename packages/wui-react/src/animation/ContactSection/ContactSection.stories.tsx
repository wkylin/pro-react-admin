import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component, { type ContactSectionProps } from './index'

function ScrollPreview(args: ContactSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={scrollContainerRef}
      aria-label="联系文案滚动预览"
      style={{
        height: 440,
        maxWidth: '100%',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        scrollbarGutter: 'stable',
        border: '1px solid #d9e5f2',
        borderRadius: 16,
        background: '#f8fbff',
      }}
    >
      <p style={{ margin: 0, padding: '32px 24px', color: '#52677e' }}>在此预览区向下滚动，观察文字逐字显现 ↓</p>
      <Component {...args} scrollContainerRef={scrollContainerRef} />
      <p style={{ margin: 0, padding: '48px 24px', color: '#52677e', textAlign: 'center' }}>预览结束</p>
    </div>
  )
}

const meta = {
  title: 'Components/Stateless/ContactSection',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        code: `const scrollContainerRef = useRef<HTMLDivElement>(null)

<div ref={scrollContainerRef} style={{ height: 440, overflowY: 'auto', overscrollBehavior: 'contain' }}>
  <ContactSection text="与我们一起，构建更好的管理体验" scrollContainerRef={scrollContainerRef} />
</div>`,
      },
    },
  },
  args: { text: '与我们一起，构建更好的管理体验' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <ScrollPreview {...args} /> }
