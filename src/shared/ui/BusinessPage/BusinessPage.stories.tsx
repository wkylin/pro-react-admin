import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'antd'
import BusinessPage, { BusinessToolbar } from './index'

const meta = {
  title: 'Shared/BusinessPage',
  component: BusinessPage,
  tags: ['autodocs'],
  args: {
    title: '业务页面标题',
    description: '这是一个业务页面的描述信息，用于说明页面的用途和功能。',
    children: (
      <div style={{ padding: 24 }}>
        <p>页面主要内容区域</p>
        <p>可以放置表格、表单、卡片等各种业务组件</p>
      </div>
    ),
  },
} satisfies Meta<typeof BusinessPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button>取消</Button>
        <Button type="primary">保存</Button>
      </>
    ),
  },
}

export const WithEyebrow: Story = {
  args: {
    eyebrow: <span style={{ color: '#1677ff' }}>✦ 重要功能</span>,
  },
}

export const WithToolbar: Story = {
  args: {
    toolbar: (
      <BusinessToolbar label="搜索和筛选">
        <input type="search" placeholder="搜索..." style={{ padding: '4px 8px' }} />
        <Button>筛选</Button>
      </BusinessToolbar>
    ),
  },
}

export const WithNotice: Story = {
  args: {
    notice: (
      <div
        style={{
          padding: 12,
          margin: '0 24px',
          background: '#e6f4ff',
          border: '1px solid #91caff',
          borderRadius: 4,
        }}
      >
        ℹ️ 这是一个通知信息
      </div>
    ),
  },
}

export const Complete: Story = {
  args: {
    eyebrow: <span style={{ color: '#1677ff' }}>✦ 完整示例</span>,
    actions: (
      <>
        <Button>取消</Button>
        <Button type="primary">保存</Button>
      </>
    ),
    notice: (
      <div
        style={{
          padding: 12,
          margin: '0 24px',
          background: '#fff7e6',
          border: '1px solid #ffd591',
          borderRadius: 4,
        }}
      >
        ⚠️ 修改后需要保存才能生效
      </div>
    ),
    toolbar: (
      <BusinessToolbar label="搜索和筛选" actions={<Button type="link">导出</Button>}>
        <input type="search" placeholder="搜索..." style={{ padding: '4px 8px' }} />
        <Button>筛选</Button>
      </BusinessToolbar>
    ),
    children: (
      <div style={{ padding: 24 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>业务内容 {i + 1}</p>
        ))}
      </div>
    ),
  },
}
