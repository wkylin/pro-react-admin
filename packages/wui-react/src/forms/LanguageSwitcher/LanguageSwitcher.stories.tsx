import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Forms/LanguageSwitcher',
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
    language: 'en',
    options: [
      { value: 'en', label: 'English' },
      { value: 'zh', label: '中文' },
    ],
    onLanguageChange: () => {},
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
