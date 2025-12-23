// src/store/index.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createCounterSlice } from './modules/counterSlice'
import { createAppSlice } from './modules/appSlice'
import { StoreState } from './types'

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createCounterSlice(...a),
        ...createAppSlice(...a),
      }),
      {
        name: 'pro-react-admin-storage',
        partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
      }
    )
  )
)
