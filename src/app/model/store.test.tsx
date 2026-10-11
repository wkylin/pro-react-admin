import { render, screen, fireEvent } from '@testing-library/react'
import { AppStoreProvider, createAppStore, useAppStore } from './index'

function Sidebar({ label }: { label: string }) {
  const open = useAppStore((state) => state.isSidebarOpen)
  const toggle = useAppStore((state) => state.toggleSidebar)
  return (
    <button onClick={toggle}>
      {label}:{String(open)}
    </button>
  )
}
test('two application roots and their persisted preferences are isolated', () => {
  localStorage.clear()
  render(
    <>
      <AppStoreProvider projectId="projectA">
        <Sidebar label="A" />
      </AppStoreProvider>
      <AppStoreProvider projectId="projectB">
        <Sidebar label="B" />
      </AppStoreProvider>
    </>
  )
  fireEvent.click(screen.getByText('A:true'))
  expect(screen.getByText('A:false')).toBeInTheDocument()
  expect(screen.getByText('B:true')).toBeInTheDocument()
  expect(createAppStore('projectA').getState().isSidebarOpen).toBe(false)
  expect(createAppStore('projectB').getState().isSidebarOpen).toBe(true)
})
test('two roots of the same project still have independent in-memory state', () => {
  localStorage.clear()
  const first = createAppStore('enterprise'),
    second = createAppStore('enterprise')
  first.getState().toggleSidebar()
  expect(second.getState().isSidebarOpen).toBe(true)
})
