// @ts-ignore: storybook types resolution can be environment-specific in CI/TS config
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React, { useState } from 'react'

import OneTimePasscode from '@stateless/OneTimePasscode'

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 24, minWidth: 320 }}>{children}</div>
)

const meta = {
  title: 'ProReactAdmin/OneTimePasscode',
  component: OneTimePasscode,
  parameters: {
    layout: 'centered',
  },
  args: {
    length: 6,
    variant: 'modern',
    autoFocus: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['modern', 'compact', 'classic'],
    },
  },
} satisfies Meta<typeof OneTimePasscode>

export default meta

type Story = StoryObj<typeof OneTimePasscode>

export const Modern: Story = {
  render: (args) => (
    <Shell>
      <OneTimePasscode {...args} variant="modern" />
    </Shell>
  ),
}

export const Compact: Story = {
  render: (args) => (
    <Shell>
      <OneTimePasscode {...args} variant="compact" />
    </Shell>
  ),
}

export const Classic: Story = {
  render: (args) => (
    <Shell>
      <OneTimePasscode {...args} variant="classic" />
    </Shell>
  ),
}

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState('')
    return (
      <Shell>
        <OneTimePasscode {...args} value={val} onChange={(v) => setVal(v)} />
      </Shell>
    )
  },
}

export const Uncontrolled: Story = {
  render: (args) => (
    <Shell>
      <OneTimePasscode {...args} />
    </Shell>
  ),
}
