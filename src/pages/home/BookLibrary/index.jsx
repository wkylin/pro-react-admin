import React, { useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Input, Tag } from 'antd'
import { BookOutlined, ReadOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons'
import InteractiveBook from '@stateless/InteractiveBook'
import styles from './index.module.less'

// ─── 辅助函数：创建书页 ─────────────────────────────
function makeBookPage(pageNumber, title, paragraphs, nextChapter) {
  return {
    pageNumber,
    title,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
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
        {nextChapter ? (
          <>
            <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：{nextChapter}</p>
          </>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>书籍结束</p>
        )}
      </div>
    ),
  }
}

// ─── 各书籍独立页面数据 ──────────────────────────────
const aiAgentLibPages = [
  makeBookPage(
    1,
    '第一章：AI Agent 简介',
    [
      'AI Agent 是人工智能领域的一个重要概念，它代表着能够自主执行任务的智能实体。',
      'AI Agent 不仅仅是简单的程序，它们能够感知环境、做出决策并采取行动。',
      '在现代科技中，AI Agent 正在改变我们与技术交互的方式。',
    ],
    'AI Agent 的工作原理'
  ),
  makeBookPage(
    2,
    '第二章：AI Agent 的工作原理',
    [
      'AI Agent 的核心是感知-决策-行动循环。它首先通过传感器或输入接口感知环境。',
      '然后使用算法和模型分析信息，做出最佳决策。',
      '最后，通过执行器或输出接口采取行动。这个循环不断重复，使 Agent 能够适应变化的环境。',
    ],
    'AI Agent 的应用领域'
  ),
  makeBookPage(
    3,
    '第三章：AI Agent 的应用领域',
    [
      'AI Agent 在各个领域都有广泛应用，从日常生活到工业生产。',
      '在医疗领域，AI Agent 可以帮助诊断疾病；在金融领域，它们可以进行风险评估。',
      '自动驾驶汽车、智能客服、推荐系统都是 AI Agent 的典型应用。',
    ],
    '拥抱 AI Agent 的时代'
  ),
  makeBookPage(
    4,
    '结语：拥抱 AI Agent 的时代',
    ['AI Agent 不仅仅是技术工具，它们正在重塑我们的世界。', '通过理解和正确应用 AI Agent，我们可以创造更美好的未来。'],
    null
  ),
]

const reactMasteryPages = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/react-page${i + 1}/700/1000`)

const tsDeepPages = [
  makeBookPage(
    1,
    '第一章：TypeScript 基础',
    [
      'TypeScript 是 JavaScript 的超集，添加了强大的类型系统。',
      '类型注解、接口、泛型是 TypeScript 的三大基石。',
      '通过静态类型检查，可以在编译时就发现潜在的错误。',
    ],
    '高级类型系统'
  ),
  makeBookPage(
    2,
    '第二章：高级类型系统',
    [
      '条件类型（Conditional Types）允许根据条件选择不同的类型。',
      '映射类型（Mapped Types）可以批量转换已有类型的属性。',
      'Infer 关键字让我们在条件类型中推断子类型。',
    ],
    '类型体操实战'
  ),
  makeBookPage(
    3,
    '第三章：类型体操实战',
    [
      '实现一个 DeepPartial<T>，递归地将所有属性变为可选。',
      '实现 TupleToUnion<T>，将元组类型转换为联合类型。',
      '这些练习能够显著提升你的类型编程能力。',
    ],
    '工程实践与最佳模式'
  ),
  makeBookPage(
    4,
    '第四章：工程实践与最佳模式',
    [
      '使用 strict 模式确保代码的类型安全性。',
      '合理使用 unknown 替代 any，保持类型推导链路完整。',
      '结合 ESLint 和 Prettier 建立统一的代码规范。',
    ],
    null
  ),
]

const designPatternsPages = [
  makeBookPage(
    1,
    '第一章：创建型模式',
    [
      '单例模式（Singleton）确保一个类只有一个实例。',
      '工厂模式（Factory）提供创建对象的接口，让子类决定实例化哪个类。',
      '建造者模式（Builder）将复杂对象的构建与表示分离。',
    ],
    '结构型模式'
  ),
  makeBookPage(
    2,
    '第二章：结构型模式',
    [
      '适配器模式（Adapter）将一个接口转换为客户希望的另一个接口。',
      '装饰器模式（Decorator）动态地给对象添加额外的职责。',
      '代理模式（Proxy）为另一个对象提供替身或占位符。',
    ],
    '行为型模式'
  ),
  makeBookPage(
    3,
    '第三章：行为型模式',
    [
      '观察者模式（Observer）定义对象间的一对多依赖关系。',
      '策略模式（Strategy）定义一系列算法，使它们可以互相替换。',
      '命令模式（Command）将请求封装为对象，支持撤销操作。',
    ],
    '现代 JS/TS 中的模式应用'
  ),
  makeBookPage(
    4,
    '第四章：现代 JS/TS 中的模式应用',
    [
      'React Hooks 本质上是策略模式与观察者模式的结合。',
      'Redux 中间件采用了责任链模式。',
      '掌握设计模式，让代码更优雅、可维护、可扩展。',
    ],
    null
  ),
]

const nodeBackendPages = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/node-page${i + 1}/700/1000`)

const mlIntroPages = [
  makeBookPage(
    1,
    '第一章：机器学习概述',
    [
      '机器学习是人工智能的一个分支，让计算机从数据中学习规律。',
      '监督学习、无监督学习和强化学习是三大主要范式。',
      '从垃圾邮件过滤到自动驾驶，机器学习无处不在。',
    ],
    '核心算法'
  ),
  makeBookPage(
    2,
    '第二章：核心算法',
    [
      '线性回归是最基础的监督学习算法，用于预测连续值。',
      '决策树通过树状结构进行分类和回归。',
      '支持向量机（SVM）在高维空间中寻找最优分类超平面。',
    ],
    '神经网络基础'
  ),
  makeBookPage(
    3,
    '第三章：神经网络基础',
    [
      '神经网络由输入层、隐藏层和输出层组成。',
      '反向传播算法通过计算梯度来更新网络权重。',
      '深度学习是神经网络的延伸，拥有多个隐藏层。',
    ],
    '实践与展望'
  ),
  makeBookPage(
    4,
    '第四章：实践与展望',
    [
      '选择合适的模型和超参数是机器学习工程的关键。',
      '交叉验证、正则化和特征工程是提升模型性能的常用技巧。',
      '大语言模型（LLM）正在引领机器学习的新浪潮。',
    ],
    null
  ),
]

// ─── 书籍列表数据 ─────────────────────────────────
const bookLibraryData = [
  {
    id: 'ai-agent',
    title: 'AI Agent 完全指南',
    author: 'AI 专家',
    cover: 'https://picsum.photos/seed/ai-book/280/400',
    category: 'AI',
    description: '深入了解 AI Agent 的概念、原理与未来发展，从基础到高级应用全覆盖。',
    mode: 'pages',
    pages: aiAgentLibPages,
  },
  {
    id: 'react-mastery',
    title: 'React 进阶之路',
    author: 'React 核心团队',
    cover: 'https://picsum.photos/seed/react-book/280/400',
    category: 'Frontend',
    description: '掌握 React 18 新特性，Hooks 高级模式，并发渲染与性能优化实战。',
    mode: 'images',
    pageImages: reactMasteryPages,
  },
  {
    id: 'typescript-deep',
    title: 'TypeScript 深入浅出',
    author: 'TS 布道师',
    cover: 'https://picsum.photos/seed/ts-book/280/400',
    category: 'Frontend',
    description: '从类型体操到工程实践，系统掌握 TypeScript 的类型系统与高级技巧。',
    mode: 'pages',
    pages: tsDeepPages,
  },
  {
    id: 'design-patterns',
    title: '设计模式精解',
    author: '架构师',
    cover: 'https://picsum.photos/seed/design-book/280/400',
    category: 'Engineering',
    description: '23 种经典设计模式的现代 JavaScript/TypeScript 实现与应用场景。',
    mode: 'pages',
    pages: designPatternsPages,
  },
  {
    id: 'node-backend',
    title: 'Node.js 后端开发',
    author: '全栈工程师',
    cover: 'https://picsum.photos/seed/node-book/280/400',
    category: 'Backend',
    description: '从 Express 到 Koa，从 REST 到 GraphQL，全面掌握 Node.js 服务端开发。',
    mode: 'images',
    pageImages: nodeBackendPages,
  },
  {
    id: 'ml-intro',
    title: '机器学习入门',
    author: 'ML 研究员',
    cover: 'https://picsum.photos/seed/ml-book/280/400',
    category: 'AI',
    description: '零基础入门机器学习，涵盖线性回归、决策树、神经网络等核心算法。',
    mode: 'pages',
    pages: mlIntroPages,
  },
]

const allCategories = ['All', ...Array.from(new Set(bookLibraryData.map((b) => b.category)))]

// ─── 弹窗行为配置 ─────────────────────────────────
const OVERLAY_CONFIG = {
  showCloseButton: true, // 是否显示关闭按钮
  maskClosable: true, // 点击蒙层是否关闭
}

// ─── BookLibrary 组件 ────────────────────────────
export default function BookLibrary() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedBook, setSelectedBook] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  // ─── 分段关闭动画状态 ─────────────────────────
  const [bookOpen, setBookOpen] = useState(true)
  const closePhaseRef = useRef(null)
  const closeTimerRef = useRef(null)

  // DOM refs
  const cardRefsMap = useRef({})
  const overlayContentRef = useRef(null)
  const maskRef = useRef(null)
  const flySourceRef = useRef(null)
  const openCleanupRef = useRef(null)
  const selectedBookRef = useRef(null)

  const filteredBooks = bookLibraryData.filter((book) => {
    const matchCategory = activeCategory === 'All' || book.category === activeCategory
    const matchSearch =
      !searchText ||
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
    return matchCategory && matchSearch
  })

  const openBook = (book) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    if (openCleanupRef.current) clearTimeout(openCleanupRef.current)
    closePhaseRef.current = null

    // 在 setState 之前捕获源卡片的位置
    const cardEl = cardRefsMap.current[book.id]
    flySourceRef.current = cardEl ? cardEl.getBoundingClientRect() : null

    setSelectedBook(book)
    selectedBookRef.current = book
    setDialogOpen(true)
    setBookOpen(true)
  }

  // ─── 飞出动画：卡片位置 → 屏幕中心（useLayoutEffect 在 paint 前执行） ───
  useLayoutEffect(() => {
    if (!dialogOpen || !selectedBookRef.current || !flySourceRef.current) return

    const contentEl = overlayContentRef.current
    const maskEl = maskRef.current
    const sourceRect = flySourceRef.current
    flySourceRef.current = null

    if (!contentEl) return

    // 计算卡片中心 → 内容中心 的偏移量
    const contentRect = contentEl.getBoundingClientRect()
    const tx = sourceRect.left + sourceRect.width / 2 - (contentRect.left + contentRect.width / 2)
    const ty = sourceRect.top + sourceRect.height / 2 - (contentRect.top + contentRect.height / 2)
    const ts = Math.max(sourceRect.width / contentRect.width, 0.12)

    // ── 第 1 帧：无过渡，直接定位到卡片位置（小 + 透明） ──
    contentEl.style.transition = 'none'
    contentEl.style.transform = `translate(${tx}px, ${ty}px) scale(${ts})`
    contentEl.style.opacity = '0'
    contentEl.style.overflow = 'hidden'
    contentEl.style.borderRadius = '12px'

    if (maskEl) {
      maskEl.style.transition = 'none'
      maskEl.style.opacity = '0'
    }

    // 强制重排，提交初始状态到渲染管线

    contentEl.offsetHeight

    // ── 第 2 帧：启用过渡，飞向中心（逐渐放大 + 淡入） ──
    requestAnimationFrame(() => {
      contentEl.style.transition =
        'transform 0.55s cubic-bezier(0.22,1,0.36,1), ' + 'opacity 0.4s ease, ' + 'border-radius 0.45s ease'
      contentEl.style.transform = 'translate(0,0) scale(1)'
      contentEl.style.opacity = '1'
      contentEl.style.borderRadius = '0px'

      if (maskEl) {
        maskEl.style.transition = 'opacity 0.4s ease'
        maskEl.style.opacity = '1'
      }

      // 触发分段渐变（顺向）
      const seg = contentEl.querySelector('.segmentGradient')
      if (seg) {
        seg.classList.remove('seg-animate-reverse')

        seg.offsetHeight
        seg.classList.add('seg-animate')
      }
    })

    // 动画结束后清理内联样式，为飞回做准备
    openCleanupRef.current = setTimeout(() => {
      if (!contentEl) return
      contentEl.style.transition = ''
      contentEl.style.transform = ''
      contentEl.style.opacity = ''
      contentEl.style.overflow = ''
      contentEl.style.borderRadius = ''
    }, 620)

    return () => {
      if (openCleanupRef.current) clearTimeout(openCleanupRef.current)
    }
  }, [dialogOpen])

  // 执行飞回动画（Phase 2）：直接操作 DOM + CSS transition
  const doFlyback = () => {
    const contentEl = overlayContentRef.current
    const maskEl = maskRef.current
    const book = selectedBookRef.current
    const cardEl = book ? cardRefsMap.current[book.id] : null

    if (!contentEl || !cardEl) {
      // 无法计算目标，直接卸载
      setDialogOpen(false)
      closePhaseRef.current = null
      setSelectedBook(null)
      selectedBookRef.current = null
      setBookOpen(true)
      return
    }

    const cardRect = cardEl.getBoundingClientRect()
    const contentRect = contentEl.getBoundingClientRect()
    const tx = cardRect.left + cardRect.width / 2 - (contentRect.left + contentRect.width / 2)
    const ty = cardRect.top + cardRect.height / 2 - (contentRect.top + contentRect.height / 2)
    const ts = Math.max(cardRect.width / contentRect.width, 0.12)

    // 先设 transition，下一帧设目标值，确保浏览器识别为动画
    contentEl.style.overflow = 'hidden'
    contentEl.style.borderRadius = '0px'
    contentEl.style.transition =
      'transform 0.5s cubic-bezier(0.4,0,0.2,1), ' +
      'opacity 0.5s cubic-bezier(0.4,0,0.2,1), ' +
      'border-radius 0.4s cubic-bezier(0.4,0,0.2,1)'

    if (maskEl) {
      maskEl.style.transition = 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)'
    }

    // 分段渐变逆向动画，制造飞回时的层次感
    const seg = contentEl.querySelector('.segmentGradient')
    if (seg) {
      seg.classList.remove('seg-animate')
      seg.offsetHeight
      seg.classList.add('seg-animate-reverse')
    }

    // 下一帧应用目标值
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentEl.style.transform = `translate(${tx}px, ${ty}px) scale(${ts})`
        contentEl.style.opacity = '0'
        contentEl.style.borderRadius = '12px'
        if (maskEl) {
          maskEl.style.opacity = '0'
        }
      })
    })

    // 动画结束后卸载
    closeTimerRef.current = setTimeout(() => {
      setDialogOpen(false)
      closePhaseRef.current = null
      setSelectedBook(null)
      selectedBookRef.current = null
      setBookOpen(true)
    }, 530)
  }

  // 分段关闭入口：Phase 1 关闭书籍 → Phase 2 飞回
  const startClose = () => {
    if (closePhaseRef.current) return
    closePhaseRef.current = 'book'

    // Phase 1：关闭书籍（封面翻回 0.6s）
    setBookOpen(false)

    // Phase 2：书关闭后飞回
    closeTimerRef.current = setTimeout(() => {
      closePhaseRef.current = 'flyback'
      doFlyback()
    }, 650)
  }

  // InteractiveBook 内部关闭按钮触发（书已自行开始关闭动画）
  const handleBookInternalClose = () => {
    if (closePhaseRef.current) return
    closePhaseRef.current = 'book'

    // 书内部已开始 0.6s 关闭动画，等它完成再飞回
    closeTimerRef.current = setTimeout(() => {
      closePhaseRef.current = 'flyback'
      doFlyback()
    }, 650)
  }

  return (
    <section className={styles.bookLibrary}>
      <h2 className={styles.bookLibraryTitle}>
        <ReadOutlined style={{ marginRight: 8 }} />
        书籍推荐
      </h2>

      {/* 搜索 + 过滤栏 */}
      <div className={styles.bookFilterBar}>
        <Input
          prefix={<SearchOutlined style={{ color: '#aaa' }} />}
          placeholder="搜索书籍..."
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 220 }}
        />
        <div className={styles.bookCategoryTags}>
          {allCategories.map((cat) => (
            <Tag
              key={cat}
              color={activeCategory === cat ? '#1677ff' : undefined}
              onClick={() => setActiveCategory(cat)}
              style={{ cursor: 'pointer', transition: 'all 0.25s' }}
            >
              {cat === 'All' ? '全部' : cat}
            </Tag>
          ))}
        </div>
      </div>

      {/* 书籍网格（带过滤动画） */}
      <div className={styles.bookGrid}>
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            ref={(el) => {
              cardRefsMap.current[book.id] = el
            }}
            className={styles.bookCard}
            onClick={() => openBook(book)}
          >
            <div className={styles.bookCoverWrap}>
              <img src={book.cover} alt={book.title} className={styles.bookCoverImg} loading="lazy" />
              <div className={styles.bookCoverOverlay}>
                <BookOutlined style={{ fontSize: 28, color: '#fff' }} />
                <span>阅读</span>
              </div>
            </div>
            <div className={styles.bookMeta}>
              <h3 className={styles.bookCardTitle}>{book.title}</h3>
              <p className={styles.bookCardAuthor}>{book.author}</p>
              <Tag color="blue" style={{ fontSize: 11 }}>
                {book.category}
              </Tag>
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <div className={styles.bookEmpty}>
            <BookOutlined style={{ fontSize: 48, color: '#ccc' }} />
            <p>未找到匹配的书籍</p>
          </div>
        )}
      </div>

      {/* 阅读弹窗（Portal 到 body，避免 Tab 栏层叠上下文遮挡） */}
      {dialogOpen &&
        selectedBook &&
        createPortal(
          <div
            ref={maskRef}
            className={styles.bookOverlayMask}
            onClick={OVERLAY_CONFIG.maskClosable ? startClose : undefined}
          >
            {/* 关闭按钮放在 mask 层，避免被 content 的 overflow:hidden 裁剪 */}
            {OVERLAY_CONFIG.showCloseButton && (
              <button className={styles.bookOverlayClose} onClick={startClose} aria-label="关闭">
                <CloseOutlined />
              </button>
            )}
            <div ref={overlayContentRef} className={styles.bookOverlayContent} onClick={(e) => e.stopPropagation()}>
              {/* 分段渐变覆层（用于飞出/飞入时的视觉效果） */}
              <div className={styles.segmentGradient + ' segmentGradient'}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`segmentStrip segmentStrip-${i + 1}`} />
                ))}
              </div>
              <InteractiveBook
                coverImage={selectedBook.cover}
                bookTitle={selectedBook.title}
                bookAuthor={selectedBook.author}
                pages={selectedBook.pages || []}
                pageImages={selectedBook.pageImages}
                width={350}
                height={500}
                enableSound
                defaultOpen
                open={bookOpen}
                onClose={handleBookInternalClose}
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
