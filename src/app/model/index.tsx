import { createContext, useContext, useState, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'
import { createAppSlice } from './modules/appSlice'
import type { AppState } from './types'

/** Each application root owns its state; only shell preferences are persisted. */
export function createAppStore(projectId: string, persistState = true) {
  if (!/^[A-Za-z0-9_-]+$/.test(projectId)) throw new Error('Invalid application projectId')
  return createStore<AppState>()(
    devtools(
      persist(createAppSlice, {
        name: `pro-react-admin:${projectId}:shell`,
        version: 1,
        partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
        ...(persistState ? {} : { storage: undefined }),
      }),
      { name: `${projectId}/shell`, enabled: process.env.NODE_ENV === 'development' }
    )
  )
}

export type AppStore = ReturnType<typeof createAppStore>
const AppStoreContext = createContext<{ projectId: string; store: AppStore } | null>(null)

export function AppStoreProvider({
  projectId,
  children,
  store: suppliedStore,
}: {
  projectId: string
  children: ReactNode
  store?: AppStore
}) {
  const [scope] = useState(() => ({ projectId, store: suppliedStore ?? createAppStore(projectId) }))
  if (scope.projectId !== projectId) throw new Error('Remount AppStoreProvider when changing projects')
  return <AppStoreContext.Provider value={scope}>{children}</AppStoreContext.Provider>
}

export function useApplicationScope() {
  const scope = useContext(AppStoreContext)
  if (!scope) throw new Error('Application state requires AppStoreProvider')
  return scope
}

export function useAppStore<T>(selector: (state: AppState) => T): T {
  return useStore(useApplicationScope().store, selector)
}

export { selectIsMobile } from './selectors'
