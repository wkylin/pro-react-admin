import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { log } from 'node:console'
import { spawnSync } from 'node:child_process'
import { createPagesPlan } from '../config/pages-plan.mjs'
import { renderPortalHtml } from './pages-portal.mjs'
import { workspaceRoot, resolveInside } from '../config/project-registry.mjs'
import { localCli } from './local-cli.mjs'

const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const repository = process.env.GITHUB_REPOSITORY || 'wkylin/pro-react-admin'
const [owner, repo] = repository.split('/')
const plan = createPagesPlan({
  target: process.env.PAGES_TARGET || 'all',
  basePath: process.env.PAGES_BASE_PATH ?? (repo.endsWith('.github.io') ? '/' : `/${repo}/`),
  siteUrl: process.env.PAGES_SITE_URL || `https://${owner}.github.io`,
})
if (process.argv.includes('--dry-run')) {
  log(JSON.stringify(plan, null, 2))
} else {
  const output = path.join(workspaceRoot, 'dist-combined')
  fs.rmSync(output, { recursive: true, force: true })
  fs.mkdirSync(output, { recursive: true })
  const run = (args, env) => {
    const result = spawnSync(process.execPath, args, { cwd: workspaceRoot, stdio: 'inherit', env })
    if (result.error) throw result.error
    if (result.status !== 0) throw new Error(`Pages build failed: ${args[0]} (exit ${result.status})`)
  }
  for (const task of plan.tasks) {
    const env = { ...process.env, NODE_ENV: 'production', CI: 'true', SENTRY_SOURCE_MAP: 'no', ...task.env }
    // Build plans determine federation roles; keep a parent shell's role out of ordinary builds.
    delete env.MFE_ROLE
    if (task.kind === 'app') {
      if (env.BUILD_TOOL === 'vite') env.VITE_OUT_DIR = path.relative(workspaceRoot, task.source)
      run(['scripts/project-command.mjs', task.action, task.name, '--stats'], env)
    } else {
      run(
        [
          localCli('storybook', 'storybook'),
          'build',
          ...(env.BUILD_TOOL === 'vite' ? ['-c', '.storybook/vite'] : []),
          '-o',
          'storybook-static',
          '--disable-telemetry',
        ],
        env
      )
      run(['scripts/add-storybook-base.cjs'], env)
    }
    const source = task.source
    if (!fs.existsSync(path.join(source, 'index.html'))) throw new Error(`Missing Pages artifact: ${source}`)
    const destination = task.destination ? resolveInside(output, task.destination, 'Pages output') : output
    fs.mkdirSync(destination, { recursive: true })
    // Copy immediately: ordinary projects and federation remotes share their registered build directory.
    fs.cpSync(source, destination, { recursive: true })
  }
  const links = [
    ...(plan.tasks.some((task) => task.name === 'default') ? [['默认应用', './#/signin']] : []),
    ...plan.tasks.filter((task) => task.name === 'enterprise').map(() => ['企业演示', './enterprise/#/signin']),
    ...plan.tasks
      .filter((task) => task.kind === 'app' && task.action === 'build' && task.destination.startsWith('projects/'))
      .map((task) => [task.name, `./${task.destination}/`]),
    ...(plan.tasks.some((task) => task.destination === 'mfe') ? [['微前端', './mfe/#/portal']] : []),
    ['Storybook', './storybook/'],
  ]
  const html = renderPortalHtml(version, links, repository)
  fs.writeFileSync(path.join(output, 'portal.html'), html)
  if (!fs.existsSync(path.join(output, 'index.html'))) fs.writeFileSync(path.join(output, 'index.html'), html)
  fs.writeFileSync(path.join(output, '.nojekyll'), '')
  fs.writeFileSync(
    path.join(output, 'deployment.json'),
    JSON.stringify(
      {
        target: plan.target,
        bundler: process.env.BUILD_TOOL || 'webpack',
        base: plan.base,
        origin: plan.origin,
        entries: plan.tasks.map(({ name, action, destination }) => ({ name, action, destination })),
      },
      null,
      2
    )
  )
  log(`[pages] Built ${plan.target} at ${plan.origin}${plan.base} into dist-combined`)
}
