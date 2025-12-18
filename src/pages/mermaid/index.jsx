import React, { useState, useRef, useCallback } from 'react'
import MermaidHooks from '@stateful/mermaidHooks'
import FixTabPanel from '@stateless/FixTabPanel'
import PageContainer from '@stateless/PageContainer'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { toPng, toSvg } from 'html-to-image'
import copy from 'copy-to-clipboard'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Copy,
  Image as ImageIcon,
  Code2,
  GitBranch,
  Activity,
  Clock,
  FileCode
} from 'lucide-react'
import { Button, Tooltip, message, Space, Card, theme } from 'antd'

const SAMPLES = {
  Flowchart: `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`,
  Sequence: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`,
  State: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
  Git: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit`,
  Timeline: `timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2003 : Facebook
    2004 : Google
    2005 : Youtube
    2006 : Twitter`
}

const MermaidDemo = () => {
  const { token } = theme.useToken()
  const [chart, setChart] = useState(SAMPLES.Flowchart)
  const [activeType, setActiveType] = useState('Flowchart')
  const previewRef = useRef(null)

  const getSampleIcon = (type) => {
    if (type === 'Git') return <GitBranch size={14} />
    if (type === 'Timeline') return <Clock size={14} />
    if (type === 'State') return <Activity size={14} />
    return <FileCode size={14} />
  }

  const handleSampleChange = (type) => {
    setActiveType(type)
    setChart(SAMPLES[type])
  }

  const handleDownload = useCallback(
    async (format) => {
      if (!previewRef.current) return
      try {
        const dataUrl =
          format === 'png'
            ? await toPng(previewRef.current, { backgroundColor: token.colorBgLayout })
            : await toSvg(previewRef.current, { backgroundColor: token.colorBgLayout })
        const link = document.createElement('a')
        link.download = `mermaid-chart.${format}`
        link.href = dataUrl
        link.click()
        message.success(`Downloaded as ${format.toUpperCase()}`)
      } catch (err) {
        message.error('Download failed: ' + err.message)
      }
    },
    [previewRef, token.colorBgLayout]
  )

  const copyCodeFallback = useCallback(() => {
    const ok = copy(chart)
    if (ok) {
      message.info('Copied code instead')
      return
    }
    message.error('Copy failed')
  }, [chart])

  const handleCopyImage = useCallback(async () => {
    if (!previewRef.current) return

    const canCopyImage =
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === 'function' &&
      typeof ClipboardItem !== 'undefined'

    if (!canCopyImage) {
      copyCodeFallback()
      return
    }

    try {
      const dataUrl = await toPng(previewRef.current, { backgroundColor: token.colorBgLayout })
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      message.success('Image copied to clipboard')
    } catch (err) {
      message.error('Copy image failed: ' + err.message)
      copyCodeFallback()
    }
  }, [previewRef, token.colorBgLayout, copyCodeFallback])

  return (
    <FixTabPanel>
      <PageContainer title='Mermaid Live Editor' footer={null}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Editor Section */}
          <div className='flex flex-col gap-4'>
            <Card
              title={
                <div className='flex items-center gap-2'>
                  <Code2 size={18} />
                  <span>Editor</span>
                </div>
              }
              className='flex-1 shadow-sm'
              styles={{ body: { padding: 0, height: 'calc(100% - 57px)', display: 'flex', flexDirection: 'column' } }}
            >
              <div className='relative flex-1' style={{ backgroundColor: token.colorBgLayout }}>
                <textarea
                  className='h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none'
                  style={{ color: token.colorText }}
                  onChange={(e) => setChart(e.target.value)}
                  value={chart}
                  spellCheck={false}
                  placeholder='Enter Mermaid code here...'
                />
              </div>
              <div
                className='border-t p-3'
                style={{ borderColor: token.colorBorderSecondary, backgroundColor: token.colorBgContainer }}
              >
                <p className='mb-2 text-xs font-medium' style={{ color: token.colorTextSecondary }}>
                  Sample Diagrams:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {Object.keys(SAMPLES).map((type) => (
                    <Button
                      key={type}
                      size='small'
                      type={activeType === type ? 'primary' : 'default'}
                      onClick={() => handleSampleChange(type)}
                      icon={getSampleIcon(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className='flex flex-col gap-4'>
            <Card
              title={
                <div className='flex items-center gap-2'>
                  <ImageIcon size={18} />
                  <span>Preview</span>
                </div>
              }
              extra={
                <Space>
                  <Tooltip title='Copy Image'>
                    <Button icon={<Copy size={16} />} onClick={handleCopyImage} />
                  </Tooltip>
                  <Tooltip title='Download PNG'>
                    <Button icon={<Download size={16} />} onClick={() => handleDownload('png')}>
                      PNG
                    </Button>
                  </Tooltip>
                  <Tooltip title='Download SVG'>
                    <Button icon={<Download size={16} />} onClick={() => handleDownload('svg')}>
                      SVG
                    </Button>
                  </Tooltip>
                </Space>
              }
              className='flex-1 shadow-sm'
              styles={{ body: { padding: 0, height: 'calc(100% - 57px)', position: 'relative', overflow: 'hidden' } }}
            >
              <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit wheel={{ step: 0.1 }}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div
                      className='absolute top-4 right-4 z-10 flex flex-col gap-2 rounded-lg p-1 shadow-md backdrop-blur-sm'
                      style={{ backgroundColor: token.colorBgContainer }}
                    >
                      <Tooltip title='Zoom In' placement='left'>
                        <Button type='text' icon={<ZoomIn size={18} />} onClick={() => zoomIn()} />
                      </Tooltip>
                      <Tooltip title='Zoom Out' placement='left'>
                        <Button type='text' icon={<ZoomOut size={18} />} onClick={() => zoomOut()} />
                      </Tooltip>
                      <Tooltip title='Reset' placement='left'>
                        <Button type='text' icon={<RotateCcw size={18} />} onClick={() => resetTransform()} />
                      </Tooltip>
                    </div>
                    <div className='h-full w-full cursor-move' style={{ backgroundColor: token.colorBgLayout }}>
                      <TransformComponent
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        contentStyle={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <div ref={previewRef} className='p-8'>
                          <MermaidHooks chart={chart} />
                        </div>
                      </TransformComponent>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </Card>
          </div>
        </div>
      </PageContainer>
    </FixTabPanel>
  )
}

export default MermaidDemo
