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

const mfeRole = (process.env.MFE_ROLE || '').toString().trim() // 'host' | 'remote' | ''
const isMfeEnabled = mfeRole === 'host' || mfeRole === 'remote'

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
    splitChunks: isMfeEnabled
      ? false
      : {
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
    runtimeChunk: isMfeEnabled ? false : undefined,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
})

export default new Promise((resolve, reject) => {
  const basePort = (() => {
    const raw = process.env.PORT
    const parsed = Number(raw)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 8080
  })()

  portfinder.getPort(
    {
      port: basePort, // 默认8080端口；支持用 PORT 指定起始端口（适用于 MF 固定端口联调）
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
