import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import OverflowText from './index'

type OverflowTextStoryProps = ComponentProps<typeof OverflowText>

const renderOverflowText = (args: OverflowTextStoryProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '150px',
      padding: '1px 20px',
    }}
  >
    <div style={{ border: '1px dashed #ccc', padding: '10px', width: 'fit-content' }}>
      <OverflowText {...args} />
    </div>
  </div>
)

const meta: Meta<typeof OverflowText> = {
  title: 'Stateless/OverflowText',
  component: OverflowText,
  render: renderOverflowText,
  argTypes: {
    text: { control: 'text', description: 'The text content to display.' },
    maxWidth: { control: 'text', description: 'CSS max-width for the container (e.g. "200px" or 200).' },
    lines: { control: 'number', description: 'Number of lines to show before truncating (0 for single line).' },
    alwaysShow: { control: 'boolean', description: 'Force tooltip to always show regardless of overflow.' },
    minWidth: { control: 'text', description: 'Minimum width.' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'This is a long text that should be truncated when it exceeds the max width.',
    maxWidth: 200,
  },
  name: 'Single Line truncation',
}

export const MultiLine: Story = {
  args: {
    text: 'This is a long text that should span multiple lines but eventually get truncated if it exceeds the specified number of lines. It handles wrapping correctly and shows a tooltip with the full content.',
    maxWidth: 200,
    lines: 2,
  },
  name: 'Multi-line (2 lines)',
}

export const CustomTooltipWidth: Story = {
  args: {
    text: 'This is a very long text example. By default, the tooltip has a max-width of 300px. In this example, we override it to 500px to show more text on one line within the tooltip.',
    maxWidth: 200,
    tooltipProps: {
      overlayStyle: { maxWidth: 500 },
    },
  },
  name: 'Custom Tooltip Width',
}

export const NoOverflow: Story = {
  args: {
    text: 'Short text',
    maxWidth: 200,
  },
  name: 'No Overflow (No Tooltip)',
}

export const AlwaysShow: Story = {
  args: {
    text: 'Short text',
    maxWidth: 200,
    alwaysShow: true,
  },
  name: 'Always Show Tooltip',
}
