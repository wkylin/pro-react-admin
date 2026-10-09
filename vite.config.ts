import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { serwist } from '@serwist/vite'
import svgr from 'vite-plugin-svgr'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import fs from 'fs'
import type { Archiver, ArchiverOptions } from 'archiver'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import packageJson from './package.json' with { type: 'json' }
import { createPublicEnv } from './build/public-env.js'
import { createFederationPlugin } from './build/module-federation.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const archiver = require('archiver') as (format: 'zip', options?: ArchiverOptions) => Archiver
const manualChunkGroups: Record<string, string[]> = {
  'vendor-zustand': ['zustand', 'zustand/middleware', 'zustand/middleware/immer', 'immer'],
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-antd': ['antd', '@ant-design/icons'],
  'vendor-hls': ['hls.js'],
}

const manualChunks = (id: string) => {
  for (const [chunkName, modules] of Object.entries(manualChunkGroups)) {
    if (modules.some((moduleName) => id.includes(`/node_modules/${moduleName}/`) || id.includes(`/node_modules/${moduleName}.`))) {
      return chunkName
    }
  }
}

const normalizeBase = (value: string | undefined) => {
  const raw = (value ?? '').trim()
  if (!raw || raw === '/') return '/'
  if (raw === '.' || raw === './') return './'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw.endsWith('/') ? raw : `${raw}/`
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const project = (process.env.PROJECT || env.PROJECT || env.VITE_PROJECT || 'default').trim() || 'default'
  const base = normalizeBase(process.env.PUBLIC_URL || env.PUBLIC_URL || env.VITE_BASE)
  const buildTime = new Date().toISOString()
  const rawMfeRole = (process.env.MFE_ROLE || env.MFE_ROLE || '').trim()
  if (rawMfeRole && rawMfeRole !== 'host' && rawMfeRole !== 'remote') {
    throw new Error(`MFE_ROLE must be "host" or "remote" (received "${rawMfeRole}")`)
  }
  const mfeRole = rawMfeRole as 'host' | 'remote' | ''
  const isMfeBuild = mfeRole === 'host' || mfeRole === 'remote'
  const port = Number(process.env.PORT || env.PORT || (mfeRole === 'host' ? 8080 : project === 'projectA' ? 8081 : project === 'projectB' ? 8082 : 5173))

  const resolveProjectDir = (...segments: string[]) => path.resolve(__dirname, 'src', 'projects', project, ...segments)
  const projectEntry = project === 'default' ? '/src/index.tsx' : `/src/projects/${project}/index.tsx`
  const projectPublicDir = project === 'default' ? path.resolve(__dirname, 'public') : resolveProjectDir('public')
  const hasProjectPublicDir = fs.existsSync(projectPublicDir) && fs.statSync(projectPublicDir).isDirectory()
  const projectPublicRelativePath = path.relative(__dirname, projectPublicDir)
  const projectPublicPath = projectPublicDir.split(path.sep).join('/')
  const projectPublicBaseSegments = projectPublicRelativePath.split(path.sep).filter(Boolean).length
  const defaultOutDir = project === 'default' ? 'dist' : `dist-${project}`
  const outDir = (process.env.VITE_OUT_DIR || env.VITE_OUT_DIR || defaultOutDir).trim()
  const cacheScope = `${project}-${mfeRole || 'standalone'}`.replace(/[^a-zA-Z0-9_-]/g, '_')
  const clientEnv = createPublicEnv({
    mode,
    project,
    source: { ...env, ...process.env },
  })

  const useAnalyze = env.USE_ANALYZE === '1' || env.USE_ANALYZE === 'true'
  const isProd = mode === 'production'
  const useSentry = env.SENTRY_SOURCE_MAP === 'map' && isProd
  const isStorybookBuild = process.env.STORYBOOK_BUILD === '1' || env.STORYBOOK_BUILD === '1'
  const federationPlugin = createFederationPlugin({
    project,
    role: mfeRole,
    isDev: !isProd,
    env: { ...env, ...process.env },
  })

  // 构建完成后压缩插件（受环境变量 ZIP_DIST 控制）
  const zipAfterBuild = () => ({
    name: 'zip-after-build',
    async closeBundle() {
      const doZip = env.ZIP_DIST === '1' || env.ZIP_DIST === 'true'
      if (!doZip || !isProd) return

      const outDirAbs = path.resolve(__dirname, outDir)
      const zipDir = path.resolve(__dirname, 'dist-zip')
      await fs.promises.mkdir(zipDir, { recursive: true })
      const archivePath = path.join(zipDir, project === 'default' ? 'pro-react-admin.zip' : `pro-react-admin-${project}.zip`)

      const output = fs.createWriteStream(archivePath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      return new Promise<void>((resolve, reject) => {
        output.on('close', () => resolve())
        archive.on('error', (err) => reject(err))
        archive.pipe(output)
        archive.directory(outDirAbs, false)
        archive.finalize()
      })
    },
  })

  const multiProjectIndexHtml = () => ({
    name: 'multi-project-index-html',
    transformIndexHtml(html: string) {
      // 替换默认入口脚本为当前项目入口
      return html.replace(
        /<script\s+type="module"\s+src="\/src\/index\.tsx"\s*><\/script>/,
        `<script type="module" src="${projectEntry}"></script>`
      )
    },
  })

  const emitVersionManifest: Plugin = {
    name: 'emit-version-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(
          {
            version: packageJson.version,
            buildTime,
            project,
          },
          null,
          2
        ),
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
      emitVersionManifest,
      ...(project !== 'default' && hasProjectPublicDir
        ? viteStaticCopy({
            targets: [
              {
                src: [
                  `${projectPublicPath}/**/*`,
                  `!${projectPublicPath}/**/.gitkeep`,
                  `!${projectPublicPath}/**/index.html`,
                  `!${projectPublicPath}/**/audio/**`,
                ],
                dest: '.',
                rename: { stripBase: projectPublicBaseSegments },
              },
            ],
            silent: true,
          })
        : []),
      ...(!isStorybookBuild
        ? [
            serwist({
              disable: !isProd,
              swSrc: 'src/sw.ts',
              swDest: 'sw.js',
              globDirectory: outDir,
              injectionPoint: 'self.__SW_MANIFEST',
              rollupFormat: 'iife',
              globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,txt,woff,woff2}'],
              maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
            }),
          ]
        : []),
      multiProjectIndexHtml(),
      ...(useAnalyze
        ? [visualizer({ filename: `${outDir}/stats.html`, gzipSize: true, brotliSize: true, open: false })]
        : []),
      ...(isProd
        ? [
            compression({ algorithm: 'gzip', deleteOriginFile: false }),
            compression({ algorithm: 'brotliCompress', ext: '.br', deleteOriginFile: false }),
            zipAfterBuild(),
          ]
        : []),
      ...(useSentry
        ? [
            sentryVitePlugin({
              org: env.SENTRY_ORG || 'wkylin',
              project: env.SENTRY_PROJECT || 'pro-react-admin',
              authToken: env.SENTRY_AUTH_TOKEN,
              release: {
                name: packageJson.version,
              },
              sourcemaps: {
                assets: `./${outDir}/assets/**`,
              },
              bundleSizeOptimizations: {
                excludeDebugStatements: true,
                excludeTracing: false,
                excludeReplayIframe: true,
                excludeReplayShadowDom: true,
                excludeReplayWorker: true,
              },
            }),
          ]
        : []),
      ...(federationPlugin ? [federationPlugin] : []),
    ],
    define: {
      'process.env': clientEnv,
      __APP_ENV__: JSON.stringify(clientEnv),
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __APP_BUILD_TIME__: JSON.stringify(buildTime),
    },
    // Only VITE_* values are implicitly exposed. Legacy public keys are passed
    // through the explicit allowlist above so AUTH_* and REACT_APP_* secrets
    // cannot leak just because of their prefix.
    envPrefix: 'VITE_',
    base,
    // Federation wraps shared dependencies in owner-scoped virtual modules.
    // Isolate optimizer caches so another project/role cannot reuse those IDs.
    cacheDir: path.resolve(__dirname, 'node_modules/.vite', cacheScope),
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@src': path.resolve(__dirname, 'src'),
        '@app': project === 'default' ? path.resolve(__dirname, 'src') : resolveProjectDir(),
        '@stateless': path.resolve(__dirname, 'src/components/stateless'),
        '@stateful': path.resolve(__dirname, 'src/components/stateful'),
        '@hooks': path.resolve(__dirname, 'src/components/hooks'),
        '@app-hooks': path.resolve(__dirname, 'src/app-hooks'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@routers': fs.existsSync(resolveProjectDir('routers')) ? resolveProjectDir('routers') : path.resolve(__dirname, 'src/routers'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@theme': path.resolve(__dirname, 'src/theme'),
      },
      // 确保 zustand 及相关依赖只有一个实例，避免 middleware 错误
      dedupe: ['zustand', 'immer', 'react', 'react-dom'],
    },
    server: {
      port,
      strictPort: isMfeBuild,
      ...(isMfeBuild ? { origin: `http://localhost:${port}` } : {}),
      proxy: {
        '/wkylin': {
          target: 'https://my-json-server.typicode.com',
          changeOrigin: true,
          secure: false,
        },
        '/v2': {
          target: 'https://www.mocky.io',
          changeOrigin: true,
          secure: false,
        },
        '/faker': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          rewrite: (requestPath) => requestPath.replace(/^\/faker/, ''),
        },
        '/api/github-token': {
          target: 'https://github.com',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          rewrite: (requestPath) => requestPath.replace(/^\/api\/github-token/, '/login/oauth/access_token'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyRequest) => {
              proxyRequest.setHeader('Accept', 'application/json')
              proxyRequest.setHeader('Content-Type', 'application/json')
            })
            proxy.on('proxyRes', (proxyResponse) => {
              proxyResponse.headers['Access-Control-Allow-Origin'] = '*'
            })
          },
        },
        '/api/github-user': {
          target: 'https://api.github.com',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          rewrite: (requestPath) => requestPath.replace(/^\/api\/github-user/, '/user'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyRequest) => {
              proxyRequest.setHeader('Accept', 'application/json')
              proxyRequest.setHeader('Content-Type', 'application/json')
            })
            proxy.on('proxyRes', (proxyResponse) => {
              proxyResponse.headers['Access-Control-Allow-Origin'] = '*'
            })
          },
        },
        '/api/github-email': {
          target: 'https://api.github.com',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          rewrite: (requestPath) => requestPath.replace(/^\/api\/github-email/, '/user/emails'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyRequest) => {
              proxyRequest.setHeader('Accept', 'application/json')
              proxyRequest.setHeader('Content-Type', 'application/json')
            })
            proxy.on('proxyRes', (proxyResponse) => {
              proxyResponse.headers['Access-Control-Allow-Origin'] = '*'
            })
          },
        },
      },
      open: false,
    },
    preview: {
      port: 5174,
      open: false,
    },
    build: {
      outDir,
      sourcemap: useSentry ? 'hidden' : false,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          // Module Federation manages shared chunks itself; keep manual splitting
          // disabled for those builds to avoid overriding its runtime boundaries.
          ...(isMfeBuild ? {} : { manualChunks }),
        },
      },
    },
  }
})
