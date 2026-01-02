import { useState, useEffect } from 'react'

const usePersistedState = (defaultValue, localStorageKey) => {
  const [value, setValue] = useState(() => {
    const localStorageItem = localStorage.getItem(localStorageKey)
    if (localStorageItem === null) return defaultValue
    try {
      return JSON.parse(localStorageItem)
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value])

  // Expose the value and the updater function.
  return [value, setValue]
}

export default usePersistedState
