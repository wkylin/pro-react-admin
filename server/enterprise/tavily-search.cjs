const TAVILY_SEARCH_URL = 'https://api.tavily.com/search'
const SEARCH_TIMEOUT_MS = 15_000
const MAX_QUERY_LENGTH = 400
const MAX_RESULTS = 5

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

function normalizeResults(value) {
  if (!Array.isArray(value)) return []
  return value.slice(0, MAX_RESULTS).flatMap((item) => {
    if (!isRecord(item)) return []
    const url = safeHttpUrl(item.url)
    if (!url) return []
    const title = typeof item.title === 'string' && item.title.trim() ? item.title.trim().slice(0, 300) : url
    const content = typeof item.content === 'string' ? item.content.trim().slice(0, 1600) : ''
    const publishedDate =
      typeof item.published_date === 'string' ? item.published_date.replace(/[\r\n]+/g, ' ').slice(0, 80) : undefined
    return [{ title, url, content, ...(publishedDate ? { publishedDate } : {}) }]
  })
}

async function searchTavily({ query, apiKey = process.env.TAVILY_API_KEY, signal, fetchImpl = globalThis.fetch } = {}) {
  const normalizedQuery = typeof query === 'string' ? query.trim() : ''
  const queryLength = Array.from(normalizedQuery).length
  if (!normalizedQuery || queryLength > MAX_QUERY_LENGTH) throw new TavilySearchError('invalid_query', 400)

  const key = typeof apiKey === 'string' ? apiKey.trim() : ''
  if (!key) throw new TavilySearchError('tavily_not_configured', 503)
  if (typeof fetchImpl !== 'function') throw new TavilySearchError('tavily_unavailable', 502)

  const timeoutSignal = AbortSignal.timeout(SEARCH_TIMEOUT_MS)
  const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal
  let response
  try {
    response = await fetchImpl(TAVILY_SEARCH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: normalizedQuery,
        search_depth: 'basic',
        topic: 'general',
        max_results: MAX_RESULTS,
        include_answer: 'basic',
        include_raw_content: false,
      }),
      signal: requestSignal,
    })
  } catch {
    if (signal?.aborted) throw new TavilySearchError('search_cancelled', 499)
    if (timeoutSignal.aborted) throw new TavilySearchError('tavily_timeout', 504)
    throw new TavilySearchError('tavily_unavailable', 502)
  }

  if (response.status === 429 || response.status === 432) throw new TavilySearchError('tavily_rate_limited', 429)
  if (!response.ok) throw new TavilySearchError('tavily_unavailable', 502)

  let payload
  try {
    payload = await response.json()
  } catch {
    if (timeoutSignal.aborted) throw new TavilySearchError('tavily_timeout', 504)
    throw new TavilySearchError('tavily_unavailable', 502)
  }
  if (!isRecord(payload)) throw new TavilySearchError('tavily_unavailable', 502)

  return {
    answer: typeof payload.answer === 'string' ? payload.answer.trim().slice(0, 8000) : '',
    results: normalizeResults(payload.results),
  }
}

module.exports = { TavilySearchError, searchTavily }
