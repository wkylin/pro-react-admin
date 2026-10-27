import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'typescript'

const root = resolve(import.meta.dirname, '../../..')
const tsconfigPath = resolve(root, 'apps/enterprise-api/tsconfig.json')
const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile)
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'))
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, resolve(root, 'apps/enterprise-api'))
const program = ts.createProgram(config.fileNames, { ...config.options, noEmit: true })
const diagnostics = [...config.errors, ...ts.getPreEmitDiagnostics(program)]
if (diagnostics.length) {
  process.stderr.write(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (file) => file,
    getCurrentDirectory: () => root,
    getNewLine: () => '\n',
  }))
  process.exit(1)
}
const sources = [
  'api/enterprise/postgres-runtime.mts',
  'api/enterprise/postgres-store.mts',
  'api/enterprise/postgres-schema.mts',
  'api/enterprise/postgres-service.mts',
  'api/enterprise/domain.mts',
  'api/enterprise/totp.mts',
  'src/platform/auth/model/accessDecision.ts',
]

for (const source of sources) {
  const input = resolve(root, source)
  const output = input.replace(/\.mts$/, '.mjs').replace(/\.ts$/, '.js')
  const result = ts.transpileModule(readFileSync(input, 'utf8'), {
    fileName: input,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2023,
      module: source.endsWith('.mts') ? ts.ModuleKind.NodeNext : ts.ModuleKind.ESNext,
      rewriteRelativeImportExtensions: true,
    },
  })
  const errors = result.diagnostics?.filter((item) => item.category === ts.DiagnosticCategory.Error) ?? []
  if (errors.length) throw new Error(`Cannot build ${source}: ${errors.map((item) => item.messageText).join('; ')}`)
  writeFileSync(output, result.outputText)
}
