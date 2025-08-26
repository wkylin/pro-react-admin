module.exports = [
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

// module.exports = {
//   '/wkylin': {
//     // target: 'https://jsonplaceholder.typicode.com',
//     // target: service[env.proxy] // --env.proxy=test
//     target: 'https://my-json-server.typicode.com',
//     // pathRewrite: { '^/wkylin': '/wkylin' },
//     secure: false,
//     changeOrigin: true,
//   },
//   '/v2': {
//     // target: 'https://jsonplaceholder.typicode.com',
//     target: 'https://www.mocky.io',
//     // pathRewrite: { '^/wkylin': '/wkylin' },
//     secure: false,
//     changeOrigin: true,
//   },
//   '/faker': {
//     target: 'http://localhost:4000',
//     pathRewrite: { '^/faker': '' },
//     secure: false,
//     changeOrigin: true,
//     cookieDomainRewrite: 'localhost',
//   },
// }
