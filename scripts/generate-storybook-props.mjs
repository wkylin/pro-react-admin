import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import { describeProp } from '../.storybook/prop-meanings.mjs'

const outputFile = '.storybook/component-props.generated.json'
const roots = ['packages/wui-react/src', 'src/components/stateless', 'src/components/stateful', 'src/shared/ui']
const sourceRoots = ['packages/wui-react/src/', 'src/']

function storiesUnder(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return storiesUnder(file)
    return /\.stories\.tsx$/.test(entry.name) ? [file] : []
  })
}

const stories = roots.flatMap(storiesUnder).sort()
const config = ts.readConfigFile('tsconfig.storybook.json', ts.sys.readFile)
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, '.')
const program = ts.createProgram(stories, parsed.options)
const checker = program.getTypeChecker()
const optionTypes = { Watermark: 'WatermarkOptions' }
const inheritedProps = {
  AnimateRipple: ['children', 'onClick', 'disabled', 'className'],
  GradientTracking: ['children', 'onClick', 'disabled', 'className'],
  ShiftingCard: ['children', 'className', 'style'],
  SlideLinear: ['children', 'className', 'style'],
  SandpackBasic: ['template', 'files', 'options'],
  AlignCenter: ['children', 'className', 'style'],
  LinearWrap: ['children', 'className', 'style'],
  SafeLink: ['to', 'children', 'onClick', 'target', 'replace', 'rel', 'aria-label', 'className'],
  FlipLink: ['href', 'target', 'rel', 'aria-label', 'className', 'style', 'onClick'],
  ThreeDCard: ['title', 'children', 'className', 'style', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
  LazyLoadImage: ['src', 'alt', 'width', 'height', 'className', 'loading', 'onLoad', 'onError'],
  Exception: ['status', 'title', 'subTitle', 'icon'],
  ReactSignature: ['options', 'readonly', 'className', 'aria-label'],
}
const readableTypes = {
  LazyLoadImage: { src: "React.ImgHTMLAttributes<HTMLImageElement>['src']" },
}

function sourceDeclaration(symbol) {
  return symbol.declarations?.find((declaration) => {
    const file = path.relative(process.cwd(), declaration.getSourceFile().fileName).split(path.sep).join('/')
    return sourceRoots.some((root) => file.startsWith(root)) && !file.includes('.stories.')
  })
}

function catalogProps(type, location, includeInherited = false) {
  return type
    .getProperties()
    .map((symbol) => {
      const declaration = sourceDeclaration(symbol) ?? (includeInherited ? symbol.declarations?.[0] : null)
      if (!declaration && !includeInherited) return null
      const documentation = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()
      return {
        name: symbol.getName(),
        type: declaration?.type?.getText() ?? checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, location)),
        required: !(symbol.flags & ts.SymbolFlags.Optional),
        ...(documentation ? { sourceDescription: documentation } : {}),
      }
    })
    .filter(Boolean)
}

function declaredProps(name, directory) {
  const typeName = optionTypes[name] ?? `${name}Props`
  for (const entry of fs.readdirSync(directory)) {
    if (!/\.[jt]sx?$/.test(entry) || entry.includes('.stories.') || entry.includes('.test.')) continue
    const file = program.getSourceFile(path.resolve(directory, entry))
    if (!file) continue
    for (const statement of file.statements) {
      if ((ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) && statement.name.text === typeName) {
        const symbol = checker.getSymbolAtLocation(statement.name)
        if (symbol) return catalogProps(checker.getDeclaredTypeOfSymbol(symbol), statement)
      }
    }
  }
  return []
}

function parameterDefaults(signature) {
  const name = signature?.getDeclaration()?.parameters?.[0]?.name
  if (!name || !ts.isObjectBindingPattern(name)) return new Map()
  return new Map(name.elements.flatMap((element) => {
    if (!ts.isIdentifier(element.name) || !element.initializer) return []
    const expression = element.initializer.getText()
    // Keep this column strictly source-backed. Complex expressions belong in examples.
    return expression.length <= 50 && !/[\n=>]/.test(expression) ? [[element.name.text, expression]] : []
  }))
}

const catalog = {}
for (const storyFile of stories) {
  const name = path.basename(storyFile, '.stories.tsx')
  const file = program.getSourceFile(path.resolve(storyFile)) ?? program.getSourceFile(storyFile)
  if (!file) throw new Error(`Cannot resolve Storybook source: ${storyFile}`)
  let component
  function visit(node) {
    if (!component && ts.isPropertyAssignment(node) && node.name.getText(file) === 'component') component = node.initializer
    ts.forEachChild(node, visit)
  }
  visit(file)
  if (!component) throw new Error(`Story has no component: ${storyFile}`)
  const signature = checker.getTypeAtLocation(component).getCallSignatures()[0]
  const defaults = parameterDefaults(signature)
  const parameter = signature?.getParameters()[0]
  const propsType = parameter ? checker.getTypeOfSymbolAtLocation(parameter, component) : null
  let props = propsType ? catalogProps(propsType, component) : []
  if (!props.length) props = declaredProps(name, path.dirname(storyFile))
  if (inheritedProps[name] && propsType) {
    const allowed = new Set(inheritedProps[name])
    const inherited = catalogProps(propsType, component, true).filter((prop) => allowed.has(prop.name))
    const included = new Set(props.map((prop) => prop.name))
    props.push(...inherited.filter((prop) => !included.has(prop.name)))
  }
  if (catalog[name]) throw new Error(`Duplicate component name: ${name}`)
  catalog[name] = props.map((prop) => ({
    ...prop,
    ...(readableTypes[name]?.[prop.name] ? { type: readableTypes[name][prop.name] } : {}),
    description: describeProp(name, prop),
    ...(defaults.has(prop.name) ? { defaultValue: defaults.get(prop.name) } : {}),
  }))
}

const serialized = `${JSON.stringify(catalog, null, 2)}\n`
if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputFile) || fs.readFileSync(outputFile, 'utf8') !== serialized)
    throw new Error(`${outputFile} is stale. Run node scripts/generate-storybook-props.mjs`)
  process.stdout.write(`[storybook props] ${stories.length} components match source types\n`)
} else {
  fs.writeFileSync(outputFile, serialized)
  process.stdout.write(`[storybook props] wrote ${stories.length} components to ${outputFile}\n`)
}
