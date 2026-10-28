import { render } from '@testing-library/react'
jest.mock('video.js', () => ({ __esModule: true, default: jest.fn() }))
const videojs = require('video.js').default as jest.Mock
const Video = require('./index').default
test('video.js receives updates and is disposed on unmount', () => {
  const player = {
    dispose: jest.fn(),
    isDisposed: jest.fn(() => false),
    autoplay: jest.fn(),
    src: jest.fn(),
    controls: jest.fn(),
    fluid: jest.fn(),
    poster: jest.fn(),
  }
  videojs.mockReturnValue(player)
  const view = render(<Video options={{ sources: [{ src: '/first.mp4' }] }} />)
  expect(videojs).toHaveBeenCalledTimes(1)
  view.rerender(<Video options={{ sources: [{ src: '/second.mp4' }], controls: true }} />)
  expect(player.src).toHaveBeenLastCalledWith([{ src: '/second.mp4' }])
  expect(player.controls).toHaveBeenCalledWith(true)
  view.unmount()
  expect(player.dispose).toHaveBeenCalledTimes(1)
})
