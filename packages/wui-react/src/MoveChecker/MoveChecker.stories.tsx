import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'WUI/Components/MoveChecker',
  component: Component,
  tags: ['autodocs'],
  args: { initialText: '向右拖动完成验证', successText: '验证成功', onResult: fn() },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const CustomText: Story = { args: { initialText: '拖动滑块继续', successText: '可以继续' } }
