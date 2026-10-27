import { useEffect } from 'react'

const noop = () => {}

const useRootClick = (cb = noop) => {
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
  }, [cb])
}

export default useRootClick
