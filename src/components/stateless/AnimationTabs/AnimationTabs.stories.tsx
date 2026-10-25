import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/AnimationTabs',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 420, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    contentClassName:
      'min-h-44 rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900',
    tabs: [
      {
        title: '概览',
        value: 'overview',
        content: (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">企业管理工作台</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">查看团队成员、角色和近期活动。</p>
          </div>
        ),
      },
      {
        title: '设置',
        value: 'settings',
        content: (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">项目配置与权限</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">管理项目选项及成员访问权限。</p>
          </div>
        ),
      },
    ],
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
