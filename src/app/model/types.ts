export interface AppState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  screens: Record<string, boolean | undefined>
  setScreens: (screens: Record<string, boolean | undefined>) => void
}
