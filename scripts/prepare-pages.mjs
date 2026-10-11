import fs from 'node:fs'
import path from 'node:path'
import { resolveProject, workspaceRoot } from '../config/project-registry.mjs'

const source = resolveProject(process.env.PROJECT || 'default').output
const storybook = path.join(workspaceRoot, 'storybook-static')
const output = path.join(workspaceRoot, 'dist-combined')
for (const directory of [source, storybook])
  if (!fs.existsSync(path.join(directory, 'index.html'))) throw new Error(`Missing built artifact: ${directory}`)
fs.rmSync(output, { recursive: true, force: true })
fs.cpSync(source, output, { recursive: true })
fs.cpSync(storybook, path.join(output, 'storybook'), { recursive: true })
fs.writeFileSync(
  path.join(output, 'portal.html'),
  '<!doctype html><html lang="zh"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Pro React Admin</title><body><main><h1>Pro React Admin</h1><nav><a href="./index.html">管理应用</a> · <a href="./storybook/index.html">组件文档</a> · <a href="https://github.com/wkylin/pro-react-admin">源码</a></nav></main></body></html>'
)
fs.writeFileSync(path.join(output, '.nojekyll'), '')
console.log('[pages] Assembled existing application and Storybook artifacts in dist-combined')
