import { StrictMode } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
jest.mock('./AutoSlider/index.module.less', () => ({
  __esModule: true,
  default: { activeSlide: 'activeSlide', lastSlide: 'lastSlide', nextSlide: 'nextSlide' },
}))
jest.mock('./InteractiveBook/PageFlipRenderer', () => ({ __esModule: true, default: () => null }))
jest.mock('./InteractiveBook/pdfEngine', () => ({ loadPdfEngine: async () => require('react-pdf').pdfjs }), {
  virtual: true,
})
jest.mock('react-pdf', () => ({ pdfjs: { getDocument: jest.fn() } }))
const AutoSlider = require('./AutoSlider').default
const InteractiveBook = require('./InteractiveBook').default
const FixMusicPlayer = require('./FixMusicPlayer').default
const getDocument = require('react-pdf').pdfjs.getDocument as jest.Mock
const tracks = [{ id: 'a', title: 'Track A', src: '/a.mp3' }]
beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  window.matchMedia = jest
    .fn()
    .mockImplementation(() => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
})
afterEach(() => {
  jest.restoreAllMocks()
  getDocument.mockReset()
})
test('single slide stays active after initial render and collection shrink', () => {
  const first = { id: 'a', name: 'Only slide', image: '/a.png' }
  const view = render(<AutoSlider slides={[first]} interval={0} />)
  expect(view.container.querySelector('article')).toHaveClass('activeSlide')
  expect(view.container.querySelector('article')).not.toHaveClass('lastSlide')
  view.rerender(<AutoSlider slides={[first, { id: 'b', name: 'Other', image: '/b.png' }]} interval={0} />)
  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }))
  view.rerender(<AutoSlider slides={[first]} interval={0} />)
  expect(view.container.querySelector('article')).toHaveClass('activeSlide')
})
test('book sound survives StrictMode replay and source replacement', () => {
  const view = render(
    <StrictMode>
      <InteractiveBook coverImage="/cover.png" pages={[]} pageTurnSound="/first.mp3" />
    </StrictMode>
  )
  expect(view.container.querySelector('audio')).toHaveAttribute('src', '/first.mp3')
  view.rerender(
    <StrictMode>
      <InteractiveBook coverImage="/cover.png" pages={[]} pageTurnSound="/second.mp3" />
    </StrictMode>
  )
  const audio = view.container.querySelector('audio')!
  expect(audio).toHaveAttribute('src', '/second.mp3')
  view.unmount()
  expect(audio).not.toHaveAttribute('src')
})
test('keep-alive reactivation resumes interrupted playback but respects user pause', async () => {
  const view = render(<FixMusicPlayer tracks={tracks} active />)
  const audio = view.container.querySelector('audio')!
  let paused = true
  Object.defineProperty(audio, 'paused', { configurable: true, get: () => paused })
  jest.mocked(audio.play).mockImplementation(async () => {
    paused = false
    audio.dispatchEvent(new Event('play'))
  })
  jest.mocked(audio.pause).mockImplementation(() => {
    paused = true
    audio.dispatchEvent(new Event('pause'))
  })
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Play' }))
  })
  await act(async () => {
    view.rerender(<FixMusicPlayer tracks={tracks} active={false} />)
  })
  expect(paused).toBe(true)
  await act(async () => {
    view.rerender(<FixMusicPlayer tracks={tracks} active />)
  })
  expect(paused).toBe(false)
  expect(audio.play).toHaveBeenCalledTimes(2)
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
  })
  await act(async () => {
    view.rerender(<FixMusicPlayer tracks={tracks} active={false} />)
  })
  await act(async () => {
    view.rerender(<FixMusicPlayer tracks={tracks} active />)
  })
  expect(paused).toBe(true)
  expect(audio.play).toHaveBeenCalledTimes(2)
  await act(async () => {
    view.unmount()
  })
})
test('PDF failure requests only the caller URL, without inferred Storybook routes', async () => {
  window.history.replaceState({}, '', '/host/repository/storybook/iframe.html')
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  getDocument.mockImplementation(() => ({
    promise: Promise.reject(new Error('missing document')),
    destroy: jest.fn().mockResolvedValue(undefined),
  }))
  let view!: ReturnType<typeof render>
  await act(async () => {
    view = render(<InteractiveBook coverImage="/cover.png" pages={[]} pdfUrl="/caller.pdf" />)
  })
  await waitFor(() => expect(screen.getByText('missing document')).toBeInTheDocument())
  expect(getDocument.mock.calls.map(([options]) => options.url)).toEqual(['/caller.pdf'])
  view.unmount()
  consoleError.mockRestore()
  window.history.replaceState({}, '', '/')
})
