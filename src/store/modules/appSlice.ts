// src/store/modules/appSlice.ts
import { StateCreator } from 'zustand'
import { StoreState, AppSlice } from '../types'

export const createAppSlice: StateCreator<StoreState, [], [], AppSlice> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
})
