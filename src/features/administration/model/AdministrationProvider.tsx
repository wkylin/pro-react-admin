import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react'
import { apiClient } from '@platform/api/client'
import { createRestDataProvider, type DataProvider } from '@platform/data/provider'
import { isDemoPermissionMode } from '@platform/auth/api/permission'
import { permissionService } from '@platform/auth/services/permissionService'
import { createDemoAdministrationProvider } from '../api/demoProvider'
import { createDemoAccessClient, enterpriseAccessClient, type AccessClient } from '../api/accessRequests'
import { administrationResources, type AdministrationSchema } from './resources'
import { createCachedDataProvider } from '@platform/data/cache'
import { getSessionIdentity } from '@platform/auth/model/session'
import { useSessionIdentity } from '@platform/auth/hooks/useSessionIdentity'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { subscribeResourceEvents } from '@platform/data/resourceEvents'

type AdministrationContextValue = {
  provider: DataProvider<AdministrationSchema>
  access: AccessClient
  demo: boolean
  realtime: boolean
  accessRevision: number
}
const Context = createContext<AdministrationContextValue | null>(null)
const demoAdapters = (typeof __APP_DEMO__ !== 'undefined' ? __APP_DEMO__ : isDemoPermissionMode())
  ? (() => {
      const provider = createDemoAdministrationProvider(
        () => permissionService.peekPermissions()?.username || 'demo',
        true
      )
      return { provider, access: createDemoAccessClient(provider, () => permissionService.peekPermissions()) }
    })()
  : null
export function AdministrationProvider({
  children,
  provider,
}: {
  children: ReactNode
  provider?: DataProvider<AdministrationSchema>
}) {
  const identity = useSessionIdentity()
  const { current } = usePermission()
  const permissions = JSON.stringify(current?.roles ?? [])
  return (
    <ScopedAdministration key={`${identity}|${permissions}`} provider={provider}>
      {children}
    </ScopedAdministration>
  )
}
function ScopedAdministration({
  children,
  provider,
}: {
  children: ReactNode
  provider?: DataProvider<AdministrationSchema>
}) {
  const lifetime = useRef(0)
  const [accessRevision, setAccessRevision] = useState(0)
  const [value] = useState(() => {
    const demo = !provider && isDemoPermissionMode()
    if (demo && !demoAdapters) throw new Error('Demo administration requires a demo build')
    return {
      demo,
      realtime: !provider && !demo,
      access: demo ? demoAdapters!.access : enterpriseAccessClient,
      provider: createCachedDataProvider(
        provider ?? (demo ? demoAdapters!.provider : createRestDataProvider(apiClient, administrationResources)),
        {
          scope: getSessionIdentity(),
          getScope: getSessionIdentity,
          related: (resource) => (resource === 'roles' ? ['users', 'audit'] : resource === 'users' ? ['audit'] : []),
        }
      ),
    }
  })
  // Dispose after the final unmount, preserving React StrictMode's immediate effect replay.
  useEffect(() => {
    lifetime.current += 1
    return () => {
      const ended = ++lifetime.current
      queueMicrotask(() => {
        if (lifetime.current === ended) value.provider.dispose()
      })
    }
  }, [value])
  useEffect(() => {
    if (!value.realtime) return
    return subscribeResourceEvents((resource) => {
      if (resource === 'access_requests' || resource === undefined) setAccessRevision((revision) => revision + 1)
      if (resource !== 'access_requests') value.provider.invalidate?.(resource)
      if (resource === 'roles' || resource === 'users' || resource === undefined)
        void permissionService.getPermissions(true)
    })
  }, [value])
  return <Context.Provider value={{ ...value, accessRevision }}>{children}</Context.Provider>
}
export function useAdministration() {
  const value = useContext(Context)
  if (!value) throw new Error('AdministrationProvider required')
  return value
}
