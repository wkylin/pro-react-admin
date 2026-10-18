import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  Palette,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/IconCloud',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 360,
          padding: 24,
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    icons: [
      <Cloud key="cloud" size={100} color="#0ea5e9" />,
      <Code2 key="code" size={100} color="#2563eb" />,
      <Cpu key="cpu" size={100} color="#7c3aed" />,
      <Database key="database" size={100} color="#059669" />,
      <GitBranch key="git" size={100} color="#d97706" />,
      <Globe key="globe" size={100} color="#0891b2" />,
      <Layers key="layers" size={100} color="#be185d" />,
      <LayoutGrid key="layout" size={100} color="#4f46e5" />,
      <Palette key="palette" size={100} color="#db2777" />,
      <Shield key="shield" size={100} color="#16a34a" />,
      <Terminal key="terminal" size={100} color="#475569" />,
      <Zap key="zap" size={100} color="#eab308" />,
    ],
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
