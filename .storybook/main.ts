import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPathAliases } from '../webpack/aliases.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const config: StorybookConfig = {
  stories: [
    './stories/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/wui-react/src/**/*.mdx',
    '../packages/wui-react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public', { from: '../src/assets', to: '/assets' }],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // The application enables react-refresh/babel in the development environment.
  // Storybook owns HMR and does not install the application's Refresh runtime.
  babel: async (options) => ({ ...options, envName: 'storybook' }),
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: { fsCache: true },
    },
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve ??= {}
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...createPathAliases(rootDir),
    }

    webpackConfig.module ??= { rules: [] }
    webpackConfig.module.rules ??= []
    // Compile the same Tailwind source used by the application.
    const addPostcss = (rules: NonNullable<NonNullable<typeof webpackConfig.module>['rules']>) => {
      for (const rule of rules) {
        if (!rule || typeof rule !== 'object') continue
        if (rule.oneOf) addPostcss(rule.oneOf)
        if (rule.rules) addPostcss(rule.rules)
        if (rule.test instanceof RegExp && rule.test.test('icon.svg')) {
          rule.exclude = [rule.exclude, /\.svg$/i].filter(Boolean) as typeof rule.exclude
        }
        if (rule.test instanceof RegExp && rule.test.test('reset.css') && Array.isArray(rule.use)) {
          rule.use.push('postcss-loader')
        }
      }
    }
    addPostcss(webpackConfig.module.rules)
    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    // Storybook injects styles at runtime; app/library extraction rules remain build-specific.
    webpackConfig.module.rules.push({
      test: /\.less$/i,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: /\.module\.less$/i,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
              namedExport: false,
            },
          },
        },
        {
          loader: 'less-loader',
          options: { lessOptions: { javascriptEnabled: true } },
        },
      ],
    })

    return webpackConfig
  },
}

export default config
