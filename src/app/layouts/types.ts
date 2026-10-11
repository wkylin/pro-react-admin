import type { ReactNode } from 'react'

/** Visual layout presets exposed by the theme settings. */
export type LayoutMode = 'side' | 'top' | 'mix'

/** Stable extension points around the built-in application shell. */
export interface LayoutSlots {
  headerStart?: ReactNode
  headerEnd?: ReactNode
  siderStart?: ReactNode
  siderEnd?: ReactNode
  contentStart?: ReactNode
  contentEnd?: ReactNode
}

export interface LayoutPresetConfig {
  id: LayoutMode
  showSider: boolean
  secondaryNavigation: 'header' | 'sider'
  showTabs: boolean
  slots: LayoutSlots
}

export type LayoutRegistry = Record<LayoutMode, LayoutPresetConfig>

export type LayoutPresetOverride = Partial<Omit<LayoutPresetConfig, 'id' | 'slots'>> & {
  slots?: Partial<LayoutSlots>
}

export type LayoutRegistryOverrides = Partial<Record<LayoutMode, LayoutPresetOverride>>
