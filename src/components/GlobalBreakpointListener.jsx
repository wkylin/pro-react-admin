import React, { useEffect } from 'react'
import { Grid } from 'antd'
import { useStore } from '@/store'

const { useBreakpoint } = Grid

const GlobalBreakpointListener = () => {
  const setScreens = useStore((s) => s.setScreens)
  const setIsMobile = useStore((s) => s.setIsMobile)
  const screens = useBreakpoint()

  useEffect(() => {
    // screens is an object like { xs: true, sm: true, md: false, ... }
    if (typeof setScreens === 'function') setScreens(screens)
    if (typeof setIsMobile === 'function') setIsMobile(!screens.md)

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
    } catch (err) {
      // ignore in non-browser environments
    }
  }, [screens, setScreens, setIsMobile])

  return null
}

export default GlobalBreakpointListener
