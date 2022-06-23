import { useCallback, useEffect, useRef, useState } from 'react'

// 1. Fetch on mount
// 2. Fetch on the button click
// 3. Fetch on params change
const useAsyncFetch = (asyncFuntion, args = [], deps = [], immediate = true) => {
  const isFirstUpdate = useRef(true)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const execute = useCallback(() => {
    setLoading(true)
    setResponse(null)
    setError(null)
    return asyncFuntion(...args)
      .then((res) => {
        setResponse(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [asyncFuntion, args])
  useEffect(() => {
    if (immediate || !isFirstUpdate.current) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, execute, ...deps])
  useEffect(() => {
    isFirstUpdate.current = false
  }, [])
  return { execute, response, error, loading }
}

export default useAsyncFetch
