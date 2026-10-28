import { act, fireEvent, render, screen } from '@testing-library/react'
import MusicPlayer from './MusicPlayer'
import SoundBar from './SoundBar'
import AutoSlider from './AutoSlider'
import CompareAll from './CompareAll'
import FixCarouse from './FixCarouse'
import LazyLoadImage from './LazyLoadImage'

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
})
afterEach(() => {
  jest.restoreAllMocks()
  jest.useRealTimers()
})
const tracks = [
  { id: 'one', title: 'Caller track', src: '/one.mp3' },
  { id: 'two', title: 'Second track', src: '/two.mp3' },
]
test('music source changes reset seek state and release media on unmount', () => {
  const view = render(<MusicPlayer tracks={tracks} />)
  const audio = view.container.querySelector('audio')!
  Object.defineProperty(audio, 'duration', { configurable: true, value: 100 })
  fireEvent.loadedMetadata(audio)
  fireEvent.change(screen.getByRole('slider', { name: 'Playback position' }), { target: { value: '30' } })
  expect(audio.currentTime).toBe(30)
  fireEvent.click(screen.getByRole('button', { name: 'Next track' }))
  expect(audio.getAttribute('src')).toBe('/two.mp3')
  expect(screen.getByRole('slider', { name: 'Playback position' })).toHaveValue('0')
  view.unmount()
  expect(audio.getAttribute('src')).toBeNull()
  expect(audio.pause).toHaveBeenCalled()
})
test('sound source replacement retains the new URL and rejection is reported', async () => {
  const error = new Error('blocked')
  const onError = jest.fn()
  jest.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(error)
  const view = render(<SoundBar src="/first.mp3" onError={onError} />)
  view.rerender(<SoundBar src="/second.mp3" onError={onError} />)
  expect(view.container.querySelector('audio')).toHaveAttribute('src', '/second.mp3')
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Play music' }))
  })
  expect(onError).toHaveBeenCalledWith(error)
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
})
test('slideshow clears timers and reports automated selection', () => {
  jest.useFakeTimers()
  const change = jest.fn()
  const view = render(
    <AutoSlider
      slides={[
        { id: 1, name: 'A', image: '/a.png' },
        { id: 2, name: 'B', image: '/b.png' },
      ]}
      interval={100}
      onSelectionChange={change}
    />
  )
  act(() => {
    jest.advanceTimersByTime(100)
  })
  expect(change).toHaveBeenLastCalledWith(1)
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})
test('comparison has a named keyboard range and clamps initial value', () => {
  const change = jest.fn()
  render(<CompareAll initialSliderPercentage={150} onChange={change} />)
  const range = screen.getByRole('slider', { name: 'Image comparison' })
  expect(range).toHaveValue('100')
  fireEvent.change(range, { target: { value: '40' } })
  expect(change).toHaveBeenCalledWith(40)
})
test('carousel shrinks safely and renders caller empty content', () => {
  const view = render(<FixCarouse items={['a', 'b']} renderItem={(x) => x} itemsPerPage={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
  expect(screen.getByText('b')).toBeInTheDocument()
  view.rerender(<FixCarouse items={[]} renderItem={(x) => x} emptyLabel="Nothing here" />)
  expect(screen.getByText('Nothing here')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
})
test('lazy image works without IntersectionObserver and caption is caller supplied', () => {
  const view = render(<LazyLoadImage src="/photo.png" alt="Caller image" caption="Caller caption" />)
  expect(screen.getByAltText('Caller image')).toHaveAttribute('src', '/photo.png')
  expect(screen.getByText('Caller caption')).toBeInTheDocument()
  view.unmount()
})

test('music active=false pauses a playing element', () => {
  const view = render(<MusicPlayer tracks={tracks} active />)
  const audio = view.container.querySelector('audio')!
  jest.mocked(audio.pause).mockClear()
  view.rerender(<MusicPlayer tracks={tracks} active={false} />)
  expect(audio.pause).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('button', { name: 'Play' })).toBeDisabled()
})

test('sound ignores a pending playback rejection after unmount', async () => {
  let reject!: (reason: unknown) => void
  jest.mocked(HTMLMediaElement.prototype.play).mockReturnValue(
    new Promise<void>((_, fail) => {
      reject = fail
    })
  )
  const onError = jest.fn()
  const view = render(<SoundBar src="/track.mp3" onError={onError} />)
  fireEvent.click(screen.getByRole('button', { name: 'Play music' }))
  view.unmount()
  await act(async () => {
    reject(new Error('disposed'))
  })
  expect(onError).not.toHaveBeenCalled()
})

test('playlist selection starts playback and ended advances playback', () => {
  const view = render(<MusicPlayer tracks={tracks} />)
  const play = jest.mocked(HTMLMediaElement.prototype.play)
  play.mockClear()
  fireEvent.click(screen.getByRole('button', { name: 'Second track' }))
  expect(play).toHaveBeenCalledTimes(1)
  const audio = view.container.querySelector('audio')!
  fireEvent.ended(audio)
  expect(audio).toHaveAttribute('src', '/one.mp3')
  expect(play).toHaveBeenCalledTimes(2)
})

test('fixed player starts paused navigation, shuffles away from current track and closes', () => {
  const FixMusicPlayer = require('./FixMusicPlayer').default
  const onClose = jest.fn()
  jest.spyOn(Math, 'random').mockReturnValue(0)
  const view = render(<FixMusicPlayer tracks={tracks} onClose={onClose} />)
  fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }))
  fireEvent.click(screen.getByRole('button', { name: 'Previous track' }))
  expect(view.container.querySelector('audio')).toHaveAttribute('src', '/two.mp3')
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Close player' }))
  expect(view.container.querySelector('audio')).toBeNull()
  expect(onClose).toHaveBeenCalledTimes(1)
})
