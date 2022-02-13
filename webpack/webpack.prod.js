const path = require('path')
// const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const glob = require('glob')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const packageJson = require('../package.json')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const regVendor = /[\\/]node_modules[\\/](axios|classnames|)[\\/]/
const regReact = /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router-config|react-router-dom|redux)[\\/]/

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const useSentryMap = process.env.SENTRY_SOURCE_MAP === 'map'

const prodWebpackConfig = merge(common, {
  mode: 'production',
  // devtool: false,
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
      ignoreOrder: true
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
    // }),
    // new webpack.BannerPlugin({
    //   raw: true,
    //   banner:
    //     '/** @preserve Powered by promotion-web (https://github.com/wkylin/promotion-web/) */',
    // }),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.json$|\.css/,
      threshold: 10240, // 只有大小大于该值的资源会被处理
      minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
      // deleteOriginalAssets: true // 删除原文件
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public', to: '../dist' }],
      options: {
        concurrency: 100
      }
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
      // new TerserPlugin()
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
          test: regReact,
          name: 'react',
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

if (useSentryMap) {
  prodWebpackConfig.plugins.push(
    new SentryWebpackPlugin({
      release: packageJson.version,
      include: path.join(__dirname, '../dist/static/js'),
      configFile: '../.sentryclirc',
      urlPrefix: '~/static/js'
    })
  )
}

// module.exports = smp.wrap(prodWebpackConfig)
module.exports = prodWebpackConfig
