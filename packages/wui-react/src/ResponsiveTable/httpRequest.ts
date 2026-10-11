type RequestParams = Record<string, unknown>

const appendQuery = (url: string, params: RequestParams = {}): string => {
  const absolute = /^[a-z][a-z\d+.-]*:/i.test(url)
  const base = typeof location === 'undefined' ? 'http://localhost' : location.origin
  const parsed = new URL(url, base)

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    if (Array.isArray(value)) {
      value.forEach((item) => parsed.searchParams.append(key, String(item)))
    } else if (typeof value === 'object') {
      parsed.searchParams.set(key, JSON.stringify(value))
    } else {
      parsed.searchParams.set(key, String(value))
    }
  })

  return absolute ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`
}

const requestJson = async (url: string, method: string, params?: RequestParams): Promise<unknown> => {
  const hasBody = !['GET', 'HEAD'].includes(method)
  const response = await fetch(hasBody ? url : appendQuery(url, params), {
    method,
    headers: hasBody
      ? { Accept: 'application/json', 'Content-Type': 'application/json' }
      : { Accept: 'application/json' },
    ...(hasBody && params ? { body: JSON.stringify(params) } : {}),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}`)
  }
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

/** Small browser request adapter used by ResponsiveTable when `fetchUrl` is set. */
export const httpRequest = {
  get: (url: string, params?: RequestParams) => requestJson(url, 'GET', params),
  post: (url: string, params?: RequestParams) => requestJson(url, 'POST', params),
  put: (url: string, params?: RequestParams) => requestJson(url, 'PUT', params),
  patch: (url: string, params?: RequestParams) => requestJson(url, 'PATCH', params),
  delete: (url: string, params?: RequestParams) => requestJson(url, 'DELETE', params),
}
