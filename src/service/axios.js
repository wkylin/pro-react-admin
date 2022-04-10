// https://axios-http.com/
// https://axios-http.com/docs/cancellation
// https://www.npmjs.com/package/axios-retry
import axios from 'axios'

import { useEffect, useState } from 'react'

// Get 方式
const useFetcher = ({ url }) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    status: 'idle',
  })

  useEffect(() => {
    const controller = new AbortController()
    let shouldSetData = true
    setState({ data: null, error: null, status: 'loading' })
    ;(async () => {
      try {
        const response = await axios.get(url, { signal: controller.signal })
        if (shouldSetData) {
          setState({ data: response, error: null, status: 'resolved' })
        }
      } catch (error) {
        if (shouldSetData) {
          setState({ data: null, error, status: 'errored' })
        }
      }
    })()
    return () => {
      shouldSetData = false
      controller.abort()
    }
  }, [url])
  return state
}

export default useFetcher
