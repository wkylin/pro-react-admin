const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const jsRegex = /\.(js)$/
module.exports = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    inline: true,
    hot: true,
    port: 8080,
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
  plugins: [new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()].filter(Boolean),
  optimization: {
    providedExports: true,
    usedExports: true,
  },
})
