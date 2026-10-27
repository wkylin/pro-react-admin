import { isModuleLoadFailure, recoverModuleLoadFailure } from './moduleLoadRecovery'

const createStorage = () => {
  const values = new Map<string, string>()
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value)
    },
  }
}

test('reloads once when an old page requests a missing dynamic module', () => {
  const storage = createStorage()
  const reload = jest.fn()
  const error = new TypeError(
    'Failed to fetch dynamically imported module: http://localhost:8080/@fs/project/src/pages/crypto/index.tsx'
  )

  expect(isModuleLoadFailure(error)).toBe(true)
  expect(recoverModuleLoadFailure(error, { storage, reload, now: 1_000 })).toBe(true)
  expect(recoverModuleLoadFailure(error, { storage, reload, now: 2_000 })).toBe(false)
  expect(reload).toHaveBeenCalledTimes(1)
})

test('does not reload for application errors or repeat a persistent chunk failure immediately', () => {
  const storage = createStorage()
  const reload = jest.fn()

  expect(recoverModuleLoadFailure(new Error('Invalid user data'), { storage, reload, now: 1_000 })).toBe(false)
  expect(recoverModuleLoadFailure(new Error('Loading chunk 42 failed'), { storage, reload, now: 1_000 })).toBe(true)
  expect(recoverModuleLoadFailure(new Error('Loading chunk 43 failed'), { storage, reload, now: 2_000 })).toBe(false)
  expect(reload).toHaveBeenCalledTimes(1)
})
