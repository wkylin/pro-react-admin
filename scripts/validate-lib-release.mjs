import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'packages/wui-react/package.json'), 'utf8'))
const version = packageJson.version
const releaseRef = process.env.WUI_RELEASE_REF || ''
const requestedDistTag = process.env.WUI_DIST_TAG || process.env.npm_config_tag || ''
const shouldPrintDistTag = process.argv.includes('--print-tag')

if (!/^6\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`无效的 wui-react v6 版本：${version}`)
}

if (releaseRef.startsWith('wui-react-v') && releaseRef !== `wui-react-v${version}`) {
  throw new Error(`Git tag ${releaseRef} 与 packages/wui-react/package.json@${version} 不一致`)
}

const prerelease = version.includes('-')
const inferredDistTag = prerelease ? (version.includes('-beta.') ? 'beta' : 'next') : 'latest'

if (requestedDistTag && requestedDistTag !== inferredDistTag) {
  throw new Error(`版本 ${version} 必须发布到 ${inferredDistTag}，不能发布到 ${requestedDistTag}`)
}

if (shouldPrintDistTag) {
  process.stdout.write(inferredDistTag)
}
