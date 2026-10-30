// .storybook/preview.tsx
import { Suspense, useContext } from 'react'
import type { Preview } from '@storybook/react'
import {
  Controls,
  Description,
  DocsContext,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { App, ConfigProvider } from 'antd'
import { ProThemeProvider } from '../src/theme/hooks'
import 'antd/dist/reset.css'
import '../src/styles/reset.css'
import './preview.css'

import i18n from '../src/i18n/i18n'
import { AppStoreProvider } from '../src/app/model'
import componentDocs from './component-docs.json'
import componentCautions from './component-cautions.json'
import { PropReference } from './PropReference'
import { sourceSnippet } from './sourceSnippet.mjs'

const AutoDocsPage = () => {
  const { csfFile, preparedMeta } = useOf<'meta'>('meta', ['meta'])
  const name = preparedMeta.title.split('/').at(-1) as keyof typeof componentDocs
  const guide = componentDocs[name]
  const hasMoreStories = Object.keys(csfFile.stories).length > 1
  const primaryStory = useContext(DocsContext).componentStories()[0]

  return (
    <div className="wui-doc-auto">
      <header className="wui-doc-auto-hero">
        <span className="wui-doc-eyebrow">COMPONENT REFERENCE</span>
        <Title />
        <Subtitle />
        <Description />
      </header>

      <div className="wui-doc-grid" aria-label="组件使用指南">
        <div className="wui-doc-card">
          <strong>适用场景</strong>
          <p>{guide.purpose}</p>
        </div>
        <div className="wui-doc-card">
          <strong>在示例中试试</strong>
          <p>{guide.preview}</p>
        </div>
        <div className="wui-doc-card wui-doc-card-caution">
          <strong>使用注意</strong>
          <p>{componentCautions[name]}</p>
        </div>
      </div>

      <section aria-label="交互预览">
        <div className="wui-doc-section-heading">
          <span className="wui-doc-section-index">01</span>
          <div>
            <h2>交互预览</h2>
            <p>先查看当前 Story，再结合下方 Props 说明理解组件行为。</p>
          </div>
        </div>
        <Primary />
        {primaryStory && (
          <details className="wui-doc-source-details">
            <summary>查看当前示例源码</summary>
            <Source of={primaryStory.moduleExport} />
          </details>
        )}
      </section>

      <section aria-label="Props 说明">
        <div className="wui-doc-section-heading">
          <span className="wui-doc-section-index">02</span>
          <div>
            <h2>Props 说明</h2>
            <p>逐项查看属性的含义、类型与必填要求。</p>
          </div>
        </div>
        <PropReference name={name} />
      </section>

      <section aria-label="示例参数">
        <div className="wui-doc-section-heading">
          <span className="wui-doc-section-index">03</span>
          <div>
            <h2>示例参数</h2>
            <p>查看当前 Story 开放的参数；可编辑时调整并观察变化。</p>
          </div>
        </div>
        <Controls />
      </section>

      {hasMoreStories && (
        <section aria-label="更多示例" className="wui-doc-auto-stories">
          <Stories includePrimary={false} />
        </section>
      )}
    </div>
  )
}

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
      page: AutoDocsPage,
      canvas: {
        sourceState: 'shown', // 默认显示代码
      },
      source: {
        transform: sourceSnippet,
      },
    },
  },
}

export default preview
