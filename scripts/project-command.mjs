import fs from 'node:fs'
import { createBuildPlan, loadProjectRegistry, resolveProject } from '../config/project-registry.mjs'
import { localCli, runNodeCli } from './local-cli.mjs'

const [action, projectName = process.env.PROJECT || 'default', ...options] = process.argv.slice(2)
const registry = loadProjectRegistry()
if (action === 'list' || action === 'doctor') {
  for (const name of Object.keys(registry.projects)) {
    const selected = resolveProject(name, registry)
    if (action === 'doctor') {
      for (const file of [selected.entry, selected.routers, ...(selected.mfeExpose ? [selected.mfeExpose] : [])]) {
        if (!fs.existsSync(file)) throw new Error(`Missing project source: ${file}`)
      }
    }
    console.log(
      `${name}: ${selected.project.sourceRoot} -> ${selected.project.output}${selected.remote ? ' (remote)' : selected.project.mfeHost ? ' (host)' : ''}`
    )
  }
  if (action === 'doctor') {
    console.log(`Node ${process.version}; installed Webpack CLI: ${localCli('webpack-cli', 'webpack-cli')}`)
  }
} else if (['dev', 'build', 'mfe-dev', 'mfe-build', 'mfe-build-standalone'].includes(action)) {
  if (options.some((arg) => !['--dry-run', '--stats'].includes(arg)))
    throw new Error('Only --dry-run/--stats are supported; set PORT/PUBLIC_URL in the environment')
  const plan = createBuildPlan(action, projectName, process.env, registry)
  if (options.includes('--stats')) {
    if (action.endsWith('dev')) throw new Error('--stats requires a build action')
    Object.assign(plan.env, { STATS_ONLY: '1', USE_ANALYZE: '1', SENTRY_SOURCE_MAP: 'no' })
    plan.args.push(`--json=compilation-${plan.selected.name === 'default' ? '' : `${plan.selected.name}-`}stats.json`)
  }
  if (options.includes('--dry-run')) {
    const keys = [
      'PROJECT',
      'NODE_ENV',
      'BUILD_GOAL',
      'MFE_ROLE',
      'PORT',
      'PUBLIC_URL',
      'REACT_APP_USE_MOCK',
      'SENTRY_SOURCE_MAP',
      ...registry.remotes.map(({ envKey }) => envKey),
    ]
    console.log(
      JSON.stringify(
        {
          project: plan.selected.name,
          output: plan.selected.project.output,
          args: plan.args,
          env: Object.fromEntries(keys.filter((key) => plan.env[key] !== undefined).map((key) => [key, plan.env[key]])),
        },
        null,
        2
      )
    )
  } else runNodeCli(localCli('webpack-cli', 'webpack-cli'), plan.args, plan.env)
} else
  throw new Error(
    'Usage: project-command.mjs <list|doctor|dev|build|mfe-dev|mfe-build|mfe-build-standalone> [project] [--dry-run]'
  )
