import FixTabPanel from '@stateless/FixTabPanel'
import SvgPreview from '@stateless/SvgPreview'
import DiagramSvg from '@assets/svg/architecture-diagram-rcba.svg'
import { Card, Space, Typography } from 'antd'

const { Text } = Typography

const SVG_SOURCE = ''

const SvgViewer = () => {
  return (
    <FixTabPanel fill>
      <Card
        title='架构图预览'
        extra={
          <Space>
            <Text type='secondary'>提示：可以使用鼠标拖拽和方向键移动视图</Text>
          </Space>
        }
        style={{ flex: 1, display: 'flex', height: '100%', flexDirection: 'column' }}
        styles={{
          body: { padding: 0, flex: 1, overflow: 'hidden', display: 'flex', position: 'relative' }
        }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <SvgPreview SvgComponent={DiagramSvg} downloadName='architecture-diagram.svg' />
          {/* <SvgPreview svgSource={SVG_SOURCE} downloadName="architecture-diagram.svg" /> */}
          {/* 如果需要直接作为组件渲染，可改为 <DiagramSvg/> */}
        </div>
      </Card>
    </FixTabPanel>
  )
}

export default SvgViewer
