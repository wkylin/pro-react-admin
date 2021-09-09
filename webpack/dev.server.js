const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const config = require('./webpack.dev.server')

const devServerConfig = new WebpackDevServer(
  {
    historyApiFallback: true,
    compress: true,
    open: true,
    proxy: {
      '/': {
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
  },
  webpack(config)
)

portfinder.getPort(
  {
    port: 8080,
    stopPort: 65535,
  },
  (err, port) => {
    if (err) {
      return
    }
    devServerConfig.start(port, 'localhost', (error, result) => {
      if (error) {
        console.log(error)
      }
      console.log(`Listening at localhost:${port}`)
    })
  }
)
