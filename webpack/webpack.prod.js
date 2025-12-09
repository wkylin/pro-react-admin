const path = require('path')
const { merge } = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const { EsbuildPlugin } = require('esbuild-loader')

const packageJson = require('../package.json')
const common = require('./webpack.common.js')

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.production') })

// 第三方库正则匹配（用于代码分割）
const regVendor = /[\\/]node_modules[\\/](axios|classnames|lodash)[\\/]/

const useSentryMap = process.env.SENTRY_SOURCE_MAP === 'map'

const prodWebpackConfig = merge(common, {
  mode: 'production',
  // 使用文件缓存
  cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
  // devtool: 'source-map',
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
      ignoreOrder: true
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor', 'dist'],
      safelist: {
        standard: [/^ant-/]
      }
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new EsbuildPlugin({
        target: 'es2015'
      }),
      new HtmlMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 3,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          test: regVendor,
          name: 'vendor',
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: 'all'
        },
        react: {
          test (module) {
            return module.resource && module.resource.includes('node_modules/react')
          },
          chunks: 'initial',
          filename: 'react.[contenthash].js',
          priority: 1,
          maxInitialRequests: 2,
          minChunks: 1
        }
        // commons: {
        //   name: 'commons',
        //   minChunks: 2,
        //   chunks: 'all',
        //   priority: 5,
        // },
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 800000,
    maxAssetSize: 400000
  }
})

if (useSentryMap) {
  prodWebpackConfig.plugins.push(
    sentryWebpackPlugin({
      release: packageJson.version,
      include: path.join(__dirname, '../dist/static/js'),
      urlPrefix: '~/static/js',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      telemetry: false
    })
  )
}

module.exports = prodWebpackConfig
