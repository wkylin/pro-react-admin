import { useEffect, useState } from 'react'

const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => setSystemTheme(event.matches ? 'dark' : 'light')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleChange)
    else mediaQuery.addListener(handleChange)

    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', handleChange)
      else mediaQuery.removeListener(handleChange)
    }
  }, [])

  return { theme: systemTheme }
}

export default useSystemTheme
