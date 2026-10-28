import type { TransferHistoryGroup } from './index'
const transferData: TransferHistoryGroup[] = [
  {
    name: '转让历史',
    id: '1',
    level: 1,
    children: [
      {
        name: '山东AI科技股份有限公司',
        id: '1-1',
        level: 2,
        children: [
          {
            name: '科技股份有限公司第一公司',
            value: '2022年8月8号',
            id: '1-1-1',
            level: 3,
          },
          {
            name: '科技股份有限公司第二公司',
            value: '2023年6月6号',
            id: '1-1-2',
            level: 3,
          },
          {
            name: '科技股份有限公司第三公司',
            value: '2024年9月9号',
            id: '1-1-3',
            level: 3,
          },
        ],
        ratio: '85%',
      },
      {
        name: '广东发展有限公司',
        id: '1-2',
        level: 2,
        children: [
          {
            name: '广东发展有限公司分公司',
            value: '2024年5月1号',
            id: '1-2-1',
            level: 3,
          },
        ],
        ratio: '55%',
      },
      {
        name: '科技发展股份有限公司',
        id: '1-3',
        level: 2,
        children: [
          {
            name: '科技股份有限公司一',
            value: '2022年7月31号',
            id: '1-3-1',
            level: 3,
          },
          {
            name: '科技股份有限公司二',
            value: '2023年8月1号',
            id: '1-3-2',
            level: 3,
          },
        ],
        ratio: '35%',
      },
      {
        name: '第四家公司',
        id: '1-4',
        level: 2,
        children: [
          {
            name: '受让方第四分公司',
            value: '2021年8月20号',
            id: '1-4-1',
            level: 3,
          },
        ],
        ratio: '25%',
      },
      {
        name: '第五家公司',
        id: '1-5',
        level: 2,
        children: [
          {
            name: '受让方第五分公司',
            value: '2020年6月6号',
            id: '1-5-1',
            level: 3,
          },
        ],
        ratio: '15%',
      },
    ],
  },
]

import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/TransferHistory',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { groups: transferData, defaultDisplayCount: 3 },
  argTypes: {
    defaultDisplayCount: { control: { type: 'range', min: 1, max: 5, step: 1 } },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleCompany: Story = {
  args: { groups: transferData, defaultDisplayCount: 1 },
}

export const AllCompanies: Story = {
  args: { groups: transferData, defaultDisplayCount: 5 },
}
