const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const LOGGER_IMPORT_TARGET = path.join(ROOT, 'utils', 'logger') // src/utils/logger
const exts = new Set(['.js', '.jsx', '.ts', '.tsx'])

const MODE = process.argv.includes('--remove') ? 'remove' : 'logger' // logger|remove

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue
      walk(p)
    } else if (exts.has(path.extname(ent.name)) && !ent.name.endsWith('.d.ts')) {
      transformFile(p)
    }
  }
}

function hasLoggerImport(code) {
  return /from\s+['"](@\/|@src\/|\.{1,2}\/).*utils\/logger['"]/.test(code)
}

function addLoggerImport(file, code) {
  const fileDir = path.dirname(file)
  let rel = path.relative(fileDir, LOGGER_IMPORT_TARGET).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = './' + rel
  const line = `import logger from '${rel}'\n`
  if (/^import[\s\S]*?;?$/m.test(code)) {
    return code.replace(/(^(?:import[\s\S]*?;\s*)+)/m, (m) => m + line)
  }
  return line + code
}

function stripEslintDisables(code) {
  // 移除文件级与行级的 eslint-disable 注释
  code = code.replace(/\/\*\s*eslint-disable[\s\S]*?\*\//g, '')
  code = code.replace(/\/\*\s*eslint-disable-next-line[^\n]*\*\/\s*\n?/g, '')
  code = code.replace(/^\s*\/\/\s*eslint-disable.*$/gm, '')
  code = code.replace(/^\s*\/\/\s*eslint-disable-next-line.*$/gm, '')
  return code
}

function replaceConsole(code) {
  // 仅替换 log/warn，保留 error
  let changed = false
  const next = code
    .replace(/console\.log\s*\(/g, () => {
      changed = true
      return 'logger.log('
    })
    .replace(/console\.warn\s*\(/g, () => {
      changed = true
      return 'logger.warn('
    })
  return { code: next, changed }
}

function removeConsole(code) {
  // 移除整行 console.log / console.warn
  const before = code
  let next = before.replace(/^\s*console\.(log|warn)\s*\(.*?\)\s*;?\s*$/gm, '')
  // 处理多行调用：尽力移除以 ); 结尾的块
  next = next.replace(/console\.(log|warn)\s*\([^;]*?\);\s*/gs, '')
  return { code: next, changed: next !== before }
}

function transformFile(file) {
  if (path.resolve(file) === path.resolve(LOGGER_IMPORT_TARGET + '.ts')) return
  const before = fs.readFileSync(file, 'utf8')
  let code = before

  // 1) 清理 eslint-disable
  code = stripEslintDisables(code)

  // 2) 处理 console.log / console.warn
  let changedConsole = false
  if (MODE === 'logger') {
    const res = replaceConsole(code)
    code = res.code
    changedConsole = res.changed
    if (changedConsole && !hasLoggerImport(code)) {
      code = addLoggerImport(file, code)
    }
  } else {
    const res = removeConsole(code)
    code = res.code
    changedConsole = res.changed
  }

  if (code !== before) {
    fs.writeFileSync(file, code, 'utf8')
    process.stdout.write(`✔ ${path.relative(ROOT, file)}\n`)
  }
}

walk(ROOT)
console.log(`Done. Mode: ${MODE}`)
