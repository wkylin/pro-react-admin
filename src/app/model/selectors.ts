import type { AppState } from './types'

export const selectIsMobile = (state: AppState): boolean => !state.screens.md
