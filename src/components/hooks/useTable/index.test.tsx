import { renderHook, waitFor } from '@testing-library/react'
import useTable from './index'

test('table reloads for a changed payload without repeating the request for an equivalent object', async () => {
  const dataInterface = jest.fn().mockResolvedValue({ status: 1, data: { list: [], total: 0 } })
  const { rerender, result } = renderHook(({ filter }) => useTable({ dataInterface, payload: { filter } }), {
    initialProps: { filter: 'first' },
  })

  await waitFor(() => expect(dataInterface).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(result.current.tableConfig.loading).toBe(false))

  rerender({ filter: 'first' })
  expect(dataInterface).toHaveBeenCalledTimes(1)

  rerender({ filter: 'second' })
  await waitFor(() => expect(dataInterface).toHaveBeenCalledTimes(2))
  expect(dataInterface).toHaveBeenLastCalledWith({ pageNum: 1, pageSize: 10, filter: 'second' })
})
