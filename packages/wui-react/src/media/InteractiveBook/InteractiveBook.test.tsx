import { useImperativeHandle, type ComponentProps } from 'react'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type PageFlipRenderer from './PageFlipRenderer'
import type { HardcoverScene } from './HardcoverScene'

let flipProps: ComponentProps<typeof PageFlipRenderer>
let meshProps: ComponentProps<typeof HardcoverScene>
let requestedPage = 0
const closeCalls = jest.fn()
const stopCalls = jest.fn()
let enginePageOverride: number | null = null

jest.mock('./PageFlipRenderer', () => ({
  __esModule: true,
  default: function MockPageFlipRenderer(props: ComponentProps<typeof PageFlipRenderer>) {
    flipProps = props
    useImperativeHandle(props.ref, () => ({
      next: () => props.onTurning(true),
      previous: () => props.onTurning(true),
      close: () => {
        closeCalls()
        requestedPage = 0
        props.onTurning(true)
      },
      stop: () => {
        stopCalls()
        props.onTurning(false)
      },
      goTo: (page: number, animate = true) => {
        requestedPage = page
        if (animate) props.onTurning(true)
        else {
          props.onFlip(page)
          props.onTurning(false)
        }
      },
      getPage: () => enginePageOverride ?? props.startPage,
    }))
    return null
  },
}))
jest.mock('./hardcoverEngine', () => ({
  loadHardcoverEngine: async () => ({
    HardcoverScene: (props: ComponentProps<typeof HardcoverScene>) => {
      meshProps = props
      return <div data-testid="hardcover" data-active={props.active} data-yaw={props.yaw} />
    },
  }),
}))
// jsdom has no text layout. Exercise the component/engine contract with one measured slice per source.
jest.mock('./bookPagination', () => {
  const actual = jest.requireActual('./bookPagination')
  return {
    ...actual,
    useBookPagination: (sources: Array<{ key: string; content: React.ReactNode }>) => ({
      parts: Object.fromEntries(
        sources.map((source) => [
          source.key,
          [{ start: 0, end: actual.createContentTree(source.content).end, content: source.content, scale: 1 }],
        ])
      ),
      measurement: null,
      ready: true,
    }),
  }
})
const InteractiveBook = require('./index').default
const pages = [
  { title: '第一章', content: <p>第一页</p>, backContent: <p>第二页</p> },
  { title: '第二章', content: <p>第三页</p>, backContent: <p>第四页</p> },
]

beforeEach(() => {
  closeCalls.mockClear()
  stopCalls.mockClear()
  enginePageOverride = null
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  window.matchMedia = jest
    .fn()
    .mockImplementation(() => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
})
afterEach(() => jest.restoreAllMocks())

function finishFlip(page: number) {
  act(() => {
    flipProps.onFlip(page)
    flipProps.onTurning(false)
  })
}

test('a closed preview can delegate opening to a reader without opening in place', async () => {
  const onOpenRequest = jest.fn()
  render(<InteractiveBook coverImage="/cover.png" pages={pages} open={false} onOpenRequest={onOpenRequest} />)
  await screen.findByTestId('hardcover')
  act(() => meshProps.onReady?.())
  fireEvent.click(screen.getByRole('button', { name: /点击打开/ }))
  expect(onOpenRequest).toHaveBeenCalledTimes(1)
  expect(document.querySelector('[data-book-open]')).toHaveAttribute('data-book-open', 'false')
})

test('an external close dismisses a reader already returned from the back to the front cover', async () => {
  const onClose = jest.fn()
  const props = { coverImage: '/cover.png', pages, onClose }
  const book = render(<InteractiveBook {...props} open />)
  await screen.findByTestId('hardcover')
  finishFlip(flipProps.pages.length - 1)
  act(() => meshProps.onReady?.())
  fireEvent.click(screen.getByRole('button', { name: '翻到封面' }))
  act(() => meshProps.onTurnComplete?.())
  act(() => {
    flipProps.onTurning(false)
    meshProps.onReady?.()
  })
  await waitFor(() => expect(document.querySelector('[data-book-view]')).toHaveAttribute('data-book-view', 'front'))
  expect(onClose).not.toHaveBeenCalled()
  book.rerender(<InteractiveBook {...props} open={false} />)
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(closeCalls).not.toHaveBeenCalled()
})

test('preview angle buttons can be hidden while the configured rotatable cover remains available', async () => {
  render(<InteractiveBook pages={pages} showViewControls={false} tilt={4} rotation={32} />)
  await screen.findByTestId('hardcover')
  act(() => meshProps.onReady?.())
  expect(screen.queryByRole('navigation', { name: '书本 3D 视角' })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /拖动旋转封面/ })).toBeVisible()
  expect(meshProps.pitch).toBe(4)
  expect(meshProps.yaw).toBe(-32)
})

test('a controlled closed preview does not report closing on mount', async () => {
  const onClose = jest.fn()
  render(<InteractiveBook coverImage="/cover.png" pages={pages} open={false} onClose={onClose} />)
  await screen.findByTestId('hardcover')
  expect(onClose).not.toHaveBeenCalled()
})

test('closing stays at the prepared front pose without a second preview rotation', async () => {
  const onClose = jest.fn()
  render(<InteractiveBook coverImage="/cover.png" pages={pages} mode="double" defaultOpen onClose={onClose} />)
  await screen.findByTestId('hardcover')
  act(() => meshProps.onReady?.())
  finishFlip(1)
  expect(screen.getByTestId('hardcover')).toHaveAttribute('data-active', 'false')
  expect(meshProps.yaw).toBe(0)

  fireEvent.click(screen.getByTitle('合上书籍'))
  act(() => meshProps.onReady?.())
  expect(requestedPage).toBe(0)
  finishFlip(0)
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(screen.getByTestId('hardcover')).toHaveAttribute('data-active', 'true')
  expect(meshProps.yaw).toBe(0)
  // The already prepared renderer remains ready through the handoff.
  expect(screen.getByRole('button', { name: /点击打开/ })).toBeInTheDocument()
  await waitFor(() => expect(meshProps.yaw).toBe(0))
  expect(meshProps.pitch).toBe(0)
})

test('repeated close requests do not cancel the active closing animation', async () => {
  render(<InteractiveBook coverImage="/cover.png" pages={pages} defaultOpen />)
  await screen.findByTestId('hardcover')
  act(() => meshProps.onReady?.())
  fireEvent.click(screen.getByTitle('合上书籍'))
  act(() => meshProps.onReady?.())
  fireEvent.keyDown(window, { key: 'Escape' })
  fireEvent.keyDown(window, { key: 'Escape' })
  fireEvent.keyDown(window, { key: 'End' })
  expect(requestedPage).toBe(0)
  expect(closeCalls).toHaveBeenCalledTimes(1)
  expect(stopCalls).toHaveBeenCalledTimes(1)
})

test.each([false, true])('closing during opening reaches the front (controlled: %s)', async (controlled) => {
  const onClose = jest.fn()
  const props = { coverImage: '/cover.png', pages, onClose }
  const book = render(<InteractiveBook {...props} open={controlled ? false : undefined} />)
  await screen.findByTestId('hardcover')
  act(() => meshProps.onReady?.())
  enginePageOverride = 0
  if (controlled) book.rerender(<InteractiveBook {...props} open />)
  else fireEvent.click(screen.getByRole('button', { name: /点击打开/ }))
  if (controlled) book.rerender(<InteractiveBook {...props} open={false} />)
  else fireEvent.keyDown(window, { key: 'Escape' })
  expect(closeCalls).toHaveBeenCalledTimes(1)
  expect(stopCalls).not.toHaveBeenCalled()
  finishFlip(0)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('closing from the back requests a fresh front snapshot before turning', async () => {
  const props = { coverImage: '/cover.png', pages, mode: 'double' as const, defaultOpen: true }
  const book = render(<InteractiveBook {...props} />)
  await screen.findByTestId('hardcover')
  const back = flipProps.pages.length - 1
  finishFlip(back - 2)
  act(() => meshProps.onReady?.())
  finishFlip(back)
  book.rerender(<InteractiveBook {...props} bookTitle="更新封面" />)
  act(() => meshProps.onPending?.())
  act(() => meshProps.onReady?.())
  fireEvent.click(screen.getByTitle('合上书籍'))
  expect(meshProps.captureFrontCover).toBe(true)
  expect(meshProps.captureBackCover).toBe(false)
  expect(closeCalls).not.toHaveBeenCalled()
  const bleed = Math.ceil(Math.max(90, meshProps.height * 0.3))
  const snapshot = {
    src: 'data:image/png;base64,ZnJlc2g=',
    width: meshProps.viewportWidth,
    height: meshProps.height + 2 * bleed,
    left: (meshProps.width - meshProps.viewportWidth) / 2,
    top: -bleed,
  }
  act(() => meshProps.onReady?.(snapshot))
  expect(closeCalls).toHaveBeenCalledTimes(1)
  const face = render(flipProps.pages[0].content)
  expect(face.container.querySelector('[data-book-front-snapshot]')).toHaveAttribute('src', snapshot.src)
})

test('a book initially closed starts at its final angle without a flat-cover flash', async () => {
  render(<InteractiveBook coverImage="/cover.png" pages={pages} mode="double" />)
  await screen.findByTestId('hardcover')
  expect(meshProps.yaw).toBe(-24)
  expect(meshProps.pitch).toBe(4)
})

test('reopening the back cover immediately removes the closed 3D surface', async () => {
  render(<InteractiveBook coverImage="/cover.png" pages={pages} mode="double" defaultOpen />)
  await screen.findByTestId('hardcover')
  const back = flipProps.pages.length - 1
  finishFlip(back - 2)
  act(() => meshProps.onReady?.())
  finishFlip(back)
  expect(meshProps.yaw).toBe(180)
  expect(screen.getByTestId('hardcover')).toHaveAttribute('data-active', 'true')

  fireEvent.click(screen.getByRole('button', { name: /点击返回.*末页/ }))
  expect(screen.queryByTestId('hardcover')).not.toBeInTheDocument()
  finishFlip(back - 2)
  expect(screen.getByTestId('hardcover')).toHaveAttribute('data-active', 'false')
})

test('the turning back cover reuses its prepared 3D appearance through closing and reopening', async () => {
  render(<InteractiveBook coverImage="/cover.png" pages={pages} mode="double" defaultOpen />)
  await screen.findByTestId('hardcover')
  const back = flipProps.pages.length - 1
  finishFlip(back - 2)
  expect(meshProps.captureBackCover).toBe(true)
  const bleed = Math.ceil(Math.max(90, meshProps.height * 0.3))
  const snapshot = {
    src: 'data:image/png;base64,cHJldmlldw==',
    width: meshProps.viewportWidth,
    height: meshProps.height + 2 * bleed,
    left: (meshProps.width - meshProps.viewportWidth) / 2,
    top: -bleed,
  }
  act(() => meshProps.onReady?.(snapshot))
  const face = render(flipProps.pages[back].content)
  expect(face.container.querySelector('[data-book-back-snapshot]')).toHaveAttribute('src', snapshot.src)
  finishFlip(back)
  face.rerender(flipProps.pages[back].content)
  expect(face.container.querySelector('[data-book-back-snapshot]')).toHaveAttribute('src', snapshot.src)
  fireEvent.click(screen.getByRole('button', { name: /点击返回.*末页/ }))
  face.rerender(flipProps.pages[back].content)
  expect(face.container.querySelector('[data-book-back-snapshot]')).toHaveAttribute('src', snapshot.src)
  finishFlip(back - 2)
  act(() => meshProps.onFailure?.())
  face.rerender(flipProps.pages[back].content)
  expect(face.container.querySelector('[data-book-back-snapshot]')).not.toBeInTheDocument()
  expect(face.container.querySelector('[data-book-cover-finish]')).toBeInTheDocument()
})

test('a closed back keeps preparing fresh snapshots before reopening after appearance changes', async () => {
  const book = render(<InteractiveBook coverImage="/cover.png" pages={pages} mode="double" defaultOpen />)
  await screen.findByTestId('hardcover')
  const back = flipProps.pages.length - 1
  finishFlip(back - 2)
  act(() => meshProps.onReady?.())
  finishFlip(back)
  book.rerender(
    <InteractiveBook coverImage="/cover.png" pages={pages} mode="double" defaultOpen backCoverColor="#851b25" />
  )
  expect(meshProps.captureBackCover).toBe(true)
  act(() => meshProps.onPending?.())
  expect(screen.queryByRole('button', { name: /点击返回.*末页/ })).not.toBeInTheDocument()
  const bleed = Math.ceil(Math.max(90, meshProps.height * 0.3))
  const snapshot = {
    src: 'data:image/png;base64,dXBkYXRlZA==',
    width: meshProps.viewportWidth,
    height: meshProps.height + 2 * bleed,
    left: (meshProps.width - meshProps.viewportWidth) / 2,
    top: -bleed,
  }
  act(() => meshProps.onReady?.(snapshot))
  fireEvent.click(screen.getByRole('button', { name: /点击返回.*末页/ }))
  const face = render(flipProps.pages[back].content)
  expect(face.container.querySelector('[data-book-back-snapshot]')).toHaveAttribute('src', snapshot.src)
})

test('opens through the book preliminaries before contents and preserves chapter page targets', async () => {
  render(<InteractiveBook coverImage="/cover.png" bookTitle="山海之间" pages={pages} mode="double" defaultOpen />)
  await screen.findByTestId('hardcover')
  expect(flipProps.pages.slice(1, 7).map((page) => page.key)).toEqual([
    'endpaper',
    'half-title',
    'frontispiece',
    'title',
    'copyright',
    'preface',
  ])
  expect(flipProps.startPage).toBe(1)
  const contents = flipProps.pages.find((page) => page.key === 'contents-0')!
  render(contents.content)
  fireEvent.click(screen.getByRole('button', { name: '跳转至第 3 页：第二章' }))
  expect(requestedPage).toBe(flipProps.pages.findIndex((page) => page.key === 'page-2'))
  expect(flipProps.pages.findIndex((page) => page.key === 'page-0') % 2).toBe(1)
})

test('front and back matter do not report body-page changes', async () => {
  const onPageChange = jest.fn()
  render(<InteractiveBook coverImage="/cover.png" pages={pages} defaultOpen onPageChange={onPageChange} />)
  await screen.findByTestId('hardcover')
  finishFlip(3)
  expect(onPageChange).not.toHaveBeenCalled()
  finishFlip(flipProps.pages.findIndex((page) => page.key === 'page-2'))
  expect(onPageChange).toHaveBeenLastCalledWith(1)
  finishFlip(flipProps.pages.findIndex((page) => page.key === 'colophon'))
  expect(onPageChange).toHaveBeenCalledTimes(1)
})

test('publication pages reuse existing cover data and omit absent publication facts', async () => {
  render(
    <InteractiveBook
      coverImage="/cover.png"
      bookTitle="山海之间"
      bookAuthor="林舟"
      coverPublisher="山海书局"
      pages={pages}
      defaultOpen
    />
  )
  await screen.findByTestId('hardcover')
  const copyright = within(render(flipProps.pages.find((page) => page.key === 'copyright')!.content).container)
  expect(copyright.getAllByText('山海之间').length).toBeGreaterThan(0)
  expect(copyright.getByText('林舟')).toBeInTheDocument()
  expect(copyright.getByText('山海书局')).toBeInTheDocument()
  expect(copyright.queryByText('ISBN')).not.toBeInTheDocument()
  expect(copyright.queryByText('出版日期')).not.toBeInTheDocument()
})

test('the colophon displays supplied edition data and offers a return to contents', async () => {
  render(
    <InteractiveBook
      coverImage="/cover.png"
      pages={pages}
      defaultOpen
      publication={{ edition: '修订版', date: '2026 年 10 月' }}
    />
  )
  await screen.findByTestId('hardcover')
  const colophon = render(flipProps.pages.find((page) => page.key === 'colophon')!.content)
  expect(within(colophon.container).getByText('修订版')).toBeInTheDocument()
  expect(within(colophon.container).getByText('2026 年 10 月')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '返回目录' }))
  expect(requestedPage).toBe(flipProps.pages.findIndex((page) => page.key === 'contents-0'))
})

test('generated matter can be disabled for books that already include it', async () => {
  render(<InteractiveBook coverImage="/cover.png" pages={pages} defaultOpen frontMatter={false} backMatter={false} />)
  await screen.findByTestId('hardcover')
  expect(flipProps.pages[1].key).toBe('contents-0')
  expect(flipProps.pages.some((page) => page.key === 'title' || page.key === 'afterword')).toBe(false)
  expect(flipProps.pages.at(-2)?.key).toBe('end')
})

test('body position survives contents repagination and a switch to single-page reading', async () => {
  const bookProps = { coverImage: '/cover.png', pages: [...pages, ...pages], defaultOpen: true }
  const { rerender } = render(<InteractiveBook {...bookProps} mode="double" />)
  await screen.findByTestId('hardcover')
  finishFlip(flipProps.pages.findIndex((page) => page.key === 'page-2'))
  rerender(<InteractiveBook {...bookProps} mode="single" contentsPerPage={1} />)
  expect(flipProps.startPage).toBe(flipProps.pages.findIndex((page) => page.key === 'page-2'))
})

test('an odd number of image pages keeps image numbering and the final spread intact', async () => {
  render(
    <InteractiveBook
      coverImage="/cover.png"
      pages={[]}
      pageImages={['/1.png', '/2.png', '/3.png']}
      mode="double"
      defaultOpen
    />
  )
  await screen.findByTestId('hardcover')
  const first = flipProps.pages.findIndex((page) => page.key === 'page-0')
  expect(flipProps.pages[first + 2].key).toBe('page-2')
  expect(flipProps.pages.findIndex((page) => page.key === 'afterword') % 2).toBe(1)
  render(flipProps.pages[first].content)
  expect(screen.getByAltText('第 1 页')).toBeInTheDocument()
})

test('contents repagination keeps a single-page reader in the afterword', async () => {
  const bookProps = { coverImage: '/cover.png', pages: [...pages, ...pages], mode: 'single', defaultOpen: true }
  const { rerender } = render(<InteractiveBook {...bookProps} />)
  await screen.findByTestId('hardcover')
  finishFlip(flipProps.pages.findIndex((page) => page.key === 'afterword'))
  rerender(<InteractiveBook {...bookProps} contentsPerPage={1} />)
  expect(flipProps.startPage).toBe(flipProps.pages.findIndex((page) => page.key === 'afterword'))
})
