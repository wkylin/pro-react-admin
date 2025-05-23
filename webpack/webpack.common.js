const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// const CircularDependencyPlugin = require('circular-dependency-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const { codeInspectorPlugin } = require('code-inspector-plugin')
const paths = require('./paths')

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

const config = {
  entry: {
    app: `${paths.src}/index.tsx`,
  },
  output: {
    path: paths.build,
    publicPath: isDev ? '/' : './',
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    chunkFilename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    // library: '',
    // libraryTarget: 'umd',
    // chunkLoadingGlobal: '',
    clean: true,
    // contentBase: path.join(__dirname, "public"), // 配置额外的静态文件内容的访问路径
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '...'],
    alias: {
      '@src': path.resolve('./src'),
      '@stateless': path.resolve('./src/components/stateless'),
      '@stateful': path.resolve('./src/components/stateful'),
      '@hooks': path.resolve('./src/components/hooks'),
      '@container': path.resolve('./src/components/container'),
      '@assets': path.resolve('./src/assets'),
      '@pages': path.resolve('./src/pages'),
      '@routers': path.resolve('./src/routers'),
      '@utils': path.resolve('./src/utils'),
      '@theme': path.resolve('./src/theme'),
    },
    symlinks: false,
    modules: ['node_modules', paths.src],
    cacheWithContext: false,
  },
  stats: 'verbose', // 输出详细的构建信息
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),
    codeInspectorPlugin({
      bundler: 'webpack',
    }),
    new HtmlWebpackPlugin({
      title: isDev ? 'Pro React Dev' : 'Pro React Admin',
      template: `${paths.public}/index.html`,
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
            useShortDoctype: true,
          },
    }),
    new AntdDayjsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   include: /src/,
    //   failOnError: true,
    //   allowAsyncCycles: false,
    //   cwd: process.cwd(),
    // }),
    new NodePolyfillPlugin(),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
    }),
  ],
  module: {
    // 将缺失的导出提示成错误而不是警告
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDev,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: { flexbox: 'no-2009' },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: isDev,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: require('os').cpus().length - 1,
          //     workerParallelJobs: 50,
          //     poolTimeout: 2000,
          //     poolParallelJobs: 50,
          //     name: 'js-pool'
          //   }
          // },
          {
            loader: 'esbuild-loader',
            options: {
              target: 'es2020',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|eot|ttf|woff|woff2|mp4|mp3|mkv|pdf)$/i,
        type: 'asset',
        parser: {
          // Conditions for converting to base64
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
    ],
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
    errorDetails: true,
    moduleTrace: true, // 打印模块追踪信息，与--trace - warnings类似
    excludeAssets: /node_modules/,
  },
  // 启用持久化缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack'),
  },
  // 性能提示
  performance: {
    hints: isDev ? false : 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}

if (USE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
