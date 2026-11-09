export type SearchDepth = 'ultra-fast' | 'fast' | 'basic' | 'advanced'
export type SearchTopic = 'general' | 'news' | 'finance'
export type SearchTimeRange = 'day' | 'week' | 'month' | 'year'

export interface TavilySearchRequest {
  query: string
  search_depth: SearchDepth
  topic: SearchTopic
  max_results: number
  time_range?: SearchTimeRange
  include_answer: false | 'basic' | 'advanced'
  include_raw_content: false | 'markdown' | 'text'
  include_images: boolean
  include_domains: string[]
  exclude_domains: string[]
  include_usage: true
}

export interface TavilySearchResult {
  title: string
  url: string
  content: string
  score?: number
  publishedDate?: string
  rawContent?: string
}

export interface TavilyImage {
  url: string
  description?: string
}

export interface TavilySearchResponse {
  query: string
  answer: string
  results: TavilySearchResult[]
  images: TavilyImage[]
  responseTime?: number
  requestId?: string
  usage?: { credits: number }
}

export class TavilyValidationError extends Error {
  constructor(public readonly field: keyof TavilySearchRequest) {
    super(`Invalid search parameter: ${field}`)
    this.name = 'TavilyValidationError'
  }
}

export function createDefaultRequest(): TavilySearchRequest {
  return {
    query: '',
    search_depth: 'basic',
    topic: 'general',
    max_results: 5,
    include_answer: 'basic',
    include_raw_content: false,
    include_images: false,
    include_domains: [],
    exclude_domains: [],
    include_usage: true,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function hasControlCharacters(value: string): boolean {
  return Array.from(value).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
}

function normalizeDomains(value: unknown, field: 'include_domains' | 'exclude_domains'): string[] {
  if (!Array.isArray(value) || value.length > 20) throw new TavilyValidationError(field)
  const domains = value.map((entry) => {
    if (typeof entry !== 'string') throw new TavilyValidationError(field)
    const domain = entry.trim().toLowerCase()
    const wildcard = domain.startsWith('*.')
    const hostname = wildcard ? domain.slice(2) : domain
    if (!hostname || /[\s/:?#@\\]/.test(hostname) || hasControlCharacters(hostname))
      throw new TavilyValidationError(field)
    let ascii: string
    try {
      ascii = new URL(`https://${hostname}`).hostname
    } catch {
      throw new TavilyValidationError(field)
    }
    const labels = ascii.split('.')
    if (ascii.length > 253 || !labels.every((label) => /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/.test(label)))
      throw new TavilyValidationError(field)
    return `${wildcard ? '*.' : ''}${ascii}`
  })
  return [...new Set(domains)]
}

export function validateSearchRequest(value: unknown): TavilySearchRequest {
  if (!isRecord(value)) throw new TavilyValidationError('query')
  const defaults = createDefaultRequest()
  const request: Record<string, unknown> = { ...defaults, ...value }
  const query = typeof request.query === 'string' ? request.query.trim() : ''
  if (!query || Array.from(query).length > 400) throw new TavilyValidationError('query')
  const choice = <T extends string>(field: keyof TavilySearchRequest, choices: readonly T[]): T => {
    const candidate = request[field]
    if (typeof candidate !== 'string' || !choices.includes(candidate as T)) throw new TavilyValidationError(field)
    return candidate as T
  }
  if (
    typeof request.max_results !== 'number' ||
    !Number.isInteger(request.max_results) ||
    request.max_results < 1 ||
    request.max_results > 20
  )
    throw new TavilyValidationError('max_results')
  const includeAnswer = request.include_answer === true ? 'basic' : request.include_answer
  if (includeAnswer !== false && includeAnswer !== 'basic' && includeAnswer !== 'advanced')
    throw new TavilyValidationError('include_answer')
  const includeRaw = request.include_raw_content === true ? 'markdown' : request.include_raw_content
  if (includeRaw !== false && includeRaw !== 'markdown' && includeRaw !== 'text')
    throw new TavilyValidationError('include_raw_content')
  if (typeof request.include_images !== 'boolean') throw new TavilyValidationError('include_images')
  if (request.include_usage !== true) throw new TavilyValidationError('include_usage')
  const includeDomains = normalizeDomains(request.include_domains, 'include_domains')
  const excludeDomains = normalizeDomains(request.exclude_domains, 'exclude_domains')
  const included = new Set(includeDomains.map((domain) => domain.replace(/^\*\./, '')))
  if (excludeDomains.some((domain) => included.has(domain.replace(/^\*\./, ''))))
    throw new TavilyValidationError('exclude_domains')

  return {
    query,
    search_depth: choice('search_depth', ['ultra-fast', 'fast', 'basic', 'advanced']),
    topic: choice('topic', ['general', 'news', 'finance']),
    max_results: request.max_results,
    ...(request.time_range === undefined ? {} : { time_range: choice('time_range', ['day', 'week', 'month', 'year']) }),
    include_answer: includeAnswer,
    include_raw_content: includeRaw,
    include_images: request.include_images,
    include_domains: includeDomains,
    exclude_domains: excludeDomains,
    include_usage: true,
  }
}

function safeHttpUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || hasControlCharacters(value)) return undefined
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined
  } catch {
    return undefined
  }
}

function finiteNonnegative(value: unknown): number | undefined {
  const number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN
  return Number.isFinite(number) && number >= 0 ? number : undefined
}

export function normalizeSearchResponse(value: unknown): TavilySearchResponse {
  if (
    !isRecord(value) ||
    typeof value.query !== 'string' ||
    typeof value.answer !== 'string' ||
    !Array.isArray(value.results) ||
    !Array.isArray(value.images)
  )
    throw new Error('Invalid Tavily search response')

  const results = value.results.slice(0, 20).flatMap((item): TavilySearchResult[] => {
    if (!isRecord(item)) return []
    const url = safeHttpUrl(item.url)
    if (!url) return []
    const score = typeof item.score === 'number' && item.score >= 0 && item.score <= 1 ? item.score : undefined
    return [
      {
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim().slice(0, 300) : url,
        url,
        content: typeof item.content === 'string' ? item.content.slice(0, 10_000) : '',
        ...(score === undefined ? {} : { score }),
        ...(typeof item.publishedDate === 'string' && item.publishedDate.trim()
          ? { publishedDate: item.publishedDate.replace(/[\r\n]+/g, ' ').slice(0, 80) }
          : {}),
        ...(typeof item.rawContent === 'string' ? { rawContent: item.rawContent.slice(0, 30_000) } : {}),
      },
    ]
  })
  const images = value.images.slice(0, 20).flatMap((item): TavilyImage[] => {
    if (!isRecord(item)) return []
    const url = safeHttpUrl(item.url)
    return url
      ? [{ url, ...(typeof item.description === 'string' ? { description: item.description.slice(0, 1000) } : {}) }]
      : []
  })
  const responseTime = finiteNonnegative(value.responseTime)
  const credits = isRecord(value.usage) ? finiteNonnegative(value.usage.credits) : undefined
  return {
    query: value.query.slice(0, 800),
    answer: value.answer.slice(0, 8000),
    results,
    images,
    ...(responseTime === undefined ? {} : { responseTime }),
    ...(typeof value.requestId === 'string' && value.requestId.trim()
      ? { requestId: value.requestId.trim().slice(0, 160) }
      : {}),
    ...(credits === undefined ? {} : { usage: { credits } }),
  }
}

export function buildSearchCode(request: TavilySearchRequest, language: 'curl' | 'javascript' | 'python'): string {
  const body = JSON.stringify(validateSearchRequest(request), null, 2)
  if (language === 'curl') {
    const quotedBody = `'${body.replace(/'/g, `'"'"'`)}'`
    return `# Set TAVILY_API_KEY in your server environment.\ncurl --request POST 'https://api.tavily.com/search' \\\n  --header "Authorization: Bearer \${TAVILY_API_KEY}" \\\n  --header 'Content-Type: application/json' \\\n  --data ${quotedBody}`
  }
  if (language === 'javascript')
    return `// Run on your server with TAVILY_API_KEY configured.\nconst request = ${body};\n\nconst response = await fetch('https://api.tavily.com/search', {\n  method: 'POST',\n  headers: {\n    Authorization: \`Bearer \${process.env.TAVILY_API_KEY}\`,\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify(request),\n});\nif (!response.ok) throw new Error(\`Search failed: \${response.status}\`);\nconsole.log(await response.json());`
  return `# Run on your server with TAVILY_API_KEY configured.\nimport json\nimport os\nimport requests\n\npayload = json.loads(${JSON.stringify(body)})\nresponse = requests.post(\n    "https://api.tavily.com/search",\n    headers={"Authorization": f"Bearer {os.environ['TAVILY_API_KEY']}"},\n    json=payload,\n    timeout=30,\n)\nresponse.raise_for_status()\nprint(response.json())`
}
