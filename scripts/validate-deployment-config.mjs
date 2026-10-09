import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const readConfig = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const configs = Object.fromEntries(
  ['vercel.json', 'vercel.mfe.json', 'vercel.shell.json', 'vercel.projectA.json', 'vercel.projectB.json'].map((file) => [file, readConfig(file)])
)
const packageJson = readConfig('package.json')

function headersFor(config, source) {
  return config.headers?.find((rule) => rule.source === source)?.headers || []
}

function assertHeader(configName, config, source, key, includes) {
  const value = headersFor(config, source).find((header) => header.key.toLowerCase() === key.toLowerCase())?.value || ''
  if (!value.includes(includes)) throw new Error(`${configName}: ${source} must set ${key} containing "${includes}"`)
}

function assertNoCache(configName, config, source) {
  assertHeader(configName, config, source, 'Cache-Control', 'no-store')
  assertHeader(configName, config, source, 'Access-Control-Allow-Origin', '*')
}

const aggregate = configs['vercel.mfe.json']
if (aggregate.buildCommand !== 'pnpm run vercel-build' || aggregate.outputDirectory !== 'dist-vercel') {
  throw new Error('vercel.mfe.json must build vercel-build into dist-vercel')
}
if (packageJson.scripts['vercel-build'] !== 'pnpm run build:mf:vercel') {
  throw new Error('package.json vercel-build script no longer matches the aggregate deployment configuration')
}

for (const [configName, config] of [['vercel.json', configs['vercel.json']], ['vercel.mfe.json', aggregate]]) {
  for (const source of [
    '/remoteEntry.js',
    '/remote-manifest.json',
    '/projectA/remoteEntry.js',
    '/projectA/remote-manifest.json',
    '/projectB/remoteEntry.js',
    '/projectB/remote-manifest.json',
  ]) {
    assertNoCache(configName, config, source)
  }
  for (const source of ['/static/(.*)', '/projectA/static/(.*)', '/projectB/static/(.*)']) {
    assertHeader(configName, config, source, 'Cache-Control', 'immutable')
  }
}

for (const name of ['shell', 'projectA', 'projectB']) {
  const file = `vercel.${name}.json`
  const config = configs[file]
  const expectedCommand = packageJson.scripts[
    name === 'shell' ? 'build:mf:shell' : `build:mf:${name}:standalone`
  ]
  const expectedOutput = name === 'shell' ? 'dist-shell' : `dist-${name}`
  if (config.buildCommand !== `pnpm run ${name === 'shell' ? 'build:mf:shell' : `build:mf:${name}:standalone`}`) {
    throw new Error(`${file} build command does not match the package script (${expectedCommand})`)
  }
  if (config.outputDirectory !== expectedOutput) throw new Error(`${file} outputDirectory must be ${expectedOutput}`)
  assertHeader(file, config, '/static/(.*)', 'Cache-Control', 'immutable')
  if (name !== 'shell') {
    assertNoCache(file, config, '/remoteEntry.js')
    assertNoCache(file, config, '/remote-manifest.json')
  }
}

console.log('[deployment-config] Vercel build outputs, Remote cache/CORS, and hashed asset policies are consistent')
