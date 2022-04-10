/**
 * Fetch Hooks
 * url： api endpoint
 * opts: 参见 fetch.js
 */
import { useEffect, useState, useCallback } from 'react'
import { reqFetch } from './fetch'

export const useReqFetch = (url, opts) => {
  const [res, setRes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const asyncFetch = async (canceled, controller) => {
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
    asyncFetch(canceled, controller)
    return () => {
      setRes(() => {}) // return undefined
      canceled = true
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, opts])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reFetch, [])

  return [res, loading, error]
}

export const usePostFetch = (url, opts) =>
  useReqFetch(url, {
    ...opts,
    method: 'POST',
  })

export const useGetFetch = (url, opts) =>
  useReqFetch(url, {
    ...opts,
    method: 'GET',
  })

export const usePutFetch = (url, opts) =>
  useReqFetch(url, {
    ...opts,
    method: 'PUT',
  })

export const useDeleteFetch = (url, opts) =>
  useReqFetch(url, {
    ...opts,
    method: 'DELETE',
  })

export const usePatchFetch = (url, opts) =>
  useReqFetch(url, {
    ...opts,
    method: 'PATCH',
  })
