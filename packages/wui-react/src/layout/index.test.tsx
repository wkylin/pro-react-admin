import { act, fireEvent, render, screen, cleanup } from '@testing-library/react'
import {
  AnimationTabs,
  FixTabs,
  TrapezoidTabs,
  FeatureAny,
  ScrollToTop,
  HorizontalScroll,
  PageContainer,
  Footer,
} from './index'
import { TextComponent } from '../data-display'

const tabs = [
  { id: 0, value: 'first', code: 'first', label: 'First', title: 'First', name: 'First', content: 'First content' },
  {
    id: 1,
    value: 'second',
    code: 'second',
    label: 'Second',
    title: 'Second',
    name: 'Second',
    content: 'Second content',
  },
]

afterEach(() => {
  cleanup()
  jest.useRealTimers()
  jest.restoreAllMocks()
})

test.each(['fixed', 'animated', 'trapezoid'])('%s tabs support roving focus, selection and Home/End', (kind) => {
  render(
    kind === 'fixed' ? (
      <FixTabs tabs={tabs} />
    ) : kind === 'animated' ? (
      <AnimationTabs tabs={tabs} />
    ) : (
      <TrapezoidTabs tabs={tabs} />
    )
  )
  const first = screen.getByRole('tab', { name: 'First' })
  const second = screen.getByRole('tab', { name: 'Second' })
  fireEvent.keyDown(first, { key: 'ArrowRight' })
  expect(second).toHaveFocus()
  expect(second).toHaveAttribute('aria-selected', 'true')
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content')
  fireEvent.keyDown(second, { key: 'Home' })
  expect(first).toHaveFocus()
  fireEvent.keyDown(first, { key: 'End' })
  expect(second).toHaveFocus()
  fireEvent.keyDown(second, { key: 'ArrowRight' })
  expect(first).toHaveFocus()
})

test('controlled selection emits changes without changing the supplied value, including numeric zero', () => {
  const onChange = jest.fn()
  const { rerender } = render(<FixTabs tabs={tabs} activeId={0} onActiveIdChange={onChange} />)
  fireEvent.click(screen.getByRole('tab', { name: 'Second' }))
  expect(onChange).toHaveBeenCalledWith(1)
  expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true')
  rerender(<FixTabs tabs={tabs} activeId={1} onActiveIdChange={onChange} />)
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second content')
})

test('animated tabs recover when selected items disappear and tolerate empty data', () => {
  const { rerender } = render(<AnimationTabs tabs={tabs} />)
  fireEvent.click(screen.getByRole('tab', { name: 'Second' }))
  rerender(<AnimationTabs tabs={[tabs[0]]} />)
  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
  rerender(<AnimationTabs tabs={[]} />)
  expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument()
})

test('tab instances use distinct accessible relationships', () => {
  render(
    <>
      <AnimationTabs tabs={tabs} />
      <AnimationTabs tabs={tabs} />
    </>
  )
  const panels = screen.getAllByRole('tabpanel')
  expect(panels[0].id).not.toBe(panels[1].id)
  for (const panel of panels)
    expect(document.getElementById(panel.getAttribute('aria-labelledby')!)).toHaveAttribute('aria-selected', 'true')
})

test('feature autoplay advances, accepts manual selection and clears its timer', () => {
  jest.useFakeTimers()
  const schedule = jest.spyOn(globalThis, 'setInterval')
  const cancel = jest.spyOn(globalThis, 'clearInterval')
  const data = tabs.map((t) => ({ title: t.title, content: t.content, srcImage: `/${t.value}.png` }))
  const { unmount, rerender } = render(<FeatureAny data={data} intervalDuration={1000} />)
  const interval = schedule.mock.results[0].value
  act(() => jest.advanceTimersByTime(1000))
  expect(screen.getByRole('button', { name: /Second/ })).toHaveAttribute('aria-pressed', 'true')
  fireEvent.click(screen.getByRole('button', { name: /First/ }))
  expect(screen.getByRole('button', { name: /First/ })).toHaveAttribute('aria-pressed', 'true')
  rerender(<FeatureAny data={[]} />)
  expect(cancel).toHaveBeenCalledWith(interval)
  rerender(<FeatureAny data={data} intervalDuration={1000} />)
  const nextInterval = schedule.mock.results.at(-1)!.value
  unmount()
  expect(cancel).toHaveBeenCalledWith(nextInterval)
})

test('scroll reset works without a router and only resets when its inputs change', () => {
  const scrollTo = jest.fn()
  const target = { current: { scrollTo } as unknown as HTMLElement }
  const { rerender } = render(
    <ScrollToTop resetKey="a" target={target} behavior="instant">
      Content
    </ScrollToTop>
  )
  expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })
  rerender(
    <ScrollToTop resetKey="a" target={target} behavior="instant">
      Updated
    </ScrollToTop>
  )
  expect(scrollTo).toHaveBeenCalledTimes(1)
  rerender(<ScrollToTop resetKey="b" target={target} behavior="instant" />)
  expect(scrollTo).toHaveBeenCalledTimes(2)
})

test('caller content supplies card alt/link, footer navigation and page footer', () => {
  render(
    <PageContainer
      title="Page"
      footer={
        <Footer
          brand="Caller brand"
          socialLinks={[{ label: 'Community', href: 'https://example.org', external: true }]}
        />
      }
    >
      <HorizontalScroll cards={[{ id: 1, url: '/image.png', alt: 'Caller image', title: 'Card', href: '/card' }]} />
    </PageContainer>
  )
  expect(screen.getByRole('img', { name: 'Caller image' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Card/ })).toHaveAttribute('href', '/card')
  expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('rel', 'noopener noreferrer')
  expect(screen.getByText('Caller brand')).toBeInTheDocument()
})

test('text progress clamps invalid ranges for assistive technology', () => {
  const { rerender } = render(<TextComponent title="Progress" content="Details" isOpen loadingWidthPercent={150} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  rerender(<TextComponent title="Progress" content="Details" isOpen loadingWidthPercent={NaN} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})
