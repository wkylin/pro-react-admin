import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { format } from 'prettier'
import {
  workspaceRoot,
  registryFile,
  loadProjectRegistry,
  validateProjectRegistry,
} from '../config/project-registry.mjs'

export function createProjectDraft(name, { remote = false, port } = {}, registry = loadProjectRegistry()) {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name) || registry.projects[name])
    throw new Error('Use a new project name with letters, digits, and underscores')
  const next = structuredClone(registry)
  next.projects[name] = {
    sourceRoot: `projects/${name}`,
    entry: 'index.tsx',
    routers: 'routers',
    output: `dist-${name}`,
    ...(remote ? { mfeExpose: 'mfe/App.tsx' } : {}),
  }
  if (remote) {
    if (!Number.isInteger(port)) throw new Error('--remote requires --port <number>')
    next.remotes.push({
      name,
      label: name,
      routePath: `/${name}`,
      devPort: port,
      devUrl: `http://localhost:${port}/remoteEntry.js`,
      prodPath: `/${name}/remoteEntry.js`,
      envKey: `MFE_${name.toUpperCase()}_URL`,
    })
  }
  validateProjectRegistry(next)
  const id = JSON.stringify(name)
  const files = {
    'index.tsx': `import { renderApp } from '@app/bootstrap/renderApp'\nimport Application from '@app/bootstrap/Application'\nrenderApp({ projectId: ${id}, identifierPrefix: ${id}, children: <Application name=${id} /> })\n`,
    'pages/Home.tsx': `import { Typography } from 'antd'\nexport default function Home() { return <main style={{ padding: 24 }}><Typography.Title>${name}</Typography.Title></main> }\n`,
    'routers/index.tsx': `import Home from '../pages/Home'\nimport { normalizeRouteTree } from '@platform/navigation/routes'\nexport default normalizeRouteTree([{ path: '/', auth: false, element: <Home /> }])\n`,
    'routers/authRouter.tsx': `import type { PropsWithChildren } from 'react'\nexport default function AuthRouter({ children }: PropsWithChildren) { return <>{children}</> }\n`,
    ...(remote
      ? {
          'mfe/App.tsx': `import { AppStoreProvider } from '@app/model'\nimport { KeepAliveProvider } from '@platform/keep-alive'\nimport Home from '../pages/Home'\nexport default function RemoteApp() { return <AppStoreProvider projectId=${id}><KeepAliveProvider><Home /></KeepAliveProvider></AppStoreProvider> }\n`,
        }
      : {}),
  }
  return { registry: next, files }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [name, ...args] = process.argv.slice(2)
  if (
    !name ||
    args.some((arg, index) => !['--remote', '--dry-run', '--port'].includes(arg) && args[index - 1] !== '--port')
  )
    throw new Error('Usage: create-project.mjs <name> [--remote --port 8083] [--dry-run]')
  const draft = createProjectDraft(name, {
    remote: args.includes('--remote'),
    port: args.includes('--port') ? Number(args[args.indexOf('--port') + 1]) : undefined,
  })
  const directory = path.join(workspaceRoot, 'src/projects', name)
  if (fs.existsSync(directory)) throw new Error(`Refusing to overwrite ${directory}`)
  if (args.includes('--dry-run'))
    console.log(
      JSON.stringify(
        {
          project: draft.registry.projects[name],
          files: Object.keys(draft.files),
          remote: draft.registry.remotes.find((item) => item.name === name),
        },
        null,
        2
      )
    )
  else {
    for (const [relative, source] of Object.entries(draft.files)) {
      const output = path.join(directory, relative)
      fs.mkdirSync(path.dirname(output), { recursive: true })
      fs.writeFileSync(output, await format(source, { filepath: output }), { flag: 'wx' })
    }
    fs.writeFileSync(registryFile, JSON.stringify(draft.registry, null, 2) + '\n')
    for (const script of [
      'sync-project-contracts.mjs',
      'sync-deployment-config.mjs',
      'generate-project-reference.mjs',
    ]) {
      const result = spawnSync(process.execPath, [path.join(workspaceRoot, 'scripts', script)], { stdio: 'inherit' })
      if (result.status !== 0) throw new Error(`${script} failed; fix the generated project before building`)
    }
    console.log(`Created ${name}. Run: pnpm run project:dev ${name}`)
  }
}
