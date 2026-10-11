// .storybook/preview.tsx
import { Suspense } from 'react'
import type { Preview } from '@storybook/react-webpack5'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { App, ConfigProvider } from 'antd'
import { ProThemeProvider } from '../src/theme/hooks'
import 'antd/dist/reset.css'
import '../src/styles/reset.css'
import './preview.css'

import i18n from '../src/i18n/i18n'
import { AppStoreProvider } from '../src/app/model'

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppStoreProvider projectId="storybook">
        <I18nextProvider i18n={i18n}>
          <ProThemeProvider>
            <ConfigProvider>
              <App>
                <Suspense fallback={<div style={{ padding: 12 }}>Loading…</div>}>
                  <MemoryRouter initialEntries={['/']}>
                    <Story />
                  </MemoryRouter>
                </Suspense>
              </App>
            </ConfigProvider>
          </ProThemeProvider>
        </I18nextProvider>
      </AppStoreProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 推荐：加一些常用参数，提升体验
    options: {
      storySort: {
        order: ['Project', 'WUI', 'Shared', 'Components'],
      },
    },
    // 如果用 addon-docs，推荐加
    docs: {
      canvas: {
        sourceState: 'shown', // 默认显示代码
      },
    },
  },
}

export default preview
