// eslint.config.js
// 2025 年最佳实践：Flat Config
// 适合 React 19 + TypeScript 5 + Vite + Storybook 的组件库项目

import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import unicorn from 'eslint-plugin-unicorn'
import storybook from 'eslint-plugin-storybook'
import prettierConfig from 'eslint-config-prettier/flat' // <--- 关键：使用 /flat 入口
import globals from 'globals'

export default [
  // 忽略文件/目录
  {
    ignores: [
      'node_modules/',
      'dist/',
      'dist-lib/',
      'build/',
      'coverage/',
      '**/*.d.ts',
      'CHANGELOG.md',
      'package-lock.json',
    ],
  },

  // 基础推荐规则
  js.configs.recommended,
  ...storybook.configs['flat/recommended'],
  // 注意：不要直接 include 插件的 `configs.*`，它们可能使用 legacy "extends"。
  // 在 flat config 中我们直接注册插件并选择必要的规则。

  // 主项目配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      import: importPlugin,
      unicorn: unicorn,
      react: react,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly',
      },
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // React Hooks 严格检查
      ...reactHooks.configs.recommended.rules,

      // 现代 React 实践
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Unicorn 宽松处理
      'unicorn/prevent-abbreviations': 'off',

      // 支持路径别名
      'import/no-unresolved': 'off',

      // 未使用变量仅警告
      // disable base rule in favor of the TS version
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // avoid hard failure on empty blocks
      'no-empty': 'warn',
    },
  },

  // Jest globals for test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // Prettier 放在最后（Flat 兼容入口）
  prettierConfig,
]
