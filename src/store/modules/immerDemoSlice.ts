import { StateCreator } from 'zustand'
import { ImmerDemoSlice, StoreState } from '../types'

export const createImmerDemoSlice: StateCreator<StoreState, [['zustand/immer', never]], [], ImmerDemoSlice> = (
  set
) => ({
  immerItems: [],
  pushImmerItem: () =>
    set((state) => {
      state.immerItems.push({ id: Date.now(), value: Math.random().toFixed(4) })
    }),
  popImmerItem: () =>
    set((state) => {
      state.immerItems.pop()
    }),
  clearImmerItems: () =>
    set((state) => {
      state.immerItems = []
    }),
})
