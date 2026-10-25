import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { loadConfigFromFile } from 'vite'
import { resolveProject, workspaceRoot } from '../config/project-registry.mjs'

const configFile = path.join(workspaceRoot, 'build/vite/app.config.ts')
const htmlRoot = path.dirname(configFile)
const placeholder = '../../src/index.tsx'

test('Vite HTML resolves registered entries in development and production', async () => {
  const previousProject = process.env.PROJECT
  try {
    for (const project of ['default', 'projectA']) {
      process.env.PROJECT = project
      const entry = resolveProject(project).entry
      for (const command of ['serve', 'build']) {
        const loaded = await loadConfigFromFile(
          { command, mode: command === 'serve' ? 'development' : 'production' },
          configFile,
          workspaceRoot
        )
        assert.ok(loaded, 'Vite config must load')
        const plugin = loaded.config.plugins.find((candidate) => candidate.name === 'application-html')
        assert.ok(plugin, 'HTML entry plugin must exist')
        const transformed = plugin.transformIndexHtml.handler(`<script src="${placeholder}"></script>`)
        const expected =
          command === 'serve'
            ? `/@fs/${entry.split(path.sep).join('/').replace(/^\/+/, '')}`
            : path.relative(htmlRoot, entry).split(path.sep).join('/')
        assert.ok(transformed.includes(`src="${expected}"`), `${project} ${command} must use ${expected}`)
      }
    }
  } finally {
    if (previousProject === undefined) delete process.env.PROJECT
    else process.env.PROJECT = previousProject
  }
})
