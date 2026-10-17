import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compareTranslations, flattenTranslation } from './validate-i18n.mjs'

test('locale resources flatten nested keys and compare interpolation variables', () => {
  const result = compareTranslations('en', { page: { title: 'Hello {{name}}', count: '{{total}} items' } }, 'zh', {
    page: { title: '你好 {{name}}', count: '{{amount}} 项' },
  })

  assert.deepEqual([...flattenTranslation({ page: { title: 'Hello' } })], [['page.title', 'Hello']])
  assert.deepEqual(result.missingKeys, [])
  assert.deepEqual(result.extraKeys, [])
  assert.deepEqual(result.nonStringValues, [])
  assert.deepEqual(result.placeholderMismatches, ['page.count'])
})

test('locale validation reports missing, extra, and non-string entries', () => {
  const result = compareTranslations('en', { page: { title: 'Title', save: 'Save' } }, 'zh', {
    page: { title: '标题', unexpected: 4 },
  })

  assert.deepEqual(result.missingKeys, ['page.save'])
  assert.deepEqual(result.extraKeys, ['page.unexpected'])
  assert.deepEqual(result.nonStringValues, ['zh.page.unexpected'])
  assert.deepEqual(result.placeholderMismatches, [])
})
