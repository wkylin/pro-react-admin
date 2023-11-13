const path = require('path')
const { merge } = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const { EsbuildPlugin } = require('esbuild-loader')

const packageJson = require('../package.json')
const common = require('./webpack.common.js')

const regVendor = /[\\/]node_modules[\\/](axios|classnames|)[\\/]/

const useSentryMap = process.env.SENTRY_SOURCE_MAP === 'map'

const prodWebpackConfig = merge(common, {
  mode: 'production',
  // 使用文件缓存
  cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor', 'dist'],
      safelist: {
        standard: [/^ant-/],
      },
    }),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.json$|\.css/,
      threshold: 10240, // 只有大小大于该值的资源会被处理
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      // deleteOriginalAssets: true // 删除原文件
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new EsbuildPlugin({
        target: 'es2015',
      }),
      new HtmlMinimizerPlugin(),
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
          chunks: 'all',
        },
        react: {
          test(module) {
            // `module.resource` contains the absolute path of the file on disk.
            return module.resource && module.resource.includes('node_modules/react')
          },
          chunks: 'initial',
          filename: 'react.[contenthash].js',
          priority: 1,
          maxInitialRequests: 2,
          minChunks: 1,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})

if (useSentryMap) {
  prodWebpackConfig.plugins.push(
    new SentryWebpackPlugin({
      release: packageJson.version,
      include: path.join(__dirname, '../dist/static/js'),
      configFile: '../.sentryclirc',
      urlPrefix: '~/static/js',
    })
  )
}

module.exports = prodWebpackConfig
