/**
 * Fetch Hooks
 * url： api endpoint
 * opts: 参见 fetch.js
 */
import { useEffect, useState } from 'react'
import { reqFetch } from './fetch'

export const useReqFetch = (url, opts) => {
  const [res, setRes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const useAsyncFetch = async (canceled, controller) => {
    try {
      if (loading) return
      setLoading(true)
      const resData = await reqFetch(url, {
        ...opts,
        controller,
      })
      if (!canceled) {
        setRes(resData)
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const reFetch = useCallback(() => {
    let canceled = false
    const controller = new AbortController()
    useAsyncFetch(canceled, controller)
    return () => {
      setRes(() => {}) // return undefined
      canceled = true
      controller.abort()
    }
  }, [url, opts])

  useEffect(reFetch, [])

  return [res, loading, error]
}

export const usePostFetch = (url, opts) => {
  return useReqFetch(url, {
    ...opts,
    method: 'POST',
  })
}

export const useGetFetch = (url, opts) => {
  return useReqFetch(url, {
    ...opts,
    method: 'GET',
  })
}
