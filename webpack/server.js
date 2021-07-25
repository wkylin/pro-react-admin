const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev')

new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, '../dist'),
  compress: true,
  inline: true,
  hot: true,
  // port: 8080,
  open: true,
  clientLogLevel: 'silent',
  disableHostCheck: true,
  useLocalIp: false,
  overlay: {
    warnings: true,
    errors: true,
  },
  proxy: {
    '/': {
      // target: 'https://jsonplaceholder.typicode.com',
      target: 'https://my-json-server.typicode.com',
      pathRewrite: { '^/': '' },
      secure: false,
      changeOrigin: true,
    },
    '/faker': {
      target: 'http://localhost:4000',
      pathRewrite: { '^/faker': '' },
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
    },
  },
}).listen(9000, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at localhost:9000')
})
