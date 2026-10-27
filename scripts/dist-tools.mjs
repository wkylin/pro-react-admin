import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createBuildPlan, loadProjectRegistry, workspaceRoot } from '../config/project-registry.mjs'
import { localCli, runNodeCli } from './local-cli.mjs'

export function resolveDistTarget(projectName = 'default', env = process.env, registry = loadProjectRegistry()) {
  const plan = createBuildPlan('build', projectName, env, registry)
  return { selected: plan.selected, bundler: plan.bundler, output: path.resolve(workspaceRoot, plan.output) }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [action, ...args] = process.argv.slice(2)
  const { selected, bundler, output } = resolveDistTarget(process.env.PROJECT || 'default')
  if (action === 'clean') {
    await fs.promises.rm(output, { recursive: true, force: true })
    console.log(`[dist-tools] removed ${output}`)
  } else if (action === 'serve' || action === 'http') {
    if (!fs.existsSync(path.join(output, 'index.html')))
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
}
