import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { serwist } from '@serwist/vite'
import svgr from 'vite-plugin-svgr'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ZipArchive } from 'archiver'
import packageJson from './package.json' with { type: 'json' }
import { resolveProject, resolveBuildOutput } from './config/project-registry.mjs'
import { createPathAliases } from './build/aliases.js'
import { createPublicEnv } from './build/public-env.js'
import { createFederationPlugins } from './build/module-federation.ts'
import { createDevProxy } from './build/dev-proxy.ts'
import { buildStats } from './build/stats.ts'

const root = path.dirname(fileURLToPath(import.meta.url))
const normalizeBase = (value = '/') => {
  const raw = value.trim()
  if (!raw || raw === '/') return '/'
  if (raw === '.' || raw === './') return './'
  if (/^https?:\/\//.test(raw)) return raw.endsWith('/') ? raw : `${raw}/`
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`
}

export default defineConfig(({ mode, command }) => {
  const env = { ...loadEnv(mode, root, ''), ...process.env }
  const selected = resolveProject(env.PROJECT || env.VITE_PROJECT || 'default')
  const { name: project } = selected
  const base = normalizeBase(env.PUBLIC_URL || env.VITE_BASE)
  const outDir = resolveBuildOutput(selected, env.VITE_OUT_DIR)
  const isBuild = command === 'build'
  const buildTime = new Date().toISOString()
  const role = (env.MFE_ROLE || '').trim()
  if (role && role !== 'host' && role !== 'remote') throw new Error('MFE_ROLE must be host or remote')
  const port = Number(env.PORT || (selected.remote ? selected.remote.devPort : 8080))
  const clientEnv = createPublicEnv({ mode, project, source: env })
  const useSentry = env.SENTRY_SOURCE_MAP === 'map'
  const useAnalyze = env.USE_ANALYZE === '1' || env.USE_ANALYZE === 'true'
  const debug = env.DEBUG_PROD === '1'
  const projectPublicDir = path.join(selected.sourceRoot, 'public')
  const aliases = createPathAliases(root, { '@routers': selected.routers })
  for (const kind of ['audio', 'video']) {
    const optimized = path.join(root, 'src/assets-optimized', kind)
    if (isBuild && fs.existsSync(optimized)) aliases[`@assets/${kind}`] = optimized
  }
  const copyTargets = []
  if (project !== 'default' && fs.existsSync(projectPublicDir)) {
    copyTargets.push({
      src: [
        `${projectPublicDir}/**/*`,
        `!${projectPublicDir}/**/.gitkeep`,
        `!${projectPublicDir}/**/index.html`,
        `!${projectPublicDir}/**/audio/**`,
      ],
      dest: '.',
      rename: { stripBase: path.relative(root, projectPublicDir).split(path.sep).length },
    })
  }
  const optimizedAudio = path.join(root, 'public-optimized/audio')
  if (isBuild && fs.existsSync(optimizedAudio)) copyTargets.push({ src: `${optimizedAudio}/*`, dest: 'audio' })

  const applicationHtml: Plugin = {
    name: 'application-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('/src/index.tsx', `/${path.relative(root, selected.entry).split(path.sep).join('/')}`)
      },
    },
  }
  const versionManifest: Plugin = {
    name: 'version-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: packageJson.version, buildTime, project }, null, 2),
      })
    },
  }
  const zip: Plugin = {
    name: 'zip-after-build',
    apply: 'build',
    enforce: 'post',
    closeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        if (env.ZIP_DIST !== '1' && env.ZIP_DIST !== 'true') return
        const directory = path.join(root, 'dist-zip')
        await fs.promises.mkdir(directory, { recursive: true })
        const output = fs.createWriteStream(
          path.join(directory, `pro-react-admin${project === 'default' ? '' : `-${project}`}.zip`)
        )
        const archive = new ZipArchive({ zlib: { level: 9 } })
        await new Promise<void>((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          archive.pipe(output)
          archive.directory(outDir, false)
          void archive.finalize().catch(reject)
        })
      },
    },
  }

  return {
    plugins: [
      svgr({ include: '**/*.svg', svgrOptions: { icon: true, exportType: 'default' } }),
      react(),
      applicationHtml,
      versionManifest,
      ...(copyTargets.length ? viteStaticCopy({ targets: copyTargets, silent: true }) : []),
      serwist({
        disable: !isBuild,
        swSrc: 'src/sw.ts',
        swDest: 'sw.js',
        globDirectory: outDir,
        injectionPoint: 'self.__SW_MANIFEST',
        rollupFormat: 'iife',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,txt,woff,woff2}'],
        globIgnores: ['**/*.map', '**/*.gz', '**/*.br', 'version.json', '.vite/**'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      }),
      ...(useAnalyze
        ? [visualizer({ filename: path.join(outDir, 'stats.html'), gzipSize: true, brotliSize: true, open: false })]
        : []),
      ...(env.VITE_BUILD_STATS ? [buildStats(env.VITE_BUILD_STATS, project)] : []),
      ...(isBuild
        ? [compression({ algorithm: 'gzip' }), compression({ algorithm: 'brotliCompress', ext: '.br' })]
        : []),
      ...(useSentry && env.SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              org: env.SENTRY_ORG,
              project: env.SENTRY_PROJECT,
              authToken: env.SENTRY_AUTH_TOKEN,
              telemetry: false,
              release: { name: packageJson.version },
              sourcemaps: { assets: `${outDir}/assets/**` },
            }),
          ]
        : []),
      ...createFederationPlugins({ project, role: role as 'host' | 'remote' | '', isDev: !isBuild, env }),
      zip,
    ],
    define: {
      'process.env': JSON.stringify(clientEnv),
      __APP_ENV__: JSON.stringify(clientEnv),
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __APP_BUILD_TIME__: JSON.stringify(buildTime),
    },
    envPrefix: 'VITE_',
    base,
    cacheDir: path.join(root, 'node_modules/.vite', `${project}-${role || 'standalone'}-${mode}`),
    publicDir: path.join(root, 'public'),
    resolve: {
      alias: Object.entries(aliases)
        .sort(([left], [right]) => right.length - left.length)
        .map(([find, replacement]) => ({ find, replacement })),
      dedupe: ['react', 'react-dom', 'zustand', 'immer'],
    },
    css: {
      preprocessorOptions: { less: { javascriptEnabled: true } },
      modules: { localsConvention: 'camelCase' },
    },
    server: {
      host: true,
      port,
      strictPort: Boolean(role),
      ...(role ? { origin: `http://localhost:${port}`, cors: true } : {}),
      proxy: createDevProxy(env),
    },
    preview: { host: true, port: 5174 },
    build: {
      outDir,
      emptyOutDir: true,
      manifest: true,
      sourcemap: debug ? true : useSentry ? 'hidden' : false,
      ...(debug ? { minify: false } : {}),
      chunkSizeWarningLimit: 2000,
      target: 'es2022',
    },
  }
})
