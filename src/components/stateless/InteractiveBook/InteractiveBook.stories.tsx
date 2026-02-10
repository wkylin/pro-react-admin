import type { Meta, StoryObj } from '@storybook/react-vite'
import InteractiveBook, { InteractiveBookProps } from './index'
import AiCover from '@assets/images/ai-cover.webp'

// Sample book pages content
const bookPages = [
  {
    pageNumber: 1,
    title: '第一章：AI Agent 简介',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 是人工智能领域的一个重要概念，它代表着能够自主执行任务的智能实体。"</p>
        <p>"AI Agent 不仅仅是简单的程序，它们能够感知环境、做出决策并采取行动，就像人类一样。"</p>
        <p>"在现代科技中，AI Agent 正在改变我们与技术交互的方式，从简单的聊天机器人到复杂的自动化系统。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的工作原理</p>
      </div>
    ),
  },
  {
    pageNumber: 2,
    title: '第二章：AI Agent 的工作原理',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 的核心是感知-决策-行动循环。它首先通过传感器或输入接口感知环境。"</p>
        <p>"然后使用算法和模型分析信息，做出最佳决策。"</p>
        <p>"最后，通过执行器或输出接口采取行动。这个循环不断重复，使 Agent 能够适应变化的环境。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的类型</p>
      </div>
    ),
  },
  {
    pageNumber: 3,
    title: '第三章：AI Agent 的类型',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 可以分为多种类型：反应型 Agent、 deliberation Agent、混合型 Agent 等。"</p>
        <ul
          style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <li>反应型 Agent：基于当前感知做出反应</li>
          <li>Deliberation Agent：具有规划和推理能力</li>
          <li>学习型 Agent：能够从经验中学习和改进</li>
          <li>多 Agent 系统：多个 Agent 协同工作</li>
        </ul>
        <p>"每种类型的 Agent 都有其独特的优势和应用场景。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的应用领域</p>
      </div>
    ),
  },
  {
    pageNumber: 4,
    title: '第四章：AI Agent 的应用领域',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 在各个领域都有广泛应用，从日常生活到工业生产。"</p>
        <p>"在医疗领域，AI Agent 可以帮助诊断疾病、制定治疗方案。在金融领域，它们可以进行风险评估和投资建议。"</p>
        <p>"在交通领域，自动驾驶汽车就是一种复杂的 AI Agent。在娱乐领域，游戏中的 NPC 也越来越智能化。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的挑战</p>
      </div>
    ),
  },
  {
    pageNumber: 5,
    title: '第五章：AI Agent 的挑战',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"尽管 AI Agent 技术发展迅速，但仍面临诸多挑战。"</p>
        <p>"安全性是首要问题，如何确保 Agent 的行为符合人类价值观？"</p>
        <p>"可解释性：Agent 的决策过程往往像黑箱，如何让人类理解其推理过程？"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#6b7280' }}>
          AI Agent 的挑战
        </h3>
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>继续阅读下一页</p>
      </div>
    ),
  },
  {
    pageNumber: 6,
    title: '第六章：AI Agent 的未来发展',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 的未来充满无限可能。随着技术的进步，它们将变得更加智能和自主。"</p>
        <p>"多模态 Agent 将能够处理文本、图像、声音等多种信息。"</p>
        <p>"通用人工智能 Agent（AGI）可能会实现，能够在各种任务中表现出色。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的伦理考虑</p>
      </div>
    ),
  },
  {
    pageNumber: 7,
    title: '第七章：AI Agent 的伦理考虑',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"随着 AI Agent 的普及，伦理问题变得越来越重要。"</p>
        <p>"我们需要确保 Agent 的行为符合道德标准，避免偏见和歧视。"</p>
        <p>"隐私保护、透明度和问责制都是需要重点关注的领域。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>AI 时代的伦理思考继续...</p>
      </div>
    ),
  },
  {
    pageNumber: 8,
    title: '结语：拥抱 AI Agent 的时代',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 不仅仅是技术工具，它们正在重塑我们的世界。"</p>
        <p>"通过理解和正确应用 AI Agent，我们可以创造更美好的未来。"</p>
        <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '24px', color: '#6b7280' }}>— AI 专家</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>书籍结束</p>
      </div>
    ),
  },
]
const meta: Meta<typeof InteractiveBook> = {
  title: 'Stateless/InteractiveBook',
  component: InteractiveBook,
  argTypes: {
    bookTitle: { control: 'text', description: '书籍标题' },
    bookAuthor: { control: 'text', description: '书籍作者' },
    width: { control: 'number', description: '书页宽度（px）' },
    height: { control: 'number', description: '书页高度（px）' },
    enableKeyboard: { control: 'boolean', description: '是否启用键盘导航' },
    showNavigation: { control: 'boolean', description: '是否显示底部导航栏' },
    showCornerFlip: { control: 'boolean', description: '是否显示页角翻页热区（海浪呼吸效果）' },
    enableSound: { control: 'boolean', description: '是否启用翻页音效' },
    pageImages: { control: 'object', description: '图片模式：图片 URL 数组，每张图片对应书的一面' },
    pdfUrl: { control: 'text', description: 'PDF 模式：PDF 文件 URL' },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InteractiveBook>

export const Default: Story = {
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full items-center justify-center bg-neutral-100 p-10">
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

export const CornerCurlHint: Story = {
  name: '页角翻页提示',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 400 }}>
        打开书籍后，将鼠标悬停在页面的右下角或左下角，页角会出现海浪卷起的动画效果。点击页角即可翻页。
      </p>
      {
        // 在浏览器运行时根据当前 pathname 动态构造 PDF 地址，兼容部署到
        // GitHub Pages 子路径（例如 /pro-react-admin/storybook/）的场景。
        (() => {
          if (typeof window === 'undefined') return <InteractiveBook {...args} />
          const p = window.location.pathname
          let runtimePdf = '/assets/pdf/sample.pdf'
          const idx = p.indexOf('/storybook')
          if (idx !== -1) {
            const prefix = p.substring(0, idx + 1) // 保留到 /storybook 之前的斜杠
            runtimePdf = `${prefix}storybook/assets/pdf/sample.pdf`
          } else {
            // 尝试基于仓库名（形如 /<user>/<repo>/...）推断
            const parts = p.split('/').filter(Boolean)
            if (parts.length >= 2) {
              const repoPrefix = `/${parts[0]}/${parts[1]}/`
              runtimePdf = `${repoPrefix}storybook/assets/pdf/sample.pdf`
            }
          }
          return <InteractiveBook {...args} pdfUrl={runtimePdf} />
        })()
      }
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

export const FewPages: Story = {
  name: '少量页面',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full items-center justify-center bg-neutral-100 p-10">
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: '简短手册',
    bookAuthor: '作者',
    pages: [
      {
        pageNumber: 1,
        title: '唯一的章节',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>"这本书只有一页正文，翻到最后一页时不再显示拖动手势。"</p>
            <p>"将鼠标移到右下角，可以看到页角卷起效果。"</p>
          </div>
        ),
        backContent: (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>背面内容</p>
          </div>
        ),
      },
      {
        pageNumber: 2,
        title: '结束',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>"最后一页，拖动手势已禁用，鼠标恢复为普通箭头。"</p>
          </div>
        ),
      },
    ],
    width: 350,
    height: 500,
  },
}

// 用 picsum.photos 生成示例图片 URL，模拟按页码分割的书页图片
const demoPageImages = Array.from({ length: 20 }, (_, i) => `https://picsum.photos/seed/page${i + 1}/700/1000`)

export const ImageBook: Story = {
  name: '图片模式（逐页图片）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        传入 <code>pageImages</code> 数组后，书页内容改为逐页加载图片。
        <br />
        仅预加载当前页 ±2 范围内的图片，支持几百页不卡顿。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: '图片翻书示例',
    bookAuthor: 'Demo',
    pages: [],
    pageImages: demoPageImages,
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

// ─── PDF 模式 ─────────────────────────────────────
export const PdfBook: Story = {
  name: 'PDF 模式（react-pdf）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        传入 <code>pdfUrl</code> 后，使用 react-pdf 渲染 PDF 文件。
        <br />
        本地 Worker，不依赖 CDN。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'PDF 翻书示例',
    bookAuthor: 'Demo',
    pages: [],
    pdfUrl: '/assets/pdf/sample.pdf',
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

// ─── 隐藏导航栏 ─────────────────────────────────────
export const HideNavigation: Story = {
  name: '隐藏底部导航栏',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        设置 <code>showNavigation=false</code> 隐藏底部导航栏，仅保留拖拽、页角点击和键盘翻页方式。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
    showNavigation: false,
  },
}

// ─── 隐藏页角翻页 ─────────────────────────────────────
export const HideCornerFlip: Story = {
  name: '隐藏页角翻页热区',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        设置 <code>showCornerFlip=false</code> 隐藏页角海浪翻页热区，仅保留拖拽、导航栏和键盘翻页方式。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
    showCornerFlip: false,
  },
}

// ─── 极简模式（同时隐藏导航栏和页角翻页）─────────────
export const MinimalMode: Story = {
  name: '极简模式',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        同时设置 <code>showNavigation=false</code> 和 <code>showCornerFlip=false</code>，
        仅保留拖拽和键盘翻页，适合嵌入式场景。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
    showNavigation: false,
    showCornerFlip: false,
  },
}

// ─── 翻页音效（开启）─────────────────────────
export const SoundEnabled: Story = {
  name: '翻页音效（开启）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        默认开启翻页音效（<code>enableSound=true</code>），翻页时会播放纸张翻动的声音。 点击、拖拽、键盘翻页均触发音效。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
    enableSound: true,
  },
}

// ─── 翻页音效（禁用）─────────────────────────
export const SoundDisabled: Story = {
  name: '翻页音效（禁用）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        设置 <code>enableSound=false</code> 禁用翻页音效，适合需要安静环境的场景。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    enableKeyboard: true,
    enableSound: false,
  },
}
