import { useEffect } from 'react'
import { Grid } from 'antd'
import { useAppStore } from '@app/model'

const { useBreakpoint } = Grid

const GlobalBreakpointListener = ({ manageDocument = true }: { manageDocument?: boolean }) => {
  const setScreens = useAppStore((s) => s.setScreens)
  const screens = useBreakpoint()

  useEffect(() => {
    // screens is an object like { xs: true, sm: true, md: false, ... }
    if (typeof setScreens === 'function') setScreens(screens)
    if (!manageDocument) return

    // add/remove global class on <html> to allow CSS class-based responsive rules
    try {
      const root = document.documentElement
      if (root) {
        if (!screens.md) {
          root.classList.add('is-mobile')
          root.classList.remove('is-desktop')
        } else {
          root.classList.add('is-desktop')
          root.classList.remove('is-mobile')
        }
      }
    } catch {
      // ignore in non-browser environments
    }
  }, [screens, setScreens, manageDocument])

  return null
}

export default GlobalBreakpointListener
