export const PWA_UPDATE_READY_EVENT = 'pwa:update-ready'

export type PwaBuildMeta = {
  version: string
  buildTime: string
}

export type PwaUpdateReadyDetail = {
  meta: PwaBuildMeta | null
  applyUpdate: () => Promise<void>
}

export const emitPwaUpdateReady = (detail: PwaUpdateReadyDetail) => {
  window.dispatchEvent(new CustomEvent<PwaUpdateReadyDetail>(PWA_UPDATE_READY_EVENT, { detail }))
}
