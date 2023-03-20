import { useRef, useEffect, useCallback } from 'react'

const useDebounce = (fn, delay) => {
  const timerRef = useRef(null)
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    []
  )

  const fnDebounced = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        const that = this
        fnRef.current.apply(that, args)
      }, delay)
    },
    [delay]
  )

  return fnDebounced
}

export default useDebounce
