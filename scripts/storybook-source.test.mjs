import assert from 'node:assert/strict'
import test from 'node:test'
import { sourceSnippet } from '../.storybook/sourceSnippet.mjs'

test('Storybook gets a copyable JSX example when its builder returns blank source', () => {
  const snippet = sourceSnippet('', {
    title: 'Components/Stateless/PieNestCharts',
    args: { height: '320px', eOptions: { options: { series: [{ type: 'pie' }] } }, onClick: () => {} },
  })
  assert.match(snippet, /^<PieNestCharts\n/)
  assert.match(snippet, /height="320px"/)
  assert.match(snippet, /eOptions=\{\{/)
  assert.doesNotMatch(snippet, /onClick/)
  assert.equal(sourceSnippet('<Custom />', { title: 'Any', args: {} }), '<Custom />')
})
