import FixTabPanel from '@stateless/FixTabPanel'

// 示例1：基本使用（必须设置高度）
export const ExampleDefault = () => {
  return (
    <FixTabPanel style={{ height: '400px', border: '1px solid #ccc' }}>
      <div style={{ padding: '20px' }}>
        <h3>基本滚动面板</h3>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: '10px 0' }}>
            这是一段示例文本 {i + 1}。这里有一些内容来演示滚动效果。 当内容超出容器高度时，会自动显示滚动条和进度条。
          </p>
        ))}
      </div>
    </FixTabPanel>
  )
}

// 示例2：自定义进度条样式
export const ExampleCustomProgress = () => {
  return (
    <FixTabPanel
      style={{ height: '400px', border: '1px solid #ccc' }}
      showScrollProgress={true}
      scrollProgressProps={{
        height: 4,
        color: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        springConfig: { stiffness: 200, damping: 40 },
      }}
    >
      <div style={{ padding: '20px' }}>
        <h3>自定义进度条样式</h3>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            style={{
              margin: '15px 0',
              padding: '10px',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            内容块 {i + 1}
          </div>
        ))}
      </div>
    </FixTabPanel>
  )
}

// 示例3：禁用滚动进度条
export const ExampleNoProgress = () => {
  return (
    <FixTabPanel style={{ height: '400px', border: '1px solid #ccc' }} showScrollProgress={false}>
      <div style={{ padding: '20px' }}>
        <h3>无滚动进度条</h3>
        <p>这个面板没有滚动进度条，但仍然有返回顶部功能。</p>
        {Array.from({ length: 15 }, (_, i) => (
          <p key={i} style={{ margin: '10px 0' }}>
            内容行 {i + 1}
          </p>
        ))}
      </div>
    </FixTabPanel>
  )
}
