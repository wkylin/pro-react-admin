import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import HandlePanel, { type HandlePanelProps } from './index'

const meta = {
  title: 'WUI/Components/HandlePanel',
  component: HandlePanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '48px 24px 24px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: '收起面板',
    flashing: false,
    variant: 'border',
    children: <div style={{ padding: 16 }}>点击右上方提手，通知调用方收起面板。</div>,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['border', 'inset'] },
    onMinimize: { action: 'minimize' },
  },
} satisfies Meta<typeof HandlePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inset: Story = { args: { variant: 'inset' } }

export const Flashing: Story = { args: { flashing: true } }

export const InsetFlashing: Story = { args: { variant: 'inset', flashing: true } }

export const Light: Story = {
  args: {
    style: {
      '--panel-background': '#fff',
      '--panel-border': 'rgba(22, 17, 31, .1)',
      '--panel-ink': '#21172d',
      '--panel-shadow': '0 12px 36px rgba(12, 8, 22, .22), 0 3px 10px rgba(12, 8, 22, .12)',
      '--minimize-tab-tint': '#efeaf6',
      '--minimize-tab-ink': '#73687e',
    },
  },
}

function ControlledExample({ onMinimize, ...props }: HandlePanelProps) {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <HandlePanel
        {...props}
        hidden={!visible}
        onMinimize={(event) => {
          onMinimize?.(event)
          setVisible(false)
        }}
      />
      {!visible && (
        <button type="button" onClick={() => setVisible(true)}>
          显示面板
        </button>
      )}
    </>
  )
}

export const Controlled: Story = { render: (args) => <ControlledExample {...args} /> }
