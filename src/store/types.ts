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

export type Screens = Record<string, boolean>

export interface AppResponsive {
  // responsive
  isMobile: boolean
  screens: Screens
  setScreens: (screens: Screens) => void
  setIsMobile: (isMobile: boolean) => void
}

export interface ImmerItem {
  id: number
  value: string
}

export interface ImmerDemoSlice {
  immerItems: ImmerItem[]
  pushImmerItem: () => void
  popImmerItem: () => void
  clearImmerItems: () => void
}

export type StoreState = CounterSlice & AppSlice & AppResponsive & ImmerDemoSlice
