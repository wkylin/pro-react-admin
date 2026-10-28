import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'WUI/Forms/CheckableTags',
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
    dataSource: [
      {
        title: '技术栈',
        key: 'stack',
        data: [
          { name: 'React', key: 'react' },
          { name: 'TypeScript', key: 'ts' },
        ],
      },
    ],
    onChange: fn(),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleSelection: Story = { args: { single: true } }
export const Preselected: Story = { args: { defaultCheckedKeys: { stack: ['react'] } } }
