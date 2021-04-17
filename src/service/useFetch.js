import { useState, useEffect } from 'react'

function useFetch(url, opts) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(url, opts)
      .then((response) => response.json())
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch(() => {
        setHasError(true)
        setLoading(false)
      })
  }, [url])
  return [response, loading, hasError]
}

export default useFetch
