/**
 * Fetch Hooks
 * url： api endpoint
 * opts: 参见 fetch.js
 */
import { useEffect, useState, useCallback } from 'react'
import { reqFetch } from './fetch'

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useEffect(() => {
    ref.current = fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies])

  return useCallback(() => {
    const fun = ref.current
    return fun()
  }, [ref])
}

export const useReqFetch = (url, opts) => {
  const [res, setRes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const asyncFetch = useCallback(async (paramCanceled, paramController) => {
    try {
      if (loading) return
      setLoading(true)
      const resData = await reqFetch(url, {
        ...opts,
        paramController,
      })
      if (!paramCanceled) {
        setRes(resData)
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let canceled = false
    const controller = new AbortController()
    asyncFetch(canceled, controller)
    return () => {
      setRes(() => {}) // return undefined
      canceled = true
      controller.abort()
    }
  }, [asyncFetch])

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

export const usePutFetch = (url, opts) => {
  return useReqFetch(url, {
    ...opts,
    method: 'PUT',
  })
}

export const useDeleteFetch = (url, opts) => {
  return useReqFetch(url, {
    ...opts,
    method: 'DELETE',
  })
}

export const usePatchFetch = (url, opts) => {
  return useReqFetch(url, {
    ...opts,
    method: 'PATCH',
  })
}
