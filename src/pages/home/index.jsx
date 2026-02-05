import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { version, useEffect, useState, useRef } from 'react'
import { Input, Flex, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Atom, Merge, GitMerge, GitPullRequestArrow } from 'lucide-react'
// import CountUp from 'react-countup'
// import { PinInput } from 'react-input-pin-code'
import SpotlightCard from '@stateless/Spotlight'
// import Typewriter from 'typewriter-effect'
import Marquee from 'react-fast-marquee'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useDetectScroll from '@smakss/react-scroll-direction'
import FixTabPanel from '@stateless/FixTabPanel'
import ReMarkdown from '@stateless/ReMarkdown'
// import LinearWrap from '@stateless/LinearWrap'
import AlternatingText from '@stateless/AlternatingText'
import AutoLink from '@stateless/AutoLink'
import LazyLoadImage from '@stateless/LazyLoadImage'
import IsometricCard from '@stateless/IsometricCard'
import AvatarCard from '@stateless/AvatarCard'
import LineBordered from '@stateless/LineBordered'
import GradientTracking from '@stateless/GradientTracking'
// import ShiftingCard from '@stateless/ShiftingCard'
import BreatheText from '@stateless/BreatheText'
import ScrollAnimation from '@stateless/ScrollAnimation'
import AnimateOnScreen from '@stateless/AnimateOnScreen'
import AnimateRipple from '@stateless/AnimateRipple'
// import AnimateWave from '@stateless/AnimateWave'
import NumberFlowFix from '@stateless/NumberFlowFix'
import MeshGradientBackground from '@stateless/MeshGradientBackground'
import useRect from '@hooks/useRect'
import TagCloud from '@stateless/TagCloud'
import ShiCode from '@stateless/ShiCode'
import StaticStepper from '@stateless/StaticStepper'
import FeatureAny from '@stateless/FeatureAny'
import UserIP from '@stateless/UserIP'
import ScratchToReveal from '@stateless/ScratchToReveal'
// import SlideLinear from '@stateless/SlideLinear'
import DynamicBackground from '@stateless/DynamicBackground'
import ContentPlaceholder from '@stateless/ContentPlaceholder'
import SkeletonFix from '@stateless/SkeletonFix'
import { ReactSignature } from '@stateless/ReactSignature'
// import AdvancedCodeBlock from '@stateless/AdvancedCodeBlock'
import SquaresGrid from '@stateless/SquaresGrid'
import ShinyText from '@stateless/ShinyText'
// import BlurText from '@stateless/BlurText'
import Meteors from '@stateless/Meteors'
import CompareAll from '@stateless/CompareAll'
import TextLoader from '@stateless/TextLoader'
import BackgroundBoxes from '@stateless/BackgroundBoxes'
import TypeWriter from '@stateless/TypeWriter'
import SlideText from '@stateless/SlideText'
import SparklesCore from '@stateless/Sparkles'
import SparklesText from '@stateless/SparklesText'
import ColorfulText from '@stateless/ColorfulText'
import MemoizedStars from '@stateless/MemoizedStars'
// import WordRotate from '@stateless/WordRotate'
import TestimonialCarousel from '@stateless/TestimonialCarousel'
// import InteractiveGrid from '@stateless/InteractiveGrid'
import BlurFade from '@stateless/BlurFade'
import IconCloud from '@stateless/IconCloud'
import GradualSpacing from '@stateless/GradualSpacing'
import MultiDirectionSlide from '@stateless/MultiDirectionSlide'
import InViewBasicMultiple from '@stateless/AnimInViewBasic'
import DottedStepper from '@stateless/DottedStepper'
import MoveChecker from '@stateless/MoveChecker'
import FlipWords from '@stateless/FlipWords'
import BorderBeam from '@stateless/BorderBeam'
import AutoSlider from '@stateless/AutoSlider'
import AnimText from '@stateless/AnimText'
import SlideButton from '@stateless/SlideButton'
import NumberViewCard from '@stateless/NumberViewCard'
import CubeSpinner from '@stateless/CubeSpinner'
import firstImage from '@assets/images/88-300x160.jpg'
import secondImage from '@assets/images/2-300x160.jpg'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'

import {
  oneApiChat,
  prettyObject,
  // randomNum,
  getDirection,
  oneApiImage,
} from '@utils/aidFn'
import { fireConfetti } from '@utils/confetti'
import exportSvg from '@utils/svgExport'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './index.module.less'
import InteractiveBook from '@stateless/InteractiveBook'

const preCode = `
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  };
`.trim()
const slugs = ['typescript', 'javascript', 'react', 'html5', 'css', 'prisma', 'nginx', 'vercel', 'docker', 'git']

const dataSteps = [
  {
    title: 'Step 1',
    code: 'npx create-react-app my-app',
  },
  {
    title: 'Step 2',
    code: 'cd my-app',
  },
  {
    title: 'Step 3',
    code: 'npm start',
  },
  {
    title: 'Step 4',
    code: 'npm run build',
  },
]

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  const [isStream, setIsStream] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const curController = useRef(null)

  const [aiImageList, setAiImageList] = useState([])

  const mouseEnterRef = useRef(null)
  const [enterDirection, setEnterDirection] = useState('left')
  const handleMouseEnter = (event) => {
    if (!mouseEnterRef.current) return

    const direction = getDirection(event, mouseEnterRef.current)
    switch (direction) {
      case 0:
        setEnterDirection('top')
        break
      case 1:
        setEnterDirection('right')
        break
      case 2:
        setEnterDirection('bottom')
        break
      case 3:
        setEnterDirection('left')
        break
      default:
        setEnterDirection('left')
        break
    }
  }

  const [apiKey, setApiKey] = useState(() => '')
  const [chatText, setChatText] = useState('')
  const textareaRef = useRef(null)

  const changeApiKey = (event) => {
    setApiKey(event.target.value)
  }

  const changeChatText = (event) => {
    setChatText(event.target.value)
  }

  const onInputKeyDown = (event) => {
    if (event.metaKey && event.key === 'Enter') {
      onSubmit()
      event.preventDefault()
    }
  }

  // const [pinValues, setPinValues] = useState(['', '', '', '', '', '', ''])

  const onSubmit = () => {
    if (chatText.trim() === '') {
      return
    }
    const controller = new AbortController()
    curController.current = controller
    fetchAi(chatText, apiKey, controller)
  }
  const onSubmitImage = () => {
    if (chatText.trim() === '') {
      return
    }
    const controller = new AbortController()
    curController.current = controller
    fetchAiImage(chatText, apiKey, controller)
  }

  const onStop = () => {
    curController.current.abort()
    // setLoading(false)
    setIsStream(false)
  }

  const fetchAi = (text, key, controller) => {
    aiTextRef.current = ''
    setAiText(aiTextRef.current)
    const { signal } = controller
    setIsStream(true)
    oneApiChat(
      [
        {
          content: text,
          role: 'user',
        },
      ],
      key,
      signal
    )
      .then((response) => {
        const contentType = response.headers.get('content-type')
        if (!response.ok || !contentType?.startsWith('text/event-stream') || response.status !== 200) {
          if (contentType?.startsWith('text/html') || contentType?.startsWith('text/plain')) {
            const textPlain = response.clone().text()
            textPlain.then((plainText) => {
              setAiText(plainText)
            })
          } else if (contentType?.startsWith('application/json')) {
            const resJson = response.clone().json()
            resJson.then((res) => {
              setAiText(prettyObject(res))
            })
          } else {
            setAiText(response.statusText)
          }
          setIsStream(false)
        } else {
          const reader = response?.body?.getReader()
          const delimiter = '\n\n'
          let buffer = ''
          let lastText = ''
          const readStream = () => {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  setIsStream(false)
                  return
                }
                buffer += new TextDecoder().decode(value)
                while (buffer.includes(delimiter)) {
                  const ind = buffer.indexOf(delimiter)
                  const message = buffer.slice(0, ind)

                  const dataList = message.split('data: ')

                  for (const index in dataList) {
                    if (dataList[index] !== '' && dataList[index] !== '[DONE]') {
                      try {
                        const json = JSON.parse(dataList[index])
                        const delta = json.choices[0]?.delta?.content ?? ''
                        lastText += delta
                        setDateTime(new Date().toLocaleString())
                        aiTextRef.current = lastText
                        setAiText(aiTextRef.current)
                      } catch (error) {
                        console.log(error)
                      }
                    }
                  }
                  // 从缓冲区中移除已处理的消息和分隔符
                  buffer = buffer.slice(ind + delimiter.length)
                }
                readStream()
              })
              .catch((error) => {
                console.log('read stream error', error)
              })
          }
          readStream()
        }
      })
      .catch((error) => {
        setIsStream(false)
        setAiText(error.message)
      })
  }
  const fetchAiImage = (text, key, controller) => {
    aiTextRef.current = ''
    setAiText(aiTextRef.current)
    setAiImageList([])
    const { signal } = controller
    setIsStream(true)
    oneApiImage(
      [
        {
          content: text,
          role: 'user',
        },
      ],
      key,
      signal
    )
      .then((response) => {
        const contentType = response.headers.get('content-type')
        if (!response.ok || response.status !== 200) {
          if (contentType?.startsWith('text/html') || contentType?.startsWith('text/plain')) {
            const textPlain = response.clone().text()
            textPlain.then((plainText) => {
              setAiText(plainText)
            })
          } else if (contentType?.startsWith('application/json')) {
            const resJson = response.clone().json()
            resJson.then((res) => {
              setAiText(prettyObject(res))
            })
          } else {
            setAiText(response.statusText)
          }
          setIsStream(false)
        } else {
          const resJson = response.clone().json()
          resJson.then((res) => {
            // setAiText(prettyObject(res))
            console.log('res', res)
            if (res.error) return
            setAiImageList(
              res.data.map((item) => ({
                imageUrl: item.url,
                imagePrompt: item.revised_prompt,
              }))
            )
          })
          setIsStream(false)
        }
      })
      .catch((error) => {
        setIsStream(false)
        setAiText(error.message)
      })
  }

  const scrollRef = useRef(null)
  const [customElement, setCustomElement] = useState()
  const { scrollDir, scrollPosition } = useDetectScroll({
    target: customElement,
  })

  useEffect(() => {
    if (scrollRef.current) {
      setCustomElement(scrollRef.current)
    }
  }, [scrollRef])

  const [barRect, barRef] = useRect()

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)

  // 使用 useRef 来引用 SVG 元素
  const svgRef = useRef(null)
  const [svgFileName, setSvgFileName] = useState('mySvg.svg')
  const saveSvgAsFile = () => {
    exportSvg(svgRef.current, svgFileName)
  }

  const currentYear = new Date().getFullYear()
  const hopefulText = `${currentYear} 年，是充满希望的一年。让我们放下过去的包袱，轻装上阵。用积极的心态去面对生活，用坚定的信念去追逐梦想。相信自己，只要我们努力奋斗，就一定能创造出属于自己的精彩人生。让我们一起逐光前行，奔赴新程，书写属于我们的辉煌篇章！`

  const mcRef = useRef(null)

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
  return (
    <FixTabPanel ref={scrollRef}>
      <section className={styles.avatar} style={{ margin: '10px 0', fontSize: 24 }}>
        <ColorfulText text={`React version: ${version}`} />
      </section>
      <section style={{ width: '320px', margin: '30px 0' }}>
        <Input defaultValue={apiKey} placeholder="api key" onChange={changeApiKey} style={{ marginBottom: 20 }} />
        <Flex align="center">
          <Input.TextArea
            ref={textareaRef}
            defaultValue={chatText}
            placeholder="来，说点什么呗...Meta + Enter发送"
            onChange={changeChatText}
            onKeyDown={onInputKeyDown}
            autoSize
            style={{ height: 30, caretColor: '#ff0000' }}
          />
        </Flex>
        <Button
          style={{ margin: '10px' }}
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <SendOutlined rotate={-60} />
            </AnimatedIcon>
          }
          type="primary"
          disabled={isStream}
          onClick={onSubmit}
        >
          发送
        </Button>
        <Button
          style={{ margin: '10px' }}
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <SendOutlined rotate={-60} />
            </AnimatedIcon>
          }
          type="primary"
          disabled={isStream}
          onClick={onSubmitImage}
        >
          生成图片
        </Button>
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <SendOutlined rotate={-60} />
            </AnimatedIcon>
          }
          type="primary"
          disabled={!isStream}
          onClick={onStop}
        >
          停止
        </Button>
      </section>
      <section className="mb-10">
        {isStream && <div>正在输入...</div>}
        <section style={{ textAlign: 'right', color: '#666' }}>{dateTime}</section>
        <ReMarkdown markdownText={aiText} isLoading={isStream} />
        <section className="aiImage">
          {aiImageList.length > 0 && (
            <>
              {aiImageList.map((item, index) => (
                <div key={index}>
                  <div>{item.imagePrompt}</div>
                  <img src={item.imageUrl} width="100%" alt={item.url} />
                </div>
              ))}
            </>
          )}
        </section>
      </section>
      <section style={{ margin: '10px 0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <MoveChecker
          ref={mcRef}
          onResult={(r) => console.log('result', r)}
          initialText="请按住滑块，拖动到最后"
          successText="验证通过"
          boxBg="#ddd"
          bgColor="linear-gradient(to right,#68cd0f,#35cca1)"
          bgColorS="linear-gradient(to right,#68cd0f,#66e92d)"
          sliderBg="#fff"
          sliderSuccessBg="#ddd"
        />
        <Button type="primary" style={{ margin: '10px' }} onClick={() => mcRef.current && mcRef.current.reset()}>
          重置验证
        </Button>
      </section>
      <InteractiveBook
        coverImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        bookTitle="AI Agent 完全指南"
        bookAuthor="AI 专家"
        pages={bookPages}
        width={350}
        height={500}
      />
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        I love <span className={styles.circledHighlight}>coding</span> in{' '}
        <AlternatingText alternateText={['JavaScript', 'TypeScript', 'React', 'Vue', 'Remix', 'Node.js']} />.
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        X岁的你，正处在一个特殊的位置：
        <TypeWriter
          text={['年轻到足以创新, 成熟到懂得坚持', '你既有冒险的勇气, 又有控制风险的智慧', '人生不设限，梦想不过期! ']}
          speed={70}
          className="text-gray-500"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={'_'}
        />
      </section>
      <section style={{ margin: '20px 0', fontSize: 20 }}>
        <MultiDirectionSlide textLeft="逐光前行，奔赴新程；" textRight="千山过尽，万里星辰！" />
      </section>
      <section style={{ margin: '20px 0', fontSize: 20 }}>
        <AnimText animText="逐光前行，奔赴新程；千山过尽，万里星辰！" />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20, overflow: 'hidden' }}>
        This is something
        <SlideText text={['amazing', 'new', 'wonderful', 'beautiful', 'smart']} />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <SparklesText text="千山过尽，万里星辰!" sparklesCount={5} />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <AutoLink text="foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin" />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <ShinyText text="Just some shiny text!" disabled={false} speed={3} />
      </section>
      {/* <section style={{ marginBottom: 15, fontSize: 20 }}>
        <BlurText text="Isn't this so cool?!" delay={50} />
      </section> */}
      <section style={{ marginBottom: 15, width: 360, fontSize: 20 }}>
        <TextLoader
          messages={[
            'Preparing your experience',
            'Loading awesome content',
            'Almost there',
            'Just a moment',
            'Getting things ready',
          ]}
        />
      </section>
      <section style={{ marginBottom: 15, width: 360, fontSize: 20 }}>
        <TestimonialCarousel />
      </section>
      {/* <section style={{
        marginBottom: 15,
        width: 360,
        height: 200,
        overflow: 'hidden',
        position: 'relative',
        background: '#111827',
        // transform: 'skew(15deg, 15deg)'
        // maskComposite: 'intersect',
        // maskImage: `
        //   linear-gradient(to right,  transparent, black 5%),
        //   linear-gradient(to left,   transparent, black 5%),
        //   linear-gradient(to bottom, transparent, black 5%),
        //   linear-gradient(to top,    transparent, black 5%)
        // `,
      }}>
        <InteractiveGrid width={12} height={12} squares={[50, 50]} />
      </section> */}
      <section
        style={{
          marginBottom: 15,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <IconCloud images={images} />
      </section>
      <section
        style={{
          marginBottom: 15,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <NumberViewCard />
      </section>
      <section
        style={{
          marginBottom: 15,
          fontSize: 20,
          height: 200,
          width: 360,
          background: '#111827',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Meteors starCount={30} primaryColor="#6366f1" className="opacity-30" />
        <Meteors starCount={25} primaryColor="#818cf8" className="opacity-50" />
        <Meteors starCount={20} primaryColor="#ffffff" className="opacity-70" />
      </section>
      <section
        style={{
          marginBottom: 15,
          fontSize: 20,
          height: 200,
          width: 360,
          background: '#111827',
        }}
      >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </section>
      <section
        style={{
          marginBottom: 15,
          fontSize: 20,
          height: 200,
          width: 360,
          overflow: 'hidden',
          position: 'relative',
        }}
        className="bg-slate-900"
      >
        <BackgroundBoxes />
      </section>
      <section
        style={{
          marginBottom: 15,
          fontSize: 20,
          height: 200,
          width: 360,
          overflow: 'hidden',
          position: 'relative',
        }}
        className="bg-slate-900"
      >
        <MemoizedStars />
      </section>
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onTouchStart={(e) => handleMouseEnter(e)}
        onFocus={() => {
          // provide some visible/default state when focused
          setEnterDirection((prev) => prev || 'left')
        }}
        ref={mouseEnterRef}
        style={{
          marginBottom: 15,
          height: 200,
          width: 360,
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          border: 'none',
          padding: 0,
        }}
      >
        Direction: {enterDirection}
      </button>
      <section style={{ margin: '20px 0' }}>
        <CompareAll
          firstImage={firstImage}
          secondImage={secondImage}
          firstImageClassName="object-cover object-left-top"
          secondImageClassName="object-cover object-left-top"
          className="h-[200px]"
          slideMode="drag"
        />
      </section>
      <section
        style={{
          margin: '20px 0',
          width: 360,
          height: 200,
          background: '#999',
        }}
      >
        <SquaresGrid
          speed={0.5}
          squareSize={20}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#222"
          hoverFillColor="#222"
        />
      </section>
      <section
        style={{
          margin: '20px 0',
          width: 360,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Input value={svgFileName} onChange={(e) => setSvgFileName(e.target.value)} style={{ width: 180 }} />
          <Button type="primary" onClick={saveSvgAsFile}>
            保存 SVG
          </Button>
        </div>
        <section className="relative p-4">
          <div className={styles.itemCircle} />
          <svg ref={svgRef} style={{ height: '10px', width: '100%' }}>
            <path d="M 0 0 L 5000 0" fill="none" stroke="#595959">
              <animate
                attributeName="stroke-dashoffset"
                values="100;0"
                dur="3s"
                calcMode="linear"
                repeatCount="indefinite"
              ></animate>
            </path>
          </svg>
          <div className={styles.itemCircleTail} />
        </section>
      </section>
      <section className={styles.line} />
      <section className={styles.linear} />
      {/* <section>
        <AvatarCard avatar="https://picsum.photos/seed/picsum/300/160" text="Hi, I'm a developer." />
      </section> */}
      <section>
        <IsometricCard text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?" />
      </section>
      <LineBordered text="A line bordered text." />
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        <AnimatedIcon variant="spin" mode="hover">
          <Atom />
        </AnimatedIcon>{' '}
        <AnimatedIcon variant="spin" mode="hover">
          <Merge />
        </AnimatedIcon>{' '}
        <AnimatedIcon variant="spin" mode="hover">
          <GitMerge />
        </AnimatedIcon>{' '}
        <AnimatedIcon variant="spin" mode="hover">
          <GitPullRequestArrow />
        </AnimatedIcon>
      </section>
      <section style={{ marginBottom: 40, fontSize: 16 }}>
        <h2>Scroll direction: {`${scrollDir}`}</h2>
        <p>
          Scroll position - Top: {scrollPosition.top}, Bottom: {scrollPosition.bottom}
        </p>
      </section>
      <section style={{ marginBottom: 40, fontSize: 16 }}>
        <h3>React Animate On Scroll.</h3>
        <h3>
          <AutoLink text="https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/" />
        </h3>
        <h3 style={{ marginBottom: 40 }}>
          <AutoLink text="https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview" />
        </h3>
        <ScrollAnimation>
          {/* <LazyLoadImage src="https://picsum.photos/seed/picsum/300/160" alt="Strawberries" /> */}
          <LazyLoadImage src={secondImage} alt="Strawberries" />
        </ScrollAnimation>
      </section>
      {/* <section style={{ marginBottom: 40, fontSize: 36 }}>
        <Typewriter
          options={{
            strings: ['Software Developer.', 'Full Stack Developer.', 'Open Source Contributor.'],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      </section> */}
      <section>
        <GradientTracking />
      </section>
      <section style={{ margin: 40 }}>
        <BreatheText />
      </section>
      <section style={{ margin: '60px 0 40px 40px' }}>
        <div className={styles['video-box']}>
          <div className={styles['video-btn']}>b</div>
        </div>
      </section>
      {/* <section style={{ marginBottom: 40 }}>
        <ShiftingCard />
      </section> */}
      {/* <section style={{ marginBottom: 40 }}>
        <PinInput onChange={(value, index, values) => setPinValues(values)} values={pinValues} />
      </section> */}
      <section
        style={{
          marginBottom: 40,
          width: 360,
          height: 200,
          overflow: 'hidden',
        }}
      >
        <AnimateOnScreen.FadeIn>
          <AvatarCard avatar={XuePng} text="Hi, I'm a developer." />
        </AnimateOnScreen.FadeIn>
      </section>
      <section
        style={{
          marginBottom: 40,
          width: 360,
          height: 200,
          overflow: 'hidden',
        }}
      >
        <AnimateOnScreen.FadeUp>
          <img
            src={SongPng}
            alt=""
            style={{
              maskImage: 'linear-gradient(to top, transparent, black 20%, black 80%, transparent)',
            }}
          />
        </AnimateOnScreen.FadeUp>
      </section>
      <section
        style={{
          marginBottom: 40,
          width: 360,
          height: 200,
          overflow: 'hidden',
        }}
      >
        <AnimateOnScreen.ScaleIn triggerOnce={false}>
          <>
            <img src={SpringPng} alt="" />
            <section className={styles['blend-me']}>Mix Blend Mode</section>
          </>
        </AnimateOnScreen.ScaleIn>
      </section>
      <section
        style={{
          marginBottom: 40,
          width: 360,
          height: 200,
          overflow: 'hidden',
        }}
      >
        <AnimateOnScreen.DiyAnimation
          from={{ opacity: 0, transform: 'translate(-100%, 0)' }}
          to={{ opacity: 1, transform: 'translate(0, 0)' }}
          triggerOnce={true}
        >
          <Zoom>
            <img src={HePng} alt="" />
          </Zoom>
        </AnimateOnScreen.DiyAnimation>
      </section>
      <section style={{ marginBottom: 40, display: 'flex' }}>
        <SpotlightCard className="my-spot" style={{ width: 360, height: 200, color: '#fff' }}>
          <section />
        </SpotlightCard>
      </section>
      <section style={{ margin: '20px 0', fontSize: 24 }}>
        <BlurFade delay={0.25} inView>
          这一年，以笔为剑，以梦为马，在生活的画布上，绘就属于自己的壮丽史诗。
        </BlurFade>
      </section>
      <section style={{ margin: '20px 0', fontSize: 24 }}>
        <GradualSpacing text={hopefulText} />
      </section>
      <section style={{ margin: '20px 0' }}>
        <ContentPlaceholder />
      </section>
      <section
        // className={styles.box}
        style={{
          marginBottom: 10,
          width: 360,
          height: 200,
          position: 'relative',
          backgroundColor: 'rgba(0, 0,0, 0.8)',
          borderRadius: 8,
        }}
      >
        <section className={styles.dotMask} ref={barRef}>
          dot mask
        </section>
        <BorderBeam size={100} />
      </section>
      <section style={{ marginBottom: 40, fontSize: 18 }}>
        <section>RectResult.</section>
        width: {Number.parseInt(barRect?.width)} height: {Number.parseInt(barRect?.height)} top:{' '}
        {Number.parseInt(barRect?.top)} bottom: {Number.parseInt(barRect?.bottom)} right:{' '}
        {Number.parseInt(barRect?.right)} left: {Number.parseInt(barRect?.left)}
      </section>
      <section
        style={{
          marginBottom: 40,
          height: 200,
          width: 360,
          overflow: 'hidden',
        }}
      >
        <MeshGradientBackground />
      </section>
      <section
        style={{
          marginBottom: 20,
        }}
      >
        <ScratchToReveal
          width={360}
          height={200}
          minScratchPercentage={70}
          className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
        >
          <p className="text-9xl">✨</p>
        </ScratchToReveal>
      </section>
      <section style={{ margin: 20 }}>
        <AnimateRipple>Click Me</AnimateRipple>
      </section>
      <section style={{ margin: 20 }}>
        <section className={styles.effect}> Hello CSS</section>
      </section>
      <section style={{ margin: 20 }} className={styles.maskBox}>
        <section className={styles.watermark}>water mark</section>
        mask
      </section>
      <section style={{ margin: 20 }}>
        <button className={styles.button} onClick={fireConfetti}>
          <span className={styles['button-label']}>Click Me</span>
        </button>
      </section>
      {/* <section style={{ position: 'relative', margin: '80px 0 160px 100px' }}>
        <div className={styles['circle-1']}></div>
        <div className={styles['circle-2']}></div>
        <div className={styles['circle-3']}></div>
        <div className={styles['circle-4']}></div>
      </section> */}
      <section style={{ margin: 20 }} className={styles.eHElAY}>
        Hi, React!
      </section>
      <section style={{ margin: 20 }} className="z-30 flex w-full items-center justify-start gap-8">
        <SlideButton
          backgroundColor="#0c002b"
          textColor="#1670f0"
          borderStartColor="rgba(22, 112, 240, 0.1)"
          borderEndColor="rgba(22, 112, 240, 0.7)"
        >
          Button
        </SlideButton>
        <SlideButton
          backgroundColor="#1a0b2e"
          textColor="#ff00ff"
          borderStartColor="rgba(255, 0, 255, 0.1)"
          borderEndColor="rgba(0, 255, 255, 0.7)"
        >
          Button
        </SlideButton>
      </section>
      <section>
        <CubeSpinner />
      </section>
      {/* <section style={{ margin: '20px 0', fontSize: 40 }}>
        <CountUp start={20} end={10000} duration={10} enableScrollSpy />
      </section> */}
      <section style={{ margin: '20px 0', fontSize: 40 }}>
        <NumberFlowFix />
      </section>
      <section style={{ position: 'relative', fontSize: 36 }}>
        I build
        <FlipWords
          className="mx-1 px-4 py-2"
          words={['creative', 'interactive', 'beautiful', 'modern']}
          wordClassName="text-blue-500 font-bold"
        />
        <span className="block sm:inline">websites and apps.</span>
      </section>
      <section style={{ margin: 20 }}>
        <ReactSignature />
      </section>
      <section style={{ margin: 20 }}>
        {dataSteps.map((step, index) => (
          <StaticStepper.StaticStep
            key={step.title}
            step={index + 1}
            title={step.title}
            stepClassName="bg-blue-100 text-blue-600 border-blue-200"
            titleClassName="text-blue-500 font-bold"
          >
            <StaticStepper.CodeContainer>{step.code}</StaticStepper.CodeContainer>
          </StaticStepper.StaticStep>
        ))}
      </section>
      <section style={{ margin: 20 }}>
        <FeatureAny />
      </section>
      <section style={{ margin: 20 }}>
        <SkeletonFix />
      </section>
      <section style={{ margin: 20 }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 6 }}>
          <Masonry gutter="10px">
            <section
              key="masonry-1"
              style={{
                height: 100,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-2"
              style={{
                height: 200,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-3"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-4"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-5"
              style={{
                height: 200,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-6"
              style={{
                height: 100,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-7"
              style={{
                height: 200,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-8"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-9"
              style={{
                height: 100,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-10"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-11"
              style={{
                height: 100,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-12"
              style={{
                height: 200,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-13"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
            <section
              key="masonry-14"
              style={{
                height: 150,
                width: '100%',
                border: '1px solid #ccc',
                background: '#aaa',
              }}
            />
          </Masonry>
        </ResponsiveMasonry>
      </section>
      <section style={{ margin: 20 }}>
        <InViewBasicMultiple />
      </section>
      <section style={{ margin: 20 }}>
        <TagCloud />
      </section>
      <section style={{ margin: 20 }}>
        <Marquee autoFill direction="left" gradient gradientColor="rgba(255, 255, 255, 0.8)">
          <div
            style={{
              width: 200,
              height: 100,
              lineHeight: '100px',
              textAlign: 'center',
              background: '#aaa',
              margin: '0 10px',
              borderRadius: 8,
              // transform: 'rotateX(60deg) rotateY(0deg) rotateZ(45deg)'
            }}
          >
            React
          </div>
        </Marquee>
      </section>
      <section style={{ margin: 20 }}>
        <Marquee autoFill direction="right" gradient gradientColor="rgba(255, 255, 255, 0.8)">
          <div
            style={{
              width: 200,
              height: 100,
              lineHeight: '100px',
              textAlign: 'center',
              background: '#aaa',
              margin: '0 10px',
              borderRadius: 8,
            }}
          >
            Vue
          </div>
        </Marquee>
      </section>
      <section style={{ margin: 0 }}>
        <DottedStepper />
      </section>
      <section style={{ margin: 20 }}>
        <ShiCode preCode={preCode} />
      </section>
      <section style={{ margin: 20 }}>
        <DynamicBackground />
      </section>
      <section style={{ margin: 20 }}>
        <UserIP />
      </section>
      <section style={{ margin: 20 }}>
        <AutoSlider />
      </section>
    </FixTabPanel>
  )
}

export default Home
