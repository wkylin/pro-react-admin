// src/store/modules/appSlice.ts
import { StateCreator } from 'zustand'
import { StoreState, AppSlice, AppResponsive, Screens } from '../types'

export const createAppSlice: StateCreator<StoreState, [['zustand/immer', never]], [], AppSlice & AppResponsive> = (
  set
) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  // responsive state
  isMobile: false,
  screens: {} as Screens,
  setScreens: (screens: Screens) => set({ screens, isMobile: !screens?.md }),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
})
