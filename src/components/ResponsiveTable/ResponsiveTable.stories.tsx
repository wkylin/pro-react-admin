import React from 'react'
// @ts-ignore: storybook types resolution can be environment-specific in CI/TS config
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { MemoryRouter } from 'react-router-dom'

import ResponsiveTable, { ResponsiveTableProps } from './index'

type NotificationRecord = {
  title: string
  description: string
  time: string
  read: string
}

const Demo: React.FC<ResponsiveTableProps<NotificationRecord>> = (props) => (
  <div style={{ height: 520 }}>
    <ResponsiveTable<NotificationRecord> {...props} />
  </div>
)

const meta: Meta<typeof Demo> = {
  title: 'ProReactAdmin/ResponsiveTable',
  component: Demo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    dataSource: [],
    columns: [],
  },
}

export default meta

export const Index: StoryObj<typeof Demo> = {
  args: {
    dataSource: [
      {
        title: '通知标题一',
        description: '这是通知内容这是通知内容这是通知内容这是通知内容这是通知内容',
        time: '2024-06-01 10:00',
        read: '未读',
      },
    ],
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '内容',
        dataIndex: 'description',
        ellipsis: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        width: 120,
      },
      {
        title: '状态',
        dataIndex: 'read',
        width: 80,
      },
    ],
  },
}

export const MultipleRows: StoryObj<typeof Demo> = {
  args: {
    dataSource: new Array(30).fill(null).map((_, i) => ({
      title: `通知标题 ${i + 1}`,
      description: `示例描述 - 第 ${i + 1} 条，测试长文本省略与分页。`,
      time: `2025-01-01 0${(i % 9) + 1}:00`,
      read: i % 3 === 0 ? '已读' : '未读',
    })),
    columns: [
      { title: '标题', dataIndex: 'title', width: 240 },
      { title: '内容', dataIndex: 'description', ellipsis: true },
      { title: '时间', dataIndex: 'time', width: 140 },
      { title: '状态', dataIndex: 'read', width: 100 },
    ],
    initialPagination: { current: 1, pageSize: 10 },
  },
}

export const ServerMode: StoryObj<typeof Demo> = {
  args: {
    // demonstrate server mode by providing fetchData that returns a page
    fetchData: async (page: number, pageSize: number) => {
      const total = 55
      const start = (page - 1) * pageSize
      const rows = new Array(Math.min(pageSize, total - start)).fill(null).map((_, i) => ({
        title: `远程通知 ${start + i + 1}`,
        description: `这是来自服务器的记录 ${start + i + 1}`,
        time: `2025-02-06 12:0${(i % 9) + 1}`,
        read: (start + i) % 2 === 0 ? '已读' : '未读',
      }))
      // simulate server response
      return Promise.resolve({ data: rows, total })
    },
    responseFieldMap: { listField: 'data', totalField: 'total' },
    columns: [
      { title: '标题', dataIndex: 'title' },
      { title: '内容', dataIndex: 'description', ellipsis: true },
      { title: '时间', dataIndex: 'time', width: 140 },
      { title: '状态', dataIndex: 'read', width: 100 },
    ],
    initialPagination: { current: 1, pageSize: 8 },
    autoLoad: true,
  },
}

export const SelectionAndActions: StoryObj<typeof Demo> = {
  args: {
    rowSelection: 'multiple' as any,
    actions: ['view', 'edit', { key: 'delete', label: '删除', confirm: '确认删除吗？' }],
    dataSource: new Array(12).fill(null).map((_, i) => ({
      title: `通知 ${i + 1}`,
      description: `示例记录 ${i + 1}`,
      time: `2025-01-01 0${(i % 9) + 1}:00`,
      read: i % 2 === 0 ? '已读' : '未读',
    })),
    columns: [
      { title: '标题', dataIndex: 'title', width: 260 },
      { title: '内容', dataIndex: 'description' },
      { title: '时间', dataIndex: 'time', width: 160 },
      { title: '状态', dataIndex: 'read', width: 100 },
    ],
  },
}

export const ToolbarSearch: StoryObj<typeof Demo> = {
  args: {
    toolbar: {
      actions: [
        { key: 'new', label: '新建' },
        { key: 'export', label: '导出' },
      ],
      search: {
        fields: [
          { name: 'title', label: '标题' },
          {
            name: 'read',
            label: '状态',
            type: 'select',
            options: [
              { label: '所有', value: '' },
              { label: '已读', value: '已读' },
              { label: '未读', value: '未读' },
            ],
          },
        ],
        initialValues: { read: '' },
      },
    },
    dataSource: new Array(8).fill(null).map((_, i) => ({
      title: `示例 ${i + 1}`,
      description: `搜索/筛选` + String(i + 1),
      time: '2025-04-01 09:00',
      read: i % 2 === 0 ? '已读' : '未读',
    })),
    columns: [
      { title: '标题', dataIndex: 'title' },
      { title: '内容', dataIndex: 'description', ellipsis: true },
      { title: '时间', dataIndex: 'time', width: 160 },
      { title: '状态', dataIndex: 'read', width: 100 },
    ],
  },
}
