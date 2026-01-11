import path from 'path'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import portfinder from 'portfinder'
import common from './webpack.common.js'
import devProxy from './dev.proxy.js'
import paths from './paths.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: { type: 'memory' },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
    static: (paths.devServerStatic || []).map((directory) => ({ directory })),
    compress: true,
    // open: true,
    hot: true,
    proxy: devProxy,
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
              plugins: ['react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    // new webpack.debug.ProfilingPlugin({
    //   outputPath: path.join(__dirname, 'profiling/profileEvents.json'),
    // }),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    },
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
})

export default new Promise((resolve, reject) => {
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
