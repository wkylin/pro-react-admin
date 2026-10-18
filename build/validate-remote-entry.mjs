import { build } from 'esbuild'

export async function validateRemoteEntry(entryPath) {
  const result = await build({
    entryPoints: [entryPath],
    bundle: true,
    write: false,
    metafile: true,
    format: 'esm',
    platform: 'browser',
    logLevel: 'silent',
  })
  const entry = Object.values(result.metafile.outputs).find((output) => output.entryPoint)
  if (!entry?.exports.includes('get') || !entry.exports.includes('init')) {
    throw new Error(`Remote entry must export the ESM get/init container API: ${entryPath}`)
  }
}
