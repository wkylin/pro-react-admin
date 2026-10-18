import { createKeepAliveManager } from './index'

beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.useRealTimers())
test('inactive pages retain drafts within the LRU bound and evict the oldest page', () => {
  const manager = createKeepAliveManager({ limit: 2 })
  const first = jest.fn(),
    second = jest.fn(),
    third = jest.fn()
  for (const [id, setter] of [
    ['first', first],
    ['second', second],
    ['third', third],
  ] as const)
    manager.register(id, { setShouldRender: setter, persistOnUnmount: false })
  manager.activate('first')
  manager.deactivate('first')
  manager.activate('second')
  manager.deactivate('second')
  jest.advanceTimersByTime(1000)
  expect(first).not.toHaveBeenCalledWith(false)
  manager.activate('third')
  expect(first).toHaveBeenCalledWith(false)
  expect(second).not.toHaveBeenCalledWith(false)
  manager.dispose()
  expect(jest.getTimerCount()).toBe(0)
})
test('zero inactive retention and reactivation cancel delayed unmounts correctly', () => {
  const manager = createKeepAliveManager({ keepInactiveCount: 0, deactivateDelay: 100 })
  const setter = jest.fn()
  manager.register('/', { setShouldRender: setter, persistOnUnmount: false })
  manager.activate('/')
  manager.deactivate('/')
  manager.activate('/')
  jest.advanceTimersByTime(200)
  expect(setter).not.toHaveBeenCalledWith(false)
  manager.deactivate('/')
  jest.advanceTimersByTime(200)
  expect(setter).toHaveBeenCalledWith(false)
})
test('same path in two application caches never collides', () => {
  const first = createKeepAliveManager(),
    second = createKeepAliveManager()
  const firstSetter = jest.fn(),
    secondSetter = jest.fn()
  first.register('/', { setShouldRender: firstSetter, persistOnUnmount: true })
  second.register('/', { setShouldRender: secondSetter, persistOnUnmount: true })
  first.forceDrop('/')
  expect(firstSetter).toHaveBeenCalledWith(false)
  expect(secondSetter).not.toHaveBeenCalled()
})
