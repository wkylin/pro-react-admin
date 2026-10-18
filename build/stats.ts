import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

export function buildStats(filename: string, project: string): Plugin {
  return {
    name: 'vite-build-stats',
    async generateBundle(_options, bundle) {
      const initial = new Set<string>()
      const visit = (name: string) => {
        if (initial.has(name)) return
        initial.add(name)
        const chunk = bundle[name]
        if (chunk?.type !== 'chunk') return
        chunk.imports.forEach(visit)
        chunk.viteMetadata?.importedCss.forEach((css: string) => initial.add(css))
      }
      Object.values(bundle)
        .filter((item) => item.type === 'chunk' && item.isEntry)
        .forEach((item) => visit(item.fileName))
      const assets = Object.values(bundle).map((item) => ({
        name: item.fileName,
        size: item.type === 'chunk' ? Buffer.byteLength(item.code) : Buffer.byteLength(item.source),
      }))
      const destination = path.resolve(filename)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.writeFile(destination, JSON.stringify({ project, assets, initialAssets: [...initial] }, null, 2) + '\n')
    },
  }
}
