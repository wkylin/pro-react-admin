const useThrottle = (func, delay = 1000) => {
  let prev = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - prev > delay) {
      prev = now
      return func(...args)
    }
  }
}

export default useThrottle
