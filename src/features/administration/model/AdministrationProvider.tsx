import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react'
import { apiClient } from '@platform/api/client'
import { createRestDataProvider, type DataProvider } from '@platform/data/provider'
import { isDemoPermissionMode } from '@platform/auth/api/permission'
import { permissionService } from '@platform/auth/services/permissionService'
import { createDemoAdministrationProvider } from '../api/demoProvider'
import { administrationResources, type AdministrationSchema } from './resources'
import { createCachedDataProvider } from '@platform/data/cache'
import { getSessionIdentity } from '@platform/auth/model/session'
import { useSessionIdentity } from '@platform/auth/hooks/useSessionIdentity'
import { usePermission } from '@platform/auth/hooks/usePermission'

type AdministrationContextValue = { provider: DataProvider<AdministrationSchema>; demo: boolean }
const Context = createContext<AdministrationContextValue | null>(null)
export function AdministrationProvider({
  children,
  provider,
}: {
  children: ReactNode
  provider?: DataProvider<AdministrationSchema>
}) {
  const identity = useSessionIdentity()
  const { current } = usePermission()
  const permissions = JSON.stringify(current?.permissions ?? [])
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
  const [value] = useState(() => {
    const demo = !provider && isDemoPermissionMode()
    return {
      demo,
      provider: createCachedDataProvider(
        provider ??
          (demo
            ? createDemoAdministrationProvider(() => permissionService.peekPermissions()?.username || 'demo')
            : createRestDataProvider(apiClient, administrationResources)),
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
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAdministration() {
  const value = useContext(Context)
  if (!value) throw new Error('AdministrationProvider required')
  return value
}
