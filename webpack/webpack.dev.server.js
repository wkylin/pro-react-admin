// "pm2:server": "concurrently -r \"pm2 flush\" \"pm2 stop promotion\" \"pm2 delete promotion\" \"pm2 start webpack/server.js --name=promotion --watch --ignore-watch=\"node_modules\"\" \"pm2 logs --raw promotion --lines 100\" \"pm2 monit\" \"pm2 prettylist\" \"pm2 plus\""

const path = require('path')
const paths = require('./paths')
// const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const WebpackBar = require('webpackbar')
const jsRegex = /\.(js|ts)$/

const devWebpackConfig = {
  entry: {
    app: paths.src + '/index.js',
  },
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': paths.src,
      '@stateless': paths.stateless,
      '@stateful': paths.stateful,
      '@hooks': paths.hooks,
      '@container': paths.container,
      '@assets': paths.assets,
    },
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', '.env.development'),
    }),
    new HtmlWebpackPlugin({
      title: 'PRO REACT-DEV',
      template: paths.public + '/index.ejs',
      favicon: paths.public + '/favicon.ico',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      cache: false,
      minify: false,
    }),
    new ESLintPlugin(),
    new AntdDayjsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new NodePolyfillPlugin(),
    new WebpackBar(),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          'style-loader',
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
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1890FF', // #1DA57A 1890FF
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
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
  optimization: {
    providedExports: true,
    usedExports: true,
  },
}

module.exports = devWebpackConfig
