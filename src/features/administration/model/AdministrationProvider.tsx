import { createContext, useContext, useState, type ReactNode } from 'react'
import { apiClient } from '@platform/api/client'
import { createRestDataProvider, type DataProvider } from '@platform/data/provider'
import { isDemoPermissionMode } from '@platform/auth/api/permission'
import { permissionService } from '@platform/auth/services/permissionService'
import { createDemoAdministrationProvider } from '../api/demoProvider'
import { administrationResources, type AdministrationSchema } from './resources'

type AdministrationContextValue = { provider: DataProvider<AdministrationSchema>; demo: boolean }
const Context = createContext<AdministrationContextValue | null>(null)
export function AdministrationProvider({
  children,
  provider,
}: {
  children: ReactNode
  provider?: DataProvider<AdministrationSchema>
}) {
  const [value] = useState(() => {
    const demo = !provider && isDemoPermissionMode()
    return {
      demo,
      provider:
        provider ??
        (demo
          ? createDemoAdministrationProvider(() => permissionService.peekPermissions()?.username || 'demo')
          : createRestDataProvider(apiClient, administrationResources)),
    }
  })
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAdministration() {
  const value = useContext(Context)
  if (!value) throw new Error('AdministrationProvider required')
  return value
}
