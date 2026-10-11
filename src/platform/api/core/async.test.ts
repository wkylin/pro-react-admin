import { retry, runWithConcurrency, withTimeout } from './async'
import { CanceledError } from 'axios'

test('limits active tasks and preserves input order', async () => {
  let active = 0
  let peak = 0
  const tasks = [1, 2, 3, 4].map((value) => async () => {
    peak = Math.max(peak, ++active)
    await Promise.resolve()
    active -= 1
    return value
  })
  await expect(runWithConcurrency(tasks, 2)).resolves.toEqual([1, 2, 3, 4])
  expect(peak).toBe(2)
})

test('does not retry a caller cancellation', async () => {
  const task = jest.fn().mockRejectedValue(new DOMException('cancelled', 'AbortError'))
  await expect(retry(task, 3, 0)).rejects.toHaveProperty('name', 'AbortError')
  expect(task).toHaveBeenCalledTimes(1)
})

test('does not retry Axios cancellation', async () => {
  const task = jest.fn().mockRejectedValue(new CanceledError('cancelled'))
  await expect(retry(task, 3, 0)).rejects.toHaveProperty('code', 'ERR_CANCELED')
  expect(task).toHaveBeenCalledTimes(1)
})

test('clears timeout timers after an early completion', async () => {
  jest.useFakeTimers()
  try {
    await expect(withTimeout(Promise.resolve(1), 3000)).resolves.toBe(1)
    expect(jest.getTimerCount()).toBe(0)
    const pending = withTimeout(new Promise(() => {}), 10)
    const expectation = expect(pending).rejects.toThrow('请求超时')
    await jest.advanceTimersByTimeAsync(10)
    await expectation
    expect(jest.getTimerCount()).toBe(0)
  } finally {
    jest.useRealTimers()
  }
})
