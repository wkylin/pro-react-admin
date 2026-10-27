/** Correlation IDs are diagnostic only and never carry user or tenant information. */
export function createRequestId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`
}

export function requestIdForApi(url: string, explicit?: string): string | undefined {
  if (explicit !== undefined) {
    const valid =
      typeof explicit === 'string' &&
      explicit.length >= 8 &&
      explicit.length <= 128 &&
      !/[^A-Za-z0-9._-]/.test(explicit)
    return valid ? explicit : createRequestId()
  }
  return /^\/api(?:\/|$)/.test(url) ? createRequestId() : undefined
}
