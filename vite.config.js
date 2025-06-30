import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import svgr from 'vite-plugin-svgr'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      '@stateless': path.resolve(__dirname, './src/components/stateless/'),
      '@stateful': path.resolve(__dirname, './src/components/stateful/'),
      '@hooks': path.resolve(__dirname, './src/components/hooks/'),
      '@container': path.resolve(__dirname, './src/components/container/'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routers': path.resolve(__dirname, './src/routers'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    svgr(),
    // visualizer(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => name !== 'theme' && `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  define: {
    process, // 解决未定义问题，推荐 import.meta.env
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE', // 设置antd主题色
        },
      },
    },
  },
  server: {
    open: true,
    proxy: {
      '/faker': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/faker': '' },
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
      '/wkylin': {
        // target: 'https://jsonplaceholder.typicode.com',
        // target: service[env.proxy] // --env.proxy=test
        target: 'https://my-json-server.typicode.com',
        // pathRewrite: { '^/wkylin': '/wkylin' },
        secure: false,
        changeOrigin: true,
      },
      '/v2': {
        target: 'https://www.mocky.io',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
})
