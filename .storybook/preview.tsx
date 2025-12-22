import React, { Suspense } from 'react'
import type { Preview } from '@storybook/react-webpack5'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import i18n from '../src/i18n/i18n'

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div style={{ padding: 12 }}>Loading…</div>}>
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        </Suspense>
      </I18nextProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
