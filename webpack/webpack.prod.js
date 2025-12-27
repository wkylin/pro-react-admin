import path from 'path'
import fs from 'fs'
import { merge } from 'webpack-merge'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import * as glob from 'glob'
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import { sentryWebpackPlugin } from '@sentry/webpack-plugin'
import FileManagerPlugin from 'filemanager-webpack-plugin'
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin'
import { EsbuildPlugin } from 'esbuild-loader'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import common from './webpack.common.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.production') })

// 第三方库正则匹配（用于代码分割）
const regVendor = /[\\/]node_modules[\\/](axios|classnames|lodash)[\\/]/

const useSentryMap = process.env.SENTRY_SOURCE_MAP === 'map'

const optimizedAudioDir = path.resolve(__dirname, '../src/assets-optimized/audio')
const optimizedVideoDir = path.resolve(__dirname, '../src/assets-optimized/video')
const hasOptimizedAudio = fs.existsSync(optimizedAudioDir)
const hasOptimizedVideo = fs.existsSync(optimizedVideoDir)

const prodWebpackConfig = merge(common, {
  mode: 'production',
  resolve:
    hasOptimizedAudio || hasOptimizedVideo
      ? {
          alias: {
            ...(hasOptimizedAudio ? { '@assets/audio': optimizedAudioDir } : {}),
            ...(hasOptimizedVideo ? { '@assets/video': optimizedVideoDir } : {}),
          },
        }
      : undefined,
  // 使用文件缓存
  cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
  // devtool: 'source-map',
  devtool: false,
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor', 'dist'],
      safelist: {
        standard: [/^ant-/],
      },
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public-optimized/audio'),
          to: path.resolve(__dirname, '../dist/audio'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html', '**/audio/**'],
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
      new ImageMinimizerPlugin({
        loader: false,
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              // Safe defaults; tune per your quality/size preference.
              jpeg: { quality: 78, mozjpeg: true },
              png: { compressionLevel: 9, palette: true },
              webp: { quality: 80 },
              avif: { quality: 50 },
            },
          },
        },
      }),
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
            return module.resource && module.resource.includes('node_modules/react')
          },
          chunks: 'initial',
          filename: 'react.[contenthash].js',
          priority: 1,
          maxInitialRequests: 2,
          minChunks: 1,
        },
        // commons: {
        //   name: 'commons',
        //   minChunks: 2,
        //   chunks: 'all',
        //   priority: 5,
        // },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 800000,
    maxAssetSize: 400000,
  },
})

if (useSentryMap) {
  const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN
  if (sentryAuthToken) {
    prodWebpackConfig.plugins.push(
      sentryWebpackPlugin({
        release: packageJson.version,
        include: path.join(__dirname, '../dist/static/js'),
        urlPrefix: '~/static/js',
        authToken: sentryAuthToken,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        telemetry: false,
      })
    )
  } else {
    // Avoid noisy plugin warning when token is not provided (common in local dev)
    // CI/production should set SENTRY_AUTH_TOKEN to enable releases & source map upload.
    // See https://docs.sentry.io/api/auth/ for token creation.
    // eslint-disable-next-line no-console
    console.warn('[sentry-webpack-plugin] SENTRY_AUTH_TOKEN not set — skipping Sentry release/source map upload.')
  }
}

// 如果设置了 DIST_ZIP 环境变量，则在构建完成后把 dist 压缩到 dist-zip/pro-react-admin.zip
if (process.env.DIST_ZIP === '1' || process.env.DIST_ZIP === 'true') {
  prodWebpackConfig.plugins.push(
    new FileManagerPlugin({
      events: {
        onEnd: {
          mkdir: [path.resolve(__dirname, '../dist-zip')],
          archive: [
            {
              source: path.resolve(__dirname, '../dist'),
              destination: path.resolve(__dirname, '../dist-zip/pro-react-admin.zip'),
            },
          ],
        },
      },
    })
  )
}

export default prodWebpackConfig
