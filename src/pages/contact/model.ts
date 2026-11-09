export type ContactTopic = 'question' | 'bug' | 'idea' | 'collaboration'

export interface ContactDraft {
  name: string
  email: string
  topic: ContactTopic
  subject: string
  message: string
}

export class ContactValidationError extends Error {
  constructor(public readonly field: keyof ContactDraft) {
    super(`Invalid contact field: ${field}`)
    this.name = 'ContactValidationError'
  }
}

export type ContactSendErrorCode =
  'unconfigured' | 'rejected' | 'rateLimited' | 'unavailable' | 'network' | 'timeout' | 'aborted' | 'invalidResponse'

export class ContactSendError extends Error {
  constructor(public readonly code: ContactSendErrorCode) {
    super(`Contact submission failed: ${code}`)
    this.name = 'ContactSendError'
  }
}

const emailAtom = /^[a-z\d!#$%&'*+/=?^_`{|}~-]+$/i
const domainLabel = /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i

function isReplyEmail(email: string): boolean {
  const parts = email.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (local.length > 64 || !local.split('.').every((atom) => emailAtom.test(atom))) return false
  const labels = domain.split('.')
  return labels.length >= 2 && labels.every((label) => domainLabel.test(label))
}

export function validateContactDraft(values: unknown): ContactDraft {
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    throw new ContactValidationError('name')
  }
  const draft = values as Record<string, unknown>
  const readField = (field: keyof ContactDraft, minimum: number, maximum: number): string => {
    const value = draft[field]
    if (typeof value !== 'string') throw new ContactValidationError(field)
    const trimmed = value.trim()
    if (trimmed.length < minimum || trimmed.length > maximum) throw new ContactValidationError(field)
    return trimmed
  }
  const name = readField('name', 1, 80)
  const email = readField('email', 1, 254)
  if (!isReplyEmail(email)) throw new ContactValidationError('email')
  const topic = readField('topic', 1, 13)
  if (!['question', 'bug', 'idea', 'collaboration'].includes(topic)) throw new ContactValidationError('topic')
  return {
    name,
    email,
    topic: topic as ContactTopic,
    subject: readField('subject', 2, 120),
    message: readField('message', 10, 4000),
  }
}

export interface ContactSendOptions {
  accessKey: string | undefined
  signal?: AbortSignal
  fetcher?: typeof fetch
  timeoutMs?: number
}

export async function sendContactMessage(draft: ContactDraft, options: ContactSendOptions): Promise<void> {
  const validated = validateContactDraft(draft)
  const accessKey = options.accessKey?.trim()
  if (!accessKey) throw new ContactSendError('unconfigured')
  if (options.signal?.aborted) throw new ContactSendError('aborted')
  const body = new FormData()
  body.set('access_key', accessKey)
  for (const [field, value] of Object.entries(validated)) body.set(field, value)
  const controller = new AbortController()
  let cancellationError: ContactSendError | undefined
  let cancelRequest: (code: 'aborted' | 'timeout') => void
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancelRequest = (code) => {
      cancellationError ??= new ContactSendError(code)
      reject(cancellationError)
      controller.abort()
    }
  })
  const onAbort = () => cancelRequest('aborted')
  options.signal?.addEventListener('abort', onAbort, { once: true })
  const timer = globalThis.setTimeout(() => cancelRequest('timeout'), options.timeoutMs ?? 15_000)

  const request = async (): Promise<void> => {
    let response: Response
    try {
      response = await (options.fetcher ?? globalThis.fetch)('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
        signal: controller.signal,
      })
    } catch {
      throw cancellationError ?? new ContactSendError('network')
    }
    if (!response.ok) {
      throw new ContactSendError(
        response.status === 429 ? 'rateLimited' : response.status >= 500 ? 'unavailable' : 'rejected'
      )
    }
    let result: unknown
    try {
      result = await response.json()
    } catch {
      throw cancellationError ?? new ContactSendError('invalidResponse')
    }
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw new ContactSendError('invalidResponse')
    const { success } = result as { success?: unknown }
    if (success === false) throw new ContactSendError('rejected')
    if (success !== true) throw new ContactSendError('invalidResponse')
  }

  try {
    await Promise.race([request(), cancelled])
  } finally {
    globalThis.clearTimeout(timer)
    options.signal?.removeEventListener('abort', onAbort)
  }
}
