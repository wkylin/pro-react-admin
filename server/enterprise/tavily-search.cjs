const { domainToASCII, URL } = require('node:url')
const process = require('node:process')
const { AbortSignal } = globalThis

const TAVILY_SEARCH_URL = 'https://api.tavily.com/search'
const SEARCH_TIMEOUT_MS = 15_000
const MAX_QUERY_LENGTH = 400
const MAX_RESULTS = 20
const OPTION_KEYS = new Set([
  'query',
  'search_depth',
  'topic',
  'max_results',
  'time_range',
  'include_answer',
  'include_raw_content',
  'include_images',
  'include_domains',
  'exclude_domains',
  'include_usage',
])

class TavilySearchError extends Error {
  constructor(code, status) {
    super(code)
    this.name = 'TavilySearchError'
    this.code = code
    this.status = status
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function invalidOptions() {
  throw new TavilySearchError('invalid_search_options', 400)
}

function normalizeDomains(value) {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.length > 20) return invalidOptions()
  const domains = value.map((item) => {
    if (typeof item !== 'string') return invalidOptions()
    const input = item.trim().toLowerCase()
    const wildcard = input.startsWith('*.')
    const hostname = wildcard ? input.slice(2) : input
    if (!hostname || /[\s/:@?#\\*]/.test(hostname)) return invalidOptions()
    const ascii = domainToASCII(hostname)
    if (
      !ascii ||
      ascii.length > 253 ||
      !ascii.split('.').every((label) => /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/.test(label))
    )
      return invalidOptions()
    return `${wildcard ? '*.' : ''}${ascii}`
  })
  return [...new Set(domains)]
}

function normalizeSearchOptions(value) {
  if (!isRecord(value)) throw new TavilySearchError('invalid_query', 400)
  const query = typeof value.query === 'string' ? value.query.trim() : ''
  if (!query || Array.from(query).length > MAX_QUERY_LENGTH) throw new TavilySearchError('invalid_query', 400)
  if (Object.keys(value).some((key) => !OPTION_KEYS.has(key))) return invalidOptions()

  const searchDepth = value.search_depth === undefined ? 'basic' : value.search_depth
  const topic = value.topic === undefined ? 'general' : value.topic
  const maxResults = value.max_results === undefined ? 5 : value.max_results
  const includeAnswer =
    value.include_answer === true || value.include_answer === undefined ? 'basic' : value.include_answer
  const includeRawContent =
    value.include_raw_content === true
      ? 'markdown'
      : value.include_raw_content === undefined
        ? false
        : value.include_raw_content
  const includeImages = value.include_images === undefined ? false : value.include_images
  const includeUsage = value.include_usage === undefined ? true : value.include_usage
  if (
    !['ultra-fast', 'fast', 'basic', 'advanced'].includes(searchDepth) ||
    !['general', 'news', 'finance'].includes(topic) ||
    !Number.isInteger(maxResults) ||
    maxResults < 1 ||
    maxResults > MAX_RESULTS ||
    ![false, 'basic', 'advanced'].includes(includeAnswer) ||
    ![false, 'markdown', 'text'].includes(includeRawContent) ||
    typeof includeImages !== 'boolean' ||
    typeof includeUsage !== 'boolean' ||
    (value.time_range !== undefined && !['day', 'week', 'month', 'year'].includes(value.time_range))
  )
    return invalidOptions()
  const includeDomains = normalizeDomains(value.include_domains)
  const excludeDomains = normalizeDomains(value.exclude_domains)
  const excluded = new Set(excludeDomains.map((domain) => domain.replace(/^\*\./, '')))
  if (includeDomains.some((domain) => excluded.has(domain.replace(/^\*\./, '')))) return invalidOptions()

  return {
    query,
    search_depth: searchDepth,
    topic,
    max_results: maxResults,
    ...(value.time_range !== undefined ? { time_range: value.time_range } : {}),
    include_answer: includeAnswer,
    include_raw_content: includeRawContent,
    include_images: includeImages,
    include_domains: includeDomains,
    exclude_domains: excludeDomains,
    include_usage: includeUsage,
  }
}

function safeHttpUrl(value) {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null
    return url.href
  } catch {
    return null
  }
}

function normalizeResults(value, options) {
  if (!Array.isArray(value)) return []
  return value
    .slice(0, 100)
    .flatMap((item) => {
      if (!isRecord(item)) return []
      const url = safeHttpUrl(item.url)
      if (!url) return []
      const title = typeof item.title === 'string' && item.title.trim() ? item.title.trim().slice(0, 300) : url
      const content = typeof item.content === 'string' ? item.content.trim().slice(0, 10_000) : ''
      const publishedDate =
        typeof item.published_date === 'string' ? item.published_date.replace(/[\r\n]+/g, ' ').slice(0, 80) : undefined
      const score = typeof item.score === 'number' && Number.isFinite(item.score) && item.score >= 0 && item.score <= 1
      const rawContent =
        options.include_raw_content !== false && typeof item.raw_content === 'string'
          ? item.raw_content.trim().slice(0, 30_000)
          : undefined
      return [
        {
          title,
          url,
          content,
          ...(score ? { score: item.score } : {}),
          ...(publishedDate ? { publishedDate } : {}),
          ...(rawContent !== undefined ? { rawContent } : {}),
        },
      ]
    })
    .slice(0, options.max_results)
}

function normalizeImages(value) {
  if (!Array.isArray(value)) return []
  return value
    .slice(0, 100)
    .flatMap((item) => {
      const url = safeHttpUrl(typeof item === 'string' ? item : isRecord(item) ? item.url : undefined)
      if (!url) return []
      const description =
        isRecord(item) && typeof item.description === 'string' ? item.description.trim().slice(0, 1000) : ''
      return [{ url, ...(description ? { description } : {}) }]
    })
    .slice(0, MAX_RESULTS)
}

async function searchTavily({
  apiKey = process.env.TAVILY_API_KEY,
  signal,
  fetchImpl = globalThis.fetch,
  ...input
} = {}) {
  const options = normalizeSearchOptions(input)

  const key = typeof apiKey === 'string' ? apiKey.trim() : ''
  if (!key) throw new TavilySearchError('tavily_not_configured', 503)
  if (typeof fetchImpl !== 'function') throw new TavilySearchError('tavily_unavailable', 502)

  const timeoutSignal = AbortSignal.timeout(SEARCH_TIMEOUT_MS)
  const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal
  let response
  try {
    requestSignal.throwIfAborted()
    response = await fetchImpl(TAVILY_SEARCH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
      signal: requestSignal,
    })
    requestSignal.throwIfAborted()
  } catch {
    if (signal?.aborted) throw new TavilySearchError('search_cancelled', 499)
    if (timeoutSignal.aborted) throw new TavilySearchError('tavily_timeout', 504)
    throw new TavilySearchError('tavily_unavailable', 502)
  }

  if (response.status === 429 || response.status === 434) throw new TavilySearchError('tavily_rate_limited', 429)
  if (response.status === 432 || response.status === 433) throw new TavilySearchError('tavily_quota_exceeded', 429)
  if (!response.ok) throw new TavilySearchError('tavily_unavailable', 502)

  let payload
  try {
    payload = await response.json()
    requestSignal.throwIfAborted()
  } catch {
    if (signal?.aborted) throw new TavilySearchError('search_cancelled', 499)
    if (timeoutSignal.aborted) throw new TavilySearchError('tavily_timeout', 504)
    throw new TavilySearchError('tavily_unavailable', 502)
  }
  if (!isRecord(payload)) throw new TavilySearchError('tavily_unavailable', 502)
  const responseTime =
    typeof payload.response_time === 'number' ||
    (typeof payload.response_time === 'string' && payload.response_time.trim())
      ? Number(payload.response_time)
      : undefined

  return {
    query: options.query,
    answer:
      options.include_answer !== false && typeof payload.answer === 'string'
        ? payload.answer.trim().slice(0, 8000)
        : '',
    results: normalizeResults(payload.results, options),
    images: options.include_images ? normalizeImages(payload.images) : [],
    ...(responseTime !== undefined && Number.isFinite(responseTime) && responseTime >= 0 ? { responseTime } : {}),
    ...(typeof payload.request_id === 'string' && payload.request_id.trim()
      ? {
          requestId: payload.request_id
            .trim()
            .replace(/[\r\n]/g, '')
            .slice(0, 160),
        }
      : {}),
    ...(options.include_usage &&
    isRecord(payload.usage) &&
    typeof payload.usage.credits === 'number' &&
    Number.isFinite(payload.usage.credits) &&
    payload.usage.credits >= 0
      ? { usage: { credits: payload.usage.credits } }
      : {}),
  }
}

module.exports = { TavilySearchError, normalizeSearchOptions, searchTavily }
