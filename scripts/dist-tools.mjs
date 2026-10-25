import fs from 'node:fs'
import { resolveBuildOutput, resolveProject } from '../config/project-registry.mjs'
import { localCli, runNodeCli } from './local-cli.mjs'

const [action, ...args] = process.argv.slice(2)
const selected = resolveProject(process.env.PROJECT || 'default')
const bundler = process.env.BUILD_TOOL || 'webpack'
if (!['webpack', 'vite'].includes(bundler)) throw new Error(`Unknown build tool: ${bundler}`)
const output = resolveBuildOutput(selected, process.env.VITE_OUT_DIR, bundler)
if (action === 'clean') {
  await fs.promises.rm(output, { recursive: true, force: true })
  console.log(`[dist-tools] removed ${output}`)
} else if (action === 'serve' || action === 'http') {
  if (!fs.existsSync(output + '/index.html'))
    throw new Error(`Build ${selected.name} with ${bundler} before previewing ${output}`)
  if (action === 'serve') {
    const portIndex = args.indexOf('--port')
    const port = portIndex >= 0 ? args[portIndex + 1] : '5000'
    if (!/^\d+$/.test(port ?? '') || Number(port) < 1 || Number(port) > 65535) throw new Error('Invalid preview port')
    runNodeCli(localCli('serve'), ['-s', output, '-l', port])
  } else runNodeCli(localCli('http-server'), [output, ...args.slice(args.indexOf('--') + 1)])
} else
  console.log(
    'Usage: dist-tools.mjs <clean|serve --port 5000|http -- [options]>; PROJECT selects the registered output'
  )
