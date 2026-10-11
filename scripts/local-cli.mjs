import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { workspaceRoot } from '../config/project-registry.mjs'

export function localCli(packageName, binName = packageName) {
  const directory = path.join(workspaceRoot, 'node_modules', packageName)
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'))
  const bin = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.[binName]
  if (!bin) throw new Error(`Missing installed CLI ${packageName}/${binName}; install workspace dependencies first`)
  return path.join(directory, bin)
}
export function runNodeCli(file, args = [], env = process.env) {
  const child = spawn(process.execPath, [file, ...args], { cwd: workspaceRoot, env, stdio: 'inherit' })
  const signals = ['SIGINT', 'SIGTERM']
  const handlers = new Map(signals.map((signal) => [signal, () => child.kill(signal)]))
  for (const [signal, handler] of handlers) process.on(signal, handler)
  child.on('error', (error) => {
    console.error(error.message)
    process.exitCode = 1
  })
  child.on('exit', (code, signal) => {
    for (const [name, handler] of handlers) process.off(name, handler)
    process.exitCode = code ?? (signal === 'SIGINT' ? 130 : 143)
  })
  return child
}
