// src/store/types.ts
export interface CounterSlice {
  count: number
  increment: () => void
  decrement: () => void
  incrementBy: (amount: number) => void
  asyncIncrement: () => Promise<void>
}

export interface AppSlice {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export type StoreState = CounterSlice & AppSlice
