import { useSyncExternalStore } from 'react'
import { getSessionIdentity, subscribeSession } from '../model/session'

/** A stable primitive snapshot; no mutable business data survives an identity change. */
export function useSessionIdentity(): string {
  return useSyncExternalStore(subscribeSession, getSessionIdentity, () => 'anonymous')
}
