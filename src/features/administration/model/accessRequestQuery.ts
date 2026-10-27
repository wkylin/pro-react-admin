import type { AccessStatus } from '../api/accessRequests'

const statuses: AccessStatus[] = ['pending', 'approved', 'rejected', 'stale']

export function readAccessRequestQuery(params: URLSearchParams): { page: number; status?: AccessStatus } {
  const rawPage = Number(params.get('page'))
  const page = Number.isInteger(rawPage) && rawPage > 0 && rawPage <= 1000000 ? rawPage : 1
  const rawStatus = params.get('status')
  const status = rawStatus === 'all' ? undefined : (statuses.find((candidate) => candidate === rawStatus) ?? 'pending')
  return { page, status }
}

export function writeAccessRequestQuery(
  params: URLSearchParams,
  { nextPage, nextStatus }: { nextPage?: number; nextStatus?: AccessStatus | 'all' }
): URLSearchParams {
  const next = new URLSearchParams(params)
  if (nextPage !== undefined) {
    if (nextPage > 1) next.set('page', String(nextPage))
    else next.delete('page')
  }
  if (nextStatus !== undefined) {
    if (nextStatus === 'pending') next.delete('status')
    else next.set('status', nextStatus)
  }
  return next
}
