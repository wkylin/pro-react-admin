// src/store/index.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createCounterSlice } from './modules/counterSlice'
import { createAppSlice } from './modules/appSlice'
import { createImmerDemoSlice } from './modules/immerDemoSlice'
import { StoreState } from './types'

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((set, get, api) => ({
        ...createCounterSlice(set, get, api),
        ...createAppSlice(set, get, api),
        ...createImmerDemoSlice(set, get, api),
      })),
      {
        name: 'pro-react-admin-storage',
        partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
      }
    )
  )
)
