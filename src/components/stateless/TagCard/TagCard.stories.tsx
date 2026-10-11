import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/TagCard',
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
    tagCardList: [
      { id: 'a', name: '前端技术', tags: [{ name: 'React 19' }, { name: 'TypeScript 6' }] },
      { id: 'b', name: '工程化', tags: [{ name: 'Webpack 5' }] },
    ],
    showMax: 1,
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
