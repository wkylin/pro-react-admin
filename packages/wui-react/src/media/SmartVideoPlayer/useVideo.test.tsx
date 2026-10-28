import { renderHook } from '@testing-library/react'
import useVideo from './useVideo'
import { createSvpI18n } from './svpI18n'

test('video hook removes event listeners and pauses on disposal', () => {
  const video = document.createElement('video')
  const pause = jest.spyOn(video, 'pause').mockImplementation(() => {})
  const remove = jest.spyOn(video, 'removeEventListener')
  const ref = { current: video }
  const { unmount } = renderHook(() => useVideo(ref))
  unmount()
  for (const event of ['volumechange', 'play', 'pause', 'timeupdate'])
    expect(remove).toHaveBeenCalledWith(event, expect.any(Function))
  expect(pause).toHaveBeenCalled()
})
test('player language instances have independent caller overrides', () => {
  const first = createSvpI18n('en', { play: 'Caller play' })
  const second = createSvpI18n('en')
  expect(first.t('svp.play')).toBe('Caller play')
  expect(second.t('svp.play')).toBe('Play')
})
