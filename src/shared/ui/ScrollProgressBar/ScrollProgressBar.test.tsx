import { fireEvent, render, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import ScrollProgressBar, { ScrollArea } from './index'
import FixTabPanel from '../FixTabPanel'

function progressScale(bar: HTMLElement) {
  return Number(bar.style.transform.match(/scaleX\(([^)]+)\)/)?.[1] ?? 1)
}

describe('ScrollProgressBar', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(360)
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(1360)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('keeps a container progress bar at its own top without adding content height', () => {
    const { container } = render(
      <ScrollArea style={{ height: 360 }} height={4} color="linear-gradient(90deg, #1677ff, #722ed1)">
        <div>Scrollable content</div>
      </ScrollArea>
    )
    const bar = container.querySelector<HTMLElement>('.scroll-progress-bar')!
    expect(bar).toHaveStyle({ position: 'sticky', top: '0px', marginBottom: '-4px' })
    expect(bar.style.backgroundImage).toContain('linear-gradient')
    expect(bar.style.pointerEvents).toBe('none')
  })

  test('follows only its own scroller from top to middle, bottom and back', async () => {
    const { container } = render(
      <>
        <ScrollArea style={{ height: 360 }}>First content</ScrollArea>
        <ScrollArea style={{ height: 360 }}>Second content</ScrollArea>
      </>
    )
    const bars = [...container.querySelectorAll<HTMLElement>('.scroll-progress-bar')]
    const scroller = bars[0].parentElement!
    expect(progressScale(bars[0])).toBeCloseTo(0, 2)
    scroller.scrollTop = 500
    fireEvent.scroll(scroller)
    await waitFor(() => expect(progressScale(bars[0])).toBeCloseTo(0.5, 2), { timeout: 3000 })
    expect(progressScale(bars[1])).toBeCloseTo(0, 2)
    scroller.scrollTop = 1000
    fireEvent.scroll(scroller)
    await waitFor(() => expect(progressScale(bars[0])).toBeCloseTo(1, 2), { timeout: 3000 })
    scroller.scrollTop = 0
    fireEvent.scroll(scroller)
    await waitFor(() => expect(progressScale(bars[0])).toBeCloseTo(0, 2), { timeout: 3000 })
  })

  test('keeps zero progress for content that does not scroll and supports hiding', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(360)
    const { container, rerender } = render(<ScrollArea style={{ height: 360 }}>Short content</ScrollArea>)
    const bar = container.querySelector<HTMLElement>('.scroll-progress-bar')!
    expect(progressScale(bar)).toBeCloseTo(0, 2)
    rerender(<ScrollArea show={false}>Short content</ScrollArea>)
    expect(container.querySelector('.scroll-progress-bar')).not.toBeInTheDocument()
  })

  test('keeps FixTabPanel progress inside the panel while preserving its ref and scroll handler', async () => {
    const ref = createRef<HTMLDivElement>()
    const onScroll = jest.fn()
    const { container } = render(
      <FixTabPanel ref={ref} onScroll={onScroll} style={{ height: 360 }} fill={false}>
        Panel content
      </FixTabPanel>
    )
    const bar = container.querySelector<HTMLElement>('.scroll-progress-bar')!
    expect(bar.parentElement).toBe(ref.current)
    expect(bar).toHaveStyle({ position: 'sticky', top: '0px', marginBottom: '-3px' })
    ref.current!.scrollTop = 500
    fireEvent.scroll(ref.current!)
    expect(onScroll).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(progressScale(bar)).toBeCloseTo(0.5, 2), { timeout: 3000 })
  })

  test('preserves explicit placement and page progress defaults', () => {
    const { container, rerender } = render(<ScrollProgressBar />)
    expect(container.querySelector('.scroll-progress-bar')).toHaveStyle({ position: 'fixed', top: '0px' })
    rerender(<ScrollArea position="absolute">Content</ScrollArea>)
    expect(container.querySelector('.scroll-progress-bar')).toHaveStyle({ position: 'absolute', top: '0px' })
  })
})
