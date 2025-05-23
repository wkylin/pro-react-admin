const path = require('path')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const portfinder = require('portfinder')
const common = require('./webpack.common.js')
const devProxy = require('./dev.proxy')

const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: { type: 'filesystem' },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: {
      directory: path.join(__dirname, '../public')
    },
    compress: true,
    // open: true,
    hot: true,
    proxy: devProxy
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false
    })
    // new webpack.debug.ProfilingPlugin({
    //   outputPath: path.join(__dirname, 'profiling/profileEvents.json'),
    // }),
  ].filter(Boolean),
  optimization: {
    // 适度启用一些优化以改善开发体验
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        }
      }
    },
    minimize: false,
    concatenateModules: false,
    usedExports: true // 启用tree shaking
  }
})
module.exports = new Promise((resolve, reject) => {
  portfinder.getPort(
    {
      port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535 // maximum port
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
