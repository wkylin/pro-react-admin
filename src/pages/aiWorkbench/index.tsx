import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import TavilyPlayground from './playground/TavilyPlayground'
import ChatToolsWorkspace from './workspace/ChatToolsWorkspace'
import styles from './index.module.less'

export default function AiWorkbench() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const view = params.get('view') === 'workspace' ? 'workspace' : 'playground'
  const changeView = (nextView: string) =>
    setParams((current) => {
      const next = new URLSearchParams(current)
      if (nextView === 'workspace') next.set('view', 'workspace')
      else next.delete('view')
      return next
    })
  return (
    <Tabs
      className={styles.workspaceTabs}
      activeKey={view}
      animated={false}
      onChange={changeView}
      items={[
        { key: 'playground', label: t('aiWorkbench.playgroundView'), children: <TavilyPlayground /> },
        {
          key: 'workspace',
          label: t('aiWorkbench.toolsView'),
          children: <ChatToolsWorkspace onOpenSearch={() => changeView('playground')} />,
        },
      ]}
    />
  )
}
