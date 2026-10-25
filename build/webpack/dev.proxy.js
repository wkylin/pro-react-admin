const localApiTarget = `http://127.0.0.1:${process.env.TRACKING_API_PORT || 5200}`

export default [
  {
    context: ['/api/auth', '/api/admin', '/api/permissions', '/api/roles', '/api/events'],
    target: process.env.ENTERPRISE_API_TARGET || localApiTarget,
    changeOrigin: true,
    ws: true,
  },
  {
    // Keep the admin token in the dev-server process; it is never injected into the browser bundle.
    context: ['/api/tracking'],
    target: process.env.TRACKING_API_TARGET || localApiTarget,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq) => {
        if (process.env.TRACKING_ADMIN_TOKEN) {
          proxyReq.setHeader('X-API-Key', process.env.TRACKING_ADMIN_TOKEN)
        }
      },
      error: (_error, _request, response) => {
        if (typeof response.writeHead !== 'function') {
          response.destroy?.()
          return
        }

        if (response.headersSent) {
          response.end()
          return
        }

        response.writeHead(502, {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json; charset=utf-8',
        })
        response.end(
          JSON.stringify({
            error: 'tracking_api_unavailable',
            message: '本地埋点 API 未启动。请运行 pnpm start 启动前端和 API。',
          })
        )
      },
    },
  },
  {
    context: ['/api/demo/github'],
    target: localApiTarget,
    changeOrigin: true,
  },
]
