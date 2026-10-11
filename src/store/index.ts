import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createAppSlice } from './modules/appSlice'
import type { AppState } from './types'

/** Global state is reserved for application-shell state shared across routes. */
export const useAppStore = create<AppState>()(
  devtools(
    persist(createAppSlice, {
      name: 'pro-react-admin-storage',
      partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
    })
  )
)

export { selectIsMobile } from './selectors'
