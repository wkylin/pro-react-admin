import { useEffect, useState } from 'react'

const useSystemTheme = () => {
  const [theme, setTheme] = useState('light')
  useEffect(
    () => () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light')
      }

      setTheme(mediaQuery.matches ? 'dark' : 'light')
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    },
    []
  )

  return { theme }
}

export default useSystemTheme
