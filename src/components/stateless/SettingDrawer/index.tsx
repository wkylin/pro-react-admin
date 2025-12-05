import React from 'react'
import { Drawer, Switch, Divider, Tooltip, theme, ColorPicker } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useProThemeContext, ThemeSettings } from '@/theme/hooks'

const { useToken } = theme

interface SettingDrawerProps {
  open: boolean
  onClose: () => void
}

const BlockCheckbox = ({
  list,
  value,
  onChange,
}: {
  list: { key: string; title: string; url: string }[]
  value: string
  onChange: (key: string) => void
}) => {
  const { token } = useToken()
  return (
    <div className="flex gap-4">
      {list.map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <div
            className="relative cursor-pointer overflow-hidden rounded shadow-md transition-all hover:opacity-80"
            style={{
              width: 52,
              height: 40,
              border: value === item.key ? `2px solid ${token.colorPrimary}` : '2px solid transparent',
            }}
            onClick={() => onChange(item.key)}
          >
            <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%' }} />
            {value === item.key && (
              <div className="absolute right-0 bottom-0 text-xs font-bold" style={{ color: token.colorPrimary }}>
                <CheckOutlined />
              </div>
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

const ThemeColor = ({
  colors,
  value,
  onChange,
}: {
  colors: { key: string; color: string }[]
  value: string
  onChange: (color: string) => void
}) => {
  const { token } = useToken()
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((item) => (
        <Tooltip title={item.key} key={item.key}>
          <div
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-white shadow-sm"
            style={{ backgroundColor: item.color }}
            onClick={() => onChange(item.color)}
          >
            {value === item.color && <CheckOutlined style={{ color: token.colorBgContainer }} />}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

const SettingDrawer: React.FC<SettingDrawerProps> = ({ open, onClose }) => {
  const { themeSettings, updateSettings } = useProThemeContext()

  const changeSetting = (key: keyof ThemeSettings, value: any) => {
    updateSettings({ [key]: value })
  }

  return (
    <Drawer
      title="偏好设置"
      placement="right"
      onClose={onClose}
      open={open}
      size={300}
      styles={{ body: { padding: '20px 24px' } }}
    >
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">整体风格设置</h3>
        <div className="flex gap-4">
          <BlockCheckbox
            list={[
              {
                key: 'light',
                title: '亮色菜单风格',
                url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiNGRkYiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
              },
              {
                key: 'dark',
                title: '暗色菜单风格',
                url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
              },
            ]}
            value={themeSettings.navTheme}
            onChange={(key) => changeSetting('navTheme', key)}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm">开启暗黑模式</span>
          <Switch
            checked={themeSettings.themeMode === 'dark'}
            onChange={(checked) => changeSetting('themeMode', checked ? 'dark' : 'light')}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">主题色</h3>
        <ThemeColor
          colors={[
            { key: '拂晓蓝 (默认)', color: '#1677ff' },
            { key: '薄暮', color: '#F5222D' },
            { key: '火山', color: '#FA541C' },
            { key: '日暮', color: '#FAAD14' },
            { key: '明青', color: '#13C2C2' },
            { key: '极光绿', color: '#52C41A' },
            { key: 'Geek Blue', color: '#2F54EB' },
            { key: '酱紫', color: '#722ED1' },
          ]}
          value={themeSettings.colorPrimary}
          onChange={(val) => changeSetting('colorPrimary', val)}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <span className="mr-2 text-sm">自定义颜色:</span>
          <ColorPicker
            value={themeSettings.colorPrimary}
            onChange={(color) => changeSetting('colorPrimary', color.toHexString())}
            showText
          />
        </div>
      </div>

      <Divider />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">导航模式</h3>
        <BlockCheckbox
          list={[
            {
              key: 'side',
              title: '侧边菜单布局',
              url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
            },
            {
              key: 'top',
              title: '顶部菜单布局',
              url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMTIiIGZpbGw9IiMwMDE1MjkiLz4KICA8L2c+Cjwvc3ZnPg==',
            },
            {
              key: 'mix',
              title: '混合菜单布局',
              url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMTIiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHg9IjAiIHk9IjEyIiB3aWR0aD0iMTYiIGhlaWdodD0iMzYiIGZpbGw9IiNGRkYiLz4KICA8L2c+Cjwvc3ZnPg==',
            },
          ]}
          value={themeSettings.layout}
          onChange={(val) => changeSetting('layout', val)}
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">内容区域宽度</h3>
        <div className="flex justify-between">
          <span>内容区域宽度</span>
          <Switch
            checkedChildren="Fixed"
            unCheckedChildren="Fluid"
            checked={themeSettings.contentWidth === 'Fixed'}
            onChange={(checked) => changeSetting('contentWidth', checked ? 'Fixed' : 'Fluid')}
            disabled={themeSettings.layout === 'side'}
          />
        </div>
      </div>

      <Divider />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">其他设置</h3>
        <div className="mb-3 flex justify-between">
          <span>色弱模式</span>
          <Switch checked={themeSettings.colorWeak} onChange={(checked) => changeSetting('colorWeak', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>灰色模式</span>
          <Switch checked={themeSettings.grayMode} onChange={(checked) => changeSetting('grayMode', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>紧凑模式</span>
          <Switch
            checked={themeSettings.compactAlgorithm}
            onChange={(checked) => changeSetting('compactAlgorithm', checked)}
          />
        </div>
        <div className="mb-3 flex justify-between">
          <span>固定 Header</span>
          <Switch checked={themeSettings.fixedHeader} onChange={(checked) => changeSetting('fixedHeader', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>固定侧边菜单</span>
          <Switch checked={themeSettings.fixSiderbar} onChange={(checked) => changeSetting('fixSiderbar', checked)} />
        </div>
      </div>
    </Drawer>
  )
}

export default SettingDrawer
