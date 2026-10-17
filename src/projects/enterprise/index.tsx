import { renderApp } from '@app/bootstrap/renderApp'
import Application from '@app/bootstrap/Application'

renderApp({
  projectId: 'enterprise',
  identifierPrefix: 'enterprise',
  children: <Application name="Pro React Admin" watermark={false} />,
})
