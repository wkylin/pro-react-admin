const useDebounce = (func, timeout = 1000) => {
  let timer = null
  return (...args) => {
    if (!timer) {
      func.apply(this.args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export default useDebounce
