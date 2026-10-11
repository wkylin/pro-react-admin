export default [
  {
    // Keep the admin token in the dev-server process; it is never injected into the browser bundle.
    context: ['/api/tracking'],
    target:
      process.env.TRACKING_API_TARGET ||
      `http://127.0.0.1:${process.env.TRACKING_API_PORT || 5200}`,
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
    context: ['/wkylin'],
    target: 'https://my-json-server.typicode.com',
    // pathRewrite: { '^/wkylin': '/wkylin' },
    secure: false,
    changeOrigin: true,
  },
  {
    context: ['/v2'],
    target: 'https://www.mocky.io',
    // pathRewrite: { '^/wkylin': '/wkylin' },
    secure: false,
    changeOrigin: true,
  },
  {
    context: ['/faker'],
    target: 'http://localhost:4000',
    pathRewrite: { '^/faker': '' },
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
  {
    context: ['/api/github-token'],
    target: 'https://github.com',
    pathRewrite: { '/api/github-token': '/login/oauth/access_token' },
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Accept', 'application/json')
      proxyReq.setHeader('Content-Type', 'application/json')
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
  },
  {
    context: ['/api/github-user'],
    target: 'https://api.github.com',
    pathRewrite: { '/api/github-user': '/user' },
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Accept', 'application/json')
      proxyReq.setHeader('Content-Type', 'application/json')
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
  },
  {
    context: ['/api/github-email'],
    target: 'https://api.github.com',
    pathRewrite: { '/api/github-email': '/user/emails' },
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Accept', 'application/json')
      proxyReq.setHeader('Content-Type', 'application/json')
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
  },
]
