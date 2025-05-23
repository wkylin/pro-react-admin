const path = require('path')
const { merge } = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const SentryWebpackPlugin = require('@sentry/webpack-plugin')

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
  // devtool: 'source-map',
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
      ignoreOrder: true
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor', 'dist'],
      safelist: {
        standard: [/^ant-/]
      }
    }),
    // new CompressionWebpackPlugin({
    //   filename: '[path][base].gz',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.json$|\.css/,
    //   threshold: 10240, // 只有大小大于该值的资源会被处理
    //   minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //   // deleteOriginalAssets: true // 删除原文件
    // }),
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
        target: 'es2015',
        css: true
      }),
      new HtmlMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        // 框架代码分离
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20
        },
        // Ant Design分离
        antd: {
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
          name: 'antd',
          chunks: 'all',
          priority: 15
        },
        // 其他第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          minChunks: 2
        },
        // 公共代码
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
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

// if (useSentryMap) {
//   prodWebpackConfig.plugins.push(
//     new SentryWebpackPlugin({
//       release: packageJson.version,
//       include: path.join(__dirname, '../dist/static/js'),
//       configFile: '../.sentryclirc',
//       urlPrefix: '~/static/js',
//     })
//   )
// }

module.exports = prodWebpackConfig
