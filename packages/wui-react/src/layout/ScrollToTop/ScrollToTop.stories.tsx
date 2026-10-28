import type { Meta, StoryObj } from '@storybook/react'
import { Link, useLocation } from 'react-router-dom'
import Component from './index'

const pages = [
  { path: '/scroll-to-top/overview', label: 'Overview', title: 'Workspace overview' },
  { path: '/scroll-to-top/activity', label: 'Activity', title: 'Recent activity' },
]

function ScrollToTopDemo() {
  const { pathname } = useLocation()
  const currentPage = pages.find((page) => page.path === pathname) ?? pages[0]
  const nextPage = currentPage === pages[0] ? pages[1] : pages[0]
  const items =
    currentPage === pages[0]
      ? ['Design system', 'Admin dashboard', 'Documentation']
      : ['Component library updated', 'Dashboard published', 'Documentation reviewed']

  return (
    <main style={{ maxWidth: 560, color: 'var(--wui-text-primary, #171717)' }}>
      <nav aria-label="Preview pages" style={{ display: 'flex', borderBottom: '1px solid var(--wui-border, #e5e7eb)' }}>
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            style={{
              padding: '10px 16px',
              color: 'inherit',
              borderBottom: page.path === currentPage.path ? '2px solid #1677ff' : '2px solid transparent',
            }}
          >
            {page.label}
          </Link>
        ))}
      </nav>
      <h2 style={{ margin: '24px 0 12px', fontSize: 24 }}>{currentPage.title}</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--wui-text-secondary, #525f70)' }}>
        {currentPage === pages[0] ? 'Your projects at a glance.' : 'The latest changes across your projects.'}
      </p>
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} style={{ padding: '14px 0', borderTop: '1px solid var(--wui-border, #e5e7eb)' }}>
          {items[index % items.length]} {Math.floor(index / items.length) + 1}
        </div>
      ))}
      <Link to={nextPage.path} style={{ display: 'inline-block', marginTop: 24, color: '#1677ff' }}>
        View {nextPage.label.toLowerCase()}
      </Link>
    </main>
  )
}

const meta = {
  title: 'Components/Stateless/ScrollToTop',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const { pathname } = useLocation()
    return (
      <Component {...args} resetKey={pathname}>
        <ScrollToTopDemo />
      </Component>
    )
  },
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
