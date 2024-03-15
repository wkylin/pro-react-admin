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
