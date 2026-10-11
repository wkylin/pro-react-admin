import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'WUI/Components/SliderCaptcha',
  component: Component,
  tags: ['autodocs'],
  args: { difficulty: 'easy', onSuccess: fn(), onFail: fn(), onRefresh: fn() },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const Hard: Story = { args: { difficulty: 'hard' } }
