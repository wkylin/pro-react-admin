import {
  createProfileDefaults,
  getProfileStorageKey,
  loadProfile,
  ProfileValidationError,
  saveProfile,
  validateProfile,
  type ProfileValues,
} from './model'

describe('profile defaults', () => {
  it('starts from a trimmed bounded account name and leaves optional presentation fields empty', () => {
    expect(createProfileDefaults('  Ada Lovelace  ')).toEqual({
      displayName: 'Ada Lovelace',
      jobTitle: '',
      department: '',
      location: '',
      bio: '',
    })
    expect(createProfileDefaults(`  ${'名'.repeat(61)}  `).displayName).toBe('名'.repeat(60))
    expect(createProfileDefaults('  ').displayName).toBe('')
  })
})

describe('profile validation', () => {
  const defaults = createProfileDefaults('Ada')

  it('trims each presentation field without changing the supplied draft', () => {
    const draft = {
      displayName: '  Ada  ',
      jobTitle: '  Engineer  ',
      department: '\tResearch\n',
      location: '  London  ',
      bio: '\nFirst line\nSecond line\n',
    }
    expect(validateProfile(draft)).toEqual({
      displayName: 'Ada',
      jobTitle: 'Engineer',
      department: 'Research',
      location: 'London',
      bio: 'First line\nSecond line',
    })
    expect(draft.displayName).toBe('  Ada  ')
    expect(validateProfile(defaults)).toEqual(defaults)
  })

  it.each([
    ['displayName', 60],
    ['jobTitle', 80],
    ['department', 80],
    ['location', 80],
    ['bio', 280],
  ] as const)('accepts the trimmed %s boundary and identifies an overlong field', (field, limit) => {
    const boundary = '文'.repeat(limit)
    expect(validateProfile({ ...defaults, [field]: `  ${boundary}  ` })[field]).toBe(boundary)
    expect(() => validateProfile({ ...defaults, [field]: `${boundary}文` })).toThrow(ProfileValidationError)
    expect(() => validateProfile({ ...defaults, [field]: `${boundary}文` })).toThrow(expect.objectContaining({ field }))
  })

  it.each(['', ' ', '\t\n'])('requires at least one visible display-name character: %j', (displayName) => {
    expect(() => validateProfile({ ...defaults, displayName })).toThrow(
      expect.objectContaining({ field: 'displayName' })
    )
  })

  it.each(['displayName', 'jobTitle', 'department', 'location', 'bio'] as (keyof ProfileValues)[])(
    'rejects missing and non-string values for %s',
    (field) => {
      for (const invalidValue of [undefined, null, 42, false, [], {}]) {
        expect(() => validateProfile({ ...defaults, [field]: invalidValue })).toThrow(
          expect.objectContaining({ field })
        )
      }
    }
  )

  it.each([undefined, null, false, 42, [], 'Ada'])('rejects a non-record draft: %j', (draft) => {
    expect(() => validateProfile(draft)).toThrow(ProfileValidationError)
  })

  it('returns only the allowed presentation fields', () => {
    expect(
      validateProfile({ ...defaults, email: 'private@example.test', token: 'secret', roles: ['admin'], accountId: '1' })
    ).toEqual(defaults)
  })
})

describe('profile storage scope', () => {
  it('distinguishes projects, accounts, tenants and ambiguous separators without normalizing identity', () => {
    const identities: [string, string, string?][] = [
      ['default', 'alice'],
      ['enterprise', 'alice'],
      ['default', 'bob'],
      ['default', 'alice', 'tenant-a'],
      ['default', 'alice', 'tenant-b'],
      ['default', 'alice', ''],
      ['default', ' alice'],
      ['project:a', 'b', 'c'],
      ['project', 'a:b', 'c'],
      ['project', 'a', 'b:c'],
      ['["project","a"]', 'b'],
    ]
    const keys = identities.map(([project, account, tenant]) => getProfileStorageKey(project, account, tenant))
    expect(new Set(keys).size).toBe(identities.length)
    expect(getProfileStorageKey('default', 'alice')).toBe(getProfileStorageKey('default', 'alice', undefined))
    expect(getProfileStorageKey('default', 'alice')).toBe(keys[0])
  })
})

describe('profile saving', () => {
  it('writes a versioned record containing only trimmed presentation values', () => {
    const setItem = jest.fn()
    const draft = {
      ...createProfileDefaults('Ada'),
      displayName: '  Ada  ',
      bio: '  My introduction  ',
      accountId: 'private-account',
      email: 'private@example.test',
      token: 'secret-token',
      roles: ['admin'],
    }
    const saved = saveProfile({ setItem }, 'profile-key', draft)
    expect(saved).toEqual({
      displayName: 'Ada',
      jobTitle: '',
      department: '',
      location: '',
      bio: 'My introduction',
    })
    expect(setItem).toHaveBeenCalledTimes(1)
    const [key, record] = setItem.mock.calls[0]
    expect(key).toBe('profile-key')
    expect(JSON.parse(record)).toEqual({ version: 1, values: saved })
    expect(record).not.toContain('private-account')
    expect(record).not.toContain('private@example.test')
    expect(record).not.toContain('secret-token')
    expect(record).not.toContain('admin')
    expect(draft.displayName).toBe('  Ada  ')
  })

  it('validates before touching storage so invalid input cannot replace the saved record', () => {
    let record = 'previous-record'
    const storage = {
      setItem: jest.fn((_key: string, value: string) => {
        record = value
      }),
    }
    expect(() =>
      saveProfile(storage, 'profile-key', { ...createProfileDefaults('Ada'), bio: 'x'.repeat(281) })
    ).toThrow(expect.objectContaining({ field: 'bio' }))
    expect(storage.setItem).not.toHaveBeenCalled()
    expect(record).toBe('previous-record')
  })

  it('propagates a failed write and preserves the caller draft and previous stored record', () => {
    const records = new Map<string, string>()
    let failWrites = false
    const failure = new Error('Storage quota exceeded')
    const draft = { ...createProfileDefaults('Ada'), bio: '  Unsaved introduction  ' }
    const storage = {
      setItem: (key: string, value: string) => {
        if (failWrites) throw failure
        records.set(key, value)
      },
    }
    saveProfile(storage, 'profile-key', createProfileDefaults('Ada'))
    const previousRecord = records.get('profile-key')
    failWrites = true
    expect(() => saveProfile(storage, 'profile-key', draft)).toThrow(failure)
    expect(records.get('profile-key')).toBe(previousRecord)
    expect(draft.bio).toBe('  Unsaved introduction  ')
  })
})

describe('profile restoration', () => {
  const defaults = createProfileDefaults('Account name')

  it('restores saved values for the matching identity and uses defaults for the other scopes', () => {
    const records = new Map<string, string>()
    const storage = {
      getItem: (key: string) => records.get(key) ?? null,
      setItem: (key: string, value: string) => {
        records.set(key, value)
      },
    }
    const key = getProfileStorageKey('project-a', 'account-a', 'tenant-a')
    saveProfile(storage, key, { ...defaults, displayName: '  Custom name  ', bio: '  Local introduction  ' })
    expect(loadProfile(storage, key, defaults)).toEqual({
      status: 'ready',
      values: { ...defaults, displayName: 'Custom name', bio: 'Local introduction' },
    })
    for (const otherKey of [
      getProfileStorageKey('project-b', 'account-a', 'tenant-a'),
      getProfileStorageKey('project-a', 'account-b', 'tenant-a'),
      getProfileStorageKey('project-a', 'account-a', 'tenant-b'),
      getProfileStorageKey('project-a', 'account-a'),
    ]) {
      expect(loadProfile(storage, otherKey, defaults)).toEqual({ status: 'ready', values: defaults })
    }
  })

  it('uses an independent defaults object when no local record exists', () => {
    const loaded = loadProfile({ getItem: () => null }, 'profile-key', defaults)
    expect(loaded).toEqual({ status: 'ready', values: defaults })
    loaded.values.bio = 'New draft'
    expect(defaults.bio).toBe('')
  })

  it('trims restored values and omits unexpected private fields', () => {
    const record = JSON.stringify({
      version: 1,
      values: { ...defaults, displayName: '  Custom name  ', token: 'secret', roles: ['admin'] },
    })
    expect(loadProfile({ getItem: () => record }, 'profile-key', defaults)).toEqual({
      status: 'ready',
      values: { ...defaults, displayName: 'Custom name' },
    })
  })

  it.each([
    ['empty JSON', ''],
    ['malformed JSON', '{'],
    ['null envelope', 'null'],
    ['array envelope', '[]'],
    ['missing version', JSON.stringify({ values: defaults })],
    ['future version', JSON.stringify({ version: 2, values: defaults })],
    ['string version', JSON.stringify({ version: '1', values: defaults })],
    ['missing values', JSON.stringify({ version: 1 })],
    ['non-object values', JSON.stringify({ version: 1, values: [] })],
    ['missing field', JSON.stringify({ version: 1, values: { displayName: 'Ada' } })],
    ['non-string field', JSON.stringify({ version: 1, values: { ...defaults, location: 42 } })],
    ['blank name', JSON.stringify({ version: 1, values: { ...defaults, displayName: '  ' } })],
    ['overlong field', JSON.stringify({ version: 1, values: { ...defaults, jobTitle: 'x'.repeat(81) } })],
  ])('reports an invalid record and falls back to account defaults for %s', (_label, record) => {
    expect(loadProfile({ getItem: () => record }, 'profile-key', defaults)).toEqual({
      status: 'invalid',
      values: defaults,
    })
  })

  it('reports unavailable storage separately from corrupt records and keeps the account defaults', () => {
    const getItem = jest.fn(() => {
      throw new Error('Storage access denied')
    })
    expect(loadProfile({ getItem }, 'profile-key', defaults)).toEqual({ status: 'unavailable', values: defaults })
    expect(getItem).toHaveBeenCalledWith('profile-key')
  })
})
