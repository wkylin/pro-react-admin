import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { loadEnv, preview as createPreview } from 'vite'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const viteEnv = loadEnv('production', projectRoot, '')
const project = process.env.PROJECT || viteEnv.PROJECT || viteEnv.VITE_PROJECT || 'default'
const outputDirName = process.env.VITE_OUT_DIR || viteEnv.VITE_OUT_DIR || (project === 'default' ? 'dist' : `dist-${project}`)
const outputDir = path.resolve(projectRoot, outputDirName)
const expectedProject = process.env.VERIFY_PROJECT || project
const configuredBase = (process.env.PUBLIC_URL || viteEnv.PUBLIC_URL || process.env.VITE_BASE || viteEnv.VITE_BASE || '/').trim()
const base = normalizeBase(configuredBase)
const port = Number(process.env.VITE_PREVIEW_PORT || 4173)
const remoteEntryName = process.env.VERIFY_REMOTE_ENTRY || ''
const basePath = getBasePath(base)
const previewUrl = `http://127.0.0.1:${port}`

function getBasePath(value) {
  if (value === './') return '/'
  if (value.startsWith('http://') || value.startsWith('https://')) return new URL(value).pathname
  return value
}

function normalizeBase(value) {
  if (!value || value === '/') return '/'
  if (value === '.' || value === './') return './'
  if (value.startsWith('http://') || value.startsWith('https://')) return value.endsWith('/') ? value : `${value}/`
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function localPathFromReference(reference) {
  if (
    !reference ||
    reference.startsWith('data:') ||
    reference.startsWith('//') ||
    reference.startsWith('http://') ||
    reference.startsWith('https://')
  ) {
    return null
  }

  const pathname = decodeURIComponent(new URL(reference, 'http://localhost').pathname)
  let relativePath = pathname.replace(/^\/+/, '')

  if (base.startsWith('/') && base !== '/') {
    assert.ok(pathname.startsWith(base), `Asset does not use configured base ${base}: ${reference}`)
    relativePath = pathname.slice(base.length)
  }

  return path.resolve(outputDir, relativePath)
}

async function waitForPreview() {
  const deadline = Date.now() + 30_000
  let lastError

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${previewUrl}${basePath}`)
      if (response.ok) return response
      lastError = new Error(`Preview returned HTTP ${response.status}`)
    } catch (error) {
      lastError = error
    }

    await delay(500)
  }

  throw new Error(`Vite preview did not become ready: ${lastError?.message || 'timeout'}`)
}

const htmlPath = path.join(outputDir, 'index.html')
const versionPath = path.join(outputDir, 'version.json')
await Promise.all([access(htmlPath), access(versionPath), access(path.join(outputDir, 'sw.js'))])
if (remoteEntryName) await access(path.join(outputDir, remoteEntryName))

const html = await readFile(htmlPath, 'utf8')
const version = JSON.parse(await readFile(versionPath, 'utf8'))
assert.equal(version.project, expectedProject, `Expected project ${expectedProject}, got ${version.project}`)

const assetReferences = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((reference) => /\.[a-z0-9]+(?:[?#].*)?$/i.test(reference))

assert.ok(assetReferences.some((reference) => /\.js(?:[?#].*)?$/i.test(reference)), 'index.html does not reference a JavaScript entry')

for (const reference of assetReferences) {
  const filePath = localPathFromReference(reference)
  if (filePath) await access(filePath)
}

if (process.argv.includes('--static-only')) {
  console.log(`Vite preview files verified: project=${expectedProject}, base=${base}, output=${path.relative(projectRoot, outputDir)}`)
  process.exit(0)
}

const previewServer = await createPreview({
  root: projectRoot,
  configFile: path.join(projectRoot, 'vite.config.ts'),
  preview: {
    host: '127.0.0.1',
    port,
    strictPort: true,
  },
})

try {
  const response = await waitForPreview()
  const previewHtml = await response.text()
  assert.match(previewHtml, /<html[\s>]/i, 'Preview response is not an HTML document')

  const previewAssetReferences = assetReferences.filter((reference) => {
    const isExternal = reference.startsWith('//') || reference.startsWith('http://') || reference.startsWith('https://')
    return !isExternal && /\.(?:js|css)(?:[?#].*)?$/i.test(reference)
  })

  for (const reference of previewAssetReferences) {
    const url = new URL(reference, `${previewUrl}${basePath}`)
    const assetResponse = await fetch(url)
    assert.ok(assetResponse.ok, `Preview asset returned HTTP ${assetResponse.status}: ${url.pathname}`)
  }

  if (remoteEntryName) {
    const remoteEntryUrl = new URL(`${basePath}${remoteEntryName}`, `${previewUrl}/`)
    const remoteEntryResponse = await fetch(remoteEntryUrl)
    assert.ok(remoteEntryResponse.ok, `Remote entry returned HTTP ${remoteEntryResponse.status}: ${remoteEntryUrl.pathname}`)
    assert.match(await remoteEntryResponse.text(), /remoteEntry|mf-manifest|modulepreload/i, 'Remote entry does not look like a federation container')
  }

  console.log(`Vite preview verified: project=${expectedProject}, base=${base}, output=${path.relative(projectRoot, outputDir)}${remoteEntryName ? `, remoteEntry=${remoteEntryName}` : ''}`)
} finally {
  await new Promise((resolve, reject) => {
    previewServer.httpServer.close((error) => (error ? reject(error) : resolve()))
  })
}
