import React from 'react'
import { Drawer, Switch, Divider, Tooltip, theme, ColorPicker } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useProThemeContext, ThemeSettings } from '@/theme/hooks'
import { useTranslation } from 'react-i18next'

const { useToken } = theme

interface SettingDrawerProps {
  open: boolean
  onClose: () => void
}

type BlockCheckboxItem<K extends string> = {
  key: K
  title: string
  url: string
}

type BlockCheckboxProps<K extends string> = {
  list: ReadonlyArray<BlockCheckboxItem<K>>
  value: K
  onChange: (key: K) => void
}

const BlockCheckbox = <K extends string>({ list, value, onChange }: BlockCheckboxProps<K>) => {
  const { token } = useToken()
  return (
    <div className="flex gap-4">
      {list.map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <button
            type="button"
            aria-label={item.title}
            className="relative overflow-hidden rounded shadow-md transition-all hover:opacity-80"
            style={{
              width: 52,
              height: 40,
              border: value === item.key ? `2px solid ${token.colorPrimary}` : '2px solid transparent',
              padding: 0,
              background: 'transparent',
            }}
            onClick={() => onChange(item.key)}
          >
            <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%' }} />
            {value === item.key && (
              <div className="absolute right-0 bottom-0 text-xs font-bold" style={{ color: token.colorPrimary }}>
                <CheckOutlined />
              </div>
            )}
          </button>
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
          <button
            type="button"
            aria-label={item.key}
            className="flex h-6 w-6 items-center justify-center rounded text-white shadow-sm"
            style={{ backgroundColor: item.color, padding: 0, border: 'none' }}
            onClick={() => onChange(item.color)}
          >
            {value === item.color && <CheckOutlined style={{ color: token.colorBgContainer }} />}
          </button>
        </Tooltip>
      ))}
    </div>
  )
}

const SettingDrawer: React.FC<SettingDrawerProps> = ({ open, onClose }) => {
  const { themeSettings, updateSettings } = useProThemeContext()
  const { t } = useTranslation()

  const changeSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    updateSettings({ [key]: value } as Partial<ThemeSettings>)
  }

  return (
    <Drawer
      title={t('settingDrawer.title')}
      placement="right"
      onClose={onClose}
      open={open}
      size={300}
      styles={{ body: { padding: '20px 24px' } }}
    >
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.overallStyle')}</h3>
        <div className="flex gap-4">
          <BlockCheckbox
            list={
              [
                {
                  key: 'light',
                  title: t('settingDrawer.navTheme.light'),
                  url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiNGRkYiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
                },
                {
                  key: 'dark',
                  title: t('settingDrawer.navTheme.dark'),
                  url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
                },
              ] as const
            }
            value={themeSettings.navTheme}
            onChange={(key) => changeSetting('navTheme', key)}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm">{t('settingDrawer.enableDarkMode')}</span>
          <Switch
            checked={themeSettings.themeMode === 'dark'}
            onChange={(checked) => changeSetting('themeMode', checked ? 'dark' : 'light')}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.themeColor')}</h3>
        <ThemeColor
          colors={[
            {
              key: t('settingDrawer.colors.dawnBlueDefault'),
              color: '#1677ff',
            },
            { key: t('settingDrawer.colors.dustRed'), color: '#F5222D' },
            { key: t('settingDrawer.colors.volcano'), color: '#FA541C' },
            { key: t('settingDrawer.colors.sunset'), color: '#FAAD14' },
            { key: t('settingDrawer.colors.cyan'), color: '#13C2C2' },
            { key: t('settingDrawer.colors.auroraGreen'), color: '#52C41A' },
            { key: t('settingDrawer.colors.geekBlue'), color: '#2F54EB' },
            { key: t('settingDrawer.colors.purple'), color: '#722ED1' },
          ]}
          value={themeSettings.colorPrimary}
          onChange={(val) => changeSetting('colorPrimary', val)}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <span className="mr-2 text-sm">{t('settingDrawer.customColor')}:</span>
          <ColorPicker
            value={themeSettings.colorPrimary}
            onChange={(color) => changeSetting('colorPrimary', color.toHexString())}
            showText
          />
        </div>
      </div>

      <Divider />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.navigationMode')}</h3>
        <BlockCheckbox
          list={
            [
              {
                key: 'side',
                title: t('settingDrawer.layout.side'),
                url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iNDgiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRiIvPgogIDwvZz4KPC9zdmc+',
              },
              {
                key: 'top',
                title: t('settingDrawer.layout.top'),
                url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMTIiIGZpbGw9IiMwMDE1MjkiLz4KICA8L2c+Cjwvc3ZnPg==',
              },
              {
                key: 'mix',
                title: t('settingDrawer.layout.mix'),
                url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjBGMkY1Ii8+CiAgICA8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMTIiIGZpbGw9IiMwMDE1MjkiLz4KICAgIDxyZWN0IHg9IjAiIHk9IjEyIiB3aWR0aD0iMTYiIGhlaWdodD0iMzYiIGZpbGw9IiNGRkYiLz4KICA8L2c+Cjwvc3ZnPg==',
              },
            ] as const
          }
          value={themeSettings.layout}
          onChange={(val) => changeSetting('layout', val)}
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.contentWidth')}</h3>
        <div className="flex justify-between">
          <span>{t('settingDrawer.contentWidth')}</span>
          <Switch
            checkedChildren={t('settingDrawer.contentWidthFixed')}
            unCheckedChildren={t('settingDrawer.contentWidthFluid')}
            checked={themeSettings.contentWidth === 'Fixed'}
            onChange={(checked) => changeSetting('contentWidth', checked ? 'Fixed' : 'Fluid')}
            disabled={themeSettings.layout === 'side'}
          />
        </div>
      </div>

      <Divider />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.other')}</h3>

        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.other.colorWeak')}</span>
          <Switch checked={themeSettings.colorWeak} onChange={(checked) => changeSetting('colorWeak', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.other.grayMode')}</span>
          <Switch checked={themeSettings.grayMode} onChange={(checked) => changeSetting('grayMode', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.other.compactMode')}</span>
          <Switch
            checked={themeSettings.compactAlgorithm}
            onChange={(checked) => changeSetting('compactAlgorithm', checked)}
          />
        </div>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.other.fixedHeader')}</span>
          <Switch checked={themeSettings.fixedHeader} onChange={(checked) => changeSetting('fixedHeader', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.other.fixedSider')}</span>
          <Switch checked={themeSettings.fixSiderbar} onChange={(checked) => changeSetting('fixSiderbar', checked)} />
        </div>
      </div>

      <Divider />
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold">{t('settingDrawer.sections.visualEffects')}</h3>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.effects.pointerFollow')}</span>
          <Switch checked={themeSettings.pointerMove} onChange={(checked) => changeSetting('pointerMove', checked)} />
        </div>
        <div className="mb-3 flex justify-between">
          <span>{t('settingDrawer.effects.pointerTrail')}</span>
          <Switch checked={themeSettings.magicTrail} onChange={(checked) => changeSetting('magicTrail', checked)} />
        </div>
      </div>
    </Drawer>
  )
}

export default SettingDrawer
