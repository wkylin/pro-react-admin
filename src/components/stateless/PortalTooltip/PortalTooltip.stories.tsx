import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import PortalTooltip from './index'

type PortalTooltipStoryProps = ComponentProps<typeof PortalTooltip>

const meta: Meta<typeof PortalTooltip> = {
  title: 'Stateless/PortalTooltip',
  component: PortalTooltip,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      description: 'The position of the tooltip relative to the target.',
    },
    trigger: {
      control: { type: 'radio' },
      options: ['hover', 'click'],
      description: 'The trigger mode which executes the tooltip action.',
    },
    title: {
      control: 'text',
      description: 'The text shown in the tooltip.',
    },
    overlayStyle: {
      control: 'object',
      description: 'Style properties for the tooltip overlay (e.g. maxWidth).',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const renderTooltip = (args: PortalTooltipStoryProps) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
    <PortalTooltip {...args}>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Hover me</button>
    </PortalTooltip>
  </div>
)

export const Default: Story = {
  render: renderTooltip,
  args: {
    title: 'This is a tooltip text',
    placement: 'top',
    trigger: 'hover',
  },
}

export const CustomWidth: Story = {
  render: renderTooltip,
  args: {
    title:
      'This is a very long tooltip text that would normally be constrained to 300px width but here we override it.',
    placement: 'top',
    trigger: 'hover',
    overlayStyle: { maxWidth: 500 },
  },
  name: 'Custom MaxWidth (500px)',
}

export const Placements: Story = {
  render: () => (
    <div style={{ padding: '60px 100px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <PortalTooltip title="Top Left" placement="topLeft">
          <button>TL</button>
        </PortalTooltip>
        <PortalTooltip title="Top" placement="top">
          <button>Top</button>
        </PortalTooltip>
        <PortalTooltip title="Top Right" placement="topRight">
          <button>TR</button>
        </PortalTooltip>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <PortalTooltip title="Left" placement="left">
          <button>Left</button>
        </PortalTooltip>
        <div style={{ width: '50px' }} />
        <PortalTooltip title="Right" placement="right">
          <button>Right</button>
        </PortalTooltip>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <PortalTooltip title="Bottom Left" placement="bottomLeft">
          <button>BL</button>
        </PortalTooltip>
        <PortalTooltip title="Bottom" placement="bottom">
          <button>Bottom</button>
        </PortalTooltip>
        <PortalTooltip title="Bottom Right" placement="bottomRight">
          <button>BR</button>
        </PortalTooltip>
      </div>
    </div>
  ),
}
