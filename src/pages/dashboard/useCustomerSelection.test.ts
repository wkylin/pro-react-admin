import { act, renderHook } from '@testing-library/react'
import { useCustomerSelection } from './useCustomerSelection'

it('clears selections on scope change and does not revive them when returning', () => {
  const { result, rerender } = renderHook(({ scope }) => useCustomerSelection(scope), {
    initialProps: { scope: 'all' },
  })
  act(() => result.current.onChange(['customer-001']))
  expect(result.current.selectedRowKeys).toEqual(['customer-001'])
  rerender({ scope: 'active' })
  expect(result.current.selectedRowKeys).toEqual([])
  rerender({ scope: 'all' })
  expect(result.current.selectedRowKeys).toEqual([])
})

it('keeps selections across pages in the same filter scope and supports clearing', () => {
  const { result, rerender } = renderHook(({ scope }) => useCustomerSelection(scope), {
    initialProps: { scope: 'active' },
  })
  act(() => result.current.onChange(['customer-001', 'customer-009']))
  rerender({ scope: 'active' })
  expect(result.current.selectedRowKeys).toEqual(['customer-001', 'customer-009'])
  act(() => result.current.onChange([]))
  expect(result.current.selectedRowKeys).toEqual([])
})
