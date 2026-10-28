import type { ReactNode } from 'react'
export interface ApiStateHandlerProps {
  loading?: boolean
  error?: unknown
  children?: ReactNode
  loadingFallback?: ReactNode
  errorFallback?: ReactNode
}
export default function ApiStateHandler({
  loading,
  error,
  children,
  loadingFallback = null,
  errorFallback = null,
}: ApiStateHandlerProps) {
  return <>{loading ? loadingFallback : error ? errorFallback : children}</>
}
