import React from 'react'

type Row = { name: string; type: string; default?: string; description?: string }

export type ArgsTableFallbackProps = {
  rows?: Row[]
  of?: any
}

export const ArgsTableFallback: React.FC<ArgsTableFallbackProps> = ({ rows = [] }) => {
  // If rows not provided, show helpful message
  if (!rows || rows.length === 0) {
    return (
      <div style={{ padding: '12px 16px', border: '1px solid #eee', borderRadius: 6 }}>
        <strong>ArgsTable</strong>
        <div style={{ marginTop: 8 }}>
          Automatic prop table generation is not available in this environment. You can pass an explicit
          <code style={{ marginLeft: 6, padding: '2px 6px', background: '#f5f5f5', borderRadius: 4 }}>rows</code>
          prop to <code>ArgsTable</code>, or keep a manual table in MDX for full control.
        </div>
      </div>
    )
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e6e6e6' }}>Name</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e6e6e6' }}>Type</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e6e6e6' }}>Default</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e6e6e6' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f1f1' }}>
              <code>{r.name}</code>
            </td>
            <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f1f1' }}>{r.type}</td>
            <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f1f1' }}>{r.default ?? '—'}</td>
            <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f1f1' }}>{r.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ArgsTableFallback
