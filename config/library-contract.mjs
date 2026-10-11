export const libraryPackageName = '@w.ui/wui-react'

export const libraryEngines = Object.freeze({
  node: '^22.22.2 || ^24.15.0 || >=26.0.0',
})

export const libraryComponents = Object.freeze([
  {
    name: 'AnimatedIcon',
    subpath: 'animated-icon',
    source: 'AnimatedIcon/index.ts',
    types: 'AnimatedIcon/index.d.ts',
    typeExports: ['AnimatedIconProps', 'AnimatedIconVariant', 'AnimatedIconMode'],
  },
  {
    name: 'IconFrame',
    subpath: 'icon-frame',
    source: 'IconFrame/index.tsx',
    types: 'IconFrame/index.d.ts',
    typeExports: ['IconFrameProps'],
  },
  {
    name: 'MoveChecker',
    subpath: 'move-checker',
    source: 'MoveChecker/index.tsx',
    types: 'MoveChecker/index.d.ts',
    typeExports: ['MoveCheckerColor', 'MoveCheckerColorObject', 'MoveCheckerHandle', 'MoveCheckerProps'],
  },
  {
    name: 'OneTimePasscode',
    subpath: 'one-time-passcode',
    source: 'OneTimePasscode/index.ts',
    types: 'OneTimePasscode/index.d.ts',
    typeExports: ['OneTimePasscodeProps'],
  },
  {
    name: 'OverflowText',
    subpath: 'overflow-text',
    source: 'OverflowText/index.tsx',
    types: 'OverflowText/index.d.ts',
    typeExports: ['OverflowTextProps', 'OverflowTextTooltipProps'],
  },
  {
    name: 'PortalTooltip',
    subpath: 'portal-tooltip',
    source: 'PortalTooltip/index.tsx',
    types: 'PortalTooltip/index.d.ts',
    typeExports: ['PortalTooltipPlacement', 'PortalTooltipProps'],
  },
  {
    name: 'ResponsiveTable',
    subpath: 'responsive-table',
    source: 'ResponsiveTable/index.ts',
    types: 'ResponsiveTable/index.d.ts',
    runtimeExports: ['useTable'],
    typeExports: [
      'ActionConfig',
      'ResponsiveTableProps',
      'RequestClient',
      'RequestParamMap',
      'ResponseFieldMap',
      'TablePagination',
      'UseTableOptions',
      'UseTableReturn',
    ],
  },
  {
    name: 'SafeHtml',
    subpath: 'safe-html',
    source: 'SafeHtml/index.tsx',
    types: 'SafeHtml/index.d.ts',
    typeExports: ['SafeHtmlProps'],
  },
  {
    name: 'ScrollLayout',
    subpath: 'scroll-layout',
    source: 'ScrollLayout/index.tsx',
    types: 'ScrollLayout/index.d.ts',
    typeExports: ['ScrollLayoutProps'],
  },
  {
    name: 'ScrollableSections',
    subpath: 'scrollable-sections',
    source: 'ScrollableSections/index.tsx',
    types: 'ScrollableSections/index.d.ts',
    typeExports: ['ScrollableSection', 'ScrollableSectionsProps'],
  },
  {
    name: 'SliderCaptcha',
    subpath: 'slider-captcha',
    source: 'SliderCaptcha/index.tsx',
    types: 'SliderCaptcha/index.d.ts',
    typeExports: ['SliderCaptchaDifficulty', 'SliderCaptchaProps'],
  },
  {
    name: 'WatermarkProvider',
    subpath: 'watermark-provider',
    source: 'WatermarkProvider/index.ts',
    types: 'WatermarkProvider/index.d.ts',
    typeExports: ['WatermarkProviderProps'],
  },
])

export const libraryPeerDependencies = Object.freeze({
  antd: '>=6.0.0 <7.0.0',
  'framer-motion': '>=12.0.0 <15.0.0',
  react: '>=19.0.0 <20.0.0',
  'react-dom': '>=19.0.0 <20.0.0',
})

export const libraryRuntimeDependencies = Object.freeze({
  '@ant-design/icons': '^6.3.4',
  clsx: '^2.1.1',
  dompurify: '^3.4.16',
  'isomorphic-dompurify': '^4.5.0',
  'lucide-react': '^1.54.0',
})

export const libraryExternalPackages = Object.freeze([
  ...Object.keys(libraryPeerDependencies),
  ...Object.keys(libraryRuntimeDependencies),
])

const componentExports = Object.fromEntries(
  libraryComponents.map(({ subpath, types }) => [
    `./${subpath}`,
    {
      types: `./dist/types/${types}`,
      import: `./dist/esm/${subpath}.js`,
      require: `./dist/cjs/${subpath}.cjs`,
      default: `./dist/esm/${subpath}.js`,
    },
  ])
)

export const libraryExports = Object.freeze({
  '.': {
    types: './dist/types/index.d.ts',
    import: './dist/esm/index.js',
    require: './dist/cjs/index.cjs',
    default: './dist/esm/index.js',
  },
  ...componentExports,
  './style.css': './dist/style.css',
  './package.json': './package.json',
})

export const libraryEntrypoints = Object.freeze({
  main: './dist/cjs/index.cjs',
  module: './dist/esm/index.js',
  types: './dist/types/index.d.ts',
})

export const libraryPackageBudget = Object.freeze({
  maxFiles: 250,
  maxPackedBytes: 5 * 1024 * 1024,
  maxUnpackedBytes: 15 * 1024 * 1024,
})
