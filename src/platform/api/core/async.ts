export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => globalThis.setTimeout(resolve, Math.max(0, ms)))

export async function withTimeout<T>(promise: Promise<T>, timeout: number, message = '请求超时'): Promise<T> {
  let timer: ReturnType<typeof globalThis.setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = globalThis.setTimeout(() => reject(new Error(message)), timeout)
      }),
    ])
  } finally {
    if (timer !== undefined) globalThis.clearTimeout(timer)
  }
}

/** Attempts include the initial call. Retrying writes must be an explicit caller decision. */
export async function retry<T>(task: () => Promise<T>, attempts = 3, delayMs = 500): Promise<T> {
  if (!Number.isInteger(attempts) || attempts < 1) throw new RangeError('attempts must be a positive integer')
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await task()
    } catch (error) {
      const cancelled =
        error instanceof Error &&
        (error.name === 'AbortError' ||
          error.name === 'CanceledError' ||
          ('code' in error && error.code === 'ERR_CANCELED'))
      if (attempt >= attempts || cancelled) throw error
      await delay(delayMs * attempt)
    }
  }
}

export async function runWithConcurrency<T>(tasks: Array<() => Promise<T> | T>, concurrency = 5): Promise<T[]> {
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new RangeError('concurrency must be a positive integer')
  const results = new Array<T>(tasks.length)
  let next = 0
  let failed = false
  const worker = async () => {
    while (!failed && next < tasks.length) {
      const index = next++
      try {
        results[index] = await tasks[index]()
      } catch (error) {
        failed = true
        throw error
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker))
  return results
}
