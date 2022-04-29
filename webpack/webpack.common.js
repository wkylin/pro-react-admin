const path = require('path')
// const webpack = require('webpack')
// const chalk = require('chalk')

// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require('./paths')
// const ESLintPlugin = require('eslint-webpack-plugin')

// const { getThemeVariables } = require('antd/dist/theme')

const isDev = process.env.NODE_ENV === 'development'

const UNABLE_ANALYZE = 0
const USE_ANALYZE = process.env.USE_ANALYZE || UNABLE_ANALYZE

let dotEnv = ''
switch (process.env.BUILD_GOAL) {
  case 'development':
    dotEnv = '.env.development'
    break
  case 'production':
    dotEnv = '.env.production'
    break
  case 'dev':
    dotEnv = '.env.dev'
    break
  case 'test':
    dotEnv = '.env.test'
    break
  default:
    dotEnv = '.env.development'
}

// const root = process.cwd()
// console.log(chalk.blue(`root: ${root}`))

const config = {
  entry: {
    app: `${paths.src}/index.tsx`
  },
  output: {
    path: paths.build,
    publicPath: isDev ? '/' : './',
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    chunkFilename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    // library: '',
    // libraryTarget: 'umd',
    // chunkLoadingGlobal: '',
    clean: true
  },
  resolve: {
    // plugins: [new TsconfigPathsPlugin()],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': path.resolve('./src'),
      '@stateless': path.resolve('./src/components/stateless'),
      '@stateful': path.resolve('./src/components/stateful'),
      '@hooks': path.resolve('./src/components/hooks'),
      '@container': path.resolve('./src/components/container'),
      '@assets': path.resolve('./src/assets'),
      '@pages': path.resolve('./src/pages'),
      '@routers': path.resolve('./src/routers'),
      '@utils': path.resolve('./src/utils')
    }
  },
  // watch: isDev,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600
  },
  // target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  plugins: [
    // new CleanWebpackPlugin({
    //   root: __dirname,
    //   verbose: true,
    //   dry: false,
    //   exclude: [],
    //   cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    // }),
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv)
    }),
    new HtmlWebpackPlugin({
      title: isDev ? 'Pro React Dev' : 'Pro React',
      template: `${paths.public}/index.ejs`,
      favicon: `${paths.public}/favicon.ico`,
      filename: 'index.html',
      inject: 'body',
      hash: true,
      cache: false,
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    // new webpack.ProgressPlugin({
    //   activeModules: false,
    //   entries: true,
    //   handler(percentage, message, ...args) {
    //     console.info(`${parseInt(percentage * 100)}%`, message, ...args)
    //   },
    //   modules: true,
    //   modulesCount: 5000,
    //   profile: false,
    //   dependencies: true,
    //   dependenciesCount: 10000,
    //   percentBy: null,
    // }),
    new AntdDayjsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd()
    }),
    new NodePolyfillPlugin(),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      async: false
    })
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/i,
        // include: [path.resolve(__dirname, 'src/styles')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                // localIdentName: '[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase'
                // exportOnlyLocals: false,
              },
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // modifyVars: {
                //   'root-entry-name': 'default',
                //   'primary-color': '#1890FF', // #1DA57A
                // },
                // modifyVars: getThemeVariables({
                //   dark: true, // Enable dark mode
                //   compact: false, // Enable compact mode
                // }),
                javascriptEnabled: true
              }
            }
          }
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [['postcss-preset-env', 'autoprefixer']],
          //     },
          //   },
          // },
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|mp4)$/i,
        type: 'asset'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true
            }
          }
        ]
      }
    ]
  }
}

if (USE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
