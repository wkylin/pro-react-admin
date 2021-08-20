const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const portfinder = require('portfinder')
// const DashboardPlugin = require('webpack-dashboard/plugin')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const jsRegex = /\.(js)$/

const devWebpackConfig = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    inline: true,
    hot: true,
    watchContentBase: true,
    // port: 8080, // *8080 portfinder *8000
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
  },

  module: {
    rules: [
      {
        test: jsRegex,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new DashboardPlugin()
  ].filter(Boolean),
  optimization: {
    providedExports: true,
    usedExports: true,
  },
})

// module.exports = smp.wrap(devWebpackConfig)
// module.exports = devWebpackConfig

module.exports = new Promise((resolve, reject) => {
  // @funboxteam/free-port-finder
  // detect-port
  portfinder.getPort(
    {
      port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535, // maximum port
    },
    (err, port) => {
      if (err) {
        reject(err)
        return
      }
      devWebpackConfig.devServer.port = port
      resolve(devWebpackConfig)
    }
  )
})
