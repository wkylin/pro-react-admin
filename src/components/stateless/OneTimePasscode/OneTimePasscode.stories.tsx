import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import OneTimePasscode from './index'

// @ts-ignore
const styles = require('./index.module.less') ?? {}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  // ensure the story content uses the module wrapper so styles are applied
  <div className={styles.centeredWrapper}>{children}</div>
)

const meta: Meta<typeof OneTimePasscode> = {
  title: 'Components/OneTimePasscode',
  component: OneTimePasscode,
}

export default meta

type Story = StoryObj<typeof OneTimePasscode>

export const Modern: Story = {
  args: {
    length: 6,
    variant: 'modern',
  },
}

export const Compact: Story = {
  args: {
    length: 6,
    variant: 'compact',
  },
}

export const Classic: Story = {
  args: {
    length: 6,
    variant: 'classic',
  },
}

// wrap the basic variant stories so the module styles are definitely applied
Modern.render = (args: Partial<React.ComponentProps<typeof OneTimePasscode>>) => (
  <Wrapper>
    <OneTimePasscode {...(args as any)} />
  </Wrapper>
)
Compact.render = (args: Partial<React.ComponentProps<typeof OneTimePasscode>>) => (
  <Wrapper>
    <OneTimePasscode {...(args as any)} />
  </Wrapper>
)
Classic.render = (args: Partial<React.ComponentProps<typeof OneTimePasscode>>) => (
  <Wrapper>
    <OneTimePasscode {...(args as any)} />
  </Wrapper>
)

export const Controlled: Story = {
  render: (args: Partial<React.ComponentProps<typeof OneTimePasscode>>) => {
    const [val, setVal] = useState('')
    return <OneTimePasscode {...(args as any)} value={val} onChange={(v) => setVal(v)} />
  },
  args: {
    length: 6,
    variant: 'modern',
  },
}

export const Uncontrolled: Story = {
  render: (args: Partial<React.ComponentProps<typeof OneTimePasscode>>) => (
    <OneTimePasscode {...(args as any)} length={6} />
  ),
}
