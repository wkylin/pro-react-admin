import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface DemoItem {
  id: number
  value: string
}

interface ZustandDemoState {
  count: number
  items: DemoItem[]
  increment: () => void
  decrement: () => void
  asyncIncrement: () => Promise<void>
  pushItem: () => void
  popItem: () => void
  clearItems: () => void
}

/** State used only by the Zustand demonstration page; it is intentionally not persisted globally. */
export const useZustandDemoStore = create<ZustandDemoState>()(
  immer((set, get) => ({
    count: 0,
    items: [],
    increment: () => set((state) => void (state.count += 1)),
    decrement: () => set((state) => void (state.count -= 1)),
    asyncIncrement: async () => {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 1000))
      get().increment()
    },
    pushItem: () =>
      set((state) => {
        state.items.push({ id: Date.now(), value: Math.random().toFixed(4) })
      }),
    popItem: () =>
      set((state) => {
        state.items.pop()
      }),
    clearItems: () =>
      set((state) => {
        state.items = []
      }),
  }))
)
