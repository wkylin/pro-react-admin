import { act, render, screen } from '@testing-library/react'
import { App, ConfigProvider } from 'antd'
import { message } from '@platform/feedback/message'
import { createAdminTheme } from './createTheme'
import ThemeFeedback from './ThemeFeedback'

it('keeps the active themed feedback scope when an older app unmounts', async () => {
  const scope = (mode: 'light' | 'dark') => (
    <ConfigProvider
      prefixCls="wui-ant"
      theme={createAdminTheme({ colorPrimary: '#1677ff', compactAlgorithm: false }, mode)}
    >
      <App>
        <ThemeFeedback />
      </App>
    </ConfigProvider>
  )
  const first = render(scope('light'))
  const current = render(scope('dark'))
  first.unmount()

  act(() => {
    void message.success('Saved in the current theme')
  })
  expect(await screen.findByText('Saved in the current theme')).toBeVisible()
  current.unmount()
})
