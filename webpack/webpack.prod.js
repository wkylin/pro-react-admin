const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const regVendor = /[\\/]node_modules[\\/](axios|classnames|)[\\/]/
const regReact =
  /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router-config|react-router-dom|react-router-redux|redux)[\\/]/

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*.{js, jsx,tsx,scss,less,css}`, { nodir: true }),
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by promotion-web (https://wkylin.github.io/promotion-web) */',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      minChunks: 3,
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
          test: regReact,
          name: 'react',
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: 'all',
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
