import { useCallback, useEffect, useMemo, useState, type SetStateAction } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ListQuery, ListResult } from '@platform/data/provider'
import type { AdministrationSchema } from './resources'
import { useAdministration } from './AdministrationProvider'

const positiveInt = (value: string | null, fallback: number, limit = 1000000) => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 && parsed <= limit ? parsed : fallback
}

export function readListQuery(params: URLSearchParams): ListQuery {
  const search = params.get('search')?.trim() || undefined
  const sort = params.get('sort') || undefined
  return {
    page: positiveInt(params.get('page'), 1),
    pageSize: positiveInt(params.get('size'), 10, 200),
    ...(search ? { search } : {}),
    ...(sort ? { sort, order: params.get('order') === 'desc' ? 'desc' : 'asc' } : {}),
  }
}

export function writeListQuery(params: URLSearchParams, query: ListQuery): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const key of ['page', 'size', 'search', 'sort', 'order']) next.delete(key)
  if (query.page > 1) next.set('page', String(query.page))
  if (query.pageSize !== 10) next.set('size', String(query.pageSize))
  if (query.search?.trim()) next.set('search', query.search.trim())
  if (query.sort) {
    next.set('sort', query.sort)
    if (query.order === 'desc') next.set('order', 'desc')
  }
  return next
}

export function useResourceList<K extends keyof AdministrationSchema>(resource: K) {
  const { provider } = useAdministration()
  const [params, setSearchParams] = useSearchParams()
  const query = useMemo(() => readListQuery(params), [params])
  const setQuery = useCallback(
    (update: SetStateAction<ListQuery>) =>
      setSearchParams(
        (previous) => {
          const current = readListQuery(previous)
          const next = typeof update === 'function' ? update(current) : update
          return writeListQuery(previous, next)
        },
        { replace: true }
      ),
    [setSearchParams]
  )
  const [revision, setRevision] = useState(0)
  const [state, setState] = useState<{ data: ListResult<AdministrationSchema[K]>; loading: boolean; error?: string }>({
    data: { items: [], total: 0 },
    loading: true,
  })
  useEffect(() => provider.subscribe?.(resource, () => setRevision((value) => value + 1)), [provider, resource])
  useEffect(() => {
    const controller = new AbortController()
    setState((current) => ({ ...current, loading: true, error: undefined }))
    void provider.list(resource, query, { signal: controller.signal, showError: false }).then(
      (data) => {
        if (controller.signal.aborted) return
        if (data.total > 0 && query.page > Math.ceil(data.total / query.pageSize)) {
          setQuery((current) => ({ ...current, page: Math.ceil(data.total / current.pageSize) }))
        } else setState({ data, loading: false })
      },
      (error) => {
        if (!controller.signal.aborted)
          setState((current) => ({
            ...current,
            loading: false,
            error: error instanceof Error ? error.message : '加载失败',
          }))
      }
    )
    return () => controller.abort()
  }, [provider, resource, query, revision, setQuery])
  const reload = useCallback(() => {
    provider.invalidate?.(resource)
    if (!provider.subscribe) setRevision((value) => value + 1)
  }, [provider, resource])
  const search = useCallback(
    (value: string) => setQuery((current) => ({ ...current, page: 1, search: value })),
    [setQuery]
  )
  return { ...state, query, setQuery, reload, search }
}
