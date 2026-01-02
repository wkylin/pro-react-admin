import { useEffect } from 'react'

const useRootClick = (cb = () => {}) => {
  useEffect(() => {
    const controller = new AbortController()
    document.documentElement.addEventListener(
      'click',
      () => {
        cb()
      },
      { signal: controller.signal }
    )
    document.documentElement.addEventListener(
      'mousedown',
      (event) => {
        if (event.detail > 1) {
          event.preventDefault()
        }
      },
      { signal: controller.signal }
    )
    return () => {
      controller.abort()
    }
  }, [])
}

export default useRootClick
