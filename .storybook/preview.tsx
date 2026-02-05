// .storybook/preview.tsx
import React, { Suspense } from 'react'
import type { Preview } from '@storybook/react' // 注意：Vite 版本用 @storybook/react
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import i18n from '../src/i18n/i18n'

// 导入全局样式
import '../src/styles/reset.css'
import '../src/styles/animate.css'

// 覆盖全局样式以修复 Storybook 中的滚动问题
import './preview.css'

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
    // 推荐：加一些常用参数，提升体验
    options: {
      storySort: {
        order: ['Introduction', 'Components'], // 自定义故事排序
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
