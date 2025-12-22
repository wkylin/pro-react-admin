import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const rootDir = process.cwd()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',         // 推荐加上：支持故事间跳转
    '@storybook/addon-a11y',          // 保持
    '@storybook/addon-docs',          // 如果你用了 MDX3，可以去掉（essentials 已包含）
  ],
  docs: {},
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@': path.resolve(rootDir, 'src'),
          '@src/*': path.resolve(rootDir, 'src/*'),
          '@stateless/*': path.resolve(rootDir, 'src/components/stateless/*'),
          '@stateful/*': path.resolve(rootDir, 'src/components/stateful/*'),
          '@hooks/*': path.resolve(rootDir, 'src/components/hooks/*'),
          '@app-hooks/*': path.resolve(rootDir, 'src/app-hooks/*'),
          '@container/*': path.resolve(rootDir, 'src/components/container/*'),
          '@assets/*': path.resolve(rootDir, 'src/assets/*'),
          '@pages/*': path.resolve(rootDir, 'src/pages/*'),
          '@routers/*': path.resolve(rootDir, 'src/routers/*'),
          '@utils/*': path.resolve(rootDir, 'src/utils/*'),
          '@theme/*': path.resolve(rootDir, 'src/theme/*'),
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
      cacheDir: path.resolve(rootDir, '.vite-cache/storybook'),
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      },

      build: {
        chunkSizeWarningLimit: 2000,
      },
  }),
}

export default config
