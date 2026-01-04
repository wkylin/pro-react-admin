// src/store/modules/counterSlice.ts
import { StateCreator } from 'zustand'
import { StoreState, CounterSlice } from '../types'

export const createCounterSlice: StateCreator<StoreState, [['zustand/immer', never]], [], CounterSlice> = (
  set,
  get
) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
  asyncIncrement: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    get().increment()
  },
})
