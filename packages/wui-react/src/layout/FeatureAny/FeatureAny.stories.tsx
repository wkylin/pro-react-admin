import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
const featureDemoData = [
  {
    title: '《咏柳》—— 贺知章',
    content: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。',
    srcImage: SpringPng,
  },
  {
    title: '《小池》—— 杨万里',
    content: '泉眼无声惜细流，树阴照水爱晴柔。小荷才露尖尖角，早有蜻蜓立上头。',
    srcImage: HePng,
  },
  {
    title: '《山居秋暝》—— 王维',
    content: '空山新雨后，天气晚来秋。明月松间照，清泉石上流。',
    srcImage: SongPng,
  },
  {
    title: '《逢雪宿芙蓉山主人》—— 刘长卿',
    content: '日暮苍山远，天寒白屋贫。柴门闻犬吠，风雪夜归人。',
    srcImage: XuePng,
  },
]

const meta = {
  title: 'Components/Stateless/FeatureAny',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { data: featureDemoData },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
