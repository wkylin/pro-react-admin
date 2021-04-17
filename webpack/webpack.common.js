const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = !!(process.env.NODE_ENV !== 'production')

const UNABLE_ANALYZE = 0
const USE_ANALYZE = process.env.USE_ANALYZE || UNABLE_ANALYZE

const dotEnv = process.env.BUILD_GOAL === 'dev' ? '.env.development' : process.env.BUILD_GOAL === 'prod' ? '.env.production' : '.env.test'

const config = {
  entry: {
    app: paths.src + '/index.js',
  },
  output: {
    path: paths.build,
    publicPath: isDev ? '/' : './',
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    chunkFilename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': paths.src,
      stateless: paths.stateless,
      stateful: paths.stateful,
      hooks: paths.hooks,
      container: paths.container,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),
    new HtmlWebpackPlugin({
      title: isDev ? 'Pro React--dev' : 'Pro React --Prod',
      template: paths.public + '/index.ejs',
      favicon: paths.public + '/favicon.ico',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        console.info(`${parseInt(percentage * 100)}%`, message, ...args)
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new AntdDayjsWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              modules: {
                compileType: 'module',
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: paths.src,
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ['babel-loader', 'eslint-loader'],
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
}

USE_ANALYZE && config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config
