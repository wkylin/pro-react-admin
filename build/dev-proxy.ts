import type { ProxyOptions } from 'vite'

export function createDevProxy(env: Record<string, string | undefined>): Record<string, ProxyOptions> {
  const localApi = `http://127.0.0.1:${env.TRACKING_API_PORT || 5200}`
  const api = { target: env.ENTERPRISE_API_TARGET || localApi, changeOrigin: true, ws: true }
  return {
    ...Object.fromEntries(
      ['/api/auth', '/api/admin', '/api/permissions', '/api/roles', '/api/events'].map((route) => [route, api])
    ),
    '/api/tracking': {
      target: env.TRACKING_API_TARGET || localApi,
      changeOrigin: true,
      configure(proxy) {
        proxy.on('proxyReq', (request) => {
          if (env.TRACKING_ADMIN_TOKEN) request.setHeader('X-API-Key', env.TRACKING_ADMIN_TOKEN)
        })
        proxy.on('error', (_error, _request, response) => {
          if (!('writeHead' in response)) return response.destroy()
          if (response.headersSent) return response.end()
          response.writeHead(502, { 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' })
          response.end(
            JSON.stringify({ error: 'tracking_api_unavailable', message: '请运行 pnpm start 启动前端和 API。' })
          )
        })
      },
    },
    '/api/demo/github': { target: localApi, changeOrigin: true },
  }
}
