import { useState, type Key } from 'react'

export function useCustomerSelection(scope: string) {
  const [selection, setSelection] = useState<{ scope: string; keys: Key[] }>({ scope, keys: [] })
  // Adjust the stored scope, rather than masking keys that could reappear after Back/reset.
  if (selection.scope !== scope) setSelection({ scope, keys: [] })
  return {
    selectedRowKeys: selection.scope === scope ? selection.keys : [],
    onChange: (keys: Key[]) => setSelection({ scope, keys }),
  }
}
