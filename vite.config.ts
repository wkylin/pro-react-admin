import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const clientEnv = {
    NODE_ENV: mode,
    APP_BASE_URL: env.APP_BASE_URL,
    REACT_APP_USE_MOCK: env.REACT_APP_USE_MOCK,
    AUTH_USER: env.AUTH_USER,
    AUTH_EMAIL: env.AUTH_EMAIL,
    AUTH_PHONE: env.AUTH_PHONE,
    AUTH_PASSWORD: env.AUTH_PASSWORD,
    IFRAME_ORIGIN: env.IFRAME_ORIGIN,
    DEPLOYED_ENV: env.DEPLOYED_ENV,
    REACT_APP_GITHUB_CLIENT_ID: env.REACT_APP_GITHUB_CLIENT_ID,
    REACT_APP_GITHUB_CLIENT_SECRET: env.REACT_APP_GITHUB_CLIENT_SECRET,
    REACT_APP_GITHUB_REDIRECT_URI: env.REACT_APP_GITHUB_REDIRECT_URI,
  }

  const injectAppEntry = {
    name: 'inject-app-entry',
    transformIndexHtml(html: string) {
      const tag = '<script type="module" src="/src/index.tsx"></script>'
      return html.includes(tag) ? html : html.replace('</body>', `  ${tag}\n</body>`)
    },
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use((req: import('http').IncomingMessage, _res: import('http').ServerResponse, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          req.url = '/index.html'
        }
        next()
      })
    },
  }

  return {
    plugins: [
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          icon: true,
          exportType: 'default',
        },
      }),
      react(),
      injectAppEntry,
    ],
    define: {
      'process.env': clientEnv,
    },
    envPrefix: ['VITE_', 'APP_', 'REACT_APP_', 'IFRAME_', 'AUTH_', 'DEPLOYED_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@src': path.resolve(__dirname, 'src'),
        '@stateless': path.resolve(__dirname, 'src/components/stateless'),
        '@stateful': path.resolve(__dirname, 'src/components/stateful'),
        '@hooks': path.resolve(__dirname, 'src/components/hooks'),
        '@app-hooks': path.resolve(__dirname, 'src/app-hooks'),
        '@container': path.resolve(__dirname, 'src/components/container'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@routers': path.resolve(__dirname, 'src/routers'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@theme': path.resolve(__dirname, 'src/theme'),
      },
    },
    server: {
      port: 5173,
      open: false,
    },
    preview: {
      port: 5174,
      open: false,
    },
    build: {
      outDir: 'dist-vite',
      sourcemap: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
      },
    },
  }
})
