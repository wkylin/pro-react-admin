import {
  ContactSendError,
  ContactValidationError,
  sendContactMessage,
  validateContactDraft,
  type ContactDraft,
} from './model'

const validDraft: ContactDraft = {
  name: 'Ada',
  email: 'ada@example.test',
  topic: 'question',
  subject: 'Project question',
  message: 'How can I contribute?',
}

function response(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn(async () => body),
  } as unknown as Response
}

describe('contact draft validation', () => {
  it('trims only the allowed fields and preserves the editable draft', () => {
    const draft = {
      name: '  Ada  ',
      email: '\tada@example.test\n',
      topic: ' question ',
      subject: '  Project question  ',
      message: '\nHow can I contribute?\n',
      access_key: 'untrusted-key',
      token: 'private-token',
    }
    expect(validateContactDraft(draft)).toEqual(validDraft)
    expect(draft.name).toBe('  Ada  ')
    expect(draft.message).toBe('\nHow can I contribute?\n')
  })

  it.each([
    ['name', 1, 80],
    ['subject', 2, 120],
    ['message', 10, 4000],
  ] as const)('enforces the trimmed %s boundaries', (field, minimum, maximum) => {
    for (const length of [minimum, maximum]) {
      expect(validateContactDraft({ ...validDraft, [field]: ` ${'文'.repeat(length)} ` })[field]).toBe(
        '文'.repeat(length)
      )
    }
    for (const value of ['', ' \n ', '文'.repeat(minimum - 1), '文'.repeat(maximum + 1)]) {
      expect(() => validateContactDraft({ ...validDraft, [field]: value })).toThrow(ContactValidationError)
      expect(() => validateContactDraft({ ...validDraft, [field]: value })).toThrow(expect.objectContaining({ field }))
    }
  })

  it.each(['question', 'bug', 'idea', 'collaboration'] as const)('accepts the %s topic', (topic) => {
    expect(validateContactDraft({ ...validDraft, topic: ` ${topic} ` }).topic).toBe(topic)
  })

  it.each(['', 'support', 'Question', 'bug,idea'])('rejects an unsupported topic: %j', (topic) => {
    expect(() => validateContactDraft({ ...validDraft, topic })).toThrow(expect.objectContaining({ field: 'topic' }))
  })

  it.each(['name', 'email', 'topic', 'subject', 'message'] as (keyof ContactDraft)[])(
    'identifies missing and non-string %s values',
    (field) => {
      for (const value of [undefined, null, 42, false, [], {}]) {
        expect(() => validateContactDraft({ ...validDraft, [field]: value })).toThrow(
          expect.objectContaining({ field })
        )
      }
    }
  )

  it.each([undefined, null, false, 42, [], 'Ada'])(
    'rejects a non-record draft with a typed validation error: %j',
    (draft) => {
      expect(() => validateContactDraft(draft)).toThrow(ContactValidationError)
    }
  )

  it.each([
    'ada@example.test',
    'Ada.Lovelace+feedback@sub-domain.example.test',
    "a!#$%&'*+-/=?^_`{|}~@example.test",
    `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(61)}`,
  ])('accepts a bounded dot-atom email and domain labels: %s', (email) => {
    expect(validateContactDraft({ ...validDraft, email: ` ${email} ` }).email).toBe(email)
  })

  it.each([
    '',
    'ada',
    'ada@localhost',
    'ada@@example.test',
    '.ada@example.test',
    'ada.@example.test',
    'a..da@example.test',
    'a da@example.test',
    'ada@exam ple.test',
    'ada@example..test',
    'ada@-example.test',
    'ada@example-.test',
    'ada@example_test.test',
    'ada@example.test.',
    'ada@[127.0.0.1]',
    '"ada"@example.test',
    'ada\n@example.test',
    `${'a'.repeat(65)}@example.test`,
    `ada@${'b'.repeat(64)}.test`,
    `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(62)}`,
  ])('rejects a malformed or overlong email: %j', (email) => {
    expect(() => validateContactDraft({ ...validDraft, email })).toThrow(expect.objectContaining({ field: 'email' }))
  })
})

describe('contact sending', () => {
  it('sends only normalized contact fields and the configured key as multipart data', async () => {
    const fetcher = jest.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => response({ success: true }))
    const draft = { ...validDraft, name: '  Ada  ', message: '\nHow can I contribute?\n', token: 'private-token' }
    await expect(sendContactMessage(draft, { accessKey: ' public-key ', fetcher })).resolves.toBeUndefined()
    expect(fetcher).toHaveBeenCalledTimes(1)
    const [url, request] = fetcher.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(request?.method).toBe('POST')
    expect(request?.headers).toBeUndefined()
    expect(request?.body).toBeInstanceOf(FormData)
    expect(Object.fromEntries((request?.body as FormData).entries())).toEqual({
      access_key: 'public-key',
      name: 'Ada',
      email: 'ada@example.test',
      topic: 'question',
      subject: 'Project question',
      message: 'How can I contribute?',
    })
    expect(draft.name).toBe('  Ada  ')
    expect(draft.message).toBe('\nHow can I contribute?\n')
  })

  it('validates before any request and leaves an invalid draft untouched', async () => {
    const fetcher = jest.fn(async () => response({ success: true }))
    const draft = { ...validDraft, message: 'too short' }
    await expect(sendContactMessage(draft, { accessKey: 'public-key', fetcher })).rejects.toMatchObject({
      name: 'ContactValidationError',
      field: 'message',
    })
    expect(fetcher).not.toHaveBeenCalled()
    expect(draft.message).toBe('too short')
  })

  it.each(['', ' \t\n ', undefined])('rejects an unconfigured service before requesting: %j', async (accessKey) => {
    const fetcher = jest.fn(async () => response({ success: true }))
    const pending = sendContactMessage(validDraft, { accessKey, fetcher })
    await expect(pending).rejects.toBeInstanceOf(ContactSendError)
    await expect(pending).rejects.toHaveProperty('code', 'unconfigured')
    expect(fetcher).not.toHaveBeenCalled()
  })

  it.each([
    [400, 'rejected'],
    [401, 'rejected'],
    [403, 'rejected'],
    [429, 'rateLimited'],
    [500, 'unavailable'],
    [503, 'unavailable'],
  ])('rejects HTTP %s even when its body claims success, without retrying', async (status, code) => {
    const fetcher = jest.fn(async () => response({ success: true }, Number(status)))
    await expect(sendContactMessage(validDraft, { accessKey: 'public-key', fetcher })).rejects.toMatchObject({
      name: 'ContactSendError',
      code,
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('rejects an explicit service refusal and preserves the draft for a caller retry', async () => {
    const fetcher = jest.fn(async () => response({ success: false, message: 'Submission rejected' }))
    const draft = { ...validDraft }
    await expect(sendContactMessage(draft, { accessKey: 'public-key', fetcher })).rejects.toHaveProperty(
      'code',
      'rejected'
    )
    expect(draft).toEqual(validDraft)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it.each([null, [], 'success', true, {}, { success: 'true' }, { success: 1 }, { success: null }])(
    'rejects an unexpected service JSON value: %j',
    async (body) => {
      const fetcher = jest.fn(async () => response(body))
      await expect(sendContactMessage(validDraft, { accessKey: 'public-key', fetcher })).rejects.toHaveProperty(
        'code',
        'invalidResponse'
      )
      expect(fetcher).toHaveBeenCalledTimes(1)
    }
  )

  it('rejects a non-JSON response as an invalid service response', async () => {
    const malformed = response(undefined)
    malformed.json = jest.fn(async () => {
      throw new SyntaxError('Unexpected token <')
    })
    const fetcher = jest.fn(async () => malformed)
    await expect(sendContactMessage(validDraft, { accessKey: 'public-key', fetcher })).rejects.toHaveProperty(
      'code',
      'invalidResponse'
    )
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('reports a failed fetch as a network outcome without retrying or changing the draft', async () => {
    const fetcher = jest.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    const draft = { ...validDraft }
    await expect(sendContactMessage(draft, { accessKey: 'public-key', fetcher })).rejects.toMatchObject({
      name: 'ContactSendError',
      code: 'network',
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(draft).toEqual(validDraft)
  })
})

describe('contact request lifetime', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('does not request when the caller has already cancelled', async () => {
    const controller = new AbortController()
    controller.abort()
    const fetcher = jest.fn(async () => response({ success: true }))
    await expect(
      sendContactMessage(validDraft, { accessKey: 'public-key', fetcher, signal: controller.signal })
    ).rejects.toHaveProperty('code', 'aborted')
    expect(fetcher).not.toHaveBeenCalled()
    expect(jest.getTimerCount()).toBe(0)
  })

  it('aborts and settles a stalled request at the default 15-second deadline without retrying', async () => {
    const fetcher = jest.fn((_input: RequestInfo | URL, _init?: RequestInit) => new Promise<Response>(() => {}))
    const pending = sendContactMessage(validDraft, { accessKey: 'public-key', fetcher })
    const expectation = expect(pending).rejects.toHaveProperty('code', 'timeout')
    const requestSignal = fetcher.mock.calls[0][1]?.signal
    expect(requestSignal).toBeInstanceOf(AbortSignal)
    await jest.advanceTimersByTimeAsync(14_999)
    expect(requestSignal?.aborted).toBe(false)
    await jest.advanceTimersByTimeAsync(1)
    await expectation
    expect(requestSignal?.aborted).toBe(true)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(jest.getTimerCount()).toBe(0)
  })

  it('keeps a custom deadline active while the response body is still pending and cleans its listener', async () => {
    const controller = new AbortController()
    const addListener = jest.spyOn(controller.signal, 'addEventListener')
    const removeListener = jest.spyOn(controller.signal, 'removeEventListener')
    const stalledBody = response(undefined)
    stalledBody.json = jest.fn(() => new Promise<unknown>(() => {}))
    const fetcher = jest.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => stalledBody)
    const pending = sendContactMessage(validDraft, {
      accessKey: 'public-key',
      fetcher,
      signal: controller.signal,
      timeoutMs: 25,
    })
    const expectation = expect(pending).rejects.toHaveProperty('code', 'timeout')
    const requestSignal = fetcher.mock.calls[0][1]?.signal
    expect(requestSignal).toBeInstanceOf(AbortSignal)
    await jest.advanceTimersByTimeAsync(0)
    expect(stalledBody.json).toHaveBeenCalledTimes(1)
    await jest.advanceTimersByTimeAsync(25)
    await expectation
    expect(requestSignal?.aborted).toBe(true)
    expect(removeListener).toHaveBeenCalledWith('abort', addListener.mock.calls[0][1])
    expect(jest.getTimerCount()).toBe(0)
  })

  it('cancels while JSON is still pending even when the body reader ignores abort', async () => {
    const controller = new AbortController()
    const stalledBody = response(undefined)
    stalledBody.json = jest.fn(() => new Promise<unknown>(() => {}))
    const fetcher = jest.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => stalledBody)
    const pending = sendContactMessage(validDraft, { accessKey: 'public-key', fetcher, signal: controller.signal })
    const expectation = expect(pending).rejects.toHaveProperty('code', 'aborted')
    await jest.advanceTimersByTimeAsync(0)
    expect(stalledBody.json).toHaveBeenCalledTimes(1)
    controller.abort()
    await expectation
    expect(fetcher.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect(jest.getTimerCount()).toBe(0)
  })

  it('retains the timeout outcome when an abort-aware fetch rejects during cancellation', async () => {
    const fetcher = jest.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), {
            once: true,
          })
        })
    )
    const pending = sendContactMessage(validDraft, { accessKey: 'public-key', fetcher, timeoutMs: 25 })
    const expectation = expect(pending).rejects.toHaveProperty('code', 'timeout')
    await jest.advanceTimersByTimeAsync(25)
    await expectation
    expect(jest.getTimerCount()).toBe(0)
  })

  it('cancels an active request and cleans its external listener and deadline', async () => {
    const controller = new AbortController()
    const addListener = jest.spyOn(controller.signal, 'addEventListener')
    const removeListener = jest.spyOn(controller.signal, 'removeEventListener')
    const fetcher = jest.fn((_input: RequestInfo | URL, _init?: RequestInit) => new Promise<Response>(() => {}))
    const pending = sendContactMessage(validDraft, { accessKey: 'public-key', fetcher, signal: controller.signal })
    const expectation = expect(pending).rejects.toHaveProperty('code', 'aborted')
    const requestSignal = fetcher.mock.calls[0][1]?.signal
    expect(requestSignal).toBeInstanceOf(AbortSignal)
    controller.abort(new Error('Identity changed'))
    await expectation
    expect(requestSignal?.aborted).toBe(true)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(removeListener).toHaveBeenCalledWith('abort', addListener.mock.calls[0][1])
    expect(jest.getTimerCount()).toBe(0)
  })

  it.each([true, false])(
    'cleans its external listener and deadline after a completed response: %s',
    async (success) => {
      const controller = new AbortController()
      const addListener = jest.spyOn(controller.signal, 'addEventListener')
      const removeListener = jest.spyOn(controller.signal, 'removeEventListener')
      const fetcher = jest.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => response({ success }))
      const pending = sendContactMessage(validDraft, { accessKey: 'public-key', fetcher, signal: controller.signal })
      if (success) await expect(pending).resolves.toBeUndefined()
      else await expect(pending).rejects.toHaveProperty('code', 'rejected')
      expect(addListener).toHaveBeenCalledWith('abort', expect.any(Function), { once: true })
      expect(removeListener).toHaveBeenCalledWith('abort', addListener.mock.calls[0][1])
      expect(jest.getTimerCount()).toBe(0)
      controller.abort()
      expect(fetcher.mock.calls[0][1]?.signal?.aborted).toBe(false)
    }
  )
})
