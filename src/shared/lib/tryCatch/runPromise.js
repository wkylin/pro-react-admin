// Async variant of tryCatch(): wraps a promise-returning function.
const runPromise = async (fn) => {
  try {
    const d = await fn()
    return [d, null]
  } catch (e) {
    return [null, e]
  }
}

export default runPromise
