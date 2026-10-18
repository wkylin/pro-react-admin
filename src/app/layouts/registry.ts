import type { LayoutMode, LayoutPresetConfig, LayoutRegistry, LayoutRegistryOverrides } from './types'

const presetDefaults: LayoutRegistry = {
  side: {
    id: 'side',
    showSider: true,
    secondaryNavigation: 'sider',
    showTabs: true,
    slots: {},
  },
  top: {
    id: 'top',
    showSider: false,
    secondaryNavigation: 'header',
    showTabs: true,
    slots: {},
  },
  // `mix` currently retains the established side navigation composition. The
  // dedicated entry lets applications customize it without changing `side`.
  mix: {
    id: 'mix',
    showSider: true,
    secondaryNavigation: 'sider',
    showTabs: true,
    slots: {},
  },
}

const mergePreset = (id: LayoutMode, overrides: LayoutRegistryOverrides): LayoutPresetConfig => {
  const base = presetDefaults[id]
  const override = overrides[id]

  return {
    ...base,
    ...override,
    id,
    slots: { ...base.slots, ...override?.slots },
  }
}

/** Create a complete layout registry from the defaults and per-preset overrides. */
export const createLayoutRegistry = (overrides: LayoutRegistryOverrides = {}): LayoutRegistry => ({
  side: mergePreset('side', overrides),
  top: mergePreset('top', overrides),
  mix: mergePreset('mix', overrides),
})

export const defaultLayoutRegistry = createLayoutRegistry()
