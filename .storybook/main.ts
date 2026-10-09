import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPathAliases } from '../webpack/aliases.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public', { from: '../src/assets', to: '/assets' }],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
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
