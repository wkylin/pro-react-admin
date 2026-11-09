export interface ProfileValues {
  displayName: string
  jobTitle: string
  department: string
  location: string
  bio: string
}

const fieldLimits: Record<keyof ProfileValues, number> = {
  displayName: 60,
  jobTitle: 80,
  department: 80,
  location: 80,
  bio: 280,
}

export class ProfileValidationError extends Error {
  readonly field: keyof ProfileValues

  constructor(field: keyof ProfileValues) {
    super(`Invalid profile field: ${field}`)
    this.name = 'ProfileValidationError'
    this.field = field
  }
}

export function createProfileDefaults(name: string): ProfileValues {
  return {
    displayName: name.trim().slice(0, 60).trimEnd(),
    jobTitle: '',
    department: '',
    location: '',
    bio: '',
  }
}

export function getProfileStorageKey(projectId: string, accountId: string, tenantId?: string): string {
  return `pro-react-admin:profile:v1:${JSON.stringify([projectId, accountId, tenantId ?? null])}`
}

export function validateProfile(values: unknown): ProfileValues {
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    throw new ProfileValidationError('displayName')
  }

  const draft = values as Record<string, unknown>
  const readField = (field: keyof ProfileValues): string => {
    const value = draft[field]
    if (typeof value !== 'string') throw new ProfileValidationError(field)
    const trimmed = value.trim()
    if (trimmed.length > fieldLimits[field] || (field === 'displayName' && !trimmed)) {
      throw new ProfileValidationError(field)
    }
    return trimmed
  }

  return {
    displayName: readField('displayName'),
    jobTitle: readField('jobTitle'),
    department: readField('department'),
    location: readField('location'),
    bio: readField('bio'),
  }
}

export function loadProfile(
  storage: Pick<Storage, 'getItem'>,
  key: string,
  defaults: ProfileValues
): { values: ProfileValues; status: 'ready' | 'invalid' | 'unavailable' } {
  const fallback = { ...defaults }
  let raw: string | null
  try {
    raw = storage.getItem(key)
  } catch {
    return { values: fallback, status: 'unavailable' }
  }
  if (raw === null) return { values: fallback, status: 'ready' }

  try {
    const record: unknown = JSON.parse(raw)
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      return { values: fallback, status: 'invalid' }
    }
    const envelope = record as { version?: unknown; values?: unknown }
    if (envelope.version !== 1) return { values: fallback, status: 'invalid' }
    return { values: validateProfile(envelope.values), status: 'ready' }
  } catch {
    return { values: fallback, status: 'invalid' }
  }
}

export function saveProfile(storage: Pick<Storage, 'setItem'>, key: string, values: unknown): ProfileValues {
  const validated = validateProfile(values)
  storage.setItem(key, JSON.stringify({ version: 1, values: validated }))
  return validated
}
