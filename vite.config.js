import { defineConfig } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import svgr from 'vite-plugin-svgr'
import path from 'path'
// const { env } = import.meta

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
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}'
    }),
    svgr(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    })
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: 'Pro React Vite',
    //       favicon: path.resolve(__dirname, './public/favicon.ico'),
    //     },
    //   },
    // }),
  ],
  define: {
    process // 解决未定义问题，推荐 import.meta.env
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE' // 设置antd主题色
        }
      }
    }
  },
  server: {
    open: true,
    // host: 'localhost',
    proxy: {
      '/faker': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/faker': '' },
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost'
      },
      '/wkylin': {
        // target: 'https://jsonplaceholder.typicode.com',
        // target: service[env.proxy] // --env.proxy=test
        target: 'https://my-json-server.typicode.com',
        // pathRewrite: { '^/wkylin': '/wkylin' },
        secure: false,
        changeOrigin: true
      },
      '/v2': {
        target: 'https://www.mocky.io',
        secure: false,
        changeOrigin: true
      }
    }
  },
  build: {
    write: true
  },
  preview: {
    port: 4173
  }
})
