const paths = require('./paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const jsRegex = /\.(js)$/
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    compress: false,
    inline: true,
    hot: true,
    port: 8090,
    open: true,
    clientLogLevel: 'silent',
    disableHostCheck: true,
    // host: '0.0.0.0',
    onListening: function (server) {
      const port = server.listeningApp.address().port
      console.log('Listening on port:', port)
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    // useLocalIp: true,
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
})
