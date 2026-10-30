import { useEffect } from 'react'

export const useRemoveGlobalLoader = () => {
  useEffect(() => {
    let fallbackTimer = 0
    const finish = () => {
      window.clearTimeout(fallbackTimer)
      if (window.__wuiBootSplash) {
        window.__wuiBootSplash.done()
      } else {
        document.getElementById('global-loader')?.remove()
      }
    }

    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(finish)
    })
    // Browsers can pause animation frames in background tabs.
    fallbackTimer = window.setTimeout(finish, 600)

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      window.clearTimeout(fallbackTimer)
    }
  }, [])
}
