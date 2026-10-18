import { Card, Space, Table, Tag, Typography } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'

const { Title, Paragraph, Text } = Typography
const targets = [
  {
    key: 'app',
    target: '应用与多项目',
    config: 'vite.config.ts + src/projects/registry.json',
    command: 'pnpm run build:production / pnpm run project:build -- <project>',
  },
  { key: 'mfe', target: '微前端', config: 'build/module-federation.ts', command: 'pnpm run build:mf:vercel' },
  { key: 'library', target: '组件库', config: 'vite.config.lib.ts + tsconfig.lib.json', command: 'pnpm run build:lib' },
  {
    key: 'storybook',
    target: 'Storybook',
    config: '.storybook/main.ts + .storybook/vite.config.ts',
    command: 'pnpm run build-storybook',
  },
  {
    key: 'pages',
    target: 'GitHub Pages',
    config: 'config/pages-plan.mjs + scripts/build-pages.mjs',
    command: 'pnpm run build:pages',
  },
]

export default function VitePage() {
  return (
    <FixTabPanel fill={false}>
      <Space orientation="vertical" size="large" style={{ display: 'flex', padding: 24 }}>
        <div>
          <Tag color="purple">VITE 8</Tag>
          <Title level={2}>Vite 构建链路</Title>
          <Paragraph>
            应用、独立项目、微前端、组件库与 Storybook 使用 Vite 构建，项目入口和产物目录由项目注册表管理。
          </Paragraph>
        </div>
        <Card title="构建入口">
          <Table
            dataSource={targets}
            pagination={false}
            scroll={{ x: 720 }}
            columns={[
              { title: '目标', dataIndex: 'target' },
              { title: '配置', dataIndex: 'config', render: (value) => <Text code>{value}</Text> },
              { title: '命令', dataIndex: 'command', render: (value) => <Text code>{value}</Text> },
            ]}
          />
        </Card>
        <Card title="开发、预览与交付">
          <Paragraph>
            <Text code>pnpm start</Text> 启动 Vite 和本地 API；<Text code>pnpm run start:web</Text> 启动前端。
          </Paragraph>
          <Paragraph>
            <Text code>pnpm run preview</Text> 预览构建产物。设置 <Text code>PROJECT</Text> 选择项目，
            <Text code>PUBLIC_URL</Text> 配置部署路径。
          </Paragraph>
          <Paragraph>
            <Text code>pnpm run build:stats</Text> 输出构建统计和体积分布图，
            <Text code>pnpm run check:bundle-budget</Text> 检查体积预算。
          </Paragraph>
          <Paragraph>
            生产构建生成版本信息、Service Worker、gzip 与 Brotli 文件。ZIP 命令将产物归档到 <Text code>dist-zip</Text>。
          </Paragraph>
        </Card>
      </Space>
    </FixTabPanel>
  )
}
