import { Alert, Button, Descriptions, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { CHAT_PLATFORM_API } from '../secureCommunication/chatPlatform'
import type { ChatWorkspace, ChatCredentials } from './useChatWorkspace'
import styles from './index.module.less'

export function chatErrorText(t: (key: string) => string, code: string) {
  const key = `chatRoom.errors.${code}`
  const text = t(key)
  return text === key ? t('chatRoom.errors.unavailable') : text
}

export default function ConnectionDialog({ workspace, onClose }: { workspace: ChatWorkspace; onClose: () => void }) {
  const { t } = useTranslation()
  const [form] = Form.useForm<ChatCredentials>()
  const cancel = () => {
    if (workspace.connecting) void workspace.cancelConnection()
    onClose()
  }
  return (
    <Modal
      open
      title={t('chatRoom.settings')}
      onCancel={cancel}
      destroyOnHidden
      footer={
        workspace.connection && !workspace.connecting ? (
          <Button onClick={onClose}>{t('chatRoom.close')}</Button>
        ) : (
          [
            <Button key="cancel" onClick={cancel}>
              {t(workspace.connecting ? 'chatRoom.cancelConnection' : 'chatRoom.cancel')}
            </Button>,
            <Button
              key="connect"
              type="primary"
              loading={workspace.connecting}
              aria-label={t('chatRoom.connect')}
              onClick={() => form.submit()}
            >
              {t('chatRoom.connect')}
            </Button>,
          ]
        )
      }
    >
      {workspace.connectionError && (
        <Alert
          className={styles.connectionAlert}
          showIcon
          type="error"
          title={chatErrorText(t, workspace.connectionError)}
        />
      )}
      {workspace.connection && !workspace.connecting ? (
        <Descriptions
          column={1}
          items={[
            { key: 'user', label: t('chatRoom.chatAccount'), children: workspace.connection.user.displayName },
            {
              key: 'api',
              label: t('chatRoom.apiAddress'),
              children: <span className={styles.breakText}>{workspace.connection.apiBase}</span>,
            },
            {
              key: 'jid',
              label: t('chatRoom.accountAddress'),
              children: <span className={styles.breakText}>{workspace.connection.session.jid}</span>,
            },
          ]}
        />
      ) : (
        <Form<ChatCredentials>
          form={form}
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          initialValues={{ apiAddress: CHAT_PLATFORM_API, username: 'guest', password: 'guest123!' }}
          onFinish={async (values) => {
            if (await workspace.connect(values)) onClose()
          }}
          disabled={workspace.connecting}
        >
          <p className={styles.connectionHint}>{t('chatRoom.connectHint')}</p>
          <Form.Item
            name="apiAddress"
            label={t('chatRoom.apiAddress')}
            rules={[{ required: true, message: t('chatRoom.required') }]}
          >
            <Input aria-label={t('chatRoom.apiAddress')} autoComplete="url" />
          </Form.Item>
          <Form.Item
            name="username"
            label={t('chatRoom.username')}
            rules={[{ required: true, whitespace: true, message: t('chatRoom.required') }]}
          >
            <Input aria-label={t('chatRoom.username')} autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('chatRoom.password')}
            rules={[{ required: true, message: t('chatRoom.required') }]}
          >
            <Input.Password aria-label={t('chatRoom.password')} autoComplete="current-password" />
          </Form.Item>
          <p className={styles.connectionHint}>{t('chatRoom.demoHint')}</p>
        </Form>
      )}
    </Modal>
  )
}
