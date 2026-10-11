import { useCallback, useEffect, useState } from 'react'
import type { ListQuery, ListResult } from '@platform/data/provider'
import type { AdministrationSchema } from './resources'
import { useAdministration } from './AdministrationProvider'

export function useResourceList<K extends keyof AdministrationSchema>(resource: K) {
  const { provider } = useAdministration()
  const [query, setQuery] = useState<ListQuery>({ page: 1, pageSize: 10 })
  const [revision, setRevision] = useState(0)
  const [state, setState] = useState<{ data: ListResult<AdministrationSchema[K]>; loading: boolean; error?: string }>({
    data: { items: [], total: 0 },
    loading: true,
  })
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
  }, [provider, resource, query, revision])
  const reload = useCallback(() => setRevision((value) => value + 1), [])
  const search = useCallback((value: string) => setQuery((current) => ({ ...current, page: 1, search: value })), [])
  return { ...state, query, setQuery, reload, search }
}
