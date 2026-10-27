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

function enterpriseStarterFiles(name, id) {
  return {
    'index.tsx': `import { renderApp } from '@app/bootstrap/renderApp'\nimport Application from '@app/bootstrap/Application'\nrenderApp({ projectId: ${id}, identifierPrefix: ${id}, children: <Application name=${id} watermark={false} /> })\n`,
    'pages/Home.tsx': `// Replace this reference workspace with your team's first business module.\nexport { default } from '@features/administration/pages/HomePage'\n`,
    'modules.ts': `import { createModuleRegistry } from '@platform/modules'\nimport { administrationModule } from '@features/administration/module'\nexport const administrationModules = createModuleRegistry([administrationModule], { hostVersion: __APP_VERSION__ })\n`,
    'routers/index.tsx': `import { lazy } from 'react'\nimport Layout from '@layouts'\nimport { ProtectedRoute } from '@platform/auth/components/ProtectedRoute'\nimport { normalizeRouteTree, annotateRoutesWithPermissions, type RouteNode } from '@platform/navigation/routes'\nimport { ApplicationModules } from '@platform/modules'\nimport { errorRoutes } from '@app/routing/modules/error.routes'\nimport SignIn from '@pages/signin'\nimport { administrationModules } from '../modules'\nconst Home = lazy(() => import('../pages/Home'))\nconst Terms = lazy(() => import('@pages/terms'))\nconst Privacy = lazy(() => import('@pages/privacy'))\nconst raw: RouteNode[] = [\n  { path: '/', name: '工作台', auth: true, element: <ApplicationModules registry={administrationModules}><ProtectedRoute><Layout /></ProtectedRoute></ApplicationModules>, children: [\n    { index: true, name: '工作台', element: <Home /> },\n    ...administrationModules.routes,\n  ] },\n  { path: 'signin', name: 'Sign in', auth: false, element: <SignIn /> },\n  { path: 'terms', name: 'Terms', auth: false, element: <Terms /> },\n  { path: 'privacy', name: 'Privacy', auth: false, element: <Privacy /> },\n  ...errorRoutes.map((route) => ({ ...route, auth: false })),\n]\nexport const annotatedRootRouter = annotateRoutesWithPermissions(normalizeRouteTree(raw))\nexport { flattenRouteNodes as flattenRoutes } from '@platform/navigation/routes'\nexport default annotatedRootRouter\n`,
    'routers/authRouter.tsx': `export { default } from '@app/routing/shared/AuthRouterBase'\n`,
    'README.md': `# ${name}\n\n此项目使用 Enterprise 安全预设：受保护路由、租户登录、服务端授权、组织管理参考模块和真实 API。\n\n\`\`\`bash\nPROJECT=${name} pnpm start\npnpm run project:build ${name}\nPROJECT=${name} pnpm run preview:vite\n\`\`\`\n\n开发启动会创建隔离的本地 SQLite 演示租户；终端会显示本地账号和实际端口。构建产物默认连接同源 Enterprise API，预览时仍需启动 API。\n\n从 \`modules.ts\` 注册业务模块，在该模块的路由中登记页面，并在 \`config/route-policy.json\` 中定义标题、菜单和访问权限；已注册模块的权限会出现在角色编辑与权限矩阵中。业务数据通过模块自己的类型化 Provider 接入，参考 \`src/features/administration/\`。共享浏览器演示需显式设置 \`REACT_APP_USE_MOCK=true\`，正式部署应配置独立 API 与持久化数据库。\n`,
  }
}

export function createProjectDraft(
  name,
  { remote = false, port, preset = 'blank' } = {},
  registry = loadProjectRegistry()
) {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name) || registry.projects[name])
    throw new Error('Use a new project name with letters, digits, and underscores')
  if (!['blank', 'enterprise'].includes(preset)) throw new Error(`Unknown project preset: ${preset}`)
  if (preset === 'enterprise' && remote) throw new Error('Enterprise preset cannot be a federation remote')
  if (!remote && port !== undefined) throw new Error('--port requires --remote')
  const next = structuredClone(registry)
  next.projects[name] = {
    sourceRoot: `projects/${name}`,
    entry: 'index.tsx',
    routers: 'routers',
    output: `dist-${name}`,
    ...(preset === 'enterprise' ? { authentication: 'enterprise', defaultBuildTool: 'vite' } : {}),
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
  const files =
    preset === 'enterprise'
      ? enterpriseStarterFiles(name, id)
      : {
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
  const usage = 'Usage: create-project.mjs <name> [--preset enterprise] [--remote --port 8083] [--dry-run]'
  if (!name) throw new Error(usage)
  let remote = false
  let dryRun = false
  let port
  let preset = 'blank'
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]
    if (arg === '--remote') remote = true
    else if (arg === '--dry-run') dryRun = true
    else if (arg === '--port' || arg === '--preset') {
      const value = args[++index]
      if (!value || value.startsWith('--')) throw new Error(usage)
      if (arg === '--port') port = Number(value)
      else preset = value
    } else throw new Error(usage)
  }
  const draft = createProjectDraft(name, { remote, port, preset })
  const directory = path.join(workspaceRoot, 'src/projects', name)
  if (fs.existsSync(directory)) throw new Error(`Refusing to overwrite ${directory}`)
  if (dryRun)
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
    console.log(
      preset === 'enterprise'
        ? `Created ${name}. Run: PROJECT=${name} pnpm start`
        : `Created ${name}. Run: pnpm run project:dev ${name}`
    )
  }
}
