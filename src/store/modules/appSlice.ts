import type { StateCreator } from 'zustand'
import type { AppState } from '../types'

export const createAppSlice: StateCreator<AppState> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  screens: { md: true },
  setScreens: (screens) => set({ screens }),
})
