import type { Meta, StoryObj } from '@storybook/react-vite'
import InteractiveBook, { type InteractiveBookProps } from './index'
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
  title: 'Components/Stateless/InteractiveBook',
  component: InteractiveBook,
  argTypes: {
    coverImage: { control: 'text', description: '封面图片 URL' },
    coverImagePosition: { control: 'text', description: '封面图片裁切位置，如 50% 40%' },
    coverLabel: { control: 'text', description: '封面标签文案' },
    coverContent: { control: 'text', description: '封面简介等叠加内容' },
    coverAuthor: { control: 'text', description: '封面作者，默认使用 bookAuthor' },
    backCoverImage: { control: 'text', description: '封底图片 URL，铺满整个封底' },
    backCoverImagePosition: { control: 'text', description: '封底图片裁切位置，如 50% 40%' },
    backCoverLabel: { control: 'text', description: '封底标签文案' },
    backCoverTitle: { control: 'text', description: '封底标题，默认使用书名' },
    backCoverSubtitle: { control: 'text', description: '封底副标题' },
    backCoverContent: { control: false, description: '封底简介等 React 内容，可叠加在封底图片上' },
    backCoverAuthor: { control: 'text', description: '封底作者，默认使用 bookAuthor' },
    backCoverPublisher: { control: 'text', description: '封底出版信息或标识文案' },
    backCoverStyle: {
      control: 'select',
      options: ['illustrated', 'classic', 'leather', 'golden-jacket', 'editorial-orange'],
      description: '封底装帧；默认沿用 coverStyle',
    },
    backCoverLayout: {
      control: 'select',
      options: ['standard', 'centered', 'publisher'],
      description: '封底文字排版；默认沿用 coverLayout',
    },
    backCoverColor: { control: 'color', description: '封底底色' },
    backCoverFontFamily: { control: 'text', description: '封底字体栈' },
    backCoverTitleColor: { control: 'color', description: '封底标题颜色' },
    backCoverTextColor: { control: 'color', description: '封底标签、简介与作者颜色' },
    backCoverAccentColor: { control: 'color', description: '封底副标题与出版信息颜色' },
    backCoverTextAlign: { control: 'select', options: ['left', 'center', 'right'], description: '封底文字对齐方式' },
    backCoverTitleStyle: { control: false, description: '封底标题 CSSProperties' },
    backCoverTextured: { control: 'boolean', description: '单独启用封底纸纹' },
    bookTitle: { control: 'text', description: '书籍标题' },
    coverTitle: { control: false, description: '自定义封面标题排版，可使用 React 节点控制断行' },
    coverSubtitle: { control: 'text', description: '封面副标题' },
    coverPublisher: { control: 'text', description: '封面出版信息或标识文案' },
    coverStyle: {
      control: 'select',
      options: ['illustrated', 'classic', 'leather', 'golden-jacket', 'editorial-orange'],
      description: '封面与书脊装帧：插画、黑金精装、酒红皮革、金色书衣、橙白编辑风',
    },
    coverLayout: {
      control: 'select',
      options: ['standard', 'centered', 'publisher'],
      description: '封面文字排版：标准、居中、出版物样式',
    },
    coverFontFamily: { control: 'text', description: '封面标题字体栈' },
    coverTitleSize: { control: 'text', description: '封面标题字号，可传 px、rem 或 CSS clamp()' },
    coverTitleColor: { control: 'color', description: '封面标题颜色' },
    coverTextColor: { control: 'color', description: '封面作者与出版信息颜色' },
    coverAccentColor: { control: 'color', description: '封面与书脊的装饰色' },
    coverTextAlign: { control: 'select', options: ['left', 'center', 'right'], description: '封面标题对齐方式' },
    coverTitleStyle: { control: false, description: '封面标题的 CSSProperties，用于精细控制字体与位置' },
    spineTitle: { control: 'text', description: '书脊标题，默认使用书名' },
    spineSubtitle: { control: 'text', description: '书脊副标题' },
    spineAuthor: { control: 'text', description: '书脊作者或出版信息' },
    spineColor: { control: 'color', description: '书脊颜色' },
    spineTextColor: { control: 'color', description: '书脊主文案颜色' },
    spineAccentColor: { control: 'color', description: '书脊副标题与烫金线颜色' },
    spineStyle: {
      control: 'select',
      options: ['auto', 'smooth', 'ribbed', 'banded', 'ornate', 'minimal'],
      description: '书脊装饰：自动、光滑、压纹、横带、古典装饰或极简',
    },
    bookAuthor: { control: 'text', description: '书籍作者' },
    width: { control: 'number', description: '书页宽度（px）' },
    height: { control: 'number', description: '书页高度（px）' },
    thickness: { control: { type: 'range', min: 6, max: 64, step: 1 }, description: '纸张厚度（px）' },
    coverColor: { control: 'color', description: '封面、书脊与封底的装帧颜色' },
    tilt: { control: { type: 'range', min: 0, max: 30, step: 1 }, description: '合起时的垂直倾斜角（deg）' },
    rotation: { control: { type: 'range', min: 0, max: 60, step: 1 }, description: '合起时的水平旋转角（deg）' },
    enable3DViewControls: { control: 'boolean', description: '启用合起时的 3D 拖动与视角快捷按钮' },
    pagePadding: {
      control: 'text',
      description: '内页完整边距，CSS padding 简写或 px 数值；优先级高于 pageSidePadding',
    },
    pageSidePadding: {
      control: 'object',
      description: '自定义内页水平边距：outer 为书页外侧，gutter 为靠近书脊的一侧；支持 px 数值或 CSS 长度',
    },
    fontFamily: { control: 'text', description: '内页字体，可传 CSS 字体栈' },
    paperColor: { control: 'color', description: '内页纸张颜色' },
    textColor: { control: 'color', description: '内页文字颜色' },
    mutedColor: { control: 'color', description: '页眉、页码等次要文字颜色' },
    ruleColor: { control: 'color', description: '内页分隔线和纸张边缘颜色' },
    contentsPerPage: {
      control: { type: 'range', min: 1, max: 16, step: 1 },
      description: '每张目录页显示的章节数上限，页面较矮时会自动减少',
    },
    textured: { control: 'boolean', description: '是否显示封面纸纹' },
    mode: {
      control: 'select',
      options: ['auto', 'single', 'double'],
      description: '翻页模式：auto 按屏幕和容器宽度切换 / single 单页 / double 双页',
    },
    enableKeyboard: { control: 'boolean', description: '是否启用键盘导航' },
    showNavigation: { control: 'boolean', description: '是否显示底部导航栏' },
    showCornerFlip: { control: 'boolean', description: '是否启用悬停书角的预卷页效果' },
    enableSound: { control: 'boolean', description: '是否启用翻页音效' },
    soundSrc: { control: 'text', description: '自定义音效文件 URL' },
    defaultOpen: { control: 'boolean', description: '初始是否打开书籍（跳过封面动画）' },
    open: { control: 'boolean', description: '受控模式：外部控制书籍开合状态' },
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
    <div className="flex h-200 w-full items-center justify-center bg-neutral-100 p-10">
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    backCoverImage: AiCover,
    backCoverContent: <p>从感知、决策到行动，探索 AI Agent 的工作原理、应用与未来。</p>,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    width: 350,
    height: 500,
    thickness: 36,
    coverColor: '#1d2c4b',
    tilt: 4,
    rotation: 24,
    enable3DViewControls: true,
    contentsPerPage: 6,
    textured: true,
    enableKeyboard: true,
  },
}

export const MultiPageContents: Story = {
  ...Default,
  name: '多页目录与阅读样式',
  args: {
    ...Default.args,
    defaultOpen: true,
    contentsPerPage: 3,
    tilt: 8,
    rotation: 32,
    pageSidePadding: { outer: '28px', gutter: '40px' },
    fontFamily: "'Songti SC', 'Noto Serif CJK SC', Georgia, serif",
    paperColor: '#f4f0e6',
    textColor: '#3b352b',
    mutedColor: '#81745f',
    ruleColor: '#d4cbbb',
  },
}

export const PublisherCoverLayout: Story = {
  ...Default,
  name: '出版物封面与书脊排版',
  args: {
    ...Default.args,
    bookTitle: '创新同域化',
    bookAuthor: '主编',
    coverSubtitle: '成都都市圈探索实践',
    coverPublisher: '中国发展出版社',
    coverLayout: 'publisher',
    coverFontFamily: "'Songti SC', 'Noto Serif CJK SC', Georgia, serif",
    coverTitleSize: 'clamp(28px, 11cqi, 48px)',
    coverTextAlign: 'center',
    coverAccentColor: '#d99053',
    spineTitle: '创新同域化',
    spineSubtitle: '成都都市圈探索实践',
    spineAuthor: '中国发展出版社',
    spineColor: '#284b52',
    spineTextColor: '#f5f0dc',
    spineAccentColor: '#e4a26b',
  },
}

export const ClassicHardcover: Story = {
  ...Default,
  name: '黑金精装',
  args: {
    ...Default.args,
    bookTitle: 'AI Agent 完全指南',
    coverStyle: 'classic',
    coverLayout: 'standard',
    coverSubtitle: '从感知到行动',
    coverPublisher: 'PRO REACT ADMIN',
    coverColor: '#17181d',
    coverAccentColor: '#d8ba68',
    spineTitle: 'AI Agent 完全指南',
    spineSubtitle: '从感知到行动',
    spineAuthor: 'AI 专家',
  },
}

export const LeatherHardcover: Story = {
  ...Default,
  name: '酒红皮革精装',
  args: {
    ...Default.args,
    bookTitle: '典藏手册',
    coverStyle: 'leather',
    coverLayout: 'standard',
    coverColor: '#70282d',
    coverAccentColor: '#e0bd6c',
    spineTitle: '典藏手册',
    spineSubtitle: '精选篇章',
    spineAuthor: '典藏版',
  },
}

export const GoldenJacket: Story = {
  ...Default,
  name: '金色插画书衣',
  args: {
    ...Default.args,
    bookTitle: '世界上最神奇的24堂课',
    bookAuthor: '经典纪念版',
    coverStyle: 'golden-jacket',
    coverLayout: 'publisher',
    coverSubtitle: '一部关于成长与改变的经典',
    coverPublisher: '中国出版集团',
    coverColor: '#e5a21b',
    coverAccentColor: '#f2bd38',
    coverTitleColor: '#f5d54b',
    coverTextColor: '#fff1c8',
    coverFontFamily: "'Songti SC', 'Noto Serif CJK SC', Georgia, serif",
    spineTitle: '世界上最神奇的24堂课',
    spineSubtitle: '经典纪念版',
    spineAuthor: '中国出版集团',
    spineColor: '#e5a21b',
    spineTextColor: '#842c2e',
    spineAccentColor: '#8c3030',
  },
}

export const EditorialOrange: Story = {
  ...Default,
  name: '橙白文学编辑风',
  args: {
    ...Default.args,
    bookTitle: '文學的40堂公開課',
    bookAuthor: 'JOHN SUTHERLAND',
    coverStyle: 'editorial-orange',
    coverLayout: 'publisher',
    coverTitle: (
      <span>
        <span
          style={{
            display: 'block',
            marginBottom: '0.3em',
            color: '#ef5b25',
            fontSize: '0.28em',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          YALE · A LITTLE HISTORY
        </span>
        文學的 <strong style={{ color: '#ef5b25', fontSize: '1.55em', fontWeight: 800 }}>40</strong> 堂公開課
      </span>
    ),
    coverSubtitle: '通過經典，重讀經典，和全世界讀者一起在其中',
    coverPublisher: 'A LITTLE HISTORY OF LITERATURE',
    coverColor: '#efeee8',
    coverAccentColor: '#ef5b25',
    coverTitleColor: '#4b2b29',
    coverTextColor: '#4b2b29',
    coverFontFamily: "'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    spineTitle: '文學的40堂公開課',
    spineSubtitle: 'A LITTLE HISTORY OF LITERATURE',
    spineAuthor: 'JOHN SUTHERLAND',
    spineColor: '#efeee8',
    spineTextColor: '#4b2b29',
    spineAccentColor: '#ef5b25',
  },
}

export const CoverAndSpineStyles: Story = {
  ...Default,
  name: '封面文案与书脊样式',
  args: {
    ...Default.args,
    bookTitle: 'AI Agent 完全指南',
    coverLabel: '人工智能 · 专题出版',
    coverContent: '从感知、决策到行动，全面了解智能体的工作原理与应用场景。',
    coverAuthor: 'AI 专家',
    coverImagePosition: '50% 38%',
    coverStyle: 'classic',
    coverLayout: 'publisher',
    spineStyle: 'ornate',
    spineTitle: 'AI Agent 完全指南',
    spineSubtitle: '从感知到行动',
    spineAuthor: 'AI 专家',
  },
}

export const MultiAngle3D: Story = {
  ...EditorialOrange,
  name: '3D 多角度视角预览',
  args: {
    ...EditorialOrange.args,
    defaultOpen: false,
    enable3DViewControls: true,
  },
}

export const OpenSpread: Story = {
  ...Default,
  name: '展开阅读',
  args: {
    ...Default.args,
    defaultOpen: true,
  },
}

export const BackCover: Story = {
  ...Default,
  name: '封底与整书翻转',
  args: {
    ...Default.args,
    pages: bookPages.slice(-1),
    defaultOpen: true,
    backCoverImage: '',
    backCoverLabel: '出版说明',
    backCoverTitle: 'AI Agent 完全指南',
    backCoverSubtitle: '从感知到行动，读懂智能体',
    backCoverStyle: 'editorial-orange',
    backCoverLayout: 'publisher',
    backCoverColor: '#f3f1eb',
    backCoverTextColor: '#4b2b29',
    backCoverAccentColor: '#ef5b25',
    backCoverAuthor: 'AI 专家',
    backCoverPublisher: 'Pro React Admin 出版',
    backCoverContent: (
      <>
        <p>一本关于智能体的入门指南，带你了解 AI Agent 如何感知世界、做出决策并采取行动。</p>
        <p>翻过最后一页，封底会停留；点击“翻到封面”，整本书会翻转回正面。</p>
      </>
    ),
  },
}

export const CornerCurlHint: Story = {
  name: '页角翻页提示',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 400 }}>
        打开书籍后，将鼠标悬停在页面的右下角或左下角，页角会随指针轻轻卷起。可点击书角翻页，也可按住书角拖动，松手后翻页或回弹。
      </p>
      <InteractiveBook {...args} pdfUrl={new URL('./assets/pdf/sample.pdf', window.location.href).href} />
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
    <div className="flex h-200 w-full items-center justify-center bg-neutral-100 p-10">
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
            <p>这本短篇手册支持正文、末页与封底之间的连续翻页。</p>
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
            <p>最后一页后继续翻动，即可显示封底；也可以从封底返回阅读。</p>
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

// ─── 单页模式 ───────────────────────────────────
export const SinglePageMode: Story = {
  name: '单页模式',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        单页模式（<code>mode="single"</code>）：每次显示一页，适合移动端。
        <br />
        点击右侧 60% 翻下一页，左侧 40% 翻上一页，支持滑动和角落翻页。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    mode: 'single',
    width: 320,
    height: 460,
    enableKeyboard: true,
  },
}

// ─── 单页图片模式 ───────────────────────────────
export const SinglePageImageBook: Story = {
  name: '单页图片模式',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        单页图片模式：每张图片是一个独立页面。
        <br />
        双页模式下每 2 张图片组成一个书页（正面 + 背面），单页模式下每张图片是独立一页。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: '单页图片示例',
    bookAuthor: 'Demo',
    pages: [],
    pageImages: demoPageImages,
    mode: 'single',
    width: 320,
    height: 460,
    enableKeyboard: true,
  },
}

// ─── 自动模式（默认） ──────────────────────────────
export const AutoMode: Story = {
  name: '自动模式（响应式）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        自动模式（<code>mode="auto"</code>，默认值）：窗口宽度 &lt; 768px 自动切换单页模式。
        <br />
        尝试调整浏览器窗口宽度观察效果。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    mode: 'auto',
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

export const ImageBook: Story = {
  name: '图片模式（逐页图片）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
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
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        传入 <code>pdfUrl</code> 后，使用 react-pdf 渲染 PDF 文件。
        <br />
        Worker 与 PDF.js API 使用相同版本；按需渲染当前页面并预加载后续两页。
      </p>
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'PDF 翻书示例',
    bookAuthor: 'Demo',
    pages: [],
    pdfUrl: new URL('./assets/pdf/sample.pdf', window.location.href).href,
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

// ─── 隐藏导航栏 ─────────────────────────────────────
export const HideNavigation: Story = {
  name: '隐藏底部导航栏',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
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
  name: '关闭悬停卷角预览',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        设置 <code>showCornerFlip=false</code> 关闭悬停书角的预卷页效果，仍可拖拽、点击书角，或使用导航栏和键盘翻页。
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
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
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
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
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
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
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

// ─── 移动端模拟（窄容器） ──────────────────────────
export const MobileSimulation: Story = {
  name: '移动端模拟（窄容器）',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-4">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 360 }}>
        在 375px 宽容器中模拟移动端效果。<code>mode="auto"</code> 会自动检测窗口宽度，
        窄屏（&lt;768px）切换为单页模式。拖拽、点击右侧翻下一页，左侧翻上一页。
      </p>
      <div
        style={{
          width: 375,
          border: '2px dashed #d1d5db',
          borderRadius: 16,
          padding: 0,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <InteractiveBook {...args} />
      </div>
    </div>
  ),
  args: {
    coverImage: AiCover,
    bookTitle: 'AI Agent 完全指南',
    bookAuthor: 'AI 专家',
    pages: bookPages,
    mode: 'single',
    width: 350,
    height: 500,
    enableKeyboard: true,
  },
}

// ─── 受控模式 ──────────────────────────────────
export const ControlledMode: Story = {
  name: '受控模式',
  render: (args: InteractiveBookProps) => (
    <div className="flex h-200 w-full flex-col items-center justify-center gap-4 bg-neutral-100 p-10">
      <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', maxWidth: 460 }}>
        使用 <code>open</code> 和 <code>onClose</code> 外部控制书籍开合状态。 设置 <code>defaultOpen=true</code>{' '}
        可直接打开书籍。
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
    defaultOpen: true,
  },
}
