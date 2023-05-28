import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import svgr from 'vite-plugin-svgr'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
import visualizer from 'rollup-plugin-visualizer'

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
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
    svgr(),
    visualizer(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => name !== 'theme' && `antd/es/${name}/style`,
        },
      ],
    }),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: 'Pro React Vite',
    //       favicon: path.resolve(__dirname, './public/favicon.ico'),
    //     },
    //   },
    // }),
    // sentryVitePlugin({
    //   org: 'wkylin',
    //   project: 'promotion-web',
    //   authToken: '73acdaa05e174744804f105c6e3365533e42da87ada6496bbc42d5a208f23a31',
    //   sourcemaps: {
    //     assets: './dist/**',
    //   },
    // }),
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
  // 去除console和debugger
  esbuild: {
    pure: ['console.log', 'debugger'],
  },
  build: {
    sourcemap: true,
    write: true,
    rollupOptions: {
      // external: [],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        // chunkFileNames: (chunkInfo) => {
        //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
        //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
        //   return `js/${fileName}/[name].[hash].js`
        // },
      },
    },
  },
  preview: {
    port: 4173,
  },
})
