import { act, fireEvent, render, screen } from '@testing-library/react'
import { useRef } from 'react'
import ScrollableSections from './index'

const sections = [{ title: '概览' }, { title: '设置' }, { title: '审计' }]

function Example({ explicit = false }: { explicit?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} data-testid="scroller" style={{ overflowY: 'auto' }}>
      <div style={{ position: 'relative' }}>
        <ScrollableSections sections={sections} scrollContainerRef={explicit ? ref : undefined} />
      </div>
    </div>
  )
}

const rect = (top: number, height: number) => ({ top, bottom: top + height, height }) as DOMRect

describe('ScrollableSections', () => {
  let frames: FrameRequestCallback[]

  beforeEach(() => {
    frames = []
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback)
      return frames.length
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      const scroller = document.querySelector<HTMLElement>('[data-testid="scroller"]')
      if (this === scroller) return rect(100, 420)
      if (this.tagName === 'NAV') return rect(102, 60)
      const title = this.querySelector('h2')?.textContent
      const index = sections.findIndex((section) => title === `${section.title} Section`)
      if (this.tagName === 'DIV' && this.querySelector('h2')?.parentElement?.parentElement === this) {
        return rect(102 + 200 + index * 500 - (scroller?.scrollTop ?? 0), 500)
      }
      return rect(0, 0)
    })
  })

  afterEach(() => jest.restoreAllMocks())

  const flushFrames = () =>
    act(() => {
      const pending = frames.splice(0)
      pending.forEach((callback) => callback(0))
    })

  function setup(explicit = false) {
    const result = render(<Example explicit={explicit} />)
    const container = screen.getByTestId('scroller')
    Object.defineProperties(container, {
      clientHeight: { value: 420 },
      clientTop: { value: 2 },
      scrollHeight: { value: 1700, configurable: true },
    })
    flushFrames()
    const scroll = (top: number) => {
      container.scrollTop = top
      fireEvent.scroll(container)
      flushFrames()
    }
    return { ...result, container, scroll }
  }

  test('detects the parent scroller and follows sections in both scroll directions', () => {
    const { scroll } = setup()
    scroll(850)
    expect(screen.getByRole('button', { name: '设置' })).toHaveAttribute('aria-current', 'location')
    scroll(1250)
    expect(screen.getByRole('button', { name: '审计' })).toHaveAttribute('aria-current', 'location')
    scroll(200)
    expect(screen.getByRole('button', { name: '概览' })).toHaveAttribute('aria-current', 'location')
  })

  test('keeps the current section active until the next reaches the navigation line', () => {
    const { scroll } = setup(true)
    scroll(500)
    expect(screen.getByRole('button', { name: '概览' })).toHaveAttribute('aria-current', 'location')
    scroll(620)
    expect(screen.getByRole('button', { name: '设置' })).toHaveAttribute('aria-current', 'location')
  })

  test('click positions use scroller coordinates even inside another positioned wrapper', () => {
    const { container } = setup(true)
    container.scrollTop = 300
    const scrollTo = jest.fn()
    container.scrollTo = scrollTo
    fireEvent.click(screen.getByRole('button', { name: '审计' }))
    expect(scrollTo).toHaveBeenCalledWith({ top: 1120, behavior: 'smooth' })
  })

  test('selects a short final section at the bottom and keeps navigation sticky', () => {
    const { container, scroll } = setup()
    Object.defineProperty(container, 'scrollHeight', { value: 1300 })
    scroll(880)
    expect(screen.getByRole('button', { name: '审计' })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('navigation')).toHaveStyle({ position: 'sticky' })
  })

  test('follows window scrolling when there is no scrollable ancestor', () => {
    jest.replaceProperty(window, 'innerHeight', 420)
    jest.replaceProperty(window, 'scrollY', 0)
    jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(1700)
    jest.mocked(HTMLElement.prototype.getBoundingClientRect).mockImplementation(function () {
      if (this.tagName === 'NAV') return rect(0, 60)
      const index = sections.findIndex(
        (section) => this.querySelector('h2')?.textContent === `${section.title} Section`
      )
      if (this.querySelector('h2')?.parentElement?.parentElement === this) {
        return rect(200 + index * 500 - window.scrollY, 500)
      }
      return rect(0, 0)
    })
    render(<ScrollableSections sections={sections} />)
    flushFrames()
    jest.replaceProperty(window, 'scrollY', 850)
    fireEvent.scroll(window)
    flushFrames()
    expect(screen.getByRole('button', { name: '设置' })).toHaveAttribute('aria-current', 'location')
  })
})
