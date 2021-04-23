/**
 * Fetch Hooks
 * url： api endpoint
 * opts: 参见 fetch.js
 */

import { useState, useEffect } from 'react'
import httpFetch from './fetch'

function useReqFetch(url, opts) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    let canceled = false
    httpFetch
      .reqFetch(url, opts)
      .then((res) => {
        if (!canceled) {
          setResponse(res)
        }
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => (canceled = true)
  }, [url, opts])
  return [response, loading, hasError]
}

export default useReqFetch
