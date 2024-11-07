import react from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})
// npx @eslint/migrate-config .eslintrc.json
export default [
  {
    ignores: ['node_modules/**/*', '**/CHANGELOG.md', '**/package-lock.json', 'dist/**/*', 'build/**/*', '**/coverage'],
  },
  ...compat.extends('plugin:react/recommended', 'prettier'),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      semi: 'off',
      'no-use-before-define': 'off',
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'multiline-ternary': 'off',
      'promise/param-names': 'off',
      'no-debugger': 'off',
      'no-extra-parens': 'off',
      'eol-last': 'off',
      'jsx-quotes': 'off',
      'space-before-blocks': 'off',
      'max-len': 'off',
      strict: 'off',
      'no-promise-executor-return': 'off',
      'no-bitwise': 'off',
      'no-return-assign': 'off',
      'consistent-return': 'off',
      'global-require': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
      'import/extensions': 'off',
      'no-nested-ternary': 'off',
      'array-callback-return': 'off',
      'no-shadow': 'off',
      'no-inner-declarations': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-plusplus': 'off',
    },
  },
]
